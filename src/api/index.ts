import { API } from '@widgetbot/react-embed'
import { createStore } from 'redux'

import store from '../store'
import Options from '../types/options'
import { check, is, validate } from '../util/validate'
import render, { root } from './renderer'

class Crate {
  static root = root
  node = root.createInstance()

  /**
   * The options to use for Crate. To update them, call setOptions
   */
  options: Options = {
    server: '299881420891881473',
    channel: null,
    shard: 'https://widgetbot.io'
  }

  api: API
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
    console.log('constructor complete')
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
    const { node, options, store } = this
    const onAPI = api => (this.api = api)

    render({ node, options, store, onAPI })
  }
}

export default Crate
