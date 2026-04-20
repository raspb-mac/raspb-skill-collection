#!/bin/bash
# notion2docx.sh – Notion Page → raspb Word Document (One-Shot Pipeline)
# Usage: ./notion2docx.sh <NOTION_PAGE_ID> <OUTPUT_NAME>
# Example: ./notion2docx.sh 31a39d9c-996f-819e-b374-c833f28f0bf4 Projektauftrag
set -euo pipefail

PAGE_ID="${1:?Usage: notion2docx.sh <PAGE_ID> <OUTPUT_NAME>}"
NAME="${2:?Usage: notion2docx.sh <PAGE_ID> <OUTPUT_NAME>}"

SKILL_DIR="/home/node/.openclaw/workspace/skills"
TEMPLATE="${SKILL_DIR}/office-documents/assets/raspb-letter-v2.docx"
TASKS_DIR="/home/node/.openclaw/workspace/tasks"
TMP_MD="/tmp/${NAME}_notion_export.md"
OUTPUT="${TASKS_DIR}/${NAME}.docx"

export PYTHONPATH="/home/node/.local/lib/python3.11/site-packages:${PYTHONPATH:-}"

echo "[1/3] Exporting Notion page ${PAGE_ID} → Markdown..."
python3 "${SKILL_DIR}/notion/scripts/notion_client.py" page "${PAGE_ID}" --format=markdown > "${TMP_MD}"

if [ ! -s "${TMP_MD}" ]; then
    echo "ERROR: Notion export is empty. Check PAGE_ID and API access." >&2
    exit 1
fi

echo "[2/3] Converting Markdown → Word (raspb template)..."
python3 "${SKILL_DIR}/office-documents/scripts/md2docx_raspb.py" \
    --md_path "${TMP_MD}" \
    --template_path "${TEMPLATE}" \
    --output_path "${OUTPUT}"

echo "[3/3] Transferring for download..."
python3 "/home/node/.openclaw/workspace/skills/file-transfer/scripts/transfer_file.py" "${OUTPUT}"

rm -f "${TMP_MD}"
echo "Done: ${NAME}.docx"
