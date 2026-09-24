
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { AiPresentationGeneratorSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = AiPresentationGeneratorSDK.test()
    equal(testsdk instanceof AiPresentationGeneratorSDK, true,
      'AiPresentationGeneratorSDK.test() must return a client synchronously')
  })

})
