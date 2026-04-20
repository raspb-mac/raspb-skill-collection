#!/usr/bin/env python3
"""HeyGen API Client — Python wrapper for all HeyGen operations."""

import argparse
import json
import os
import time
import urllib.error
import urllib.request
from pathlib import Path

API_KEY = os.environ.get("HEYGEN_API_KEY", "")
BASE_URL = "https://api.heygen.com"


def _request(method, path, body=None):
    if not API_KEY:
        raise RuntimeError("HEYGEN_API_KEY not set")
    url = f"{BASE_URL}{path}"
    headers = {"X-Api-Key": API_KEY}
    data = None
    if body is not None:
        data = json.dumps(body).encode("utf-8")
        headers["Content-Type"] = "application/json"
    req = urllib.request.Request(url, headers=headers, data=data, method=method)
    try:
        with urllib.request.urlopen(req) as resp:
            payload = resp.read().decode("utf-8")
            return json.loads(payload) if payload else {}
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"HTTP {exc.code}: {detail or exc.reason}") from exc


def _extract_list(data, key):
    container = data.get("data", {})
    items = container.get(key, [])
    return items if isinstance(items, list) else []


def list_avatars():
    data = _request("GET", "/v2/avatars")
    avatars = _extract_list(data, "avatars")
    for avatar in avatars:
        print(f"{avatar.get('avatar_id', '')}: {avatar.get('avatar_name', '')}")
    return avatars


def list_templates():
    data = _request("GET", "/v2/templates")
    templates = _extract_list(data, "templates")
    for template in templates:
        print(f"{template.get('template_id', '')}: {template.get('name', '')}")
    return templates


def list_voices():
    data = _request("GET", "/v2/voices")
    voices = _extract_list(data, "voices")
    for voice in voices:
        print(f"{voice.get('voice_id', '')}: {voice.get('name', '')}")
    return voices


def create_video(script_text, avatar_id, voice_id, width=1280, height=720):
    body = {
        "video_inputs": [
            {
                "character": {
                    "type": "avatar",
                    "avatar_id": avatar_id,
                    "avatar_style": "normal",
                },
                "voice": {
                    "type": "text",
                    "input_text": script_text,
                    "voice_id": voice_id,
                },
            }
        ],
        "dimension": {"width": width, "height": height},
    }
    data = _request("POST", "/v2/video/generate", body)
    video_id = data.get("data", {}).get("video_id", "")
    if not video_id:
        raise RuntimeError(f"No video_id returned: {data}")
    print(video_id)
    return video_id


def poll_status(video_id, max_wait=300, interval=20):
    elapsed = 0
    while elapsed < max_wait:
        data = _request("GET", f"/v1/video_status.get?video_id={video_id}")
        status = data.get("data", {}).get("status", "")
        if status == "completed":
            url = data.get("data", {}).get("video_url", "")
            print(url)
            return url
        if status == "failed":
            raise RuntimeError("Render failed")
        print(f"Status: {status} — waiting...", flush=True)
        time.sleep(interval)
        elapsed += interval
    raise RuntimeError(f"Timeout after {max_wait}s")


def download_video(video_url, output_path):
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    urllib.request.urlretrieve(video_url, output_path)
    print(f"Saved: {output_path}")
    return str(output_path)


def main():
    parser = argparse.ArgumentParser(description="HeyGen API Client")
    sub = parser.add_subparsers(dest="command", required=True)

    p = sub.add_parser("create", help="Create a video")
    p.add_argument("--script", required=True)
    p.add_argument("--avatar", required=True)
    p.add_argument("--voice", required=True)
    p.add_argument("--width", type=int, default=1280)
    p.add_argument("--height", type=int, default=720)

    p = sub.add_parser("poll", help="Poll video status")
    p.add_argument("--video-id", required=True)
    p.add_argument("--max-wait", type=int, default=300)
    p.add_argument("--interval", type=int, default=20)

    sub.add_parser("list-avatars", help="List avatars")
    sub.add_parser("list-templates", help="List templates")
    sub.add_parser("list-voices", help="List voices")

    p = sub.add_parser("download", help="Download a completed video")
    p.add_argument("--url", required=True)
    p.add_argument("--output", required=True)

    args = parser.parse_args()

    if args.command == "create":
        create_video(args.script, args.avatar, args.voice, args.width, args.height)
    elif args.command == "poll":
        poll_status(args.video_id, args.max_wait, args.interval)
    elif args.command == "list-avatars":
        list_avatars()
    elif args.command == "list-templates":
        list_templates()
    elif args.command == "list-voices":
        list_voices()
    elif args.command == "download":
        download_video(args.url, args.output)


if __name__ == "__main__":
    main()
