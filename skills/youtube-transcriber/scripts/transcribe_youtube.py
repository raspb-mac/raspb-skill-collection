#!/usr/bin/env python3
from __future__ import annotations

import argparse
import glob
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path
from urllib.parse import urlparse, parse_qs

ROOT = Path('/home/node/.openclaw/workspace')
SKILL_DIR = ROOT / 'skills' / 'youtube-transcriber'
WORKING_DIR = ROOT / 'working'
TRANSFERS_DIR = ROOT / 'transfers' / 'results'
DEFAULT_COOKIES_JSON = ROOT / 'transfers' / 'www.youtube.com_cookies.json'
DEFAULT_COOKIES_TXT = SKILL_DIR / 'scripts' / 'youtube_cookies.txt'
PLUGIN_DIR = Path('/home/node/.config/yt-dlp/plugins')
YT_DLP = SKILL_DIR / 'scripts' / 'yt-dlp'
FFMPEG = SKILL_DIR / 'scripts' / 'ffmpeg'
WHISPER = Path('/app/skills/openai-whisper-api/scripts/transcribe.sh')
NODE = '/usr/local/bin/node'
SUBTITLE_LANG_FALLBACKS = ('de', 'de.*', 'de-.*', 'en', 'en.*')


def die(message: str, code: int = 1) -> int:
    print(message, file=sys.stderr)
    return code


def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    text = re.sub(r'-{2,}', '-', text).strip('-')
    return text or 'video'


def video_id_from_url(url: str) -> str:
    parsed = urlparse(url)
    if parsed.hostname in {'www.youtube.com', 'youtube.com', 'm.youtube.com'}:
        qs = parse_qs(parsed.query)
        if 'v' in qs and qs['v']:
            return qs['v'][0]
    if parsed.hostname == 'youtu.be':
        return parsed.path.strip('/').split('/')[0]
    return 'video'


def run(cmd: list[str], *, env: dict[str, str] | None = None, check: bool = True) -> subprocess.CompletedProcess:
    merged_env = os.environ.copy()
    if env:
        merged_env.update(env)
    return subprocess.run(cmd, text=True, capture_output=True, env=merged_env, check=check)


def yt_dlp_base_args(cookies_path: str | None) -> list[str]:
    args = [
        str(YT_DLP),
        '--ignore-config',
        '--plugin-dirs', str(PLUGIN_DIR),
        '--no-js-runtimes',
        '--js-runtimes', f'node:{NODE}',
    ]
    if cookies_path:
        args += ['--cookies', cookies_path]
    return args


def run_ytdlp_retry(cmd: list[str], retries: int = 1) -> subprocess.CompletedProcess:
    last: subprocess.CompletedProcess | None = None
    for attempt in range(retries + 1):
        proc = run(cmd, check=False)
        last = proc
        if proc.returncode == 0:
            return proc
        err = (proc.stderr or proc.stdout or '').lower()
        if attempt < retries and (
            'the page needs to be reloaded' in err
            or 'sign in to confirm you' in err
            or 'no title found in player responses' in err
        ):
            continue
        return proc
    return last or subprocess.CompletedProcess(cmd, 1)


def convert_cookie_json_to_netscape(src: Path, dst: Path) -> bool:
    if not src.exists():
        return False
    try:
        items = json.loads(src.read_text(encoding='utf-8'))
    except Exception:
        return False
    lines = [
        '# Netscape HTTP Cookie File',
        '# Generated from www.youtube.com_cookies.json',
    ]
    for item in items:
        domain = item.get('domain', '.youtube.com')
        include_subdomains = 'FALSE' if item.get('hostOnly') else 'TRUE'
        path = item.get('path', '/')
        secure = 'TRUE' if item.get('secure') else 'FALSE'
        expiration = item.get('expirationDate')
        if item.get('session') or expiration is None:
            expires = '0'
        else:
            expires = str(int(expiration))
        name = item.get('name', '')
        value = item.get('value', '')
        lines.append('\t'.join([domain, include_subdomains, path, secure, expires, name, value]))
    dst.parent.mkdir(parents=True, exist_ok=True)
    dst.write_text('\n'.join(lines) + '\n', encoding='utf-8')
    return True


def refresh_cookies(workdir: Path) -> str | None:
    tmp_txt = workdir / 'youtube_cookies.txt'
    if convert_cookie_json_to_netscape(DEFAULT_COOKIES_JSON, tmp_txt):
        return str(tmp_txt)
    if DEFAULT_COOKIES_TXT.exists():
        shutil.copy2(DEFAULT_COOKIES_TXT, tmp_txt)
        return str(tmp_txt)
    return None


