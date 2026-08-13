-- Typed models for the AiPresentationGenerator SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Presentation
---@field colorScheme? string
---@field content string
---@field createdAt? string
---@field downloadUrl? string
---@field expiresAt? string
---@field format? string
---@field id? string
---@field includeCharts? boolean
---@field language? string
---@field layout? string
---@field previewUrl? string
---@field slides? number
---@field status? string
---@field theme? string
---@field topic string

---@class PresentationLoadMatch
---@field id string

---@class PresentationCreateData
---@field colorScheme? string
---@field content string
---@field createdAt? string
---@field downloadUrl? string
---@field expiresAt? string
---@field format? string
---@field id? string
---@field includeCharts? boolean
---@field language? string
---@field layout? string
---@field previewUrl? string
---@field slides? number
---@field status? string
---@field theme? string
---@field topic string

local M = {}

return M
