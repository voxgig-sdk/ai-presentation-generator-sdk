"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('PresentationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when AI_PRESENTATION_GENERATOR_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('AI_PRESENTATION_GENERATOR_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.AiPresentationGeneratorSDK.test();
        const ent = testsdk.Presentation();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.AI_PRESENTATION_GENERATOR_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'presentation.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "colorScheme": { "a": true, "h": "Color Scheme", "n": "colorScheme", "r": false, "sh": "Primary color scheme for the presentation", "t": "`$STRING`", "key$": "colorScheme", "index$": 0 }, "content": { "a": true, "h": "Content", "n": "content", "r": true, "sh": "The main content or key points for the presentation", "t": "`$STRING`", "key$": "content", "index$": 1 }, "createdAt": { "a": true, "fo": "date-time", "h": "Created At", "n": "createdAt", "r": false, "sh": "Timestamp when the presentation was created", "t": "`$STRING`", "key$": "createdAt", "index$": 2 }, "downloadUrl": { "a": true, "fo": "uri", "h": "Download Url", "n": "downloadUrl", "r": false, "sh": "URL to download the generated presentation", "t": "`$STRING`", "key$": "downloadUrl", "index$": 3 }, "expiresAt": { "a": true, "fo": "date-time", "h": "Expires At", "n": "expiresAt", "r": false, "sh": "Timestamp when the download link expires", "t": "`$STRING`", "key$": "expiresAt", "index$": 4 }, "format": { "a": true, "h": "Format", "n": "format", "r": false, "sh": "File format of the presentation", "t": "`$STRING`", "key$": "format", "index$": 5 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Unique identifier for the presentation", "t": "`$STRING`", "key$": "id", "index$": 6 }, "includeCharts": { "a": true, "h": "Include Charts", "n": "includeCharts", "r": false, "sh": "Whether to include charts and graphs where applicable", "t": "`$BOOLEAN`", "key$": "includeCharts", "index$": 7 }, "language": { "a": true, "h": "Language", "n": "language", "r": false, "sh": "Language for the presentation content", "t": "`$STRING`", "key$": "language", "index$": 8 }, "layout": { "a": true, "h": "Layout", "n": "layout", "r": false, "sh": "Layout style for the slides", "t": "`$STRING`", "key$": "layout", "index$": 9 }, "previewUrl": { "a": true, "fo": "uri", "h": "Preview Url", "n": "previewUrl", "r": false, "sh": "URL to preview the presentation online", "t": "`$STRING`", "key$": "previewUrl", "index$": 10 }, "slides": { "a": true, "h": "Slides", "n": "slides", "r": false, "sh": "Number of slides in the presentation", "t": "`$INTEGER`", "key$": "slides", "index$": 11 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "Current status of the presentation generation", "t": "`$STRING`", "key$": "status", "index$": 12 }, "theme": { "a": true, "h": "Theme", "n": "theme", "r": false, "sh": "Applied theme", "t": "`$STRING`", "key$": "theme", "index$": 13 }, "topic": { "a": true, "h": "Topic", "n": "topic", "r": true, "sh": "The main topic or title of the presentation", "t": "`$STRING`", "key$": "topic", "index$": 14 } }, "id": { "field": "id", "name": "id" }, "name": "presentation", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /presentations", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/presentations", "q": {}, "r": {}, "s": [{ "lit": "presentations" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /presentations/{presentationId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "pres_abc123def456", "k": "param", "n": "id", "or": "presentation_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/presentations/{presentationId}", "q": { "exist": ["id"] }, "r": { "param": { "presentationId": "id" } }, "s": [{ "lit": "presentations" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "presentation", "name__orig": "presentation", "Name": "Presentation", "name_": "presentation", "name-": "presentation", "NAME": "PRESENTATION", "index$": 0 }, { "active": true, "entity": "presentation", "key$": "BasicPresentationFlow", "kind": "basic", "name": "BasicPresentationFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "presentation_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "presentation_ref01", "srcdatavar": "presentation_ref01_data", "suffix": "_dt0" }, "m": { "id": "presentation01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-presentation_ref01" } }], "index$": 1 }] }, 'Presentation', { "POST /presentations": { "protocol": "http", "operationId": "createPresentation", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["content", "topic"], "properties": { "content": { "type": "string", "description": "The main content or key points for the presentation", "minLength": 10, "maxLength": 10000, "example": "Introduction to Machine Learning: supervised learning, unsupervised learning, neural networks", "key$": "content" }, "topic": { "type": "string", "description": "The main topic or title of the presentation", "minLength": 3, "maxLength": 200, "example": "Introduction to Machine Learning", "key$": "topic" }, "slides": { "type": "integer", "description": "Number of slides to generate", "minimum": 3, "maximum": 50, "default": 10, "example": 10, "key$": "slides" }, "theme": { "type": "string", "description": "Visual theme for the presentation", "enum": ["modern", "classic", "minimalist", "corporate", "creative", "academic"], "default": "modern", "example": "modern", "key$": "theme" }, "layout": { "type": "string", "description": "Layout style for the slides", "enum": ["professional", "business", "educational", "casual", "formal"], "default": "professional", "example": "professional", "key$": "layout" }, "includeCharts": { "type": "boolean", "description": "Whether to include charts and graphs where applicable", "default": false, "example": true, "key$": "includeCharts" }, "language": { "type": "string", "description": "Language for the presentation content", "pattern": "^[a-z]{2}$", "default": "en", "example": "en", "key$": "language" }, "colorScheme": { "type": "string", "description": "Primary color scheme for the presentation", "enum": ["blue", "red", "green", "purple", "orange", "neutral"], "default": "blue", "example": "blue", "key$": "colorScheme" } }, "x-ref": "#/components/schemas/PresentationRequest", "index$": 1 }, "examples": { "basicPresentation": { "summary": "Basic presentation example", "value": { "content": "Introduction to AI Technology", "topic": "Artificial Intelligence", "slides": 10, "theme": "modern", "layout": "professional" } }, "detailedPresentation": { "summary": "Detailed presentation with outline", "value": { "content": "Quarterly Business Review: Sales increased by 25%, new product launches successful, expanding to 3 new markets", "topic": "Q4 Business Review", "slides": 15, "theme": "corporate", "layout": "business", "includeCharts": true, "language": "en" } } } } } }, "responses": { "200": { "description": "Presentation successfully generated", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "string", "description": "Unique identifier for the presentation", "example": "pres_abc123def456", "key$": "id" }, "status": { "type": "string", "description": "Current status of the presentation generation", "enum": ["processing", "completed", "failed"], "example": "completed", "key$": "status" }, "downloadUrl": { "type": "string", "format": "uri", "description": "URL to download the generated presentation", "example": "https://api.pi.inc/v1/presentations/pres_abc123def456/download", "key$": "downloadUrl" }, "previewUrl": { "type": "string", "format": "uri", "description": "URL to preview the presentation online", "example": "https://api.pi.inc/v1/presentations/pres_abc123def456/preview", "key$": "previewUrl" }, "slides": { "type": "integer", "description": "Number of slides in the presentation", "example": 10, "key$": "slides" }, "createdAt": { "type": "string", "format": "date-time", "description": "Timestamp when the presentation was created", "example": "2024-01-15T10:30:00Z", "key$": "createdAt" }, "format": { "type": "string", "description": "File format of the presentation", "enum": ["pptx", "pdf", "key"], "example": "pptx", "key$": "format" }, "theme": { "type": "string", "description": "Applied theme", "example": "modern", "key$": "theme" }, "expiresAt": { "type": "string", "format": "date-time", "description": "Timestamp when the download link expires", "example": "2024-01-22T10:30:00Z", "key$": "expiresAt" } }, "x-ref": "#/components/schemas/PresentationResponse", "index$": 0 }, "examples": { "success": { "summary": "Successful generation", "value": { "id": "pres_abc123def456", "status": "completed", "downloadUrl": "https://api.pi.inc/v1/presentations/pres_abc123def456/download", "previewUrl": "https://api.pi.inc/v1/presentations/pres_abc123def456/preview", "slides": 10, "createdAt": "2024-01-15T10:30:00Z", "format": "pptx" } } } } } }, "400": { "description": "Bad request - Invalid input parameters", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error type", "example": "ValidationError" }, "message": { "type": "string", "description": "Human-readable error message", "example": "Content field is required and cannot be empty" }, "code": { "type": "integer", "description": "HTTP status code", "example": 400 }, "details": { "type": "object", "description": "Additional error details", "additionalProperties": true } }, "x-ref": "#/components/schemas/Error" }, "examples": { "invalidInput": { "summary": "Invalid input example", "value": { "error": "ValidationError", "message": "Content field is required and cannot be empty", "code": 400 } } } } } }, "401": { "description": "Unauthorized - Invalid or missing API key", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error type", "example": "ValidationError" }, "message": { "type": "string", "description": "Human-readable error message", "example": "Content field is required and cannot be empty" }, "code": { "type": "integer", "description": "HTTP status code", "example": 400 }, "details": { "type": "object", "description": "Additional error details", "additionalProperties": true } }, "x-ref": "#/components/schemas/Error" } } } }, "429": { "description": "Too many requests - Rate limit exceeded", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error type", "example": "ValidationError" }, "message": { "type": "string", "description": "Human-readable error message", "example": "Content field is required and cannot be empty" }, "code": { "type": "integer", "description": "HTTP status code", "example": 400 }, "details": { "type": "object", "description": "Additional error details", "additionalProperties": true } }, "x-ref": "#/components/schemas/Error" } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error type", "example": "ValidationError" }, "message": { "type": "string", "description": "Human-readable error message", "example": "Content field is required and cannot be empty" }, "code": { "type": "integer", "description": "HTTP status code", "example": 400 }, "details": { "type": "object", "description": "Additional error details", "additionalProperties": true } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [], "security": [{ "ApiKeyAuth": [] }], "securitySource": "operation", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "header", "name": "X-API-Key", "description": "API key for authentication. Include your API key in the X-API-Key header." } } }, "GET /presentations/{presentationId}": { "protocol": "http", "operationId": "getPresentation", "responses": { "200": { "description": "Presentation details retrieved successfully", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "string", "description": "Unique identifier for the presentation", "example": "pres_abc123def456", "key$": "id" }, "status": { "type": "string", "description": "Current status of the presentation generation", "enum": ["processing", "completed", "failed"], "example": "completed", "key$": "status" }, "downloadUrl": { "type": "string", "format": "uri", "description": "URL to download the generated presentation", "example": "https://api.pi.inc/v1/presentations/pres_abc123def456/download", "key$": "downloadUrl" }, "previewUrl": { "type": "string", "format": "uri", "description": "URL to preview the presentation online", "example": "https://api.pi.inc/v1/presentations/pres_abc123def456/preview", "key$": "previewUrl" }, "slides": { "type": "integer", "description": "Number of slides in the presentation", "example": 10, "key$": "slides" }, "createdAt": { "type": "string", "format": "date-time", "description": "Timestamp when the presentation was created", "example": "2024-01-15T10:30:00Z", "key$": "createdAt" }, "format": { "type": "string", "description": "File format of the presentation", "enum": ["pptx", "pdf", "key"], "example": "pptx", "key$": "format" }, "theme": { "type": "string", "description": "Applied theme", "example": "modern", "key$": "theme" }, "expiresAt": { "type": "string", "format": "date-time", "description": "Timestamp when the download link expires", "example": "2024-01-22T10:30:00Z", "key$": "expiresAt" } }, "x-ref": "#/components/schemas/PresentationResponse", "index$": 0 } } } }, "401": { "description": "Unauthorized", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error type", "example": "ValidationError" }, "message": { "type": "string", "description": "Human-readable error message", "example": "Content field is required and cannot be empty" }, "code": { "type": "integer", "description": "HTTP status code", "example": 400 }, "details": { "type": "object", "description": "Additional error details", "additionalProperties": true } }, "x-ref": "#/components/schemas/Error" } } } }, "404": { "description": "Presentation not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error type", "example": "ValidationError" }, "message": { "type": "string", "description": "Human-readable error message", "example": "Content field is required and cannot be empty" }, "code": { "type": "integer", "description": "HTTP status code", "example": 400 }, "details": { "type": "object", "description": "Additional error details", "additionalProperties": true } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "presentationId", "in": "path", "required": true, "description": "The unique identifier of the presentation", "schema": { "type": "string", "example": "pres_abc123def456" }, "index$": 0 }], "security": [{ "ApiKeyAuth": [] }], "securitySource": "operation", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "header", "name": "X-API-Key", "description": "API key for authentication. Include your API key in the X-API-Key header." } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const presentation_ref01_ent = client.Presentation();
        let presentation_ref01_data = setup.data.new.presentation['presentation_ref01'];
        presentation_ref01_data = (await presentation_ref01_ent.create(presentation_ref01_data)).data();
        (0, node_assert_1.default)(null != presentation_ref01_data.id);
        // LOAD
        const presentation_ref01_match_dt0 = {};
        presentation_ref01_match_dt0.id = presentation_ref01_data.id;
        const presentation_ref01_data_dt0 = (await presentation_ref01_ent.load(presentation_ref01_match_dt0)).data();
        (0, node_assert_1.default)(presentation_ref01_data_dt0.id === presentation_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/presentation/PresentationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.AiPresentationGeneratorSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['presentation01', 'presentation02', 'presentation03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'AI_PRESENTATION_GENERATOR_TEST_PRESENTATION_ENTID': idmap,
        'AI_PRESENTATION_GENERATOR_TEST_LIVE': 'FALSE',
        'AI_PRESENTATION_GENERATOR_TEST_EXPLAIN': 'FALSE',
        'AI_PRESENTATION_GENERATOR_APIKEY': '',
    });
    idmap = env['AI_PRESENTATION_GENERATOR_TEST_PRESENTATION_ENTID'];
    const live = 'TRUE' === env.AI_PRESENTATION_GENERATOR_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['AI_PRESENTATION_GENERATOR_TEST_PRESENTATION_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.AiPresentationGeneratorSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.AI_PRESENTATION_GENERATOR_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.AI_PRESENTATION_GENERATOR_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=PresentationEntity.test.js.map