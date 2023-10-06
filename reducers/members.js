import * as types from '../actions/types.js'

const initialState = {
	list: [],
    search: [],
    people: {
        last_page: 1,
        current_page: 1,
        next_page_url: null,
        prev_page_url: null,
        data: [],
    },
    match: {
        last_page: 1,
        current_page: 1,
        next_page_url: null,
        prev_page_url: null,
        data: [],
    },
	new: {
        list: [],
        current_page: 1,
        last_page: 1,
        next_link: '',
    },
    popular: {
        list: [],
        current_page: 1,
        last_page: 1,
        next_link: '',
    },
    viewed: {
        list: [],
        current_page: 1,
        last_page: 1,
        next_link: '',
    },
    member: {
        avatar: {},
    },
    contacts: {
        favorite: [],
        interest: [],
    },
    public: [],
    activeMember: {
        photos: [],
    },
}

export default function members(members = initialState, action = {}) {
    switch (action.type) {
        case types.SET_MEMBERS_KEY:
            return Object.assign({}, members, {
                [action.key]: {...members[action.key], ...action.data}
            })
        case types.SET_MEMBERS:
        	return Object.assign({}, members, {
        		list: action.data
        	})
        case types.SET_MEMBERS_LIST:
            return Object.assign({}, members, {
                [action.key]: {
                    list: action.data.data,
                    current_page: action.data.meta.current_page,
                    last_page: action.data.meta.last_page,
                    next_link: action.data.links.next,
                },
            })
        case types.ADD_MEMBERS:
            return Object.assign({}, members, {
                [action.key]: {
                    list: [...members[action.key].list, ...action.data.data],
                    current_page: action.data.meta.current_page,
                    last_page: action.data.meta.last_page,
                    next_link: action.data.links.next,
                }
            })
        case types.SET_MEMBER:
            return Object.assign({}, members, {
                member: action.data
            })
        case types.SET_CONTACTS:
            return Object.assign({}, members, {
                contacts: {...members.contacts, ...action.data}
            })
        case types.SET_SEARCH_LIST:
            return Object.assign({}, members, {
                search: action.data
            })
        case types.SET_ALL_MEMBERS:
            return Object.assign({}, members, {
                list: action.data
            })
        case types.SET_PUBLIC_MEMBERS:
            return Object.assign({}, members, {
                public: action.data
            })
        case types.SET_MEMBERS_TO_INITIAL_STATE:
            return initialState;
        default:
            return members;
    }
}