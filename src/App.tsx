declare var window: any

import * as React from "react"
import * as ReactDOM from "react-dom"
import { View } from './definitions/view'
import { Config } from './definitions/config'
import { Notifications } from './definitions/notifications'
import jss from './jss/App'
import log from './components/Log'
import { Embed } from './components/Embed'
import { Toggle } from './components/Toggle'
import { Toasts } from './components/Toasts'
const JSON5 = require('json5')
/**
 * Container for all crate instances
 */
let global = {
  insertionPoint: /* :smirk: */ document.createElement('div'),
  sessions: 0
}
global.insertionPoint.setAttribute('github', 'https://github.com/widgetbot-io/crate')
global.insertionPoint.classList.add('☄️crate')
document.body.appendChild(global.insertionPoint)

class Crate extends React.Component {
  state = {
    view: {
      opened: false,
      open: false,
      loading: true
    },
    config: {},
    notifications: {
      unread: 0,
      pinged: false,
      messages: []
    }
  }
  classes: any

  constructor(config: Config) {
    super(config)
    if (typeof config === 'object' && config.server) {
      /**
       * Called by an external script
       */
      let inserter = document.createElement('div')
      inserter.classList.add(`crate-${global.sessions}`)
      global.insertionPoint.appendChild(inserter)
      global.sessions ++
      ReactDOM.render(
        // @ts-ignore custom props handler
        <Crate config={config} />,
        inserter
      )
    }
  }

  componentWillMount() {
    this.parse.then((config) => {
      this.classes = jss(config)
      this.setState({
        config: config
      })
      window.addEventListener('message', ({data}) => this.listener(data), false)
    }).catch((error) => {
      if (typeof error === 'string') {
        log('error', error)
      } else {
        log('error', 'Failed to parse configuration!', error)
      }
    })
  }

  toggle() {
    this.setState({
      view: {
        ...this.state.view,
        open: !this.state.view.open,
        opened: true
      },
      notifications: {
        unread: 0,
        pinged: false,
        messages: []
      }
    })
  }

  render() {
    let { classes } = this
    return (
      this.classes ? (
        <div className={`crate ${classes.crate}`}>
          {JSON.stringify(this.state)}
          <Embed
            view={this.state.view}
            config={this.state.config} />

          <Toggle
            view={this.state.view}
            config={this.state.config}
            toggle={this.toggle.bind(this)}
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

  get parse() {
    /**
     * Parses the text inside the script tag
     * and resolves it as an object
     */
    return new Promise<Config>((resolve: Function, reject: Function) => {
      let script = document.currentScript
      let config

      if (script && script.innerHTML) {
        config = script.innerHTML
        if (config.indexOf('new Crate') >= 0) {
          config = config.match(/\{([\s\S]*)+\}/)[0]
        }
        config = JSON5.parse(config)
      } else {
        // @ts-ignore custom props handler
        config = this.props.config
      }
      /**
       * Parse the configuration
       */
      if (typeof config === 'object') {
        if (config.server && config.channel) {
          if (!config.domain) config.domain = config.beta ? 'https://beta.widgetbot.io' : 'https://widgetbot.io'
          if (!config.options) config.options = '0002'
          if (!config.url) config.url = `${config.domain}/embed/${encodeURIComponent(config.server)}/${encodeURIComponent(config.channel)}/${config.options}`
          if (!config.colors) config.colors = {}
          if (!config.colors.toggle) config.colors.toggle = '#7289DA'
          resolve(config)
        } else {
          reject(`Invalid configuration (missing the server or channel properties)! refer to https://github.com/widgetbot-io/crate`)
        }
      } else {
        reject('Invalid configuration (not an object)! refer to https://github.com/widgetbot-io/crate')
      }
    })
  }

  listener(message: Notifications.message) {
    if (typeof message === 'object') {
      if (message.timestamp) {
        let { unread, pinged, messages } = this.state.notifications

        if (!this.state.view.open && unread < 99) unread++
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
}

window.Crate = Crate

if (document.currentScript && document.currentScript.innerHTML && document.currentScript.innerHTML.indexOf('{') >= 0) {
  let inserter = document.createElement('div')
  inserter.classList.add(`crate-${global.sessions}`)
  global.insertionPoint.appendChild(inserter)
  global.sessions ++
  ReactDOM.render(
    <Crate />,
    inserter
  )
}