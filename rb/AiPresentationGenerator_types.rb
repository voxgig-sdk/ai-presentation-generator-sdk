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
# @!attribute [rw] color_scheme
#   @return [String, nil]
#
# @!attribute [rw] content
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] download_url
#   @return [String, nil]
#
# @!attribute [rw] expires_at
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] include_chart
#   @return [Boolean, nil]
#
# @!attribute [rw] language
#   @return [String, nil]
#
# @!attribute [rw] layout
#   @return [String, nil]
#
# @!attribute [rw] preview_url
#   @return [String, nil]
#
# @!attribute [rw] slide
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
  :color_scheme,
  :content,
  :created_at,
  :download_url,
  :expires_at,
  :format,
  :id,
  :include_chart,
  :language,
  :layout,
  :preview_url,
  :slide,
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
# @!attribute [rw] color_scheme
#   @return [String, nil]
#
# @!attribute [rw] content
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] download_url
#   @return [String, nil]
#
# @!attribute [rw] expires_at
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] include_chart
#   @return [Boolean, nil]
#
# @!attribute [rw] language
#   @return [String, nil]
#
# @!attribute [rw] layout
#   @return [String, nil]
#
# @!attribute [rw] preview_url
#   @return [String, nil]
#
# @!attribute [rw] slide
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
  :color_scheme,
  :content,
  :created_at,
  :download_url,
  :expires_at,
  :format,
  :id,
  :include_chart,
  :language,
  :layout,
  :preview_url,
  :slide,
  :status,
  :theme,
  :topic,
  keyword_init: true
)

