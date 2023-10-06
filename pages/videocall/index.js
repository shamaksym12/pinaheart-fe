import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import PrivateLayout from '../../layouts/private'
import Tabs from '../../components/tabs'
import TextField from '../../components/inputs/text_field'
import BtnMain from '../../components/buttons/btn_main'
import MemberBlock from '../../components/block/member_block'
import { getMembers, seeMoreMembers, searchByProfileId } from '../../actions/members'
import { API_URL } from '../../config'
import { setActiveTab } from '../../actions/ui'
import SearchForm from '../../components/forms/search_form'

class VideoCall extends Component {
    getMembers = key => {
    	const { dispatch } = this.props
        dispatch(getMembers(key))
    }

    seeMoreMembers = (link, type) => e => {
    	const { dispatch } = this.props
    	const nextLink = this.props[link].next_link.replace(`${API_URL}/`, '')
        dispatch(seeMoreMembers(nextLink, type))
    }

    componentDidMount() {
    	const { dispatch } = this.props
        dispatch(getMembers('viewed'))
    }

    render() {
    	const { 
    		tab,
    		viewed_list,
			role,
		} = this.props

		const more_viwed = viewed_list.current_page < viewed_list.last_page
        return (
            <Layout>
            	<PrivateLayout>
	                <div className="pt-15">
		                <div>
		                	<h4 className="text-center">Connect any lady and enjoy the new level of communication!</h4>
		                	<div className="form-group">
		                		VideoCall is the unique Service you can use not only to see your lady online in real time, but to hear as well. VideoCall is the best way to break the wall between you and your potential mate. You will have an opportunity to talk just like you are in the same room. You can look into her eyes which, as everyone knows, is a mirror of any soul. This is a great chance to get to know each other for real before you decide to arrange personal meeting.
								Our Company will make sure you have no language barrier by providing professional interpreter if needed.<br />
								Please note that you need to be a Vip Member to use the VideoCall Service.
		                	</div>
		                </div>
		                <MemberBlock 
                			list={viewed_list.list}
                			more={more_viwed}
                			type="viewed"
                			videocall
                			onClick={this.seeMoreMembers('viewed_list', 'viewed')} />
		            </div>
	            </PrivateLayout>
            </Layout>
            	
        );
    }
}

const mapStateToProps = state =>
    ({
		viewed_list: state.members.viewed,
		role: state.user.data.role,
    })

export default connect(mapStateToProps)(VideoCall)