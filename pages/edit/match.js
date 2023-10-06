import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import PrivateLayout from '../../layouts/private'
import ProfileLayout from '../../layouts/profile'
import { getOptionsMatch, getOptions, getLocations, setAlert, getOptionsSearch } from '../../actions/ui'
import { getUserMatch, getUserInfo } from '../../actions/user'
import BtnMain from '../../components/buttons/btn_main'
import InputInline from '../../components/inputs/InputInline'
import { getArray, heightArray, weightArray, getArrayAge, ageArray, getMultiArray, ageArrayBetween, heightArrayBetween, weightArrayBetween, getCounriesArrey, getArrayChildren } from '../../utils'
import SelectField from '../../components/inputs/select_field'
import { getInterests, setUserKey, saveMatch } from '../../actions/user'
import CheckboxField from '../../components/inputs/checkbox_field'
import { Router } from '../../routes'
import Autocomplete from '../../components/inputs/autocomplete'
import cn from 'classnames'
import Head from 'next/head'
import { API_URL } from '../../config'
let request = {};
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

const AccordionBlock = ({ title, body, selected, required = false, check = false }) => {
    return <AccordionItem>
        <AccordionItemTitle style={{ 'position': 'relative' }}>
            {
                required && !check ? <span className="required-icon" data-toggle="tooltip" data-title="This field is required">*</span> : ""
            }
            {
                check ? <span className="check-icon">
                    <i className="fas fa-check"></i>
                </span> : ""
            }
            <div className="u-position-relative">
                <span>{title}</span>
                <span style={{ marginLeft: 15 }}>{selected}</span>
                <div className="accordion__arrow" role="presentation"></div>
            </div>
        </AccordionItemTitle>
        <AccordionItemBody>
            {body}
        </AccordionItemBody>
        <style jsx>{`       
            .required-icon {
                position: absolute;
                left: -20px;
                top: 50%;
                transform: translateY(-50%);
                color: #a94442;
                font-size: 18px;
            }
            
            .check-icon {
                position: absolute;
                left: -25px;
                top: 50%;
                transform: translateY(-50%);
                color: #98D538;
                font-size: 18px;
            }
        `}
        </style>
    </AccordionItem>
}

class Edit extends Component {

    state = {
        check: false,
        fieldCheck: {},
        changed: [],
        loaders: [],
        lostConnection: [],
        selected: []
    }

    componentWillReceiveProps() {
        $('[data-toggle="tooltip"]').tooltip()
    }

    save = () => {
        const { dispatch, match } = this.props
        const notParams = ['age_from', 'age_to', 'country_id', 'formatted_address', 'lat', 'long', 'place_id', 'sex', 'place', 'distance', 'distance_unit']

        const params = Object.keys(match).reduce((obj, key) => {
            if (!notParams.includes(key)) {
                obj[key] = match[key]
                if (key === 'languages_spoken' && match[key] && match[key].includes('0')) {
                    obj[key] = []
                }
            }
            return obj
        }, {})

        const data = {
            age_from: match.age_from,
            age_to: match.age_to,
            country_id: match.country_id,
            formatted_address: match.formatted_address,
            lat: match.lat,
            long: match.long,
            place_id: match.place_id,
            sex: match.sex,
            place: match.place,
            distance: match.distance,
            distance_unit: match.distance_unit,
            match_params: params,
        }

        this.setState({ check: true })

        // dispatch(saveMatch(data)).then(success => {
        //     dispatch(getUserInfo())
        //     if (this.props.user.food && this.props.user.fun && this.props.user.sport && this.props.user.music) {
        //         const { dob_day, dob_month, dob_year, first_name, sex, country_id, weight, height, education, nationality, do_you_drink, do_you_smoke, marital_status, do_you_have_children } = this.props.user
        //         // if (!dob_day || !dob_month || !dob_year || !first_name || !sex || !country_id || !weight || !height || !education || !nationality || !do_you_drink || !do_you_smoke || !marital_status || !do_you_have_children) {
        //         //     setTimeout(() => {
        //         //         Router.pushRoute('/edit/info?show-msg-fill-fields=1')
        //         //     }, 1000)
        //         //     return
        //         // }

        //         setTimeout(() => {
        //             Router.pushRoute('/matches')
        //         }, 1000)
        //     } else if (success) {
        //         setTimeout(() => {
        //             Router.pushRoute('/edit/interest')
        //         }, 1000)
        //     }
        // })
        setTimeout(() => {
            Router.pushRoute('/edit/interest')
        }, 1000)
    }

    getSelectedLanguages = (array, selected) => {
        array = getMultiArray(array, false)
        if (!selected || (selected && !selected.length)) {
            return 'Any'
        }
        return array.filter(item => selected.includes(item.id.toString())).map(item => item.name).join(', ')
    }

    getSelected = (array, selected) => {
        array = getArray(array, false)
        if (!selected || (selected && !selected.length)) {
            return 'Any'
        }
        return array.filter(item => selected.includes(item.id)).map(item => item.name).join(', ')
    }

