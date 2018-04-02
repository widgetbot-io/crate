import { Config } from '../definitions/config'
import DeepMerge from './DeepMerge'
import { Icons } from './Icons'
import rateLimitedSites from '../../data/rateLimitedSites'

function rateLimited(skipped: boolean) {
  const { event } = window['globalCrate']
  event(null, {
    category: 'Rate limit',
    action: skipped ? 'Not limited' : 'Limited'
  })
  console.warn(
    `--WIDGETBOT.IO DISCORD WIDGETS--

This request ${skipped ? `wasn't` : `was`} ratelimited.

Hey there, we've noticed excessive amounts of traffic coming from the ${location.origin} domain
In order to provide a balanced experience for all our users, we've:
 - Temporarily ratelimited requests to the widgets from this domain
 - Widgets won't auto-load until manually opened by the user
For more information, join the support guild over at < https://discord.gg/25vFWfb >`)
}

/**
 * Resolves a valid configuration object, inheriting properties
 * that are undefined from the default configuration
 */
export default (state: any, config: Config, initialConfig?: boolean) => {
  return new Promise<Config>((resolve: Function, reject: Function) => {
    /**
     * Parse the configuration
     */
    if (typeof config === 'object') {
      if ((config.server && config.channel) || initialConfig !== true) {
        config = DeepMerge(state.config, config)
        /**
         * Rate limiting
         */
        if (initialConfig) {
          rateLimitedSites.forEach((site: { query: RegExp | string, block: number }) => {
            if ((site.query instanceof RegExp && site.query.test(location.href)) || (typeof site.query === 'string' && location.origin.includes(site.query))) {
              if (site.block === 1 || Math.random() > site.block) {
                config.delay = true
                rateLimited(false)
              } else {
                rateLimited(true)
              }
            }
          })
        }

        if (!config.domain) config.domain = config.beta ? 'https://beta.widgetbot.io' : 'https://widgetbot.io'

        config.options = config.options.toString()
        if (config.options.length !== 4) {
          return reject(`config.options should be 4 numbers long, but it's "${config.options.length}" characters long! with the value of "${config.options}"`)
        }

        if (!config.scheme) {
          if (config.options.charAt(2) === '1') {
            config.scheme = 'light'
          } else {
            config.scheme = 'dark'
          }
        }

        if (!/^material|discord$/.test(config.style)) config.style = 'material'

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
        if (config.username) config.query.username = config.username
        if (config.language) config.query.lang = config.language

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

        config.widgetURL = `${config.domain}/embed/${encodeURIComponent(config.server)}/${encodeURIComponent(config.channel)}/${config.options}/`
        config.url = `${config.widgetURL}${queryString(config.query)}`

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
  for (var p in object)
    if (object.hasOwnProperty(p)) {
      query.push(`${encodeURIComponent(p)}=${encodeURIComponent(object[p])}`)
    }
  return `?${query.join("&")}`
}
