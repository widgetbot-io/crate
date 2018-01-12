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
  
  componentWillReceiveProps() {
    console.log('props')
  }
  render() {
    let { classes } = this.state
    // @ts-ignore custom state handler
    let { api } = this.props

    return (
      classes ? (
        <div className={`crate ${classes.crate}`}>
          {JSON.stringify(this.state)}
          <Embed
            view={this.state.view}
            config={this.state.config} />

          <Toggle
            view={this.state.view}
            config={this.state.config}
            toggle={api.toggle.bind(this)}
            notifications={this.state.notifications} />

          <Toasts
            view={this.state.view}
            config={this.state.config}
            messages={this.state.notifications.messages} />
        </div>
      ) : (
        <div />
      )
    )
  }

  listener(message: Notifications.message) {
    if (typeof message === 'object') {
      if (message.timestamp) {
        let { unread, pinged, messages } = this.state.notifications

        if (!this.state.view.open) unread++
        if (message.mentions.everyone) pinged = true
        
        this.setState({
          notifications: {
            pinged: pinged,
            unread: unread,
            messages: messages
          }
        })
      } else if (typeof message.loading === 'boolean') {
        this.setState({
          view: {
            ...this.state.view,
            loading: message.loading
          }
        })
      }
    }
  }

  setState(state) {
    // @ts-ignore custom state handler
    let { api } = this.props
    api.setState(state)
    this.forceUpdate()
  }
}