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
                "slug" => "ai-presentation-generator",
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
              'short' => 'Primary color scheme for the presentation',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'content',
              'req' => true,
              'short' => 'The main content or key points for the presentation',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'date-time',
              'name' => 'createdAt',
              'short' => 'Timestamp when the presentation was created',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'uri',
              'name' => 'downloadUrl',
              'short' => 'URL to download the generated presentation',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'date-time',
              'name' => 'expiresAt',
              'short' => 'Timestamp when the download link expires',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'format',
              'short' => 'File format of the presentation',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the presentation',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'includeCharts',
              'short' => 'Whether to include charts and graphs where applicable',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'language',
              'short' => 'Language for the presentation content',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'layout',
              'short' => 'Layout style for the slides',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'uri',
              'name' => 'previewUrl',
              'short' => 'URL to preview the presentation online',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'slides',
              'short' => 'Number of slides in the presentation',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'status',
              'short' => 'Current status of the presentation generation',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'theme',
              'short' => 'Applied theme',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'topic',
              'req' => true,
              'short' => 'The main topic or title of the presentation',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
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
                  'segments' => [
                    [
                      'lit' => 'presentations',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'presentations',
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
                  'rename' => [
                    'param' => [
                      'presentationId' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'presentations',
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
                    'presentations',
                    '{id}',
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
