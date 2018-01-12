import jss from 'jss'
const preset = require('jss-preset-default')
const color = require('color')

jss.setup(preset)

const styles = {
  crate: {
    '-webkit-tap-highlight-color': 'transparent'
  }
}

export default jss.createStyleSheet(styles).attach().classes