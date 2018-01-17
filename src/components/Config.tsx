import { Config } from '../definitions/config'
import DeepMerge from './DeepMerge'
import { Icons } from './Icons'

/**
 * Resolves a valid configuration object, inheriting properties
 * that are undefined from the default configuration
 */
export default (state: any, config: Config) => {
  return new Promise<Config>((resolve: Function, reject: Function) => {
    /**
     * Parse the configuration
     */
    if (typeof config === 'object') {
      if (config.server && config.channel) {
        if (!config.domain) config.domain = config.beta ? 'https://beta.widgetbot.io' : 'https://widgetbot.io'
        
        if (!config.options) {
          config.options = '0002'
        } else {
          config.options = config.options.toString()
          if (config.options.length !== 4) {
            return reject(`config.options should be 4 numbers long, but it's "${config.options.length}" characters long! with the value of "${config.options}"`)
          }
        }

        if (config.position) {
          if (config.position.x && !(config.position.x == 'left' || config.position.x == 'right')) {
            return reject(`config.position.x equals "${config.position.x}" but it can only equal "left" or "right"! you likely mixed up your axes`)
          }
          if (config.position.y && !(config.position.y == 'top' || config.position.y == 'bottom')) {
            return reject(`config.position.y equals "${config.position.y}" but it can only equal "top" or "bottom"! you likely mixed up your axes`)
          }
        }
        
        if (config.logo === 'discord') config.logo = Icons(config.colors.toggle, 'discord')
        if (config.logo === 'intercom') config.logo = Icons(config.colors.toggle, 'intercom')

        if (!config.query) config.query = {
          session: state.session,
        }

        if (config.buttons) {
          if (config.buttons.primary) config.query.bu = config.buttons.primary
          if (config.buttons.secondary) config.query.bl = config.buttons.secondary
        }

        if (!config.url) config.url = `${config.domain}/embed/${encodeURIComponent(config.server)}/${encodeURIComponent(config.channel)}/${config.options}/${queryString(config.query)}`
        
        resolve(DeepMerge(state.config, config))
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
