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
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://api.pi.inc/v1",
                "auth" => [
                    "prefix" => "",
                    "name" => "X-API-Key",
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
              'title' => 'Color Scheme',
              'type' => '`$STRING`',
              'short' => 'Primary color scheme for the presentation',
            ],
            [
              'name' => 'content',
              'title' => 'Content',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'The main content or key points for the presentation',
            ],
            [
              'name' => 'createdAt',
              'title' => 'Created At',
              'type' => '`$STRING`',
              'short' => 'Timestamp when the presentation was created',
              'format' => 'date-time',
            ],
            [
              'name' => 'downloadUrl',
              'title' => 'Download Url',
              'type' => '`$STRING`',
              'short' => 'URL to download the generated presentation',
              'format' => 'uri',
            ],
            [
              'name' => 'expiresAt',
              'title' => 'Expires At',
              'type' => '`$STRING`',
              'short' => 'Timestamp when the download link expires',
              'format' => 'date-time',
            ],
            [
              'name' => 'format',
              'title' => 'Format',
              'type' => '`$STRING`',
              'short' => 'File format of the presentation',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
              'short' => 'Unique identifier for the presentation',
            ],
            [
              'name' => 'includeCharts',
              'title' => 'Include Charts',
              'type' => '`$BOOLEAN`',
              'short' => 'Whether to include charts and graphs where applicable',
            ],
            [
              'name' => 'language',
              'title' => 'Language',
              'type' => '`$STRING`',
              'short' => 'Language for the presentation content',
            ],
            [
              'name' => 'layout',
              'title' => 'Layout',
              'type' => '`$STRING`',
              'short' => 'Layout style for the slides',
            ],
            [
              'name' => 'previewUrl',
              'title' => 'Preview Url',
              'type' => '`$STRING`',
              'short' => 'URL to preview the presentation online',
              'format' => 'uri',
            ],
            [
              'name' => 'slides',
              'title' => 'Slides',
              'type' => '`$INTEGER`',
              'short' => 'Number of slides in the presentation',
            ],
            [
              'name' => 'status',
              'title' => 'Status',
              'type' => '`$STRING`',
              'short' => 'Current status of the presentation generation',
            ],
            [
              'name' => 'theme',
              'title' => 'Theme',
              'type' => '`$STRING`',
              'short' => 'Applied theme',
            ],
            [
              'name' => 'topic',
              'title' => 'Topic',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'The main topic or title of the presentation',
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
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/presentations',
                  'segments' => [
                    [
                      'lit' => 'presentations',
                    ],
                  ],
                  'parts' => [
                    'presentations',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/presentations/{presentationId}',
                  'segments' => [
                    [
                      'lit' => 'presentations',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'presentations',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'presentationId' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'presentation_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 'pres_abc123def456',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
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
