export namespace Modal {
  export interface roles {
    color: string
    name: string
    position: number
  }

  export interface user {
    name: string
    id: string
    discriminator: string
    avatar: string
    bot: boolean
    roles: roles[]
  }
}
