<?php
declare(strict_types=1);

// AiPresentationGenerator SDK configuration

class AiPresentationGeneratorConfig
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
                "name" => "AiPresentationGenerator",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://api.pi.inc/v1",
                "auth" => [
                    "prefix" => "",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "presentation" => [],
                ],
            ],
            "entity" => [
        'presentation' => [
          'fields' => [
            [
              'name' => 'colorScheme',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'content',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'createdAt',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'downloadUrl',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'expiresAt',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'format',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'includeCharts',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'language',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'layout',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'previewUrl',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'slides',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'status',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'theme',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'topic',
              'req' => true,
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'presentation',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/presentations',
                  'parts' => [
                    'presentations',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
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
                        'example' => 'pres_abc123def456',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'presentation_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/presentations/{presentationId}',
                  'parts' => [
                    'presentations',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'presentationId' => 'id',
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
        return AiPresentationGeneratorFeatures::make_feature($name);
    }
}
