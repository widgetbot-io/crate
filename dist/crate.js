/*
    _________                __          
    \_   ___ \____________ _/  |_  ____  
    /    \  \/\_  __ \__  \\   __\/ __ \ 
    \     \____|  | \// __ \|  | \  ___/ 
     \______  /|__|  (____  /__|  \___  >
            \/            \/          \/ 
    - - - - - - - - - - - - - - - - - - -

            Copyright Sam Denty 2018
 https://samdd.me - https://discord.gg/yN2x7sp
                     ---
             Distributed under the 
    Attribution-NonCommercial-NoDerivatives 
           4.0 International License
                     ---

     Intellectual property of WidgetBot
      widgetbot.io - discord.gg/wXt3sCG
______________________________________________

BUILD TIME: 18:38:13  (01/16/18)  [1516127893]
______________________________________________

            _   _             
    ___ ___| |_|_|___ ___ ___ 
   | . | . |  _| | . |   |_ -|
   |___|  _|_| |_|___|_|_|___|
       |_|                    

- server        : [STRING]    WidgetBot server tags     ~ format: `123/123` `123|123`
- options       : [STRING]    WidgetBot server options  ~ format: `0002` `0|0|0|2`
- delay         : [OPTION]    Prevents loading of WidgetBot embed frame on load, instead it's loaded once the button is clicked for first time
- defer         : [OPTION]    Load the Crate source, only after the page has finished loading (increases page load times)
- notoast       : [OPTION]    Disable message toasts
- autoopen      : [OPTION]    Automatically open the Widget on every page load
- ignore        : [OPTION]    Ignore cookies that open the widget on page load
- quiet         : [OPTION]    Suppress all console.log's
- interval      : [NUMBER]    Wait a certain amount of milliseconds before showing WidgetBot toggle icon
- execute       : [JSCODE]    Execute javascript after crate has fully loaded

WIDGETBOT EMBED CUSTOMIZATION
- beta          : [OPTION]    Load the beta version of WidgetBot
- button1       : [STRING]    Open discord    /  Click to join
- button2       : [STRING]    Start chatting  /  people in this guild
- color1        : [HEX   ]    Custom background-color for the widget  ~ format: `ffffff` `000000`
- color2        : [HEX   ]    Custom button for the widget            ~ format: `ffffff` `000000`
- username      : [STRING]    Use a static username for all chatters
- avatar        : [URL   ]    Use a custom avatar for guest chatters
- params        : [STRING]    Append custom parameters to the widget URL ~ format: `a=hello&b=world`

STYLE CUSTOMIZATION
- css           : [URL]       Load an external Crate stylesheet (instead of included one) ~ see https://crate.widgetbot.io/crate.css
- color         : [STRING]    Change the Crate toggle button color
- logo          : [URL  ]     Change the Crate toggle button logo
- theme-color   : [STRING]    Choose a custom theme-color to be switched to when crate is expanded (Chrome-Mobile only)
- top           : [OPTION]    Float on top of screen
- left          : [OPTION]    Float on left of screen
- slide         : [OPTION]    Slide in animation on page load (instead of pop in animation)
- intercom      : [OPTION]    Style the toggle icon according to the inter.com style
- discord       : [OPTION]    Use a discord logo instead of the WidgetBot logo

     _    ____ ___ 
    / \  |  _ \_ _|
   / _ \ | |_) | | 
  / ___ \|  __/| | 
 /_/   \_\_|  |___|


 crate.start()    |  Start the crate service
 crate.stop()     |  Stop the crate service
 crate.toggle()   |  Toggle the widget
 crate.open()     |  Open the widget
 crate.close()    |  Close the widget
*******************************************************************************************************/

