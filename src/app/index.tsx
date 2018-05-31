import WidgetBot, { API } from '@widgetbot/react-embed'
import * as React from 'react'
import { connect } from 'react-redux'
import ShadowDOM from 'react-shadow'
import { Dispatch } from 'redux'

import createStyled, { createEmotion, Provider } from '../controllers/emotion'
import Options from '../types/options'
import { State } from '../types/store'
import App from './app'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'shadow-root': any
      'shadow-styles': any
    }
  }
}

interface Props {
  dispatch: Dispatch
  state: State
  onAPI: (api: API) => void
  options: Options
}

class Controller extends React.Component<Props> {
  state = {
    emotion: null
  }

  registerEmotion = (styleInjection: HTMLDivElement) => {
    this.setState({
      emotion: createEmotion(styleInjection)
    })
  }

  render() {
    const { onAPI, options } = this.props

    return (
      <ShadowDOM>
        <shadow-root>
          <shadow-styles ref={this.registerEmotion} />
          {this.state.emotion && (
            <Provider value={this.state.emotion}>
              <App />
            </Provider>
          )}
          <WidgetBot {...options} onAPI={onAPI} />
        </shadow-root>
      </ShadowDOM>
    )
  }
}

export default connect(state => ({ state }))(Controller)
