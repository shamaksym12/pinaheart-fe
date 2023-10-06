import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import PrivateLayout from '../../layouts/private'
import SearchLayout from '../../layouts/search'
import TextField from '../../components/inputs/text_field'
import BtnMain from '../../components/buttons/btn_main'
import { Router } from '../../routes'
import cn from 'classnames'
import InputInline from '../../components/inputs/InputInline'
import SelectField from '../../components/inputs/select_field'
import { getArray, heightArray, weightArray, getArrayAge, ageArray, getMultiArray, ageArrayBetween, heightArrayBetween, weightArrayBetween, getCounriesArrey } from '../../utils'
import Autocomplete from '../../components/inputs/autocomplete'
import CheckboxField from '../../components/inputs/checkbox_field'
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion'
import { getOptionsSearch, getLocations } from '../../actions/ui'
import { getSearch } from '../../actions/search'
import { getMyCountry } from '../../api'
import Head from 'next/head'
import { setMembersKey } from '../../actions/members'
import { getUserMatch } from '../../actions/user'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

const initSearch = { formatted_address: '', distance_unit: 'kms', sort: 'last_active' }

const AccordionBlock = ({ title, body, selected, success }) => {
    return <AccordionItem>
        <AccordionItemTitle className={`accordion__title ${success ? 'success' : ''}`}>
            <div className="u-position-relative">
                <span>{title}</span>
                <span style={{ marginLeft: 10 }}>{selected}</span>
                <div className="accordion__arrow" role="presentation"></div>
            </div>
        </AccordionItemTitle>
        <AccordionItemBody>
            {body}
        </AccordionItemBody>
    </AccordionItem>
}

class Search extends Component {
    static async getInitialProps({ query }) {
        return { searchId: query.searchId }
    }
    state = {
        onlyWithPhoto: false,
        search: initSearch,
        search_name: ''
    }

    save = () => {
        const { search } = this.state
        let params = {}
        if (Object.keys(search).length) {
            params.search = search
        }
        if (this.state.search_name) {
            params.name = this.state.search_name
        }
        params = JSON.stringify(params)
        Router.pushRoute(`/results?query=${params}`)
    }

    clearForm = () => {
        this.setState({ search: initSearch })
    }

    handleChangeName = (field, value) => {
        this.setState({ [field]: value })
    }

    handleChange = (field, value) => {
        this.setState({ search: { ...this.state.search, [field]: value } })
    }

    onChangeSelect = (values) => {
        var value = []
        if (values) {
            for (var i = 0; i < values.length; i++) {
                value[i] = '' + values[i].value
            }
        }
		this.setState({ search: { ...this.state.search, ['languages_spoken']: value } })
    }

    handleChangeCountry = (field, data) => {
        this.setState({ search: { ...this.state.search, formatted_address: '', place: '', country_id: data.value } })
        // this.handleChange(field, data.value)
    }

    handleChangeCity = (value) => {
        this.handleChange('formatted_address', value)
    }

    handleSelectCity = (value, place) => {
        this.handleChange('formatted_address', value)
        const keys = ['formatted_address', 'place_id', 'geometry']

        const temp = Object.keys(place).reduce((obj, key) => {
            if (keys.includes(key)) {
                obj[key] = place[key]
            }
            return obj
        }, {})
        this.handleChange('place', temp)
    }

    getSelected = (array, selected) => {
        array = getArray(array, false)
        if (!selected || (selected && !selected.length)) {
            return 'Any'
        }
        return array.filter(item => selected.includes(item.id)).map(item => item.name).join(', ')
    }

