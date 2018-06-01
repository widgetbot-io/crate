export const enhancer =
  (process.env.NODE_ENV === 'development' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()) ||
  undefined

export const log = (method: keyof Console, ...data) =>
  console[method](
    '%c<{ crate.js }>',
    'font-weight: bold; font-style: italic',
    ...data
  )
