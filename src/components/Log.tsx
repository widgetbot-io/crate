export default function (type: 'info' | 'error' | 'warn' | 'debug', message: any, ref?: any) {
  let color = ''
  if (type === 'warn') {
    color = '#fff816'
  } else if (type === 'error') {
    color = '#f9aeae'
  } else if (type === 'debug') {
    color = '#42c72a'
  }
  console[type](`%c\u2604\uFE0F [Crate] %c${message}\n`, 'color: #40b8ff', `color: ${color}`, ref)
}