def get_title(url: str, cookies_path: str | None) -> str:
    cmd = yt_dlp_base_args(cookies_path) + ['--print', 'title', url]
    try:
        proc = run(cmd)
        title = proc.stdout.strip().splitlines()[-1].strip()
        return title or video_id_from_url(url)
    except Exception:
        return video_id_from_url(url)


def list_media_files(workdir: Path, exts: tuple[str, ...]) -> list[Path]:
    files: list[Path] = []
    for ext in exts:
        files.extend(Path(p) for p in glob.glob(str(workdir / f'**/*{ext}'), recursive=True))
    return sorted({p for p in files if p.is_file()})


def normalize_caption_text(lines: list[str]) -> str:
    text = ' '.join(line.strip() for line in lines if line.strip())
    text = re.sub(r'\s+', ' ', text).strip()
    text = re.sub(r'^\[(music|applause|laughter|noise)\]$', '', text, flags=re.I)
    return text


def parse_vtt(path: Path) -> list[tuple[float, str]]:
    cues: list[tuple[float, str]] = []
    lines = path.read_text(encoding='utf-8', errors='ignore').splitlines()
    cue_lines: list[str] = []
    cue_start = 0.0
    in_cue = False
    time_re = re.compile(r'^(?P<start>\d{1,2}:\d{2}:\d{2}\.\d{3}|\d{1,2}:\d{2}\.\d{3})\s+-->')

    def flush() -> None:
        nonlocal cue_lines, cue_start, in_cue
        if in_cue:
            text = normalize_caption_text(cue_lines)
            if text:
                cues.append((cue_start, text))
        cue_lines = []
        in_cue = False

    for line in lines:
        line = line.rstrip('\n')
        if not line or line.startswith('WEBVTT') or line.startswith('Kind:') or line.startswith('Language:'):
            if not line:
                flush()
            continue
        m = time_re.match(line)
        if m:
            flush()
            cue_start = vtt_time_to_seconds(m.group('start'))
            in_cue = True
            continue
        if in_cue and not re.match(r'^\d+$', line):
            cue_lines.append(line)
    flush()
    return cues


def parse_srt(path: Path) -> list[tuple[float, str]]:
    cues: list[tuple[float, str]] = []
    blocks = re.split(r'\n\s*\n', path.read_text(encoding='utf-8', errors='ignore').strip())
    for block in blocks:
        lines = [line.strip('\r') for line in block.splitlines() if line.strip()]
        if len(lines) < 2:
            continue
        time_line = lines[1]
        m = re.match(r'(?P<start>\d{1,2}:\d{2}:\d{2},\d{3})\s+-->\s+(?P<end>\d{1,2}:\d{2}:\d{2},\d{3})', time_line)
        if not m:
            continue
        start = srt_time_to_seconds(m.group('start'))
        text = normalize_caption_text(lines[2:])
        if text:
            cues.append((start, text))
    return cues


def vtt_time_to_seconds(value: str) -> float:
    parts = value.replace(',', '.').split(':')
    if len(parts) == 3:
        hours, minutes, seconds = parts
    else:
        hours = '0'
        minutes, seconds = parts
    return int(hours) * 3600 + int(minutes) * 60 + float(seconds)


def srt_time_to_seconds(value: str) -> float:
    h, m, rest = value.split(':')
    s, ms = rest.split(',')
    return int(h) * 3600 + int(m) * 60 + int(s) + (int(ms) / 1000.0)


def cues_to_paragraphs(cues: list[tuple[float, str]]) -> str:
    if not cues:
        return ''
    paragraphs: list[str] = []
    current: list[str] = []
    current_len = 0
    last_start: float | None = None

    for start, text in cues:
        gap = None if last_start is None else start - last_start
        last_start = start
        if gap is not None and gap > 3.5 and current:
            paragraphs.append(' '.join(current).strip())
            current = []
            current_len = 0
        current.append(text)
        current_len += len(text)
        if current_len >= 320 or text.endswith(('.', '!', '?')):
            paragraphs.append(' '.join(current).strip())
            current = []
            current_len = 0
    if current:
        paragraphs.append(' '.join(current).strip())

    paragraphs = [re.sub(r'\s+', ' ', p).strip() for p in paragraphs if p.strip()]
    return '\n\n'.join(paragraphs)


