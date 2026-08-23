# AiPresentationGenerator Ruby SDK Reference

Complete API reference for the AiPresentationGenerator Ruby SDK.


## AiPresentationGeneratorSDK

### Constructor

```ruby
require_relative 'AiPresentationGenerator_sdk'

client = AiPresentationGeneratorSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AiPresentationGeneratorSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = AiPresentationGeneratorSDK.test
```


### Instance Methods

#### `Presentation(data = nil)`

Create a new `Presentation` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## PresentationEntity

```ruby
presentation = client.Presentation
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `colorScheme` | `String` | No | Primary color scheme for the presentation |
| `content` | `String` | Yes | The main content or key points for the presentation |
| `createdAt` | `String` | No | Timestamp when the presentation was created |
| `downloadUrl` | `String` | No | URL to download the generated presentation |
| `expiresAt` | `String` | No | Timestamp when the download link expires |
| `format` | `String` | No | File format of the presentation |
| `id` | `String` | No | Unique identifier for the presentation |
| `includeCharts` | `Boolean` | No | Whether to include charts and graphs where applicable |
| `language` | `String` | No | Language for the presentation content |
| `layout` | `String` | No | Layout style for the slides |
| `previewUrl` | `String` | No | URL to preview the presentation online |
| `slides` | `Integer` | No | Number of slides in the presentation |
| `status` | `String` | No | Current status of the presentation generation |
| `theme` | `String` | No | Applied theme |
| `topic` | `String` | Yes | The main topic or title of the presentation |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Presentation.create({
  "content" => "example_content", # String
  "topic" => "example_topic", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Presentation.load({ "id" => "presentation_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PresentationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = AiPresentationGeneratorSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

