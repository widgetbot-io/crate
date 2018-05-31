import * as React from 'react'

import ShadowStyles from '../controllers/emotion'

const T = ShadowStyles(
  ({ styled }) => styled<{ a: string }, 'div'>('div')`
    color: ${({ a }) => a};
  `
)

class App extends React.Component {
  render() {
    return <T a="red">hi</T>
  }
}

export default App
