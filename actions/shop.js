import * as types from './types.js'
import { get, post } from '../api'

export const getCategories = () => dispatch => {
	return get(`client/shop/category`).then(res => {
		if (res.data) {
			dispatch(setCategories(res.data))
		}
	})
}

export const buyProducts = data => dispatch => {
	return post(`client/shop/buy`, true, data).then(({data}) => {
		if (data) {
			return true
		}
	})
}

export const getShopMembers = () => dispatch => {
	return get(`user/members/shop`).then(({data}) => {
		if (data) {
			dispatch(setShopMembers(data))
		}
	})
}

export const setShopMembers = data =>
	({
		type: types.SET_SHOP_MEMBERS,
		data,
	})

export const setCart = cart =>
	({
		type: types.SET_CART,
		cart,
	})

export const setCategories = data =>
	({
		type: types.SET_CATEGORIES,
		data,
	})

export const setReceiverToShop = data =>
	({
		type: types.SET_RECEIVER_TO_SHOP,
		data
	})