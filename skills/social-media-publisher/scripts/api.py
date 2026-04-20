"""
api.py — Upload-Post API Client (via offizielles Python SDK).
pip: upload-post==2.1.1
"""
from __future__ import annotations

from pathlib import Path
from upload_post import UploadPostClient

from config import API_KEY

# Singleton-Client
_client: UploadPostClient | None = None


def client() -> UploadPostClient:
    global _client
    if _client is None:
        _client = UploadPostClient(api_key=API_KEY)
    return _client


# ── Account-Info ──────────────────────────────────────────────────────────────

def verify_key() -> dict:
    return client().get_current_user()


def get_linkedin_pages() -> list[dict]:
    data = client().get_linkedin_pages()
    return data.get('pages', [])


# ── Upload-Status ─────────────────────────────────────────────────────────────

def get_upload_status(request_id: str) -> dict:
    return client().get_status(request_id)


def list_scheduled() -> dict:
    return client().list_scheduled()


def cancel_scheduled(job_id: str) -> dict:
    return client().cancel_scheduled(job_id)


# ── Posts ─────────────────────────────────────────────────────────────────────

def upload_text(
    user: str,
    platforms: list[str],
    title: str,
    first_comment: str | None = None,
    scheduled_date: str | None = None,
    timezone: str = 'Europe/Berlin',
    async_upload: bool = True,
    target_linkedin_page_id: str | None = None,
    linkedin_title: str | None = None,
    link_url: str | None = None,
    dry_run: bool = False,
) -> dict:
    """Text-Post auf einer oder mehreren Plattformen."""
    kwargs: dict = {
        'timezone': timezone,
        'async_upload': async_upload,
    }
    if first_comment:
        kwargs['first_comment'] = first_comment
    if scheduled_date:
        kwargs['scheduled_date'] = scheduled_date
    if target_linkedin_page_id:
        kwargs['target_linkedin_page_id'] = target_linkedin_page_id
    if linkedin_title:
        kwargs['linkedin_title'] = linkedin_title
    if link_url:
        kwargs['link_url'] = link_url

    if dry_run:
        return {'dry_run': True, 'payload': {'user': user, 'platforms': platforms, 'title': title, **kwargs}}

    return client().upload_text(
        title=title,
        user=user,
        platforms=platforms,
        **kwargs,
    )


def upload_photo(
    user: str,
    platforms: list[str],
    images: list[Path],
    title: str = '',
    description: str = '',
    first_comment: str | None = None,
    scheduled_date: str | None = None,
    timezone: str = 'Europe/Berlin',
    async_upload: bool = True,
    target_linkedin_page_id: str | None = None,
    dry_run: bool = False,
) -> dict:
    """Foto-Post auf einer oder mehreren Plattformen."""
    kwargs: dict = {
        'timezone': timezone,
        'async_upload': async_upload,
    }
    if description:
        kwargs['description'] = description
    if first_comment:
        kwargs['first_comment'] = first_comment
    if scheduled_date:
        kwargs['scheduled_date'] = scheduled_date
    if target_linkedin_page_id:
        kwargs['target_linkedin_page_id'] = target_linkedin_page_id

    if dry_run:
        return {'dry_run': True, 'fields': {'user': user, 'platforms': platforms, 'title': title, **kwargs},
                'files': [str(i) for i in images]}

    return client().upload_photos(
        photos=[str(i) for i in images],
        title=title,
        user=user,
        platforms=platforms,
        **kwargs,
    )


def upload_video(
    user: str,
    platforms: list[str],
    video_path: Path,
    title: str = '',
    description: str = '',
    first_comment: str | None = None,
    scheduled_date: str | None = None,
    timezone: str = 'Europe/Berlin',
    async_upload: bool = True,
    target_linkedin_page_id: str | None = None,
    dry_run: bool = False,
) -> dict:
    """Video-Post auf einer oder mehreren Plattformen."""
    kwargs: dict = {
        'timezone': timezone,
        'async_upload': async_upload,
    }
    if description:
        kwargs['description'] = description
    if first_comment:
        kwargs['first_comment'] = first_comment
    if scheduled_date:
        kwargs['scheduled_date'] = scheduled_date
    if target_linkedin_page_id:
        kwargs['target_linkedin_page_id'] = target_linkedin_page_id

    if dry_run:
        return {'dry_run': True, 'fields': {'user': user, 'platforms': platforms, 'title': title, **kwargs},
                'video': str(video_path)}

    return client().upload_video(
        video_path=str(video_path),
        title=title,
        user=user,
        platforms=platforms,
        **kwargs,
    )
