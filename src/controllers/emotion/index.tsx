import createEmotionStyled from 'create-emotion-styled'
import * as React from 'react'

import Theme from '../../types/theme'
import create from './emotion'
import ShadowStyles, { ThemedReactEmotionInterface } from './types'

export const createEmotion = (styleInjection: HTMLElement) => {
  const emotion = create(styleInjection)
  const styled = (createEmotionStyled(
    emotion,
    React
  ) as any) as ThemedReactEmotionInterface<Theme>
  return { emotion, styled }
}

export const { Provider, Consumer } = React.createContext(null)

export interface ThemedEmotion extends ShadowStyles {
  styled: ThemedReactEmotionInterface<Theme>
}

// What does this do?
// -------------------
// This is a wrapper that uses React's context API
// to dynamically get the correct emotion instance
// (and correct shadow DOM).
function ShadowStyles<T>(component: (emotion: ThemedEmotion) => T): T {
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
