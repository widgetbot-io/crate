import ShadowStyles from '../controllers/emotion'

export const Root = ShadowStyles(
  ({ styled }) => styled('div')`
    & :not(svg|*) {
      all: unset;
    }
    & * {
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
    }
  `
)
