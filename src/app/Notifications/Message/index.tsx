import * as React from 'react'

import { Notification } from '../../../types/store'
import { Avatar, Content, Root } from './elements'
import { defaultAvatar } from './util'

class Message extends React.PureComponent<Notification> {
  state = {
    visible: false
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = nextProps
    this.setState({ visible })
  }

  componentDidMount() {
    const { visible } = this.props

    setTimeout(() => this.setState({ visible }), 20)
  }

  render() {
    const { visible } = this.state
    const { avatar, content } = this.props

    return (
      <Root visible={visible} className="notification">
        <Avatar src={avatar || defaultAvatar} className="avatar" />
        <Content source={content} className="content" />
      </Root>
    )
  }
}

export default Message
