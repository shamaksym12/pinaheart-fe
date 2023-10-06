import React, { Component } from 'react'
import { connect } from 'react-redux'
import MiddleString from '../list/middle_string'
import SmallDivider from '../list/small_divider'
import MiddleItem from '../list/middle_item'
import { FormGroup } from 'react-bootstrap'
import Avatar from '../avatar'
import { setActiveTab, toggleModal } from '../../actions/ui'
import { Credits } from '../forms/credits'
import MainModal from '../modal'
import { Router } from '../../routes'

export class ClientMenu extends Component {
	goToMail = () => {
		const { dispatch } = this.props
		dispatch(setActiveTab('incoming', 'mail'))
	}

	goToSubscribe = () => {
		Router.pushRoute('/subscribe')
	}

	showAddCredits = () => {
		const { dispatch } = this.props
		dispatch(toggleModal(true, 'credits'))
	}

	showAvatar = () => {
		const { dispatch } = this.props
		dispatch(toggleModal(true, 'avatar'))
	}

    render() {
    	const { 
	    	avatar,
			first_name,
			profile_id,
			membership,
			view_profile,
			count_interest,
			count_favorite,
			credits,
		} = this.props

        return (
            <div className="wrapClient p-15">
				<FormGroup className="px-15 text-center">
					<Avatar src={avatar.croped} onClick={this.showAvatar} />
				</FormGroup>
				<FormGroup className="text-center name-title">
					<h3>
						<strong>{first_name}</strong>
					</h3>
					<MiddleString
						text={profile_id}
						keyName="ID:" />
				</FormGroup>
				<FormGroup>
				</FormGroup>
				<FormGroup>
					<MiddleString
						text={` Upgrade`}
						keyName={<span>Membership: <span className="text-uppercase">{membership.name}</span></span>}
						link="subscribe"
						onClick={this.goToSubscribe} />
				</FormGroup>
				<FormGroup>
					<SmallDivider text="Activity" />
				</FormGroup>
				<FormGroup>
					<MiddleString
						text={view_profile}
						keyName="Profile viewed:" />
				</FormGroup>
				<FormGroup>
					<MiddleString
						link="mail/incoming"
						onClick={this.goToMail}
						text={count_interest}
						keyName="Interests received:" />
				</FormGroup>
				<FormGroup>
					<MiddleString
						text={count_favorite}
						keyName="Favorited me:" />
				</FormGroup>
				<FormGroup>
					<SmallDivider text="Profile" />
				</FormGroup>
				<FormGroup>
					<MiddleItem
						text="View Profile"
						icon="fas fa-user"
						link="/profile/info"
						role="client" />
					<MiddleItem
						text="Edit Profile"
						icon="fas fa-cog"
						link="/edit/info"
						role="client" />
					<MiddleItem
						text="Change password"
						icon="fas fa-unlock-alt"
						link="/edit/password"
						role="client" />
					<MiddleItem
						text="Add Dibs"
						icon="fas fa-credit-card"
						onClick={this.showAddCredits}
						role="client" />
				</FormGroup>
				<FormGroup>
					<SmallDivider text="Info" />
				</FormGroup>
				<FormGroup>
					<MiddleString
						link="profile/credits"
						text={credits}
						keyName="Dibs Balance:" />
				</FormGroup>
				<FormGroup>
					<MiddleString text="0" keyName="Bonus Balance:" />
				</FormGroup>
				
			</div>
        );
    }
}

const mapStateToProps = ({user: {data}}) =>
	({
   		avatar: data.avatar,
		first_name: data.first_name,
		profile_id: data.profile_id,
		membership: data.membership,
		view_profile: data.view_profile,
		count_interest: data.count_interest,
		count_favorite: data.count_favorite,
		credits: data.credits,
	})

export default connect(mapStateToProps)(ClientMenu)