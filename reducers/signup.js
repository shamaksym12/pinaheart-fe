import * as types from '../actions/types.js'

const initialState = {
    step: 0,
    empty_data: {},
    data: { 
        first_name: '',
        last_name: '',
        sex: '',
        age: '',
        role: 'client',
        country: '',
        city: '',
        email: '',
        password: '',
        terms: true,
        birth: {},
        match: {},
        child: {},
        height_id: '',
        weight_id: '',
        eyes_id: '',
        hair_color_id: '',
        hair_length_id: '',
        ethnicity_id: '',
        marital_status_id: '',
        children: '',
        find_ethnicity: [],
        interest: [],
        religion_id: '',
        want_children_id: '',
        education_id: '',
        smoke_id: '',
        drink_id: '',
        profession: '',
        occupation: '',
        primary_language_id: '',
        english_language_id: '',
        russian_language_id: '',
        about_children: '',
        mobile: '',
        facebook: '',
        vk: '',
        other_social: '',
        languages: [],
        body_style: '',
        eye_wear: '',
        want_children: '',
        about_family: '',
        employment_status: '',
        living_situation: '',
        field_of_work: '',
        future_goals: '',
        children_yes_no: '',
        about_me: '',
        like_to_meet: '',
        mobile: '',
        inbox_unread_messages_count: "",
        promoCode: '',
    },
    send_email: '',
    custom_remember_token: '',
    avatar: '',
    file: null,
    country: ''
}

export default function signup(signup = initialState, action = {}) {
    let tempData = Object.assign({}, signup.data)
    switch (action.type) {
        case types.SET_SIGNUP_KEY:
            return Object.assign({}, signup, {
                    [action.key]: action.value
                });
        case types.SET_SIGNUP_DATA_KEY:
            return Object.assign({}, signup, {
                    data: {...signup.data, ...action.data}
                });
        default:
            return signup;
    }
}