# AiPresentationGenerator SDK

Generate professional, themable presentations from plain content using an AI service from pi.inc

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About AI Presentation Generator

The AI Presentation Generator is a hosted API from [pi.inc](https://www.pi.inc) (branded as "Presentation Intelligence") that turns supplied content into ready-to-use slide decks. Callers provide source material and the service returns a generated presentation that can be styled with different themes and layouts.

What you get from the API:

- Programmatic generation of presentations from user-supplied content
- Customizable themes and layouts on the resulting decks
- A single base URL at `https://api.pi.inc/v1`

Operational notes: the [freepublicapis.com listing](https://freepublicapis.com/ai-presentation-generator) reports the service as healthy with a ~614 ms average response time and CORS disabled. Authentication, pricing, rate limits, and licence terms are not documented on the public listing — check the [official docs](https://www.pi.inc/docs/384227635738616?t=7aefee826938a456421c80cda9fe00c9) before integrating.

## Try it

**TypeScript**
```bash
npm install ai-presentation-generator
```

**Python**
```bash
pip install ai-presentation-generator-sdk
```

**PHP**
```bash
composer require voxgig/ai-presentation-generator-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/ai-presentation-generator-sdk/go
```

**Ruby**
```bash
gem install ai-presentation-generator-sdk
```

**Lua**
```bash
luarocks install ai-presentation-generator-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { AiPresentationGeneratorSDK } from 'ai-presentation-generator'

const client = new AiPresentationGeneratorSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o ai-presentation-generator-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "ai-presentation-generator": {
      "command": "/abs/path/to/ai-presentation-generator-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Presentation** | An AI-generated slide deck produced from user-supplied content, with selectable themes and layouts; served from the `https://api.pi.inc/v1` base. | `/presentations` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from aipresentationgenerator_sdk import AiPresentationGeneratorSDK

client = AiPresentationGeneratorSDK({})


# Load a specific presentation
presentation, err = client.Presentation(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'aipresentationgenerator_sdk.php';

$client = new AiPresentationGeneratorSDK([]);


// Load a specific presentation
[$presentation, $err] = $client->Presentation(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/ai-presentation-generator-sdk/go"

client := sdk.NewAiPresentationGeneratorSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "AiPresentationGenerator_sdk"

client = AiPresentationGeneratorSDK.new({})


# Load a specific presentation
presentation, err = client.Presentation(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("ai-presentation-generator_sdk")

local client = sdk.new({})


-- Load a specific presentation
local presentation, err = client:Presentation(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = AiPresentationGeneratorSDK.test()
const result = await client.Presentation().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = AiPresentationGeneratorSDK.test(None, None)
result, err = client.Presentation(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = AiPresentationGeneratorSDK::test(null, null);
[$result, $err] = $client->Presentation(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Presentation(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = AiPresentationGeneratorSDK.test(nil, nil)
result, err = client.Presentation(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Presentation(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the AI Presentation Generator

- Upstream: [https://www.pi.inc](https://www.pi.inc)
- API docs: [https://www.pi.inc/docs/384227635738616?t=7aefee826938a456421c80cda9fe00c9](https://www.pi.inc/docs/384227635738616?t=7aefee826938a456421c80cda9fe00c9)

---

Generated from the AI Presentation Generator OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
