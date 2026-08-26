
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

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
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://api.pi.inc/v1",

    auth: {
      prefix: '',
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
          "name": "createdAt",
          "short": "Timestamp when the presentation was created",
          "type": "`$STRING`"
        },
        {
          "name": "downloadUrl",
          "short": "URL to download the generated presentation",
          "type": "`$STRING`"
        },
        {
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
                "presentations"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "presentations",
                "{id}"
              ],
              "rename": {
                "param": {
                  "presentationId": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
  config
}

