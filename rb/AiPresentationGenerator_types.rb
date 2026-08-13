# frozen_string_literal: true

# Typed models for the AiPresentationGenerator SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Presentation entity data model.
#
# @!attribute [rw] colorScheme
#   @return [String, nil]
#
# @!attribute [rw] content
#   @return [String]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] downloadUrl
#   @return [String, nil]
#
# @!attribute [rw] expiresAt
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] includeCharts
#   @return [Boolean, nil]
#
# @!attribute [rw] language
#   @return [String, nil]
#
# @!attribute [rw] layout
#   @return [String, nil]
#
# @!attribute [rw] previewUrl
#   @return [String, nil]
#
# @!attribute [rw] slides
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] theme
#   @return [String, nil]
#
# @!attribute [rw] topic
#   @return [String]
Presentation = Struct.new(
  :colorScheme,
  :content,
  :createdAt,
  :downloadUrl,
  :expiresAt,
  :format,
  :id,
  :includeCharts,
  :language,
  :layout,
  :previewUrl,
  :slides,
  :status,
  :theme,
  :topic,
  keyword_init: true
)

# Request payload for Presentation#load.
#
# @!attribute [rw] id
#   @return [String]
PresentationLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Presentation#create.
#
# @!attribute [rw] colorScheme
#   @return [String, nil]
#
# @!attribute [rw] content
#   @return [String]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] downloadUrl
#   @return [String, nil]
#
# @!attribute [rw] expiresAt
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] includeCharts
#   @return [Boolean, nil]
#
# @!attribute [rw] language
#   @return [String, nil]
#
# @!attribute [rw] layout
#   @return [String, nil]
#
# @!attribute [rw] previewUrl
#   @return [String, nil]
#
# @!attribute [rw] slides
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] theme
#   @return [String, nil]
#
# @!attribute [rw] topic
#   @return [String]
PresentationCreateData = Struct.new(
  :colorScheme,
  :content,
  :createdAt,
  :downloadUrl,
  :expiresAt,
  :format,
  :id,
  :includeCharts,
  :language,
  :layout,
  :previewUrl,
  :slides,
  :status,
  :theme,
  :topic,
  keyword_init: true
)

