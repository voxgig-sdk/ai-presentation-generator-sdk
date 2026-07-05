-- Typed models for the AiPresentationGenerator SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Presentation
---@field color_scheme? string
---@field content string
---@field created_at? string
---@field download_url? string
---@field expires_at? string
---@field format? string
---@field id? string
---@field include_chart? boolean
---@field language? string
---@field layout? string
---@field preview_url? string
---@field slide? number
---@field status? string
---@field theme? string
---@field topic string

---@class PresentationLoadMatch
---@field id string

---@class PresentationCreateData
---@field color_scheme? string
---@field content string
---@field created_at? string
---@field download_url? string
---@field expires_at? string
---@field format? string
---@field id? string
---@field include_chart? boolean
---@field language? string
---@field layout? string
---@field preview_url? string
---@field slide? number
---@field status? string
---@field theme? string
---@field topic string

local M = {}

return M
