import * as types from './types.js'
import { post } from '../api'
import { setToken } from './auth'
import { setUserInfo } from './user'
import { toggleModal } from './ui'
import { Router } from '../routes'

export const register = data => dispatch => {
	// console.log(data);
	// alert('hello');
	return post(`register`, true, data).then(res => {
		if (res.data) {
			dispatch(setToken(res.data.tokens.access_token))
			dispatch(setUserInfo(res.data))
			Router.pushRoute('/matches')
			setTimeout(() => {
				dispatch(toggleModal(true, 'avatar'))
			}, 500)
		}
	})
}

export const signUpSocial = type => dispatch => {
	return post('socialite/redirect', false, {provider: type}).then(res => {
		// console.log(res.data)
		if (res.data) {
			window.location.href = res.data
		}
	})
}