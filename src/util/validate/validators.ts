import { expectValue } from '.'
import Options from '../../types/options'

export const options = (options: Options) => {
  const expect = expectValue(options)

  expect('', 'object', value => value instanceof Object, false)
  expect('.server', 'string', value => typeof value === 'string')
  expect('.channel', 'string', value => typeof value === 'string')

  return options
}
