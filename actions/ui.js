import { get, getMyCountry, post } from '../api'
import * as types from './types.js'
import { setSignupDataKey, setSignupKey } from './signup'
import store from '../store'

export const getBlogs = (link = '') => dispatch => {
	return get(`blog${link}`).then(res => {
		if (res.data) {
			dispatch(setBlogs(res.data))
		}
	})
}

export const getBlog = id => dispatch => {
	return get(`blog/${id}`).then(res => {
		if (res.data) {
			dispatch(setUiKey('blog', res.data))
		}
	})
}

export const getPopularBlogs = () => dispatch => {
	return get(`blog/popular`).then(res => {
		if (res.data) {
			dispatch(setUiKey('popularBlogs', res.data))
		}
	})
}

export const sendComment = (data, id) => dispatch => {
	return post(`comments/create`, true, data).then(res => {
		if (res.data) {
			dispatch(getBlog(id))
		}
	})
}

export const getStories = () => dispatch => {
	return get('stories/success').then(res => {
		if (res.data) {
			dispatch(setUiKey('stories', res.data))
		}
	})
}

export const getStory = id => dispatch => {
	return get(`stories/success/${id}`).then(res => {
		if (res.data) {
			dispatch(setUiKey('story', res.data))
		}
	})
}

export const getOptions = () => dispatch => {
	return get(`profile/params`).then(res => {
		if (res.data) {
			dispatch(setUiKey('options', res.data))
			return res.data
		}
	})
}

export const getOptionsMatch = () => dispatch => {
	return get(`match/params`).then(res => {
		if (res.data) {
			dispatch(setUiKey('optionsMatch', res.data))
			return res.data
		}
	})
}

export const getOptionsSearch = () => dispatch => {
	return get(`people/search/params`).then(res => {
		if (res.data) {
			dispatch(setUiKey('optionsSearch', res.data))
			return res.data
		}
	})
}

export const getLocations = (key, id) => dispatch => {
	return get(`location/${key}/${id}`).then(res => {
		if (res.data) {
			dispatch(setLocation(key, res.data))
		}
	})
}

// export const getOptions = key => dispatch => {
// 	if (!store.getState().options[key].length) {
// 		return get(key).then(res => {
// 			if (res.data) {
// 				dispatch(setOptions(key, res.data))
// 				return true
// 			}
// 		})
// 	} else {
// 		return Promise.resolve(true)
// 	}
// }

export const setLocation = (key, data) => {
	return {
		type: types.SET_LOCATION,
		key,
		data,
	}
}

export const setActiveTab = (key, tabKey) =>
	({
		type: types.SET_ACTIVE_TAB,
		key,
		tabKey,
	})

export const setOptions = (key, data) =>
	({
		type: types.SET_OPTIONS,
		key,
		data
	})

export const setAlert = (text, level = 'success', timeout = 5000) =>
    ({
        type: types.SHOW_ALERT,
        text,
        level,
        timeout
    })

export const removeAlert = () =>
    ({
        type: types.REMOVE_ALERT
    })

export const toggleModal = (value, key) =>
	({
		type: types.TOGGLE_MODAL,
		value,
		key
	})

export const setUiKey = (key, data) =>
	({
		type: types.SET_UI_KEY,
		key,
		data,
	})

export const setBlogs = data =>
	({
		type: types.SET_BLOGS,
		data,
	})