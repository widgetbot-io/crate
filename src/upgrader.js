var crateTag = document.currentScript

var server = crateTag.getAttribute('server')
server = server.replace('|', '/').split('/')
var channel = server[1]
server = server[0]


var position = {
	x: 'right',
	y: 'bottom'
}


if (crateTag.getAttribute('left') != null) position.x = 'left'
if (crateTag.getAttribute('top') != null) position.y = 'top'


var options = '0002'
if (crateTag.getAttribute('options') != null) options = crateTag.getAttribute('options')


var beta = false
if (crateTag.getAttribute('beta') != null) beta = true


var buttons = {}
if (crateTag.getAttribute('button1')) buttons.primary = crateTag.getAttribute('button1')
if (crateTag.getAttribute('button2')) buttons.secondary = crateTag.getAttribute('button2')


var colors = {}
if (crateTag.getAttribute('color')) colors.toggle = crateTag.getAttribute('color')
if (crateTag.getAttribute('color1')) colors.background = crateTag.getAttribute('color1')
if (crateTag.getAttribute('color2')) colors.button = crateTag.getAttribute('color2')


var notifications = {
	toasts: {}
}
if (crateTag.getAttribute('notoast')) notifications.toasts.enable = false


var delay = false
if (crateTag.getAttribute('delay')) delay = true


var config = {
	server: server,
	channel: channel,
	options: options,
	delay: delay,
	beta: beta,
	colors: colors,
	buttons: buttons,
	position: position,
	notifications: notifications
}

if (crateTag.getAttribute('logo')) config.logo = crateTag.getAttribute('logo')
if (crateTag.getAttribute('discord')) config.logo = 'discord'
if (crateTag.getAttribute('intercom')) config.logo = 'intercom'


var crateUpgrader = document.createElement('script')
crateUpgrader.src = 'https://crate.widgetbot.io/v2'
document.body.appendChild(crateUpgrader)
crateUpgrader.onload = function() {
	window.crate = new Crate(config)
}