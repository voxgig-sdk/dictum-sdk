

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { DictumSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('QuoteEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DICTUM_TEST_LIVE=TRUE.
  afterEach(liveDelay('DICTUM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DictumSDK.test()
    const ent = testsdk.Quote()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DICTUM_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'quote.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"author","req":true,"short":"The author of the quote","type":"`$STRING`","index$":0},{"active":true,"name":"category","req":false,"short":"Category or theme of the quote","type":"`$STRING`","index$":1},{"active":true,"name":"id","req":true,"short":"Unique identifier of the quote","type":"`$STRING`","index$":2},{"active":true,"name":"source","req":false,"short":"Source or origin of the quote","type":"`$STRING`","index$":3},{"active":true,"name":"text","req":true,"short":"The text content of the quote","type":"`$STRING`","index$":4}],"id":{"field":"id","name":"id"},"name":"quote","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"author","orig":"author","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"category","orig":"category","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"example":10,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":2},{"active":true,"example":1,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":3}]},"contract":{"id":"GET /quotes","json":"{\"operationId\":\"getQuotes\",\"parameters\":[{\"description\":\"Filter quotes by author name\",\"in\":\"query\",\"name\":\"author\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter quotes by category\",\"in\":\"query\",\"name\":\"category\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Number of quotes to return\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":10,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Page number for pagination\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"limit\":{\"description\":\"Number of quotes per page\",\"type\":\"integer\"},\"page\":{\"description\":\"Current page number\",\"type\":\"integer\"},\"quotes\":{\"items\":{\"properties\":{\"author\":{\"description\":\"The author of the quote\",\"type\":\"string\"},\"category\":{\"description\":\"Category or theme of the quote\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier of the quote\",\"type\":\"string\"},\"source\":{\"description\":\"Source or origin of the quote\",\"nullable\":true,\"type\":\"string\"},\"text\":{\"description\":\"The text content of the quote\",\"type\":\"string\"}},\"required\":[\"id\",\"text\",\"author\"],\"type\":\"object\"},\"type\":\"array\"},\"total\":{\"description\":\"Total number of quotes available\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response with a list of quotes\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"required\":[\"error\",\"status\"],\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"required\":[\"error\",\"status\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/quotes","segments":[{"lit":"quotes"}],"select":{"exist":["author","category","limit","page"]},"transform":{"req":"`reqdata`","res":"`body.quotes`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /quotes/{id}","json":"{\"operationId\":\"getQuoteById\",\"parameters\":[{\"description\":\"Unique identifier of the quote\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"author\":{\"description\":\"The author of the quote\",\"type\":\"string\"},\"category\":{\"description\":\"Category or theme of the quote\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier of the quote\",\"type\":\"string\"},\"source\":{\"description\":\"Source or origin of the quote\",\"nullable\":true,\"type\":\"string\"},\"text\":{\"description\":\"The text content of the quote\",\"type\":\"string\"}},\"required\":[\"id\",\"text\",\"author\"],\"type\":\"object\"}}},\"description\":\"Successful response with the requested quote\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"required\":[\"error\",\"status\"],\"type\":\"object\"}}},\"description\":\"Quote not found\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"required\":[\"error\",\"status\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/quotes/{id}","segments":[{"lit":"quotes"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{},"contract":{"id":"GET /quotes/random","json":"{\"operationId\":\"getRandomQuote\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"author\":\"Steve Jobs\",\"category\":\"motivation\",\"id\":\"12345\",\"text\":\"The only way to do great work is to love what you do.\"},\"schema\":{\"properties\":{\"author\":{\"description\":\"The author of the quote\",\"type\":\"string\"},\"category\":{\"description\":\"Category or theme of the quote\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier of the quote\",\"type\":\"string\"},\"source\":{\"description\":\"Source or origin of the quote\",\"nullable\":true,\"type\":\"string\"},\"text\":{\"description\":\"The text content of the quote\",\"type\":\"string\"}},\"required\":[\"id\",\"text\",\"author\"],\"type\":\"object\"}}},\"description\":\"Successful response with a random quote\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"required\":[\"error\",\"status\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/quotes/random","segments":[{"lit":"quotes"},{"lit":"random"}],"select":{"$action":"random"},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"quote","name__orig":"quote","Name":"Quote","name_":"quote","name-":"quote","NAME":"QUOTE","index$":2}, {"active":true,"entity":"quote","key$":"BasicQuoteFlow","kind":"basic","name":"BasicQuoteFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"quote_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"quote_ref01","srcdatavar":"quote_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-quote_ref01"}}],"index$":1}]}, 'Quote')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let quote_ref01_data = Object.values(setup.data.existing.quote)[0] as any

    // LIST
    const quote_ref01_ent = client.Quote()
    const quote_ref01_match: any = {}

    const quote_ref01_list = (await quote_ref01_ent.list(quote_ref01_match)).map((e: any) => e.data())


    // LOAD
    const quote_ref01_match_dt0: any = {}
    quote_ref01_match_dt0.id = quote_ref01_data.id
    const quote_ref01_data_dt0 = (await quote_ref01_ent.load(quote_ref01_match_dt0)).data()
    assert(quote_ref01_data_dt0.id === quote_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/quote/QuoteTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = DictumSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['quote01','quote02','quote03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DICTUM_TEST_QUOTE_ENTID': idmap,
    'DICTUM_TEST_LIVE': 'FALSE',
    'DICTUM_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DICTUM_TEST_QUOTE_ENTID']

  const live = 'TRUE' === env.DICTUM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DICTUM_TEST_QUOTE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new DictumSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
