# Crate

[![npm version](https://img.shields.io/npm/v/@widgetbot/crate.svg?style=flat-square)](https://www.npmjs.com/package/@widgetbot/crate)
[![Docs](https://img.shields.io/badge/Docs-passing-green.svg?style=flat-square)](https://docs.widgetbot.io/crate/)
[![JSDelivr](https://data.jsdelivr.com/v1/package/npm/@widgetbot/crate/badge)](https://www.jsdelivr.com/package/npm/@widgetbot/crate)

Clean & powerful popup Discord widgets for your website.

![Demo](https://i.imgur.com/oq4W4Rk.gif)

# Usage

See the [documentation](https://docs.widgetbot.io/crate/) for more options.

```html
<script src="https://cdn.jsdelivr.net/npm/@widgetbot/crate@3" async>
  const crate = new Crate({
    server: '299881420891881473',
    channel: '355719584830980096'
  })

  crate.notify('Test notification')
  crate.on('signIn', data => {
    console.log(`Guest signed in as ${data.name}`)
    crate.emit('sendMessage', 'Hello world')
  })
</script>
```

## Telegram

Pass `chat` (instead of `server` / `channel`) and the `shard` URL of your
deployed Telegram widget host:

```html
<script src="https://cdn.jsdelivr.net/npm/@widgetbot/crate@3" async>
  const crate = new Crate({
    chat: '-1003784217881',
    shard: 'https://your-telegram-widget.example.com',
    // topic: '12', // supergroup topic, optional
  })

  crate.on('ready', () => console.log('telegram-widget ready'))
  crate.on('signIn', user => console.log('signed in as', user))
</script>
```

When `chat` is set, crate switches into Telegram mode: navigation events use
`chatId`/`topicId` and the default button color is Telegram blue. `shard` is
required in Telegram mode — there is no default host.

