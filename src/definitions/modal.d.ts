export namespace Modal {
  export class roles {
    color: string
    name: string
    position: number
  }

  export class user {
    name: string
    id: string
    discriminator: string
    avatar: string
    bot: boolean
    roles: roles[]
  }
}