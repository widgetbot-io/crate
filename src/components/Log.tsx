export default function (type: 'info' | 'error' | 'warn', message: any, ref?: any) {
  let color = ''
  if (type === 'warn') {
    color = '#fff816'
  } else if (type === 'error') {
    color = '#f9aeae'
  }
  console[type](`%c☄️ [Crate] %c${message}\n`, 'color: #40b8ff', `color: ${color}`, ref)
}