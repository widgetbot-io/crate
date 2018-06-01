import { createStore } from 'redux'

import Messages from '../messages'
import store from '../store'
import * as actions from '../store/actions'
import defaultState from '../store/defaultState'
import Options from '../types/options'
import { is, validate } from '../util/validate'
import EmbedAPI from './embedAPI'
import render from './renderer'
import { enhancer, log } from './util'

class Crate extends EmbedAPI {
  options: Options = {
    server: '299881420891881473',
    channel: null,
    location: ['bottom', 'right'],

    color: '#7388D9',
    glyph: ['', ''],
    css: '',

    notifications: true,
    indicator: true,

    shard: 'https://widgetbot.io',
    defer: false
  }

  /**
   * Instantiate a new Crate instant
   * @param options The options to use
   */
  constructor(userOptions: Options) {
    super()
    const options = this.setOptions(userOptions)
    this.store = createStore(store, defaultState(options), enhancer)

    this.forceUpdate()

    if (!this.api) log('warn', Messages.EMBED_API_INVOCATION)
    console.log('constructor complete')
  }

  /**
   * Updates the options by merging a new options object
   * @param options The new options object
   */
  @validate
  setOptions(@is.options options: Options) {
    this.options = Object.freeze({ ...this.options, ...options })

    if (this.store) {
      this.store.dispatch(actions.updateOptions(options))
    }

    return this.options
  }

  /**
   * Force updates the component
   */
  forceUpdate() {
    const { node, store } = this
    const onAPI = api => {
      this.api = api
      this.emit = api.emit
      this.on = api.on
    }

    render({ node, store, onAPI })
  }

  toggle(open: boolean) {
    this.store.dispatch(actions.toggle({ open }))
  }
}

export default Crate
