import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from '../../app'
import Options from '../../types/options'
import { Node } from './root'

interface Props {
  node: Node
  store: any
  options: Options
}
const render = ({ node, store, options }: Props) => {
  ReactDOM.render(
    <Provider store={store}>
      <App options={options} />
    </Provider>,
    node
  )

  return node
}

export default render

export { default as root } from './root'
export * from './root'
