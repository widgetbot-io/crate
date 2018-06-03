import { Store } from 'redux'

import { State } from '../types/store'
import { root } from './renderer'
import { API } from './types'

class EmbedAPI {
  // Redux
  store: Store<State>

  // Renderer
  static root = root
  node = root.createInstance()

  // API
  api: API
  on: API['on']
  emit: API['emit']
}

export default EmbedAPI
