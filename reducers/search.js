import * as types from '../actions/types.js'

const initialState = {
    params: {},
    list: [],
    
}

const search = (search = initialState, action = {}) => {
    switch (action.type) {
        case types.SET_SEARCH_PARAMS:
            return Object.assign({}, params, {
                params: {...params.params, ...action.data}
            })
        case types.SET_SEARCH_KEY:
        	return Object.assign({}, search, {
                [action.key]: action.data
            })
        default:
            return search;
    }
}

export default search