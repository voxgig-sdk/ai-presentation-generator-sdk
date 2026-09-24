# AiPresentationGenerator SDK configuration


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
            "name": "AiPresentationGenerator",
            "slug": "ai-presentation-generator",
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
            "base": "https://api.pi.inc/v1",
            "auth": {
                "prefix": "",
                "name": "X-API-Key",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "presentation": {},
            },
        },
        "entity": {
      "presentation": {
        "fields": [
          {
            "name": "colorScheme",
            "title": "Color Scheme",
            "type": "`$STRING`",
            "short": "Primary color scheme for the presentation",
          },
          {
            "name": "content",
            "title": "Content",
            "type": "`$STRING`",
            "req": True,
            "short": "The main content or key points for the presentation",
          },
          {
            "name": "createdAt",
            "title": "Created At",
            "type": "`$STRING`",
            "short": "Timestamp when the presentation was created",
            "format": "date-time",
          },
          {
            "name": "downloadUrl",
            "title": "Download Url",
            "type": "`$STRING`",
            "short": "URL to download the generated presentation",
            "format": "uri",
          },
          {
            "name": "expiresAt",
            "title": "Expires At",
            "type": "`$STRING`",
            "short": "Timestamp when the download link expires",
            "format": "date-time",
          },
          {
            "name": "format",
            "title": "Format",
            "type": "`$STRING`",
            "short": "File format of the presentation",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "short": "Unique identifier for the presentation",
          },
          {
            "name": "includeCharts",
            "title": "Include Charts",
            "type": "`$BOOLEAN`",
            "short": "Whether to include charts and graphs where applicable",
          },
          {
            "name": "language",
            "title": "Language",
            "type": "`$STRING`",
            "short": "Language for the presentation content",
          },
          {
            "name": "layout",
            "title": "Layout",
            "type": "`$STRING`",
            "short": "Layout style for the slides",
          },
          {
            "name": "previewUrl",
            "title": "Preview Url",
            "type": "`$STRING`",
            "short": "URL to preview the presentation online",
            "format": "uri",
          },
          {
            "name": "slides",
            "title": "Slides",
            "type": "`$INTEGER`",
            "short": "Number of slides in the presentation",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "short": "Current status of the presentation generation",
          },
          {
            "name": "theme",
            "title": "Theme",
            "type": "`$STRING`",
            "short": "Applied theme",
          },
          {
            "name": "topic",
            "title": "Topic",
            "type": "`$STRING`",
            "req": True,
            "short": "The main topic or title of the presentation",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "presentation",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/presentations",
                "segments": [
                  {
                    "lit": "presentations",
                  },
                ],
                "parts": [
                  "presentations",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/presentations/{presentationId}",
                "segments": [
                  {
                    "lit": "presentations",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "presentations",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "presentationId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "presentation_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "pres_abc123def456",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
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
