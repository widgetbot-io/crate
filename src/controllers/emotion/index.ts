import createEmotionStyled from 'create-emotion-styled'
import * as React from 'react'

import * as emotion from './emotion'

const styled = createEmotionStyled(emotion, React)

export default styled

export * from './emotion'
