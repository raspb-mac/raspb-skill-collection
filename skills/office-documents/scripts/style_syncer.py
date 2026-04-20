#!/usr/bin/env python3
import sys
import re
import json
import requests
from pathlib import Path

def fetch_raspb_style_tokens(url="https://claw.raspb.eu/showcase/raspb-style-guide.html"):
    """
    Fetch style guide and extract design tokens (colors, fonts).
    Fallback to hardcoded v2.0 tokens if fetch fails.
    """
    # Standard v2.0 Fallback
    tokens = {
        "RASPB_PINK": "#E8458B",
        "RASPB_PURPLE": "#7B2FBE",
        "RASPB_VIOLET": "#A855F7",
        "RASPB_ICONIC_BLUE": "#121D33",
        "RASPB_DARK_GREY": "#444444",
        "RASPB_FONT": "Plus Jakarta Sans"
    }

    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            html = response.text
            
            # Simple Regex Extraction (assuming tokens are in comments or CSS vars in the HTML)
            # Example pattern: --color-pink: #E8458B;
            pink_match = re.search(r'--color-pink:\s*(#[0-9a-fA-F]{6})', html)
            if pink_match: tokens["RASPB_PINK"] = pink_match.group(1)
            
            purple_match = re.search(r'--color-purple:\s*(#[0-9a-fA-F]{6})', html)
            if purple_match: tokens["RASPB_PURPLE"] = purple_match.group(1)
            
            # Font extraction
            font_match = re.search(r'--font-main:\s*[\'"]?([^\'";]+)[\'"]?', html)
            if font_match: tokens["RASPB_FONT"] = font_match.group(1)
            
            print(f"✅ Style tokens synced from {url}")
        else:
            print(f"⚠️ Could not sync style guide (Status {response.status_code}). Using v2.0 fallbacks.")
    except Exception as e:
        print(f"⚠️ Style sync error: {e}. Using v2.0 fallbacks.")
    
    return tokens

if __name__ == "__main__":
    # Test execution
    t = fetch_raspb_style_tokens()
    print(json.dumps(t, indent=2))
