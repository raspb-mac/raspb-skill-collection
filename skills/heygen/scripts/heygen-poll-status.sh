#!/bin/bash
# Usage: ./heygen-poll-status.sh <video_id>
# Returns: video_url when completed
set -euo pipefail
VIDEO_ID="${1:-}"
MAX_WAIT=300
if [ -z "${HEYGEN_API_KEY:-}" ]; then echo "ERROR: HEYGEN_API_KEY not set" >&2; exit 1; fi
elapsed=0
while [ $elapsed -lt $MAX_WAIT ]; do
  RESPONSE=$(curl -sf "https://api.heygen.com/v1/video_status.get?video_id=${VIDEO_ID}" -H "X-Api-Key: $HEYGEN_API_KEY")
  STATUS=$(echo "$RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('data',{}).get('status',''))" 2>/dev/null)
  if [ "$STATUS" = "completed" ]; then
    echo "$RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('data',{}).get('video_url',''))"
    exit 0
  elif [ "$STATUS" = "failed" ]; then
    echo "ERROR: Render failed" >&2; exit 1
  fi
  echo "Status: $STATUS — waiting..." >&2
  sleep 20
  elapsed=$((elapsed + 20))
done
echo "ERROR: Timeout after ${MAX_WAIT}s" >&2; exit 1
