
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'Dictum',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://quoterism.com/api",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      author: {
      },

      category: {
      },

      quote: {
      },

    }
  }


  entity = {
    "author": {
      "fields": [
        {
          "name": "bio",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "quoteCount",
          "req": true,
          "type": "`$INTEGER`"
        }
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
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/authors",
              "parts": [
                "authors"
              ],
              "select": {
                "exist": [
                  "limit",
                  "page"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.authors`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "category": {
      "fields": [
        {
          "name": "categories",
          "type": "`$ARRAY`"
        },
        {
          "name": "total",
          "type": "`$INTEGER`"
        }
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
              "parts": [
                "categories"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.categories`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "quote": {
      "fields": [
        {
          "name": "author",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "category",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "source",
          "type": "`$STRING`"
        },
        {
          "name": "text",
          "req": true,
          "type": "`$STRING`"
        }
      ],
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "category",
                    "orig": "category",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 10,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/quotes",
              "parts": [
                "quotes"
              ],
              "select": {
                "exist": [
                  "author",
                  "category",
                  "limit",
                  "page"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.quotes`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/quotes/{id}",
              "parts": [
                "quotes",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/quotes/random",
              "parts": [
                "quotes",
                "random"
              ],
              "select": {
                "$action": "random"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

