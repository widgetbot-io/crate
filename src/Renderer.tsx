declare var window: any
import * as React from "react"

import { Config } from './definitions/config'
import { View } from './definitions/view'
import { Notifications } from './definitions/notifications'

import log from './components/Log'
import { Embed } from './components/Embed'
import { Modal } from './components/Modal'
import { Toggle } from './components/Toggle'
import { Toasts } from './components/Toasts'
import { Branding } from './components/Branding'

export class Renderer extends React.Component<{api: any}> {
  state = this.props.api.state
  classes = this.props.api.state.classes
  postMessage = this.props.api.postMessage
  transition = this.props.api.transition

  componentDidMount() {
    window.addEventListener('message', ({ data }) => this.listener(data), false)
  }

  render() {
    let { classes } = this.state
    let config: Config = this.state.config
    let { api } = this.props

    return (
      classes ? (
        <div className={`crate ${classes.crate}`}>
          <Embed
            view={this.state.view}
            event={api.event.bind(this)}
            config={this.state.config}
            setIframe={(iframe) => this.state.iframe = iframe} />

          <Toggle
            view={this.state.view}
            event={api.event.bind(this)}
            config={this.state.config}
            toggle={api.toggle.bind(this)}
            notifications={this.state.notifications} />

          {config.notifications.toasts.enable && !this.state.view.open && <Toasts
            view={this.state.view}
            event={api.event.bind(this)}
            config={this.state.config}
            openUser={api.user.bind(this)}
            messages={this.state.notifications.messages} />}

          <Modal
            view={this.state.view}
            event={api.event.bind(this)}
            modal={this.state.modal}
            config={this.state.config}
            toggle={api.modal.bind(this)} />

          {this.state.l !== null && this.state.l !== 2 && <Branding
            view={this.state.view}
            event={api.event.bind(this)}
            transparent={this.state.l === 1}
            config={this.state.config} />}
        </div>
      ) : (
          <div />
        )
    )
  }

  listener(msg: any) {
    let { api } = this.props
    let { track } = window.globalCrate

    if (typeof msg === 'object' && msg.src === 'WidgetBot' && msg.session === this.state.session) {
      let { event, type, data } = msg
      let { config } = this.state
      let { toasts, indicator } = this.state.config.notifications
      /**
       * New message
       */
      if (event === 'message:new' && !this.state.view.open) {
        let message: Notifications.message = data
        let { unread, pinged, messages } = this.state.notifications

        if (indicator.enable) {
          if (!this.state.view.open) unread++
          if (message.mentions.everyone || message.pinged) pinged = true
        }

        if (toasts.enable) {
          // Push to start of array
          messages.unshift({
            expiration: toasts.visibilityTime ? +new Date() + (1000 * toasts.visibilityTime) : false,
            message: message
          })
          messages = messages.slice(0, this.state.config.notifications.toasts.maxMessages)
          api.event({
            category: 'Toast',
            action: 'Show'
          })
        }

        this.setState({
          notifications: {
            pinged: pinged,
            unread: unread,
            messages: messages
          }
        })
      }
      /**
       * Modal event
       */
      if (event === 'modal') {
        this.setState({
          view: {
            ...this.state.view,
            modalOpen: true
          },
          modal: {
            type: type,
            data: data
          }
        })
        if (type === 'user') {
          api.event({
            category: 'User popup',
            action: 'Open',
          })
        }
        if (type === 'image') {
          api.event({
            category: 'Image',
            action: 'Open',
            content: {
              name: 'modal-image',
              path: data
            }
          })
        }
      }
      /**
       * Loading complete event
       */
      if (event === 'loading:success') {
        this.setState({
          view: {
            ...this.state.view,
            loading: false
          },
          // Patreon level
          l: data[2]
        })

        // Analytics
        let patreon = (() => {switch (this.state.l) {
          case 2: {
            return 'Ultimate'
          }
          case 1: {
            return 'Supporter'
          }
          case 0: {
            return 'Free'
          }
          case null: {
            return 'Not set'
          }
        }})()

        track({
          _id: this.state.session,
          action_name: 'Widget loaded',
          cvar: JSON.stringify({
            '1': ['Patreon level', patreon]
          })
        })
      }
    }
  }

  setState(state) {
    // @ts-ignore custom state handler
    let { api } = this.props
    api.setState(state)
  }

  event = this.props.api.event.bind(this)
}
