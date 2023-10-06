import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import PrivateLayout from '../../layouts/private'
import MemberBlock from '../../components/block/member_block'
import BtnMain from '../../components/buttons/btn_main'
import InputInline from '../../components/inputs/InputInline'
import Pagination from '../../components/pagination'
import { getMembers, getResultsById } from '../../actions/members'
import { ageArrayBetween, getArray, getCounriesArrey, sexPhotoFinder } from '../../utils'
import { getOptionsSearch } from '../../actions/ui'
import Autocomplete from '../../components/inputs/autocomplete'
import { Router } from '../../routes'
import SelectField from '../../components/inputs/select_field'
import CheckboxField from '../../components/inputs/checkbox_field'
import { getUserMatch } from '../../actions/user'
import BtnUpgradeMembership from '../../components/buttons/btn_upgrade_membership'

import Head from 'next/head'

class Online extends Component {
    state = {
        finish: false,
        search: {
            sex: '',
            formatted_address: '',
            country_id: '',
            with_photo: true,
            last_active: "3month",
            only_online: true,
        }
    }
    search = () => {
        const { search } = this.state
        const { dispatch } = this.props
        let params = {}
        if (Object.keys(search).length) {
            params.search = search
        }

        dispatch(getMembers(params))
            .then(() => {
                this.setState({ ...this.state, ...{ finish: true } })
            }).catch(() => {
                this.setState({ ...this.state, ...{ finish: true } })
            })

        params = JSON.stringify(params)
        Router.pushRoute(`/online?query=${params}`)
    }
    handleChangePage = page => {
        const { dispatch } = this.props

        let params = {}
        params.search = this.state.search
        params.page = page

        dispatch(getMembers(params))
            .then(() => {
                this.setState({ ...this.state, ...{ finish: true } })
            }).catch(() => {
                this.setState({ ...this.state, ...{ finish: true } })
            })

        params = JSON.stringify(params)
        Router.pushRoute(`/online?query=${params}`)
    }
    handleChange = (field, value) => {
        this.setState({ search: { ...this.state.search, [field]: value } })
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
    componentDidMount() {
        const { dispatch, user } = this.props
        // let x = 1.618034
        dispatch(getUserMatch());
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

        dispatch(getOptionsSearch()).then(options => {
            if (options) {
                let params = {
                    search: {
                        sex: '',
                        formatted_address: '',
                        country_id: '',
                        only_online: true,
                    }
                }
                if (Router.router.query.query) {
                    const { search } = JSON.parse(Router.router.query.query)
                    params = {
                        search: {
                            sex: '',
                            formatted_address: '',
                            country_id: '',
                            only_online: true,
                            ...search
                        }
                    }
                } else {
                    params.search = {
                        ...this.state.search,
                        iam: options.search_params.iam,
                        sex: options.search_params.iam === 'M' ? 'F' : 'M',
                        only_online: true,
                    }
                }
                this.setState({ search: params.search })

                dispatch(getMembers(params))
                    .then(() => {
                        this.setState({ ...this.state, ...{ finish: true } })
                    }).catch(() => {
                        this.setState({ ...this.state, ...{ finish: true } })
                    })
            }
        })
    }

    editMatches = () => {
        Router.pushRoute('/edit/match')
    }

    seeMatches = () => {
        Router.pushRoute('/matches')
    }

    goToSearch = () => {
        Router.pushRoute('/search')
    }

    renderList = (member, i, user) => {
        return <div key={i} className="col-lg-3 col-md-6 col-sm-12 form-group online_item_wrap">
            <MemberBlock member={member} user={user} page='online' />
        </div>
    }

    componentWillReceiveProps = (next_props) => {
        if (Router.router.query.query) {
            const { search } = JSON.parse(Router.router.query.query)
            this.setState({
                search: {
                    sex: '',
                    formatted_address: '',
                    country_id: '',
                    only_online: true,
                    ...search
                }
            })
        } else {
            const match = next_props.match
            this.setState({
                search: {
                    with_photo: true,
                    last_active: "3month",
                    age_from: match.age_from,
                    age_to: match.age_to,
                    country_id: match.country_id,
                    formatted_address: match.formatted_address,
                    with_photo: true,
                    only_online: true,
                    sex: next_props.user.sex === "F" ? "M" : "F",
                    iam: next_props.user.sex
                }
            })
        }
    }

    render() {
        const { people, user, location_options } = this.props
        const { search } = this.state
        const selectedCountry = location_options.countries.find(country => country.id === search.country_id * 1) || {}
        return (
            <Layout page="online">
                <PrivateLayout page="online">
                    <Head>
                        <title>PinaHeart.com</title>
                    </Head>
                    <div className="pt-15 main_wrap online_main_wrap">
                        <div className="row online_wrap">
                            <div className="col-sm-12 ">
                                <div className="d-flex align-items-center flex-wrap form-group justify-content-between header-input-wrapper">
                                    <div className="header-input">
                                        <div className="field_label">Aged between</div>
                                        <div className="wrap-multiple-select">
                                            <div className="select-multi-select">
                                                <div style={{ marginRight: 5 }}>
                                                    <SelectField
                                                        onChange={val => this.handleChange('age_from', val)}
                                                        style={{ minWidth: 80 }}
                                                        value={search.age_from}
                                                        options={ageArrayBetween(18, search.age_to)} />
                                                </div>
                                                <span className="divider-multi-select">and</span>
                                                <div>
                                                    <SelectField
                                                        onChange={val => this.handleChange('age_to', val)}
                                                        style={{ minWidth: 80 }}
                                                        value={search.age_to}
                                                        options={ageArrayBetween(search.age_from, 70)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="header-input location-input">
                                        <div className="field_label field_label_country">Country:</div>
                                        <InputInline
                                            accordion
                                            icon={false}
                                            value={search.country_id}
                                            onChange={this.handleChangeCountry}
                                            options={getCounriesArrey(location_options.countries, false)}
                                            field="country_id"
                                            type="select" />
                                        <BtnMain
                                            style={{ minWidth: 170 }}
                                            className="btn-green btn-block only_mobile online_submit"
                                            onClick={this.search}
                                            text="Submit" />
                                    </div>
                                    <div className="header-input location-input no_mobile">
                                        <div className="field_label">City:</div>
                                        <Autocomplete
                                            accordion
                                            icon={false}
                                            onSelect={this.handleSelectCity}
                                            onChange={this.handleChangeCity}
                                            value={search.formatted_address}
                                            field="formatted_address"
                                            country={selectedCountry.code} />
                                    </div>
                                    <div className="header-input chekbox-adapt no_mobile">
                                        <div style={{ marginRight: 5 }} className="onlywithphoto">Only with photo:</div>
                                        <div className="d-flex align-items-center checkbox-auto" style={{ display: 'auto' }}>
                                            <div style={{ height: 42, margin: ' auto' }}>
                                                <CheckboxField
                                                    id="photo"
                                                    onChange={val => this.handleChange('with_photo', val)}
                                                    text=" "
                                                    checked={search.with_photo} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="header-input submit online_submit no_mobile">
                                        <BtnMain
                                            style={{ minWidth: 170 }}
                                            className="btn-green btn-block"
                                            onClick={this.search}
                                            text="Submit" />
                                    </div>
                                </div>
                                <div className="form-group header-btn-upgrade no_mobile">
                                    <BtnUpgradeMembership style={{ minWidth: 150 }} />
                                </div>
                            </div>
                            <div className="row form-group items_list">
                                {
                                    people.data.map((member, i) => this.renderList(member, i, user))
                                }
                                {
                                    this.state.finish && !people.data.length ?
                                        <div className="form-group title fs-18 bold noMessages">
                                            Sorry no results, please search again with wider criteria.
                                    </div> : <div></div>
                                }
                            </div>
                            <div className="form-group">
                                <Pagination
                                    total={people.last_page}
                                    allVisible={true}
                                    current={people.current_page}
                                    onChange={this.handleChangePage} />
                            </div>
                        </div>
                    </div>
                    <style jsx>{`
                        .noMessages {
                            text-align: center;
                        }
                        
                        .header-input-wrapper {

                        }
                        .litl_green_btmt {
                            background-color: #98D538;
                            padding: 0px;
                            height: 35px;
                        }
                        .title {
                            color: #777074;
                            font-family: "Open Sans";
                            font-size: 18px;
                            font-weight: 600;
                        }
                        .avatar {
                            width: 100%;
                            position: relative;
                            background-image: url(${sexPhotoFinder(this.props.user.sex, user.main_photo_thumb)});
                            border-radius: 9px;
                            background-position: center;
                            background-repeat: no-repeat;
                            background-size: cover;
                            margin-bottom: 15px;
                            padding-top: 100%;
                        }
                        .wrap-multiple-select {
                            display: flex;
                            align-items: center;
                            margin-bottom: 15px;
                            justify-content: space-between;
                        }
                        .select-multi-select {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                        }
                        .label-multi-select {
                            margin-right: 5px;
                            width: 30%;
                            font-weight: bold;
                        }
                        .flex-wrap {
                            flex-wrap: wrap;
                        }

                        .header-input {
                            margin-right: 10px;
                            min-width: 80px;
                            white-space: nowrap;
                        }

                        .location-input {
                            max-width: 120px;
                        }

                        .header-input.submit {
                            margin-left: 15px;
                            margin-bottom: 10px;
                            margin-right: 0px;
                            max-width: 170px;
                        }

                        .header-btn-upgrade {
                            margin-left: auto;
                        }

                        .chekbox-adapt {
                            margin-bottom: 10px;
                        }

                        @media (max-width: 767px) {
                            .header-input,
                            .header-btn-upgrade,
                            .header-input.submit {
                                width: 100%;
                                max-width: 100%;
                            }
                            .chekbox-adapt {
                                display: flex;
                                margin-bottom: 10px;
                            }
                            .checkbox-auto {
                                margin-top: -11px;
                                height: 0px
                            }
                        }

                        @media (max-width: 1199px) {
                            .header-input-wrapper {
                                width: 100%;
                            }
                            .location-input {
                                max-width: 100%;
                            }
                        }

                        @media (max-width: 375px) {
                            .wrap-multiple-select {
                                flex-wrap: wrap;
                            }
                            .label-multi-select {
                                width: 100%;
                            }
                        }
                    `}</style>
                </PrivateLayout>
            </Layout>
        );
    }
}

const mapStateToProps = ({ members, user, ui }) =>
    (
        {
            people: members.people,
            match: user.match,
            user: user.data,
            options: ui.optionsSearch.search_params,
            location_options: ui.optionsSearch.location_params,
        }
    )

export default connect(mapStateToProps)(Online)