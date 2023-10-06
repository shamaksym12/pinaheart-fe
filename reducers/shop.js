import * as types from '../actions/types.js'

const initialState = {
    receiver: {},
    categories: [],
    cart: [],
    shopMembers: [],
}

const shop = (shop = initialState, action = {}) => {
    switch (action.type) {
        case types.SET_RECEIVER_TO_SHOP:
            return Object.assign({}, shop, {
                receiver: action.data
            })
        case types.SET_CATEGORIES:
        	return Object.assign({}, shop, {
                categories: action.data
            })
        case types.SET_CART:
            return Object.assign({}, shop, {
                cart: action.cart
            });
        case types.SET_SHOP_MEMBERS:
            return Object.assign({}, shop, {
                shopMembers: action.data
            });
        default:
            return shop;
    }
}

export default shop