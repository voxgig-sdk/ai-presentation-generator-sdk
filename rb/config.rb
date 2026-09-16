# AiPresentationGenerator SDK configuration

module AiPresentationGeneratorConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "AiPresentationGenerator",
        "slug" => "ai-presentation-generator",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://api.pi.inc/v1",
        "auth" => {
          "prefix" => "",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "presentation" => {},
        },
      },
      "entity" => {
        "presentation" => {
          "fields" => [
            {
              "name" => "colorScheme",
              "short" => "Primary color scheme for the presentation",
              "type" => "`$STRING`",
            },
            {
              "name" => "content",
              "req" => true,
              "short" => "The main content or key points for the presentation",
              "type" => "`$STRING`",
            },
            {
              "format" => "date-time",
              "name" => "createdAt",
              "short" => "Timestamp when the presentation was created",
              "type" => "`$STRING`",
            },
            {
              "format" => "uri",
              "name" => "downloadUrl",
              "short" => "URL to download the generated presentation",
              "type" => "`$STRING`",
            },
            {
              "format" => "date-time",
              "name" => "expiresAt",
              "short" => "Timestamp when the download link expires",
              "type" => "`$STRING`",
            },
            {
              "name" => "format",
              "short" => "File format of the presentation",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "Unique identifier for the presentation",
              "type" => "`$STRING`",
            },
            {
              "name" => "includeCharts",
              "short" => "Whether to include charts and graphs where applicable",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "language",
              "short" => "Language for the presentation content",
              "type" => "`$STRING`",
            },
            {
              "name" => "layout",
              "short" => "Layout style for the slides",
              "type" => "`$STRING`",
            },
            {
              "format" => "uri",
              "name" => "previewUrl",
              "short" => "URL to preview the presentation online",
              "type" => "`$STRING`",
            },
            {
              "name" => "slides",
              "short" => "Number of slides in the presentation",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "status",
              "short" => "Current status of the presentation generation",
              "type" => "`$STRING`",
            },
            {
              "name" => "theme",
              "short" => "Applied theme",
              "type" => "`$STRING`",
            },
            {
              "name" => "topic",
              "req" => true,
              "short" => "The main topic or title of the presentation",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "presentation",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/presentations",
                  "segments" => [
                    {
                      "lit" => "presentations",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "presentations",
                  ],
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "pres_abc123def456",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "presentation_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/presentations/{presentationId}",
                  "rename" => {
                    "param" => {
                      "presentationId" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "presentations",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "presentations",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    AiPresentationGeneratorFeatures.make_feature(name)
  end
end
