# NanoBanana Examples

## Basic Usage

### Example 1: Simple Landscape
```bash
node skills/nanoBanana/scripts/generate_image.js \
  --prompt "A serene mountain landscape with a crystal clear lake at sunset, golden hour lighting, photorealistic"
```

**Output:**
```
✅ Image generated successfully
📥 Download: https://claw.raspb.eu/download/nanoBanana-1740689289123.png
```

---

### Example 2: Portrait (9:16 aspect ratio)
```bash
node skills/nanoBanana/scripts/generate_image.js \
  --prompt "Professional headshot of a woman in business attire, warm lighting, studio photography" \
  --aspect-ratio "9:16" \
  --resolution "1024"
```

---

### Example 3: Wide Cinematic Scene (16:9)
```bash
node skills/nanoBanana/scripts/generate_image.js \
  --prompt "Cyberpunk city at night, neon lights reflecting on wet streets, flying vehicles, dystopian atmosphere, cinematic" \
  --aspect-ratio "16:9" \
  --resolution "2048"
```

---

### Example 4: Character Consistency (with seed)
```bash
# Generate first image
node skills/nanoBanana/scripts/generate_image.js \
  --prompt "A red fox sitting in a snowy forest, detailed fur, warm eyes, photorealistic" \
  --seed 42

# Generate variation with same character (same seed)
node skills/nanoBanana/scripts/generate_image.js \
  --prompt "A red fox running through a snowy forest, motion blur, dynamic composition" \
  --seed 42
```

---

## Use Cases

### 1. **Product Design Mockup**
```bash
node skills/nanoBanana/scripts/generate_image.js \
  --prompt "Sleek modern smartphone with curved edges, premium materials, minimalist design, studio lighting, white background"
```

### 2. **Marketing Material**
```bash
node skills/nanoBanana/scripts/generate_image.js \
  --prompt "Team of diverse professionals collaborating in a modern office, bright natural light, warm color palette, inclusive atmosphere" \
  --aspect-ratio "16:9"
```

### 3. **Concept Art**
```bash
node skills/nanoBanana/scripts/generate_image.js \
  --prompt "Ancient alien temple covered in moss, bioluminescent flora, misty atmosphere, concept art style, highly detailed" \
  --resolution "2048"
```

### 4. **Book Cover**
```bash
node skills/nanoBanana/scripts/generate_image.js \
  --prompt "Dystopian future cityscape, lone figure standing on building edge, dramatic lighting, noir atmosphere, book cover composition" \
  --aspect-ratio "4:3"
```

### 5. **Social Media Graphics**
```bash
node skills/nanoBanana/scripts/generate_image.js \
  --prompt "Minimalist abstract design, geometric shapes, gradient colors (blue to purple), modern aesthetic, social media thumbnail" \
  --aspect-ratio "1:1"
```

---

## Tips for Better Results

### Prompt Structure
**Good:** "A golden retriever running through a sunlit meadow, surrounded by wildflowers, happy expression, photorealistic, professional photography"

**Bad:** "Dog running"

### Include Style References
- `photorealistic` — realistic photography
- `oil painting` — classic art style
- `digital art` — modern digital design
- `concept art` — detailed illustration
- `cinematic` — movie-like composition
- `illustration` — drawn/painted style
- `3D render` — 3D modeling style

### Lighting & Mood
- `warm golden hour lighting` — sunset glow
- `dramatic side lighting` — cinematic
- `soft diffused light` — gentle
- `neon-lit` — cyberpunk
- `moody atmospheric` — mysterious

### Level of Detail
- `highly detailed` — maximum detail
- `intricate` — complex patterns
- `fine details` — precision
- `macro` — close-up photography

### Composition
- `rule of thirds` — balanced composition
- `leading lines` — visual guides
- `depth of field` — background blur
- `wide angle` — expansive view
- `close-up` — focused detail

---

## Advanced Features

### Multiple Variations
Generate 3 variations of a scene:

```bash
for i in {1..3}; do
  node skills/nanoBanana/scripts/generate_image.js \
    --prompt "A cozy coffee shop in Paris, warm lighting, autumn aesthetic" \
    --seed $((100 + i))
done
```

### High Resolution Batch
```bash
node skills/nanoBanana/scripts/generate_image.js \
  --prompt "Ultra-high quality landscape" \
  --resolution "2048" \
  --aspect-ratio "16:9"
```

---

## Output Files

After generation, you'll have:

1. **Image:** `transfers/nanoBanana-<timestamp>.png`
2. **Metadata:** `transfers/nanoBanana-<timestamp>.json`

Metadata example:
```json
{
  "prompt": "A red cat on the moon",
  "model": "gemini-3.1-flash-image-preview",
  "aspectRatio": "1:1",
  "resolution": "1024",
  "seed": null,
  "timestamp": "2026-02-28T22:30:15.123Z",
  "watermark": "SynthID",
  "c2pa": true
}
```

---

## Troubleshooting

### "Invalid credentials"
```bash
# Check Google API token
node ~/.openclaw/workspace/skills/google/scripts/google_client.js calendar_list
```

### "Rate limit exceeded"
→ Wait a few minutes and retry

### "Image rejected by safety filter"
→ Rephrase prompt to be less explicit
→ Use `--safety-level relaxed` (if appropriate)

### "Low quality output"
→ Increase resolution: `--resolution 2048`
→ Add more detail to prompt: "highly detailed, professional quality"
→ Try different seed: `--seed 999`

---

## Next Steps

- Read the [main SKILL.md](./SKILL.md)
- Try your first image!
- Explore Nano Banana 2 docs: https://blog.google/innovation-and-ai/technology/ai/nano-banana-2/
