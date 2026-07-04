# AiPresentationGenerator TypeScript SDK Reference

Complete API reference for the AiPresentationGenerator TypeScript SDK.


## AiPresentationGeneratorSDK

### Constructor

```ts
new AiPresentationGeneratorSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AiPresentationGeneratorSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = AiPresentationGeneratorSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `AiPresentationGeneratorSDK` instance in test mode.


### Instance Methods

#### `Presentation(data?: object)`

Create a new `Presentation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PresentationEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `AiPresentationGeneratorSDK.test()`.

**Returns:** `AiPresentationGeneratorSDK` instance in test mode.


---

## PresentationEntity

```ts
const presentation = client.presentation
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.presentation.create({
  content: /* `$STRING` */,
  topic: /* `$STRING` */,
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.presentation.load({ id: 'presentation_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PresentationEntity` instance with the same client and
options.

#### `client()`

Return the parent `AiPresentationGeneratorSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new AiPresentationGeneratorSDK({
  feature: {
    test: { active: true },
  }
})
```

