import { Props, TelegramProps } from '@widgetbot/react-embed'
import * as React from 'react'
import { connect } from 'react-redux'

import { APIContext } from '..'
import { State } from '../../types/store'
import { IFrame, Root, TelegramIFrame } from './elements'

interface StateProps {
  discord: Props | null
  telegram: TelegramProps | null
  extraParams: { [key: string]: string }
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
    const { discord, telegram, extraParams, open } = this.props
    const { deferred } = this.state

    return (
      <Root className="embed">
        <APIContext.Consumer>
          {onAPI =>
            telegram ? (
              <TelegramIFrame
                {...telegram}
                options={{
                  preset: 'crate',
                  ...extraParams
                }}
                defer={deferred}
                onAPI={onAPI}
                className="react-embed"
                focusable={open}
              />
            ) : (
              <IFrame
                {...discord}
                options={{
                  preset: 'crate',
                  ...extraParams
                }}
                defer={deferred}
                onAPI={onAPI}
                className="react-embed"
                focusable={open}
              />
            )
          }
        </APIContext.Consumer>
      </Root>
    )
  }
}

export default connect<StateProps, {}, {}, State>(
  ({ interactive, options, open }) => {
    const isTelegram = !!options.chat
    return {
      discord: isTelegram
        ? null
        : {
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
      telegram: isTelegram
        ? {
            chat: options.chat,
            topic: options.topic,
            shard: options.shard,
            token: options.token,
            settingsGroup: options.settingsGroup
          }
        : null,
      extraParams: {
        ...(options.emitLatestMessage && { emitLatestMessage: '1' })
      },
      interactive,
      open
    }
  }
)(Embed)
