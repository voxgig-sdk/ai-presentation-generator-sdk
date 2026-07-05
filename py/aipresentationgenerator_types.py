# Typed models for the AiPresentationGenerator SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class PresentationRequired(TypedDict):
    content: str
    topic: str


class Presentation(PresentationRequired, total=False):
    color_scheme: str
    created_at: str
    download_url: str
    expires_at: str
    format: str
    id: str
    include_chart: bool
    language: str
    layout: str
    preview_url: str
    slide: int
    status: str
    theme: str


class PresentationLoadMatch(TypedDict):
    id: str


class PresentationCreateDataRequired(TypedDict):
    content: str
    topic: str


class PresentationCreateData(PresentationCreateDataRequired, total=False):
    color_scheme: str
    created_at: str
    download_url: str
    expires_at: str
    format: str
    id: str
    include_chart: bool
    language: str
    layout: str
    preview_url: str
    slide: int
    status: str
    theme: str