    handleChange = (field, value) => {
        const changed = this.state.changed
        if (!changed.includes(field)) {
            changed.push(field)
        }
        this.setState({ ...this.state, changed: changed })
        
        const { dispatch } = this.props
        dispatch(setUserKey('match', { [field]: value }))
        this.sendRequest(field, value).then(r => {
            dispatch(setAlert('Successfuly updated.'))
            dispatch(getUserInfo());
        })
    }

    getSelectedAge = (array, selected) => {
        const val = array.find(item => item.id == selected)
        return val ? `${val.name} age` : 'Any'
    }

    getSelectedArray = (array, from, to) => {
        if (!from && !to) {
            return 'Any'
        }
        const start = array.find(item => item.id == from)
        const end = array.find(item => item.id == to)
        const startString = start ? start.name : 'Any'
        const endString = end ? end.name : 'Any'

        return <span>{startString}<span style={{ margin: '0px 15px' }}>to</span>{endString}</span>
    }

    sendRequest = (field, value) => {

        const notParams = ['age_from', 'age_to', 'country_id', 'formatted_address', 'lat', 'long', 'place_id', 'sex', 'place', 'distance', 'distance_unit']
        const data = notParams.includes(field) ? { [field]: value } : { match_params: { [field]: value } }

        return fetch(`${API_URL}/match/params`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.props.token}`,
            },
            body: JSON.stringify(data)
        })
    }

    handleChangeCountry = (field, data) => {
        const { dispatch } = this.props
        this.handleChange(field, data.value)
        dispatch(setUserKey('match', { formatted_address: '', place: '' }))
    }

    handleChangeCity = (value) => {
        const { user, dispatch } = this.props
        this.handleChange('formatted_address', value)
    }

    handleSelectCity = (value, place) => {
        const { dispatch } = this.props
        this.handleChange('formatted_address', value)
        this.handleChange('place_id', place.place_id)
        this.handleChange('place', place)
    }

    checkField = (property) => {
        const { fieldCheck } = this.state;
        return (property in fieldCheck);
    }

    checkValid = (property) => {
        const { fieldCheck } = this.state;
        const { inValid } = this.props
        if ((property in fieldCheck)) {
            return fieldCheck[property]
        }
        return !(property in inValid)
    }

    handleChangeState = (field, value) => {
        const { dispatch } = this.props
        dispatch(getLocations('cities', value))
        this.handleChange(field, value)
        this.handleChange('city_id', '')
    }
    goTo = link => e => {
        e.preventDefault()
        Router.pushRoute(`${link}`)
    }
    scrollToTopWindow() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getInterests()).then(() => {
            setTimeout(this.scrollToTopWindow, 0)
        })

        dispatch(getOptionsMatch()).then(success => {
            if (success) {
                dispatch(getUserMatch())
            }
        })

        dispatch(getOptions())

        dispatch(getOptionsSearch())

        var lang = document.getElementsByClassName('css-1wa3eu0-placeholder')
        if (lang.length) lang[0].innerHTML = 'Any'
    }

    checkDateValid = () => {
        return ['dob_day', 'dob_month', 'dob_year'].every(this.checkValid)
    }

    checkDateField = () => {
        return ['dob_day', 'dob_month', 'dob_year'].every(this.checkField)
    }

    validAppearence = () => {
        const { inValid } = this.props
        return !('hair_color' in inValid)
            && !('hair_length' in inValid)
            && !('eye_color' in inValid)
            && !('eye_wear' in inValid)
            && !('height' in inValid)
            && !('weight' in inValid)
            && !('body_type' in inValid)
            && !('your_ethnicity_is_mostly' in inValid)
            && !('i_consider_my_appearance_as' in inValid)
    }

    validAbout = () => {
        const { inValid } = this.props
        return !('heading' in inValid)
            && !('about' in inValid)
            && !('looking' in inValid)
    }

    validLifestyle = () => {
        const { inValid } = this.props
        return !('do_you_drink' in inValid)
            && !('do_you_smoke' in inValid)
            && !('marital_status' in inValid)
            && !('do_you_have_children' in inValid)
            && !('number_of_children' in inValid)
            && !('oldest_child' in inValid)
            && !('youngest_child' in inValid)
            && !('do_you_want_more_children' in inValid)
    }

    validBackgound = () => {
        const { inValid } = this.props
        return !('languages_spoken' in inValid)
            && !('english_language_ability' in inValid)
            && !('religion' in inValid)
            && !('star_sign' in inValid)
    }

    onChangeSelect = (values) => {
        var value = []
        if (values) {
            for (var i = 0; i < values.length; i++) {
                value[i] = '' + values[i].value
            }
        }
        
        const changed = this.state.changed
        if (!changed.includes('languages_spoken')) {
            changed.push('languages_spoken')
        }
        this.setState({ ...this.state, changed: changed })

        const { dispatch } = this.props
        dispatch(setUserKey('match', { 'languages_spoken': value }))
        this.sendRequest('languages_spoken', value).then(r => {
            dispatch(setAlert('Successfuly updated.'))
            dispatch(getUserInfo());
            if (!values || values == []) window.location.reload();
        })
    }

    render() {
        const { options, optionsAll, location_options, match, search } = this.props
        const { check, lostConnection, loaders, selected } = this.state
        const selectedCountry = location_options.countries.find(country => country.id === match.country_id * 1) || {}

        const languages = []
        const languages_pre = []
        var k = 0
        
        if (typeof(match.languages_spoken) != 'undefined') {
            for (var i = 0; i < options.languages_spoken.length; i++) {
                var temp = {label: options.languages_spoken[i].name, value: options.languages_spoken[i].id}
                languages[i] = temp
                if (match.languages_spoken) {
                    for (var j = 0; j < match.languages_spoken.length; j++) {
                        if (options.languages_spoken[i].id == match.languages_spoken[j]){
                            languages_pre[k] = temp
                            k++
                        }
                    }
                }
            }
        }        

        const animatedComponents = makeAnimated();

        let { router } = Router
        let showMsgFillFields = false

        if (router) {
            let { query } = router
            showMsgFillFields = query['show-msg-fill-fields']
        }

        return (
            <Layout page="edit_match">
                <PrivateLayout>
                    <ProfileLayout page="match">
                        <Head>
                            <title>PinaHeart.com</title>
                        </Head>
                        <div className="edit_match_wrap">
                            <div className="fs-18 title form-group justify-content-between d-flex no_mobile">
                                <div>
                                    Edit Match Criteria
                                </div>
                                <BtnMain onClick={this.goTo('/matches')} text="View My Matches" className="btn btn-outline btn-outline " />
                            </div>

                            <div className="row form-group">
                                <div className="col-sm-6">
                                    <div className={cn('fs-18 title form-group no_mobile')}>
                                        Their Basics
                                    </div>
                                    <InputInline
                                        label="I’m seeking a:"
                                        type="select"
                                        field="sex"
                                        options={[{ id: '', name: 'Please select...' }, { id: 'M', name: 'Male' }, { id: 'F', name: 'Female' }]}
                                        check={(this.checkField('sex') || this.state.changed.includes('sex') || check) || !check && this.checkValid('country_id') && match.sex}
                                        onChange={this.handleChange}
                                        value={match.sex} />

                                    <div className="wrap-multiple-select">
                                        <div className={`label-multi-select ${((this.checkField('age_from') || this.state.changed.includes('age_from') || check) || !check && this.checkValid('age_from') && match.age_from) || ((this.checkField('age_to') || this.state.changed.includes('age_to') || check) || !check && this.checkValid('age_to') && match.age_to) ? 'success' : ''}`}>Aged between</div>
                                        <div className="select-multi-select">
                                            <SelectField
                                                value={match.age_from}
                                                onChange={val => this.handleChange('age_from', val * 1)}
                                                style={{ minWidth: 100 }}
                                                inputRef={ref => this.age_from = ref}
                                                check={(this.checkField('age_from') || this.state.changed.includes('age_from') || check) || !check && this.checkValid('age_from') && match.age_from}
                                                options={ageArrayBetween(18, match.age_to)} />
                                        </div>
                                        <span className="divider-multi-select">and</span>
                                        <div className="select-multi-select">
                                            <SelectField
                                                value={match.age_to}
                                                onChange={val => this.handleChange('age_to', val * 1)}
                                                style={{ minWidth: 100 }}
                                                inputRef={ref => this.age_to = ref}
                                                check={(this.checkField('age_to') || this.state.changed.includes('age_to') || check) || !check && this.checkValid('age_to') && match.age_to}
                                                options={ageArrayBetween(match.age_from, 70)} />
                                        </div>
                                    </div>

                                    <InputInline
                                        label="Country:"
                                        any={true}
                                        onChange={this.handleChangeCountry}
                                        options={getCounriesArrey(location_options.countries, false)}
                                        check={(this.checkField('country_id') || this.state.changed.includes('country_id') || check) || !check && this.checkValid('country_id') && match.country_id}
                                        value={match.country_id}
                                        field="country_id"
                                        loader={loaders.includes('country_id')}
                                        valid={this.checkValid('country_id')}
                                        type="select" />
                                    <Autocomplete
                                        label="Which City, Town or Area are you living in? (be as precise as possible)"
                                        any={true}
                                        onSelect={this.handleSelectCity}
                                        onChange={this.handleChangeCity}
                                        value={match.formatted_address}
                                        check={(this.checkField('formatted_address') || this.state.changed.includes('formatted_address') || check) || !check && this.checkValid('formatted_address') && match.formatted_address}
                                        loader={loaders.includes('formatted_address')}
                                        field="formatted_address"
                                        valid={this.checkValid('formatted_address')}
                                        country={selectedCountry.code} />

                                    <InputInline
                                        type="select"
                                        any={true}
                                        field="nationality"
                                        value={match.nationality}
                                        options={getCounriesArrey(options.nationality, false)}
                                        onChange={this.handleChange}
                                        lostConnection={lostConnection.includes('nationality')}
                                        loader={loaders.includes('nationality')}
                                        valid={this.checkValid('nationality')}
                                        check={(this.checkField('nationality') || this.state.changed.includes('nationality') || check) || !check && this.checkValid('nationality') && match.nationality}
                                        label="Nationality:" />

                                    <InputInline
                                        type="select"
                                        any={true}
                                        field="education"
                                        value={match.education}
                                        options={getArray(options.education, false)}
                                        valid={this.checkValid('education')}
                                        lostConnection={lostConnection.includes('education')}
                                        loader={loaders.includes('education')}
                                        check={(this.checkField('education') || this.state.changed.includes('education') || check) || !check && this.checkValid('education') && match.education}
                                        onChange={this.handleChange}
                                        label="Education:" />

                                    <div className={cn('fs-18 title form-group', { success: this.validAppearence() && check, danger: !this.validAppearence() && check })}>
                                        Their Appearance
										{(!this.validAppearence() && check) && <span>You missed a few fields :(</span>}
                                    </div>

                                    <div className="wrap-multiple-select">
                                        <div className={`label-multi-select ${((this.checkField('height_to') || this.state.changed.includes('height_to') || check) || !check && this.checkValid('height_to') && match.height_to) ? 'success' : ''}`}>Their height:</div>
                                        <div className="select-multi-select">
                                            <SelectField
                                                any={true}
                                                value={match.height_from}
                                                onChange={val => this.handleChange('height_from', val * 1)}
                                                style={{ minWidth: 100 }}
                                                inputRef={ref => this.height_from = ref}
                                                check={(this.checkField('height_from') || this.state.changed.includes('height_from') || check) || !check && this.checkValid('height_from') && match.height_from}
                                                options={heightArrayBetween(140, match.height_to)} />
                                        </div>
                                        <span className="divider-multi-select">and</span>
                                        <div className="select-multi-select">
                                            <SelectField
                                                any={true}
                                                value={match.height_to}
                                                onChange={val => this.handleChange('height_to', val * 1)}
                                                style={{ minWidth: 100 }}
                                                inputRef={ref => this.height_to = ref}
                                                valid={this.checkValid('height_to')}
                                                check={(this.checkField('height_to') || this.state.changed.includes('height_to') || check) || !check && this.checkValid('height_to') && match.height_to}
                                                options={heightArrayBetween(match.height_to, 216)} />
                                        </div>
                                    </div>

                                    <div className="wrap-multiple-select">
                                        <div className={`label-multi-select ${(this.checkField('weight_from') || this.state.changed.includes('weight_from') || check) || !check && this.checkValid('weight_from') && match.weight_from ? 'success' : ''}`}>Their weight:</div>
                                        <div className="select-multi-select">
                                            <SelectField
                                                any={true}
                                                value={match.weight_from}
                                                onChange={val => this.handleChange('weight_from', val * 1)}
                                                style={{ minWidth: 100 }}
                                                inputRef={ref => this.weight_from = ref}
                                                check={(this.checkField('weight_from') || this.state.changed.includes('weight_from') || check) || !check && this.checkValid('weight_from') && match.weight_from}
                                                options={weightArrayBetween(40, match.weight_from)} />
                                        </div>
                                        <span className="divider-multi-select">and</span>
                                        <div className="select-multi-select">
                                            <SelectField
                                                any={true}
                                                value={match.weight_to}
                                                onChange={val => this.handleChange('weight_to', val * 1)}
                                                style={{ minWidth: 100 }}
                                                inputRef={ref => this.weight_to = ref}
                                                check={(this.checkField('weight_to') || this.state.changed.includes('weight_to') || check) || !check && this.checkValid('weight_to') && match.weight_to}
                                                options={weightArrayBetween(match.weight_to, 221)} />
                                        </div>
                                    </div>
                                    <InputInline
                                        options={getArray(options.hair_color, false)}
                                        field="hair_color"
                                        label="Their hair color:"
                                        value={match.hair_color}
                                        loader={loaders.includes('hair_color')}
                                        lostConnection={lostConnection.includes('hair_color')}
                                        check={(this.checkField('hair_color') || this.state.changed.includes('hair_color')) || !check && this.checkValid('hair_color') && match.hair_color}
                                        onChange={this.handleChange}
                                        any={true}
                                        type="select" />

                                    <InputInline
                                        options={getArray(optionsAll.hair_length, false)}
                                        field="hair_length"
                                        value={match.hair_length}
                                        label="Their hair length:"
                                        loader={loaders.includes('hair_length')}
                                        lostConnection={lostConnection.includes('hair_length')}
                                        valid={this.checkValid('hair_length')}
                                        check={(this.checkField('hair_length') || this.state.changed.includes('hair_length')) || !check && this.checkValid('hair_length') && match.hair_length}
                                        onChange={this.handleChange}
                                        any={true}
                                        type="select" />

                                    <InputInline
                                        any={true}
                                        options={getArray(options.eye_color, false)}
                                        label="Their eye color:"
                                        field="eye_color"
                                        value={match.eye_color}
                                        lostConnection={lostConnection.includes('eye_color')}
                                        loader={loaders.includes('eye_color')}
                                        valid={this.checkValid('eye_color')}
                                        check={(this.checkField('eye_color') || this.state.changed.includes('eye_color')) || !check && this.checkValid('eye_color') && match.eye_color}
                                        onChange={this.handleChange}
                                        type="select" />

                                    <InputInline
                                        any={true}
                                        options={getArray(options.eye_wear, false)}
                                        field="eye_wear"
                                        value={match.eye_wear}
                                        label="Their eye wear:"
                                        lostConnection={lostConnection.includes('eye_wear')}
                                        loader={loaders.includes('eye_wear')}
                                        valid={this.checkValid('eye_wear')}
                                        check={(this.checkField('eye_wear') || this.state.changed.includes('eye_wear')) || !check && this.checkValid('eye_wear') && match.eye_wear}
                                        onChange={this.handleChange}
                                        type="select" />

                                    <InputInline
                                        any={true}
                                        options={getArray(options.body_type, false)}
                                        field="body_type"
                                        value={match.body_type}
                                        label="Their body type:"
                                        lostConnection={lostConnection.includes('body_type')}
                                        loader={loaders.includes('body_type')}
                                        valid={this.checkValid('body_type')}
                                        check={(this.checkField('body_type') || this.state.changed.includes('body_type')) || !check && this.checkValid('body_type') && match.body_type}
                                        onChange={this.handleChange}
                                        type="select" />

                                    <InputInline
                                        any={true}
                                        options={getArray(options.your_ethnicity_is_mostly, false)}
                                        field="your_ethnicity_is_mostly"
                                        value={match.your_ethnicity_is_mostly}
                                        label="Their ethnicity is mostly:"
                                        lostConnection={lostConnection.includes('your_ethnicity_is_mostly')}
                                        loader={loaders.includes('your_ethnicity_is_mostly')}
                                        valid={this.checkValid('your_ethnicity_is_mostly')}
                                        check={(this.checkField('your_ethnicity_is_mostly') || this.state.changed.includes('your_ethnicity_is_mostly')) || !check && this.checkValid('your_ethnicity_is_mostly') && match.your_ethnicity_is_mostly}
                                        onChange={this.handleChange}
                                        type="select" />

                                    <InputInline
                                        any={true}
                                        field="i_consider_my_appearance_as"
                                        value={match.i_consider_my_appearance_as}
                                        options={getArray(options.i_consider_my_appearance_as, false)}
                                        label="Consider their apearance as:"
                                        loader={loaders.includes('i_consider_my_appearance_as')}
                                        lostConnection={lostConnection.includes('i_consider_my_appearance_as')}
                                        valid={this.checkValid('i_consider_my_appearance_as')}
                                        check={(this.checkField('i_consider_my_appearance_as') || this.state.changed.includes('i_consider_my_appearance_as')) || !check && this.checkValid('i_consider_my_appearance_as') && match.i_consider_my_appearance_as}
                                        onChange={this.handleChange}
                                        type="select" />
                                </div>
                                <div className="col-sm-6">
                                    <div className={cn('fs-18 title form-group', { success: this.validLifestyle() && check, danger: !this.validLifestyle() && check })}>
                                        Their Lifestyle
										{(!this.validLifestyle() && check) && <span>You missed a few fields :(</span>}
                                    </div>
                                    <InputInline
                                        any={true}
                                        options={getArray(options.do_you_drink, false)}
                                        valid={this.checkValid('do_you_drink')}
                                        check={(this.checkField('do_you_drink') || this.state.changed.includes('do_you_drink') || check) || !check && this.checkValid('do_you_drink') && match.do_you_drink}
                                        loader={loaders.includes('do_you_drink')}
                                        lostConnection={lostConnection.includes('do_you_drink')}
                                        field="do_you_drink"
                                        value={match.do_you_drink}
                                        type="select"
                                        onChange={this.handleChange}
                                        label="Do they drink?" />

                                    <InputInline
                                        field="do_you_smoke"
                                        any={true}
                                        value={match.do_you_smoke}
                                        loader={loaders.includes('do_you_smoke')}
                                        valid={this.checkValid('do_you_smoke')}
                                        lostConnection={lostConnection.includes('do_you_smoke')}
                                        check={(this.checkField('do_you_smoke') || this.state.changed.includes('do_you_smoke') || check) || !check && this.checkValid('do_you_smoke') && match.do_you_smoke}
                                        options={getArray(options.do_you_smoke, false)}
                                        type="select"
                                        onChange={this.handleChange}
                                        label="Do they smoke?" />

                                    <InputInline
                                        field="marital_status"
                                        any={true}
                                        value={match.marital_status}
                                        lostConnection={lostConnection.includes('marital_status')}
                                        loader={loaders.includes('marital_status')}
                                        valid={this.checkValid('marital_status')}
                                        check={(this.checkField('marital_status') || this.state.changed.includes('marital_status') || check) || !check && this.checkValid('marital_status') && match.marital_status}
                                        onChange={this.handleChange}
                                        options={getArray(options.marital_status, false)}
                                        type="select"
                                        label="Marital Status:" />

                                    <InputInline
                                        field="do_you_have_children"
                                        any={true}
                                        value={match.do_you_have_children}
                                        lostConnection={lostConnection.includes('do_you_have_children')}
                                        loader={loaders.includes('do_you_have_children')}
                                        valid={this.checkValid('do_you_have_children')}
                                        check={(this.checkField('do_you_have_children') || this.state.changed.includes('do_you_have_children') || check) || !check && this.checkValid('do_you_have_children') && match.do_you_have_children}
                                        onChange={this.handleChange}
                                        options={getArray(options.do_you_have_children, false)}
                                        type="select"
                                        label="Do they have children?" />


                                    {
                                        (['58', '59', '60'].includes(match.do_you_have_children))
                                        && <Fragment>
                                            <InputInline
                                                any={true}
                                                field="number_of_children"
                                                value={match.number_of_children}
                                                lostConnection={lostConnection.includes('number_of_children')}
                                                loader={loaders.includes('number_of_children')}
                                                valid={this.checkValid('number_of_children')}
                                                check={(this.checkField('number_of_children') || this.state.changed.includes('number_of_children') || check) || !check && match.number_of_children && this.checkValid('number_of_children') && match.number_of_children}
                                                onChange={this.handleChange}
                                                options={getArrayChildren()}
                                                type="select"
                                                label="Number of children:" />

                                            <InputInline
                                                any={true}
                                                field="oldest_child"
                                                value={match.oldest_child}
                                                lostConnection={lostConnection.includes('oldest_child')}
                                                loader={loaders.includes('oldest_child')}
                                                valid={this.checkValid('oldest_child')}
                                                check={(this.checkField('oldest_child') || this.state.changed.includes('oldest_child') || check) || !check && this.checkValid('oldest_child') && match.oldest_child}
                                                onChange={this.handleChange}
                                                options={getArrayAge()}
                                                type="select"
                                                label="Oldest child:" />
                                            {
                                                match.number_of_children * 1 > 1
                                                && <InputInline
                                                    any={true}
                                                    field="youngest_child"
                                                    value={match.youngest_child}
                                                    lostConnection={lostConnection.includes('youngest_child')}
                                                    loader={loaders.includes('youngest_child')}
                                                    valid={this.checkValid('youngest_child')}
                                                    check={(this.checkField('youngest_child') || this.state.changed.includes('youngest_child') || check) || !check && this.checkValid('youngest_child') && match.youngest_child}
                                                    onChange={this.handleChange}
                                                    options={getArrayAge()}
                                                    type="select"
                                                    label="Youngest child:" />
                                            }
                                        </Fragment>
                                    }

                                    <InputInline
                                        field="do_you_want_more_children"
                                        value={match.do_you_want_more_children}
                                        any={true}
                                        onChange={this.handleChange}
                                        lostConnection={lostConnection.includes('do_you_want_more_children')}
                                        loader={loaders.includes('do_you_want_more_children')}
                                        valid={this.checkValid('do_you_want_more_children')}
                                        check={(this.checkField('do_you_want_more_children') || this.state.changed.includes('do_you_want_more_children') || check) || !check && this.checkValid('do_you_want_more_children') && match.do_you_want_more_children}
                                        options={getArray(options.do_you_want_more_children, false)}
                                        type="select"
                                        label="Do they want (more) children?" />

                                    {/* <InputInline
                                        field="do_you_have_pets"
                                        label="Do you have pets?"
                                        onChange={this.handleChange}
                                        value={match.do_you_have_pets}
                                        options={options.do_you_have_pets}
                                        type="multiselect"
                                        lostConnection={lostConnection.includes('do_you_have_pets')}
                                        loader={loaders.includes('do_you_have_pets')}
                                        valid={this.checkValid('do_you_have_pets')}
                                        check={(this.checkField('do_you_have_pets') || this.state.changed.includes('do_you_have_pets')) || !check && this.checkValid('do_you_have_pets') && match.do_you_have_pets}
                                    /> */}

                                    {/* <InputInline
                                        field="occupation"
                                        value={match.occupation}
                                        options={getArray(options.occupation)}
                                        type="select"
                                        lostConnection={lostConnection.includes('occupation')}
                                        loader={loaders.includes('occupation')}
                                        valid={this.checkValid('occupation')}
                                        check={(this.checkField('occupation') || this.state.changed.includes('occupation')) || !check && this.checkValid('occupation') && match.occupation}
                                        onChange={this.handleChange}
                                        label="Occupation:" /> */}

                                    <InputInline
                                        type="select"
                                        any={true}
                                        field="employment_status"
                                        value={match.employment_status}
                                        options={getArray(options.employment_status, false)}
                                        onChange={this.handleChange}
                                        lostConnection={lostConnection.includes('employment_status')}
                                        loader={loaders.includes('employment_status')}
                                        valid={this.checkValid('employment_status')}
                                        check={(this.checkField('employment_status') || this.state.changed.includes('employment_status')) || !check && this.checkValid('employment_status') && match.employment_status}
                                        label="Employment status:" />

                                    <InputInline
                                        type="select"
                                        any={true}
                                        value={match.home_type}
                                        field="home_type"
                                        options={getArray(options.home_type, false)}
                                        onChange={this.handleChange}
                                        lostConnection={lostConnection.includes('home_type')}
                                        loader={loaders.includes('home_type')}
                                        valid={this.checkValid('home_type')}
                                        check={(this.checkField('home_type') || this.state.changed.includes('home_type')) || !check && this.checkValid('home_type') && match.home_type}
                                        label="Home type:" />

                                    <InputInline
                                        type="select"
                                        any={true}
                                        field="living_situation"
                                        value={match.living_situation}
                                        options={getArray(options.living_situation, false)}
                                        onChange={this.handleChange}
                                        lostConnection={lostConnection.includes('living_situation')}
                                        loader={loaders.includes('living_situation')}
                                        valid={this.checkValid('living_situation')}
                                        check={(this.checkField('living_situation') || this.state.changed.includes('living_situation')) || !check && this.checkValid('living_situation') && match.living_situation}
                                        label="Living situation:" />

                                    <InputInline
                                        type="select"
                                        any={true}
                                        value={match.willing_to_relocate}
                                        field="willing_to_relocate"
                                        options={getArray(options.willing_to_relocate, false)}
                                        lostConnection={lostConnection.includes('willing_to_relocate')}
                                        loader={loaders.includes('willing_to_relocate')}
                                        valid={this.checkValid('willing_to_relocate')}
                                        check={(this.checkField('willing_to_relocate') || this.state.changed.includes('willing_to_relocate')) || !check && this.checkValid('willing_to_relocate') && match.willing_to_relocate}
                                        onChange={this.handleChange}
                                        label="Willing to relocate:" />

                                    {/* <InputInline
                                        label="Relationship you’re looking for:"
                                        field="relationship_youre_looking_for"
                                        loader={loaders.includes('relationship_youre_looking_for')}
                                        lostConnection={lostConnection.includes('relationship_youre_looking_for')}
                                        value={match.relationship_youre_looking_for}
                                        onChange={this.handleChange}
                                        options={options.relationship_youre_looking_for}
                                        valid={this.checkValid('relationship_youre_looking_for')}
                                        check={(this.checkField('relationship_youre_looking_for') || this.state.changed.includes('relationship_youre_looking_for'))}
                                        type="multiselect" /> */}
                                    <div className={cn('fs-18 title form-group', { success: this.validBackgound() && check, danger: !this.validBackgound() && check })}>
                                        Their Backgound/Cultural Values
										{(!this.validBackgound() && check) && <span>You missed a few fields :(</span>}
                                    </div>

                                    <InputInline
                                        type="select-multiple"
                                        any={true}
                                        valid={this.checkValid('languages_spoken')}
                                        check={(this.checkField('languages_spoken') || this.state.changed.includes('languages_spoken')) || !check && this.checkValid('languages_spoken') && match.languages_spoken}
                                        loader={loaders.includes('languages_spoken')}
                                        lostConnection={lostConnection.includes('languages_spoken')}
                                        value={match.languages_spoken}
                                        field="languages_spoken"
                                        options={getArray(options.languages_spoken, false)}
                                        onChange={this.handleChange}
                                        label="Language spoken:"
                                        id="language_wrap" />

                                    {typeof(match.languages_spoken) != 'undefined' && <Select
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        defaultValue={languages_pre}
                                        isMulti
                                        options={languages}
                                        onChange={this.onChangeSelect}
                                        id="lang_spok"
                                        isSearchable={false}
                                        placeholder= 'Any'
                                    />}

                                    <InputInline
                                        type="select"
                                        any={true}
                                        value={match.english_language_ability}
                                        field="english_language_ability"
                                        lostConnection={lostConnection.includes('english_language_ability')}
                                        valid={this.checkValid('english_language_ability')}
                                        check={(this.checkField('english_language_ability') || this.state.changed.includes('english_language_ability')) || !check && this.checkValid('english_language_ability') && match.english_language_ability}
                                        loader={loaders.includes('english_language_ability')}
                                        options={getArray(options.english_language_ability, false)}
                                        onChange={this.handleChange}
                                        label="English language ability:" />

                                    <InputInline
                                        type="select"
                                        any={true}
                                        valid={this.checkValid('religion')}
                                        check={(this.checkField('religion') || this.state.changed.includes('religion')) || !check && this.checkValid('religion') && match.religion}
                                        loader={loaders.includes('religion')}
                                        lostConnection={lostConnection.includes('religion')}
                                        field="religion"
                                        value={match.religion}
                                        options={getArray(options.religion, false)}
                                        onChange={this.handleChange}
                                        label="Religion:" />

                                    <InputInline
                                        type="select"
                                        any={true}
                                        valid={this.checkValid('star_sign')}
                                        lostConnection={lostConnection.includes('star_sign')}
                                        check={(this.checkField('star_sign') || this.state.changed.includes('star_sign')) || !check && this.checkValid('star_sign') && match.star_sign}
                                        loader={loaders.includes('star_sign')}
                                        value={match.star_sign}
                                        field="star_sign"
                                        options={getArray(options.star_sign, false)}
                                        onChange={this.handleChange}
                                        label="Star sign:" />
                                </div>
                            </div>
                            <div className="text-center" id="btn-next-match">
								<BtnMain text="Next: Your Interests" className="btn-green" onClick={this.save} />
							</div>
                            {/* <div className="text-center edit_btn">
                                <BtnMain text="Submit" className="btn-green" onClick={this.save} />
                            </div> */}
                        </div>
                        <style jsx>{`
                            #lang_spok{
                                display: none;
                            }
                             .accordion__item {
                                position: relative;
                            }

