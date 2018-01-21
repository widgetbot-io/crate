import * as React from "react"
import { View } from '../definitions/view'
import jss from '../jss/Toggle'

interface Props extends View {
    toggle: Function
    notifications: any
}

export class Toggle extends React.Component<Props, {}> {
    classes: any

    componentWillMount() {
        let { config } = this.props
        this.classes = jss(config)
    }

    componentWillReceiveProps(nextProps: Props) {
        // Force JSS re-render
        if (nextProps && JSON.stringify(nextProps.config) !== JSON.stringify(this.props.config)) {
            this.classes = jss(nextProps.config)
            this.forceUpdate()
        }
    }

    render() {
        let { toggle, view, notifications } = this.props
        let { classes } = this
        return (
            <div className={`${classes.toggle} ${notifications.pinged ? classes['toggle-pinged'] : ''}`} onClick={toggle.bind(this)}>
                <ButtonOpen classes={classes} view={view} />
                <ButtonClose classes={classes}  view={view} />
                <Indicator classes={classes} unread={notifications.unread} pinged={notifications.pinged} />
            </div>
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
            <div className={`${classes['button-glyph']} ${classes['button-open']} ${view.open ? classes['button-open:toggled']  : ``}`}>

            </div>
        )
    }
}

class ButtonClose extends React.Component<Buttons, {}> {
    render() {
        let { view, classes } = this.props
        return (
            <div className={`${classes['button-glyph']} ${classes['button-close']} ${view.open ? classes['button-close:toggled']  : ``}`}>

            </div>
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
            <div className={`${classes.indicator} ${pinged ? classes['indicator-pinged'] : ''}`}>
                {unread !== 0 ? unread > 99 ? '99' : unread : ''}
            </div>
        )
    }
}