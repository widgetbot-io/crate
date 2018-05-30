import * as React from "react"
import { View } from '../definitions/view'
import jss from '../jss/Embed'

interface Props extends View {
  setIframe: Function
}

export class Embed extends React.Component<Props, {}> {
  state = {
    block: false,
    opacity: true
  }
  classes: any
  timeout: any

  componentWillMount() {
    let { config, view } = this.props
    this.classes = jss(config)
    this.setState({
      block: view.open,
      opacity: view.open
    })
  }

  componentWillReceiveProps(nextProps: Props) {
    /**
     * Overcomes the issue of display: none preventing transitions
     */
    let { view } = nextProps
    if (view.open !== this.state.block || view.open !== this.state.opacity) {
      clearTimeout(this.timeout)
      if (view.open === true) {
        // Opened
        this.setState({
          block: true
        })
        setTimeout(() => {
          this.setState({
            opacity: true
          })
        }, 0)
      } else {
        // Closed
        this.setState({
          opacity: false
        })
        this.timeout = setTimeout(() => {
          this.setState({
            block: false
          })
        }, 250)
      }
    }
    if (nextProps && JSON.stringify(nextProps.config) !== JSON.stringify(this.props.config)) {
      this.classes = jss(nextProps.config)
      this.forceUpdate()
    }
  }

  render() {
    let { view, config } = this.props
    let { classes } = this
    return (
      <div className={`crate-popup ${classes.popup} ${this.state.block ? classes['popup-block'] : ``} ${this.state.opacity ? classes['popup-open'] : ``}`}>
        {view.loading &&
          <svg className={classes['loading-svg']}>
            <path fill={config.scheme === 'dark' ? '#7289da' : '#FFFFFF'} d="M231.857 268.344l44.317 45.268-47.03 46.043-44.318-45.267z" />
            <path fill={config.scheme === 'dark' ? '#7289da' : '#FFFFFF'} d="M77.5 104h306v210h-306z" />
            <path d="M376.926 84.533H84.074C71.884 84.533 62 95.063 62 108.052V305.61c0 12.989 9.883 23.519 22.074 23.519h97.2l32.333 40.956c4.194 5.313 10.377 8.381 16.894 8.381 6.516 0 12.699-3.067 16.893-8.38l32.333-40.956h97.199c12.191 0 22.074-10.53 22.074-23.52V108.054c0-12.99-9.883-23.52-22.074-23.52zm0 221.077H269.449L230.5 354.946l-38.948-49.336H84.074V108.052h292.852V305.61z" fill={config.scheme === 'dark' ? '#FFFFFF' : '#7289da'} />
            <path d="M124.84 175.054h100.805c6.096 0 11.037-5.265 11.037-11.76s-4.941-11.759-11.037-11.759H124.84c-6.095 0-11.037 5.265-11.037 11.76s4.942 11.759 11.037 11.759zM114.242 235.419c0 6.494 4.942 11.76 11.037 11.76h210.442c6.095 0 11.037-5.266 11.037-11.76s-4.942-11.76-11.037-11.76H125.279c-6.095 0-11.037 5.266-11.037 11.76z" fill={config.scheme === 'dark' ? '#FFFFFF' : '#7289da'} />
          </svg>
        }
        {view.opened && <iframe className={classes.iframe} src={config.url} ref={iframe => this.props.setIframe(iframe)} />}
      </div>
    )
  }
}