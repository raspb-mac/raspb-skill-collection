#!/bin/bash
# Usage: ./heygen-download-video.sh <video_url> <output_filename>
set -euo pipefail
VIDEO_URL="${1:-}"
OUTPUT="${2:-video_output.mp4}"
OUTPUT_PATH="/home/node/.openclaw/workspace/transfers/results/${OUTPUT}"
curl -L -o "$OUTPUT_PATH" "$VIDEO_URL" && echo "Saved: $OUTPUT_PATH"
