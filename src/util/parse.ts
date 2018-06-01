import Color from 'color'

import Options from '../types/options'

export const getCoords = ([y, x]: Options['location'], margin = [20, 20]) => ({
  x: {
    axis: typeof x === 'string' ? x : x > -1 ? 'left' : 'right',
    offset: typeof x === 'string' ? margin[0] : Math.abs(x)
  },
  y: {
    axis: typeof y === 'string' ? y : y > -1 ? 'top' : 'bottom',
    offset: typeof y === 'string' ? margin[1] : Math.abs(y)
  }
})

export const getAccent = (color: string): string =>
  (color => (color.luminosity() > 0.6 ? color.darken(0.7) : '#fff'))(
    Color(color)
  ).toString()
