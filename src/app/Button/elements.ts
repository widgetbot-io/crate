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
            background: none;
          `
        : css`
            box-shadow: 0px 3px 5px -1px ${_color.fade(0.8)},
              0px 6px 10px 0px ${_color.fade(0.86)},
              0px 1px 18px 0px ${_color.fade(0.88)};
            background-color: ${color};
          `
    }};

    transition: box-shadow 0.2s ease, background-color 0.2s ease,
      opacity 0.1s ease, transform 0.2s ease;

    ${({ location }) => {
      const { x, y } = getCoords(location, padding)

      return css({
        [x.axis]: x.offset,
        [y.axis]: y.offset
      })
    }};
  `
)

export namespace Icons {
  export const Root = ShadowStyles(
    ({ styled }) => styled('div')`
      width: 100%;
      height: 100%;
    `
  )

  export const Open = ShadowStyles(
    ({ styled }) => styled(OpenIcon)`
      width: 100%;
      height: 100%;
      padding: 12px;
    `
  )

  export const Close = ShadowStyles(
    ({ styled }) => styled(CloseIcon)`
      width: 100%;
      height: 100%;
      padding: 19px;
    `
  )
}

export const Indicator = ShadowStyles(({ styled }) => styled('span')``)
