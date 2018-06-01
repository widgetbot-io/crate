import * as React from 'react'
import { connect } from 'react-redux'

import { APIContext } from '..'
import { State } from '../../types/store'
import { IFrame, Root } from './elements'

interface StateProps {
  server: string
  channel: string
  shard: string
}

class Embed extends React.PureComponent<StateProps> {
  render() {
    const props = this.props

    return (
      <Root className="embed">
        <APIContext.Consumer>
          {onAPI => (
            <IFrame
              {...props}
              options={{
                preset: 'crate'
              }}
              onAPI={onAPI}
              className="react-embed"
            />
          )}
        </APIContext.Consumer>
      </Root>
    )
  }
}

export default connect<StateProps, {}, {}, State>(({ options }) => ({
  server: options.server,
  channel: options.channel,
  shard: options.shard
}))(Embed)
