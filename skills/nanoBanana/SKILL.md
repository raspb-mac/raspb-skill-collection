---
name: nanoBanana
description: Image generation with Google's Nano Banana 2 (Gemini 3.1 Flash Image). Create AI images from text prompts using advanced generative models.
category: media-generation
---

# NanoBanana Skill — Image Generation

**Nano Banana 2** is Google's latest image generation model (Gemini 3.1 Flash Image, Feb 2026).

- ✅ Fast, high-quality image generation
- ✅ Supports complex prompts, character consistency, storytelling
- ✅ Aspect ratios: 1:1, 16:9, 4:3, 9:16, 1:4, 4:1, 1:8, 8:1
- ✅ Resolution: 512px up to 4K
- ✅ All images marked with SynthID watermark + C2PA credentials

## Quick Start

### Generate Image
```bash
node skills/nanoBanana/scripts/generate_image.js \
  --prompt "A red cat sitting on the moon" \
  --aspect-ratio "1:1" \
  --resolution "1024"
```

### Output
- **Image saved to:** `transfers/nanoBanana-<timestamp>.png`
- **Download link:** `https://claw.raspb.eu/download/nanoBanana-<timestamp>.png`
- **Metadata saved to:** `transfers/nanoBanana-<timestamp>.json`

## Configuration

### Environment Variables
```bash
# Uses your existing Google credentials:
# ~/.openclaw/agents/main/agent/google_token.json
# ~/.openclaw/agents/main/agent/google_credentials.json
```

No additional setup needed — uses your existing Google OAuth token!

## Command Reference

### `generate_image.js`

**Options:**
```
--prompt <text>         Image prompt (required)
--aspect-ratio <ratio>  1:1 | 16:9 | 4:3 | 9:16 | 1:4 | 4:1 | 1:8 | 8:1 (default: 1:1)
--resolution <px>       512 | 768 | 1024 | 2048 (default: 1024)
--seed <number>         Optional seed for reproducibility
--safety-level <level>  strict | moderate | relaxed (default: moderate)
--output-dir <path>     Save location (default: transfers/)
```

**Examples:**

Generate square image (1:1, 1024px):
```bash
node skills/nanoBanana/scripts/generate_image.js \
  --prompt "A serene landscape with mountains and lakes"
```

Generate wide image (16:9, 2048px):
```bash
node skills/nanoBanana/scripts/generate_image.js \
  --prompt "A cyberpunk city at night with neon lights" \
  --aspect-ratio "16:9" \
  --resolution "2048"
```

Generate portrait (9:16):
```bash
node skills/nanoBanana/scripts/generate_image.js \
  --prompt "Professional headshot of a woman in business attire" \
  --aspect-ratio "9:16"
```

Reproducible image (with seed):
```bash
node skills/nanoBanana/scripts/generate_image.js \
  --prompt "A blue butterfly on a flower" \
  --seed 12345
```

## Response Format

### Success
```json
{
  "status": "success",
  "imageUrl": "https://claw.raspb.eu/download/nanoBanana-1740689289123.png",
  "localPath": "/home/node/.openclaw/workspace/transfers/nanoBanana-1740689289123.png",
  "prompt": "A red cat sitting on the moon",
  "model": "gemini-3.1-flash-image-preview",
  "aspectRatio": "1:1",
  "resolution": "1024x1024",
  "timestamp": "2026-02-28T22:30:15.123Z",
  "metadata": {
    "watermark": "SynthID",
    "c2pa": true,
    "seed": null
  }
}
```

### Error
```json
{
  "status": "error",
  "error": "API error or validation failure",
  "details": "Full error message from API"
}
```

## Behavior Rules

When you use this skill via Haley agent:

1. **Auto-detection:** If user asks "generate an image", "create a picture", "draw", "make an image" → call nanoBanana automatically
2. **Prompt refinement:** If prompt is vague, ask for clarification (style, mood, composition)
3. **Download link:** Always provide `https://claw.raspb.eu/download/...` (inline Markdown, not code blocks!)
4. **Metadata:** Save metadata to `transfers/nanoBanana-<timestamp>.json` for records
5. **Multiple images:** If user asks for variations, generate separate images and provide all links

## Technical Notes

- **Model:** `gemini-3.1-flash-image-preview`
- **API:** Google Gemini API (via Python SDK)
- **Auth:** OAuth 2.0 via existing Google credentials
- **Rate limits:** Standard Google API quotas apply
- **Costs:** Included in Google AI Studio free tier (up to limits)

## Troubleshooting

**"Invalid credentials"**
→ Check if `google_token.json` exists and is valid
→ Run: `node skills/google/scripts/google_client.js calendar_list` to verify

**"Prompt rejected (safety filter)"**
→ Use `--safety-level relaxed` (if appropriate)
→ Rephrase prompt to avoid triggering safety mechanisms

**"Rate limit exceeded"**
→ Wait a moment and retry
→ Google API has usage quotas; free tier may have daily limits

**"Output image is low quality"**
→ Increase `--resolution` (e.g., 2048 instead of 1024)
→ Refine prompt with more specific details (style, mood, lighting)

## Next Steps

- [Generate your first image](./EXAMPLES.md)
- [Nano Banana 2 Docs](https://blog.google/innovation-and-ai/technology/ai/nano-banana-2/)
- [Gemini API Docs](https://ai.google.dev/gemini-api/docs/image-generation)
