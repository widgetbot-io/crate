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
  return (props => (
    <Consumer>
      {({ emotion, styled }) => {
        const Component: any = component({ styled, ...emotion })

        return <Component {...props} />
      }}
    </Consumer>
  )) as any
}

export default ShadowStyles

export * from './emotion'
