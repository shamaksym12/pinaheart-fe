import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import PrivateLayout from '../../layouts/private'
import { Router } from '../../routes'
import cn from 'classnames'
import { getActivities } from '../../actions/user'
import { authByHash } from '../../actions/auth'
import Head from 'next/head'
import {sexPhotoFinder} from '../../utils'

const Star = () => {
	return	<svg xmlns="http://www.w3.org/2000/svg" width="18px" fill="#FFEB04" viewBox="0 0 62 59.34">
				<g id="Слой_2" data-name="Слой 2">
					<g id="Слой_1-2" data-name="Слой 1">
						<path d="M27.67,2.06,20.11,17.41,3.18,19.88A3.71,3.71,0,0,0,1.12,26.2L13.37,38.14,10.48,55a3.7,3.7,0,0,0,5.37,3.91L31,51l15.15,8A3.71,3.71,0,0,0,51.52,55L48.63,38.14,60.88,26.2a3.71,3.71,0,0,0-2.06-6.32L41.89,17.41,34.33,2.06a3.72,3.72,0,0,0-6.66,0Z"/>
					</g>
				</g>
			</svg>
}

const Block = () => {
	return	<svg xmlns="http://www.w3.org/2000/svg" fill="#FF6464" width="20px" viewBox="0 0 56.69 42.12">
				<g id="Слой_2" data-name="Слой 2">
					<g id="Слой_1-2" data-name="Слой 1">
						<path d="M26.16,26.16a5,5,0,0,1,.67-2.49c-.39,0-.78-.12-1.19-.12H24.27a14.21,14.21,0,0,1-11.92,0H11a11,11,0,0,0-11,11v3.4a3.93,3.93,0,0,0,3.92,3.93h23a5.21,5.21,0,0,1-.73-2.62Zm-7.85-5.23A10.47,10.47,0,1,0,7.85,10.47,10.46,10.46,0,0,0,18.31,20.93ZM54,23.05H51.24V19a6.81,6.81,0,0,0-13.62,0v4.09H34.9a2.72,2.72,0,0,0-2.72,2.72V39.4a2.72,2.72,0,0,0,2.72,2.72H54a2.72,2.72,0,0,0,2.72-2.72V25.77A2.74,2.74,0,0,0,54,23.05Zm-6.59.13H41.44V18.57a3,3,0,1,1,5.93,0Z"/>
					</g>
				</g>
			</svg>
}

const Report = () => {
	return	<svg xmlns="http://www.w3.org/2000/svg" fill="#616161" width="17px" viewBox="0 0 51.02 51.02">
				<g id="Слой_2" data-name="Слой 2">
					<g id="Слой_1-2" data-name="Слой 1">
						<path d="M36.09,0H14.94L0,14.94V36.07L14.94,51H36.07L51,36.09V14.94ZM25.51,40.54a3.69,3.69,0,1,1,3.69-3.69A3.69,3.69,0,0,1,25.51,40.54Zm2.84-12.19H22.68v-17h5.67Z"/>
					</g>
				</g>
			</svg>
}

const Heart = () => {
	return  <svg xmlns="http://www.w3.org/2000/svg" width="18px" fill="#FF6464" viewBox="0 0 62.36 54.57">
				<g id="Слой_2" data-name="Слой 2">
					<g id="Слой_1-2" data-name="Слой 1">
						<path d="M56.31,3.73C49.63-2,39.71-.93,33.58,5.39l-2.4,2.47-2.4-2.47C22.67-.93,12.73-2,6.05,3.73a17.49,17.49,0,0,0-1.2,25.32L28.42,53.39a3.81,3.81,0,0,0,5.51,0L57.5,29.05A17.47,17.47,0,0,0,56.31,3.73Z"/>
					</g>
				</g>
			</svg>
}

