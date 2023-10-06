import { get, post, message, put, image, remove } from '../api'
import * as types from './types.js'
import { getMember } from './members'
import { openSocket } from '../utils/socket'

export const getUserFullInfo = () => dispatch => {
	return get(`profile`).then(res => {
		if (res.data) {

			const data = {
				...res.data.profile_params,				
				first_name: res.data.first_name,
                sex: res.data.sex,
                dob_day: res.data.dob_day,
                dob_month: res.data.dob_month,
                dob_year: res.data.dob_year,
                country_id: res.data.location && res.data.location.country_id,
                formatted_address: res.data.location && res.data.location.formatted_address,
                about: res.data.info && res.data.info.about,
                heading: res.data.info && res.data.info.heading,
                looking: res.data.info && res.data.info.looking,
			}
			dispatch(setUserParams(data))
			return data
		}
	})
}

export const getUncompleteField = () => dispatch => {
	return get(`my/info`).then(res => {
		if (res.data) {
			dispatch(setUserParams(res.data))
		}
	})
}

export const saveUncomplete = data => dispatch => {
	return put(`my/info`, true, data).then(res => {
		if (res.data) {
			return true
		}
	})
}

export const getMyProfile = () => dispatch => {
	return get(`my/profile`).then(res => {
		if (res.data) 
		{			
			dispatch(setUserInfo(res.data))
		}
	})
}

export const getUserInfo = () => dispatch => {
	return get(`user`).then(res => {
		if (res.data) {			
			dispatch(setIsAdmin(!! (['admin', 'manager'].indexOf(res.data.role) + 1)))
			dispatch(setUserInfo(res.data))
			openSocket()
			return true
		}
		return false
	})
};

export const getActivities = (key, my) => dispatch => {
	const link = my ? 'sent' : 'inbox'
	return 	get(`activities/${link}?type=${key}`).then(res => {
		if (res.data) {
			// console.log(res.data)
			dispatch(setUserActivities(link, key, res.data))
		}
		// console.log(res)
	})
}

export const setUserActivities = (key, listType, data) => {
	return 	{
		type: types.SET_USER_ACTIVITIES,
		key,
		listType,
		data,
	}
}

export const getUserMatch = () => dispatch => {
	return get(`match`).then(res => {
		if (res.data) {
			const data = {
				...res.data.match_params,
				age_from: res.data.age_from,
				age_to: res.data.age_to,
				country_id: res.data.country_id,
				formatted_address: res.data.formatted_address,
				lat: res.data.lat,
				long: res.data.long,
				place_id: res.data.place_id,
				sex: res.data.sex,
				distance: res.data.distance,
				distance_unit: res.data.distance_unit,
			}
			dispatch(setUserKey('match', data))
			return true
		}
	})
}

export const saveProfile = data => dispatch => {
	return post(`profile`, true, data).then(res => {
		return res.statusCode === 200
	})
}

export const updateEmail = email => dispatch => {
	return put(`my/email`, true, {email}).then(res => {
		return res.statusCode === 200
	})
}

export const setOffAccount = data => dispatch => {
	console.log(data)
	return put(`my/off`, true, data).then(res => {
		return res.statusCode === 200
	})
}


export const setOnAccount = data => dispatch => {
	console.log('SET ON')
	return put(`my/on`, true, data).then(res => {
		return res.statusCode === 200
	})
}

export const setAccountOnOff = (data) => ({
	type: types.SET_ACCOUNT_ON_OFF,
	payload: data,
}) 

export const updatePassword = data => dispatch => {
	return put(`my/password`, true, data).then(res => {
		return res.statusCode === 200
	})
}

export const setIsUserOnline = data => dispatch => {
	return put(`my/busy`, data).then(res => {
		if(res.data) {
			dispatch(setUserInfo({is_busy: data}))
		}
	})
};

export const setIsUserHidden = data => dispatch => {
	return put(`my/hidden`, data).then(res => {
		if(res.data) {
			dispatch(setUserInfo({is_hidden: data}))
		}
	})
};

export const saveMatch = data => dispatch => {
	return post(`match`, true, data).then(res => {
		if (res.data) {
			// console.log(res.data)
			return true
		}
	})
}

export const getInterests = () => dispatch => {
	return get(`interest`).then(res => {
		if (res.data) {
			dispatch(setUserParams(res.data))
		}
	})
}

export const saveInterests = data => dispatch => {
	return post(`interest`, true, data).then(res => {
		return res.statusCode === 200
	})
}

