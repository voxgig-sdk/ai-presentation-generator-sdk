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
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
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
              "type" => "`$STRING`",
            },
            {
              "name" => "content",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "createdAt",
              "type" => "`$STRING`",
            },
            {
              "name" => "downloadUrl",
              "type" => "`$STRING`",
            },
            {
              "name" => "expiresAt",
              "type" => "`$STRING`",
            },
            {
              "name" => "format",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "includeCharts",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "language",
              "type" => "`$STRING`",
            },
            {
              "name" => "layout",
              "type" => "`$STRING`",
            },
            {
              "name" => "previewUrl",
              "type" => "`$STRING`",
            },
            {
              "name" => "slides",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "status",
              "type" => "`$STRING`",
            },
            {
              "name" => "theme",
              "type" => "`$STRING`",
            },
            {
              "name" => "topic",
              "req" => true,
              "type" => "`$STRING`",
            },
          ],
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
                  "parts" => [
                    "presentations",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
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
                  "parts" => [
                    "presentations",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "presentationId" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
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
