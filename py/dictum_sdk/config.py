# Dictum SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Dictum",
            "slug": "dictum",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://quoterism.com/api",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "author": {},
                "category": {},
                "quote": {},
            },
        },
        "entity": {
      "author": {
        "fields": [
          {
            "name": "bio",
            "short": "Brief biography of the author",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "req": True,
            "short": "Name of the author",
            "type": "`$STRING`",
          },
          {
            "name": "quoteCount",
            "req": True,
            "short": "Number of quotes by this author in the collection",
            "type": "`$INTEGER`",
          },
        ],
        "name": "author",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 50,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/authors",
                "segments": [
                  {
                    "lit": "authors",
                  },
                ],
                "select": {
                  "exist": [
                    "limit",
                    "page",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.authors`",
                },
                "parts": [
                  "authors",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "category": {
        "fields": [
          {
            "name": "categories",
            "type": "`$ARRAY`",
          },
          {
            "name": "total",
            "short": "Total number of categories",
            "type": "`$INTEGER`",
          },
        ],
        "name": "category",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/categories",
                "segments": [
                  {
                    "lit": "categories",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.categories`",
                },
                "parts": [
                  "categories",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "quote": {
        "fields": [
          {
            "name": "author",
            "req": True,
            "short": "The author of the quote",
            "type": "`$STRING`",
          },
          {
            "name": "category",
            "short": "Category or theme of the quote",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "req": True,
            "short": "Unique identifier of the quote",
            "type": "`$STRING`",
          },
          {
            "name": "source",
            "short": "Source or origin of the quote",
            "type": "`$STRING`",
          },
          {
            "name": "text",
            "req": True,
            "short": "The text content of the quote",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "quote",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "author",
                      "orig": "author",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "category",
                      "orig": "category",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 10,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/quotes",
                "segments": [
                  {
                    "lit": "quotes",
                  },
                ],
                "select": {
                  "exist": [
                    "author",
                    "category",
                    "limit",
                    "page",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.quotes`",
                },
                "parts": [
                  "quotes",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/quotes/{id}",
                "segments": [
                  {
                    "lit": "quotes",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "quotes",
                  "{id}",
                ],
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/quotes/random",
                "segments": [
                  {
                    "lit": "quotes",
                  },
                  {
                    "lit": "random",
                  },
                ],
                "select": {
                  "$action": "random",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "quotes",
                  "random",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
