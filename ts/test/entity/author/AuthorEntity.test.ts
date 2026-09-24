

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"bio":{"a":true,"h":"Bio","n":"bio","r":false,"sh":"Brief biography of the author","t":"`$STRING`","key$":"bio","index$":0},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"Name of the author","t":"`$STRING`","key$":"name","index$":1},"quoteCount":{"a":true,"h":"Quote Count","n":"quoteCount","r":true,"sh":"Number of quotes by this author in the collection","t":"`$INTEGER`","key$":"quoteCount","index$":2}},"name":"author","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /authors","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":50,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/authors","q":{"exist":["limit","page"]},"r":{},"s":[{"lit":"authors"}],"t":{"req":"`reqdata`","res":"`body.authors`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"author","name__orig":"author","Name":"Author","name_":"author","name-":"author","NAME":"AUTHOR","index$":0}, {"active":true,"entity":"author","key$":"BasicAuthorFlow","kind":"basic","name":"BasicAuthorFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"author_ref01"}}],"index$":0}]}, 'Author', {"GET /authors":{"protocol":"http","operationId":"getAuthors","responses":{"200":{"description":"Successful response with a list of authors","content":{"application/json":{"schema":{"type":"object","properties":{"authors":{"items":{"properties":{"bio":{"description":"Brief biography of the author","nullable":true,"type":"string","key$":"bio"},"name":{"description":"Name of the author","type":"string","key$":"name"},"quoteCount":{"description":"Number of quotes by this author in the collection","type":"integer","key$":"quoteCount"}},"required":["name","quoteCount"],"type":"object","x-ref":"#/components/schemas/Author","index$":0},"key$":"authors","type":"array"},"total":{"description":"Total number of authors available","key$":"total","type":"integer"},"page":{"description":"Current page number","key$":"page","type":"integer"},"limit":{"description":"Number of authors per page","key$":"limit","type":"integer"}}}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"message":{"type":"string","description":"Detailed error description"},"status":{"type":"integer","description":"HTTP status code"}},"required":["error","status"],"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"limit","in":"query","description":"Number of authors to return","required":false,"schema":{"type":"integer","default":50,"minimum":1,"maximum":100},"index$":0},{"name":"page","in":"query","description":"Page number for pagination","required":false,"schema":{"type":"integer","default":1,"minimum":1},"index$":1}],"securitySource":"unspecified"}})
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
  
