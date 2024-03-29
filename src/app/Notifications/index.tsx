import * as React from 'react'
import { connect } from 'react-redux'

import { Notification, State } from '../../types/store'
import { Root } from './elements'
import Message from './Message'

interface StateProps {
  notifications: Notification[]
}

class Notifications extends React.PureComponent<StateProps> {
  render() {
    const messages = [...this.props.notifications].reverse()

    if (!messages.length) return null;

    return (
      <Root className="notifications">
        {messages.map(message => <Message key={message.id} {...message} onClick={() => message.onClick?.()} />)}
      </Root>
    )
  }
}

export default connect<StateProps, {}, {}, State>(({ notifications }) => ({
  notifications
}))(Notifications)
