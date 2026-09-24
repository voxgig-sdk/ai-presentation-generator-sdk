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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.pi.inc/v1",
			"auth": map[string]any{
				"prefix": "",
				"name": "X-API-Key",
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
						"title": "Color Scheme",
						"type": "`$STRING`",
						"short": "Primary color scheme for the presentation",
					},
					map[string]any{
						"name": "content",
						"title": "Content",
						"type": "`$STRING`",
						"req": true,
						"short": "The main content or key points for the presentation",
					},
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$STRING`",
						"short": "Timestamp when the presentation was created",
						"format": "date-time",
					},
					map[string]any{
						"name": "downloadUrl",
						"title": "Download Url",
						"type": "`$STRING`",
						"short": "URL to download the generated presentation",
						"format": "uri",
					},
					map[string]any{
						"name": "expiresAt",
						"title": "Expires At",
						"type": "`$STRING`",
						"short": "Timestamp when the download link expires",
						"format": "date-time",
					},
					map[string]any{
						"name": "format",
						"title": "Format",
						"type": "`$STRING`",
						"short": "File format of the presentation",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Unique identifier for the presentation",
					},
					map[string]any{
						"name": "includeCharts",
						"title": "Include Charts",
						"type": "`$BOOLEAN`",
						"short": "Whether to include charts and graphs where applicable",
					},
					map[string]any{
						"name": "language",
						"title": "Language",
						"type": "`$STRING`",
						"short": "Language for the presentation content",
					},
					map[string]any{
						"name": "layout",
						"title": "Layout",
						"type": "`$STRING`",
						"short": "Layout style for the slides",
					},
					map[string]any{
						"name": "previewUrl",
						"title": "Preview Url",
						"type": "`$STRING`",
						"short": "URL to preview the presentation online",
						"format": "uri",
					},
					map[string]any{
						"name": "slides",
						"title": "Slides",
						"type": "`$INTEGER`",
						"short": "Number of slides in the presentation",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "Current status of the presentation generation",
					},
					map[string]any{
						"name": "theme",
						"title": "Theme",
						"type": "`$STRING`",
						"short": "Applied theme",
					},
					map[string]any{
						"name": "topic",
						"title": "Topic",
						"type": "`$STRING`",
						"req": true,
						"short": "The main topic or title of the presentation",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "presentation",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/presentations",
								"segments": []any{
									map[string]any{
										"lit": "presentations",
									},
								},
								"parts": []any{
									"presentations",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/presentations/{presentationId}",
								"segments": []any{
									map[string]any{
										"lit": "presentations",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"presentations",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"presentationId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "presentation_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "pres_abc123def456",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
