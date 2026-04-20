#!/bin/bash
# Usage: ./heygen-create-video.sh "<script_text>" [avatar_id] [voice_id]
# Env: HEYGEN_API_KEY
# Returns: video_id
set -euo pipefail
SCRIPT_TEXT="${1:-}"
AVATAR_ID="${2:-Daisy-inskirt-20220818}"
VOICE_ID="${3:-2d5b0e6cf36f460aa7fc47e3eee4ba54}"
if [ -z "${HEYGEN_API_KEY:-}" ]; then echo "ERROR: HEYGEN_API_KEY not set" >&2; exit 1; fi
RESPONSE=$(curl -sf -X POST "https://api.heygen.com/v2/video/generate" \
  -H "X-Api-Key: $HEYGEN_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"video_inputs\":[{\"character\":{\"type\":\"avatar\",\"avatar_id\":\"${AVATAR_ID}\",\"avatar_style\":\"normal\"},\"voice\":{\"type\":\"text\",\"input_text\":\"${SCRIPT_TEXT}\",\"voice_id\":\"${VOICE_ID}\"}}],\"dimension\":{\"width\":1280,\"height\":720}}")
echo "$RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('data',{}).get('video_id',''))"
