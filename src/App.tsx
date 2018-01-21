declare var window: any
const JSON5 = require('json5')
import * as ReactDOM from "react-dom"
import * as React from "react"

import { Renderer } from './Renderer'
import DeepMerge from './components/DeepMerge'
import ParseConfig from './components/Config'
import log from './components/Log'
import { Icons } from './components/Icons'
import jss from './jss/App'


// Crate sandbox
let global = window.globalCrate = {
  insertionPoint: /* :smirk: */ document.createElement('div'),
  sessions: 0,
  ReactGA: require('react-ga')
}
global.insertionPoint.setAttribute('github', 'https://github.com/widgetbot-io/crate')
global.insertionPoint.classList.add('crate')
// Wait for the DOM to load before inserting
if (document.body) {
  document.body.appendChild(global.insertionPoint)
} else {
  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(global.insertionPoint)
  })
}

/**
 * Due to React trying enforcing a "strict" state handler,
 * all states for Crate are manually handled in a class that
 * doesn't extend React.Component; This results in a speed
 * increase and the ability to recreate the live-state
 * to scripts outside the React Renderer class.
 */
class StateHandler {
  state = {
    view: {
      opened: false,
      open: false,
      loading: true
    },
    /**
     * Default configuration
     */
    config: {
      server: '299881420891881473',
      channel: '355719584830980096',
      options: '0002',
      beta: false,
      debug: false,

      logo: Icons(),
      theme: 'default',
      colors: {
        toggle: '#7289DA'
      },

      notifications: {
        indicator: {
          enable: true
        },
        toasts: {
          enable: true,
          visibilityTime: 10,
          maxMessages: 5,
          maxHeight: 'calc(70% - 100px)'
        }
      },

      position: {
        x: 'right',
        y: 'bottom'
      },

      delay: false
    },
    notifications: {
      unread: 0,
      pinged: false,
      messages: []
    },
    classes: {},
    session: (Math.floor(Math.pow(10, 15) + Math.random() * 9 * Math.pow(10, 15)) + +new Date()).toString()
  }
  react: any
  node: any

  constructor(config) {
    ParseConfig(this.state, config).then((config) => {
      this.setState({
        classes: jss(config),
        config: config,
        view: {
          ...this.state.view,
          opened: config.delay ? false : true
        }
      })

      // Mount DOM node
      this.node = document.createElement('div')
      this.node.classList.add(`crate-${global.sessions}`)
      global.insertionPoint.appendChild(this.node)
      global.sessions ++
      ReactDOM.render(
        // @ts-ignore custom state handler
        <Renderer api={this} ref={renderer => { this.react = renderer }} />, this.node
      )

      // Analytics
      let { ReactGA } = global
      ReactGA.initialize('UA-107130316-3', { debug: config.debug })
      ReactGA.pageview(window.location.origin)
      ReactGA.set({
        server: config.server,
        channel: config.channel
      })
    }).catch((error) => {
      log('error', `Invalid configuration!\n${error}\n\nrefer to https://github.com/widgetbot-io/crate`)
    })
  }

  // Custom state handler
  setState(nextState: any) {
    Object.keys(nextState).forEach(state => {
      // Force JSS re-render
      if (nextState && nextState.config && JSON.stringify(nextState.config) !== JSON.stringify(this.state.config)) {
        this.config(nextState.config)
      }
      this.state[state] = nextState[state]
    })
    // Force re-render of the renderer
    if (this.react) this.react.forceUpdate()
  }

  // Deep merges the new config with the current config
  config(config: any) {
    ParseConfig(this.state, config).then((config) => {
      this.setState({
        classes: jss(config),
        config: config,
        view: {
          ...this.state.view,
          opened: config.delay ? false : true
        }
      })
    }).catch((error) => {
      log('error', `Invalid configuration!\n${error}\n\nrefer to https://github.com/widgetbot-io/crate`)
    })
  }
}

/**
 * Group APIs under this class
 */
class Crate extends StateHandler {
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
    let { ReactGA } = global
    ReactGA.event({
      category: 'Toggle',
      action: this.state.view.open ? 'Open' : 'Close'
    })
  }

  show() {
    if (!global.insertionPoint.contains(this.node))
      global.insertionPoint.appendChild(this.node)
  }

  hide() {
    if (global.insertionPoint.contains(this.node))
      global.insertionPoint.removeChild(this.node)
  }

  remove() {
    ReactDOM.unmountComponentAtNode(this.node)
    global.insertionPoint.removeChild(this.node)
  }
}

window.Crate = Crate;

// Load crate from inside script tag
(() => {
  let config = document.currentScript && document.currentScript.innerHTML
  if (config && config.indexOf('{') >= 0) {
    // Regex to extract config object as string
    if (config.indexOf('new Crate') >= 0) config = config.match(/\{([\s\S]*)+\}/)[0]
    try {
      // Parse the config object
      config = JSON5.parse(config)
    } catch(error) {
      return log('error', 'Failed to parse configuration!', error)
    }
    // Create a new global crate object
    window.crate = new Crate(config)
  }
})()