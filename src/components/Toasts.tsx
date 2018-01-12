import * as React from "react";
import { View } from '../definitions/view'
import { Notifications } from '../definitions/notifications'
import jss from '../jss/Toasts'
let classes

interface Props extends View {
    messages: Notifications.message[]
}

export class Toasts extends React.Component<Props, {}> {
    componentWillMount() {
        let { config } = this.props
        classes = jss(config)
    }
    
    render() {
        return <h1>Hello lol!</h1>;
    }
}