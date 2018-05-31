import createEmotion from 'create-emotion'

const create = (
  styleInjection: Element
): {
  flush
  hydrate
  cx
  merge
  getRegisteredStyles
  injectGlobal
  keyframes
  css
  sheet
  caches
} => {
  const context = {}

  return createEmotion(context, {
    container: styleInjection
  })
}

export default create
