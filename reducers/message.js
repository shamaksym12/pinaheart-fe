import * as types from '../actions/types.js'

const initialState = {
    attach: [],
    incoming: [],
    outgoing: [],
    draft: [],
    draftAttach: [],
    deleted: [],
    contacts: [],
    message: {
        attachment: [],
        sender_avatar: '',
        sender_first_name: '',
        sender_id: '',
        translation: '',
        original: '',
        receiver_avatar: '',
        receiver_first_name: '',
        receiver_id: '',
    },
    newMessage: {
        avatar: '',
        first_name: '',
        receiver_id: '',
    },
    sendingMessage: {},
    buyingAttach: {},
    letterPrice: 0,
}

const message = (message = initialState, action = {}) => {
    switch (action.type) {
        case types.ADD_ATTACH_MESSAGE:
            return Object.assign({}, message, {
                attach: [...message.attach, ...action.data]
            })
        case types.ADD_ATTACH_DRAFT:
            return Object.assign({}, message, {
                draftAttach: [...message.draftAttach, ...action.data]
            })
        case types.CLEAR_ATTACH_DRAFT:
            return Object.assign({}, message, {
                draftAttach: message.draftAttach.filter((item, i) => i !== action.key)
            })
        case types.CLEAR_ATTACH_MESSAGE:
            return Object.assign({}, message, {
                attach: message.attach.filter((item, i) => i !== action.key)
            })
        case types.CLEAR_ATTACH_ALL:
            return Object.assign({}, message, {
                attach: [],
                draftAttach: [],
            })
        case types.SET_MESSAGES:
            return Object.assign({}, message, {
                [action.key]: action.data
            })
        case types.SET_MESSAGE:
            return Object.assign({}, message, {
                message: action.data
            })
        case types.SET_NEW_MESSAGE:
            return Object.assign({}, message, {
                newMessage: action.data
            })
        case types.SET_SENDING_MESSAGE:
            return Object.assign({}, message, {
                sendingMessage: action.data
            })
        case types.SET_BUYING_ATTACH:
            return Object.assign({}, message, {
                buyingAttach: action.data
            })
        case types.SET_MESSAGES_KEY:
            return Object.assign({}, message, {
                [action.key]: action.value
            })
        default:
            return message;
    }
}

export default message