                            .success .wrap-select-field {
                                border: none;
                            }

                            .label-multi-select.success {
                                color: #98D538;
                            }

							.asterix {
								cursor: pointer;
								color: #a94442;
							}

                            .title {
                                background-color: #F9F9F9;
                                padding: 15px;
                                border-radius: 9px;
                                font-weight: bold;
                                margin-top: 35px;
                            }

                            .wrap-multiple-select {
                                display: flex;
                                align-items: center;
                                
                                margin-bottom: 15px;
                            }

                            .label-multi-select {
                                margin-right: 5px;
                                width: 30%;
                                padding-left: 15px;
                                font-weight: bold;
                            }

                            .distance {
                                margin-left: 10px;
                            }

                            .distance .block-select:first-child {
                                border-radius: 9px 0px 0px 9px;
                            }

                            .distance .block-select:last-child {
                                border-radius: 0px 9px 9px 0px;
                            }

                            .divider-multi-select {
                                margin-right: 10px;
                                margin-left: 10px;
                            }

                            .asterix-message {
								color: #a94442 !important;
								padding: 15px;
								font-weight: 600;
                            }

                            .arrow-right {
								font-size: 31px;
								vertical-align: sub;
								margin-right: 5px;
								animation: blink-animation 1s steps(5, start) infinite;
							}

