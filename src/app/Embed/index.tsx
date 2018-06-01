import * as React from 'react'
import { connect } from 'react-redux'

import Options from '../../types/options'
import { State } from '../../types/store'
import { IFrame, Root } from './elements'

interface StateProps {
  server: string
  channel: string
  location: Options['location']
  shard: string

  open: boolean
}

class Embed extends React.PureComponent<StateProps> {
  render() {
    const { open, location, ...props } = this.props

    return (
      <Root location={location} open={open}>
        <IFrame {...props} className="embed" />
      </Root>
    )
  }
}

export default connect<StateProps, {}, {}, State>(({ options, open }) => ({
  server: options.server,
  channel: options.channel,
  shard: options.shard,
  location: options.location,

  open
}))(Embed)
