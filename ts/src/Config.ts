
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


  main = {
    name: 'AiPresentationGenerator',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
          "type": "`$STRING`"
        },
        {
          "name": "content",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "createdAt",
          "type": "`$STRING`"
        },
        {
          "name": "downloadUrl",
          "type": "`$STRING`"
        },
        {
          "name": "expiresAt",
          "type": "`$STRING`"
        },
        {
          "name": "format",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "includeCharts",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "language",
          "type": "`$STRING`"
        },
        {
          "name": "layout",
          "type": "`$STRING`"
        },
        {
          "name": "previewUrl",
          "type": "`$STRING`"
        },
        {
          "name": "slides",
          "type": "`$INTEGER`"
        },
        {
          "name": "status",
          "type": "`$STRING`"
        },
        {
          "name": "theme",
          "type": "`$STRING`"
        },
        {
          "name": "topic",
          "req": true,
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

