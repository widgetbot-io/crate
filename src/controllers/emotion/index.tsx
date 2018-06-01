import createEmotionStyled from 'create-emotion-styled'
import * as React from 'react'

import create from './emotion'
import ShadowStyles from './types'

export const createEmotion = (styleInjection: Element) => {
  const emotion = create(styleInjection)
  const styled = createEmotionStyled(emotion, React)
  return { emotion, styled }
}

export const { Provider, Consumer } = React.createContext(null)

// What does this do?
// -------------------
// This is a wrapper that uses React's context API
// to dynamically get the correct emotion instance
// (and correct shadow DOM).
function ShadowStyles<T>(component: (emotion: ShadowStyles) => T): T {
  return class ShadowStyled extends React.PureComponent {
    component

    render() {
      return (
        <Consumer>
          {({ emotion, styled }) => {
            if (!this.component) {
              this.component = component({ styled, ...emotion })
            }

            return <this.component {...this.props} />
          }}
        </Consumer>
      )
    }
  } as any
}

export default ShadowStyles

export * from './emotion'
