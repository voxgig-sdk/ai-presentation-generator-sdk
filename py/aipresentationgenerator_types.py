# Typed models for the AiPresentationGenerator SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Presentation:
    content: str
    topic: str
    color_scheme: Optional[str] = None
    created_at: Optional[str] = None
    download_url: Optional[str] = None
    expires_at: Optional[str] = None
    format: Optional[str] = None
    id: Optional[str] = None
    include_chart: Optional[bool] = None
    language: Optional[str] = None
    layout: Optional[str] = None
    preview_url: Optional[str] = None
    slide: Optional[int] = None
    status: Optional[str] = None
    theme: Optional[str] = None


@dataclass
class PresentationLoadMatch:
    id: str


@dataclass
class PresentationCreateData:
    color_scheme: Optional[str] = None
    content: Optional[str] = None
    created_at: Optional[str] = None
    download_url: Optional[str] = None
    expires_at: Optional[str] = None
    format: Optional[str] = None
    id: Optional[str] = None
    include_chart: Optional[bool] = None
    language: Optional[str] = None
    layout: Optional[str] = None
    preview_url: Optional[str] = None
    slide: Optional[int] = None
    status: Optional[str] = None
    theme: Optional[str] = None
    topic: Optional[str] = None

