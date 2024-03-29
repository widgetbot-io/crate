import { Props } from '@widgetbot/react-embed'
import * as React from 'react'
import { connect } from 'react-redux'

import { APIContext } from '..'
import { State } from '../../types/store'
import { IFrame, Root } from './elements'

interface StateProps {
  options: Props
  interactive: boolean
  open: boolean
}

class Embed extends React.PureComponent<StateProps> {
  state = {
    deferred: true
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.interactive && nextProps.open && this.state.deferred) {
      // User toggled open embed
      this.setState({ deferred: false })
    }
  }

  componentDidMount() {
    const { interactive } = this.props

    // Allow 5 seconds for the target page to load,
    // before attempting to load the embed
    if (interactive) {
      setTimeout(() => this.setState({ deferred: false }), 5000)
    }
  }

  render() {
    const { options, open } = this.props
    const { deferred } = this.state

    return (
      <Root className="embed">
        <APIContext.Consumer>
          {onAPI => (
            <IFrame
              {...options}
              options={{
                preset: 'crate'
              }}
              defer={deferred}
              onAPI={onAPI}
              className="react-embed"
              focusable={open}
            />
          )}
        </APIContext.Consumer>
      </Root>
    )
  }
}

export default connect<StateProps, {}, {}, State>(
  ({ interactive, options, open }) => ({
    options: {
      server: options.server,
      channel: options.channel,
      shard: options.shard,
      thread: options.thread,
      username: options.username,
      avatar: options.avatar,
      token: options.token,
      notifications: options.allChannelNotifications,
      notificationTimeout: options.embedNotificationTimeout,
      accessibility: options.accessibility,
      settingsGroup: options.settingsGroup
    },
    interactive,
    open
  })
)(Embed)
