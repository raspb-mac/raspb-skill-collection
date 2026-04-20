#!/usr/bin/env python3
"""MARP Deck Builder — orchestrates image fetching and MARP conversion."""

import os
import subprocess
import argparse
import sys

WORKSPACE = "/home/node/.openclaw/workspace"
THEME_PATH = f"{WORKSPACE}/skills/marp/assets/themes/raspb-theme.css"
SHOWCASE_DIR = f"{WORKSPACE}/transfers/showcase"


def fetch_unsplash(keyword):
    """Fetch image URL from Unsplash API."""
    script = f"{WORKSPACE}/skills/marp/scripts/fetch-unsplash.sh"
    result = subprocess.run(["bash", script, keyword], capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or result.stdout.strip())
    return result.stdout.strip()


def fetch_svg(prompt):
    """Fetch SVG URL from SVGMaker.io."""
    script = f"{WORKSPACE}/skills/marp/scripts/fetch-svg.sh"
    result = subprocess.run(["bash", script, prompt], capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or result.stdout.strip())
    return result.stdout.strip()


def convert_to_html(input_md, output_html):
    """Convert MARP markdown to HTML."""
    os.makedirs(os.path.dirname(output_html), exist_ok=True)
    cmd = [
        "npx", "@marp-team/marp-cli@latest",
        "--theme", THEME_PATH,
        "--allow-local-files", "--html",
        "--output", output_html,
        input_md,
    ]
    subprocess.run(cmd, check=True)
    return output_html


def deploy_showcase(html_path):
    """Deploy to showcase website."""
    script = f"{WORKSPACE}/skills/showcase-website/scripts/expose_showcase.py"
    result = subprocess.run(["python3", script, html_path], capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or result.stdout.strip())
    for line in result.stdout.splitlines():
        if "https://" in line:
            return line.strip()
    return None


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="MARP Deck Builder")
    subparsers = parser.add_subparsers(dest="command")

    conv = subparsers.add_parser("convert", help="Convert MD to HTML")
    conv.add_argument("input", help="Input .md file")
    conv.add_argument("--output", help="Output .html file")

    dep = subparsers.add_parser("deploy", help="Convert + deploy to showcase")
    dep.add_argument("input", help="Input .md file")
    dep.add_argument("--name", help="Output filename (default: same as input)")

    img = subparsers.add_parser("fetch-image", help="Fetch Unsplash image URL")
    img.add_argument("keyword", help="Search keyword")

    svg = subparsers.add_parser("fetch-svg", help="Fetch SVGMaker SVG URL")
    svg.add_argument("prompt", help="SVG prompt")

    args = parser.parse_args()

    if args.command == "convert":
        out = args.output or args.input.replace(".md", ".html")
        out_path = os.path.join(SHOWCASE_DIR, os.path.basename(out))
        convert_to_html(args.input, out_path)
        print(f"Converted: {out_path}")

    elif args.command == "deploy":
        name = args.name or os.path.basename(args.input).replace(".md", ".html")
        out_path = os.path.join(SHOWCASE_DIR, name)
        convert_to_html(args.input, out_path)
        url = deploy_showcase(out_path)
        print(f"Live: {url or out_path}")

    elif args.command == "fetch-image":
        print(fetch_unsplash(args.keyword))

    elif args.command == "fetch-svg":
        print(fetch_svg(args.prompt))

    else:
        parser.print_help()
