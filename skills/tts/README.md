# tts

## Research summary
- Description: Create text-to-speech audio with voice selection, ElevenLabs voice lookup, and optional HTML player output for long text.
- Type: api
- Auth: ElevenLabs API key
- Complexity: Medium
- Priority: High
- Docs: https://elevenlabs.io/docs/api-reference/text-to-speech/convert
- Status: Research done, skeleton only

## Notes
Treat voice discovery as first-class, not hardcoded. Keep the HTML player logic separate from the audio generation path.

## Next step
Wire the actual provider integration, then add examples and tests.
