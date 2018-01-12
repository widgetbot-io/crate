declare var window: any

import * as React from "react"
import * as ReactDOM from "react-dom"
import { View } from './definitions/view'
import { Config } from './definitions/config'
import classes from './jss/App'
import log from './components/Log'
import { Embed } from './components/Embed'
import { Toggle } from './components/Toggle'
import { Toasts } from './components/Toasts'
const JSON5 = require('json5')

class Crate extends React.Component {
  state = {
    view: 'hidden',
    config: {}
  }

  constructor(config: Config) {
    super(config)
    if (typeof config === 'object' && config.server) {
      /**
       * Called by an external script
       */
      let insertionPoint /* :smirk: */ = document.createElement('div')
      document.body.appendChild(insertionPoint)
      ReactDOM.render(
        // @ts-ignore custom props handler
        <Crate config={config} />,
        insertionPoint
      )
    }
  }

  componentDidMount() {
    this.parse.then((config) => {
      console.log(config)
    }).catch((error) => {
      if (typeof error === 'string') {
        log('error', error)
      } else {
        log('error', 'Failed to parse configuration!', error)
      }
    })
  }

  render() {
    return (
      <div className={`crate ${classes.crate}`}>
      {JSON.stringify(this.state)}
        <Embed view={this.state.view} />
        <Toggle view={this.state.view} />
        <Toasts view={this.state.view} />
      </div>
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
          config = `{${config.substring(config.lastIndexOf('{')+1,config.lastIndexOf('}'))}}`
        }
        config = JSON5.parse(config)
      } else {
        // @ts-ignore custom props handler
        config = this.props.config
      }

      if (typeof config === 'object') {
        if (config.server && config.channel) {
          resolve(config)
        } else {
          reject(`Invalid configuration (missing the server or channel properties)! refer to https://github.com/widgetbot-io/crate`)
        }
      } else {
        reject('Invalid configuration (not an object)! refer to https://github.com/widgetbot-io/crate')
      }
    })
  }
}

window.Crate = Crate

if (document.currentScript && document.currentScript.innerHTML && document.currentScript.innerHTML.indexOf('{') >= 0) {
  let insertionPoint /* :smirk: */ = document.createElement('div')
  let id = (+new Date()).toString()
  document.body.appendChild(insertionPoint)
  ReactDOM.render(
    <Crate />,
    insertionPoint
  )
}