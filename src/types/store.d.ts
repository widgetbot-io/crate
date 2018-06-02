import Options from './options'

export interface Message {
  content: string
  id?: string
  avatar?: string
  visible?: boolean
}

export interface Notification extends Message {
  id: string
}

export interface State {
  open: boolean
  options: Options
  notifications: Notification[]
}
