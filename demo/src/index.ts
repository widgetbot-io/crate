import Crate from '../../src'

const crate = new Crate({
  shard: 'https://e.widgetbot.io',
  server: '299881420891881473',
  channel: '355719584830980096',
  // defer: true
})

crate.on('signIn', user => {
  console.log(user)
  crate.emit('sendMessage', 'Testing')
})
