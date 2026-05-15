
import { Context } from './Context'


class DictumError extends Error {

  isDictumError = true

  sdk = 'Dictum'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  DictumError
}

