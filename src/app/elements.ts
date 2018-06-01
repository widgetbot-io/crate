import ShadowStyles from '../controllers/emotion'

export const Root = ShadowStyles(
  ({ styled }) => styled('div')`
    & * {
      box-sizing: border-box;
    }
  `
)
