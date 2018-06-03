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

export const APIContext = React.createContext(null)

class Controller extends React.Component<OwnProps> {
  state = {
    emotion: null
  }

  registerEmotion = (styleInjection: HTMLDivElement) => {
    this.setState({
      emotion: createEmotion(styleInjection)
    })
  }

  shadowDOM(props) {
    const children = <shadow-root>{props.children}</shadow-root>
    const supported = !!(
      (document.head as any).createShadowRoot || document.head.attachShadow
    )

    return supported ? <ShadowDOM>{children}</ShadowDOM> : children
  }

  render() {
    const { onAPI } = this.props

    return (
      <this.shadowDOM>
        <shadow-styles ref={this.registerEmotion} />
        {this.state.emotion && (
          <Provider value={this.state.emotion}>
            <APIContext.Provider value={onAPI}>
              <App />
            </APIContext.Provider>
          </Provider>
        )}
      </this.shadowDOM>
    )
  }
}

export default Controller
