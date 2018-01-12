import * as React from "react";
import { View } from '../definitions/view'
import jss from '../jss/Toggle'
let classes

interface Props extends View {
    toggle: Function
    notifications: any
}

export class Toggle extends React.Component<Props, {}> {
    componentWillMount() {
        let { config } = this.props
        classes = jss(config)
    }
    
    render() {
        let { toggle, view, notifications } = this.props
        return (
            <div className={`${classes.toggle} ${notifications.pinged ? classes['toggle-pinged'] : ''}`} onClick={toggle.bind(this)}>
                <ButtonOpen view={view} />
                <ButtonClose view={view} />
                <Indicator unread={notifications.unread} pinged={notifications.pinged} />
            </div>
        )
    }
}

interface Buttons {
    view: any
}

class ButtonOpen extends React.Component<Buttons, {}> {
    render() {
        let { view } = this.props
        return (
            <div className={`${classes['button-open']} ${view.open ? classes['button-open']  : ``}`}>
                
            </div>
        )
    }
}

class ButtonClose extends React.Component<Buttons, {}> {
    render() {
        let { view } = this.props
        return (
            <div className={`${classes['button-close']} ${view.open ? classes['button-open']  : ``}`}>
                
            </div>
        )
    }
}


interface UnreadIndicator {
    unread: number
    pinged: boolean
}

class Indicator extends React.Component<UnreadIndicator, {}> {
    render() {
        let { unread, pinged } = this.props
        return (
            <div className={`${classes.indicator} ${pinged ? classes['indicator-pinged'] : ''}`}>
                {unread !== 0 && unread}
            </div>
        )
    }
}