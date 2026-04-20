#!/bin/bash
set -euo pipefail
if [ -z "${HEYGEN_API_KEY:-}" ]; then echo "ERROR: HEYGEN_API_KEY not set" >&2; exit 1; fi
curl -sf "https://api.heygen.com/v2/templates" -H "X-Api-Key: $HEYGEN_API_KEY" | \
  python3 -c "import sys,json; data=json.load(sys.stdin); [print(f\"{t['template_id']}: {t['name']}\") for t in data.get('data',{}).get('templates',[])]"
