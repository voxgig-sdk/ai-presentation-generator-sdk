
import { Context } from './Context'


class AiPresentationGeneratorError extends Error {

  isAiPresentationGeneratorError = true

  sdk = 'AiPresentationGenerator'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  AiPresentationGeneratorError
}

