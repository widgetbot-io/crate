import { Config } from '../definitions/config'
import jss from 'jss'
const color = require('color')
// @ts-ignore
import camelCase from 'jss-camel-case'
// @ts-ignore
import nested from 'jss-nested'

// @ts-ignore
jss.use(camelCase(), nested())

export default (config: Config) => {
  const height = config.style === 'material' ? 56 : 60
  const styles = {
    'message': {
      display: 'flex',
      flexDirection: 'column',
      padding: '5px 10px',
      opacity: 0,
      zIndex: '2147482999 !important',
      position: 'fixed !important',
      [config.position.y]: `20px`,
      [config.position.x]: `${height + 20 + 15}px`,
      [`margin-${config.position.x}`]: '-30px',
      height: `${height}px`,
      color: '#fff',
      textAlign: config.position.x,
      boxSizing: 'border-box',
      borderRadius: '5px',
      overflow: 'hidden',
      transition: 'transform 0.3s ease, background-color 0.2s ease, color 0.2s ease, opacity 0.2s ease, margin 0.3s ease',
      cursor: 'pointer',
      textDecoration: 'none',
      '&:hover': {
        transform: 'scale(0.95)',
        backgroundColor: 'rgba(149, 166, 228, 0.28)',
        color: '#7289DA'
      },
    },
    'show': {
      opacity: 1,
      [`margin-${config.position.x}`]: 0,
    },
    'powered-by': {
      lineHeight: `${(height - 10) * 0.3}px`,
      fontSize: `10px`,
      color: '#ced5ec'
    },
    'widgetbot': {
      lineHeight: `${(height - 10) * 0.7}px`,
      fontWeight: 600,
      fontSize: `17px`
    },
    '@media screen and (max-width: 250px)': {
      'message': {
        display: 'none'
      }
    }
  }

  return jss.createStyleSheet(styles).attach().classes
}