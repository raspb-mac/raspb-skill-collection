#!/bin/bash
# Usage: ./fetch-unsplash.sh "KEYWORD"
# Returns: direct Unsplash image URL for use in MARP slides
KEYWORD="${1:-business}"
KEY="${UNSPLASH_KEY}"
if [ -z "$KEY" ]; then echo "ERROR: UNSPLASH_KEY not set in environment" >&2; exit 1; fi
RESULT=$(curl -sf "https://api.unsplash.com/photos/random?query=$(python3 -c "import urllib.parse,sys; print(urllib.parse.quote('${KEYWORD}'))")&orientation=landscape&client_id=${KEY}")
URL=$(echo "$RESULT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('urls',{}).get('regular',''))" 2>/dev/null)
if [ -z "$URL" ]; then echo "ERROR: Could not fetch image for query '${KEYWORD}'" >&2; exit 1; fi
echo "$URL"
