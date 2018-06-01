import Color from 'color'

import ShadowStyles from '../../controllers/emotion'
import Options from '../../types/options'
import { getCoords } from '../../util/parse'
import CloseIcon from './icons/close'
import OpenIcon from './icons/open'

interface IRoot {
  location: Options['location']
  color: string
  glyph: [string, string]

  open: boolean
}

export const padding = [25, 25]

export const Root = ShadowStyles(
  ({ styled, css }) => styled<IRoot, 'button'>('button')`
    position: fixed;
    z-index: 2147483000;
    cursor: pointer;
    outline: none;

    width: 56px;
    height: 56px;

    border-radius: 50%;
    border: none;
    padding: 0;

    ${({ open, color }) => {
      const _color = Color(color)

      return open
        ? css`
            background-color: transparent;
          `
        : css`
            box-shadow: 0px 3px 5px -1px ${_color.fade(0.7).toString()},
              0px 6px 10px 0px ${_color.fade(0.86).toString()},
              0px 1px 18px 0px ${_color.fade(0.88).toString()};
            background-color: ${color};
          `
    }};

    transition: box-shadow 0.2s ease, background-color 0.3s ease,
      opacity 0.2s ease, transform 0.2s ease;

    ${({ location }) => {
      const { x, y } = getCoords(location, padding)

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

      ${({ location }) => {
        const { x, y } = getCoords(location, padding)

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
        transition: transform 0.16s linear, opacity 0.08s linear;
      }
    `
  )

  interface Props {
    show: boolean
  }

  export const Open = ShadowStyles(
    ({ styled, css }) => styled<Props, any>(OpenIcon)`
      padding: 12px;

      ${({ show }) =>
        !show &&
        css`
          opacity: 0;
          transform: rotate(30deg) scale(0);
        `};
    `
  )

  export const Close = ShadowStyles(
    ({ styled, css }) => styled<Props, any>(CloseIcon)`
      padding: 19px;

      ${({ show }) =>
        !show &&
        css`
          opacity: 0;
          transform: rotate(30deg) scale(0);
        `};
    `
  )
}

export const Indicator = ShadowStyles(({ styled }) => styled('span')``)
