import * as React from 'react'

import Button from './Button'
import { Root } from './elements'
import Embed from './Embed'

class App extends React.Component {
  render() {
    return (
      <Root className="root">
        <Embed />
        <Button />
      </Root>
    )
  }
}

export default App
