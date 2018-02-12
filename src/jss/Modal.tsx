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
  const styles = {
    'modal': {
      position: 'fixed',
      display: 'flex',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: '2147483001 !important',
      transition: 'opacity 0.2s ease, transform 0.2s ease',
      '&-exited': {
        display: 'none'
      },
      '&-entering': {
        display: 'flex',
        opacity: 0,
        transform: 'scale(1.1)'
      },
      '&-exiting': {
        opacity: 0,
        transform: 'scale(1.1)'
      },
      '&-entered': {
        opacity: 1,
        transform: 'initial'
      },
    },
    'card': {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      zIndex: '2',
      backgroundColor: '#202225',
      borderRadius: '6px',
      width: '480px',
      fontFamily: 'Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif',
      overflow: 'hidden',
      boxShadow: '0 0 0 1px rgba(32,34,37,0.6), 0 2px 10px 0 rgba(0,0,0,0.2)',
      transition: 'transform 0.1s,opacity 0.1s',
      '&-image': {
        width: 'auto'
      }
    },
    'close': {
      fill: 'transparent',
      borderRadius: '3px',
      marginLeft: 'auto',
      cursor: 'pointer',
      boxSizing: 'initial',
      opacity: '.5',
      padding: '4px',
      MozTransition: 'opacity 0.1s ease-in-out',
      OTransition: 'opacity 0.1s ease-in-out',
      WebkitTransition: 'opacity 0.1s ease-in-out',
      transition: 'opacity 0.1s ease-in-out',
      '&:hover': {
        backgroundColor: 'rgba(221,222,223,0.05)',
        opacity: '1'
      },
      '&-image': {
        position: 'absolute',
        right: '0'
      }
    },
    'svg': {
      fill: '#dcddde'
    }
  }

  return jss.createStyleSheet(styles).attach().classes
}