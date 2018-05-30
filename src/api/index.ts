import { createStore } from 'redux'

import store from '../store'
import Options from '../types/options'
import { check, is, validate } from '../util/validate'
import render, { root } from './renderer'

class Crate {
  static root = root

  options: Options = {
    server: '299881420891881473',
    channel: null,
    shard: 'https://widgetbot.io'
  }

  node = root.createInstance()

  store = createStore(
    store,
    ((window as any).__REDUX_DEVTOOLS_EXTENSION__ || Function)()
  )

  /**
   * Instantiate a new Crate instant
   * @param options The options to use
   */
  constructor(options: Options) {
    this.setOptions(check.options(options))
  }

  /**
   * Updates the options by merging a new options object
   * @param options The new options object
   */
  @validate
  setOptions(@is.options options: Options) {
    this.options = Object.freeze({ ...this.options, ...options })
    this.forceUpdate()

    return this.options
  }

  /**
   * Force updates the component
   */
  forceUpdate() {
    render({
      node: this.node,
      options: this.options,
      store: this.store
    })
  }
}

export default Crate
