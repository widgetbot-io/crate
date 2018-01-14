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
        if (!config.url) config.url = `${config.domain}/embed/${encodeURIComponent(config.server)}/${encodeURIComponent(config.channel)}/${config.options}/?crate=true`
        resolve(config)
      } else {
        reject(`Invalid configuration (missing the server or channel properties)! refer to https://github.com/widgetbot-io/crate`)
      }
    } else {
      reject('Invalid configuration (not an object)! refer to https://github.com/widgetbot-io/crate')
    }
  })
}