export const getPersonality = () => dispatch => {
	return get(`personality`).then(res => {
		if (res.data) {
			dispatch(setUserParams(res.data))
		}
	})
}

export const savePersonality = data => dispatch => {
	return post(`personality`, true, data).then(res => {
		return res.statusCode === 200
	})
}

/**
 * Send profile single input data.
 * @param data
 */
export const saveProfileParams = data => dispatch => {
	return post(`profile/params`, true, data).then(res => {
		if (res.data) {
			// console.log('[user]', res.data)
		}
	})
}

export const getUserGallery = () => dispatch => {
	return get('photos').then(res => {
		if (res.data) {
			dispatch(setUserInfo({gallery: res.data}))
			return true
		}
	})
}

export const rotateImgGallery = (id, angle) => dispatch => {
	dispatch({
		type: types.ROTATE_IMG_GALLERY,
		id,
		angle,
	})
	return post('gallery/rotate', false, {id, angle}).then(res => {
		// console.log(res)
	})
}

export const getUserVideo = () => dispatch => {
	return get(`girl/video`).then(res => {
		if (res.data) {
			dispatch(setUserInfo({video: res.data}))
			return true
		}
	})
}

export const changePassword = data => dispatch => {
	return put(`password/update`, true, data)
}

export const addToGallery = data => dispatch => {
	let formData = new FormData()
    formData.append('image', data)

	return message(`gallery/add`, true, formData).then(res => {
		if (res.data) {
			dispatch(getUserGallery())
		}
	})
}

export const addPhotos = file => dispatch => {
	let formData = new FormData()
    formData.append('photo', file)
	return image(`photos`, true, formData).then(res => {
		if (res.data) {
			dispatch(getUserGallery())
			return true
		}
	})
}

export const saveFacebookPhotos = data => dispatch => {
	return post(`photos/upload`, true, data).then(res => {
		if (res.data) {
			dispatch(getUserGallery())
			return true
		}
	})
}

export const makeMainPhoto = id => dispatch => {
	return put(`photos/${id}/main`, true, {}).then(res => {
		if (res.data) {
			dispatch(getUserInfo())
			dispatch(getUserGallery())
			return true
		}
	})
}

export const removePhoto = id => dispatch => {
	return remove(`photos/${id}`, true).then(res => {
		if (res.data) {
			dispatch(getUserGallery())
			return true
		}
	})
}

export const toggleActive = (data, url) => dispatch => {
	return post(`gallery/${url}`, true, data).then(res => {
		if (res.data) {
			dispatch(getUserGallery())
			return true
		}
	})
}

export const makePrivate = data => dispatch => {
	return post(`gallery/make/private`, true, data).then(res => {
		if (res.data) {
			dispatch(getUserGallery())
			return true
		}
	})
}

export const toggleHidden = val => dispatch => {
	return post(`client/hidden-request/${val ? `hidden` : `visible`}`).then(res => {
		if (res.data) {
			dispatch(setUserInfo({hidden_request: true}))
		}
	})
}

export const saveAvatar = data => dispatch => {
	return put(`gallery/avatar`, true, data).then(res => {
		if (res.data) {
			dispatch(getUserInfo())
			return true
		}
	})
}

export const buyVideo = (id, member_id) => dispatch => {
	return post(`gallery/video/buy`, true, {video_id: id}).then(res => {
		if (res.data) {
			dispatch(getMember(member_id))
			dispatch(getUserInfo())
		}
	})
}

export const setUserKey = (key, data) => {
	return {
		type: types.SET_USER_KEY,
		key,
		data
	}
}

export const updateFacebookAlbums = (id, data) => {
	return {
		type: types.UPDATE_FACEBOOK_ALBUMS,
		id,
		data,
	}
}

export const setIsAdmin = value => {	
	return {
        type: types.SET_IS_ADMIN,
        value
    }
}

export const setOnlineUsers = userIds =>
	({
		type: types.SET_ONLINE_USERS,
		userIds
	})

export const addOnlineUsers = id =>
	({
		type: types.ADD_ONLINE_USERS,
		id
	})

export const removeOnlineUsers = id =>
	({
		type: types.REMOVE_ONLINE_USERS,
		id
	})

export const setUserParams = data =>
	({
		type: types.SET_USER_PARAMS,
		data,
	})

export const setUserInfo = data =>
	({
		type: types.SET_USER_INFO,
		data,
	})

export const setOpenSocket = value =>
	({
		type: types.SET_OPEN_SOCKET,
		value,
	})
