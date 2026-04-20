#!/bin/bash
# Usage: ./fetch-svg.sh "PROMPT"
# Returns: SVG URL from SVGMaker.io (valid 12h)
# For inline use: curl the returned URL to get SVG content
PROMPT="${*:-abstract flat illustration}"
KEY="${SVG_MAKER_KEY}"
if [ -z "$KEY" ]; then echo "ERROR: SVG_MAKER_KEY not set in environment" >&2; exit 1; fi
BODY=$(python3 -c "import json,sys; print(json.dumps({'prompt': sys.argv[1]}))" "$PROMPT")
RESULT=$(curl -sf -X POST "https://api.svgmaker.io/v1/generate" \
  -H "x-api-key: ${KEY}" \
  -H "Content-Type: application/json" \
  -d "$BODY")
# Extract svgUrl from response
python3 -c "
import sys,json
d=json.load(sys.stdin)
url = d.get('data',{}).get('svgUrl','')
if url:
    print(url)
else:
    print('ERROR: ' + str(d), file=sys.stderr)
    sys.exit(1)
" <<< "$RESULT"
