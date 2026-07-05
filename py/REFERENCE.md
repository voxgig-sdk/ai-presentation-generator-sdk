# AiPresentationGenerator Python SDK Reference

Complete API reference for the AiPresentationGenerator Python SDK.


## AiPresentationGeneratorSDK

### Constructor

```python
from aipresentationgenerator_sdk import AiPresentationGeneratorSDK

client = AiPresentationGeneratorSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AiPresentationGeneratorSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = AiPresentationGeneratorSDK.test()
```


### Instance Methods

#### `Presentation(data=None)`

Create a new `PresentationEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## PresentationEntity

```python
presentation = client.Presentation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `color_scheme` | `str` | No |  |
| `content` | `str` | Yes |  |
| `created_at` | `str` | No |  |
| `download_url` | `str` | No |  |
| `expires_at` | `str` | No |  |
| `format` | `str` | No |  |
| `id` | `str` | No |  |
| `include_chart` | `bool` | No |  |
| `language` | `str` | No |  |
| `layout` | `str` | No |  |
| `preview_url` | `str` | No |  |
| `slide` | `int` | No |  |
| `status` | `str` | No |  |
| `theme` | `str` | No |  |
| `topic` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Presentation().create({
    "content": "example",  # str
    "topic": "example",  # str
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Presentation().load({"id": "presentation_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PresentationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = AiPresentationGeneratorSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

