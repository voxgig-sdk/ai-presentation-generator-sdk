# AiPresentationGenerator Golang SDK Reference

Complete API reference for the AiPresentationGenerator Golang SDK.


## AiPresentationGeneratorSDK

### Constructor

```go
func NewAiPresentationGeneratorSDK(options map[string]any) *AiPresentationGeneratorSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `TestSDK(testopts, sdkopts map[string]any) *AiPresentationGeneratorSDK`

Create a test client with mock features active. Both arguments may be `nil`.

```go
client := sdk.TestSDK(nil, nil)
```


### Instance Methods

#### `Presentation(data map[string]any) AiPresentationGeneratorEntity`

Create a new `Presentation` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## PresentationEntity

```go
presentation := client.Presentation(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `color_scheme` | ``$STRING`` | No |  |
| `content` | ``$STRING`` | Yes |  |
| `created_at` | ``$STRING`` | No |  |
| `download_url` | ``$STRING`` | No |  |
| `expires_at` | ``$STRING`` | No |  |
| `format` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `include_chart` | ``$BOOLEAN`` | No |  |
| `language` | ``$STRING`` | No |  |
| `layout` | ``$STRING`` | No |  |
| `preview_url` | ``$STRING`` | No |  |
| `slide` | ``$INTEGER`` | No |  |
| `status` | ``$STRING`` | No |  |
| `theme` | ``$STRING`` | No |  |
| `topic` | ``$STRING`` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Presentation(nil).Create(map[string]any{
    "content": /* `$STRING` */,
    "topic": /* `$STRING` */,
}, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Presentation(nil).Load(map[string]any{"id": "presentation_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PresentationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewAiPresentationGeneratorSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

