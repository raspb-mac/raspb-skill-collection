---
name: picsum-generator
description: Generates a ZIP archive containing random placeholder images from Lorem Picsum. Use when the user needs sample images for mockups, testing, or design projects. Supports configurable image count and resolution.
category: media-generation
---

# Picsum Generator

This skill automates the retrieval of random images from `picsum.photos`, packages them into a ZIP archive, and prepares them for download.

## Workflow

1.  **Preparation**: Determine the desired number of images (default: 10) and resolution (default: 1280x720).
2.  **Execution**: Run the `generate.mjs` script with the specified parameters.
3.  **Transfer**: Use the `file-transfer` skill to make the resulting ZIP file available for download.
4.  **Cleanup**: The script automatically handles the deletion of temporary files.

## Usage

Run the generator script via `exec`:

```bash
node scripts/generate.mjs [count] [width] [height] [output_filename]
```

- `count`: Number of images to fetch (default: 10)
- `width`: Image width in pixels (default: 1280)
- `height`: Image height in pixels (default: 720)
- `output_filename`: Name of the resulting ZIP file (default: picsum_WxH_C.zip)

### Example

To generate 5 images with 1920x1080 resolution:

```bash
node ~/.openclaw/workspace/skills/picsum-generator/scripts/generate.mjs 5 1920 1080 picsum_fullhd_5.zip
```

## Post-Processing

After the script finishes, locate the ZIP file in the workspace and call the `file-transfer` skill to provide the download link to the user.
