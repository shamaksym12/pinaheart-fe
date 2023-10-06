import * as types from './types.js'
import { get, post, put } from '../api'
import { parse } from 'path';
import { EPROTO } from 'constants';

export const getMembers = params => dispatch => {
	return post(`people`, false, params).then(res => {
		if (res.data) {
			dispatch(setMembersKey('people', res.data)) 
		}
	})
}

export const checkSubscriptionsCheckEndPeriod = () => dispatch => {
	return get(`subscriptions/check-end-period`, false)
}

export const checkUnFinishRegister = () => dispatch => {
	return get(`my/check-unfinish-register`, false)
}

export const checkExpiredSubscription = () => dispatch => {
	return get(`subscriptions/check-expired-subscription`, false)
}

export const searchByProfileId = params => dispatch => {
	return post(`people/smartsearch`, false, params).then(res => {
		if (res.data) {
			dispatch(setMembersKey('people', res.data))
		}
	})
}

export const getSortMatch = (params, page = 1) => dispatch => {
	return get(`people/match?sort=${params}&page=${page}`).then(res => {
		if (res.data) {
			dispatch(setMembersKey('match', res.data))
		}
	})
}

export const getResultsById = searchId => dispatch => {
	return get(`searches/${searchId}/people`).then(res => {
		if (res.data) {
			dispatch(setMembersKey('people', res.data))
		}
	})
}

export const getMembersMatch = (page = 1) => dispatch => {
	return get(`people/match?page=${page}`).then(res => {
		if (res.data) {
			dispatch(setMembersKey('match', res.data))
		}
	})
}

export const getShortMember = memberId => dispatch => {
	return 	get(`people/${memberId}/short`).then(res => {
		if (res.data) {
			dispatch(setMembersKey('activeMember', res.data))
		}
	})
}

export const getFullMember = memberId => dispatch => {
	return get(`people/${memberId}/detail`).then(res => {
		if (res.data) {
			dispatch(setMembersKey('activeMember', res.data))
		}
	})
}

export const getAllMembers = () => dispatch => {
	return get(`user/members`).then(res => {
		if (res.data) {
			dispatch(setAllMembers(res.data))
		}
	})
}

export const getPublicMembers = type => dispatch => {
	const link = type ? `members/${type}` : `members`
	return get(link).then(res => {
		if (res.data) {
			dispatch(setPublicMembers(res.data))
		}
	})
}

export const seeMoreMembers = (link, key) => dispatch => {
	return get(link).then(res => {
		if (res.data) {
			dispatch(addMemebers(res, key))
		}
	})
}

export const getMember = id => dispatch => {
	return get(`user/member/${id}`).then(res => {
		if (res.data) {
			dispatch(setMember(res.data))
		}
	})
}

export const getMemberPublic = id => dispatch => {
	return get(`user/member/${id}/offline`).then(res => {
		if (res.data) {
			dispatch(setMember(res.data))
		}
	})
}

export const toggleInterest = (id, value) => dispatch => {
	return get(`user/members/interest/${id}/${!value ? 'add' : 'remove'}`, true).then(res => {
		if (res.data) {
			dispatch(getMember(id))
		}
	})
}

export const toggleFavorite = (id, value, type) => dispatch => {
	return get(`user/members/favorite/${id}/${!value ? 'add' : 'remove'}`, true).then(res => {
		if (res.data) {
			if (type === 'favorite' || type === 'interest') {
				dispatch(getContacts(type))
			} else {
				dispatch(getMembers(type))
			}
			return true
		}
	})
}

export const getContacts = type => dispatch => {
	return get(`user/members/${type}`).then(res => {
		if (res.data) {
			dispatch(setContacts({[type]: res.data}))
		}
	})
}

export const getSearch = data => dispatch => {
	return post(`user/search`, false, data).then(res => {
		if (res.data) {
			dispatch(setSearchList(res.data))
		}
	})
}

export const searchByFavorite = id => dispatch => {
	return put(`people/${id}/favorite`, true, {})
	.then( res => res)
}

export const searchByInterest = id => dispatch => {
	return put(`people/${id}/interest`, true, {})
	.then( res => res)
}

export const blockMember = id => dispatch => {
	return put(`people/${id}/block`, true, {})
	.then( res=> res.statusCode === 200)
}

export const updateAdminComment = data => dispatch => {
	return put(`people/${data.id}/comment`, true, { comment: data.comment })
	.then(res => res.statusCode === 200)
}

export const togleAdminBlockMember = data => dispatch => {
	return put(`people/${data.id}/admin-block`, true, { toggle: data.value })
	.then(res => res.statusCode === 200)
}

export const getPublicSearch = data => dispatch => {
	return post(`search`, false, data).then(res => {
		if (res.data) {
			dispatch(setPublicMembers(res.data))
		}
	})
}

export const addViewed = id => dispatch => {
	return get(`user/view/${id}`)
}

export const getContactsDetails = id => dispatch => {
	return get(`client/contacts/${id}`, true)
}

export const sendVideoRequest = id => dispatch => {
	// console.log(id)
	return post(`user/video-call`, false, {girl_id: id}).then(res => {
		if (res.data) {
			return true
		}
	})
}

export const buyPhoto = (id, memberId) => dispatch => {
	return post(`gallery/photo/buy`, true, {photo_id: id}).then(res => {
		if (res.data) {
			dispatch(getMember(memberId))
		}
	})
}

export const setMembersKey = (key, data) => {
	return {
		type: types.SET_MEMBERS_KEY, 
		key,
		data,
	}
}
export const setMembersToInitialState = () => {
	return {
		type: types.SET_MEMBERS_TO_INITIAL_STATE,
	}
}

export const setContacts = data =>
	({
		type: types.SET_CONTACTS,
		data,
	})

export const setAllMembers = data =>
	({
		type: types.SET_ALL_MEMBERS,
		data,
	})

export const setMember = data =>
	({
		type: types.SET_MEMBER,
		data,
	})

export const setPublicMembers = data =>
	({
		type: types.SET_PUBLIC_MEMBERS,
		data
	})

export const addMemebers = (data, key) =>
	({
		type: types.ADD_MEMBERS,
		data,
		key
	})

export const setMembersList = (data, key) =>
	({
		type: types.SET_MEMBERS_LIST,
		key,
		data,
	})

export const setSearchList = data =>
	({
		type: types.SET_SEARCH_LIST,
		data
	})