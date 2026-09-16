

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


describe('AuthorEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DICTUM_TEST_LIVE=TRUE.
  afterEach(liveDelay('DICTUM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DictumSDK.test()
    const ent = testsdk.Author()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DICTUM_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'author.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"bio","req":false,"short":"Brief biography of the author","type":"`$STRING`","index$":0},{"active":true,"name":"name","req":true,"short":"Name of the author","type":"`$STRING`","index$":1},{"active":true,"name":"quoteCount","req":true,"short":"Number of quotes by this author in the collection","type":"`$INTEGER`","index$":2}],"name":"author","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":50,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":1,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /authors","json":"{\"operationId\":\"getAuthors\",\"parameters\":[{\"description\":\"Number of authors to return\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":50,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Page number for pagination\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"authors\":{\"items\":{\"properties\":{\"bio\":{\"description\":\"Brief biography of the author\",\"nullable\":true,\"type\":\"string\"},\"name\":{\"description\":\"Name of the author\",\"type\":\"string\"},\"quoteCount\":{\"description\":\"Number of quotes by this author in the collection\",\"type\":\"integer\"}},\"required\":[\"name\",\"quoteCount\"],\"type\":\"object\"},\"type\":\"array\"},\"limit\":{\"description\":\"Number of authors per page\",\"type\":\"integer\"},\"page\":{\"description\":\"Current page number\",\"type\":\"integer\"},\"total\":{\"description\":\"Total number of authors available\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response with a list of authors\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"required\":[\"error\",\"status\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/authors","segments":[{"lit":"authors"}],"select":{"exist":["limit","page"]},"transform":{"req":"`reqdata`","res":"`body.authors`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"author","name__orig":"author","Name":"Author","name_":"author","name-":"author","NAME":"AUTHOR","index$":0}, {"active":true,"entity":"author","key$":"BasicAuthorFlow","kind":"basic","name":"BasicAuthorFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"author_ref01"}}],"index$":0}]}, 'Author')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let author_ref01_data = Object.values(setup.data.existing.author)[0] as any

    // LIST
    const author_ref01_ent = client.Author()
    const author_ref01_match: any = {}

    const author_ref01_list = (await author_ref01_ent.list(author_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/author/AuthorTestData.json')

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
    ['author01','author02','author03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DICTUM_TEST_AUTHOR_ENTID': idmap,
    'DICTUM_TEST_LIVE': 'FALSE',
    'DICTUM_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DICTUM_TEST_AUTHOR_ENTID']

  const live = 'TRUE' === env.DICTUM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DICTUM_TEST_AUTHOR_ENTID']
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
  
