const color = require('color')
import log from './Log'

interface icons {
  name: 'widgetbot' | 'discord' | 'intercom' | any
}

export function Icons<icons>(toggleColor?: string, name?) {
  let accent = '#fff'
  if (toggleColor) {
    let primary = color(toggleColor)
    if (primary.luminosity() > 0.6) {
      log('debug', 'Darkening color')
      accent = primary.darken(0.7)
    } else {
      log('debug', 'Lightening color')
      accent = '#fff'
    }
  }
  let icon = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-357 161 245 240'><path fill='${accent}' d='M-145.3 217.1c-29.2-21.9-57-21.3-57-21.3l-2.8 3.2c34.5 10.5 50.5 25.8 50.5 25.8-21.1-11.6-41.8-17.2-61-19.5-14.6-1.6-28.6-1.2-41 .4-1.2 0-2.2.2-3.4.4-7.1.6-24.3 3.2-46 12.8-7.5 3.4-12 5.9-12 5.9s16.8-16 53.3-26.6l-2-2.4s-27.8-.6-57 21.3c0 0-29.2 52.9-29.2 118.2 0 0 17 29.4 61.8 30.8 0 0 7.5-9.1 13.6-16.8-25.8-7.7-35.5-23.9-35.5-23.9s2 1.4 5.7 3.4c.2.2.4.4.8.6.6.4 1.2.6 1.8 1 5.1 2.8 10.1 5.1 14.8 6.9 8.3 3.2 18.2 6.5 29.8 8.7 15.2 2.8 33.1 3.9 52.5.2 9.5-1.6 19.3-4.5 29.4-8.7 7.1-2.6 15-6.5 23.3-12 0 0-10.1 16.6-36.7 24.1 6.1 7.7 13.4 16.4 13.4 16.4 44.8-1.4 62-30.8 62-30.8.1-65.1-29.1-118.1-29.1-118.1zm-127.1 99.4c-11.4 0-20.7-10.1-20.7-22.5s9.1-22.5 20.7-22.5 20.9 10.1 20.7 22.5c0 12.3-9.2 22.5-20.7 22.5zm74 0c-11.4 0-20.7-10.1-20.7-22.5s9.1-22.5 20.7-22.5 20.7 10.1 20.7 22.5c0 12.3-9.2 22.5-20.7 22.5z'/></svg>`
  if (typeof name === 'string') {
    name = name.toLowerCase()
    if (name === 'widgetbot') icon = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 340 300' fill='${accent}'><path d='m318.43 4.0335h-292.85c-12.191 0-22.074 10.53-22.074 23.519v197.56c0 12.989 9.8834 23.519 22.074 23.519h97.2l32.333 40.956c4.1941 5.3129 10.377 8.3806 16.893 8.3806 6.5163 0 12.699-3.0669 16.893-8.3798l32.333-40.956h97.199c12.192 0 22.074-10.53 22.074-23.519v-197.56c0-12.989-9.8826-23.52-22.074-23.52zm0 221.08h-107.48l-38.949 49.336-38.948-49.336h-107.48v-197.56h292.85v197.56z'/><path d='m66.339 94.554h100.81c6.0954 0 11.037-5.2651 11.037-11.759s-4.9417-11.759-11.037-11.759h-100.81c-6.0954 0-11.037 5.2651-11.037 11.759s4.9417 11.759 11.037 11.759z'/><path d='m55.742 154.92c0 6.4943 4.9417 11.759 11.037 11.759h210.44c6.0954 0 11.037-5.2651 11.037-11.759s-4.9417-11.759-11.037-11.759h-210.44c-6.0954 0-11.037 5.2651-11.037 11.759z'/></svg>`
    if (name === 'intercom') icon = `data:image/png;base64,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`
  }
  return icon
}