							@keyframes blink-animation {
								to {
									visibility: hidden;
								}
							}
							@-webkit-keyframes blink-animation {
								to {
									visibility: hidden;
								}
							}
                            .block-select {
                                border: 1px solid #ccc;
                                padding: 10px 0px;
                                color: #555;
                                cursor: pointer;
                                white-space: nowrap;
                                width: 100px;
                                text-align: center;
                                height: 42px;
                            }

                            #multiselectContainerReact{
                                width: 90% !important;
                            }
                            
                            .block-select.selected,
                            .block-select:hover {
                                background-color: #F1FFE0;
                            }
                            @media (max-width: 768px) {
                                .wrap-multiple-select .select-multi-select{
                                    width: 38%;
                                }
                                #multiselectContainerReact{
                                    width: 90%;
                                }
                                .title{
                                    font-size: 17px;
                                }
                                #lang_spok{
                                    display: block !important;
                                }
                            }
                            @media (max-width: 415px) {
                                .wrap-multiple-select {
                                    flex-wrap: wrap;
                                }
                                .label-multi-select {
                                    width: 100%;
                                    margin-bottom: 3px;
                                }
                            }
                            .divider-multi-select {
                                margin-right: 10px;
                                margin-left: 10px;
                            }                            
                        `}
                        </style>
                    </ProfileLayout>
                </PrivateLayout>
            </Layout >
        )
    }
}

const mapStateToProps = ({ search, user, ui }) => {
    return {
        match: user.match,
        search: search.params,
        //options: ui.optionsMatch.match_params,
        options: ui.optionsSearch.search_params,
        optionsAll: ui.options.profile_params,
        location_options: ui.optionsMatch.location_params,
        inValid: ui.inValid,
        user: user.params,
        token: user.token,
    }
}

export default connect(mapStateToProps)(Edit)