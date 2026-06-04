
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { AiPresentationGeneratorSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('PresentationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AIPRESENTATIONGENERATOR_TEST_LIVE=TRUE.
  afterEach(liveDelay('AIPRESENTATIONGENERATOR_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AiPresentationGeneratorSDK.test()
    const ent = testsdk.Presentation()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AI_PRESENTATION_GENERATOR_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (maybeSkipControl(t, 'entityOp', 'presentation.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set AI_PRESENTATION_GENERATOR_TEST_PRESENTATION_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const presentation_ref01_ent = client.Presentation()
    let presentation_ref01_data = setup.data.new.presentation['presentation_ref01']

    presentation_ref01_data = await presentation_ref01_ent.create(presentation_ref01_data)
    assert(null != presentation_ref01_data.id)


    // LOAD
    const presentation_ref01_match_dt0: any = {}
    presentation_ref01_match_dt0.id = presentation_ref01_data.id
    const presentation_ref01_data_dt0 = await presentation_ref01_ent.load(presentation_ref01_match_dt0)
    assert(presentation_ref01_data_dt0.id === presentation_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/presentation/PresentationTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = AiPresentationGeneratorSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['presentation01','presentation02','presentation03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['AI_PRESENTATION_GENERATOR_TEST_PRESENTATION_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'AI_PRESENTATION_GENERATOR_TEST_PRESENTATION_ENTID': idmap,
    'AI_PRESENTATION_GENERATOR_TEST_LIVE': 'FALSE',
    'AI_PRESENTATION_GENERATOR_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['AI_PRESENTATION_GENERATOR_TEST_PRESENTATION_ENTID']

  const live = 'TRUE' === env.AI_PRESENTATION_GENERATOR_TEST_LIVE

  if (live) {
    client = new AiPresentationGeneratorSDK(merge([
      {
      },
      extra
    ]))
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
