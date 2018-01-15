declare var window: any
import * as React from "react"

import { Config } from './definitions/config'
import { View } from './definitions/view'
import { Notifications } from './definitions/notifications'

import log from './components/Log'
import { Embed } from './components/Embed'
import { Toggle } from './components/Toggle'
import { Toasts } from './components/Toasts'

export class Renderer extends React.Component {
  // @ts-ignore custom state handler
  state = this.props.api.state
  // @ts-ignore custom state handler
  classes = this.props.api.state.classes
  
  componentDidMount() {
    window.addEventListener('message', ({data}) => this.listener(data), false)
  }

  render() {
    let { classes } = this.state
    // @ts-ignore custom state handler
    let { api } = this.props

    return (
      classes ? (
        <div className={`crate ${classes.crate}`}>
          <Embed
            view={this.state.view}
            config={this.state.config} />

          <Toggle
            view={this.state.view}
            config={this.state.config}
            toggle={api.toggle.bind(this)}
            notifications={this.state.notifications} />

          {!this.state.view.open && <Toasts
            view={this.state.view}
            config={this.state.config}
            messages={this.state.notifications.messages} />}
        </div>
      ) : (
        <div />
      )
    )
  }

  listener(msg: any) {
    let { ReactGA } = window.globalCrate
    if (typeof msg === 'object' && msg.src === 'WidgetBot' && msg.session === this.state.session) {
      let { event, data } = msg
      let { config } = this.state
      let { toasts, indicator } = this.state.config.notifications
      /**
       * New message
       */
      if (event === 'message:new') {
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
          ReactGA.event({
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
       * Loading complete event
       */
      if (event === 'loading:success') {
        this.setState({
          view: {
            ...this.state.view,
            loading: false
          }
        })
      }
    }
  }

  setState(state) {
    // @ts-ignore custom state handler
    let { api } = this.props
    api.setState(state)
  }
}