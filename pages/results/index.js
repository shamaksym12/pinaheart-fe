import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import PrivateLayout from '../../layouts/private'
import MemberBlock from '../../components/block/member_block'
import { Router } from '../../routes'
import { setUiKey } from '../../actions/ui'
import BtnMain from '../../components/buttons/btn_main'
import InputInline from '../../components/inputs/InputInline'
import Pagination from '../../components/pagination'
import { getMembers, getResultsById, searchByProfileId } from '../../actions/members'
import { getOptionsSearch } from '../../actions/ui'
import BtnUpgradeMembership from '../../components/buttons/btn_upgrade_membership'
import { setMembersToInitialState } from '../../actions/members';


const initSearch = { formatted_address: '', distance_unit: 'kms', sort: 'last_active' }

class Results extends Component {
    static async getInitialProps({ query }) {
        return { searchId: query.searchId }
    }
    state = {
        search: initSearch,
        finish: false,
    }
    componentWillReceiveProps(next_props) {
        // if (next_props.people.data.length) {
        //     window.scrollTo({
        //         top: 0,
        //         behavior: 'smooth'
        //     })
        // }
    }

    componentDidMount() {
        const { dispatch, user } = this.props
        let params = {}
        //if search by id
        const queryParsed = JSON.parse(Router.router.query.query)
        this.scrollToTopWindow()
        if (queryParsed.name && !queryParsed.search) {
            params = {
                name: JSON.parse(Router.router.query.query).name
            }
            dispatch(searchByProfileId(params))


            params = JSON.stringify(params)
            Router.pushRoute(`/results?query=${params}`)
            return true
        }
        dispatch(getOptionsSearch()).then(options => {
            if (options) {
                let params = {
                    search: {
                        sex: '',
                        formatted_address: '',
                        country_id: '',
                    }
                }
                if (Router.router.query.query) {
                    const { search, name } = JSON.parse(Router.router.query.query)
                    params = {
                        search: {
                            sex: '',
                            formatted_address: '',
                            country_id: '',
                            ...search
                        },
                    }
                    if (name) {
                        params.name = name
                    }
                } else {
                    params.search = {
                        ...this.state.search,
                        iam: options.search_params.iam,
                        sex: options.search_params.iam === 'M' ? 'F' : 'M'
                    }
                }
                this.setState({ search: params.search })
                dispatch(getMembers(params)).then(() => {
                    this.setState({ ...this.state, ...{ finish: true } })
                }).catch(() => {
                    this.setState({ ...this.state, ...{ finish: true } })
                })
            }
        })
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        // dispatch(setMembersToInitialState());
    }

    handleChangePage = page => {
        const { dispatch } = this.props

        const query = JSON.parse(query)

        let params = {}
        if (query) {
            params = query
        }
        params.page = page
        //if search by id
        if (query.name) {
            params = {
                ...this.state.search,
                page: page,
                name: query.name
            }
            dispatch(searchByProfileId(params))

            params = JSON.stringify(params)
            Router.pushRoute(`/results?query=${params}`)
            return true
        }

        const newUrl = `${window.location.origin}/results?query=${JSON.stringify(params)}`
        Router.replaceRoute(newUrl)
        dispatch(getMembers(params))
    }

    handleChange = (field, value) => {
        this.setState({ search: { ...this.state.search, [field]: value } }, () => {
            const { search } = this.state
            const { dispatch } = this.props
            let params = {}

            //if search by id
            const query = JSON.parse(Router.router.query.query)
            if (query.name && !query.search) {
                params = {
                    search: { ...this.state.search },
                    name: query.name
                }
                dispatch(searchByProfileId({
                    search: { ...this.state.search },
                    name: query.name
                }));
                params = JSON.stringify(params)
                Router.pushRoute(`/results?query=${params}`)
                return true
            }

            if (Object.keys(search).length) {
                params.search = search
            }
            dispatch(getMembers(params))
            params = JSON.stringify(params)
            Router.pushRoute(`/results?query=${params}`)
        })
    }

