#!/usr/bin/env python3
"""
status.py — Upload-Status, geplante Posts verwalten.
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import api as upload_api


def main() -> int:
    parser = argparse.ArgumentParser(description='Upload-Post Status & Scheduling verwalten.')
    sub = parser.add_subparsers(dest='cmd', required=True)

    # status check
    p_status = sub.add_parser('check', help='Status eines Uploads prüfen')
    p_status.add_argument('--request-id', required=True)

    # list scheduled
    sub.add_parser('scheduled', help='Alle geplanten Posts anzeigen')

    # cancel scheduled
    p_cancel = sub.add_parser('cancel', help='Geplanten Post abbrechen')
    p_cancel.add_argument('--job-id', required=True)

    args = parser.parse_args()

    try:
        if args.cmd == 'check':
            result = upload_api.get_upload_status(args.request_id)
        elif args.cmd == 'scheduled':
            result = upload_api.list_scheduled()
        elif args.cmd == 'cancel':
            result = upload_api.cancel_scheduled(args.job_id)
        else:
            parser.print_help()
            return 1

        print(json.dumps(result, indent=2, ensure_ascii=False))
    except Exception as e:
        print(f'[ERROR] {e}', file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
