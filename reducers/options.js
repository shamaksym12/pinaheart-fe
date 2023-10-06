import * as types from '../actions/types.js'

const initialState = {
    height: [],
    weight: [],
    eyes: [],
    hair_colors: [],
    hair_lengths: [],
    ethnicities: [],
    marital_statuses: [],
    countries: [],
    interests: [],
    religions: [],
    education: [],
    smoke: [],
    primary_language: [],
    language_level: [],
    drink: [],
    body_style: [],
    children: [],
    smoke: [],
    want_children: [],
    eye_wear: [],
    living_situation: [],
    field_of_work: [],
    employment_status: [],
}

const options = (options = initialState, action = {}) => {
    switch (action.type) {
        case types.SET_OPTIONS:
            return Object.assign({}, options, {
                [action.key]: action.data
            });
        default:
            return options;
    }
}

export default options