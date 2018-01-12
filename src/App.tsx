declare var window: any
const JSON5 = require('json5')
import * as ReactDOM from "react-dom"

import { Renderer } from './Renderer'
import ParseConfig from './components/Config'
import log from './components/Log'
import jss from './jss/App'

// Crate sandbox
let global = {
  insertionPoint: /* :smirk: */ document.createElement('div'),
  sessions: 0
}
global.insertionPoint.setAttribute('github', 'https://github.com/widgetbot-io/crate')
global.insertionPoint.classList.add('☄️crate')
document.body.appendChild(global.insertionPoint)

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
    config: {},
    notifications: {
      unread: 0,
      pinged: false,
      messages: []
    },
    classes: {}
  }
  renderer: any

  constructor(config) {
    ParseConfig(config).then((config) => {
      this.setState({
        classes: jss(config),
        config: config
      })

      // Mount DOM node
      let inserter = document.createElement('div')
      inserter.classList.add(`crate-${global.sessions}`)
      global.insertionPoint.appendChild(inserter)
      global.sessions ++
      ReactDOM.render(
        // @ts-ignore custom state handler
        <Renderer api={this} ref={renderer => { this.renderer = renderer }} />, inserter
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
    if (this.renderer) this.renderer.forceUpdate()
  }
}

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