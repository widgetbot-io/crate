import jss from 'jss'
const preset = require('jss-preset-default')
const color = require('color')

jss.setup(preset)

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

export default jss.createStyleSheet(styles).attach().classes