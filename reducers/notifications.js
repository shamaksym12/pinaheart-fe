import * as types from '../actions/types.js'

const initialState = {
    email: {},
    
}

const notifications = (notifications = initialState, action = {}) => {
    switch (action.type) {
        case types.SET_NOTIFICATIONS_PARAMS:
            return Object.assign({}, {
                email: action.payload
            })
        default:
            return notifications;
    }
}

export default notifications