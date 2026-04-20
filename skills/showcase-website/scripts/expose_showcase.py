#!/usr/bin/env python3
"""
Expose Showcase Script
Copies HTML files to transfers/showcase/ and generates a permanent URL.
"""

import sys
import os
import shutil
import argparse
from pathlib import Path

def main():
    parser = argparse.ArgumentParser(description="Expose HTML file as showcase URL")
    parser.add_argument("source", help="Source HTML file path")
    parser.add_argument("--name", help="Custom filename (optional)")
    
    args = parser.parse_args()
    
    source_path = Path(args.source).resolve()
    
    # Validate source file exists and is HTML
    if not source_path.exists():
        print(f"❌ Fehler: Datei nicht gefunden: {source_path}", file=sys.stderr)
        sys.exit(1)
    
    if not source_path.suffix.lower() == '.html':
        print(f"⚠️ Warnung: Datei ist kein HTML: {source_path}", file=sys.stderr)
    
    # Determine target filename
    target_filename = args.name if args.name else source_path.name
    
    # Ensure .html extension
    if not target_filename.endswith('.html'):
        target_filename += '.html'
    
    # Target directory
    showcase_dir = Path("/home/node/.openclaw/workspace/transfers/showcase")
    showcase_dir.mkdir(parents=True, exist_ok=True)
    
    target_path = showcase_dir / target_filename
    
    # Check if file already exists
    if target_path.exists():
        print(f"✅ Showcase: https://claw.raspb.eu/showcase/{target_filename}")
        print(f"   (Datei existiert bereits, kein Kopieren nötig)")
    else:
        # Copy file
        try:
            shutil.copy2(source_path, target_path)
            print(f"✅ Showcase: https://claw.raspb.eu/showcase/{target_filename}")
        except Exception as e:
            print(f"❌ Fehler beim Kopieren: {e}", file=sys.stderr)
            sys.exit(1)

if __name__ == "__main__":
    main()
