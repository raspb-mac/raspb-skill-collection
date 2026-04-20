#!/bin/bash
# MARP Presentation Converter for KI Agents
# Converts Markdown files to HTML, PDF, PowerPoint, or PNG

set -e

# ─────────────────────────────────────────────────────────────────────────────
# CONFIGURATION
# ─────────────────────────────────────────────────────────────────────────────

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_DIR="$(dirname "$SCRIPT_DIR")"
THEME_DIR="${SKILL_DIR}/assets/themes"
DEFAULT_OUTPUT_DIR="/home/node/.openclaw/workspace/transfers/results/presentations"

# ─────────────────────────────────────────────────────────────────────────────
# FUNCTIONS
# ─────────────────────────────────────────────────────────────────────────────

usage() {
  cat <<EOF
Usage: marp-convert.sh INPUT_FILE OUTPUT_FORMAT [THEME] [OUTPUT_DIR]

Arguments:
  INPUT_FILE       Path to Markdown file (.md)
  OUTPUT_FORMAT    Output format: html, pdf, pptx, png
  THEME            Theme name (default: gaia)
                   Options: default, gaia, uncover, raspb
  OUTPUT_DIR       Output directory (default: ${DEFAULT_OUTPUT_DIR})

Examples:
  marp-convert.sh slides.md pdf
  marp-convert.sh slides.md html gaia
  marp-convert.sh slides.md pdf raspb /custom/output
  marp-convert.sh slides.md png default

Output:
  Files are saved with the input filename + output extension
  Example: slides.md → slides.pdf

EOF
  exit 1
}

validate_input() {
  if [ ! -f "$MARKDOWN_FILE" ]; then
    echo "❌ Error: Markdown file not found: $MARKDOWN_FILE"
    exit 1
  fi

  case "$OUTPUT_FORMAT" in
    html|pdf|pptx|png) ;;
    *)
      echo "❌ Error: Unsupported format '$OUTPUT_FORMAT'. Use: html, pdf, pptx, png"
      exit 1
      ;;
  esac
}

get_theme_arg() {
  local theme="$1"

  case "$theme" in
    default|gaia|uncover)
      echo "--theme $theme"
      ;;
    raspb)
      if [ -f "${THEME_DIR}/raspb-theme.css" ]; then
        echo "--theme ${THEME_DIR}/raspb-theme.css"
      else
        echo "⚠️  Warning: raspb theme not found, falling back to gaia"
        echo "--theme gaia"
      fi
      ;;
    *)
      echo "⚠️  Warning: Unknown theme '$theme', using gaia"
      echo "--theme gaia"
      ;;
  esac
}

create_output_dir() {
  if [ ! -d "$OUTPUT_DIR" ]; then
    mkdir -p "$OUTPUT_DIR"
    echo "📁 Created output directory: $OUTPUT_DIR"
  fi
}

convert_to_html() {
  local output_file="${OUTPUT_DIR}/${BASENAME}.html"
  local theme_arg=$(get_theme_arg "$THEME")

  echo "🔄 Converting to HTML..."
  npx @marp-team/marp-cli@latest "$MARKDOWN_FILE" \
    -o "$output_file" \
    $theme_arg \
    --html \
    --allow-local-files

  echo "✅ HTML presentation: $output_file"
  echo "$output_file"
}

convert_to_pdf() {
  local output_file="${OUTPUT_DIR}/${BASENAME}.pdf"
  local theme_arg=$(get_theme_arg "$THEME")

  echo "🔄 Converting to PDF..."
  npx @marp-team/marp-cli@latest "$MARKDOWN_FILE" \
    -o "$output_file" \
    $theme_arg \
    --pdf \
    --allow-local-files

  echo "✅ PDF presentation: $output_file"
  echo "$output_file"
}

convert_to_pptx() {
  local output_file="${OUTPUT_DIR}/${BASENAME}.pptx"
  local theme_arg=$(get_theme_arg "$THEME")

  echo "🔄 Converting to PowerPoint..."
  npx @marp-team/marp-cli@latest "$MARKDOWN_FILE" \
    -o "$output_file" \
    $theme_arg \
    --pptx \
    --allow-local-files

  echo "✅ PowerPoint presentation: $output_file"
  echo "$output_file"
}

convert_to_png() {
  local output_pattern="${OUTPUT_DIR}/${BASENAME}-*.png"
  local theme_arg=$(get_theme_arg "$THEME")

  echo "🔄 Converting to PNG slides..."
  npx @marp-team/marp-cli@latest "$MARKDOWN_FILE" \
    -o "$output_pattern" \
    $theme_arg

  local count=$(ls -1 "${OUTPUT_DIR}/${BASENAME}"-*.png 2>/dev/null | wc -l)
  echo "✅ PNG slides generated: $count files"
  echo "   Pattern: $output_pattern"
  ls -1 "${OUTPUT_DIR}/${BASENAME}"-*.png 2>/dev/null | head -1
}

# ─────────────────────────────────────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────────────────────────────────────

if [ $# -lt 2 ]; then
  usage
fi

MARKDOWN_FILE="$1"
OUTPUT_FORMAT="$2"
THEME="${3:-gaia}"
OUTPUT_DIR="${4:-$DEFAULT_OUTPUT_DIR}"

# Normalize paths
MARKDOWN_FILE="$(cd "$(dirname "$MARKDOWN_FILE")" && pwd)/$(basename "$MARKDOWN_FILE")"
BASENAME=$(basename "$MARKDOWN_FILE" .md)

# Validate inputs
validate_input

# Create output directory
create_output_dir

# Convert based on format
case "$OUTPUT_FORMAT" in
  html)
    convert_to_html
    ;;
  pdf)
    convert_to_pdf
    ;;
  pptx)
    convert_to_pptx
    ;;
  png)
    convert_to_png
    ;;
esac

echo ""
echo "🎉 Conversion complete!"
exit 0
