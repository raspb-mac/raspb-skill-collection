# video-gen

## Research summary
- Description: Generate AI video from text, images, or clips using video-generation APIs and async job polling.
- Type: api
- Auth: Bearer API key
- Complexity: High
- Priority: High
- Docs: https://docs.dev.runwayml.com/api/
- Status: Research done, skeleton only

## Notes
Use Runway-style task polling as the default pattern; keep provider fallback hooks ready for future models.

## Next step
Wire the actual provider integration, then add examples and tests.
