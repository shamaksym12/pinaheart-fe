import * as types from '../actions/types.js'

const initialState = {
	callOut: false,
	callIn: false,
	roomHash: '',
	roomId: 0,
	oponent: {},
	chatState: 'close',
	typing: '',
	oponentVideo: {},
}

const chat = (chat = initialState, action = {}) => {
	switch (action.type) {
		case types.SET_CALL_OUT:
			return Object.assign({}, chat, {
				callOut: action.value
			})
		case types.SET_CALL_IN:
			return Object.assign({}, chat, {
				callIn: action.value
			})
		case types.SET_ROOM_HASH:
			return Object.assign({}, chat, {
				roomHash: action.hash
			})
		case types.SET_ROOM_ID:
			return Object.assign({}, chat, {
				roomId: action.id
			})
		case types.SET_INVITE_OPONENT:
			return Object.assign({}, chat, {
				oponent: action.data
			})
		case types.SET_TYPING_ROOM:
			return Object.assign({}, chat, {
				typing: action.value
			})
		case types.TOGGLE_CHAT:
			return Object.assign({}, chat, {
				chatState: action.state
			})
		case types.SET_OPONENT_VIDEO:
			return Object.assign({}, chat, {
				oponentVideo: action.data
			})
		default:
			return chat
	}
}

export default chat