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
    'popup': {
      zIndex: '2147483000 !important',
      position: 'fixed !important',
      right: '20px !important',
      height: 'calc(100% - 20px - 75px - 20px) !important',
      bottom: 'calc(20px + 75px) !important',
      width: '370px !important',
      minHeight: '250px !important',
      maxHeight: '590px !important',
      borderRadius: '8px !important',
      overflow: 'hidden !important',
      opacity: '0 !important',
      pointerEvents: 'none',
      transition: 'opacity .2s ease, transform .1s ease',
      transform: 'translate(0, 5px) !important',
      WebkitTouchCallout: 'none !important',
      WebkitUserSelect: 'none !important',
      KhtmlUserSelect: 'none !important',
      MozUserSelect: 'none !important',
      MsUserSelect: 'none !important',
      userSelect: 'none !important',
    },
    'popup-open': {
      boxShadow: '0 5px 40px rgba(0,0,0,0.3) !important',
      opacity: '1 !important',
      pointerEvents: 'initial !important',
      transform: 'translate(0) !important',
      backgroundColor: '#36393E !important',
    },
    'iframe': {
      position: 'absolute !important',
      top: '0 !important',
      width: '100% !important',
      height: '100% !important',
      border: '0 !important',
    },
    'iframe-open': {
  
    },
    'loading-svg': {
      position: 'absolute !important',
      width: '458px !important',
      height: '458px !important',
      top: '50% !important',
      left: '50% !important',
      transform: 'translate(-50%, -50%) scale(0.6) !important',
    },
  }
  
  return jss.createStyleSheet(styles).attach().classes
}