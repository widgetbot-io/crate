import { Config } from '../definitions/config'
import DeepMerge from './DeepMerge'
import { Icons } from './Icons'

/**
 * Resolves a valid configuration object, inheriting properties
 * that are undefined from the default configuration
 */
export default (state: any, config: Config, relaxed?: boolean) => {
  return new Promise<Config>((resolve: Function, reject: Function) => {
    /**
     * Parse the configuration
     */
    if (typeof config === 'object') {
      if ((config.server && config.channel) || relaxed) {
        config = DeepMerge(state.config, config)
        if (!config.domain) config.domain = config.beta ? 'https://beta.widgetbot.io' : 'https://widgetbot.io'

        config.options = config.options.toString()
        if (config.options.length !== 4) {
          return reject(`config.options should be 4 numbers long, but it's "${config.options.length}" characters long! with the value of "${config.options}"`)
        }

        if (!(config.position.x == 'left' || config.position.x == 'right')) {
          return reject(`config.position.x equals "${config.position.x}" but it can only equal "left" or "right"! you likely mixed up your axes`)
        }
        if (!(config.position.y == 'top' || config.position.y == 'bottom')) {
          return reject(`config.position.y equals "${config.position.y}" but it can only equal "top" or "bottom"! you likely mixed up your axes`)
        }

        let logo = {
          url: config.logo
        }
        if (typeof config.logo === 'object' && config.logo.url) logo = config.logo
        if (config.logo.url === 'discord') config.logo.url = Icons(config.colors.toggle, 'discord')
        if (config.logo.url === 'widgetbot') config.logo.url = Icons(config.colors.toggle, 'widgetbot')
        if (config.logo.url === 'intercom') config.logo.url = Icons(config.colors.toggle, 'intercom')
        config.logo = logo

        if (!config.query) config.query = {
          session: state.session,
        }

        if (config.colors) {
          if (config.colors.background && config.colors.button) {
            config.query.c = `${config.colors.background.replace('#', '')}-${config.colors.button.replace('#', '')}`
          }
        }

        if (config.buttons) {
          // Fallback
          // @ts-ignore
          if (config.buttons.upper) config.buttons.primary = config.buttons.upper
          // @ts-ignore
          if (config.buttons.lower) config.buttons.secondary = config.buttons.lower

          if (config.buttons.primary) config.query.bu = config.buttons.primary
          if (config.buttons.secondary) config.query.bl = config.buttons.secondary
        }

        if (config.contained) config.query.contained = true

        config.url = `${config.domain}/embed/${encodeURIComponent(config.server)}/${encodeURIComponent(config.channel)}/${config.options}/${queryString(config.query)}`

        resolve(config)
      } else {
        reject(`missing the server or channel properties!`)
      }
    } else {
      reject(`not an object!`)
    }
  })
}

export function queryString(object: any) {
  let query = []
  for(var p in object)
    if (object.hasOwnProperty(p)) {
      query.push(`${encodeURIComponent(p)}=${encodeURIComponent(object[p])}`)
    }
  return `?${query.join("&")}`
}
