import { API } from '@widgetbot/react-embed'
import * as React from 'react'
import ShadowDOM from 'react-shadow'

import { createEmotion, Provider } from '../controllers/emotion'
import App from './app'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'shadow-root': any
      'shadow-styles': any
    }
  }
}

interface OwnProps {
  onAPI: (api: API) => void
}

class Controller extends React.Component<OwnProps> {
  state = {
    emotion: null
  }

  registerEmotion = (styleInjection: HTMLDivElement) => {
    this.setState({
      emotion: createEmotion(styleInjection)
    })
  }

  render() {
    const { onAPI } = this.props

    return (
      <ShadowDOM>
        <shadow-root>
          <shadow-styles ref={this.registerEmotion} />
          {this.state.emotion && (
            <Provider value={this.state.emotion}>
              <App />
            </Provider>
          )}
        </shadow-root>
      </ShadowDOM>
    )
  }
}

export default Controller
