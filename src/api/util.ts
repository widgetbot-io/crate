import Options from '../types/options'
import observe from '../util/observe'

console.log(
  `%c+%chttps://widgetbot.io\n%cPopup Discord chat widgets for your website.`,
  `font-size: 1px; margin-bottom: 5px; margin-left: 40px; padding: 10px 15px; line-height: 12px;background: url("https://i.imgur.com/S7IIIbE.png"); background-repeat: no-repeat; background-size: 30px; color: transparent;`,
  `padding-left: 2px; font-size: 14px; color: #7289DA; font-family: "Roboto", sans-serif`,
  `padding-left: 15px; font-size: 11px; font-family: "Roboto", sans-serif; `
)

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

export const observeOptions = (presets: Options, setter: Function) => {
  const store = {} as Options
  const options = observe(presets, store, (key, value) => {
    setter({ [key]: value })
  })

  return options
}
