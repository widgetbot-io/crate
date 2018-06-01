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
    transition: opacity 0.4s ease, transform 0.3s ease;
    transform-origin: 99% 99%;

    ${({ location }) => {
      const { x, y } = getCoords(location, padding)

      return css({
        height: `calc(100% - ${y.offset + 20}px)`,
        [x.axis]: x.offset,
        [y.axis]: y.offset
      })
    }};

    ${({ open }) =>
      open
        ? css``
        : css`
            opacity: 0;
            pointer-events: none;
            transform: scale(0.1);

            & > div {
              border-radius: 100px !important;
            }
          `};
  `
)

export const IFrame = ShadowStyles(
  ({ styled, css }) => styled(WidgetBot)`
    height: 100%;
    width: 100%;
    box-shadow: 0 5px 40px rgba(0, 0, 0, 0.3);
    transition: border-radius 0.1s ease;

    border-radius: 17px !important;
    border-bottom-right-radius: 30px !important;
  `
)
