import { get, post, image, } from '../api'
import * as types from './types.js'
import Cookies from 'js-cookie'
import { toggleModal, setUiKey } from './ui'
import { Router } from '../routes'
import { setUserInfo, getUserInfo } from './user'
import { closeSocket } from '../utils/socket'

export const login = data => dispatch => {
	return post('login', true, data).then(res => {		
		if (res.data) {
			dispatch(toggleModal(false, 'login'))
			dispatch(setToken(res.data.tokens.access_token))
			// console.log(res.data.photos_count)
			if (!res.data.photos_count) {
				dispatch(toggleModal(true, 'avatar'))
			}
			Cookies.set('login', true)
			return true
		}
		return Promise.reject(res)
	})
}

export const requestUnblock = data => dispatch => {
	return image('request-unblock', true, data)
}

export const authByHash = hash => dispatch => {
	return post(`login-by-hash`, true, {hash}).then(res => {				
		if (res.data) {
			dispatch(setToken(res.data.tokens.access_token))			
			Cookies.set('login', true)
			return true
		}
		return Promise.reject(res)
	})
}

export const logout = () => dispatch => {
	dispatch(removeToken())
	// closeSocket()
	return Promise.resolve(true)
}

export const resetPassword = data => dispatch => {
	return post(`reset`, true, data).then(res => res.statusCode === 200)
}

export const sendSocialData = data => dispatch => {
	return get(`socialite${data}`, true, data).then(res => {
		if (res.data) {
			if (res.data.no_email) {
				const params = {
					first_name: res.data.first_name
				}
				if (res.data.age) {
					params.age = res.data.age
				}
				if (res.data.sex) {
					params.sex = res.data.sex
				}
				dispatch(setSignupDataKey(params))

				dispatch(setUiKey('authMessage', res.message))
				Router.replace('/')
				return
			}
			dispatch(setToken(res.data.tokens.access_token))
			Cookies.set('login', 'true')
			setTimeout(() => {
				dispatch(toggleModal(true, 'avatar'))
			}, 500)
		}
	})
}

export const setSignupDataKey = (data) => {
	return {
		type: types.SET_SIGNUP_DATA_KEY,
		data
	}
}

export const removeToken = () => {
	Cookies.remove('token')
	return {
		type: types.REMOVE_TOKEN,
	}
}

export const setToken = token => {
	Cookies.set('token', token)
	return {
        type: types.SET_TOKEN,
        token
    }
}

export const setTokenServer = token => {
	return {
        type: types.SET_TOKEN,
        token
    }
}

export const updatePassword = (data, hash) => dispatch => {
	return post(`reset`, true, data).then(res => {
		if (res.data) {
			dispatch(setRecoveryHash(''))
			return true
		}
	})
}

export const setRecoveryHash = value =>
	({
		type: types.SET_RECOVERY_HASH,
		value,
	})

export const sendRecovery = data => dispatch => {
	return post(`recovery`, true, data).then(res => {
		if (res.data) {
			return true
		}
	})
}