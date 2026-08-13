// Typed models for the AiPresentationGenerator SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Presentation {
  colorScheme?: string
  content: string
  createdAt?: string
  downloadUrl?: string
  expiresAt?: string
  format?: string
  id?: string
  includeCharts?: boolean
  language?: string
  layout?: string
  previewUrl?: string
  slides?: number
  status?: string
  theme?: string
  topic: string
}

export interface PresentationLoadMatch {
  id: string
}

export interface PresentationCreateData {
  colorScheme?: string
  content: string
  createdAt?: string
  downloadUrl?: string
  expiresAt?: string
  format?: string
  id?: string
  includeCharts?: boolean
  language?: string
  layout?: string
  previewUrl?: string
  slides?: number
  status?: string
  theme?: string
  topic: string
}

