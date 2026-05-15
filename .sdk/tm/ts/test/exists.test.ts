
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { DictumSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await DictumSDK.test()
    equal(null !== testsdk, true)
  })

})
