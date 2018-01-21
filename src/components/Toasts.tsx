declare var window: any
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

    componentWillReceiveProps(nextProps: Props) {
        // Force JSS re-render
        if (nextProps && JSON.stringify(nextProps.config) !== JSON.stringify(this.props.config)) {
            this.classes = jss(nextProps.config)
            this.forceUpdate()
        }
    }

    render() {
        let { messages } : { messages: { expiration: number, message: Notifications.message}[] } = this.props
        let { classes } = this
        return (
            <div className={classes['toast-box']}>
                {/* Reversing the message array and use column-reverse to prevent the need for scrolling */}
                {messages.map(({expiration, message}, i: number) => {
                    return( <Toast message={message} expiration={expiration} key={message.id} classes={classes} last={i === 0} /> )
                })}
            </div>
        )
    }
}

interface ToastProps {
    message: Notifications.message
    expiration: number
    classes: any
    last: boolean
}

class Toast extends React.Component<ToastProps, {}> {
    state = {
        render: true
    }
    toast: HTMLElement
    mounted = true

    componentWillMount() {
        let { expiration } = this.props
        /**
         * Prevent rendering of already expired messages
         */
        if (expiration && +new Date() > expiration) {
            this.setState({
                render: false
            })
        }
    }

    componentDidMount() {
        let { last, classes, expiration } = this.props

        if (last) {
            setTimeout(() => { this.show() }, 10)
            if (expiration) this.expirationChecker()
        }
    }

    componentWillUnmount() {
        this.mounted = false
    }

    show() {
        let { classes } = this.props
        this.toast.classList.add(classes['toast-visible'])
    }

    hide() {
        let { classes } = this.props
        let { ReactGA } = window.globalCrate
        ReactGA.event({
          category: 'Toast',
          action: 'Hide'
        })
        this.toast.classList.remove(classes['toast-visible'])
        this.toast.classList.add(classes['toast-hidden'])
    }

    expirationChecker() {
        let { expiration } = this.props
        if (this.mounted) {
            if (+new Date() > expiration) {
                this.hide()
                setTimeout(() => {
                    this.setState({
                        render: false
                    })
                }, 400)
            } else {
                setTimeout(() => this.expirationChecker(), 500)
            }
        }
    }

    render() {
        let { message, classes, last, expiration } = this.props
        return (
            this.state.render ? (
                <div className={`${classes.toast} ${last ? classes['toast-hidden'] : ''}`} ref={toast => this.toast = toast}>
                    <img src={message.author.avatar || 'https://beta.widgetbot.io/embed/335391242248519680/335391242248519680/0002/default.webp'} className={classes['toast-avatar']}/>
                    <div className={classes['toast-message']}>
                        {message.content}
                    </div>
                </div>
            ) : (
                <div />
            )
        )
    }
}