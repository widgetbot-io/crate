import ShadowStyles from '../controllers/emotion'

export const Root = ShadowStyles(
  ({ styled }) => styled('div')`
    transition: opacity 0.2s ease;
    opacity: ${({ theme }) => (theme.visible ? 1 : 0)};
    pointer-events: ${({ theme }) => !theme.visible && 'none'};

    & :not(svg|*) {
      all: unset;
    }

    & * {
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
    }
  `
)