def download_subtitles(url: str, workdir: Path, cookies_path: str | None, lang: str | None) -> str:
    out_base = str(workdir / 'source.%(ext)s')
    sub_langs = []
    if lang:
        sub_langs.extend([lang, f'{lang}.*'])
    sub_langs.extend(SUBTITLE_LANG_FALLBACKS)
    sub_lang_arg = ','.join(dict.fromkeys(sub_langs))
    cmd = yt_dlp_base_args(cookies_path) + [
        '--write-auto-subs',
        '--write-subs',
        '--sub-langs', sub_lang_arg,
        '--sub-format', 'vtt',
        '--skip-download',
        '-o', out_base,
        url,
    ]
    proc = run_ytdlp_retry(cmd, retries=1)
    # keep going even if yt-dlp returned non-zero, maybe subtitle file was produced
    subtitle_files = list_media_files(workdir, ('.vtt', '.srt'))
    subtitle_files = [p for p in subtitle_files if p.stat().st_size > 0]
    if not subtitle_files:
        raise RuntimeError((proc.stderr or proc.stdout or 'No subtitle files created').strip())
    # prefer the newest file
    subtitle_files.sort(key=lambda p: p.stat().st_mtime, reverse=True)
    sub_path = subtitle_files[0]
    if sub_path.suffix.lower() == '.vtt':
        cues = parse_vtt(sub_path)
    else:
        cues = parse_srt(sub_path)
    transcript = cues_to_paragraphs(cues)
    if not transcript.strip():
        raise RuntimeError(f'Subtitle file was empty: {sub_path}')
    return transcript


def download_audio(url: str, workdir: Path, cookies_path: str | None) -> Path:
    out_base = str(workdir / 'audio.%(ext)s')
    cmd = yt_dlp_base_args(cookies_path) + [
        '-f', 'worstaudio/worst',
        '-x',
        '--audio-format', 'm4a',
        '--ffmpeg-location', str(FFMPEG),
        '--no-part',
        '-o', out_base,
        url,
    ]
    proc = run_ytdlp_retry(cmd, retries=1)
    audio_files = list_media_files(workdir, ('.m4a', '.mp3', '.opus', '.webm', '.m4a.part'))
    audio_files = [p for p in audio_files if p.is_file() and p.suffix != '.part' and p.stat().st_size > 0]
    if not audio_files:
        raise RuntimeError((proc.stderr or proc.stdout or 'No audio file created').strip())
    audio_files.sort(key=lambda p: p.stat().st_mtime, reverse=True)
    return audio_files[0]


def split_audio_if_needed(audio_path: Path, workdir: Path, max_mb: int = 20) -> list[Path]:
    size_mb = audio_path.stat().st_size / (1024 * 1024)
    if size_mb <= max_mb:
        return [audio_path]

    chunk_dir = workdir / 'chunks'
    chunk_dir.mkdir(parents=True, exist_ok=True)
    pattern = str(chunk_dir / 'chunk_%03d.m4a')
    cmd = [
        str(FFMPEG), '-hide_banner', '-loglevel', 'error', '-y',
        '-i', str(audio_path),
        '-f', 'segment',
        '-segment_time', '600',
        '-reset_timestamps', '1',
        '-c', 'copy',
        pattern,
    ]
    run(cmd)
    chunks = sorted(p for p in chunk_dir.glob('chunk_*.m4a') if p.stat().st_size > 0)
    return chunks if chunks else [audio_path]


def transcribe_audio_chunks(chunks: list[Path], language: str | None, workdir: Path) -> str:
    results: list[str] = []
    for idx, chunk in enumerate(chunks, start=1):
        out_path = workdir / f'{chunk.stem}.txt'
        cmd = ['/bin/bash', str(WHISPER), str(chunk), '--out', str(out_path)]
        if language:
            cmd += ['--language', language]
        proc = run(cmd, check=False)
        if proc.returncode != 0:
            raise RuntimeError((proc.stderr or proc.stdout or f'Whisper failed for chunk {idx}').strip())
        if not out_path.exists():
            raise RuntimeError(f'Missing transcript for chunk {idx}: {chunk}')
        text = out_path.read_text(encoding='utf-8', errors='ignore').strip()
        if text:
            results.append(text)
    transcript = '\n\n'.join(r.strip() for r in results if r.strip())
    if not transcript.strip():
        raise RuntimeError('Whisper returned an empty transcript')
    return transcript


