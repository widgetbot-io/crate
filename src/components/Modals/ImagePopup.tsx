import * as React from "react"
import jss from '../../jss/Modals/ImagePopup'
import { Config } from '../../definitions/config'
import { Modal } from '../../definitions/modal'
const color = require('color')

interface Props {
  config: Config
  url: string
  toggle: Function
}

export class ImagePopup extends React.Component<Props, {}> {
  classes: any

  componentWillMount() {
    let { config } = this.props
    this.classes = jss(config)
  }

  render() {
    let { config, url, toggle } = this.props
    let { classes } = this
    return (
      <img src={url} onClick={() => { window.open(url); toggle(false) }} className={classes.img} />
    )
  }
}