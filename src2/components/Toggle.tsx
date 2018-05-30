import * as React from 'react'
import { View } from '../definitions/view'
import jss from '../jss/Toggle'

// @ts-ignore
import Transition from 'react-transition-group/Transition'

interface Props extends View {
  toggle: Function
  notifications: any
}

export class Toggle extends React.Component<Props, {}> {
  classes: any
  state = {
    entered: false
  }

  componentWillMount() {
    let { config } = this.props
    this.classes = jss(config)
  }

  componentDidMount() {
    this.setState({
      entered: true
    })
  }

  componentWillReceiveProps(nextProps: Props) {
    // Force JSS re-render
    if (
      nextProps &&
      JSON.stringify(nextProps.config) !== JSON.stringify(this.props.config)
    ) {
      this.classes = jss(nextProps.config)
      this.forceUpdate()
    }
  }

  render() {
    let { config, toggle, view, notifications } = this.props
    let { classes } = this
    return (
      <Transition in={this.state.entered} timeout={10}>
        {(state) => (
          <div
            className={`crate-toggle ${classes.toggle} ${classes.toggle}-${state} ${
              notifications.pinged
                ? `crate-toggle-pinged ${classes['toggle-pinged']}`
                : ''
            }`}
            onClick={toggle.bind(this)}>
            <ButtonOpen classes={classes} view={view} />
            <ButtonClose classes={classes} view={view} />
            {config.notifications.indicator.enable && (
              <Indicator
                classes={classes}
                unread={notifications.unread}
                pinged={notifications.pinged}
              />
            )}
          </div>
        )}
      </Transition>
    )
  }
}

interface Buttons {
  view: any
  classes: any
}

class ButtonOpen extends React.Component<Buttons, {}> {
  render() {
    let { view, classes } = this.props
    return (
      <div
        className={`crate-toggle-glyph crate-toggle-open ${
          classes['button-glyph']
        } ${classes['button-open']} ${
          view.open ? classes['button-open:toggled'] : ``
        }`}
      />
    )
  }
}

class ButtonClose extends React.Component<Buttons, {}> {
  render() {
    let { view, classes } = this.props
    return (
      <div
        className={`crate-toggle-glyph crate-toggle-close ${
          classes['button-glyph']
        } ${classes['button-close']} ${
          view.open ? classes['button-close:toggled'] : ``
        }`}
      />
    )
  }
}

interface UnreadIndicator {
  unread: number
  pinged: boolean
  classes: any
}

class Indicator extends React.Component<UnreadIndicator, {}> {
  render() {
    let { unread, pinged, classes } = this.props
    return (
      <div
        className={`crate-unread-indicator ${classes.indicator} ${
          pinged ? classes['indicator-pinged'] : ''
        }`}>
        {unread !== 0 ? (unread > 99 ? '99' : unread) : ''}
      </div>
    )
  }
}
