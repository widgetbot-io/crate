export namespace Notifications {
  export class message {
    id: string
    author: {
      name: string
      discriminator: string
      bot: boolean
      avatar: string | null
      id: string
      color: string,
      roles: any
    }
    fake?: boolean
    timestamp: number
    content: string | null
    embeds: any
    editedAt: Date
    type: string
    reactions: any
    attachment: {
      url: string | null
      height: number | null
      width: number | null
    }
    mentions: {
      channels: {
        name: string
        id: string
      }[]
      members: {
        name: string
        id: string
        roles: any
        avatar: string
      }[]
      roles: {
        name: string
        color: string
        id: string
      }[]
      everyone: boolean
    }
    loading: boolean
    pinged: boolean
  }
}
