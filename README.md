# Crate

[![npm version](https://img.shields.io/npm/v/@widgetbot/crate.svg?style=flat-square)](https://www.npmjs.com/package/@widgetbot/crate)
[![Docs](https://img.shields.io/badge/Docs-passing-green.svg?style=flat-square)](https://docs.widgetbot.io/crate/)
[![JSDelivr](https://data.jsdelivr.com/v1/package/npm/@widgetbot/crate/badge)](https://www.jsdelivr.com/package/npm/@widgetbot/crate)

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.

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
