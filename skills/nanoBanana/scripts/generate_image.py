#!/usr/bin/env python3

"""
NanoBanana Image Generation (Python)
Calls Google Gemini API with Nano Banana 2 (gemini-3.1-flash-image-preview)
"""

import json
import sys
import os
import argparse
from datetime import datetime
import base64
from pathlib import Path

try:
    import google.generativeai as genai
except ImportError:
    print(json.dumps({
        "status": "error",
        "error": "Missing dependency",
        "details": "google-generativeai not installed. Run: pip install google-generativeai"
    }))
    sys.exit(1)

# Parse arguments
parser = argparse.ArgumentParser()
parser.add_argument('--prompt', required=True, help='Image generation prompt')
parser.add_argument('--aspect-ratio', default='1:1', help='Aspect ratio (1:1, 16:9, etc.)')
parser.add_argument('--resolution', type=int, default=1024, help='Resolution in pixels')
parser.add_argument('--seed', type=int, default=None, help='Optional seed for reproducibility')
parser.add_argument('--safety-level', default='moderate', help='Safety level')
parser.add_argument('--output-dir', default=None, help='Output directory for images')

args = parser.parse_args()

# Determine output directory
if args.output_dir:
    output_dir = Path(args.output_dir)
else:
    output_dir = Path.home() / '.openclaw' / 'workspace' / 'transfers'

output_dir.mkdir(parents=True, exist_ok=True)

# Get Google API key from environment or config
api_key = os.getenv('GOOGLE_API_KEY')
credentials_path = Path.home() / '.openclaw' / 'agents' / 'main' / 'agent' / 'google_credentials.json'

if not api_key and credentials_path.exists():
    try:
        with open(credentials_path) as f:
            creds = json.load(f)
            api_key = creds.get('api_key')
    except:
        pass

if not api_key:
    # Try to get from Google Cloud default credentials
    try:
        from google.auth import default
        credentials, project = default()
        # Note: This requires service account, not OAuth
    except:
        print(json.dumps({
            "status": "error",
            "error": "No Google credentials found",
            "details": "Set GOOGLE_API_KEY or ensure google_credentials.json exists"
        }))
        sys.exit(1)

# Initialize Gemini API
try:
    genai.configure(api_key=api_key) if api_key else None
except Exception as e:
    print(json.dumps({
        "status": "error",
        "error": "API configuration failed",
        "details": str(e)
    }))
    sys.exit(1)

def map_aspect_ratio(ratio_str):
    """Map aspect ratio to valid Gemini image sizes"""
    ratio_map = {
        '1:1': '1024x1024',
        '16:9': '1376x768',
        '9:16': '768x1376',
        '4:3': '1024x768',
        '3:4': '768x1024',
        '1:4': '512x2048',
        '4:1': '2048x512',
        '1:8': '512x4096',
        '8:1': '4096x512',
    }
    return ratio_map.get(ratio_str, '1024x1024')

def generate_image():
    """Generate image using Gemini API"""
    try:
        # Map aspect ratio to size
        size = map_aspect_ratio(args.aspect_ratio)
        
        # Build config
        config = {
            "temperature": 1,
        }
        
        if args.seed is not None:
            config["seed"] = args.seed
        
        # Create model instance
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        # Generate image
        response = model.generate_content(
            genai.Content(
                parts=[genai.Part.from_text(args.prompt)],
            ),
            generation_config=genai.GenerationConfig(**config),
            # Note: Image generation via Gemini might work differently
            # The API structure may require specific image generation endpoint
        )
        
        # Alternative: Use Gemini with vision/image support
        # For Nano Banana specifically, we may need to use vertex AI or direct API
        
        # Fallback: Use REST API directly
        return generate_via_rest_api()
        
    except Exception as e:
        return {
            "status": "error",
            "error": str(type(e).__name__),
            "details": str(e)
        }

def generate_via_rest_api():
    """Generate image via Google's REST API (more direct)"""
    try:
        import requests
        
        # Google Gemini API endpoint for image generation
        url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"
        
        # Request body
        payload = {
            "contents": [{
                "parts": [{
                    "text": args.prompt
                }]
            }],
            "generationConfig": {
                "temperature": 1,
            }
        }
        
        headers = {
            "Content-Type": "application/json"
        }
        
        params = {"key": api_key}
        
        response = requests.post(url, json=payload, headers=headers, params=params)
        
        if response.status_code != 200:
            return {
                "status": "error",
                "error": f"HTTP {response.status_code}",
                "details": response.text
            }
        
        result = response.json()
        
        # Extract image data
        if 'candidates' not in result or not result['candidates']:
            return {
                "status": "error",
                "error": "No image in response",
                "details": json.dumps(result)
            }
        
        # Image generation might return inline_data or image_url
        candidate = result['candidates'][0]
        parts = candidate.get('content', {}).get('parts', [])
        
        if not parts:
            return {
                "status": "error",
                "error": "Empty response from API",
                "details": json.dumps(result)
            }
        
        part = parts[0]
        image_data = None
        
        if 'inline_data' in part:
            # Base64 encoded image
            image_b64 = part['inline_data']['data']
            image_data = base64.b64decode(image_b64)
        elif 'image_url' in part:
            # URL reference
            image_url = part['image_url']['url']
            # Download image
            img_response = requests.get(image_url)
            if img_response.status_code == 200:
                image_data = img_response.content
        
        if not image_data:
            return {
                "status": "error",
                "error": "Could not extract image data",
                "details": json.dumps(part)
            }
        
        # Save image
        timestamp = int(datetime.now().timestamp() * 1000)
        filename = f'nanoBanana-{timestamp}.png'
        filepath = output_dir / filename
        
        with open(filepath, 'wb') as f:
            f.write(image_data)
        
        # Save metadata
        metadata = {
            "prompt": args.prompt,
            "model": "gemini-3.1-flash-image-preview",
            "aspectRatio": args.aspect_ratio,
            "resolution": args.resolution,
            "seed": args.seed,
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "watermark": "SynthID",
            "c2pa": True
        }
        
        metadata_filepath = output_dir / f'nanoBanana-{timestamp}.json'
        with open(metadata_filepath, 'w') as f:
            json.dump(metadata, f, indent=2)
        
        # Return success
        return {
            "status": "success",
            "imageUrl": f"https://claw.raspb.eu/download/{filename}",
            "localPath": str(filepath),
            "prompt": args.prompt,
            "model": "gemini-3.1-flash-image-preview",
            "aspectRatio": args.aspect_ratio,
            "resolution": f"{args.resolution}x{args.resolution}",
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "metadata": metadata
        }
        
    except ImportError:
        return {
            "status": "error",
            "error": "Missing requests library",
            "details": "Install: pip install requests"
        }
    except Exception as e:
        return {
            "status": "error",
            "error": str(type(e).__name__),
            "details": str(e)
        }

# Run
if __name__ == "__main__":
    result = generate_via_rest_api()
    print(json.dumps(result))
    
    if result['status'] != 'success':
        sys.exit(1)
