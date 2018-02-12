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

  render() {
    let { view, config } = this.props
    let { classes } = this
    return (
      <a className={`${classes.message} ${view.open ? classes.show : ''}`} href="https://widgetbot.io/?ref=crate-branding">
        <div className={`${classes['powered-by']}`}>Discord widgets by</div>
        <div className={`${classes['widgetbot']}`}>WidgetBot</div>
      </a>
    )
  }
}