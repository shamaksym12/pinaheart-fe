import * as types from '../actions/types.js'

const initialState = {
    isServer: typeof window === 'undefined',
    blogs: {
        list: [],
        current_page: 1,
        total: 1
    },
    lastPhoto: null,
    blog: {
        title: '',
        comments: [],
    },
    authMessage: '',
    popularBlogs: [],
    stories: [],
    story: {},
	messages: [],
    modals: {
        switch_profile: false,
        shure_delete: false,
        registration: false,
        login: false,
        recovery: false,
        avatar: false,
        photo_preview: false,
        plans: false,
        credits: false,
        video: false,
        gallery: false,
        support: false,
        testimonials: false,
        message: false,
        membership: false,
        paypal: false,
        subscribe: false,
        videoRequestMessage: false,
        subscribeMobile: false,
        member: false,
        membershipInfo: false,
        facebook: false,
        uncomplete: false,
        subscription: false,
        autoRenewal: false,
        nineDayToAutoRenewal: false,
        expiredSubscription: false,
    },
    sizeLoginModal: 'sm',
    showRegistration: false,
    tab: {
        main: 'viewed',
        mail: 'incoming',
        profile: 'info',
        edit: 'info',
        settings: 'profile',
        search: 'advanced',
    },
    redirect: '',
    optionsMatch: {
        match_params: {
            body_type: [],
            do_you_drink: [],
            do_you_have_children: [],
            do_you_smoke: [],
            education: [],
            english_language_ability: [],
            hair_color: [],
            height_from: [],
            height_to: [],
            i_consider_my_appearance_as: [],
            languages_spoken: [],
            marital_status: [],
            religion: [],
            weight_from: [],
            weight_to: [],
            willing_to_relocate: [],
            your_ethnicity_is_mostly: [],
            hair_length: [],
            eye_color: [],
        },
        location_params: {
            countries: [],
        },
    },
    optionsSearch: {
        search_params: {
            body_type: [],
            do_you_drink: [],
            do_you_have_children: [],
            do_you_smoke: [],
            education: [],
            english_language_ability: [],
            hair_color: [],
            height_from: [],
            height_to: [],
            i_consider_my_appearance_as: [],
            languages_spoken: [],
            marital_status: [],
            religion: [],
            weight_from: [],
            weight_to: [],
            willing_to_relocate: [],
            your_ethnicity_is_mostly: [],
            hair_length: [],
            eye_color: [],
            eye_wear: [],
            employment_status: [],
            home_type: [],
            living_situation: [],
            nationality: [],
            star_sign: [],
            do_you_want_more_children: [],
            relationship_youre_looking_for: [],
        },
        location_params: {
            countries: [],
        },
    },
    options: {
        profile_params: {
            hair_color: [],
            hair_length: [],
            eye_color: [],
            eye_wear: [],
            height: [],
            weight: [],
            body_type: [],
            your_ethnicity_is_mostly: [],
            i_consider_my_appearance_as: [],
            do_you_drink: [],
            do_you_smoke: [],
            marital_status: [],
            do_you_have_children: [],
            number_of_children: [],
            oldest_child: [],
            youngest_child: [],
            do_you_want_more_children: [],
            do_you_have_pets: [],
            occupation: [],
            employment_status: [],
            home_type: [],
            willing_to_relocate: [],
            living_situation: [],
            nationality: [],
            education: [],
            english_language_ability: [],
            religion: [],
            star_sign: [],
            languages_spoken: [],
        },
        location_params: {
            countries: [],
            states: [],
            cities: [],
        }
        
    },
    inValid: {},
    targetPage: '',
}

export default function ui(ui = initialState, action = {}) {
    switch (action.type) {
        case types.SET_BLOGS:
        	return Object.assign({}, ui, {
        		blogs: {
                    list: action.data.data,
                    current_page: action.data.current_page,
                    total: action.data.from,
                }
        	})
        case types.SET_UI_KEY:
            return Object.assign({}, ui, {
                [action.key]: action.data
            })
        case types.SHOW_ALERT:
            let tempMessages = Object.assign([], ui.messages)
            tempMessages.push({ 'text': action.text, 'level': action.level, 'timeout': action.timeout })
            return Object.assign({}, ui, {
                messages: tempMessages
            });
        case types.REMOVE_ALERT:
            return Object.assign({}, ui, {
                messages: []
            });
        case types.SET_ACTIVE_TAB:
            return Object.assign({}, ui, {
                tab: {...ui.tab, [action.tabKey]: action.key}
            });
        case types.SET_LOCATION:
            return Object.assign({}, ui, {
                options: {
                    ...ui.options,
                    location_params: {
                        ...ui.options.location_params,
                        [action.key]: action.data,
                    }
                }
            })
        case types.TOGGLE_MODAL:
            let modals = Object.assign({}, ui.modals)
            modals[action.key] = action.value
            return Object.assign({}, ui, {
               modals
            });
        default:
            return ui;
    }
}