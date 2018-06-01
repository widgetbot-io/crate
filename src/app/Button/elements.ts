import Color from 'color'

import ShadowStyles from '../../controllers/emotion'
import CloseIcon from './icons/close'
import OpenIcon from './icons/open'

export const Root = ShadowStyles(
  ({ styled, css }) => styled('button')`
    position: fixed;
    z-index: 2147483000;
    cursor: pointer;
    outline: none;

    width: 56px;
    height: 56px;

    border-radius: 50%;
    border: none;
    padding: 0;

    ${({ theme }) => {
      const color = Color(theme.options.color)

      return theme.open
        ? css`
            background-color: transparent;
          `
        : css`
            box-shadow: 0px 3px 5px -1px ${color.fade(0.7).toString()},
              0px 6px 10px 0px ${color.fade(0.86).toString()},
              0px 1px 18px 0px ${color.fade(0.88).toString()};
            background-color: ${theme.options.color};
          `
    }};

    transition: box-shadow 0.2s ease, background-color 0.3s ease,
      opacity 0.2s ease, transform 0.2s ease;

    ${({ theme }) => {
      const { x, y } = theme.coords

      return css({
        [x.axis]: x.offset,
        [y.axis]: y.offset
      })
    }};

    @media (max-width: 500px) {
      bottom: 0;
      right: 0;
      left: auto;
      top: auto;
      border-radius: 0;

      ${({ theme }) => {
        const { x, y } = theme.coords

        return css({
          [`border-${y.axis === 'top' ? 'bottom' : 'top'}-${
            x.axis === 'left' ? 'right' : 'left'
          }-radius`]: '50%'
        })
      }};
    }
  `
)

export namespace Icons {
  export const Root = ShadowStyles(
    ({ styled }) => styled('div')`
      width: 100%;
      height: 100%;

      & > * {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: transform 0.16s linear, opacity 0.2s ease;
      }
    `
  )

  export const Open = ShadowStyles(
    ({ styled, css }) => styled(OpenIcon)`
      padding: 12px;

      ${({ theme }) =>
        theme.open &&
        css`
          opacity: 0;
          transform: rotate(30deg) scale(0);
        `};
    `
  )

  export const Close = ShadowStyles(
    ({ styled, css }) => styled(CloseIcon)`
      padding: 19px;
      opacity: 0.6;

      &:hover {
        opacity: 0.95;
      }

      ${({ theme }) =>
        !theme.open &&
        css`
          opacity: 0 !important;
          transform: rotate(30deg) scale(0);
        `};
    `
  )
}

export const Indicator = ShadowStyles(({ styled }) => styled('span')``)
