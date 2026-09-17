
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'AiPresentationGenerator',
        slug: "ai-presentation-generator",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
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
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://api.pi.inc/v1",

    auth: {
      prefix: '',
      name: 'X-API-Key',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        presentation: {
        },
  
    }
  }


  entity = {
    "presentation": {
      "fields": [
        {
          "name": "colorScheme",
          "short": "Primary color scheme for the presentation",
          "type": "`$STRING`"
        },
        {
          "name": "content",
          "req": true,
          "short": "The main content or key points for the presentation",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "createdAt",
          "short": "Timestamp when the presentation was created",
          "type": "`$STRING`"
        },
        {
          "format": "uri",
          "name": "downloadUrl",
          "short": "URL to download the generated presentation",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "expiresAt",
          "short": "Timestamp when the download link expires",
          "type": "`$STRING`"
        },
        {
          "name": "format",
          "short": "File format of the presentation",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the presentation",
          "type": "`$STRING`"
        },
        {
          "name": "includeCharts",
          "short": "Whether to include charts and graphs where applicable",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "language",
          "short": "Language for the presentation content",
          "type": "`$STRING`"
        },
        {
          "name": "layout",
          "short": "Layout style for the slides",
          "type": "`$STRING`"
        },
        {
          "format": "uri",
          "name": "previewUrl",
          "short": "URL to preview the presentation online",
          "type": "`$STRING`"
        },
        {
          "name": "slides",
          "short": "Number of slides in the presentation",
          "type": "`$INTEGER`"
        },
        {
          "name": "status",
          "short": "Current status of the presentation generation",
          "type": "`$STRING`"
        },
        {
          "name": "theme",
          "short": "Applied theme",
          "type": "`$STRING`"
        },
        {
          "name": "topic",
          "req": true,
          "short": "The main topic or title of the presentation",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
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
              "segments": [
                {
                  "lit": "presentations"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "presentations"
              ]
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
                    "example": "pres_abc123def456",
                    "kind": "param",
                    "name": "id",
                    "orig": "presentation_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/presentations/{presentationId}",
              "rename": {
                "param": {
                  "presentationId": "id"
                }
              },
              "segments": [
                {
                  "lit": "presentations"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "presentations",
                "{id}"
              ]
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
  config,
  FEATURE_PLUGINS,
}

