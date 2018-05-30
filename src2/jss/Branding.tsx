import { Config } from '../definitions/config'
import jss from 'jss'
const color = require('color')
// @ts-ignore
import camelCase from 'jss-camel-case'
// @ts-ignore
import nested from 'jss-nested'
// @ts-ignore
import increaseSpecificity from 'jss-increase-specificity'

// @ts-ignore
jss.use(camelCase(), nested(), increaseSpecificity())

export default (config: Config) => {
  const height = config.style === 'discord' ? 60 : 46
  const styles = {
    message: {
      visibility: 'visible',
      display:
        window.innerWidth <= config.mobile.maxWidth ||
        window.innerHeight <= config.mobile.maxHeight
          ? 'none'
          : 'flex',
      flexDirection: 'column',
      padding: '5px 10px',
      opacity: 0,
      zIndex: '2147482999 !important',
      position: 'fixed !important',
      [config.position.y]: `20px`,
      [config.position.x]: `${height + 20 + 15}px`,
      margin: config.style === 'material' ? '5px 0' : '',
      [`margin-${config.position.x}`]: '-30px',
      height: `${height}px`,
      color: 'rgba(255, 255, 255, 0.8)',
      textAlign: config.position.x,
      boxSizing: 'border-box',
      boxShadow: [
        '0px 3px 5px -1px rgba(0, 0, 0, 0.1)',
        '0px 6px 10px 0px rgba(0, 0, 0, 0.04)',
        '0px 1px 18px 0px rgba(0, 0, 0, 0.2)'
      ],
      borderRadius: config.style === 'material' ? '8px' : '5px',
      [`border-${config.position.y === 'top' ? 'bottom' : 'top'}-${config.position.x}-radius`]: config.style === 'material' ? 0 : '5px',
      overflow: 'hidden',
      transition:
        'transform 0.3s ease, background-color 0.2s ease, color 0.2s ease, opacity 0.4s ease, margin 0.3s ease',
      cursor: 'pointer',
      pointerEvents: 'none',
      animationName: 'branding-fade',
      animationDuration: '0.3s',
      animationTiming: 'ease',
      textDecoration: 'none',
      backgroundColor: config.colors.toggle,
      '&:hover': {
        '&:after': {
          transform: 'rotate(35deg) translate(150%, -50px)'
        }
      },
      '&:after': {
        background: '#fff',
        content: '""',
        height: '150px',
        opacity: '.2',
        position: 'absolute',
        left: 0,
        top: 0,
        transform: 'rotate(35deg) translate(-90px, -50px)',
        transition: 'transform 0.5s ease',
        width: '50px',
        zIndex: '-10',
        pointerEvents: 'none'
      }
    },
    show: {
      opacity: 1,
      [`margin-${config.position.x}`]: config.style === 'material' ? '5px' : 0,
      pointerEvents: 'initial'
    },
    'powered-by': {
      lineHeight: `${(height - 10) * 0.3}px`,
      fontSize: config.style === 'material' ? '9px' : '10px',
      color: 'rgba(255, 255, 255, 0.5)',
      visibility: 'visible',
      display: 'block',
      opacity: 1,
      textAlign: 'center'
    },
    widgetbot: {
      lineHeight: `${(height - 10) * 0.7}px`,
      fontWeight: config.style === 'material' ? 500 : 600,
      fontSize: config.style === 'material' ? `16px` : `17px`,
      visibility: 'visible',
      display: 'block',
      textAlign: 'center',
      opacity: 0.9
    },
    supporter: {
      animationName: 'branding-fade-patreon',
    },
    supporterShow: {
      opacity: 0.7,
    },
    '@keyframes branding-fade': {
      from: {
        opacity: 0
      },
      to: {
        opacity: 1
      }
    },
    '@keyframes branding-fade-patreon': {
      from: {
        opacity: 0
      },
      to: {
        opacity: 0.7
      }
    }
  }

  return jss.createStyleSheet(styles).attach().classes
}
