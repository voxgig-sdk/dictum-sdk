# Dictum SDK

Browse a curated collection of historical quotes by author and category

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Dictum API

Dictum is a thin SDK over the [Quoterism](https://quoterism.com) public quote API, a service that catalogues inspiring expressions from historical figures across categories such as wisdom, knowledge, self-awareness, justice and politics.

What you get from the API:
- `GET /api/quotes` — a paginated list of quotes with embedded author data (`page`, `limit` query params; `limit` 1-100, defaults to 12)
- `GET /api/quotes/{id}` — a single quote by numeric id, or the special values `random` and `quote-of-the-day`
- Quote objects include `id`, `text`, author details (`id`, `name`, `slug`, `imageUrl`) and a `createdAt` timestamp
- List responses include pagination metadata: `page`, `limit`, `totalCount`, `totalPages`, `hasNextPage`, `hasPreviousPage`

Authentication is required: send your key in the `X-API-Key` header. You can obtain a key by signing in at quoterism.com and requesting one from your profile.

Documented rate limits are 30 requests/minute overall, 10 requests/minute on the quote detail endpoint, and 150 requests/day. The service has been reported as intermittently unavailable on third-party uptime checks, so build in retry and fallback logic.

## Try it

**TypeScript**
```bash
npm install dictum
```

**Python**
```bash
pip install dictum-sdk
```

**PHP**
```bash
composer require voxgig/dictum-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/dictum-sdk/go
```

**Ruby**
```bash
gem install dictum-sdk
```

**Lua**
```bash
luarocks install dictum-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { DictumSDK } from 'dictum'

const client = new DictumSDK({})

// List all authors
const authors = await client.Author().list()
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
cd go-mcp && go build -o dictum-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "dictum": {
      "command": "/abs/path/to/dictum-mcp"
    }
  }
}
```

## Entities

The API exposes 3 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Author** | The historical figure attributed to a quote, embedded in quote responses with `id`, `name`, `slug` and `imageUrl`. | `/authors` |
| **Category** | A thematic grouping of quotes (e.g. wisdom, knowledge, justice) surfaced on the Quoterism site; no dedicated endpoint is documented in the public developer page. | `/categories` |
| **Quote** | An individual quotation with text, author reference and creation timestamp, retrieved via `GET /api/quotes` (list) or `GET /api/quotes/{id}` (single, with special ids `random` and `quote-of-the-day`). | `/quotes` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from dictum_sdk import DictumSDK

client = DictumSDK({})

# List all authors
authors, err = client.Author(None).list(None, None)
```

### PHP

```php
<?php
require_once 'dictum_sdk.php';

$client = new DictumSDK([]);

// List all authors
[$authors, $err] = $client->Author(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/dictum-sdk/go"

client := sdk.NewDictumSDK(map[string]any{})

// List all authors
authors, err := client.Author(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Dictum_sdk"

client = DictumSDK.new({})

# List all authors
authors, err = client.Author(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("dictum_sdk")

local client = sdk.new({})

-- List all authors
local authors, err = client:Author(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = DictumSDK.test()
const result = await client.Author().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = DictumSDK.test(None, None)
result, err = client.Author(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = DictumSDK::test(null, null);
[$result, $err] = $client->Author(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Author(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = DictumSDK.test(nil, nil)
result, err = client.Author(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Author(nil):load(
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

## Using the Dictum API

- Upstream: [https://quoterism.com](https://quoterism.com)
- API docs: [https://quoterism.com/developer](https://quoterism.com/developer)

- The API documentation does not publish an explicit licence for the quote data
- Content is marked Copyright Quoterism on the site
- Check the [developer page](https://quoterism.com/developer) and contact the operator before redistributing data
- The `license` field in this SDK's metadata refers to the SDK code, not the upstream data

---

Generated from the Dictum API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
