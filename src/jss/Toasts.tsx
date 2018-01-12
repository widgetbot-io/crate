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
    button: {
      background: color('blue').darken(0.3).hex()
    },
    ctaButton: {
      extend: 'button',
      '&:hover': {
        background: color('blue').darken(0.3).hex()
      }
    },
    '@media (min-width: 1024px)': {
      button: {
        width: 200
      }
    }
  }
  
  return jss.createStyleSheet(styles).attach().classes
}