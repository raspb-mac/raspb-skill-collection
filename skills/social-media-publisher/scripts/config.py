"""
config.py — Zentrale Konfiguration für social-media-publisher.
"""
import os

# Upload-Post API
API_KEY  = os.getenv(
    'UPLOAD_POST_API_KEY',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhc3BiLndlYnNlcnZpY2VzQGdtYWlsLmNvbSIsImV4cCI6NDkyOTk2MTQzMiwianRpIjoiZDhjOGQxZjAtMjg4NC00YWZlLWI4ZTAtNTM3M2NkZDI5Y2Y3In0.de-beU7hCmBVpuGKdQNYgNOAWlSbRJDtOo6sjfMZUII',
)
BASE_URL = 'https://api.upload-post.com/api'

# Verbundene Accounts (Stand 2026-04-16)
# Upload-Post Username für alle Accounts: 'raspb'
ACCOUNTS = {
    # Markus Härtig — persönliches Profil
    'markus': {
        'user':        'raspb',
        'display':     'Markus Härtig',
        'linkedin':    True,   # Handle: Markus Härtig
        'facebook':    True,   # Handle: Markus Härtig
        'x':           True,   # Handle: @MarkusAtRaspb
        'instagram':   True,   # Handle: markus_haertig
    },
    # raspb Webservices — Company Page
    'raspb': {
        'user':        'raspb',
        'display':     'raspb Webservices',
        'linkedin':    True,
        'linkedin_page_id': 'urn:li:organization:111389185',
        'facebook':    False,
        'x':           False,
        'instagram':   False,
    },
}

# Plattform-Mapping (CLI → Upload-Post platform[] value)
PLATFORM_MAP = {
    'linkedin':  'linkedin',
    'facebook':  'facebook',
    'x':         'x',
    'twitter':   'x',
    'threads':   'threads',
    'bluesky':   'bluesky',
    'instagram': 'instagram',
    'tiktok':    'tiktok',
}
