---
name: heygen-video-agent
description: Create, render, download, and publish HeyGen videos via the HeyGen REST API and local helper scripts. Use when building avatar videos, listing templates/avatars/voices, polling async renders, downloading final MP4s, or handing the result to social-media-publisher.
category: media-generation
version: 1.0.0
---

# HeyGen Video Agent

## Prerequisites
- `HEYGEN_API_KEY` must be set in `openclaw.env`.
- Use HeyGen REST API directly via `curl`, no MCP required.
- Save final downloads in `/home/node/.openclaw/workspace/transfers/results/`.

## API reference
Base URL: `https://api.heygen.com`

- `POST /v2/video/generate` → create a video
- `GET /v1/video_status.get?video_id=<id>` → check render status
- `GET /v2/templates` → list templates
- `POST /v2/template/<id>/generate` → create template video
- `GET /v2/avatars` → list avatars
- `GET /v2/voices` → list voices
- Header on every request: `X-Api-Key: $HEYGEN_API_KEY`

## Agent workflow
1. Clarify the brief, topic, goal, audience, platform, CTA, and target length in seconds.
2. Write a speakable script, Hook → main point → CTA.
3. Choose avatar and voice with `heygen-list-avatars.sh`, optionally inspect voices.
4. Generate the video with `heygen-create-video.sh`, which returns `video_id`.
5. Poll status with `heygen-poll-status.sh` every 20 seconds until `status == completed`, then read `video_url`.
6. Download the MP4 with `heygen-download-video.sh` into `transfers/results/`.
7. Pass the final asset to `social-media-publisher` for the platform post.

## Script rules
- Target pacing: max 150 words per minute.
- Estimate duration as `words / 150 * 60` seconds.
- Keep each sentence to max 20 words.
- First 5 seconds must be the hook.
- Last 5 seconds must be the CTA.
- Avoid parentheses, emojis, and special characters in the spoken script.
- Keep the script natural, direct, and easy to read aloud.

## Mandatory checkpoints
- Freeze the script before render.
- Review the render before download if possible.
- Get final approval before publish when auto-publish is not allowed.

## Helper scripts
Use these absolute paths:
- `/home/node/.openclaw/workspace/skills/heygen/scripts/heygen-create-video.sh`
- `/home/node/.openclaw/workspace/skills/heygen/scripts/heygen-poll-status.sh`
- `/home/node/.openclaw/workspace/skills/heygen/scripts/heygen-list-avatars.sh`
- `/home/node/.openclaw/workspace/skills/heygen/scripts/heygen-list-templates.sh`
- `/home/node/.openclaw/workspace/skills/heygen/scripts/heygen-download-video.sh`

## Notes for use
- If the avatar or voice is not obvious, list options first.
- If the render fails, rerun only after fixing the script or template.
- Keep filenames clean and versioned.
- Use the returned video URL as the source of truth for the final download.
