import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "presentation",
    "accessor": "Presentation",
    "op": "create",
    "method": "POST",
    "path": "/presentations",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-api-key"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "pres_abc123def456",
      "status": "completed",
      "downloadUrl": "https://api.pi.inc/v1/presentations/pres_abc123def456/download",
      "previewUrl": "https://api.pi.inc/v1/presentations/pres_abc123def456/preview",
      "slides": 10,
      "createdAt": "2024-01-15T10:30:00Z",
      "format": "pptx"
    },
    "idField": "id"
  },
  {
    "entity": "presentation",
    "accessor": "Presentation",
    "op": "load",
    "method": "GET",
    "path": "/presentations/{presentationId}",
    "args": [
      {
        "name": "id",
        "wire": "presentationId",
        "value": "pres_abc123def456"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-api-key"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "pres_abc123def456",
      "status": "completed",
      "downloadUrl": "https://api.pi.inc/v1/presentations/pres_abc123def456/download",
      "previewUrl": "https://api.pi.inc/v1/presentations/pres_abc123def456/preview",
      "slides": 10,
      "createdAt": "2024-01-15T10:30:00Z",
      "format": "pptx",
      "theme": "modern",
      "expiresAt": "2024-01-22T10:30:00Z"
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
