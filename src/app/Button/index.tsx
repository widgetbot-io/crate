import * as React from 'react'
import { connect } from 'react-redux'

import { toggle } from '../../store/actions'
import { State } from '../../types/store'
import { getAccent } from '../../util/parse'
import { Icons, Root } from './elements'

interface DispatchProps {
  onClick: () => void
}

interface StateProps {
  color: string
}

class Button extends React.PureComponent<StateProps & DispatchProps> {
  render() {
    const { onClick, color, ...props } = this.props

    const accent = getAccent(color)

    return (
      <Root onClick={onClick} className="button">
        <Icons.Root className="icons">
          <Icons.Close className="close" />
          <Icons.Open className="open" color={accent} />
        </Icons.Root>
      </Root>
    )
  }
}

export default connect<StateProps, DispatchProps, {}, State>(
  ({ options, open }) => ({
    color: options.color
  }),
  dispatch => ({
    onClick: () => dispatch(toggle({}))
  })
)(Button)
