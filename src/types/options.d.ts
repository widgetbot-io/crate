type url = string
type size = string

export type horizontal = 'top' | 'bottom' | number
export type vertical = 'left' | 'right' | number

interface Options {
  // Server + channel IDs
  server: string
  channel?: string

  // Dynamic username
  username?: string
  // Dynamic avatar
  avatar?: string
  // Accessibility settings
  accessibility?: string[]
  // The settings group to use
  settingsGroup?: string

  // JWT login
  token?: string

  // Where the button should appear on-screen
  location?: [horizontal, vertical]

  // The color of the button
  color?: string
  // The glyph to display on the button
  glyph?: [url, size]
  // Custom CSS to be injected into the Shadow root
  css?: string

  // Crate message notifications (non-DM)
  notifications?: boolean
  // Crate DM notifications
  dmNotifications?: boolean
  // Crate unread message indicator
  indicator?: boolean
  // Crate notification timeout
  timeout?: number

  // Enables notifications to be triggered for all channels, in crate and embed
  allChannelNotifications?: boolean
  // Embed notification timeout
  embedNotificationTimeout?: number

  // Only load the widget once the user opens it
  defer?: boolean
  // Connect to a custom WidgetBot server
  shard?: url
}

export default Options
