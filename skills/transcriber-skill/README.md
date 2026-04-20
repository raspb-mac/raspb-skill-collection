# transcriber-skill

## Research summary
- Description: Transcribe audio and video into text with timestamps, speaker-aware output, and export-friendly formats.
- Type: api
- Auth: API key or service account
- Complexity: High
- Priority: High
- Docs: https://cloud.google.com/speech-to-text
- Status: Research done, skeleton only

## Notes
Route long-form media through async jobs; keep ffmpeg preprocessing in mind for noisy inputs.

## Next step
Wire the actual provider integration, then add examples and tests.
