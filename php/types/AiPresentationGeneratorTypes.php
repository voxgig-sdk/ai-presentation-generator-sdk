<?php
declare(strict_types=1);

// Typed models for the AiPresentationGenerator SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Presentation entity data model. */
class Presentation
{
    public ?string $colorScheme = null;
    public string $content;
    public ?string $createdAt = null;
    public ?string $downloadUrl = null;
    public ?string $expiresAt = null;
    public ?string $format = null;
    public ?string $id = null;
    public ?bool $includeCharts = null;
    public ?string $language = null;
    public ?string $layout = null;
    public ?string $previewUrl = null;
    public ?int $slides = null;
    public ?string $status = null;
    public ?string $theme = null;
    public string $topic;
}

/** Request payload for Presentation#load. */
class PresentationLoadMatch
{
    public string $id;
}

/** Request payload for Presentation#create. */
class PresentationCreateData
{
    public ?string $colorScheme = null;
    public string $content;
    public ?string $createdAt = null;
    public ?string $downloadUrl = null;
    public ?string $expiresAt = null;
    public ?string $format = null;
    public ?string $id = null;
    public ?bool $includeCharts = null;
    public ?string $language = null;
    public ?string $layout = null;
    public ?string $previewUrl = null;
    public ?int $slides = null;
    public ?string $status = null;
    public ?string $theme = null;
    public string $topic;
}

