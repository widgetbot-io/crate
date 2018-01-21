(function () {
  'use strict'

  var options = INSTALL_OPTIONS
  var crate

  // updateElement runs every time the options are updated.
  // Most of your code will end up inside this function.
  function renderApp () {
    crate = document.createElement('script')
    crate.src = 'https://crate.widgetbot.io/v2'
    crate.onload = function () {
      if (options.buttons) {
        for (var i = 0, len = options.buttons.length; i < len; i++) {
          var button = options.buttons[i]
          var config = {
            notifications: {
              indicator: {},
              toasts: {}
            }
          }

          config.server = button.server
          config.channel = button.channel

          config.colors = button.colors
          config.style = button.customization.style

          config.notifications.indicator.enable = button.customization.indicator
          if (button.customization.image) config.logo = button.customization.image
          config.notifications.toasts = button.customization.toasts
          config.notifications.toasts.enable = button.customization.showToasts

          switch (button.position) {
            case 'topLeft':
              config.position = { x: 'left', y: 'top' }
              break
            case 'topRight':
              config.position = { x: 'right', y: 'top' }
              break
            case 'bottomLeft':
              config.position = { x: 'left', y: 'bottom' }
              break
            case 'bottomRight':
              config.position = { x: 'right', y: 'bottom' }
              break
          }
          config.beta = button.advanced.beta
          config.delay = button.advanced.delay

          if (i === 0) {
            if (window.crate && window.crate.state) {
              // Update the state without re-mounting
              window.crate.config(config)
            } else {
              window.crate = new window.Crate(config)
            }
          } else {
            if (!window.crates) window.crates = []
            // Kill any previous crate instances
            for (var index = 0, len = window.crates.length; index < len; index++) {
              try {
                window.crates[index].remove()
                delete window.crates[index]
              } catch(e) {
                console.warn(`%c\u2604\uFE0F cloudflare-apps [Crate] %c Could not remove an existing crate instance, this *may* cause duplication issues`, 'color: #40b8ff', 'color: #fff816', e)
              }
            }
            window.crates.push(new Crate(config))
          }
        }
      }
      // window.crate = new window.Crate({

      // })
    }
    document.head.appendChild(crate)
  }

  window.INSTALL_SCOPE = {
    setOptions: function setOptions (nextOptions) {
      options = nextOptions

      renderApp()
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderApp)
  } else {
    renderApp()
  }
}())
