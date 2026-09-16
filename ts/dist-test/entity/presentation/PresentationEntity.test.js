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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "colorScheme", "req": false, "short": "Primary color scheme for the presentation", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "content", "req": true, "short": "The main content or key points for the presentation", "type": "`$STRING`", "index$": 1 }, { "active": true, "format": "date-time", "name": "createdAt", "req": false, "short": "Timestamp when the presentation was created", "type": "`$STRING`", "index$": 2 }, { "active": true, "format": "uri", "name": "downloadUrl", "req": false, "short": "URL to download the generated presentation", "type": "`$STRING`", "index$": 3 }, { "active": true, "format": "date-time", "name": "expiresAt", "req": false, "short": "Timestamp when the download link expires", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "format", "req": false, "short": "File format of the presentation", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "id", "req": false, "short": "Unique identifier for the presentation", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "includeCharts", "req": false, "short": "Whether to include charts and graphs where applicable", "type": "`$BOOLEAN`", "index$": 7 }, { "active": true, "name": "language", "req": false, "short": "Language for the presentation content", "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "layout", "req": false, "short": "Layout style for the slides", "type": "`$STRING`", "index$": 9 }, { "active": true, "format": "uri", "name": "previewUrl", "req": false, "short": "URL to preview the presentation online", "type": "`$STRING`", "index$": 10 }, { "active": true, "name": "slides", "req": false, "short": "Number of slides in the presentation", "type": "`$INTEGER`", "index$": 11 }, { "active": true, "name": "status", "req": false, "short": "Current status of the presentation generation", "type": "`$STRING`", "index$": 12 }, { "active": true, "name": "theme", "req": false, "short": "Applied theme", "type": "`$STRING`", "index$": 13 }, { "active": true, "name": "topic", "req": true, "short": "The main topic or title of the presentation", "type": "`$STRING`", "index$": 14 }], "id": { "field": "id", "name": "id" }, "name": "presentation", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /presentations", "json": "{\"operationId\":\"createPresentation\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"examples\":{\"basicPresentation\":{\"summary\":\"Basic presentation example\",\"value\":{\"content\":\"Introduction to AI Technology\",\"layout\":\"professional\",\"slides\":10,\"theme\":\"modern\",\"topic\":\"Artificial Intelligence\"}},\"detailedPresentation\":{\"summary\":\"Detailed presentation with outline\",\"value\":{\"content\":\"Quarterly Business Review: Sales increased by 25%, new product launches successful, expanding to 3 new markets\",\"includeCharts\":true,\"language\":\"en\",\"layout\":\"business\",\"slides\":15,\"theme\":\"corporate\",\"topic\":\"Q4 Business Review\"}}},\"schema\":{\"properties\":{\"colorScheme\":{\"default\":\"blue\",\"description\":\"Primary color scheme for the presentation\",\"enum\":[\"blue\",\"red\",\"green\",\"purple\",\"orange\",\"neutral\"],\"example\":\"blue\",\"type\":\"string\"},\"content\":{\"description\":\"The main content or key points for the presentation\",\"example\":\"Introduction to Machine Learning: supervised learning, unsupervised learning, neural networks\",\"maxLength\":10000,\"minLength\":10,\"type\":\"string\"},\"includeCharts\":{\"default\":false,\"description\":\"Whether to include charts and graphs where applicable\",\"example\":true,\"type\":\"boolean\"},\"language\":{\"default\":\"en\",\"description\":\"Language for the presentation content\",\"example\":\"en\",\"pattern\":\"^[a-z]{2}$\",\"type\":\"string\"},\"layout\":{\"default\":\"professional\",\"description\":\"Layout style for the slides\",\"enum\":[\"professional\",\"business\",\"educational\",\"casual\",\"formal\"],\"example\":\"professional\",\"type\":\"string\"},\"slides\":{\"default\":10,\"description\":\"Number of slides to generate\",\"example\":10,\"maximum\":50,\"minimum\":3,\"type\":\"integer\"},\"theme\":{\"default\":\"modern\",\"description\":\"Visual theme for the presentation\",\"enum\":[\"modern\",\"classic\",\"minimalist\",\"corporate\",\"creative\",\"academic\"],\"example\":\"modern\",\"type\":\"string\"},\"topic\":{\"description\":\"The main topic or title of the presentation\",\"example\":\"Introduction to Machine Learning\",\"maxLength\":200,\"minLength\":3,\"type\":\"string\"}},\"required\":[\"content\",\"topic\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"success\":{\"summary\":\"Successful generation\",\"value\":{\"createdAt\":\"2024-01-15T10:30:00Z\",\"downloadUrl\":\"https://api.pi.inc/v1/presentations/pres_abc123def456/download\",\"format\":\"pptx\",\"id\":\"pres_abc123def456\",\"previewUrl\":\"https://api.pi.inc/v1/presentations/pres_abc123def456/preview\",\"slides\":10,\"status\":\"completed\"}}},\"schema\":{\"properties\":{\"createdAt\":{\"description\":\"Timestamp when the presentation was created\",\"example\":\"2024-01-15T10:30:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"downloadUrl\":{\"description\":\"URL to download the generated presentation\",\"example\":\"https://api.pi.inc/v1/presentations/pres_abc123def456/download\",\"format\":\"uri\",\"type\":\"string\"},\"expiresAt\":{\"description\":\"Timestamp when the download link expires\",\"example\":\"2024-01-22T10:30:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"format\":{\"description\":\"File format of the presentation\",\"enum\":[\"pptx\",\"pdf\",\"key\"],\"example\":\"pptx\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the presentation\",\"example\":\"pres_abc123def456\",\"type\":\"string\"},\"previewUrl\":{\"description\":\"URL to preview the presentation online\",\"example\":\"https://api.pi.inc/v1/presentations/pres_abc123def456/preview\",\"format\":\"uri\",\"type\":\"string\"},\"slides\":{\"description\":\"Number of slides in the presentation\",\"example\":10,\"type\":\"integer\"},\"status\":{\"description\":\"Current status of the presentation generation\",\"enum\":[\"processing\",\"completed\",\"failed\"],\"example\":\"completed\",\"type\":\"string\"},\"theme\":{\"description\":\"Applied theme\",\"example\":\"modern\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Presentation successfully generated\"},\"400\":{\"content\":{\"application/json\":{\"examples\":{\"invalidInput\":{\"summary\":\"Invalid input example\",\"value\":{\"code\":400,\"error\":\"ValidationError\",\"message\":\"Content field is required and cannot be empty\"}}},\"schema\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"example\":400,\"type\":\"integer\"},\"details\":{\"additionalProperties\":true,\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error type\",\"example\":\"ValidationError\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Content field is required and cannot be empty\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid input parameters\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"example\":400,\"type\":\"integer\"},\"details\":{\"additionalProperties\":true,\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error type\",\"example\":\"ValidationError\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Content field is required and cannot be empty\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - Invalid or missing API key\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"example\":400,\"type\":\"integer\"},\"details\":{\"additionalProperties\":true,\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error type\",\"example\":\"ValidationError\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Content field is required and cannot be empty\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Too many requests - Rate limit exceeded\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"example\":400,\"type\":\"integer\"},\"details\":{\"additionalProperties\":true,\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error type\",\"example\":\"ValidationError\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Content field is required and cannot be empty\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Include your API key in the X-API-Key header.\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/presentations", "segments": [{ "lit": "presentations" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "pres_abc123def456", "kind": "param", "name": "id", "orig": "presentation_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /presentations/{presentationId}", "json": "{\"operationId\":\"getPresentation\",\"parameters\":[{\"description\":\"The unique identifier of the presentation\",\"in\":\"path\",\"name\":\"presentationId\",\"required\":true,\"schema\":{\"example\":\"pres_abc123def456\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"createdAt\":{\"description\":\"Timestamp when the presentation was created\",\"example\":\"2024-01-15T10:30:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"downloadUrl\":{\"description\":\"URL to download the generated presentation\",\"example\":\"https://api.pi.inc/v1/presentations/pres_abc123def456/download\",\"format\":\"uri\",\"type\":\"string\"},\"expiresAt\":{\"description\":\"Timestamp when the download link expires\",\"example\":\"2024-01-22T10:30:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"format\":{\"description\":\"File format of the presentation\",\"enum\":[\"pptx\",\"pdf\",\"key\"],\"example\":\"pptx\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the presentation\",\"example\":\"pres_abc123def456\",\"type\":\"string\"},\"previewUrl\":{\"description\":\"URL to preview the presentation online\",\"example\":\"https://api.pi.inc/v1/presentations/pres_abc123def456/preview\",\"format\":\"uri\",\"type\":\"string\"},\"slides\":{\"description\":\"Number of slides in the presentation\",\"example\":10,\"type\":\"integer\"},\"status\":{\"description\":\"Current status of the presentation generation\",\"enum\":[\"processing\",\"completed\",\"failed\"],\"example\":\"completed\",\"type\":\"string\"},\"theme\":{\"description\":\"Applied theme\",\"example\":\"modern\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Presentation details retrieved successfully\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"example\":400,\"type\":\"integer\"},\"details\":{\"additionalProperties\":true,\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error type\",\"example\":\"ValidationError\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Content field is required and cannot be empty\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"example\":400,\"type\":\"integer\"},\"details\":{\"additionalProperties\":true,\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error type\",\"example\":\"ValidationError\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Content field is required and cannot be empty\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Presentation not found\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Include your API key in the X-API-Key header.\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/presentations/{presentationId}", "rename": { "param": { "presentationId": "id" } }, "segments": [{ "lit": "presentations" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "presentation", "name__orig": "presentation", "Name": "Presentation", "name_": "presentation", "name-": "presentation", "NAME": "PRESENTATION", "index$": 0 }, { "active": true, "entity": "presentation", "key$": "BasicPresentationFlow", "kind": "basic", "name": "BasicPresentationFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "presentation_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "presentation_ref01", "srcdatavar": "presentation_ref01_data", "suffix": "_dt0" }, "match": { "id": "presentation01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-presentation_ref01" } }], "index$": 1 }] }, 'Presentation');
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