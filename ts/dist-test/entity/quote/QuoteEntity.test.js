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
(0, node_test_1.describe)('QuoteEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DICTUM_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DICTUM_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DictumSDK.test();
        const ent = testsdk.Quote();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DICTUM_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'quote.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "author": { "a": true, "h": "Author", "n": "author", "r": true, "sh": "The author of the quote", "t": "`$STRING`", "key$": "author", "index$": 0 }, "category": { "a": true, "h": "Category", "n": "category", "r": false, "sh": "Category or theme of the quote", "t": "`$STRING`", "key$": "category", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "Unique identifier of the quote", "t": "`$STRING`", "key$": "id", "index$": 2 }, "source": { "a": true, "h": "Source", "n": "source", "r": false, "sh": "Source or origin of the quote", "t": "`$STRING`", "key$": "source", "index$": 3 }, "text": { "a": true, "h": "Text", "n": "text", "r": true, "sh": "The text content of the quote", "t": "`$STRING`", "key$": "text", "index$": 4 } }, "id": { "field": "id", "name": "id" }, "name": "quote", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /quotes", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "author", "or": "author", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "category", "or": "category", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": 10, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/quotes", "q": { "exist": ["author", "category", "limit", "page"] }, "r": {}, "s": [{ "lit": "quotes" }], "t": { "req": "`reqdata`", "res": "`body.quotes`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /quotes/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/quotes/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "quotes" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /quotes/random", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/quotes/random", "q": { "$action": "random" }, "r": {}, "s": [{ "lit": "quotes" }, { "lit": "random" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "quote", "name__orig": "quote", "Name": "Quote", "name_": "quote", "name-": "quote", "NAME": "QUOTE", "index$": 2 }, { "active": true, "entity": "quote", "key$": "BasicQuoteFlow", "kind": "basic", "name": "BasicQuoteFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "quote_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "quote_ref01", "srcdatavar": "quote_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-quote_ref01" } }], "index$": 1 }] }, 'Quote', { "GET /quotes": { "protocol": "http", "operationId": "getQuotes", "responses": { "200": { "description": "Successful response with a list of quotes", "content": { "application/json": { "schema": { "type": "object", "properties": { "quotes": { "items": { "properties": { "author": { "description": "The author of the quote", "type": "string", "key$": "author" }, "category": { "description": "Category or theme of the quote", "type": "string", "key$": "category" }, "id": { "description": "Unique identifier of the quote", "type": "string", "key$": "id" }, "source": { "description": "Source or origin of the quote", "nullable": true, "type": "string", "key$": "source" }, "text": { "description": "The text content of the quote", "type": "string", "key$": "text" } }, "required": ["id", "text", "author"], "type": "object", "x-ref": "#/components/schemas/Quote", "index$": 0 }, "key$": "quotes", "type": "array" }, "total": { "description": "Total number of quotes available", "key$": "total", "type": "integer" }, "page": { "description": "Current page number", "key$": "page", "type": "integer" }, "limit": { "description": "Number of quotes per page", "key$": "limit", "type": "integer" } } } } } }, "400": { "description": "Bad request - invalid parameters", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "message": { "type": "string", "description": "Detailed error description" }, "status": { "type": "integer", "description": "HTTP status code" } }, "required": ["error", "status"], "x-ref": "#/components/schemas/Error" } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "message": { "type": "string", "description": "Detailed error description" }, "status": { "type": "integer", "description": "HTTP status code" } }, "required": ["error", "status"], "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "author", "in": "query", "description": "Filter quotes by author name", "required": false, "schema": { "type": "string" }, "index$": 0 }, { "name": "category", "in": "query", "description": "Filter quotes by category", "required": false, "schema": { "type": "string" }, "index$": 1 }, { "name": "limit", "in": "query", "description": "Number of quotes to return", "required": false, "schema": { "type": "integer", "default": 10, "minimum": 1, "maximum": 100 }, "index$": 2 }, { "name": "page", "in": "query", "description": "Page number for pagination", "required": false, "schema": { "type": "integer", "default": 1, "minimum": 1 }, "index$": 3 }], "securitySource": "unspecified" }, "GET /quotes/{id}": { "protocol": "http", "operationId": "getQuoteById", "responses": { "200": { "description": "Successful response with the requested quote", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "description": "Unique identifier of the quote", "key$": "id", "type": "string" }, "text": { "description": "The text content of the quote", "key$": "text", "type": "string" }, "author": { "description": "The author of the quote", "key$": "author", "type": "string" }, "category": { "description": "Category or theme of the quote", "key$": "category", "type": "string" }, "source": { "description": "Source or origin of the quote", "key$": "source", "nullable": true, "type": "string" } }, "required": ["id", "text", "author"], "x-ref": "#/components/schemas/Quote", "index$": 0 } } } }, "404": { "description": "Quote not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "message": { "type": "string", "description": "Detailed error description" }, "status": { "type": "integer", "description": "HTTP status code" } }, "required": ["error", "status"], "x-ref": "#/components/schemas/Error" } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "message": { "type": "string", "description": "Detailed error description" }, "status": { "type": "integer", "description": "HTTP status code" } }, "required": ["error", "status"], "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "id", "in": "path", "description": "Unique identifier of the quote", "required": true, "schema": { "type": "string" }, "index$": 0 }], "securitySource": "unspecified" }, "GET /quotes/random": { "protocol": "http", "operationId": "getRandomQuote", "responses": { "200": { "description": "Successful response with a random quote", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "description": "Unique identifier of the quote", "key$": "id", "type": "string" }, "text": { "description": "The text content of the quote", "key$": "text", "type": "string" }, "author": { "description": "The author of the quote", "key$": "author", "type": "string" }, "category": { "description": "Category or theme of the quote", "key$": "category", "type": "string" }, "source": { "description": "Source or origin of the quote", "key$": "source", "nullable": true, "type": "string" } }, "required": ["id", "text", "author"], "x-ref": "#/components/schemas/Quote", "index$": 0 }, "example": { "id": "12345", "text": "The only way to do great work is to love what you do.", "author": "Steve Jobs", "category": "motivation" } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "message": { "type": "string", "description": "Detailed error description" }, "status": { "type": "integer", "description": "HTTP status code" } }, "required": ["error", "status"], "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let quote_ref01_data = Object.values(setup.data.existing.quote)[0];
        // LIST
        const quote_ref01_ent = client.Quote();
        const quote_ref01_match = {};
        const quote_ref01_list = (await quote_ref01_ent.list(quote_ref01_match)).map((e) => e.data());
        // LOAD
        const quote_ref01_match_dt0 = {};
        quote_ref01_match_dt0.id = quote_ref01_data.id;
        const quote_ref01_data_dt0 = (await quote_ref01_ent.load(quote_ref01_match_dt0)).data();
        (0, node_assert_1.default)(quote_ref01_data_dt0.id === quote_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/quote/QuoteTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DictumSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['quote01', 'quote02', 'quote03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DICTUM_TEST_QUOTE_ENTID': idmap,
        'DICTUM_TEST_LIVE': 'FALSE',
        'DICTUM_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['DICTUM_TEST_QUOTE_ENTID'];
    const live = 'TRUE' === env.DICTUM_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DICTUM_TEST_QUOTE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.DictumSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
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
        explain: 'TRUE' === env.DICTUM_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=QuoteEntity.test.js.map