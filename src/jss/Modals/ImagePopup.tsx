import { Config } from '../../definitions/config'
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
    'img': {
      cursor: 'pointer',
      maxWidth: '70vw',
      maxHeight: '70vh',
    }
  }

  return jss.createStyleSheet(styles).attach().classes
}