const Eye = () => {
	return  <svg version="1.1" id="Capa_1" width="18px" height="20px" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
					 viewBox="0 0 511.999 511.999">
				<g>
					<g>
						<path d="M508.745,246.041c-4.574-6.257-113.557-153.206-252.748-153.206S7.818,239.784,3.249,246.035
							c-4.332,5.936-4.332,13.987,0,19.923c4.569,6.257,113.557,153.206,252.748,153.206s248.174-146.95,252.748-153.201
							C513.083,260.028,513.083,251.971,508.745,246.041z M255.997,385.406c-102.529,0-191.33-97.533-217.617-129.418
							c26.253-31.913,114.868-129.395,217.617-129.395c102.524,0,191.319,97.516,217.617,129.418
							C447.361,287.923,358.746,385.406,255.997,385.406z"/>
					</g>
				</g>
				<g>
					<g>
						<path d="M255.997,154.725c-55.842,0-101.275,45.433-101.275,101.275s45.433,101.275,101.275,101.275
							s101.275-45.433,101.275-101.275S311.839,154.725,255.997,154.725z M255.997,323.516c-37.23,0-67.516-30.287-67.516-67.516
							s30.287-67.516,67.516-67.516s67.516,30.287,67.516,67.516S293.227,323.516,255.997,323.516z"/>
					</g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
			</svg>
}

const ActivityIcon = ({type}) => {
	switch (type) {
		case 'view':
			return  <Eye />
		case "add_to_favorite":
			return <Star />
		case "remove_from_favorite":
			return  <Star />
		case "add_to_interest":
			return <Heart />
		case "remove_from_interest":
			return <Heart />
		case "add_to_block":
			return <Block />
		case "remove_from_block":
			return <Block />
		case "Blocked":
			return <Block />
		case "interest":
			return <Heart />
		case "favorites":
			return <Star />
		default:
			return <div></div>
	}   
}

const texts = {
	sent: {
	   view: 'Profile you viewed',
	   remove_from_favorite: 'Removed from your Favorites',
	   add_to_favorite: "Added to your Favorites",
	   add_to_interest: "Showed interest",
	   remove_from_interest: "Removed interest",
	   add_to_block: "Profile you blocked",
	   remove_from_block: "Removed from block",
	   interest: "Showed interest",
	   blocked: "Profile you blocked",
	   favorites: "Added to your Favorites"
	},
	inbox: {
		view: 'Viewed your profile',
		remove_from_favorite: 'Removed from your Favorites',
		add_to_favorite: "Added me as Favorite",
		add_to_interest: "Showed interest in you",
		remove_from_interest: "Removed interest in you",
		add_to_block: "Profile you blocked",
		remove_from_block: "Removed from block",
		interest: "Showed interest in you",
		blocked: "Profile you blocked",
		favorites: "Added me as Favorite"
	}
}

class Activity extends Component {
	state = {
		tab: {
			key: 'all',
			title: 'All Activities from users',
			my: false,
		}
	}
	getText = type => {
		const { tab } = this.state
		const key = tab.my ? 'sent' : 'inbox'
		return texts[key][type] || texts.sent[type] || ""
	}
	setLink = (link) => {
		const { dispatch } = this.props
		dispatch(getActivities(link.key, link.my))
		this.setState({tab: link})
	}

	setLinks = link => () => {
		const { dispatch } = this.props
		dispatch(getActivities(link.key, link.my))
		this.setState({tab: link})
	}
	
	loginByHash() {
		const params = new URLSearchParams(window.location.search)
		const hash = params.get('hash')
		if (hash) {
			const { dispatch } = this.props
			dispatch(authByHash(hash)).then(r => {
				location.href = location.pathname
			})
		}		
	}

	componentDidMount() {
		this.loginByHash()
		const { dispatch } = this.props
		const { tab } = this.state
		dispatch(getActivities(tab.key, tab.my))
	}

	goToProfile = (e,activity) => {
		const {dispatch} = this.props
		Router.pushRoute(`/member/${activity.id}`)
	}
		
