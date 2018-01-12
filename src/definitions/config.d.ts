import { Url } from "url"

export interface Config {
  /**
   * WidgetBot widget options
   */
  beta    ?: boolean              // Whether to use the beta domain or not
  options ?: string | number      // WidgetBot widget options
  server   : string               // Your guilds ID
  channel  : string               // Channel ID
  
  /**
   * Aesthetic options
   */
  logo    ?: Url | 'intercom' | 'discord' //
  theme   ?: 'material' | 'default'
  colors  ?: {
    toggle?: string
  }

  /**
   * Notifications
   */
  notifications?: {
    indicator?: {
      enable: boolean
    }
    toasts?: {
      enable: boolean
    }
  }

  /**
   * Overrides
   */
  scheme  ?: 'dark' | 'light' // Override to prevent using the same scheme as the widget
  domain  ?: string           // Override the domain
  url     ?: string           // Override the Widget URL
}