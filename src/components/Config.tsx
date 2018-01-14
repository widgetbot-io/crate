import { Config } from '../definitions/config'

export default (config: Config) => {
  return new Promise<Config>((resolve: Function, reject: Function) => {
    /**
     * Parse the configuration
     */
    if (typeof config === 'object') {
      if (config.server && config.channel) {
        if (!config.domain) config.domain = config.beta ? 'https://beta.widgetbot.io' : 'https://widgetbot.io'
        if (!config.options) config.options = '0002'
        if (!config.query) config.query = {
          session: +new Date(),
        }
        if (!config.url) config.url = `${config.domain}/embed/${encodeURIComponent(config.server)}/${encodeURIComponent(config.channel)}/${config.options}/${queryString(config.query)}`
        resolve(config)
      } else {
        reject(`Invalid configuration (missing the server or channel properties)! refer to https://github.com/widgetbot-io/crate`)
      }
    } else {
      reject('Invalid configuration (not an object)! refer to https://github.com/widgetbot-io/crate')
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