    getSelectedLanguages = (array, selected) => {
        array = getMultiArray(array, false)
        if (!selected || (selected && !selected.length)) {
            return 'Any'
        }
        var result = ''
        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < selected.length; j++) {
                if (selected[j] == array[i].id) {
                    // if (j == selected.length - 1) result += array[i].name
                    // else result += array[i].name + ', '
                    result += array[i].name
                    if (selected.length > 1) result += ', '
                }
            }
        }
        // return array.filter(item => selected.includes(item.id.toString())).map(item => item.name).join(', ')
        return result
    }

    getSelectedLanguagesChild = (array, selected) => {
        array = getMultiArray(array, false)
        if (!selected || (selected && !selected.length)) {
            return 'Any'
        }
        var result = []
        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < selected.length; j++) {
                if (selected[j] == array[i].id) {
                    var temp = {label: array[i].name, value: array[i].id}
                    result[j] = temp
                }
            }
        }
        // return array.filter(item => selected.includes(item.id.toString())).map(item => item.name).join(', ')
        return result
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

    getSelectedAge = (array, selected) => {
        const val = array.find(item => item.id == selected)
        return val ? `${val.name} age` : 'Any'
    }

    componentDidMount() {
        window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
        const { dispatch, searchId } = this.props
        dispatch(getUserMatch())
        dispatch(getOptionsSearch()).then(options => {
            if (options && searchId) {
                dispatch(getSearch(searchId)).then(res => {
                    this.setState({
                        search_name: res.name,
                        search: {
                            ...res.data.params,
                            sort: res.data.sort,
                            with_photo: res.data.with_photo,
                            country_id: res.data.country_id,
                            age_to: res.data.age_to,
                            age_from: res.data.age_from,
                            last_active: res.data.last_active,
                            sex: res.data.sex,
                        },
                    })
                })
            } else {
                this.setState({
                    search: {
                        ...this.state.search,
                        iam: options.search_params.iam,
                        with_photo: true
                        // sex: options.search_params.iam === 'M' ? 'F' : 'M'
                    }
                })
                
                // getMyCountry().then(res => {
                //     const country = options.location_params.countries.find(country => country.code === res.country)
                //     if (country) {
                //         this.handleChange('country_id', country.id)
                //     }
                // })
            }
        })
    }
    componentWillReceiveProps = (next_props) => {
        const { match } = next_props
        const data = {
            search: {
                ...this.state.search,
                ...match,
                last_active: "3month"
            }
        }
        this.setState(data)
    }

    componentWillUnmount = () => {
        const { dispatch } = this.props
        const data = {
            last_page: 1,
            current_page: 1,
            next_page_url: null,
            prev_page_url: null,
            data: [],
            per_page: 0,
            to: 0,
            total: 0,
        }
        dispatch(setMembersKey('people', data))
    }

    render() {
        const {
            location_options,
            options,
        } = this.props
        const { search } = this.state
        const selectedCountry = location_options.countries.find(country => country.id === search.country_id * 1) || {}

        const languages = []
        const languages_pre = []
        var k = 0
        
        if (typeof(search.languages_spoken) != 'undefined') {
            for (var i = 0; i < options.languages_spoken.length; i++) {
                var temp = {label: options.languages_spoken[i].name, value: options.languages_spoken[i].id}
                languages[i] = temp
                if (search.languages_spoken) {
                    for (var j = 0; j < search.languages_spoken.length; j++) {
                        if (options.languages_spoken[i].id == search.languages_spoken[j]){
                            languages_pre[k] = temp
                            k++
                        }
                    }
                }
            }
            var lang = document.getElementsByClassName('css-1wa3eu0-placeholder')
            if (lang.length) lang[0].innerHTML = 'Any'
        }
        
        const animatedComponents = makeAnimated();
        
        return (
            <Layout page="search" clearForm={this.clearForm}>
                <PrivateLayout>
                    <SearchLayout page="search">
                        <Head page="search">
                            <title>PinaHeart.com</title>
                        </Head>
                        <div className="search_con search_wrap_desktop">
                            <div className="fs-18 title form-group d-flex justify-content-between no_mobile">
                                <div>Advanced Search</div>
                                <BtnMain text="Clear form" className="btn-outline" onClick={this.clearForm} />
                            </div>
                            <div className={cn('fs-18 title form-group no_mobile')}>
                                Basics
                            </div>
                            <div className="row form-group">
                                <div className="col-sm-6">
                                    <InputInline
                                        label="I’m a:"
                                        type="select"
                                        field="iam"
                                        options={[{ id: '', name: 'Any' }, { id: 'M', name: 'Male' }, { id: 'F', name: 'Female' }]}
                                        onChange={this.handleChange}
                                        value={search.iam} />
                                    <InputInline
                                        label="I’m seeking a:"
                                        type="select"
                                        field="sex"
                                        options={[{ id: '', name: 'Any' }, { id: 'M', name: 'Male' }, { id: 'F', name: 'Female' }]}
                                        onChange={this.handleChange}
                                        value={search.sex} />
                                    <div className="wrap-multiple-select">
                                        <div className="label-multi-select">Aged between</div>
                                        <div className="select-multi-select">
                                            <SelectField
                                                onChange={val => this.handleChange('age_from', val)}
                                                style={{ minWidth: 100 }}
                                                value={search.age_from}
                                                options={ageArrayBetween(18, search.age_to)} />
                                        </div>
                                        <span className="divider-multi-select">and</span>
                                        <div className="select-multi-select">
                                            <SelectField
                                                onChange={val => this.handleChange('age_to', val)}
                                                style={{ minWidth: 100 }}
                                                value={search.age_to}
                                                options={ageArrayBetween(search.age_from, 70)} />
                                        </div>
                                    </div>
                                    <InputInline
                                        label="Sort results by:"
                                        type="select"
                                        field="sort"
                                        options={[
                                            { id: 'last_active', name: 'Last active' },
                                            { id: 'newest', name: 'Newest members' },
                                            { id: 'youngest', name: 'Youngest' }
                                        ]}
                                        onChange={this.handleChange}
                                        value={search.sort} />
                                    <div className="wrap-multiple-select">
                                        <div className="label-multi-select"></div>
                                        <div className="select-multi-select">
                                            <CheckboxField
                                                id="photo"
                                                onChange={val => this.handleChange('with_photo', val)}
                                                text="Only show profiles with photo"
                                                checked={search.with_photo} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <InputInline
                                        label="Living in:"
                                        onChange={this.handleChangeCountry}
                                        options={getCounriesArrey(location_options.countries, false, 1)}
                                        field="country_id"
                                        value={search.country_id}
                                        type="select" />
                                    {
                                        search.country_id
                                        && <Autocomplete
                                            label="Find more precise location"
                                            onSelect={this.handleSelectCity}
                                            onChange={this.handleChangeCity}
                                            value={search.formatted_address}
                                            field="formatted_address"
                                            country={selectedCountry.code} />
                                    }
                                    {
                                        search.place
                                        && <div className="wrap-multiple-select">
                                            <div className="label-multi-select">
                                                <div>Expand search by:</div>
                                                <div className="fs-12">(optional)</div>
                                            </div>
                                            <div className="select-multi-select">
                                                <SelectField
                                                    onChange={val => this.handleChange('distance', val)}
                                                    style={{ minWidth: 100 }}
                                                    value={search.distance}
                                                    options={[
                                                        { id: '', name: '' },
                                                        { id: 50, name: '50' },
                                                        { id: 100, name: '100' },
                                                        { id: 250, name: '250' },
                                                        { id: 500, name: '500' },
                                                    ]} />
                                            </div>
                                            <div className="select-multi-select d-flex distance">
                                                <div onClick={() => this.handleChange('distance_unit', 'kms')}
                                                    className={cn('block-select', { selected: search.distance_unit === 'kms' })}>
                                                    kms
                                                    </div>
                                                <div onClick={() => this.handleChange('distance_unit', 'miles')}
                                                    className={cn('block-select', { selected: search.distance_unit === 'miles' })}>
                                                    miles
                                                    </div>
                                            </div>
                                        </div>
                                    }
                                    <InputInline
                                        label="Last Active:"
                                        type="select"
                                        field="last_active"
                                        onChange={this.handleChange}
                                        options={[
                                            { id: '', name: 'Any' },
                                            { id: 'week', name: 'Within week' },
                                            { id: 'month', name: 'Within 1 month' },
                                            { id: '3month', name: 'Within 3 months' },
                                            { id: '6month', name: 'Within 6 months' },
                                            { id: 'year', name: 'Within year' },
                                        ]}
                                        onChange={this.handleChange}
                                        value={search.last_active} />
                                    <InputInline
                                        any={true}
                                        options={getArray(options.relationship_youre_looking_for, false)}
                                        onChange={this.handleChange}
                                        field="relationship_youre_looking_for"
                                        value={search.relationship_youre_looking_for}
                                        label="Searching for:"
                                        type="multiselect" />

                                </div>
                            </div>
                            <div className="form-group no_mobile">
                                <div className="text-center">
                                    <BtnMain text="Submit" className="btn-green" onClick={this.save} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className={cn('fs-18 title form-group')}>
                                        Their appearance
                                    </div>
                                    <div className="form-group">
                                        <Accordion>
                                            <AccordionBlock
                                                title="Hair color:"
                                                success={search.hair_color}
                                                selected={this.getSelected(options.hair_color, search.hair_color)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.hair_color, false)}
                                                        onChange={this.handleChange}
                                                        value={search.hair_color}
                                                        field="hair_color"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Hair length:"
                                                success={search.hair_length}
                                                selected={this.getSelected(options.hair_length, search.hair_length)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.hair_length, false)}
                                                        onChange={this.handleChange}
                                                        value={search.hair_length}
                                                        field="hair_length"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Eye color:"
                                                success={search.eye_color}
                                                selected={this.getSelected(options.eye_color, search.eye_color)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.eye_color, false)}
                                                        onChange={this.handleChange}
                                                        value={search.eye_color}
                                                        field="eye_color"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Eye wear:"
                                                success={search.eye_wear}
                                                selected={this.getSelected(options.eye_wear, search.eye_wear)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.eye_wear, false)}
                                                        onChange={this.handleChange}
                                                        value={search.eye_wear}
                                                        field="eye_wear"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Height:"
                                                success={search.height_from || search.height_to}
                                                selected={this.getSelectedArray(heightArray(false), search.height_from, search.height_to)}
                                                body={
                                                    <div className="wrap-multiple-select">
                                                        <div className="select-multi-select">
                                                            <SelectField
                                                                value={search.height_from}
                                                                onChange={val => this.handleChange('height_from', val * 1)}
                                                                style={{ minWidth: 100 }}
                                                                inputRef={ref => this.height_from = ref}
                                                                options={heightArrayBetween(140, search.height_to)} />
                                                        </div>
                                                        <span className="divider-multi-select">to</span>
                                                        <div className="select-multi-select">
                                                            <SelectField
                                                                value={search.height_to}
                                                                onChange={val => this.handleChange('height_to', val * 1)}
                                                                style={{ minWidth: 100 }}
                                                                inputRef={ref => this.height_to = ref}
                                                                options={heightArrayBetween(search.height_from, 216)} />
                                                        </div>
                                                    </div>
                                                } />
                                            <AccordionBlock
                                                title="Weight:"
                                                success={search.weight_from || search.weight_to}
                                                selected={this.getSelectedArray(weightArray(false), search.weight_from, search.weight_to)}
                                                body={
                                                    <div className="wrap-multiple-select">
                                                        <div className="select-multi-select">
                                                            <SelectField
                                                                value={search.weight_from}
                                                                onChange={val => this.handleChange('weight_from', val * 1)}
                                                                style={{ minWidth: 100 }}
                                                                inputRef={ref => this.weight_from = ref}
                                                                options={weightArrayBetween(40, search.weight_to)} />
                                                        </div>
                                                        <span className="divider-multi-select">to</span>
                                                        <div className="select-multi-select">
                                                            <SelectField
                                                                value={search.weight_to}
                                                                onChange={val => this.handleChange('weight_to', val * 1)}
                                                                style={{ minWidth: 100 }}
                                                                inputRef={ref => this.weight_to = ref}
                                                                options={weightArrayBetween(search.weight_from, 221)} />
                                                        </div>
                                                    </div>
                                                } />
                                            <AccordionBlock
                                                title="Body type:"
                                                success={search.body_type}
                                                selected={this.getSelected(options.body_type, search.body_type)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.body_type, false)}
                                                        onChange={this.handleChange}
                                                        value={search.body_type}
                                                        field="body_type"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Their ethnicity mostly:"
                                                success={search.your_ethnicity_is_mostly}
                                                selected={this.getSelected(options.your_ethnicity_is_mostly, search.your_ethnicity_is_mostly)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.your_ethnicity_is_mostly, false)}
                                                        onChange={this.handleChange}
                                                        value={search.your_ethnicity_is_mostly}
                                                        field="your_ethnicity_is_mostly"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Consider their appearence as:"
                                                success={search.i_consider_my_appearance_as}
                                                selected={this.getSelected(options.i_consider_my_appearance_as, search.i_consider_my_appearance_as)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.i_consider_my_appearance_as, false)}
                                                        onChange={this.handleChange}
                                                        value={search.i_consider_my_appearance_as}
                                                        field="i_consider_my_appearance_as"
                                                        type="multiselect" />
                                                } />
                                        </Accordion>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className={cn('fs-18 title form-group')}>
                                        Their lifestyle
                                    </div>
                                    <div className="form-group">
                                        <Accordion>
                                            <AccordionBlock
                                                title="Do they drink?"
                                                success={search.do_you_drink}
                                                selected={this.getSelected(options.do_you_drink, search.do_you_drink)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.do_you_drink, false)}
                                                        onChange={this.handleChange}
                                                        value={search.do_you_drink}
                                                        field="do_you_drink"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Do they smoke?"
                                                success={search.do_you_smoke}
                                                selected={this.getSelected(options.do_you_smoke, search.do_you_smoke)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.do_you_smoke, false)}
                                                        onChange={this.handleChange}
                                                        value={search.do_you_smoke}
                                                        field="do_you_smoke"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Marital status:"
                                                success={search.marital_status}
                                                selected={this.getSelected(options.marital_status, search.marital_status)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.marital_status, false)}
                                                        onChange={this.handleChange}
                                                        value={search.marital_status}
                                                        field="marital_status"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Do they have children?"
                                                success={search.do_you_have_children}
                                                selected={this.getSelected(options.do_you_have_children, search.do_you_have_children)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.do_you_have_children, false)}
                                                        onChange={this.handleChange}
                                                        value={search.do_you_have_children}
                                                        field="do_you_have_children"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Youngest child (or above):"
                                                success={search.youngest_child}
                                                selected={this.getSelectedAge(getArrayAge(), search.youngest_child)}
                                                body={
                                                    <div className="row">
                                                        <div className="col-sm-4">
                                                            <SelectField
                                                                value={search.youngest_child}
                                                                onChange={val => this.handleChange('youngest_child', val * 1)}
                                                                inputRef={ref => this.youngest_child = ref}
                                                                options={getArrayAge(false)} />
                                                        </div>
                                                    </div>
                                                } />
                                            <AccordionBlock
                                                title="Oldest child (or below):"
                                                success={search.oldest_child}
                                                selected={this.getSelectedAge(getArrayAge(), search.oldest_child)}
                                                body={
                                                    <div className="row">
                                                        <div className="col-sm-4">
                                                            <SelectField
                                                                value={search.oldest_child}
                                                                onChange={val => this.handleChange('oldest_child', val * 1)}
                                                                inputRef={ref => this.oldest_child = ref}
                                                                options={getArrayAge(false)} />
                                                        </div>
                                                    </div>
                                                } />
                                            <AccordionBlock
                                                title="Do they want (more) children?"
                                                success={search.do_you_want_more_children}
                                                selected={this.getSelected(options.do_you_want_more_children, search.do_you_want_more_children)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.do_you_want_more_children, false)}
                                                        onChange={this.handleChange}
                                                        value={search.do_you_want_more_children}
                                                        field="do_you_want_more_children"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Employment status:"
                                                success={search.employment_status}
                                                selected={this.getSelected(options.employment_status, search.employment_status)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.employment_status, false)}
                                                        onChange={this.handleChange}
                                                        value={search.employment_status}
                                                        field="employment_status"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Home type:"
                                                success={search.home_type}
                                                selected={this.getSelected(options.home_type, search.home_type)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.home_type, false)}
                                                        onChange={this.handleChange}
                                                        value={search.home_type}
                                                        field="home_type"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Living situation:"
                                                success={search.living_situation}
                                                selected={this.getSelected(options.living_situation, search.living_situation)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.living_situation, false)}
                                                        onChange={this.handleChange}
                                                        value={search.living_situation}
                                                        field="living_situation"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Willing to relocate:"
                                                success={search.willing_to_relocate}
                                                selected={this.getSelected(options.willing_to_relocate, search.willing_to_relocate)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.willing_to_relocate, false)}
                                                        onChange={this.handleChange}
                                                        value={search.willing_to_relocate}
                                                        field="willing_to_relocate"
                                                        type="multiselect" />
                                                } />
                                        </Accordion>
                                    </div>
                                </div>
                            </div>
                            <div className={cn('fs-18 title form-group')}>
                                Their background / cultural values
                            </div>
                            <div className="form-group">
                                <Accordion>
                                    <AccordionBlock
                                        title="Nationality:"
                                        success={search.nationality}
                                        selected={this.getSelected(options.nationality, search.nationality)}
                                        body={
                                            <InputInline
                                                any={true}
                                                row={4}
                                                accordion={true}
                                                options={getArray(options.nationality, false)}
                                                onChange={this.handleChange}
                                                value={search.nationality}
                                                field="nationality"
                                                type="multiselect" />
                                        } />
                                    <AccordionBlock
                                        title="Education (or above):"
                                        success={search.education}
                                        selected={this.getSelected(options.education, search.education)}
                                        body={
                                            <InputInline
                                                any={true}
                                                accordion={true}
                                                options={getArray(options.education, false)}
                                                onChange={this.handleChange}
                                                value={search.education}
                                                field="education"
                                                type="multiselect" />
                                        } />
                                    <AccordionBlock
                                        title="Languages spoken:"
                                        success={search.languages_spoken}
                                        selected={this.getSelectedLanguages(options.languages_spoken, search.languages_spoken)}
                                        body={
                                            <InputInline
                                                any={true}
                                                value={search.languages_spoken}
                                                type="select-multiple"
                                                field="languages_spoken"
                                                options={getMultiArray(options.languages_spoken, false)}
                                                onChange={this.handleChange}
                                                label="Language spoken:" />
                                        } />
                                    <AccordionBlock
                                        title="English language ability (or above):"
                                        success={search.english_language_ability}
                                        selected={this.getSelected(options.english_language_ability, search.english_language_ability)}
                                        body={
                                            <InputInline
                                                any={true}
                                                accordion={true}
                                                options={getArray(options.english_language_ability, false)}
                                                onChange={this.handleChange}
                                                value={search.english_language_ability}
                                                field="english_language_ability"
                                                type="multiselect" />
                                        } />
                                    <AccordionBlock
                                        title="Religion:"
                                        success={search.religion}
                                        selected={this.getSelected(options.religion, search.religion)}
                                        body={
                                            <InputInline
                                                any={true}
                                                accordion={true}
                                                options={getArray(options.religion, false)}
                                                onChange={this.handleChange}
                                                value={search.religion}
                                                field="religion"
                                                type="multiselect" />
                                        } />
                                    <AccordionBlock
                                        title="Star sign:"
                                        selected={this.getSelected(options.star_sign, search.star_sign)}
                                        body={
                                            <InputInline
                                                any={true}
                                                accordion={true}
                                                options={getArray(options.star_sign, false)}
                                                onChange={this.handleChange}
                                                value={search.star_sign}
                                                field="star_sign"
                                                type="multiselect" />
                                        } />
                                </Accordion>
                            </div>
                            <InputInline
                                label="Save search as:"
                                type="text"
                                field="search_name"
                                onChange={this.handleChangeName}
                                value={this.state.search_name} />
                            <div className="text-center search_button">
                                <BtnMain text="Submit" className="btn-green" onClick={this.save} />
                            </div>
                        </div>
                        <div className="search_con search_wrap_mobile">
                            <div className="row form-group">
                                <div className="col-sm-6">
                                    <InputInline
                                        label="I’m a"
                                        type="select"
                                        field="iam"
                                        options={[{ id: '', name: 'Any' }, { id: 'M', name: 'Male' }, { id: 'F', name: 'Female' }]}
                                        onChange={this.handleChange}
                                        value={search.iam} />
                                    <InputInline
                                        label="I’m seeking a"
                                        type="select"
                                        field="sex"
                                        options={[{ id: '', name: 'Any' }, { id: 'M', name: 'Male' }, { id: 'F', name: 'Female' }]}
                                        onChange={this.handleChange}
                                        value={search.sex} />
                                    <div className="wrap-multiple-select age_wrap">
                                        <div className="label-multi-select">Aged between</div>
                                        <div className="select-multi-select">
                                            <SelectField
                                                onChange={val => this.handleChange('age_from', val)}
                                                style={{ minWidth: 100 }}
                                                value={search.age_from}
                                                options={ageArrayBetween(18, search.age_to)} />
                                        </div>
                                        <span className="divider-multi-select">and</span>
                                        <div className="select-multi-select">
                                            <SelectField
                                                onChange={val => this.handleChange('age_to', val)}
                                                style={{ minWidth: 100 }}
                                                value={search.age_to}
                                                options={ageArrayBetween(search.age_from, 70)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <InputInline
                                        label="Living in:"
                                        onChange={this.handleChangeCountry}
                                        options={getCounriesArrey(location_options.countries, false, 1)}
                                        field="country_id"
                                        value={search.country_id}
                                        type="select" />
                                    {
                                        search.country_id
                                        && <Autocomplete
                                            label="Find more precise location"
                                            onSelect={this.handleSelectCity}
                                            onChange={this.handleChangeCity}
                                            value={search.formatted_address}
                                            field="formatted_address"
                                            country={selectedCountry.code} />
                                    }
                                    {
                                        search.place
                                        && <div className="wrap-multiple-select">
                                            <div className="label-multi-select">
                                                <div>Expand search by:</div>
                                                <div className="fs-12">(optional)</div>
                                            </div>
                                            <div className="select-multi-select">
                                                <SelectField
                                                    onChange={val => this.handleChange('distance', val)}
                                                    style={{ minWidth: 100 }}
                                                    value={search.distance}
                                                    options={[
                                                        { id: '', name: '' },
                                                        { id: 50, name: '50' },
                                                        { id: 100, name: '100' },
                                                        { id: 250, name: '250' },
                                                        { id: 500, name: '500' },
                                                    ]} />
                                            </div>
                                            <div className="select-multi-select d-flex distance">
                                                <div onClick={() => this.handleChange('distance_unit', 'kms')}
                                                    className={cn('block-select', { selected: search.distance_unit === 'kms' })}>
                                                    kms
                                                    </div>
                                                <div onClick={() => this.handleChange('distance_unit', 'miles')}
                                                    className={cn('block-select', { selected: search.distance_unit === 'miles' })}>
                                                    miles
                                                    </div>
                                            </div>
                                        </div>
                                    }
                                    <InputInline
                                        any={true}
                                        options={getArray(options.relationship_youre_looking_for, false)}
                                        onChange={this.handleChange}
                                        field="relationship_youre_looking_for"
                                        value={search.relationship_youre_looking_for}
                                        label="Searching for:"
                                        type="multiselect" />
                                    <div className="text-center search_button">
                                        <BtnMain text="Submit" className="btn-green" onClick={this.save} />
                                    </div>
                                    <div className="wrap-multiple-select">
                                        <div className="label-multi-select"></div>
                                        <div className="select-multi-select onlyshow">
                                            <CheckboxField
                                                id="photo"
                                                onChange={val => this.handleChange('with_photo', val)}
                                                text="Only show profiles with photo"
                                                checked={search.with_photo} />
                                        </div>
                                    </div>
                                    <InputInline
                                        label="Last Active:"
                                        type="select"
                                        field="last_active"
                                        onChange={this.handleChange}
                                        options={[
                                            { id: '', name: 'Any' },
                                            { id: 'week', name: 'Within week' },
                                            { id: 'month', name: 'Within 1 month' },
                                            { id: '3month', name: 'Within 3 months' },
                                            { id: '6month', name: 'Within 6 months' },
                                            { id: 'year', name: 'Within year' },
                                        ]}
                                        onChange={this.handleChange}
                                        value={search.last_active} />
                                    <InputInline
                                        label="Sort results by:"
                                        type="select"
                                        field="sort"
                                        options={[
                                            { id: 'last_active', name: 'Last active' },
                                            { id: 'newest', name: 'Newest members' },
                                            { id: 'youngest', name: 'Youngest' }
                                        ]}
                                        onChange={this.handleChange}
                                        value={search.sort} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <Accordion>
                                            <AccordionBlock
                                                title="Height:"
                                                selected={this.getSelectedArray(heightArray(false), search.height_from, search.height_to)}
                                                body={
                                                    <div className="wrap-multiple-select">
                                                        <div className="select-multi-select">
                                                            <SelectField
                                                                value={search.height_from}
                                                                onChange={val => this.handleChange('height_from', val * 1)}
                                                                style={{ minWidth: 100 }}
                                                                inputRef={ref => this.height_from = ref}
                                                                options={heightArrayBetween(140, search.height_to)} />
                                                        </div>
                                                        <span className="divider-multi-select">to</span>
                                                        <div className="select-multi-select">
                                                            <SelectField
                                                                value={search.height_to}
                                                                onChange={val => this.handleChange('height_to', val * 1)}
                                                                style={{ minWidth: 100 }}
                                                                inputRef={ref => this.height_to = ref}
                                                                options={heightArrayBetween(search.height_from, 216)} />
                                                        </div>
                                                    </div>
                                                } />
                                            <AccordionBlock
                                                title="Weight:"
                                                selected={this.getSelectedArray(weightArray(false), search.weight_from, search.weight_to)}
                                                body={
                                                    <div className="wrap-multiple-select">
                                                        <div className="select-multi-select">
                                                            <SelectField
                                                                value={search.weight_from}
                                                                onChange={val => this.handleChange('weight_from', val * 1)}
                                                                style={{ minWidth: 100 }}
                                                                inputRef={ref => this.weight_from = ref}
                                                                options={weightArrayBetween(40, search.weight_to)} />
                                                        </div>
                                                        <span className="divider-multi-select">to</span>
                                                        <div className="select-multi-select">
                                                            <SelectField
                                                                value={search.weight_to}
                                                                onChange={val => this.handleChange('weight_to', val * 1)}
                                                                style={{ minWidth: 100 }}
                                                                inputRef={ref => this.weight_to = ref}
                                                                options={weightArrayBetween(search.weight_from, 221)} />
                                                        </div>
                                                    </div>
                                                } />
                                            <AccordionBlock
                                                title="Do they drink?"
                                                selected={this.getSelected(options.do_you_drink, search.do_you_drink)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.do_you_drink, false)}
                                                        onChange={this.handleChange}
                                                        value={search.do_you_drink}
                                                        field="do_you_drink"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Do they smoke?"
                                                selected={this.getSelected(options.do_you_smoke, search.do_you_smoke)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.do_you_smoke, false)}
                                                        onChange={this.handleChange}
                                                        value={search.do_you_smoke}
                                                        field="do_you_smoke"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Marital status:"
                                                selected={this.getSelected(options.marital_status, search.marital_status)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.marital_status, false)}
                                                        onChange={this.handleChange}
                                                        value={search.marital_status}
                                                        field="marital_status"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Do they have children?"
                                                selected={this.getSelected(options.do_you_have_children, search.do_you_have_children)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.do_you_have_children, false)}
                                                        onChange={this.handleChange}
                                                        value={search.do_you_have_children}
                                                        field="do_you_have_children"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Do they want (more) children?"
                                                selected={this.getSelected(options.do_you_want_more_children, search.do_you_want_more_children)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.do_you_want_more_children, false)}
                                                        onChange={this.handleChange}
                                                        value={search.do_you_want_more_children}
                                                        field="do_you_want_more_children"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Nationality:"
                                                selected={this.getSelected(options.nationality, search.nationality)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        row={4}
                                                        accordion={true}
                                                        options={getArray(options.nationality, false)}
                                                        onChange={this.handleChange}
                                                        value={search.nationality}
                                                        field="nationality"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Education"
                                                selected={this.getSelected(options.education, search.education)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.education, false)}
                                                        onChange={this.handleChange}
                                                        value={search.education}
                                                        field="education"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Employment status:"
                                                selected={this.getSelected(options.employment_status, search.employment_status)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.employment_status, false)}
                                                        onChange={this.handleChange}
                                                        value={search.employment_status}
                                                        field="employment_status"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Willing to relocate:"
                                                selected={this.getSelected(options.willing_to_relocate, search.willing_to_relocate)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.willing_to_relocate, false)}
                                                        onChange={this.handleChange}
                                                        value={search.willing_to_relocate}
                                                        field="willing_to_relocate"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Home type:"
                                                selected={this.getSelected(options.home_type, search.home_type)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.home_type, false)}
                                                        onChange={this.handleChange}
                                                        value={search.home_type}
                                                        field="home_type"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Living situation:"
                                                selected={this.getSelected(options.living_situation, search.living_situation)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.living_situation, false)}
                                                        onChange={this.handleChange}
                                                        value={search.living_situation}
                                                        field="living_situation"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Their hair color:"
                                                selected={this.getSelected(options.hair_color, search.hair_color)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.hair_color, false)}
                                                        onChange={this.handleChange}
                                                        value={search.hair_color}
                                                        field="hair_color"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Their hair length:"
                                                selected={this.getSelected(options.hair_length, search.hair_length)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.hair_length, false)}
                                                        onChange={this.handleChange}
                                                        value={search.hair_length}
                                                        field="hair_length"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Their eye color:"
                                                selected={this.getSelected(options.eye_color, search.eye_color)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.eye_color, false)}
                                                        onChange={this.handleChange}
                                                        value={search.eye_color}
                                                        field="eye_color"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Their eye wear:"
                                                selected={this.getSelected(options.eye_wear, search.eye_wear)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.eye_wear, false)}
                                                        onChange={this.handleChange}
                                                        value={search.eye_wear}
                                                        field="eye_wear"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Their body type:"
                                                selected={this.getSelected(options.body_type, search.body_type)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.body_type, false)}
                                                        onChange={this.handleChange}
                                                        value={search.body_type}
                                                        field="body_type"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Their ethnicity is mostly:"
                                                selected={this.getSelected(options.your_ethnicity_is_mostly, search.your_ethnicity_is_mostly)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.your_ethnicity_is_mostly, false)}
                                                        onChange={this.handleChange}
                                                        value={search.your_ethnicity_is_mostly}
                                                        field="your_ethnicity_is_mostly"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Consider their appearence as:"
                                                selected={this.getSelected(options.i_consider_my_appearance_as, search.i_consider_my_appearance_as)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.i_consider_my_appearance_as, false)}
                                                        onChange={this.handleChange}
                                                        value={search.i_consider_my_appearance_as}
                                                        field="i_consider_my_appearance_as"
                                                        type="multiselect" />
                                                } />
                                            {/* <AccordionBlock
                                                title="Languages spoken:"
                                                selected={this.getSelectedLanguages(options.languages_spoken, search.languages_spoken)}
                                                body={
                                                    // <InputInline
                                                    //     any={true}
                                                    //     value={search.languages_spoken}
                                                    //     type="select-multiple"
                                                    //     field="languages_spoken"
                                                    //     options={getMultiArray(options.languages_spoken, false)}
                                                    //     onChange={this.handleChange}
                                                    //     label="Language spoken:" />
                                                    
                                                    <Select
                                                        closeMenuOnSelect={false}
                                                        components={animatedComponents}
                                                        value={languages_pre}
                                                        isMulti
                                                        options={languages}
                                                        onChange={this.onChangeSelect}
                                                        isSearchable={false}
                                                        placeholder= 'Any'
                                                    />
                                                } /> */}
                                                <div className="language_wrap">
                                                    <label>Language spoken:</label>
                                                    <Select
                                                        closeMenuOnSelect={false}
                                                        components={animatedComponents}
                                                        value={languages_pre}
                                                        isMulti
                                                        options={languages}
                                                        onChange={this.onChangeSelect}
                                                        isSearchable={false}
                                                        placeholder= 'Any'
                                                    />
                                                </div>
                                            <AccordionBlock
                                                title="English language ability:"
                                                selected={this.getSelected(options.english_language_ability, search.english_language_ability)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.english_language_ability, false)}
                                                        onChange={this.handleChange}
                                                        value={search.english_language_ability}
                                                        field="english_language_ability"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Religion:"
                                                selected={this.getSelected(options.religion, search.religion)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.religion, false)}
                                                        onChange={this.handleChange}
                                                        value={search.religion}
                                                        field="religion"
                                                        type="multiselect" />
                                                } />
                                            <AccordionBlock
                                                title="Star sign:"
                                                selected={this.getSelected(options.star_sign, search.star_sign)}
                                                body={
                                                    <InputInline
                                                        any={true}
                                                        accordion={true}
                                                        options={getArray(options.star_sign, false)}
                                                        onChange={this.handleChange}
                                                        value={search.star_sign}
                                                        field="star_sign"
                                                        type="multiselect" />
                                                } />
                                        </Accordion>
                                    </div>
                                </div>
                            </div>
                            <InputInline
                                id="last_wrap_input"
                                label="Optionally save your search as:"
                                type="text"
                                field="search_name"
                                onChange={this.handleChangeName}
                                value={this.state.search_name} />
                            <div className="text-center search_button">
                                <BtnMain text="Submit" className="btn-green" onClick={this.save} />
                            </div>
                        </div>
                        <style jsx>{`
                            .title {
                                background-color: #F9F9F9;
                                padding: 15px;
                                border-radius: 9px;
                                font-weight: bold;
                            }
                            .title.danger {
                                background-color: #FFC7C9;
                            }
                            .title.success {
                                background-color: #F1FFE0;
                            }
                            .title > span {
                                color: #8C383B;
                                font-size: 14px;
                                float: right;
                                padding-top: 3px;
                                font-weight: normal;
                            }
                            .text-green {
                                color: #98D538;
                                padding: 15px;
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
                            @media (max-width: 375px) {
                                .wrap-multiple-select {
                                    flex-wrap: wrap;
                                }
                                .label-multi-select {
                                    width: 100%;
                                }
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
                            .block-select {
                                border: 1px solid #ccc;
                                padding: 9px 0px;
                                color: #555;
                                cursor: pointer;
                                white-space: nowrap;
                                width: 100px;
                                text-align: center;
                                
                            }
                            .block-select.selected,
                            .block-select:hover {
                                background-color: #F1FFE0;
                            }
                            
                            .no_mobile{
                                display: none;
                            }
                            @media (max-width: 768px) {
                                .label-multi-select {
                                    margin-bottom: 10px;
                                }
                                
                            }
                        `}
                        </style>
                    </SearchLayout>
                </PrivateLayout>
            </Layout>
        );
    }
}

const mapStateToProps = ({ search, ui, user }) =>
    ({
        match: user.match,
        search: search.params,
        options: ui.optionsSearch.search_params,
        location_options: ui.optionsSearch.location_params,
    })

export default connect(mapStateToProps)(Search)