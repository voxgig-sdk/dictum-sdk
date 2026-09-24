
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { DictumSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = DictumSDK.test()
    equal(testsdk instanceof DictumSDK, true,
      'DictumSDK.test() must return a client synchronously')
  })

})
