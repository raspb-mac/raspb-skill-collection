#!/usr/bin/env python3
"""Generate placeholder images from Lorem Picsum."""

import os
import argparse
import urllib.request
import zipfile


def generate_images(count=10, width=1200, height=720, output_dir="/tmp/picsum"):
    os.makedirs(output_dir, exist_ok=True)
    urls = []
    for i in range(count):
        url = f"https://picsum.photos/seed/{i+1}/{width}/{height}"
        filename = os.path.join(output_dir, f"image_{i+1:02d}.jpg")
        urllib.request.urlretrieve(url, filename)
        urls.append(url)
        print(f"Downloaded: {filename}")
    return urls


def create_zip(image_dir, zip_path):
    with zipfile.ZipFile(zip_path, 'w') as zf:
        for f in sorted(os.listdir(image_dir)):
            if f.endswith('.jpg'):
                zf.write(os.path.join(image_dir, f), f)
    return zip_path


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate Lorem Picsum placeholder images")
    parser.add_argument("--count", type=int, default=10, help="Number of images")
    parser.add_argument("--width", type=int, default=1200, help="Image width")
    parser.add_argument("--height", type=int, default=720, help="Image height")
    parser.add_argument("--output", default="/tmp/picsum_images", help="Output directory")
    parser.add_argument("--zip", action="store_true", help="Create ZIP archive")
    parser.add_argument("--zip-path", default="/tmp/picsum_images.zip", help="ZIP output path")
    args = parser.parse_args()

    generate_images(args.count, args.width, args.height, args.output)
    if args.zip:
        zip_file = create_zip(args.output, args.zip_path)
        print(f"ZIP: {zip_file}")
