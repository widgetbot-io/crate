import * as React from "react"
import jss from '../../jss/Modals/MessageExpand'
import { Config } from '../../definitions/config'
import { Modal } from '../../definitions/modal'
import { Notifications } from '../../definitions/notifications'

const color = require('color')

interface Props {
  config: Config
  message: Notifications.message
  toggle: Function
}

export class MessageExpand extends React.Component<Props, {}> {
  classes: any

  componentWillMount() {
    let { config } = this.props
    this.classes = jss(config)
  }

  render() {
    let { config, message, toggle } = this.props
    let { classes } = this
    return (
      <span>{JSON.stringify(message)}</span>
    )
  }
}
