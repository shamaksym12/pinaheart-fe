import * as types from '../actions/types.js'
import Cookies from 'js-cookie'

const initialState = {
    token: Cookies.get('token'),
    role: 'client',
    isAdmin: false,
    testing: false,
    openSocket: false,
    timeout: false,
    recoveryHash: '',
    onlineUsers: [],
    facebookAlbums: {
        list: []
    },
    activities: {
        sent: {
            all: [],
            view: [],
            interest: [],
            favorites: [],
            blocked: [],
        },
        inbox: {
            all: [],
            view: [],
            interest: [],
            favorites: [],
        }
    },
    params: {
        first_name: '',
        sex: '',
        dob_day: '',
        dob_month: '',
        dob_year: '',
        hair_color: '',
        hair_length: '',
        eye_color: '',
        eye_wear: '',
        height: '',
        weight: '',
        body_type: '',
        your_ethnicity_is_mostly: '',
        i_consider_my_appearance_as: '',
        do_you_drink: '',
        do_you_smoke: '',
        marital_status: '',
        do_you_have_children: '',
        number_of_children: '',
        oldest_child: '',
        youngest_child: '',
        do_you_want_more_children: '',
        do_you_have_pets: '',
        occupation: '',
        employment_status: '',
        home_type: '',
        living_situation: '',
        willing_to_relocate: '',
        relationship_youre_looking_for: '',
        nationality: '',
        education: '',
        english_language_ability: '',
        religion: '',
        star_sign: '',
        formatted_address: '',
        place: {
            formatted_address: '',
        },
    },
    match: {
        sex: '',
        age_from: '',
        age_to: '',
        living_country: '',
        living_state: '',
        living_city: '',
    },
    data: {
        gallery: [],
    },
}

const user = (user = initialState, action = {}) => {
    let temp = Object.assign([], user.data);
    switch (action.type) {
        case types.SET_TOKEN:
            return Object.assign({}, user, {
                token: action.token
            });
        case types.SET_IS_ADMIN:
            return Object.assign({}, user, {
                isAdmin: action.value
            });
        case types.REMOVE_TOKEN:
            return Object.assign({}, user, {
                token: false
            });
        case types.SET_USER_INFO:
            return Object.assign({}, user, {
                data: {...user.data, ...action.data}
            })
        case types.SET_USER_KEY:
            return Object.assign({}, user, {
                [action.key]: {...user[action.key], ...action.data},
            })
        case types.SET_USER_PARAMS:
            return Object.assign({}, user, {
                params: {...user.params, ...action.data}
            })
        case types.SET_USER_ACTIVITIES:
            return Object.assign({}, user, {
                activities: {...user.activities, [action.key]: {...user.activities[action.key], [action.listType]: action.data } }
            })
        case types.UPDATE_FACEBOOK_ALBUMS:
            return Object.assign({}, user, {
                facebookAlbums: {
                    list: user.facebookAlbums.list.map(album => {
                        if (album.id === action.id) {
                            album = {...album, ...action.data}
                        }
                        return album
                    })
                }
            })
        case types.SET_RECOVERY_HASH:
            return Object.assign({}, user, {
                recoveryHash: action.value
            });
        case types.SET_OPEN_SOCKET:
            return Object.assign({}, user, {
                openSocket: action.value
            });
        case types.ROTATE_IMG_GALLERY:
            const gallery = user.data.gallery.map(item => {
                if (item.id === action.id) {
                    item.angle = action.angle
                }
                return item
            })
            return Object.assign({}, user, {
                data: {...user.data, gallery}
            })
        case types.SET_ONLINE_USERS:
            return Object.assign({}, user, {
                onlineUsers: action.userIds,
            })
        case types.ADD_ONLINE_USERS:
            return Object.assign({}, user, {
                onlineUsers: [...user.onlineUsers, action.id],
            })
        case types.REMOVE_ONLINE_USERS:
            return Object.assign({}, user, {
                onlineUsers: user.onlineUsers.filter(id => id !== action.id),
            })
        case types.ADD_MESSADGE_COUNTE: 
            return Object.assign({}, user, {
                data:{
                    ...user.data,
                    inbox_unread_messages_count: user.data.inbox_unread_messages_count + 1
                }
            });
        case types.REMOVE_MESSADGE_COUNTE:
            return Object.assign({}, user, {
                data:{
                    ...user.data,
                    inbox_unread_messages_count: user.data.inbox_unread_messages_count - action.data
                }
            });
        case types.SET_ACCOUNT_ON_OFF:
            return Object.assign({}, user, {
                data: {
                    ...user.data,
                    is_off: action.payload,
                    id: null,
                }
            })
        default:
            return user;
    }
}

export default user