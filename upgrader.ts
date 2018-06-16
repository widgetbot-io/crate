const { currentScript } = document
const V3 = `https://unpkg.com/@widgetbot/crate@^3`

console.warn(
  `You're using an extended-lifetime wrapper for the Crate V2.0 API\n` +
    `Consider upgrading to V3.0 to use all the latest features. https://docs.widgetbot.io.\n` +
    `For support, https://discord.gg/25vFWfb`
)
const convertConfig = oldConfig => {
  const config = {} as any

  config.server = oldConfig.server
  config.channel = oldConfig.channel

  if (oldConfig.colors && oldConfig.colors.toggle)
    config.color = oldConfig.colors.toggle

  if (oldConfig.beta) config.shard = 'https://beta.widgetbot.io'

  if (oldConfig.logo) {
    if (typeof oldConfig.logo === 'string') {
      config.glyph = [oldConfig.logo, '50%']
    } else {
      config.glyph = [oldConfig.logo.url, oldConfig.logo.size]
    }
  }

  if (oldConfig.notifications) {
    if (oldConfig.notifications.indicator)
      config.indicator = oldConfig.notifications.indicator.enable
    if (oldConfig.notifications.toasts) {
      config.notifications = oldConfig.notifications.toasts.enable
      config.timeout = oldConfig.notifications.toasts.visibilityTime
    }
  }

  if (oldConfig.domain) config.shard = oldConfig.domain

  if (oldConfig.delay) config.defer = true

  if (oldConfig.position) {
    config.location = [oldConfig.position.y, oldConfig.position.x]
  }

  return config
}

const getUpgrader = Crate =>
  class V2 extends Crate {
    constructor(config) {
      super(convertConfig(config))

      this.oldConfig = { ...this.oldConfig, ...config }
    }

    get state() {
      return {
        classes: {},
        config: this.oldConfig,
        notifications: {
          messages: [],
          pinged: false,
          unread: 0
        },
        view: {
          opened: true,
          open: false,
          loading: true,
          modalOpen: false
        }
      }
    }

    config(newConfig) {
      this.oldConfig = { ...this.oldConfig, ...newConfig }

      const options = convertConfig(newConfig)
      this.setOptions(options)
    }

    message(content: string, timeout?: number, avatar?: string) {
      this.notify({
        content,
        avatar,
        ...(typeof timeout !== 'undefined' && { timeout })
      })
    }

    remove() {
      this.hide()
    }

    onEvent() {
      console.warn('Crate ~ onEvent deprecated')
    }

    crateEvent() {
      console.warn('Crate ~ crateEvent deprecated')
    }

    private oldConfig = {
      options: '0002',
      beta: true,
      debug: false,
      analytics: true,
      logo: {
        url:
          "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-357 161 245 240'><path fill='%23fff' d='M-145.3 217.1c-29.2-21.9-57-21.3-57-21.3l-2.8 3.2c34.5 10.5 50.5 25.8 50.5 25.8-21.1-11.6-41.8-17.2-61-19.5-14.6-1.6-28.6-1.2-41 .4-1.2 0-2.2.2-3.4.4-7.1.6-24.3 3.2-46 12.8-7.5 3.4-12 5.9-12 5.9s16.8-16 53.3-26.6l-2-2.4s-27.8-.6-57 21.3c0 0-29.2 52.9-29.2 118.2 0 0 17 29.4 61.8 30.8 0 0 7.5-9.1 13.6-16.8-25.8-7.7-35.5-23.9-35.5-23.9s2 1.4 5.7 3.4c.2.2.4.4.8.6.6.4 1.2.6 1.8 1 5.1 2.8 10.1 5.1 14.8 6.9 8.3 3.2 18.2 6.5 29.8 8.7 15.2 2.8 33.1 3.9 52.5.2 9.5-1.6 19.3-4.5 29.4-8.7 7.1-2.6 15-6.5 23.3-12 0 0-10.1 16.6-36.7 24.1 6.1 7.7 13.4 16.4 13.4 16.4 44.8-1.4 62-30.8 62-30.8.1-65.1-29.1-118.1-29.1-118.1zm-127.1 99.4c-11.4 0-20.7-10.1-20.7-22.5s9.1-22.5 20.7-22.5 20.9 10.1 20.7 22.5c0 12.3-9.2 22.5-20.7 22.5zm74 0c-11.4 0-20.7-10.1-20.7-22.5s9.1-22.5 20.7-22.5 20.7 10.1 20.7 22.5c0 12.3-9.2 22.5-20.7 22.5z'/></svg>"
      },
      theme: 'material',
      colors: {
        toggle: '#7289DA'
      },
      notifications: {
        indicator: {
          enable: true
        },
        toasts: {
          enable: true,
          visibilityTime: 10,
          maxMessages: 5,
          maxHeight: 'calc(70% - 100px)'
        }
      },
      mobile: {
        maxWidth: 500,
        maxHeight: 500
      },
      position: {
        x: 'right',
        y: 'bottom'
      },
      delay: false,
      disable: [],
      language: 'en',
      domain: 'https://widgetbot.io',
      scheme: 'dark',
      style: 'material',
      query: {
        session: '8864382554530951',
        lang: 'en'
      },
      widgetURL: null,
      url: null
    }
  }

/**
 * Upgrader
 */
const script = document.createElement('script')
script.setAttribute('src', V3)
script.setAttribute('async', 'true')
script.setAttribute('defer', 'true')
script.onload = () => {
  ;(window as any).Crate = getUpgrader((window as any).Crate)

  // Eval innerHTML
  if (currentScript) {
    eval(currentScript.innerHTML)
  }

  const event = document.createEvent('Event')
  ;(event as any).Crate = (window as any).Crate
  event.initEvent('crate', true, false)
  window.dispatchEvent(event)
}
script.onerror = () => {}

document.head.appendChild(script)
