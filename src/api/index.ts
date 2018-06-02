import { createStore } from 'redux'

import Messages from '../messages'
import store from '../store'
import * as actions from '../store/actions'
import defaultState from '../store/defaultState'
import Options from '../types/options'
import { Message } from '../types/store'
import { is, validate } from '../util/validate'
import EmbedAPI from './embedAPI'
import render from './renderer'
import { enhancer, observeOptions } from './util'

class Crate extends EmbedAPI {
  options = observeOptions(
    {
      server: '299881420891881473',
      channel: null,
      location: ['bottom', 'right'],

      color: '#7388D9',
      glyph: ['', ''],
      css: '',

      notifications: true,
      indicator: true,
      timeout: 10000,

      shard: 'https://widgetbot.io',
      defer: false
    },
    this.setOptions.bind(this)
  )

  /**
   * Instantiate a new Crate instant
   * @param options The options to use
   */
  constructor(userOptions: Options) {
    super()

    const options = this.setOptions(userOptions)

    this.store = createStore(store, defaultState(options.get()), enhancer)
    this.forceUpdate()

    const { api } = this

    if (!api) throw new Error(Messages.EMBED_API_INVOCATION)
    api.on('message', ({ message }) => {
      this.notify({
        id: message.id,
        content: message.content,
        avatar: message.author.avatar
      })
    })

    api.on('messageDelete', ({ id }) => {
      this.store.dispatch(
        actions.deleteMessage({
          id,
          animate: false
        })
      )
    })
  }

  /**
   * Updates the options by merging a new options object
   * @param options The new options object
   */
  @validate
  setOptions(@is.options options: Options) {
    this.options.set({ ...this.options.get(), ...options })

    if (this.store) {
      this.store.dispatch(actions.updateOptions(options))
    }

    return this.options
  }

  /**
   * Force updates the React component
   */
  private forceUpdate() {
    const { node, store } = this
    const onAPI = api => {
      this.api = api
      this.emit = (...args) => api.emit(...args)
      this.on = (...args) => api.on(...args)
    }

    render({ node, store, onAPI })
  }

  /**
   * Toggles the widget open / closed
   */
  toggle(open?: boolean) {
    this.store.dispatch(actions.toggle({ open }))
  }

  /**
   * Notifies a message to the user
   */
  notify(props: Message & { timeout?: string | false; id?: string } | string) {
    const data = {
      timeout: this.options.timeout,
      id: `${Math.random()}${+new Date()}`,
      content: typeof props === 'string' ? props : props.content,
      ...(typeof props !== 'string' && props)
    }

    this.store.dispatch(actions.message(data))

    const hide = props =>
      this.store.dispatch(actions.deleteMessage({ id: data.id, ...props }))

    // Hide the message after timeout
    if (data.timeout) setTimeout(hide, data.timeout)

    return {
      hide
    }
  }
}

export default Crate
