package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "AiPresentationGenerator",
			"slug": "ai-presentation-generator",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://api.pi.inc/v1",
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"presentation": map[string]any{},
			},
		},
		"entity": map[string]any{
			"presentation": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "colorScheme",
						"short": "Primary color scheme for the presentation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "content",
						"req": true,
						"short": "The main content or key points for the presentation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "createdAt",
						"short": "Timestamp when the presentation was created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "downloadUrl",
						"short": "URL to download the generated presentation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "expiresAt",
						"short": "Timestamp when the download link expires",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "format",
						"short": "File format of the presentation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the presentation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "includeCharts",
						"short": "Whether to include charts and graphs where applicable",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "language",
						"short": "Language for the presentation content",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "layout",
						"short": "Layout style for the slides",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "previewUrl",
						"short": "URL to preview the presentation online",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "slides",
						"short": "Number of slides in the presentation",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "status",
						"short": "Current status of the presentation generation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "theme",
						"short": "Applied theme",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "topic",
						"req": true,
						"short": "The main topic or title of the presentation",
						"type": "`$STRING`",
					},
				},
				"name": "presentation",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/presentations",
								"parts": []any{
									"presentations",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "pres_abc123def456",
											"kind": "param",
											"name": "id",
											"orig": "presentation_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/presentations/{presentationId}",
								"parts": []any{
									"presentations",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"presentationId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
