import * as React from 'react'
import { connect } from 'react-redux'

import { toggle } from '../../store/actions'
import Options from '../../types/options'
import { State } from '../../types/store'
import { getAccent } from '../../util/parse'
import { Icons, Root } from './elements'

interface DispatchProps {
  onClick: () => void
}

interface StateProps {
  location: Options['location']
  color: string
  glyph: [string, string]

  open: boolean
}

class Button extends React.PureComponent<StateProps & DispatchProps> {
  render() {
    const { onClick, open, color, ...props } = this.props

    const accent = getAccent(color)

    return (
      <Root {...{ ...props, color, open }} className="button">
        <Icons.Root onClick={onClick}>
          <Icons.Close visible={open} className="close" />
          <Icons.Open visible={!open} className="open" color={accent} />
        </Icons.Root>
      </Root>
    )
  }
}

export default connect<StateProps, DispatchProps, {}, State>(
  ({ options, open }) => ({
    location: options.location,
    color: options.color,
    glyph: options.glyph,

    open
  }),
  dispatch => ({
    onClick: () => dispatch(toggle({}))
  })
)(Button)
