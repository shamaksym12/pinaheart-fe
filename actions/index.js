import * as types from './types.js'
import { get, message } from '../api'
import { logout } from './auth'

export const sendRequest = data => dispatch => {
	let formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('subject', data.subject)
    formData.append('message', data.message)
    if (data.file) {
    	formData.append('file', data.file)
    }
	return message(`support`, true, formData).then(res => {
		if (res.data) {
			return true
		}
	})
}
