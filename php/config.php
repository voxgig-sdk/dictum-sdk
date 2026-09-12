<?php
declare(strict_types=1);

// Dictum SDK configuration

class DictumConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Dictum",
                "slug" => "dictum",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://quoterism.com/api",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "author" => [],
                    "category" => [],
                    "quote" => [],
                ],
            ],
            "entity" => [
        'author' => [
          'fields' => [
            [
              'name' => 'bio',
              'short' => 'Brief biography of the author',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'req' => true,
              'short' => 'Name of the author',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'quoteCount',
              'req' => true,
              'short' => 'Number of quotes by this author in the collection',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'author',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 50,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/authors',
                  'segments' => [
                    [
                      'lit' => 'authors',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'page',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.authors`',
                  ],
                  'parts' => [
                    'authors',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'category' => [
          'fields' => [
            [
              'name' => 'categories',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'total',
              'short' => 'Total number of categories',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'category',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/categories',
                  'segments' => [
                    [
                      'lit' => 'categories',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.categories`',
                  ],
                  'parts' => [
                    'categories',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'quote' => [
          'fields' => [
            [
              'name' => 'author',
              'req' => true,
              'short' => 'The author of the quote',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'category',
              'short' => 'Category or theme of the quote',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'req' => true,
              'short' => 'Unique identifier of the quote',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'source',
              'short' => 'Source or origin of the quote',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'text',
              'req' => true,
              'short' => 'The text content of the quote',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'quote',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'author',
                        'orig' => 'author',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'category',
                        'orig' => 'category',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 10,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/quotes',
                  'segments' => [
                    [
                      'lit' => 'quotes',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'author',
                      'category',
                      'limit',
                      'page',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.quotes`',
                  ],
                  'parts' => [
                    'quotes',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/quotes/{id}',
                  'segments' => [
                    [
                      'lit' => 'quotes',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'quotes',
                    '{id}',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/quotes/random',
                  'segments' => [
                    [
                      'lit' => 'quotes',
                    ],
                    [
                      'lit' => 'random',
                    ],
                  ],
                  'select' => [
                    '$action' => 'random',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'quotes',
                    'random',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return DictumFeatures::make_feature($name);
    }
}