    handleChangeAdminSearch = (key, e) => {
        const { dispatch } = this.props
        const checked = e.target.checked
        const params = {
            search: {}
        }

        if (key != 'all') {
            this.all.checked = false
            params.search = {
                ...this.state.search,
                [key]: checked,
            }
            this.setState({ search: params.search })
            dispatch(getMembers(params))
            return
        }

        const search = this.state.search
        const filtered = {}
        for (let s in search) {
            if (!(['with_admin_comments', 'admin_blocked'].indexOf(s) + 1)) {
                filtered[s] = search[s]
            }
        }

        this.blocked.checked = false
        this.comment.checked = false

        params.search = {
            ...filtered
        }

        this.setState({ search: params.search })
        dispatch(getMembers(params))
    }

    allRef = (ref) => {
        this.all = ref
    }

    blockedRef = (ref) => {
        this.blocked = ref
    }

    blockedComment = (ref) => {
        this.comment = ref
    }

    renderList = (member, i, isAdmin, user) => {
        return <div key={i} className="col-md-3 col-sm-4 form-group result_item_list">
            <MemberBlock height={400} member={member} user={user} isAdmin={isAdmin} />
        </div>
    }

    scrollToTopWindow() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    render() {
        const { people, isAdmin, user } = this.props
        const { search } = this.state

        var temp_data = people.data
        var member_with_photo = [], member_no_photo = []
        for (var i = 0; i < temp_data.length; i++) {
            if (temp_data[i]['main_photo']) member_with_photo.push(temp_data[i])
            else member_no_photo.push(temp_data[i])
        }

        return (
            <Layout page="search_result">
                <PrivateLayout page="search">
                    <div className="result_page_wrap">
                        <div className="row d-flex form-group admin-search result_list_wrap no_mobile">
                            <div className="fs-18 bold ">Search results</div>
                            {
                                isAdmin ?
                                    <div className="d-flex ml-3 ">
                                        <label className="mb-0 ml-1 d-flex">
                                            <input type="checkbox" ref={this.allRef} onChange={(e) => this.handleChangeAdminSearch('all', e)} name="all" className="m0" />
                                            &nbsp;All
                                        </label>
                                        <label className="mb-0 ml-1 d-flex">
                                            <input type="checkbox" ref={this.blockedRef} onChange={(e) => this.handleChangeAdminSearch('admin_blocked', e)} name="blocked" className="m0" />
                                            &nbsp;Blocked
                                        </label>
                                        <label className="mb-0 ml-1 d-flex">
                                            <input type="checkbox" ref={this.blockedComment} onChange={(e) => this.handleChangeAdminSearch('with_admin_comments', e)} name="comments" className="m0" />
                                            &nbsp;With staff comments
                                        </label>
                                    </div>
                                    : ""
                            }
                        </div>
                        <div className="row form-group result_condition_wrap no_mobile">
                            <div className="col-sm-4">
                                <InputInline
                                    label="Order by:"
                                    type="select"
                                    field="sort"
                                    options={[
                                        { id: 'last_active', name: 'Last active' },
                                        { id: 'newest', name: 'Newest members' },
                                        { id: 'youngest', name: 'Youngest' }
                                    ]}
                                    onChange={this.handleChange}
                                    value={this.state.search.sort}
                                />
                            </div>

                            <div className="col-sm-4">
                                <Pagination
                                    total={people.last_page}
                                    current={people.current_page}
                                    onChange={this.handleChangePage} />
                            </div>
                            <div className="col-sm-4 text-right">
                                <BtnUpgradeMembership />
                            </div>
                        </div>
                        <div className="row form-group result_list">
                            {
                                member_with_photo.map((member, i) => this.renderList(member, i, isAdmin, user))
                            }
                            {
                                member_no_photo.map((member, i) => this.renderList(member, i, isAdmin, user))
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
                </PrivateLayout>
            </Layout>
        );
    }
}

const mapStateToProps = ({ members, user }) =>
    (
        {
            people: members.people,
            isAdmin: user.isAdmin,
            user: user.data,
        }
    )

export default connect(mapStateToProps)(Results)