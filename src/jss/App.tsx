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
    crate: {
      transition: 'opacity 0.2s ease',
      '& div, img, span': {
        all: 'unset',
        WebkitTapHighlightColor: 'transparent',
        userSelect: 'none',
        direction: 'ltr',
        boxSizing: 'border-box',
        fontFamily: config.style === 'material' ? `'Roboto', sans-serif` : 'Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif'
      },
      '& img': {
        WebkitUserDrag: 'none',
        KhtmlUserDrag: 'none',
        MozUserDrag: 'none',
        OUserDrag: 'none',
      },
      '&.fade-out': {
        opacity: 0,
        pointerEvents: 'none'
      },
      '&.disable-input': {
        display: 'none'
      }
    },
    '@font-face': config.style !== 'material' && [
      {
        fontFamily: 'Whitney',
        fontWeight: 300,
        src: 'url(https://discordapp.com/assets/6c6374bad0b0b6d204d8d6dc4a18d820.woff) format("woff")'
      },
      {
        fontFamily: 'Whitney',
        fontWeight: 400,
        src: 'url(https://discordapp.com/assets/e8acd7d9bf6207f99350ca9f9e23b168.woff) format("woff")'
      },
      {
        fontFamily: 'Whitney',
        fontWeight: 500,
        src: 'url(https://discordapp.com/assets/3bdef1251a424500c1b3a78dea9b7e57.woff) format("woff")'
      },
      {
        fontFamily: 'Whitney',
        fontWeight: '600',
        src: 'url(https://discordapp.com/assets/be0060dafb7a0e31d2a1ca17c0708636.woff) format("woff")'
      },
      {
        fontFamily: 'Whitney',
        fontWeight: '700',
        src: 'url(https://discordapp.com/assets/8e12fb4f14d9c4592eb8ec9f22337b04.woff) format("woff")'
      }
    ],
    '@import': config.style === 'material' && `url('https://fonts.googleapis.com/css?family=Roboto:400,500')`
  }
  // @ts-ignore
  return jss.createStyleSheet(styles, {increaseSpecificity: false}).attach().classes
}