def format_transcript(text: str) -> str:
    """Format raw transcript text into readable paragraphs.

    Strategy:
    - Split into sentences on German/English sentence boundaries.
    - Group sentences into paragraphs of ~4-6 sentences each.
    - Detect topic-shift cues (e.g. "Und jetzt", "So,", "Also,", "Aber",
      "Das bedeutet", "Schauen wir", "Kommen wir") to start a new paragraph early.
    - Preserve existing double-newlines (chunk boundaries) as section breaks.
    """
    # Split chunks (from multi-chunk whisper output) into sections
    sections = re.split(r'\n{2,}', text.strip())
    formatted_sections: list[str] = []

    # Sentence splitter: split on . ! ? followed by space + uppercase
    sentence_end = re.compile(r'(?<=[.!?])\s+(?=[A-ZÄÖÜ"])')

    # Cue words that suggest a new paragraph should start
    topic_shift_cues = re.compile(
        r'^(Und (jetzt|nun|da|dann|hier|auch|so)|'
        r'So[,.]|Also[,.]|Aber[,. ]|Das bedeutet|Das heißt|'
        r'Schauen wir|Kommen wir|Zurück zu|Außerdem|Denn |'
        r'Jetzt |Dann |Damit |Deswegen |Deshalb |Im Gegensatz|'
        r'Nichtsdestotrotz|Zusammenfassend|Abschließend|'
        r'Darüber hinaus|Interessanterweise|Bemerkenswert)',
        re.IGNORECASE,
    )

    sentences_per_paragraph = 5  # target group size

    for section in sections:
        section = section.strip()
        if not section:
            continue

        sentences = sentence_end.split(section)
        sentences = [s.strip() for s in sentences if s.strip()]

        if not sentences:
            continue

        paragraphs: list[list[str]] = [[]]
        for sentence in sentences:
            current = paragraphs[-1]
            # Force new paragraph on topic-shift cues (if current para is non-empty)
            if current and topic_shift_cues.match(sentence):
                paragraphs.append([])
                current = paragraphs[-1]
            current.append(sentence)
            # Start new paragraph after reaching target size
            if len(current) >= sentences_per_paragraph:
                paragraphs.append([])

        # Remove empty trailing paragraph
        if paragraphs and not paragraphs[-1]:
            paragraphs.pop()

        section_text = '\n\n'.join(' '.join(p) for p in paragraphs if p)
        formatted_sections.append(section_text)

    return '\n\n---\n\n'.join(formatted_sections)


def write_markdown(out_path: Path, title: str, url: str, transcript: str, source: str) -> None:
    out_path.parent.mkdir(parents=True, exist_ok=True)
    formatted = format_transcript(transcript.strip())
    md = [
        f'# {title}',
        '',
        f'Source: {url}',
        f'Modus: {source}',
        '',
        formatted,
        '',
    ]
    out_path.write_text('\n'.join(md), encoding='utf-8')


def main() -> int:
    parser = argparse.ArgumentParser(description='Transcribe a YouTube video to Markdown.')
    parser.add_argument('url')
    parser.add_argument('--language', default='', help='Preferred transcript language, e.g. de or en')
    parser.add_argument('--out', default='', help='Explicit output .md path')
    args = parser.parse_args()

    with tempfile.TemporaryDirectory(prefix='yt-transcribe-', dir=str(WORKING_DIR)) as tmp:
        workdir = Path(tmp)
        cookies_path = refresh_cookies(workdir)
        title = get_title(args.url, cookies_path)
        video_id = video_id_from_url(args.url)
        out_path = Path(args.out) if args.out else (TRANSFERS_DIR / f'{slugify(title)}-{video_id}.md')

        # 1) Prefer subtitles, then 2) low-quality audio + Whisper.
        transcript = ''
        source = ''
        try:
            transcript = download_subtitles(args.url, workdir, cookies_path, args.language or None)
            source = 'subtitles'
        except Exception as sub_err:
            audio = download_audio(args.url, workdir, cookies_path)
            chunks = split_audio_if_needed(audio, workdir)
            transcript = transcribe_audio_chunks(chunks, args.language or None, workdir)
            source = f'whisper ({len(chunks)} chunk(s))'

        write_markdown(out_path, title, args.url, transcript, source)
        print(out_path)
        return 0


if __name__ == '__main__':
    raise SystemExit(main())
