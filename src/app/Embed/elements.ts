import WidgetBot from '@widgetbot/react-embed'

import ShadowStyles from '../../controllers/emotion'
import Options from '../../types/options'
import { getCoords } from '../../util/parse'
import { padding } from '../Button/elements'

interface IRoot {
  location: Options['location']
  open: boolean
}

export const Root = ShadowStyles(
  ({ styled, css }) => styled<IRoot, 'div'>('div')`
    position: fixed;
    max-height: 600px;
    width: 400px;
    transition: opacity 0.4s ease,
      transform 0.3s cubic-bezier(0.24, 0.6, 0.35, 0.96);

    ${({ location, open }) => {
      const { x, y } = getCoords(location, padding)

      return css({
        height: `calc(100% - ${y.offset + 20}px)`,
        [x.axis]: x.offset,
        [y.axis]: y.offset,
        transformOrigin: `${x.axis === 'right' ? 100 : 0}% ${
          y.axis === 'bottom' ? 100 : 0
        }%`
      })
    }};

    @media (max-width: 500px) {
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;

      & > div {
        border-radius: 0px !important;
      }
    }

    ${({ open }) =>
      open
        ? css``
        : css`
            opacity: 0;
            pointer-events: none;
            transform: scale(0.1);

            & > div {
              border-radius: 200px !important;
            }
          `};
  `
)

export const IFrame = ShadowStyles(
  ({ styled }) => styled(WidgetBot)`
    height: 100%;
    width: 100%;
    box-shadow: 0 5px 40px rgba(0, 0, 0, 0.3);
    transition: border-radius 0.2s ease;

    border-radius: 17px !important;
  `
)
