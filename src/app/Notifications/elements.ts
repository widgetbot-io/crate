import ShadowStyles from '../../controllers/emotion'

export const Root = ShadowStyles(
  ({ styled, css }) => styled('div')`
    position: fixed;
    z-index: 2147482999;
    padding: 7px 0;
    padding-bottom: 20px;
    width: 300px;
    max-height: calc(70% - 100px);
    flex-direction: column-reverse;

    ${({ theme }) => {
      const { x, y } = theme.coords

      return css({
        /* height: `calc(100% - ${y.offset + 20}px)`, */
        [x.axis]: x.offset,
        [y.axis]: y.offset + 56
      })
    }};
  `
)
