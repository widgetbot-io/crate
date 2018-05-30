import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import styled from '../controllers/emotion'
import { State } from '../types/store'

const A = styled('button')`
  background-color: red;
`

interface Props {
  dispatch: Dispatch
  state: State
}

class App extends React.Component<Props> {
  render() {
    console.log(this.props)
    // const { options } = this.props

    return (
      <span>hi {this.props.state.test + ''}</span>
      // <Context.Provider value={options}>
      //   <ShadowDOM>
      //     <div>
      //       <span>works {options.server}</span>
      //       <A onClick={console.log}>hi</A>
      //     </div>
      //   </ShadowDOM>
      // </Context.Provider>
    )
  }
}

export default connect(state => ({
  state
}))(App)
