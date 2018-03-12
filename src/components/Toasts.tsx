declare var window: any
import * as React from 'react'
import { Config } from '../definitions/config'
import { View } from '../definitions/view'
import { Notifications } from '../definitions/notifications'
import jss from '../jss/Toasts'
const { toHTML: parse } = require('discord-markdown')

interface Props extends View {
  messages: any
  openUser: any
  expand: any
  crateEvent: Function
}

export class Toasts extends React.Component<Props, {}> {
  classes: any

  componentWillMount() {
    let { config } = this.props
    this.classes = jss(config)
  }

  componentWillReceiveProps(nextProps: Props) {
    // Force JSS re-render
    if (
      nextProps &&
      JSON.stringify(nextProps.config) !== JSON.stringify(this.props.config)
    ) {
      this.classes = jss(nextProps.config)
      this.forceUpdate()
    }
  }

  render() {
    let {
      messages,
      openUser,
      expand,
      crateEvent
    }: {
      messages: { expiration: number; message: Notifications.message }[]
      openUser: Function
      expand: Function
      crateEvent: Function
    } = this.props
    let { classes } = this
    return (
      <div className={`crate-toast-box ${classes['toast-box']}`}>
        {/* Reversing the message array and use column-reverse to prevent the need for scrolling */}
        {messages.map(({ expiration, message }, i: number) => {
          return (
            <Toast
              message={message}
              expiration={expiration}
              key={message.id}
              classes={classes}
              last={i === 0}
              expand={expand.bind(this)}
              openUser={openUser.bind(this)}
              config={this.props.config}
              crateEvent={crateEvent.bind(this)}
              event={this.props.event.bind(this)}
            />
          )
        })}
      </div>
    )
  }
}

interface ToastProps {
  message: Notifications.message
  expiration: number
  classes: any
  last: boolean
  config: Config
  openUser: Function
  expand: Function
  event: Function
  crateEvent: Function
}

class Toast extends React.Component<ToastProps, {}> {
  state = {
    render: true
  }
  toast: HTMLElement
  mounted = true

  componentWillMount() {
    let { expiration } = this.props
    /**
     * Prevent rendering of already expired messages
     */
    if (expiration && +new Date() > expiration) {
      this.setState({
        render: false
      })
    }
  }

  componentDidMount() {
    let { last, classes, expiration } = this.props

    if (last) {
      setTimeout(() => {
        this.show()
      }, 10)
      if (expiration) this.expirationChecker()
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  handleexpand = (event, message: Notifications.message) => {
    let { expand } = this.props
    if (event.target === event.currentTarget) {
      expand(message)
    }
  }

  show() {
    if (this.mounted && this.toast) {
      let { classes } = this.props
      this.toast.classList.add(classes['toast-visible'])
    }
  }

  hide() {
    if (this.mounted && this.toast) {
      let { classes } = this.props
      this.toast.classList.remove(classes['toast-visible'])
      this.toast.classList.add(classes['toast-hidden'])
      this.props.event({
        category: 'Toast',
        action: 'Hide'
      })
    }
  }

  expirationChecker() {
    if (this.mounted && this.toast) {
      let { expiration } = this.props
      if (+new Date() > expiration) {
        this.hide()
        setTimeout(() => {
          this.setState({
            render: false
          })
        }, 400)
      } else {
        setTimeout(() => this.expirationChecker(), 500)
      }
    }
  }

  render() {
    let { message, classes, config, crateEvent, last, expiration, openUser } = this.props
    return this.state.render ? (
      <div
        className={`crate-toast ${classes.toast} ${
          last ? classes['toast-hidden'] : ''
        }`}
        ref={(toast) => (this.toast = toast)}>
        <img
          src={
            message.author.avatar ||
            'https://beta.widgetbot.io/embed/335391242248519680/335391242248519680/0002/default.webp'
          }
          className={`crate-toast-avatar ${classes['toast-avatar']}`}
          onClick={() => {
            if (!message.fake) openUser(message.author)
          }}
        />
        <div className={`crate-toast-message ${classes['toast-message']}`}>
          <div className={`crate-toast-actions ${classes['toast-actions']}`}>
            <svg
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              onClick={e => this.handleexpand(e, message)}
            >
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </div>
          <div
            className={`crate-toast-content ${classes['toast-content']}`}
            dangerouslySetInnerHTML={{ __html: message.content ? parse(message.content) : '' }}
            onClick={() => crateEvent('message-click', message)}
          />
        </div>
      </div>
    ) : (
      <div />
    )
  }
}
