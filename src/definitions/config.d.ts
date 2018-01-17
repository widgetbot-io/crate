import { Url } from "url"

export interface Config {
  /**
   * WidgetBot widget options
   */
  server   : string               // Your guilds ID
  channel  : string               // Channel ID
  options ?: string               // WidgetBot widget options
  beta    ?: boolean              // Whether to use the beta domain or not
  buttons ?: {                    // Change text of buttons
    primary   ?: string
    secondary ?: string
  }
  
  /**
   * Aesthetic options
   */
  logo    ?: Url | 'intercom' | 'discord' | any
  theme   ?: 'material' | 'default'
  colors  ?: {
    toggle     ?: string          // Crate toggle button color
    background ?: string          // WidgetBot widget background
    button     ?: string          // WidgetBot `Start chatting` button color
  }
  position: {
    x: 'left' | 'right'
    y: 'top' | 'bottom'
  }

  /**
   * Notifications
   */
  notifications?: {
    indicator?: {
      enable: boolean
    }
    toasts?: {
      enable          : boolean  // Whether to enable toasts or not
      visibilityTime ?: number   // Max amount of time the toasts should be visible for (set to 0 to disable timeout)
      maxMessages    ?: number   // Max amount of messages to display on screen
      maxHeight      ?: string   // Max height of the toast container, CSS `calc()` can be used
    }
  }

  /**
   * General options
   */
  delay  ?: boolean // Only load the widget once the button has been clicked
  debug  ?: boolean // Debug crate

  /**
   * Overrides
   */
  scheme  ?: 'dark' | 'light' // Override to prevent using the same scheme as the widget
  domain  ?: string           // Override the domain
  url     ?: string           // Override the Widget URL
  query   ?: any              // Override the query string
}