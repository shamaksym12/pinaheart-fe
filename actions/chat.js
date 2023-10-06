import { get, post } from '../api'
import * as types from './types.js'

export const makeCall = (id, name, avatar) => dispatch => {
	return post(`chat/room/create`, true, {receiver_id: id}).then(({data}) => {
		if (data) {
			dispatch(setCallOut(true))
			dispatch(setRoomHash(data.hash))
			dispatch(setRoomId(data.id))
			dispatch(setInviteOponent({name: name, avatar: avatar, id: id}))
		}
	})
}

export const cancelInvite = id => dispatch => {
	return post(`chat/room/cancel`, true, {oponent_id: id}).then(res => {
		// console.log(res)
	})
}

export const takeInvite = id => dispatch => {
	return post(`chat/room/connect`, true, {oponent_id: id})
}

export const setOponentVideo = data =>
	({
		type: types.SET_OPONENT_VIDEO,
		data,
	})

export const setTypingRoom = value =>
	({
		type: types.SET_TYPING_ROOM,
		value,
	})

export const toggleChat = state =>
	({
		type: types.TOGGLE_CHAT,
		state,		
	})

export const setInviteOponent = data =>
	({
		type: types.SET_INVITE_OPONENT,
		data,
	})

export const setRoomHash = hash =>
	({
		type: types.SET_ROOM_HASH,
		hash,
	})

export const setRoomId = id =>
	({
		type: types.SET_ROOM_ID,
		id,
	})

export const setCallOut = value =>
	({
		type: types.SET_CALL_OUT,
		value,
	})
export const setCallIn = value =>
	({
		type: types.SET_CALL_IN,
		value,
	})