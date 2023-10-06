import { get, post, message, put, image, remove } from '../api'
import * as types from './types.js'

export const getSavedSearch = () => dispatch => {
	return 	get(`searches`).then(res => {
		if (res.data) {
			dispatch(setSearchKey('list', res.data))
		}
	})
}

export const getSearch = searchId => dispatch => {
	return 	get(`searches/${searchId}`).then(res => {
		if (res.data) {
			return res.data
		}
	})
}

export const removeSearch = searchId => dispatch => {
	return 	remove(`searches/${searchId}`).then(res => {
		if (res.data) {
			dispatch(getSavedSearch())
		}
	})
}

export const setSearchKey = (key, data) => {
	return {
		type: types.SET_SEARCH_KEY,
		key,
		data,
	}
}