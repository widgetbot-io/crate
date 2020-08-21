import { Client, IClient } from '@widgetbot/embed-api'

export interface Events extends IClient.Events {}

export type Event = keyof Events

export type API = Client & {
  on: <T extends Event>(event: T, callback: (data: Events[T]) => void) => void
}
