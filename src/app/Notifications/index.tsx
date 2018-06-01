import * as React from 'react'
import { connect } from 'react-redux'

import { State } from '../../types/store'
import { Root } from './elements'
import Notification from './Notification'

interface StateProps {}

class Notifications extends React.PureComponent<StateProps> {
  render() {
    return (
      <Root className="notifications">
        <Notification content="hello" />
      </Root>
    )
  }
}

export default connect<StateProps, {}, {}, State>(({}) => ({}))(Notifications)
