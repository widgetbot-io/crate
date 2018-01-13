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
    'toggle': {
      zIndex: '2147483000 !important',
      position: 'fixed !important',
      [config.position.y]: '20px !important',
      [config.position.x]: '20px !important',
      width: '60px !important',
      height: '60px !important',
      borderRadius: '50% !important',
      transition: 'box-shadow .2s ease-in-out, filter .2s ease-in-out, transform .7s ease !important',
      boxShadow: [
        '0 1px 6px rgba(0,0,0,0.06)',
        '0 2px 32px rgba(0,0,0,0.16)'
      ],
      background: `${config.colors.toggle} !important`,
      cursor: 'pointer !important',
      animationTimingFunction: 'ease-in-out !important',
      '&:hover': {
        boxShadow: '0 2px 8px rgba(0,0,0,0.09), 0 4px 40px rgba(0,0,0,0.24)'
      }
    },
    'toggle-pinged': {
      boxShadow: [
        '0 1px 6px rgba(0,0,0,0.06)',
        '0 2px 32px rgba(0,0,0,0.16)',
        `0 0 0 0 ${color(config.colors.toggle).alpha(0.7).rgb().toString()}`,
        '!important'
      ],
      WebkitAnimation: 'pingedPulse 1.2s infinite cubic-bezier(0.18, 0.89, 0.6, 1.28) !important',
      MozAnimation: 'pingedPulse 1.2s infinite cubic-bezier(0.18, 0.89, 0.6, 1.28) !important',
      MsAnimation: 'pingedPulse 1.2s infinite cubic-bezier(0.18, 0.89, 0.6, 1.28) !important',
      animation: 'pingedPulse 1.2s infinite cubic-bezier(0.18, 0.89, 0.6, 1.28) !important',
    },
  
  
    'button-glyph': {
      display: 'block !important',
      position: 'absolute !important',
      top: '0 !important',
      bottom: '0 !important',
      height: '100% !important',
      width: '100% !important',
      transition: 'transform .16s linear, opacity .08s linear !important',
      backgroundSize: '50% 50% !important',
      backgroundPosition: 'center !important',
      backgroundRepeat: 'no-repeat !important',
      pointerEvents: 'none !important',
    },
    'button-open': {
      backgroundImage: `url(${JSON.stringify(config.logo)}) !important`,
    },
    'button-open:toggled': {
      opacity: '1 !important',
      transform: 'rotate(30deg) scale(0) !important',
    },
    'button-close': {
      backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOBAMAAADtZjDiAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAG1BMVEUAAAD///////////////////////////8AAADr8xjQAAAAB3RSTlMAM7cPx7jIAE21/gAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxIAAAsSAdLdfvwAAABESURBVAjXYxAyYGBgYFZkUHcG0ialDCYlBgzM7slA7MxgUgaUNCkzdgfJMbunlIDUMpiUg7hwGiYOVQfTBzMHZi7UHgCB3RAZ7HszogAAAABJRU5ErkJggg==) !important',
      backgroundPosition: '50% !important',
      backgroundSize: '14px 14px !important',
      backgroundRepeat: 'no-repeat !important',
      opacity: '0 !important',
      transform: 'rotate(-30deg) !important',
    },
    'button-close:toggled': {
      opacity: '1 !important',
      transform: 'rotate(0deg) !important',
    },
  
  
    'indicator': {
      display: 'block !important',
      width: '20px !important',
      height: '20px !important',
      background: '#FB576A !important',
      borderRadius: '100% !important',
      top: '-2px !important',
      position: 'absolute !important',
      right: '-2px !important',
      lineHeight: '20px !important',
      color: '#fff !important',
      fontSize: '11px !important',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2), 0 2px 10px rgba(0,0,0,0.16) !important',
      transition: 'opacity .1s ease !important',
      fontFamily: `'Roboto', sans-serif !important`,
      pointerEvents: 'none !important',
      textAlign: 'center !important',
      '&:empty': {
        opacity: '0 !important',
      }
    },
    'indicator-pinged': {
      backgroundColor: '#f5c351 !important',
      color: '#000 !important'
    },
  
  
    '@keyframes pingedPulse': {
      to: {
        boxShadow: [
          '0 1px 3px rgba(0,0,0,0.2)',
          '0 2px 10px rgba(0,0,0,0.16)',
          `0 0 0 20px ${color(config.colors.toggle).alpha(0).rgb().toString()}`
        ]
      }
    }
  }
  return jss.createStyleSheet(styles).attach().classes
}