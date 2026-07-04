// Typed models for the AiPresentationGenerator SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Presentation {
  color_scheme?: string
  content: string
  created_at?: string
  download_url?: string
  expires_at?: string
  format?: string
  id?: string
  include_chart?: boolean
  language?: string
  layout?: string
  preview_url?: string
  slide?: number
  status?: string
  theme?: string
  topic: string
}

export interface PresentationLoadMatch {
  id: string
}

export type PresentationCreateData = Partial<Presentation>

