import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleFavorite, sendVideoRequest } from '../../actions/members'
import { Router } from '../../routes'
import OnlineDot from './online_dot'
import { makeCDN } from '../../utils'
import { setAlert, toggleModal } from '../../actions/ui'

const testUsers = [221, 286]

class MemberPreview extends Component {
	state = {
		ready: false,
	}

	toggleFavorite = value => e => {
		e.preventDefault()
		e.stopPropagation()
		const { dispatch, member, type, testing } = this.props
		if (testing) {
			dispatch(setAlert('Not available for test user', 'error'))
			return
		}
		dispatch(toggleFavorite(member.id, !value, type))
	}

	goTo = link => e => {
		e.preventDefault()
		e.stopPropagation()
		const { onClickItem = null } = this.props
		if (onClickItem) {
			this.props.onClickItem()
		} else {
			Router.pushRoute(link)
		}
	}

	sendVideoRequest = e => {
		e.preventDefault()
		e.stopPropagation()
		const { dispatch, member, membership } = this.props
		if (membership.name !== 'VIP') {
			dispatch(setAlert('Only for VIP Membership', 'error'))
			return
		}
		
		
		dispatch(sendVideoRequest(member.id)).then(res => {
			if (res) {
				dispatch(toggleModal(true, 'videoRequestMessage'))
			}
		})
	}

	componentDidMount() {
		this.img.onload = () => {
			this.setState({ready: true})
		}
	}

    render() {
    	const { member, stars = true, onClickItem = null, token, onlineUsers, userId, videocall, videoRequestMessage } = this.props
    	const link = token ?  `/member/${member.id.toString()}` : `/`
    	const additionalStyle = videocall ? {height: 310} : {}
        return (
            <div className="form-group">
	            <div className="member-preview-wrap" style={additionalStyle}>
                    <a href={link} onClick={this.goTo(link)}>
	                    <span>
	    	            	<div className="member-preview-img-wrap">
	    	            		<div className={`member-preview-loader ${this.state.ready ? 'd-none' : ''}`}>
	    	            			<i className="fas fa-circle-notch fa-spin"></i>
	    	            		</div>
	    	            		<img ref={ref => this.img = ref} src={makeCDN(member.avatar)} className={`member-preview-img ${this.state.ready ? '' : 'd-none'}`} alt="" />
	    	            	</div>
	    	            	<div className="member-preview-info">
	    		                <div className="text-center">
	    		                	<div className="font-bebas">
	    		                		<strong className="member-preview-info-name">{member.first_name}</strong>
	    		            		</div>
	    		                	<div>{`${member.age} years`}</div>
	    		                	<div className="ellipsis">{`${member.country}, ${member.state ? `${member.state}, ` : ''} ${member.city}`}</div>
	    		                	
	    		                </div>
	    	                </div>
	    	                {
		                		videocall
		                		? 	<div className="text-center">
			                    		<span className="videocall-link" onClick={this.sendVideoRequest}>Request Video Call</span>
			                        </div>
		                		: 	null
		                	}
	    	                {
	    	                	testUsers.includes(userId)
	    	                	? 	null //<OnlineDot active={onlineUsers.includes(member.id)} />
	    	                	: 	null
	    	                }	    	                
	                        {
	                            stars
	                            ?   member.favorite
	                                ? <i className="fas fa-star" id="heart" onClick={this.toggleFavorite(false)}></i>
	                                : <i className="far fa-star" id="heart" onClick={this.toggleFavorite(true)}></i>
	                            : null
	                        }
                        </span>
                    </a>
	            </div>
	            
            </div>
        );
    }
}

const mapStateToProps = state => 
	({
		token: state.user.token,
		onlineUsers: state.user.onlineUsers,
		userId: state.user.data.id,
		testing: state.user.testing,
		membership: state.user.data.membership
	})

export default connect(mapStateToProps)(MemberPreview)