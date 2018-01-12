export interface Config {
  server: string // Could exceed Number.MAX_SAFE_INTEGER
  channel: string
  scheme?: 'dark' | 'light'
  theme?: 'material' | 'default'
  notifications?: {
    indicator?: {
      enable: boolean
    }
    toasts?: {
      enable: boolean
    }
  }
}