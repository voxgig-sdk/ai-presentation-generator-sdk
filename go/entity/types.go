// Typed models for the AiPresentationGenerator SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Presentation is the typed data model for the presentation entity.
type Presentation struct {
	ColorScheme *string `json:"color_scheme,omitempty"`
	Content string `json:"content"`
	CreatedAt *string `json:"created_at,omitempty"`
	DownloadUrl *string `json:"download_url,omitempty"`
	ExpiresAt *string `json:"expires_at,omitempty"`
	Format *string `json:"format,omitempty"`
	Id *string `json:"id,omitempty"`
	IncludeChart *bool `json:"include_chart,omitempty"`
	Language *string `json:"language,omitempty"`
	Layout *string `json:"layout,omitempty"`
	PreviewUrl *string `json:"preview_url,omitempty"`
	Slide *int `json:"slide,omitempty"`
	Status *string `json:"status,omitempty"`
	Theme *string `json:"theme,omitempty"`
	Topic string `json:"topic"`
}

// PresentationLoadMatch is the typed request payload for Presentation.LoadTyped.
type PresentationLoadMatch struct {
	Id string `json:"id"`
}

// PresentationCreateData is the typed request payload for Presentation.CreateTyped.
type PresentationCreateData struct {
	ColorScheme *string `json:"color_scheme,omitempty"`
	Content string `json:"content"`
	CreatedAt *string `json:"created_at,omitempty"`
	DownloadUrl *string `json:"download_url,omitempty"`
	ExpiresAt *string `json:"expires_at,omitempty"`
	Format *string `json:"format,omitempty"`
	Id *string `json:"id,omitempty"`
	IncludeChart *bool `json:"include_chart,omitempty"`
	Language *string `json:"language,omitempty"`
	Layout *string `json:"layout,omitempty"`
	PreviewUrl *string `json:"preview_url,omitempty"`
	Slide *int `json:"slide,omitempty"`
	Status *string `json:"status,omitempty"`
	Theme *string `json:"theme,omitempty"`
	Topic string `json:"topic"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
