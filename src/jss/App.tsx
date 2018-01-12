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
      '& *': {
        WebkitTapHighlightColor: 'transparent',
        userSelect: 'none'
      }
    }
  }
  
  return jss.createStyleSheet(styles).attach().classes
}