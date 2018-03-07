declare var window: any
import * as React from "react"
import { View } from '../definitions/view'
import { Notifications } from '../definitions/notifications'
import jss from '../jss/Branding'

interface Props extends View {
  transparent: boolean
}

/**
 * Make an elements styles inline, and with !important
 * @param node The node that shall'nt be fucked with
 */
const GetCSS = (el) => {
  let sheets = document.styleSheets, ret = [];
  el.matches = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector
      || el.msMatchesSelector || el.oMatchesSelector;
  for (let i in sheets) {
      try {
        let rules = sheets[i]['rules'] || sheets[i]['cssRules']
        for (let r in rules) {
            if (el.matches(rules[r].selectorText)) {
                if (typeof rules[r].parentStyleSheet.ownerNode.attributes['data-jss'] === 'undefined') break
                ret.push(rules[r].style.cssText.toString())
            }
        }
      } catch(e) {

      }
  }
  return ret.join('').replace(/\!important/gm, '').replace(/;/gm, ' !important;')
}

const DontFuckWithMe = (node) => {
  if (!node) return
  let identifier = (Math.floor(Math.pow(10, 15) + Math.random() * 9 * Math.pow(10, 15)) + +new Date()).toString()
  if (node.getAttribute('identifier')) {
    clearInterval(window[node.getAttribute('identifier')])
    delete window[node.getAttribute('identifier')]
  }
  let style = `all:unset!important;${GetCSS(node)}`
  node.setAttribute('identifier', identifier)
  node.setAttribute('style', style)
  window[identifier] = setInterval(() => {
    node.setAttribute('style', style)
  }, 1000)
  // } catch(e) {
  //   return
  // }
}

export class Branding extends React.Component<Props, {}> {
  classes: any

  componentWillMount() {
    let { config } = this.props
    this.classes = jss(config)
  }

  componentWillReceiveProps(nextProps: View) {
    // Force JSS re-render
    if (nextProps && JSON.stringify(nextProps.config) !== JSON.stringify(this.props.config)) {
      this.classes = jss(nextProps.config)
      this.forceUpdate()
    }
  }

  open() {
    window.open(`https://widgetbot.io/?ref=crate&referrer=${encodeURIComponent(window.location.origin)}`)
    this.props.event({
      category: 'Branding-click',
      action: window.location.origin
    })
  }

  render() {
    let { view, transparent, config } = this.props
    let { classes } = this

    return (
      <div
        className={`${classes.message} ${view.open ? classes.show : ''} ${view.open && transparent ? classes.transparent : ''}`}
        onClick={this.open.bind(this)}
        ref={config.debug ? () => {} : DontFuckWithMe.bind(this)}>
        <div className={`${classes['powered-by']}`} ref={config.debug ? () => {} : DontFuckWithMe.bind(this)}>
          Discord widgets by
        </div>
        <div className={`${classes['widgetbot']}`} ref={config.debug ? () => {} : DontFuckWithMe.bind(this)}>
          WidgetBot
        </div>
      </div>
    )
  }
}
