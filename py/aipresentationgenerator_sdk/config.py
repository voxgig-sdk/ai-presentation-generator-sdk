# AiPresentationGenerator SDK configuration


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
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.pi.inc/v1",
            "auth": {
                "prefix": "",
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
            "short": "Primary color scheme for the presentation",
            "type": "`$STRING`",
          },
          {
            "name": "content",
            "req": True,
            "short": "The main content or key points for the presentation",
            "type": "`$STRING`",
          },
          {
            "name": "createdAt",
            "short": "Timestamp when the presentation was created",
            "type": "`$STRING`",
          },
          {
            "name": "downloadUrl",
            "short": "URL to download the generated presentation",
            "type": "`$STRING`",
          },
          {
            "name": "expiresAt",
            "short": "Timestamp when the download link expires",
            "type": "`$STRING`",
          },
          {
            "name": "format",
            "short": "File format of the presentation",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the presentation",
            "type": "`$STRING`",
          },
          {
            "name": "includeCharts",
            "short": "Whether to include charts and graphs where applicable",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "language",
            "short": "Language for the presentation content",
            "type": "`$STRING`",
          },
          {
            "name": "layout",
            "short": "Layout style for the slides",
            "type": "`$STRING`",
          },
          {
            "name": "previewUrl",
            "short": "URL to preview the presentation online",
            "type": "`$STRING`",
          },
          {
            "name": "slides",
            "short": "Number of slides in the presentation",
            "type": "`$INTEGER`",
          },
          {
            "name": "status",
            "short": "Current status of the presentation generation",
            "type": "`$STRING`",
          },
          {
            "name": "theme",
            "short": "Applied theme",
            "type": "`$STRING`",
          },
          {
            "name": "topic",
            "req": True,
            "short": "The main topic or title of the presentation",
            "type": "`$STRING`",
          },
        ],
        "name": "presentation",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/presentations",
                "parts": [
                  "presentations",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                      "example": "pres_abc123def456",
                      "kind": "param",
                      "name": "id",
                      "orig": "presentation_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/presentations/{presentationId}",
                "parts": [
                  "presentations",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "presentationId": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
