#!/bin/bash
set -euo pipefail
if [ -z "${HEYGEN_API_KEY:-}" ]; then echo "ERROR: HEYGEN_API_KEY not set" >&2; exit 1; fi
curl -sf "https://api.heygen.com/v2/avatars" -H "X-Api-Key: $HEYGEN_API_KEY" | \
  python3 -c "import sys,json; data=json.load(sys.stdin); [print(f\"{a['avatar_id']}: {a['avatar_name']}\") for a in data.get('data',{}).get('avatars',[])]"