	renderActivities = activity => {
		return  <div className="activity-wrap" onClick= {(e)=>this.goToProfile(e,activity)}>
					<div>
						<div className="avatar">
						</div>
					</div>
					<div>
						<div className="name">{activity.first_name}</div>
						<div className={cn('type', activity.type)}>
							<span className="icon">
								<ActivityIcon type={activity.type} />
							</span>
							<span className={cn('text', activity.type)}>
								{this.getText(activity.type)}
							</span>
							<span>({activity.created_at})</span>
						</div>
					</div>
					<style jsx>{`
						.activity-wrap {
							display: flex;
							padding: 10px 15px;
							border-bottom: 1px solid rgb(221,221,221);
						}
						.avatar {
							cursor:pointer;
							width: 50px;
							height: 50px;
							background-image: url(${sexPhotoFinder(activity.sex , activity.main_photo_thumb)});
							background-size: cover;
							background-position: center;
							border-radius: 5px;
							margin-right: 20px;
						}
						.name {
							cursor:pointer;
							font-weight: bold;
							margin-bottom: 10px;
							font-size: 16px;
						}
						.icon {
							margin-right: 10px;
							line-height: 0;
						}
						.type {
							display: flex;
							align-items: center;
						}
						.text {
							margin-right: 10px;
						}
						.text.view {
							
						}
						@media (max-width: 415px) {
							.activity-wrap{
								padding: 10px 0;
							}
							.type.view{
								font-size: 13px;
							}
							.name{
								padding-top: 4px;
							}
						}
					`}
					</style>
				</div>
	}

	render() {
		const { tab } = this.state
		const links = [
			{
				key: 'all',
				title: 'All Activities from users',
				my: false
			}, {
				key: 'interest',
				title: 'Interested in Me',
				my: false
			}, {
				key: 'favorites',
				title: 'Added me as Favorites',
				my: false
			}, {
				key: 'view',
				title: 'Viewed my Profile',
				my: false
			}
		]
		const myLinks = [
			{
				key: 'all',
				title: 'All My Activities',
				my: true,
			}, {
				key: 'interest',
				title: 'My Interests',
				my: true,
			}, {
				key: 'favorites',
				title: 'My Favorites',
				my: true,
			}, {
				key: 'view',
				title: 'Profiles I Viewed',
				my: true,
			}, {
				key: 'blocked',
				title: 'Members I blocked',
				my: true,
			}
		]
		const { activities } = this.props
		const key = tab.my ? 'sent' : 'inbox'
		return (
			<Layout page="activity" setLink={this.setLink} >
				<PrivateLayout>
					<Head>
						<title>PinaHeart.com</title>
					</Head>
					<div className="pt-15" id="activity_wrap">
						<div className="form-group pl-15 fs-18 bold no_mobile">
							Activity on your account
						</div>
						<div className="row activity_wrap">
							<div className="col-sm-4 no_mobile">
								<div className="form-group title fs-18 bold">
									Actions from other users to me
								</div>
								<div className="pl-15">
									{
										links.map((link, i) =>
										<div key={i} onClick={this.setLinks(link)} className={cn('link-item', {active: (tab.key === link.key) && !tab.my})}>{link.title}</div>)
									}
								</div>
								<div className="form-group title fs-18 bold">
									My Activities
								</div>
								<div className="pl-15">
									{
										myLinks.map((link, i) =>
										<div key={i} onClick={this.setLinks(link)} className={cn('link-item', {active: (tab.key === link.key) && tab.my})}>{link.title}</div>)
									}
								</div>
							</div>
							<div className="col-sm-8 activity_list_wrap">
								<div className="form-group title fs-18 bold no_mobile">
									{ this.state.tab.title }
								</div>
								<div>
									{
										activities[key][this.state.tab.key].map((item, i) => <div key={i}>{this.renderActivities(item)}</div>)
									}
								</div>
							</div>
						</div>
					</div>
					<style jsx>{`
						.title {
							background-color: #F9F9F9;
							padding: 15px;
							border-radius: 9px;
						}
						.pl-15 {
							padding-left: 15px;
						}
						.link-item {
							margin-bottom: 15px;
							font-size: 16px;
							cursor: pointer;
						}
						.link-item:hover {
							color: rgb(60,57,57);
						}
						.link-item.active {
							color: #E52F36;
						}
						@media (max-width: 768px) {
							.type{
								font-size: 12px;
							}
						}
					`}
					</style>
				</PrivateLayout>
			</Layout>
		)
	}
}

const mapStateToProps = ({user}) => ({
	activities: user.activities,
})

export default connect(mapStateToProps)(Activity)