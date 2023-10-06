import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts/private'
import Tabs from '../../components/tabs'
import TextField from '../../components/inputs/text_field'
import BtnMain from '../../components/buttons/btn_main'
import MemberBlock from '../../components/block/member_block'
import { getMembers, seeMoreMembers, searchByProfileId } from '../../actions/members'
import { API_URL } from '../../config'
import { setActiveTab } from '../../actions/ui'
import SearchForm from '../../components/forms/search_form'

class Client extends Component {
    getMembers = key => {
    	const { dispatch } = this.props
        dispatch(getMembers(key))
    }

    seeMoreMembers = (link, type) => e => {
    	const { dispatch } = this.props
    	const nextLink = this.props[link].next_link.replace(`${API_URL}/`, '')
        dispatch(seeMoreMembers(nextLink, type))
    }

    getSearch = () => {
    	const { dispatch } = this.props
    	dispatch(searchByProfileId(this.profile_id.value)).then(res => {
    		if (res) {
    			dispatch(setActiveTab('search', 'main'))
    		}
    	})
    }

    componentDidMount() {
    	const { dispatch, activeTab } = this.props
        dispatch(getMembers(activeTab))
    }

    render() {
    	const { 
    		tab,
    		viewed_list,
			popular_list,
			new_list,
			search,
			role,
		} = this.props;

		const more_viwed = viewed_list.current_page < viewed_list.last_page
        const more_popular = popular_list.current_page < popular_list.last_page
        const more_new = new_list.current_page < new_list.last_page
        return (
            <Layout>
                <div className="pt-15">
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
	                        <div className="text-right form-group">
	                            <BtnMain
	                                text="Search by Profile ID"
	                                onClick={this.getSearch} />
	                        </div>
	                    </div>
	                </div>
	                <Tabs
	                	onChange={this.getMembers}
	                	tabKey="main"
	                    tabs={[
	                        {
	                            eventKey: 'viewed', 
	                            title: 'All', 
	                            content: <MemberBlock 
	                            			list={viewed_list.list}
	                            			more={more_viwed}
	                            			type="viewed"
	                            			onClick={this.seeMoreMembers('viewed_list', 'viewed')} />
	                        }, {
	                            eventKey: 'popular', 
	                            title: 'Popular', 
	                            content: <MemberBlock
	                            			list={popular_list.list}
	                            			more={more_popular}
	                            			type="popular"
	                            			onClick={this.seeMoreMembers('popular_list', 'popular')} />
	                        }, {
	                            eventKey: 'new', 
	                            title: 'New', 
	                            content: <MemberBlock
	                            			list={new_list.list}
	                            			more={more_new}
	                            			type="new"
	                            			onClick={this.seeMoreMembers('new_list', 'new')} />
	                        }, {
	                            eventKey: 'search', 
	                            title: 'Advanced Search', 
	                            content: <div>
	                            			<SearchForm />
	                            			<MemberBlock
		                            			list={search}
		                            			type="search" />
                            			</div>
	                        }
	                    ]} />
	            </div>
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

export default connect(mapStateToProps)(Client)