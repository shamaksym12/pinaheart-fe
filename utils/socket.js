import Echo from 'laravel-echo'
import Socketio from 'socket.io-client'
import store from '../store'
import { addSocetMessadge, addMessadgeCounte, removeMessadgeCounte, getDialogList } from '../actions/dialog'
import { setOpenSocket, getUserFullInfo, getUserInfo, setOnlineUsers, addOnlineUsers, removeOnlineUsers } from '../actions/user'
import { getUnreadMessage, getMail } from '../actions/message'
import { setCallIn, setCallOut, setRoomHash, setRoomId, setInviteOponent, toggleChat, setTypingRoom, setOponentVideo } from '../actions/chat'
import { logout } from '../actions/auth'
import { setAlert } from '../actions/ui'
import { Router } from '../routes'
import dialog from '../reducers/dialog';

var globalEcho
var globalChat
var globalOnline
var globalRoom

export const openSocket = () => {
	const { user } = store.getState()
	if (user.data.id && !user.openSocket) {
		const { dispatch } = store
		const echo = new Echo({
			broadcaster: 'socket.io',
			host: `${window.location.hostname}:6001`,
			// host: `https://api.pinaheart.com:6001`,
			client: Socketio,
			auth: {
				headers: {
					'Authorization': `Bearer ${user.token}`,
				},
			},
		})
		globalEcho = echo
		const channel = echo.private(`user.${user.data.id}`)
		// const publicChannel = echo.channel('public')
		// const onlineChannel = echo.join('presence-channel')
		//const chat = echo.private(`chat`)
		// globalOnline = onlineChannel

		// onlineChannel.here(userIds => {
		// 		dispatch(setOnlineUsers(userIds))
		// 	})
		// 	.joining(id => {
		// 		dispatch(addOnlineUsers(id))
		// 	})
		// 	.leaving(id => {
		// 		dispatch(removeOnlineUsers(id))
		// 	})

		// <<<<<<< HEAD
		// 	  	publicChannel.listen('.NeedReload', ({data}) => {
		// 	  		if (data) {
		// 	  			window.location.reload(true)
		// 	  		}
		// 		  })

		// 		channel.listen('.WhenNewMessage', ({message}) => {
		// 			// When i have new mesedge
		// 		})
		// 	  	// dispatch(setOpenSocket(true))
		// >>>>>>> 44f82f510703de3903ca32735bd0dff450d782e2

		// publicChannel.listen('.NeedReload', ({data}) => {
		// 	if (data) {
		// 		window.location.reload(true)
		// 	}
		//   })

		channel.listen('.onNewMessage', ({ message }) => {
			if (Router.router.query.id == message.dialog_id) {
				dispatch(addSocetMessadge(message))
			} else dispatch(addMessadgeCounte())
			if (Router.router.route == "/messages") {
				dispatch(getDialogList())
			}

		})

		channel.listen('.onReadMessages', ({ count }) => {
			dispatch(removeMessadgeCounte(count))
		})

		channel.listen('.onLogout', () => {
			dispatch(logout())
		})

		channel.listen('.onAdminUpdated', () => {
			window.location.reload()
		})

		// channel.listen('.WhenMessageTranslate', ({data}) => {
		// 	if (data) {
		// 		dispatch(getUnreadMessage())
		// 		const slug = Router.router.query.slug
		// 		if (slug) {
		// 			dispatch(getMail(slug))
		// 		}
		// 	}
		// })

		// channel.listen('.WhenUserLogin', ({token}) => {
		// 	if (token !== user.token) {
		// 		dispatch(logout()).then(res => {
		// 			window.location.href = '/'
		// 		})
		// 	}
		// })

		// channel.listen('.WhenAdminChangeUser', ({data}) => {
		// 	if (data) {
		// 		dispatch(getUserInfo())
		// 		dispatch(getUserFullInfo())
		// 	}
		// })
	}
}

export const closeSocket = () => {
	const { user } = store.getState()
	const { dispatch } = store

	if (globalEcho) {
		globalEcho.leave(`user.${user.data.id}`)
		globalEcho.leave(`presence-channel`)
		dispatch(setOpenSocket(false))
	}
}