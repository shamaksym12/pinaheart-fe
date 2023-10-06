import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import PrivateLayout from '../../layouts/private'
import SearchLayout from '../../layouts/search'
import Tabs from '../../components/tabs'
import TextField from '../../components/inputs/text_field'
import BtnMain from '../../components/buttons/btn_main'
import MemberBlock from '../../components/block/member_block'
import { getMembers, seeMoreMembers, searchByProfileId } from '../../actions/members'
import { API_URL } from '../../config'
import { setActiveTab } from '../../actions/ui'
import SearchForm from '../../components/forms/search_form'
import { Router } from '../../routes'
import Head from 'next/head'

class Search extends Component {
	static async getInitialProps({query}) {
        return {type: query.slug}
    }

    getMembers = key => {
    	const { dispatch } = this.props
        return dispatch(getMembers(key))
    }

    handleChangeProfile = key => {
        const { dispatch } = this.props
        dispatch(setActiveTab(key, 'search'))
        Router.pushRoute(`/search/${key}`)
    }

    seeMoreMembers = (link, type) => e => {
    	const { dispatch } = this.props
    	const nextLink = this.props[link].next_link.replace(`${API_URL}/`, '')
        dispatch(seeMoreMembers(nextLink, type))
    }

    getSearch = () => {
        let params = {
                name: this.profile_id.value,
        }
        if(params.name){
            const { dispatch } = this.props
            dispatch(searchByProfileId(params))
            dispatch(setActiveTab('search', 'main'))
            params = JSON.stringify(params)
            Router.pushRoute(`/results?query=${params}`)
        }
    }

    componentDidMount() {
    	const { dispatch, type } = this.props
        dispatch(setActiveTab(type, 'search'))
    }

    render() {
    	const { 
    		tab,
    		viewed_list,
			popular_list,
			new_list,
			search,
			role,
		} = this.props

		const more_viwed = viewed_list.current_page < viewed_list.last_page
        const more_popular = popular_list.current_page < popular_list.last_page
        const more_new = new_list.current_page < new_list.last_page
        const tabList = [
        	{
        		eventKey: 'advanced', 
                title: 'Advanced Search',
                content: <div>Advanced Search</div>
        	}, {
        		eventKey: 'saved', 
                title: 'Saved Searches',
                content: <div>Saved Searches</div>
        	}, {
        		eventKey: 'by_id', 
                title: 'Member first name or ID',
                content: <div className="row">
		                    <div className="col-sm-8">
		                        <div className="pt-17 form-group">
		                            <TextField
		                                placeholder="Profile ID"
		                                inputRef={ref => { this.profile_id = ref }}
		                                value={''}
		                                name="Profile ID" />
		                        </div>
		                    </div>
		                    <div className="col-sm-4">
		                        <div className="text-right form-group">
		                            <BtnMain
		                                text="Search"
		                                onClick={this.getSearch} />
		                        </div>
		                    </div>
		                </div>
        	}
        ]
        return (
            <Layout page="search sub">
            	<PrivateLayout>
                    <SearchLayout page="by_id">
                        <Head>
                            <title>PinaHeart.com</title>
                        </Head>
    	                <div className="pt-15 by_id_wrap">
                            <div className="saved_search_label_mobile saved_search_label_mobile_byid">
                                Saved member first name or ID
                            </div>
    	                	<div className="row">
                                <div className="col-sm-8">
                                    <div className="pt-17 form-group">
                                        <TextField
                                            placeholder="Profile ID"
                                            inputRef={ref => { this.profile_id = ref }}
                                            value={''}
                                            name="Profile ID" />
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="text-right form-group search_byid_btn">
                                        <BtnMain
                                            text="Search"
                                            onClick={this.getSearch} />
                                    </div>
                                </div>
                            </div>
    		            </div>
                    </SearchLayout>
	            </PrivateLayout>
            </Layout>
        );
    }
}

const mapStateToProps = state =>
    ({
    	activeTab: state.ui.tab.main,
		viewed_list: state.members.viewed,
		popular_list: state.members.popular,
		new_list: state.members.new,
		search: state.members.search,
		role: state.user.data.role,
    })

export default connect(mapStateToProps)(Search)