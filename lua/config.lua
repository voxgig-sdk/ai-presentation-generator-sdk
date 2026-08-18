-- AiPresentationGenerator SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "AiPresentationGenerator",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://api.pi.inc/v1",
      auth = {
        prefix = "",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["presentation"] = {},
      },
    },
    entity = {
      ["presentation"] = {
        ["fields"] = {
          {
            ["name"] = "colorScheme",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "content",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "createdAt",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "downloadUrl",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "expiresAt",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "format",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "includeCharts",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "language",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "layout",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "previewUrl",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "slides",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "status",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "theme",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "topic",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "presentation",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/presentations",
                ["parts"] = {
                  "presentations",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "pres_abc123def456",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "presentation_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/presentations/{presentationId}",
                ["parts"] = {
                  "presentations",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["presentationId"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
