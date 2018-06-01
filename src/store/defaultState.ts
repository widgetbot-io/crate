import Options from '../types/options'
import { State } from '../types/store'

const defaultState = (options: Options): State => ({
  open: true,
  options
})

export default defaultState
