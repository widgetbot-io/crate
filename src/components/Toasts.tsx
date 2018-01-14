import * as React from "react"
import { View } from '../definitions/view'
import { Notifications } from '../definitions/notifications'
import jss from '../jss/Toasts'

interface Props extends View {
    messages: any // Notifications.message[]
}

export class Toasts extends React.Component<Props, {}> {
    classes: any

    componentWillMount() {
        let { config } = this.props
        this.classes = jss(config)
    }

    render() {
        let { messages } = this.props
        let { classes } = this
        return (
            <div className={classes['toast-box']}>
                {messages.map((message:Notifications.message, i: number) => {
                    return( <Toast message={message} key={i} classes={classes} /> )
                })}
            </div>
        )
    }
}

interface ToastProps {
    message: Notifications.message
    classes: any
}

class Toast extends React.Component<ToastProps, {}> {
    render() {
        let { message, classes } = this.props
        return (
            <div className={classes['toast']}>
                <img src={message.author.avatar} className={classes['toast-avatar']}/>
                <div className={classes['toast-message']}>
                    {message.content}
                </div>
            </div>
        )
    }
}