if (!document.getElementsByClassName("WidgetBot__crate")[0]) {
	var root = document.getElementsByTagName('html')[0],
		crateDiv,
		crateTag = document.currentScript,
		link,
		crateFrame,
		crateLoading,
		crateIframe,
		crateToggle,
		crateToggleButton,
		crateToggleButtonClose,
		crateToasts,
		unread,
		overideWidgetBotLogo = false,
		wAttempts = 0,
		unreadMessages = 0,
		themeColor,
		defaultThemeColor = "";

	// Get default theme-color
	if (document.querySelector("meta[name=theme-color]")) {
		themeColor = document.querySelector("meta[name=theme-color]")
		defaultThemeColor = themeColor.content
	} else {
		themeColor = document.createElement('meta');
		themeColor.content = defaultThemeColor
		themeColor.name = "theme-color"
		document.getElementsByTagName('head')[0].appendChild(themeColor)
	}

	/*setInterval(function(){
		if(currentState != crateTag.attributes) {
			crate.restart()
		}
		console.log(currentState)
		console.log(crateTag.attributes)
	}, 2000);*/

	window.crate = class crate {
		static start() {
			// Log some stuff before continuing
			if (crateTag.getAttribute('server')) {
				if (!crate.quiet) console.log('%c[crate.widgetbot.io] ', 'color: #7289DA', 'Server & guild : ' + crateTag.getAttribute('server'))
				if (crateTag.getAttribute('options')) {
					if (!crate.quiet) console.log('%c[crate.widgetbot.io] ', 'color: #7289DA', 'Options        : ' + crateTag.getAttribute('options'))
				} else {
					if (!crate.quiet) console.log('%c[crate.widgetbot.io] ', 'color: #7289DA', 'No \'options\' parameter passed to script tag! defaulting to \'0000\'')
				}
				if (crateTag.getAttribute('css'))
					if (!crate.quiet) console.log('%c[crate.widgetbot.io] ', 'color: #7289DA', 'Using custom CSS stylesheet \'' + crate.css + '\'')
				if (crateTag.getAttribute('beta') != null)
					if (!crate.quiet) console.log('%c[crate.widgetbot.io] ', 'color: #7289DA', 'Using BETA server (https://beta.widgetbot.io)')
			} else {
				if (!crate.quiet) console.log('%c[crate.widgetbot.io] ', 'color: #f44336', 'ERROR: No \'server\' parameter passed to script tag!')
				throw new Error("crate.widgetbot.io [ERROR]   See above ^")
			}

			// Append stylesheet ~ user generated or default
			link = document.createElement('link')
			link.setAttribute('rel', 'stylesheet')
			link.type = 'text/css'
			if (crate.css)
				link.href = crate.css
			else
				link.href = crate.location + 'crate.css'
			document.head.insertBefore(link, document.head.firstChild)

			// Append the main Crate element
			crateDiv = document.createElement('div')
			crateDiv.classList.add('crate')
			crateDiv.classList.add('widgetbot')
			crateDiv.classList.add('io')
			crateDiv.id = "WidgetBot__crate"
			crateDiv.style.display = "none" // CSS should override this

			// Add classes depending on configuration
			if (crateTag.getAttribute('left') != null) crateDiv.classList.add('WidgetBot__left')
			if (crateTag.getAttribute('slide') == null)
				crateDiv.classList.add('WidgetBot__pop')
			else
				crateDiv.classList.add('WidgetBot__slide')
			if (crateTag.getAttribute('top') != null) crateDiv.classList.add('WidgetBot__top')
			if (crateTag.getAttribute('intercom') != null) crateDiv.classList.add('WidgetBot__intercom')
			if (crate.options.substr(-2, 1) == 1) crateDiv.classList.add('WidgetBot__light')

			// Append crate iframe tag
			crateFrame = document.createElement('div')
			crateFrame.classList.add('WidgetBot__frame')
			crateFrame.id = "WidgetBot__frame"
			crateFrame.style.opacity = 0
			crateLoading = document.createElementNS("http://www.w3.org/2000/svg", "svg")
			crateLoading.classList.add('WidgetBot__loading')
			crateLoading.innerHTML = '<path fill="#7289da" d="M231.857 268.344l44.317 45.268-47.03 46.043-44.318-45.267z"></path><path fill="#7289da" d="M77.5 104h306v210h-306z"></path><path d="M376.926 84.533H84.074C71.884 84.533 62 95.063 62 108.052V305.61c0 12.989 9.883 23.519 22.074 23.519h97.2l32.333 40.956c4.194 5.313 10.377 8.381 16.894 8.381 6.516 0 12.699-3.067 16.893-8.38l32.333-40.956h97.199c12.191 0 22.074-10.53 22.074-23.52V108.054c0-12.99-9.883-23.52-22.074-23.52zm0 221.077H269.449L230.5 354.946l-38.948-49.336H84.074V108.052h292.852V305.61z" fill="#fff"></path><path d="M124.84 175.054h100.805c6.096 0 11.037-5.265 11.037-11.76s-4.941-11.759-11.037-11.759H124.84c-6.095 0-11.037 5.265-11.037 11.76s4.942 11.759 11.037 11.759zM114.242 235.419c0 6.494 4.942 11.76 11.037 11.76h210.442c6.095 0 11.037-5.266 11.037-11.76s-4.942-11.76-11.037-11.76H125.279c-6.095 0-11.037 5.266-11.037 11.76z" fill="#fff"></path>'
			crateIframe = document.createElement('iframe')
			crateIframe.classList.add('WidgetBot__frame--tag')
			// If autoopen load chat
			if (crateTag.getAttribute('ignore') == null && (crateTag.getAttribute('autoopen') != null || crateTag.getAttribute('delay') == null || crate.readCookie(crate.server + crate.options) == "true") && window.innerWidth > 670) {
				crateIframe.src = crate.requestURI
				crate.openSocket()
			}
			crateFrame.appendChild(crateLoading)
			crateFrame.appendChild(crateIframe)
			crateDiv.appendChild(crateFrame)

			crateToggle = document.createElement('div')
			crateToggle.classList.add('WidgetBot__toggle')
			crateToggle.id = "WidgetBot__toggle"
			crateToggle.onclick = function () {
				crate.toggle()
			}
			crateToggleButton = document.createElement('div')
			crateToggleButton.classList.add('WidgetBot__toggle-open-button')
			crateToggleButtonClose = document.createElement('div')
			crateToggleButtonClose.classList.add('WidgetBot__toggle-close-button')
			unread = document.createElement('div')
			unread.classList.add('WidgetBot__unread')
			crate.variables()
			crateToggle.appendChild(crateToggleButton)
			crateToggle.appendChild(crateToggleButtonClose)
			crateToggle.appendChild(unread)

			crateDiv.insertAdjacentElement('beforeend', crateToggle)

			if (crate.toast) {
				crateToasts = document.createElement('div')
				crateToasts.classList.add('WidgetBot__messages')
				crateToasts.id = "WidgetBot__messages"
				crateDiv.insertAdjacentElement('beforeend', crateToasts)
			}

			document.body.appendChild(crateDiv)
			return true
		}
		static stop() {
			if (document.body.contains(crateDiv) || document.body.contains(link)) {
				crateDiv.remove()
				link.remove()
				if (!crate.quiet) console.log('%c[crate.widgetbot.io] ', 'color:#4CAF50', 'Stopped current Crate process, use `crate.start()` to re-start it')
				wAttempts = 0
				unreadMessages = 0
				return true
			} else {
				if (!crate.quiet) console.log('%c[crate.widgetbot.io] ', 'color:#f44336', 'Failed to locate Crate process')
				return false
			}
		}
		static restart() {
			try {
				crate.stop()
				crate.start()
			} catch (e) {
				console.error(e)
				return false
			} finally {
				return true
			}
		}
		static toggle() {
			if (crateDiv.classList.contains("WidgetBot__expand")) {
				crate.close()
				return "closed"
			} else {
				crate.open()
				return "opened"
			}
		}
		static open() {
			if (crateDiv.classList.contains("WidgetBot__expand")) {
				if (!crate.quiet) console.log('%c[crate.widgetbot.io] ', 'color:#f44336', 'Widget is already open!')
				return false
			}
			if (crate.toast) crateToasts.innerHTML = ''
			// Update unread dot indicator
			crate.unread(0)
			// If the frame doesn't have the src attribute, set it
			if (!crateIframe.src) {
				crateIframe.src = crate.requestURI
				crate.openSocket()
			}
			// Add the block class
			crateDiv.classList.add('WidgetBot__block')
			// Add the expand class ~ timeout to allow rendering of none => block
			setTimeout(function () {
				crateDiv.classList.add("WidgetBot__expand")
			}, 50)
			// Change the theme-color to either light or dark (or user-defined)
			setTimeout(function () {
				if (crateTag.getAttribute('theme-color')) {
					// Custom theme-color
					themeColor.setAttribute("content", crateTag.getAttribute('theme-color'))
				} else if (crate.options.substr(-2, 1) == 1) {
					// Light mode theme-color
					themeColor.setAttribute("content", "#FFFFFF");
				} else {
					// Dark mode theme-color
					themeColor.setAttribute("content", "#37393E");
				}
			}, 100)
			// Add class to root tag, so CSS can be targeted to any element in the DOM
			root.classList.add('WidgetBot__expand')
			// Create / update a cookie to keep the widget expanded
			document.cookie = crate.server + crate.options + "=true"
			return true
		}
		static close() {
			if (!crateDiv.classList.contains("WidgetBot__expand")) {
				if (!crate.quiet) console.log('%c[crate.widgetbot.io] ', 'color:#f44336', 'Widget is already closed!')
				return false
			}
			// Remove all toasts from DOM
			if (crate.toast) crateToasts.innerHTML = ''
			// Update unread dot indicator
			crate.unread(0)
			// Remove expand class ~ fadeout
			crateDiv.classList.remove('WidgetBot__expand')
			// Remove block class
			setTimeout(function () {
				crateDiv.classList.remove("WidgetBot__block")
			}, 50)
			// Remove expand class from root HTML tag
			root.classList.remove('WidgetBot__expand')
			// Change the theme-color back to default (or undefined)
			themeColor.setAttribute("content", defaultThemeColor);
			// Delete expanded cookie (if it exists)
			document.cookie = crate.server + crate.options + "=; Max-Age=0"
			return true
		}
		static openSocket() {
			window.addEventListener('message', crate.newPacket, false)
			return true
		}
		static newPacket(packet) {
			if (typeof packet.data === 'object') {
				if (packet.data.loading === false) crateFrame.removeChild(crateLoading)
			}
			if (!document.getElementsByClassName("crate widgetbot io")[0].classList.contains("WidgetBot__expand")) {
				// Make sure the packet is actually from WidgetBot by verifying author ID
				try {
					if (!packet.data.author.id || !packet.data.content || ((packet.data.author.id == "111783814740594688" || packet.data.author.id == "294916911194570754") && packet.data.content.startsWith(">execute"))) return
				} catch (e) {
					return
				}
				if (crate.toast) {
					var message = packet.data
					var toast = document.createElement('span')

					var avatar = document.createElement('img')
					if (message.author.avatar)
						avatar.src = message.author.avatar
					else
						avatar.src = "https://i.imgur.com/u9INQM3.png"

					var span = document.createElement('span')
					span.innerHTML = packet.data.content
						.replace(/&/g, '&amp;')
						.replace(/</g, '&lt;')
						.replace(/>/g, '&gt;')
						.replace(/\"/g, '&quot;')
						.replace(/\'/g, '&#39;')
						.replace(/\//g, '&#x2F;')

					toast.appendChild(avatar)
					toast.appendChild(span)

					crateToasts.insertAdjacentElement('afterbegin', toast)
					crateToasts.scrollTop = crateToasts.scrollHeight;
				}

				unreadMessages++
				crate.unread()

				if (!crate.quiet) {
					console.log('%c[crate.widgetbot.io] ', 'color: #FFA500', "New message received")
					console.log(message)
				}
			}
		}
		static get location() {
			var dir = crateTag.getAttribute('src').split('?')[0],
				dir = dir.split('/').slice(0, -1).join('/') + '/'
			if (dir == "/") dir = "./"
			return dir
		}
		static unread(num) {
			if (typeof num !== 'undefined') unreadMessages = num
			if (unreadMessages == 0) {
				unread.innerHTML = ''
			} else if (unreadMessages > 9) {
				unread.innerHTML = "9"
			} else {
				unread.innerHTML = unreadMessages
			}
			return true
		}
		static get requestURI() {
			var wServer
			if (crateTag.getAttribute('beta') != null)
				wServer = "https://beta.widgetbot.io/embed/"
			else
				wServer = "https://widgetbot.io/embed/"
			if (!crate.quiet) console.log(wServer + crate.server + "/" + crate.options + "/" + crate.params)
			return wServer + crate.server + "/" + crate.options + "/" + crate.params
		}
		static get options() {
			if (crateTag.getAttribute('options'))
				return crateTag.getAttribute('options').replace(/\|/g, "")
			else
				return "0000"
		}
		static get quiet() {
			if (crateTag.getAttribute('quiet') != null)
				return true
			else
				return false
		}
		static get toast() {
			if (crateTag.getAttribute('notoast') != null)
				return false
			else
				return true
		}
		static get interval() {
			if (crateTag.getAttribute('interval'))
				return crateTag.getAttribute('interval')
			else
				return 100
		}
		static get server() {
			if (!crateTag.getAttribute('server'))
				return ""
			else
				return crateTag.getAttribute('server').replace("|", "/")
		}
		static variables() {
			var logo
			if (crateTag.getAttribute('logo') && !overideWidgetBotLogo) {
				logo = crateTag.getAttribute('logo')
				if (!logo.includes('//')) logo = window.location.origin + '/' + logo
				crateToggle.style.setProperty('--crate-toggle-logo', "url(" + logo + ")")
			} else {
				if (crateTag.getAttribute('intercom') != null)
					logo = "data:image/png;base64,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"
				else if (crateTag.getAttribute('discord') !== null)
					logo = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%22-357%20161%20245%20240%22%3E%3Cpath%20fill%3D%22%23fff%22%20d%3D%22M-145.3%20217.1c-29.2-21.9-57-21.3-57-21.3l-2.8%203.2c34.5%2010.5%2050.5%2025.8%2050.5%2025.8-21.1-11.6-41.8-17.2-61-19.5-14.6-1.6-28.6-1.2-41%20.4-1.2%200-2.2.2-3.4.4-7.1.6-24.3%203.2-46%2012.8-7.5%203.4-12%205.9-12%205.9s16.8-16%2053.3-26.6l-2-2.4s-27.8-.6-57%2021.3c0%200-29.2%2052.9-29.2%20118.2%200%200%2017%2029.4%2061.8%2030.8%200%200%207.5-9.1%2013.6-16.8-25.8-7.7-35.5-23.9-35.5-23.9s2%201.4%205.7%203.4c.2.2.4.4.8.6.6.4%201.2.6%201.8%201%205.1%202.8%2010.1%205.1%2014.8%206.9%208.3%203.2%2018.2%206.5%2029.8%208.7%2015.2%202.8%2033.1%203.9%2052.5.2%209.5-1.6%2019.3-4.5%2029.4-8.7%207.1-2.6%2015-6.5%2023.3-12%200%200-10.1%2016.6-36.7%2024.1%206.1%207.7%2013.4%2016.4%2013.4%2016.4%2044.8-1.4%2062-30.8%2062-30.8.1-65.1-29.1-118.1-29.1-118.1zm-127.1%2099.4c-11.4%200-20.7-10.1-20.7-22.5s9.1-22.5%2020.7-22.5%2020.9%2010.1%2020.7%2022.5c0%2012.3-9.2%2022.5-20.7%2022.5zm74%200c-11.4%200-20.7-10.1-20.7-22.5s9.1-22.5%2020.7-22.5%2020.7%2010.1%2020.7%2022.5c0%2012.3-9.2%2022.5-20.7%2022.5z%22%2F%3E%3C%2Fsvg%3E"
				else
					logo = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 340 300' fill='%23fff'%3E%3Cpath d='m318.43 4.0335h-292.85c-12.191 0-22.074 10.53-22.074 23.519v197.56c0 12.989 9.8834 23.519 22.074 23.519h97.2l32.333 40.956c4.1941 5.3129 10.377 8.3806 16.893 8.3806 6.5163 0 12.699-3.0669 16.893-8.3798l32.333-40.956h97.199c12.192 0 22.074-10.53 22.074-23.519v-197.56c0-12.989-9.8826-23.52-22.074-23.52zm0 221.08h-107.48l-38.949 49.336-38.948-49.336h-107.48v-197.56h292.85v197.56z'/%3E%3Cpath d='m66.339 94.554h100.81c6.0954 0 11.037-5.2651 11.037-11.759s-4.9417-11.759-11.037-11.759h-100.81c-6.0954 0-11.037 5.2651-11.037 11.759s4.9417 11.759 11.037 11.759z'/%3E%3Cpath d='m55.742 154.92c0 6.4943 4.9417 11.759 11.037 11.759h210.44c6.0954 0 11.037-5.2651 11.037-11.759s-4.9417-11.759-11.037-11.759h-210.44c-6.0954 0-11.037 5.2651-11.037 11.759z'/%3E%3C/svg%3E"
				crateToggleButton.style.setProperty('--crate-toggle-logo', 'url("' + logo + '")')
			}
			// Preload image and fallback to default if invalid
			var preload = new Image()
			preload.src = logo
			preload.onload = function () {
				setTimeout(function () {
					if (!logo.includes("data:image") && !crate.quiet) console.log('%c[crate.widgetbot.io] ', 'color: #7289DA', "Loaded image from '" + logo + "'")
					crateDiv.classList.add('WidgetBot__show')
					if (crateTag.getAttribute('execute')) eval(crateTag.getAttribute('execute'))
					// If autoopen param set add class
					if (crateTag.getAttribute('ignore') == null && (crateTag.getAttribute('autoopen') != null || crate.readCookie(crate.server + crate.options) == "true") && window.innerWidth > 670) {
						crateDiv.classList.add('WidgetBot__block')
						setTimeout(function () {
							crateDiv.classList.add("WidgetBot__expand")
						}, 50)
						root.classList.add('WidgetBot__expand')
					}
				}, crate.interval)
			}
			preload.onerror = function () {
				wAttempts++
				if (wAttempts > 2) throw new Error("crate.widgetbot.io [ERROR]   See above ^")
				if (!crate.quiet) console.log('%c[crate.widgetbot.io] ', 'color: #f44336', "Failed to load image at '" + logo + "', defaulting")
				overideWidgetBotLogo = true
				crate.variables
			}
			if (crateTag.getAttribute('color')) crateToggle.style.setProperty('--crate-toggle-color', crateTag.getAttribute('color'))
		}
		static get params() {
			var params = ""
			if (crateTag.getAttribute('button1')) params += "&bu=" + encodeURIComponent(crateTag.getAttribute('button1'))
			if (crateTag.getAttribute('button2')) params += "&bl=" + encodeURIComponent(crateTag.getAttribute('button2'))
			if (crateTag.getAttribute('avatar')) params += "&avatar=" + encodeURIComponent(crateTag.getAttribute('avatar'))
			if (crateTag.getAttribute('username')) params += "&username=" + encodeURIComponent(crateTag.getAttribute('username'))
			if (crateTag.getAttribute('color1') || crateTag.getAttribute('color2')) {
				if (crateTag.getAttribute('color1'))
					params += "&c=" + encodeURIComponent(crateTag.getAttribute('color1').replace('#', ''))
				else
					params += "&c=2F3136"
				if (crateTag.getAttribute('color2')) params += "-" + encodeURIComponent(crateTag.getAttribute('color2').replace('#', ''))
			}
			if (crateTag.getAttribute('params')) params += "&" + crateTag.getAttribute('params')
			if (params) params = "?" + params.substring(1)
			return params
		}
		static get css() {
			return crateTag.getAttribute('css')
		}
		static kill() {
			crate.stop()
		}
		static readCookie(name) {
			var nameEQ = name + "="
			var ca = document.cookie.split(';')
			for (let i = 0; i < ca.length; i++) {
				var c = ca[i]
				while (c.charAt(0) == ' ') c = c.substring(1, c.length)
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
			}
			return null
		}
	}
	crate.start()
} else {
	console.log('%c[crate.widgetbot.io] ', 'color: #f44336', 'ERROR: Crate already loaded!')
	throw new Error("crate.widgetbot.io [ERROR]   See above ^")
}