import Options from './options'

interface Theme {
  options: Options
  open: boolean
  coords: {
    x: {
      axis: 'left' | 'right'
      offset: number
    }
    y: {
      axis: 'top' | 'bottom'
      offset: number
    }
  }
}

export default Theme
