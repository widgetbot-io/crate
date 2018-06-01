import Options from '../types/options'
import { State } from '../types/store'

const defaultState = (options: Options): State => ({
  open: false,
  options
})

export default defaultState
