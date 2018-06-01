import { Config } from './config'

export interface View {
  view: {
    open: boolean
    opened: boolean // Has to be set to true for the iframe to render
    loading: boolean
    modalOpen: boolean
  }
  config: any | Config
  event(data: Object)
}
