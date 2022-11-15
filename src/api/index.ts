import '../util/compatibility'

import { createStore } from 'redux'

import store from '../store'
import * as actions from '../store/actions'
import defaultState from '../store/defaultState'
import Options from '../types/options'
import { Message } from '../types/store'
import { is, validate } from '../util/validate'
import EmbedAPI from './embedAPI'
import Messages from './messages'
import render from './renderer'
import { enhancer, observeOptions } from './util'

class Crate extends EmbedAPI {
  options = observeOptions(
    {
      server: '299881420891881473',
      channel: null,
      location: ['bottom', 'right'],

      color: '#5865f2',
      glyph: ['', ''],
      css: '',

      notifications: true,
      dmNotifications: true,
      indicator: true,
      timeout: 10000,

      shard: 'https://e.widgetbot.io',
      defer: false
    },
    this.setOptions.bind(this)
  )

  /**
   * Instantiate a new Crate instant
   * @param userOptions The options to use
   */
  constructor(userOptions: Options) {
    super()
    const options = this.setOptions(userOptions)
    this.store = createStore(store, defaultState(options.get()), enhancer)

    this.forceUpdate()
    this.addEventListeners()

    // Add default window.crate reference
    if (window && !(window as any).crate) {
      ;(window as any).crate = this
    }
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
   * Adds the event listeners for the embed-api transport
   */
  private addEventListeners() {
    this.forceUpdate()
    const { api } = this
    if (!api) throw new Error(Messages.EMBED_API_INVOCATION)

    let guestID: string;

    const navigate = (channelId: string) => {

    }

    api.on('signIn', user => {
      guestID = 'id' in user ? user.id : user._id
    })

    api.on('message', ({ channel, message }) => {
      if (!this.options.notifications || !message.content || message.author.id === guestID) return

      this.notify({
        id: message.id,
        content: `${message.author.name}${channel.id !== this.options.channel ? ` in #${channel.name}` : ''}: ${message.content}`,
        avatar: message.author.avatarUrl,
        onClick: () => this.navigate(message.channelId)
      })
    })

    api.on('messageDelete', ({ id }) => {
      this.store.dispatch(actions.deleteMessage({ id, decrement: true }))
    })

    api.on('directMessage', ({ message }) => {
      if (!this.options.dmNotifications || !message.content || message.author.id === guestID) return;

      this.notify({
        id: message.id,
        content: `${message.author.name}: ${message.content}`,
        avatar: message.author.avatarUrl,
        onClick: () => this.navigate((<any>message).channelId)
      })
    })
  }

  /*********   Public Methods   *********/

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
   * Toggles the widget open / closed
   */
  toggle(open?: boolean) {
    this.store.dispatch(actions.toggle(open))
  }

  /**
   * Notifies a message to the user
   */
  notify(
    content: string | Message & { timeout?: string | false; id?: string, onClick?: () => void }
  ) {
    const props = typeof content === 'string' ? { content } : content

    const data = {
      timeout: this.options.timeout,
      id: `${Math.random()}${+new Date()}`,
      content: props.content,
      ...props
    }

    this.store.dispatch(actions.message(data))

    const hide = () =>
      this.store.dispatch(actions.deleteMessage({ id: data.id }))

    // Hide the message after timeout
    if (data.timeout) setTimeout(hide, Number(data.timeout))

    return { hide }
  }

  navigate(channelId: string) {
    this.store.dispatch(actions.toggle(true));

    this.emit('navigate', {
      guild: this.options.server,
      channel: channelId,
    });
  }

  /**
   * Un-hides the crate button
   */
  show() {
    this.store.dispatch(actions.toggleVisibility(true))
  }

  /**
   * Hides the crate button
   */
  hide() {
    this.store.dispatch(actions.toggleVisibility(false))
  }
}

export default Crate
