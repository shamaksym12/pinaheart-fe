import * as types from '../actions/types.js'

const initialState = {
    dialogs : [],
    messages: {
        has_paid_user: true,
        id: null,
        messages: [],
        user: {
            is_favorite:false,
            is_interested:false,
            is_blocked:false,
            id: null,
            profile_id: null,
            first_name: null, 
            last_name: null, 
            age: null,
            main_photo: null,
            main_photo_thumb: null,
            sex: null,
        }
    }
}

const dialog = (dialog = initialState, action = {}) => {
	switch (action.type) {
		case types.SET_DIALOG_ID:
			return Object.assign({}, dialog, {
				dialog_id: action.data
            })
        case types.SET_DIALOG_LIST:
            return Object.assign({}, dialog, {
                dialogs: action.data
            })
        case types.SET_DIALOG: 
            return Object.assign({}, dialog, {
                messages: action.data
            })
        case types.ADD_MESSADGE:
            return Object.assign({}, dialog, {
                messages: {
                    id: dialog.messages.id,
                    has_paid_user: dialog.messages.has_paid_user,
                    user: dialog.messages.user,
                    messages:  [...dialog.messages.messages, action.data]
                }
            })
        case types.ADD_TO_IN_DIALOG:
            return Object.assign({}, dialog, {
                messages: {
                    ...dialog.messages,
                    user: {
                        ...dialog.messages.user,
                        [action.key]: action.data
                    },
                }
            })
		default:
			return dialog
	}
}

export default dialog