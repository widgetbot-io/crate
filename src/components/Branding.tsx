declare var window: any
import * as React from "react"
import { View } from '../definitions/view'
import { Notifications } from '../definitions/notifications'
import jss from '../jss/Branding'

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
      action: window.location.href
    })
  }

  render() {
    let { view, config } = this.props
    let { classes } = this
    return (
      <div
        className={`${classes.message} ${view.open ? classes.show : ''}`}
        onClick={this.open.bind(this)}>
        <div className={`${classes['powered-by']}`}>Discord widgets by</div>
        <div className={`${classes['widgetbot']}`}>WidgetBot</div>
      </div>
    )
  }
}