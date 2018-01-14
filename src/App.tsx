declare var window: any
const JSON5 = require('json5')
import * as ReactDOM from "react-dom"
import * as React from "react"

import { Renderer } from './Renderer'
import ParseConfig from './components/Config'
import log from './components/Log'
import jss from './jss/App'
import DeepMerge from './components/DeepMerge'

// Crate sandbox
let global = {
  insertionPoint: /* :smirk: */ document.createElement('div'),
  sessions: 0
}
global.insertionPoint.setAttribute('github', 'https://github.com/widgetbot-io/crate')
global.insertionPoint.classList.add('crate')
// Wait for the DOM to load before inserting
document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(global.insertionPoint)
})

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
      
      logo: `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 340 300' fill='%23fff'><path d='m318.43 4.0335h-292.85c-12.191 0-22.074 10.53-22.074 23.519v197.56c0 12.989 9.8834 23.519 22.074 23.519h97.2l32.333 40.956c4.1941 5.3129 10.377 8.3806 16.893 8.3806 6.5163 0 12.699-3.0669 16.893-8.3798l32.333-40.956h97.199c12.192 0 22.074-10.53 22.074-23.519v-197.56c0-12.989-9.8826-23.52-22.074-23.52zm0 221.08h-107.48l-38.949 49.336-38.948-49.336h-107.48v-197.56h292.85v197.56z'/><path d='m66.339 94.554h100.81c6.0954 0 11.037-5.2651 11.037-11.759s-4.9417-11.759-11.037-11.759h-100.81c-6.0954 0-11.037 5.2651-11.037 11.759s4.9417 11.759 11.037 11.759z'/><path d='m55.742 154.92c0 6.4943 4.9417 11.759 11.037 11.759h210.44c6.0954 0 11.037-5.2651 11.037-11.759s-4.9417-11.759-11.037-11.759h-210.44c-6.0954 0-11.037 5.2651-11.037 11.759z'/></svg>`,
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
          maxMessages: 50,
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
    classes: {}
  }
  react: any
  node: any

  constructor(config) {
    ParseConfig(config).then((config) => {
      this.setState({
        classes: jss(config),
        config: DeepMerge(this.state.config, config),
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
    }).catch((error) => {
      if (typeof error === 'string') {
        log('error', error)
      } else {
        log('error', 'Failed to parse configuration!', error)
      }
    })
  }

  // Custom state handler
  setState(newState: any) {
    Object.keys(newState).forEach(state => {
      this.state[state] = newState[state]
    })
    // Force re-render of the renderer
    if (this.react) this.react.forceUpdate()
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
  }

  remove() {
    global.insertionPoint.removeChild(this.node)
  }
}

window.Crate = Crate

// Load crate from inside script tag
let config = document.currentScript && document.currentScript.innerHTML
if (config && config.indexOf('{') >= 0) {
  // Regex to extract config object as string
  if (config.indexOf('new Crate') >= 0) config = config.match(/\{([\s\S]*)+\}/)[0]
  // Parse the config object
  config = JSON5.parse(config)
  // Create a new global crate object
  window.crate = new Crate(config)
}