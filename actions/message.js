import * as types from './types.js'
import { post, message, get, remove } from '../api'
import {  getUserInfo, setUserInfo } from './user'

export const sendMessage = data => dispatch => {
	let formData = new FormData()
    if (data.attachment.length) {
        data.attachment.forEach(item => {
            formData.append('attachment[]', item)
        })
    }
    formData.append('original', data.original)
    formData.append('receiver_id', data.receiver_id)
    
	return message(`user/message/send`, true, formData).then(res => {
		if (res.data) {
			return true
		} else if (res.validate) {
			if (res.validate['_service']) {
				return res.validate
			}
		}
	})
}

export const buyMessage = data => dispatch => {
	let formData = new FormData()
    if (data.attachment.length) {
        data.attachment.forEach(item => {
            formData.append('attachment[]', item)
        })
    }
    formData.append('original', data.original)
    formData.append('receiver_id', data.receiver_id)

    return message(`user/message/buy`, true, formData).then(res => {
    	if (res.data) {
    		dispatch(getUserInfo())
    		return true
    	}
    })
}

export const getMail = type => dispatch =>
	get(`user/message/${type}`).then(({data}) => {
		if (data) {
			dispatch(setMessages(data, type))
		}
	})

export const getMessage = (id, key) => dispatch =>
	get(`user/message/${key}/${id}`).then(({data}) => {
		if (data) {
			dispatch(setMessage(data))
			dispatch(getUnreadMessage())
			return data
		}
	})

export const getUnreadMessage = () => dispatch =>
	get(`user/all-unread-message`).then(({data}) => {
		if (data) {
			dispatch(setUserInfo({unread_message: data.count}))
		}
	})

export const removeMessage = (id, type) => dispatch =>
	remove(`user/message/${id}/remove`, true).then(({data}) => {
		if (data) {
			dispatch(getMail(type))
		}
	})

export const removeMessagePermanent = (id, type) => dispatch =>
	remove(`user/message/${id}/removepermanent`, true).then(({data}) => {
		if (data) {
			dispatch(getMail(type))
			dispatch(getUnreadMessage())
		}
	})

export const restoreMessage = (id, type) => dispatch =>
	get(`user/message/${id}/restore`).then(({data}) => {
		if (data) {
			dispatch(getMail(type))
			return true
		}
	})

export const saveDraft = data => dispatch => {
	let formData = new FormData()
    if (data.attachment.length) {
        data.attachment.forEach(item => {
            formData.append('attachment[]', item)
        })
    }
    formData.append('original', data.original)
    formData.append('receiver_id', data.receiver_id)

	return message(`user/message/draft${data.id ? `/${data.id}` : ''}`, true, formData).then(res => {
		if (res.data) {
			return true
		}
	})
}

export const removeDraft = id => dispatch =>
	remove(`user/message/draft/${id}`, true).then(({data}) => {
		if (data) {
			dispatch(getMail('draft'))
			return true
		}
	})

export const showAttach = data => dispatch =>
	post(`user/message/attachment/see`, true, data).then(res => {
		if (res.data) {
			dispatch(setMessage(res.data))
			return true
		}
		return false
	})

export const buyAttach = data => dispatch =>
	post(`user/message/attachment/buy`, true, data).then(res => {
		if (res.data) {
			dispatch(setMessage(res.data))
			dispatch(getUserInfo())
		}
	})

export const setMessagesKey = (key, value) =>
	({
		type: types.SET_MESSAGES_KEY,
		key,
		value,
	})

export const setBuyingAttach = data =>
	({
		type: types.SET_BUYING_ATTACH,
		data,
	})

export const setSendingMessage = data =>
	({
		type: types.SET_SENDING_MESSAGE,
		data,
	})

export const setNewMessage = data =>
	({
		type: types.SET_NEW_MESSAGE,
		data,
	})

export const setMessage = data =>
	({
		type: types.SET_MESSAGE,
		data
	})

export const setMessages = (data, key) =>
	({
		type: types.SET_MESSAGES,
		data,
		key	
	})

export const addAttachMessage = data =>
	({
		type: types.ADD_ATTACH_MESSAGE,
		data,
	})

export const addAttachDraft = data =>
	({
		type: types.ADD_ATTACH_DRAFT,
		data,
	})

export const clearAttachDraft = key =>
	({
		type: types.CLEAR_ATTACH_DRAFT,
		key,
	})

export const clearAttachMessage = key =>
	({
		type: types.CLEAR_ATTACH_MESSAGE,
		key,
	})

export const clearAttachAll = () =>
	({
		type: types.CLEAR_ATTACH_ALL
	})