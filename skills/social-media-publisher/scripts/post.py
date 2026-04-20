#!/usr/bin/env python3
"""
post.py — Social Media Post veröffentlichen via Upload-Post API.

Unterstützt:
  - Text-Posts (LinkedIn, Facebook, X, Threads, Bluesky)
  - Foto-Posts mit Bild (LinkedIn, Facebook, Instagram, X, ...)
  - Link als first_comment
  - Scheduling (ISO-8601 Datum)
  - Dry-Run (zeigt Payload ohne Abschicken)
  - Multi-Plattform in einem Call
  - Persönliches Profil (markus) + Company Page (raspb)
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

# Pfad-Setup
sys.path.insert(0, str(Path(__file__).parent))

from config import ACCOUNTS, PLATFORM_MAP
import api as upload_api


def resolve_account(account_key: str) -> dict:
    acc = ACCOUNTS.get(account_key)
    if not acc:
        print(f'[ERROR] Unbekannter Account: {account_key}', file=sys.stderr)
        print(f'  Verfügbar: {", ".join(ACCOUNTS.keys())}', file=sys.stderr)
        sys.exit(1)
    return acc


def resolve_platforms(platform_args: list[str]) -> list[str]:
    result = []
    for p in platform_args:
        mapped = PLATFORM_MAP.get(p.lower(), p.lower())
        result.append(mapped)
    return list(dict.fromkeys(result))  # deduplizieren, Reihenfolge erhalten


def print_result(result: dict, dry_run: bool) -> None:
    print()
    if dry_run:
        print('✅ [DRY-RUN] Payload würde gesendet:')
        payload = result.get('payload') or result.get('fields', {})
        files   = result.get('files', [])
        print(json.dumps(payload, indent=2, ensure_ascii=False))
        if files:
            print(f'  Dateien: {files}')
        return

    print('✅ Post erfolgreich eingereicht!')
    req_id = result.get('request_id', result.get('id', '?'))
    print(f'  request_id: {req_id}')

    if result.get('job_id'):
        print(f'  job_id (scheduled): {result["job_id"]}')

    # Status-Details falls sync
    if result.get('results'):
        for platform, r in result['results'].items():
            status = r.get('status', '?')
            url    = r.get('post_url') or r.get('url', '')
            print(f'  [{platform}] {status}' + (f' → {url}' if url else ''))

    print(f'\n  Status prüfen:')
    print(f'    python3 status.py --request-id {req_id}')


def main() -> int:
    parser = argparse.ArgumentParser(
        description='Social Media Post via Upload-Post API veröffentlichen.',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Beispiele:
  # Text-Post als Markus auf LinkedIn
  python3 post.py --account markus --platform linkedin --text "Mein erster KI-Post!"

  # Auf mehreren Plattformen gleichzeitig
  python3 post.py --account markus --platform linkedin facebook --text "News!"

  # Als raspb Company Page auf LinkedIn
  python3 post.py --account raspb --platform linkedin --text "raspb Update"

  # Mit Bild
  python3 post.py --account markus --platform linkedin --text "Caption" --image /pfad/bild.jpg

  # Link als Kommentar (empfohlen)
  python3 post.py --account markus --platform linkedin --text "Artikel" --comment "https://example.com"

  # Geplanter Post (ISO-8601)
  python3 post.py --account markus --platform linkedin --text "Morgen!" --schedule "2026-04-17T09:00:00"

  # Dry-Run (zeigt Payload ohne Abschicken)
  python3 post.py --account markus --platform linkedin --text "Test" --dry-run
        """,
    )
    parser.add_argument('--account', choices=list(ACCOUNTS.keys()), required=True,
                        help='Account: markus (persönlich) oder raspb (Company Page)')
    parser.add_argument('--platform', nargs='+', required=True,
                        choices=list(PLATFORM_MAP.keys()),
                        help='Plattform(en): linkedin facebook x threads bluesky instagram tiktok')
    parser.add_argument('--text', required=True,
                        help='Post-Text. \\n für Zeilenumbrüche.')
    parser.add_argument('--image', default='',
                        help='Pfad zu einem Bild (jpg/png) für Foto-Post')
    parser.add_argument('--video', default='',
                        help='Pfad zu einem Video (mp4/mov) für Video-Post')
    parser.add_argument('--comment', default='',
                        help='Erster Kommentar nach dem Post (ideal für Links)')
    parser.add_argument('--schedule', default='',
                        help='Geplantes Datum/Zeit (ISO-8601, z.B. 2026-04-17T09:00:00)')
    parser.add_argument('--dry-run', action='store_true',
                        help='Payload anzeigen ohne wirklich zu posten')
    args = parser.parse_args()

    acc       = resolve_account(args.account)
    platforms = resolve_platforms(args.platform)
    text      = args.text.replace('\\n', '\n')
    image     = Path(args.image) if args.image else None
    video     = Path(args.video) if args.video else None
    comment   = args.comment or None
    schedule  = args.schedule or None
    dry_run   = args.dry_run

    # LinkedIn Company Page ID einfügen falls raspb
    linkedin_page_id = acc.get('linkedin_page_id')

    print(f'[social-media-publisher] Account: {acc["display"]}')
    print(f'  Plattformen: {", ".join(platforms)}')
    print(f'  Text: {text[:80]}{"…" if len(text) > 80 else ""}')
    if image:
        print(f'  Bild: {image}')
    if video:
        print(f'  Video: {video}')
    if comment:
        print(f'  Kommentar: {comment[:60]}{"…" if len(comment) > 60 else ""}')
    if schedule:
        print(f'  Geplant für: {schedule}')
    if dry_run:
        print('  [DRY-RUN]')

    # Datei-Checks
    if image and not image.exists():
        print(f'[ERROR] Bild nicht gefunden: {image}', file=sys.stderr)
        return 1
    if video and not video.exists():
        print(f'[ERROR] Video nicht gefunden: {video}', file=sys.stderr)
        return 1

    try:
        if video:
            result = upload_api.upload_video(
                user=acc['user'],
                platforms=platforms,
                video_path=video,
                title=text,
                first_comment=comment,
                scheduled_date=schedule,
                target_linkedin_page_id=linkedin_page_id,
                dry_run=dry_run,
            )
        elif image:
            result = upload_api.upload_photo(
                user=acc['user'],
                platforms=platforms,
                images=[image],
                title=text,
                first_comment=comment,
                scheduled_date=schedule,
                target_linkedin_page_id=linkedin_page_id,
                dry_run=dry_run,
            )
        else:
            result = upload_api.upload_text(
                user=acc['user'],
                platforms=platforms,
                title=text,
                first_comment=comment,
                scheduled_date=schedule,
                target_linkedin_page_id=linkedin_page_id,
                dry_run=dry_run,
            )
    except Exception as e:
        print(f'\n[ERROR] API-Aufruf fehlgeschlagen: {e}', file=sys.stderr)
        return 1

    print_result(result, dry_run)
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
