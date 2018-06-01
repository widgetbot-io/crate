import * as React from 'react'
import jss from 'jss'
// @ts-ignore
import camelCase from 'jss-camel-case'
// @ts-ignore
import nested from 'jss-nested'
// @ts-ignore
import increaseSpecificity from 'jss-increase-specificity'
// @ts-ignore
jss.use(camelCase(), nested(), increaseSpecificity())

const { classes } = jss
  .createStyleSheet({
    cubes: {
      height: '32px',
      width: '32px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    cube: {
      animation: 'spinner-wandering-cubes 1.8s infinite ease-in-out',
      backgroundColor: '#7289da',
      height: '10px',
      left: '0',
      position: 'absolute',
      top: '0',
      width: '10px'
    },
    cube2: {
      animationDelay: '-.9s'
    },
    '@keyframes spinner-wandering-cubes': {
      '25%': {
        transform: 'translateX(22px) rotate(-90deg) scale(0.5)'
      },
      '50%': {
        transform: 'translateX(22px) translateY(22px) rotate(-180deg)'
      },
      '75%': {
        transform: 'translateX(0) translateY(22px) rotate(-270deg) scale(0.5)'
      },
      to: {
        transform: 'rotate(-1turn)'
      }
    }
  })
  .attach()

export default class Loading extends React.Component {
  render() {
    return (
      <div {...this.props}>
        <div className={classes.cubes}>
          <div className={classes.cube} />
          <div className={`${classes.cube} ${classes.cube2}`} />
        </div>
      </div>
    )
  }
}
