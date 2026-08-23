# AiPresentationGenerator Lua SDK Reference

Complete API reference for the AiPresentationGenerator Lua SDK.


## AiPresentationGeneratorSDK

### Constructor

```lua
local sdk = require("ai-presentation-generator_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Presentation(data)`

Create a new `Presentation` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## PresentationEntity

```lua
local presentation = client:Presentation(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `colorScheme` | `string` | No | Primary color scheme for the presentation |
| `content` | `string` | Yes | The main content or key points for the presentation |
| `createdAt` | `string` | No | Timestamp when the presentation was created |
| `downloadUrl` | `string` | No | URL to download the generated presentation |
| `expiresAt` | `string` | No | Timestamp when the download link expires |
| `format` | `string` | No | File format of the presentation |
| `id` | `string` | No | Unique identifier for the presentation |
| `includeCharts` | `boolean` | No | Whether to include charts and graphs where applicable |
| `language` | `string` | No | Language for the presentation content |
| `layout` | `string` | No | Layout style for the slides |
| `previewUrl` | `string` | No | URL to preview the presentation online |
| `slides` | `number` | No | Number of slides in the presentation |
| `status` | `string` | No | Current status of the presentation generation |
| `theme` | `string` | No | Applied theme |
| `topic` | `string` | Yes | The main topic or title of the presentation |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Presentation():create({
  content = --[[ string ]],
  topic = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Presentation():load({ id = "presentation_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PresentationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

