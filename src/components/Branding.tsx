declare var window: any
import * as React from "react"
import { View } from '../definitions/view'
import { Notifications } from '../definitions/notifications'
import jss from '../jss/Branding'

/**
 * Make an elements styles inline, and with !important
 * @param node The node that shall'nt be fucked with
 */
const DontFuckWithMe = (node) => {
  if (!node) return
  let css = node.ownerDocument.styleSheets
  let styles = [].concat(...[...css].map(s => [...s.cssRules||[]]))
  .filter(r => node.matches(r.selectorText))
  let style = ''
  for (let i = 0; i < styles.length; i++) {
    style += styles[i].style.cssText
  }
  style = style.replace(/\!important/gm, '').replace(/;/gm, ' !important;')
  node.setAttribute('style', style)
}

export class Branding extends React.Component<View, {}> {
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
    let { ReactGA } = window.globalCrate
    window.open(`https://widgetbot.io/?ref=crate&referrer=${encodeURIComponent(window.location.origin)}`)
    ReactGA.event({
      category: 'Branding-click',
      action: window.location.origin
    })
  }

  render() {
    let { view, config } = this.props
    let { classes } = this
    const YouHaveToPay = `
      display: ${(window.innerWidth <= config.mobile.maxWidth || window.innerHeight <= config.mobile.maxHeight) ? 'none' : 'flex'} !important;
      opacity: 1 !important;
      visibility: visible !important;
    `
    return (
      <div
        className={`${classes.message} ${view.open ? classes.show : ''}`}
        onClick={this.open.bind(this)}
        ref={DontFuckWithMe.bind(this)}>
        <div className={`${classes['powered-by']}`} ref={DontFuckWithMe.bind(this)}>
          Discord widgets by
        </div>
        <div className={`${classes['widgetbot']}`} ref={DontFuckWithMe.bind(this)}>
          WidgetBot
        </div>
      </div>
    )
  }
}