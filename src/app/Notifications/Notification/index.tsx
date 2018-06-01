import * as React from 'react'

import { Avatar, Content, Root } from './elements'
import { defaultAvatar } from './util'

interface Props {
  content: string
  avatar?: string
  // id: string
}

class Notification extends React.PureComponent<Props> {
  render() {
    const { avatar, content } = this.props
    return (
      <Root className="notification">
        <Avatar src={avatar || defaultAvatar} className="avatar" />
        <Content className="content">{content}</Content>
      </Root>
    )
  }
}

export default Notification
