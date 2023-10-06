import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getShortMember } from '../../actions/members'
import BtnMain from '../buttons/btn_main'
import { confirmAlert } from 'react-confirm-alert'
import Slider, { slickNext } from 'react-slick'
import cn from 'classnames'
import { getFullMember, searchByFavorite, blockMember, searchByInterest, updateAdminComment, togleAdminBlockMember } from '../../actions/members'
import { Router } from '../../routes'
import { toggleModal, setUiKey } from '../../actions/ui'
import { getUncompleteField } from '../../actions/user'
import { openDialog } from "../../actions/dialog"
import { toFeet, toLbs, sexPhotoFinder } from '../../utils'
import FullScreenPreview from '../../components/gallery/full_screen_preview'

const LeftArrow = () => {
	return <svg xmlns="http://www.w3.org/2000/svg" fill="#848183" width="10px" viewBox="0 0 43.71 79.37">
		<defs></defs>
		<g id="Слой_2" data-name="Слой 2"><g id="Слой_1-2" data-name="Слой 1">
			<path id="Expand_More" data-name="Expand More" class="cls-1" d="M42.53,72.54,9.68,39.69,42.54,6.84a4,4,0,0,0-5.67-5.67L1.17,36.85h0a4,4,0,0,0,0,5.67L36.87,78.2a4,4,0,1,0,5.66-5.66Z" />
		</g>
		</g>
	</svg>
}

const RightArrow = () => {
	return <svg xmlns="http://www.w3.org/2000/svg" fill="#848183" width="10px" viewBox="0 0 43.71 79.37">
		<defs></defs><g id="Слой_2" data-name="Слой 2">
			<g id="Слой_1-2" data-name="Слой 1">
				<path id="Expand_More" data-name="Expand More" class="cls-1" d="M1.18,6.83,34,39.68,1.17,72.53A4,4,0,1,0,6.84,78.2l35.7-35.68h0a4,4,0,0,0,0-5.67L6.84,1.17A4,4,0,1,0,1.18,6.83Z" />
			</g>
		</g>
	</svg>
}

const Block = () => {
	return <svg xmlns="http://www.w3.org/2000/svg" fill="#FF6464" width="20px" viewBox="0 0 56.69 42.12">
		<g id="Слой_2" data-name="Слой 2">
			<g id="Слой_1-2" data-name="Слой 1">
				<path d="M26.16,26.16a5,5,0,0,1,.67-2.49c-.39,0-.78-.12-1.19-.12H24.27a14.21,14.21,0,0,1-11.92,0H11a11,11,0,0,0-11,11v3.4a3.93,3.93,0,0,0,3.92,3.93h23a5.21,5.21,0,0,1-.73-2.62Zm-7.85-5.23A10.47,10.47,0,1,0,7.85,10.47,10.46,10.46,0,0,0,18.31,20.93ZM54,23.05H51.24V19a6.81,6.81,0,0,0-13.62,0v4.09H34.9a2.72,2.72,0,0,0-2.72,2.72V39.4a2.72,2.72,0,0,0,2.72,2.72H54a2.72,2.72,0,0,0,2.72-2.72V25.77A2.74,2.74,0,0,0,54,23.05Zm-6.59.13H41.44V18.57a3,3,0,1,1,5.93,0Z" />
			</g>
		</g>
	</svg>
}

const Report = () => {
	return <svg xmlns="http://www.w3.org/2000/svg" fill="#616161" width="17px" viewBox="0 0 51.02 51.02">
		<g id="Слой_2" data-name="Слой 2">
			<g id="Слой_1-2" data-name="Слой 1">
				<path d="M36.09,0H14.94L0,14.94V36.07L14.94,51H36.07L51,36.09V14.94ZM25.51,40.54a3.69,3.69,0,1,1,3.69-3.69A3.69,3.69,0,0,1,25.51,40.54Zm2.84-12.19H22.68v-17h5.67Z" />
			</g>
		</g>
	</svg>
}

const Heart = () => {
	return <svg xmlns="http://www.w3.org/2000/svg" width="18px" fill="#FF6464" viewBox="0 0 62.36 54.57">
		<g id="Слой_2" data-name="Слой 2">
			<g id="Слой_1-2" data-name="Слой 1">
				<path d="M56.31,3.73C49.63-2,39.71-.93,33.58,5.39l-2.4,2.47-2.4-2.47C22.67-.93,12.73-2,6.05,3.73a17.49,17.49,0,0,0-1.2,25.32L28.42,53.39a3.81,3.81,0,0,0,5.51,0L57.5,29.05A17.47,17.47,0,0,0,56.31,3.73Z" />
			</g>
		</g>
	</svg>
}

const Star = () => {
	return <svg xmlns="http://www.w3.org/2000/svg" width="18px" fill="#FFEB04" viewBox="0 0 62 59.34">
		<g id="Слой_2" data-name="Слой 2">
			<g id="Слой_1-2" data-name="Слой 1">
				<path d="M27.67,2.06,20.11,17.41,3.18,19.88A3.71,3.71,0,0,0,1.12,26.2L13.37,38.14,10.48,55a3.7,3.7,0,0,0,5.37,3.91L31,51l15.15,8A3.71,3.71,0,0,0,51.52,55L48.63,38.14,60.88,26.2a3.71,3.71,0,0,0-2.06-6.32L41.89,17.41,34.33,2.06a3.72,3.72,0,0,0-6.66,0Z" />
			</g>
		</g>
	</svg>
}

const Send = () => {
	return <svg xmlns="http://www.w3.org/2000/svg" width="20px" fill="#fff" viewBox="0 0 59.53 59.53">
		<g id="Слой_2" data-name="Слой 2">
			<g id="Слой_1-2" data-name="Слой 1">
				<path d="M58.6.37a2.08,2.08,0,0,1,.9,2.12L51,53.51A2.09,2.09,0,0,1,49.93,55a2,2,0,0,1-1,.26,2.27,2.27,0,0,1-.8-.16L33.06,49l-8,9.8a2,2,0,0,1-1.63.77,1.76,1.76,0,0,1-.73-.14,2,2,0,0,1-1-.78,2,2,0,0,1-.39-1.21V45.81L50,10.63,14.45,41.36,1.33,36A1.94,1.94,0,0,1,0,34.15a2,2,0,0,1,1.07-2L56.34.3A2.08,2.08,0,0,1,58.6.37Z" />
			</g>
		</g>
	</svg>
}

class MemberInfo extends Component {
	state = {
		slide: 1,
		showPreview: false,
		mainPhoto: "",
		photoColection: [],
	}
	componentDidMount() {
		const { dispatch, activeMember } = this.props
		dispatch(getShortMember(activeMember.id))
	}
	canPrev = () => {
		return this.state.slide > 1
	}
	canNext = () => {
		return this.state.slide < this.props.activeMember.photos.length
	}
	prev = () => {
		if (this.canPrev()) {
			this.slider.slickPrev()
		}
	}
	next = () => {
		if (this.canNext()) {
			this.slider.slickNext()
		}
	}
	send = (id) => {
		const { activeMember, dispatch, user } = this.props
		if (!user.filled_info) {
			dispatch(getUncompleteField())
			dispatch(openDialog(id)).then(res => dispatch(setUiKey('targetPage', `/messages/dialog/${res}`)))
			dispatch(toggleModal(false, 'member'))
			dispatch(toggleModal(true, 'uncomplete'))
			return
		}
		dispatch(openDialog(id)).then(res => Router.pushRoute(`/messages/dialog/${res}`))
		dispatch(toggleModal(false, 'member'))
	}
	goToProfile = () => {
		const { activeMember, dispatch, user } = this.props
		console.log(user.filled_info)
		if (!user.filled_info) {
			dispatch(getUncompleteField())
			dispatch(setUiKey('targetPage', `/member/${activeMember.id}`))
			dispatch(toggleModal(false, 'member'))
			dispatch(toggleModal(true, 'uncomplete'))
			return
		}
		Router.pushRoute(`/member/${activeMember.id}`)
		dispatch(toggleModal(false, 'member'))
	}

	toggleBlock = (e) => {
		e.stopPropagation()
		const { dispatch, activeMember } = this.props
		dispatch(blockMember(activeMember.id)).then(success => {
			if (success) {
				dispatch(getFullMember(activeMember.id))
			}
		})
	}

	toggleFavorite = (e) => {
		e.stopPropagation()
		const { dispatch, activeMember } = this.props
		dispatch(searchByFavorite(activeMember.id)).then(success => {
			if (success) {
				dispatch(getFullMember(activeMember.id))
			}
		})
	}


	toggleInterest = (e) => {
		e.stopPropagation()
		const { dispatch, activeMember } = this.props
		dispatch(searchByInterest(activeMember.id)).then(success => {
			if (success) {
				dispatch(getFullMember(activeMember.id))
			}
		})
	}
	closePreview = () => {
		this.setState({ showPreview: false })
	}

	componentWillReceiveProps(next_props) {
		if (next_props.activeMember.photos.length && next_props.activeMember.photos.find(item => item.is_main)) {
			this.setState({
				photoColection: next_props.activeMember.photos.filter((photo, id) => {
					photo.id = id
					return photo
				}),
				mainPhoto: next_props.activeMember.photos.find(item => item.is_main)
			})
		} else if (next_props.activeMember.photos.find(item => item.is_main) === undefined && next_props.activeMember.photos.length != 0) {
			// if from serwer cames photos without is_main 
			this.setState({
				mainPhoto: next_props.activeMember.photos.find(item => item.is_main == false),
				photoColection: next_props.activeMember.photos.filter((photo, id) => {
					id === 0 ? photo.is_main = true : photo.is_main = false
					photo.id = id;
					return photo
				})
			})
		} else this.setState({
			mainPhoto: { path: sexPhotoFinder(next_props.activeMember.sex) },
			photoColection: next_props.activeMember.photos.filter((photo, id) => {
				photo.id = id
				return photo
			})
		})
	}

	changeMain = (item, i) => {
		this.setState({
			mainPhoto: item,
			photoColection: this.state.photoColection.filter(photo => {
				photo.id !== item.id ? photo.is_main = false : photo.is_main = true
				return photo
			})
		})
	}

	renderPhotos = (photo, i) => {
		return <div key={i} onClick={() => this.changeMain(photo)}>
			<div className="slide">
			</div>
			<style jsx>{`
						.slide {
							cursor: pointer;
							width: 100px;
							height: 100px;
							border-radius: 5px;
							background-image: url(${photo ? photo.path_thumb : ''});
							background-size: cover;
							background-position: center;
						}
					`}
			</style>
		</div>
	}

	textareaRef = ref => {
		this.textarea = ref
	}

	handleSubmitAdminComment = e => {
		e.preventDefault()
		const { dispatch, activeMember } = this.props
		const data = {
			id: activeMember.id,
			comment: this.textarea.value,
		}
		dispatch(updateAdminComment(data))
	}

	handleClickAdminBlock = e => {
		e.preventDefault()
		confirmAlert({
			title: '',
			message: 'Are you sure?',
			buttons: [
				{
					label: 'No'
				},
				{
					label: 'Yes',
					onClick: () => {
						const { dispatch, activeMember } = this.props
						const data = {
							id: activeMember.id,
							value: true,
						}

						dispatch(togleAdminBlockMember(data)).then(res => {
							dispatch(getFullMember(activeMember.id))
						})
					}
				}
			]
		})
	}

	handleClickAdminUnBlock = e => {
		e.preventDefault()
		confirmAlert({
			title: '',
			message: 'Are you sure?',
			buttons: [
				{
					label: 'No'
				},
				{
					label: 'Yes',
					onClick: () => {
						const { dispatch, activeMember } = this.props
						const data = {
							id: activeMember.id,
							value: false,
						}
						dispatch(togleAdminBlockMember(data)).then(success => {
							if (success) {
								dispatch(getFullMember(activeMember.id))
							}
						})
					}
				}
			]
		})
	}

	render() {
		const { activeMember, isAdmin } = this.props
		const { photoColection, mainPhoto } = this.state

		const settings = {
			slidesToShow: photoColection.length > 4 ? 4 : photoColection.length,
			infinite: false,
			arrows: false,
			beforeChange: (current, next) => {
				this.setState({ slide: next + 1 })
			},
			responsive: [
				{
					breakpoint: 425,
					settings: {
						slidesToShow: 2,
					}
				}
			],
		}

		return <div className="wrap-member-info">
			<div className="row form-group">
				<div className="col-lg-5 col-md-4">
					<div className="avatar">
						<div className="avatar-info">{
							activeMember.account_status === 'platinum' ? <span className="member-status-premium">Premium</span>
								: activeMember.account_status === 'free_platinum' ? <span className="member-status-free-premium">Premium</span>
									: null

						}</div>
						{
							activeMember.is_blocked
								? <div className="isBlocked">
									<span> You blocked this member </span>
								</div>
								: null
						}
						<div className="inner-avatar">
							<div onClick={this.toggleFavorite} className="favorite GreyWraper">
								<Star />
								<span style={{ marginLeft: 10 }}>{this.props.activeMember.is_favorite ? "Remove from favorites" : "Add to favorites"}</span>
							</div>
							<div onClick={this.toggleInterest} className="interest GreyWraper">
								<Heart />
								<span style={{ marginLeft: 10 }}>{this.props.activeMember.is_interested ? "Remove Interest" : "Show Interest"}</span>
							</div>
						</div>
					</div>
					{
						isAdmin
							?
							<div className="form-group" >
								<form onSubmit={this.handleSubmitAdminComment} noValidate={true}>
									<textarea ref={this.textareaRef} defaultValue={activeMember.comment} className="form-group form-control text-field noresize" placeholder="Admin comments"></textarea>
									<button className="btn main button btn-outline">Update comments</button>
								</form>
							</div>
							: ""
					}
				</div>
				<div className="col-lg-7 col-md-8">
					<div className="form-group">
						<div className="name form-group">
							{activeMember.first_name}, {activeMember.age}
							<span className="address">{activeMember.formatted_address}</span>
						</div>
						<div className="row">
							<div className="col-sm-6">
								<div className="form-group">
									{
										activeMember.height
										&& <div>
											<strong>Height:</strong>{` ${activeMember.height} / ${toFeet(activeMember.height)}`}
										</div>
									}
									{
										activeMember.weight
										&& <div>
											<strong>Weight:</strong>{` ${activeMember.weight} / ${toLbs(activeMember.weight)} lbs`}
										</div>
									}
								</div>
								{
									activeMember.looking_for
									&& <div className="form-group">
										<strong>Looking for:</strong> {activeMember.looking_for}
									</div>
								}

							</div>
							<div className="col-sm-6">
								{
									isAdmin ?
										<div className="form-group">
											{
												activeMember.is_admin_block ?
													<div className="admin-btn blocked">
														<span>Blocked</span>
													</div> : ""
											}
											{
												!activeMember.is_admin_block ?
													<div className="admin-btn block" onClick={this.handleClickAdminBlock}>
														<span>Block by staff</span>
													</div> : ""
											}
											{
												activeMember.is_admin_block ?
													<div className="admin-btn unblock" onClick={this.handleClickAdminUnBlock}>
														<span>Unblock by staff</span>
													</div> : ""
											}
										</div>
										: ""
								}
								<div className="unblock">
									<Block />
									<span style={{ marginLeft: 10 }} onClick={this.toggleBlock}>{this.props.activeMember.is_blocked ? "Unblock user" : "Block user"}</span>
								</div>
								<div className="report">
									<Report />
									<span style={{ marginLeft: 13 }}>Report user</span>
								</div>
							</div>
						</div>
						<div className="form-group">
							<BtnMain text="View Profile" onClick={this.goToProfile} className="btn-outline" />
						</div>
						<div>
							<BtnMain
								className="btn-green"
								onClick={() => this.send(activeMember.id)}
								text={<div className="btn-text">
									<div style={{ marginBottom: -5, marginRight: 10 }}><Send /></div>
									<span>Send message</span>
								</div>} />
						</div>
					</div>
					<div>
						{
							photoColection.length < 10
								? <div className="no-slider">
									{
										[...new Array(photoColection.length > 10 ? 10 : photoColection.length)].map((item, i) => <div key={i} className="no-slider-item">{this.renderPhotos(photoColection[i], i)}</div>)
									}
								</div>
								: <div>
									<div className="wrap-arrows">
										<div onClick={this.prev} className={cn('arrow', { active: this.canPrev() })}>
											<LeftArrow />
										</div>
										<div>

										</div>
										<div onClick={this.next} className={cn('arrow', { active: this.canNext() })}>
											<RightArrow />
										</div>
									</div>
									<Slider ref={c => (this.slider = c)} {...settings}>
										{photoColection.map((review, i) => this.renderPhotos(review, i))}
									</Slider>
								</div>
						}
					</div>
				</div>
			</div>
			<div className="banner">
				banner here
					</div>
			<style jsx>{`
						.isBlocked {
							color: #fff;
		                    border-radius: 5px;
		                    background: rgba(0,0,0,0.4);
		                    padding: 1px 7px;
		                    text-align: center;
		                    font-size: 12px;
		                    position: absolute;
		                    top: 10px;
		                    left: 50%;
		                    transform: translateX(-50%);
						}
						.GreyWraper{
							padding: 4px 4px;
							border-radius: 5px;
							background: rgba(0, 0, 0, 0.4);
						}
						
						.wrap-member-info {
							margin-top: -75px;
							
						}
						
						@media(min-width: 1024px) {
							.wrap-member-info {
								margin-left: -15px;
								margin-right: -15px;
							}
						}

						@media(max-width: 1023px) {
							.wrap-member-info {
								padding-right: 15px;
								padding-left: 15px;
								margin-top: -60px;
							}
						}
						
						.avatar-info {
							position: absolute;
							top: 70px;
							left: -20px;
							font-size: 20px;
							transform: rotate(-90deg);
							font-weight: bold;
							color: #f17eeb;
							// border: 1px solid #f17eeb;
							padding: 0 10px;
							// border-radius: 5px;
						}
						.member-status-premium {
							color: #0cf6dd;
						}
						.member-status-free-premium {
								color: #e0e507;
								position: absolute;
								left: -51px;
								top: 20px;
								width: 166px;
						}
						.btn-text {
						    display: flex;
						    justify-content: center;
						    align-items: center;
						}
						.banner {
							height: 140px;
							background: #FAF8F8;
							border-radius: 5px;
							color: #E1E2E5;
							display: flex;
							align-items: center;
							justify-content: center;
							font-size: 36px;
						}
						.no-slider {
							display: flex;
							flex-wrap: wrap;
						}
						.no-slider-item {
							margin-right: 15px;
							margin-bottom: 10px;
						}
						.unblock {
							color: #FF6464;
							margin-bottom: 15px;
							cursor: pointer
						}
						.report {
							color: #616161;
							display: flex;
							align-items: center;
							margin-bottom: 15px;
						}
						.wrap-arrows {
							display: flex;
						    align-items: end;
							margin-bottom: 15px;
							color: #848183;
						    justify-content: flex-end;
						}
						.wrap-arrows > div:nth-child(2) {
							margin-right: 10px;
							margin-left: 10px;
						}
						.wrap-arrows i {
							font-size: 18px;
						}
						.arrow {
							opacity: 0.5;
						}
						.arrow.active {
							opacity: 1;
							cursor: pointer;
						} 
						.name {
							font-size: 18px;
							color: #777074;
							font-weight: 600;
						}
						.address {
							color: #848183;
    						font-size: 14px;
    						font-weight: 400;
    						margin-left: 20px;
						}
						.avatar {
							position: relative;
							width: 100%;
							padding-top: 100%;
							background-image: url(${mainPhoto.path || ''});
							background-size: cover;
							border-radius: 9px;
							background-position: center;
							margin-bottom: 15px;
						}
						.inner-avatar {
							position: absolute;
							display: flex;
						    bottom: 15px;
    						left: 10px;
    						flex-wrap: wrap;
						}
						.favorite {
							color: #FFEB04;
							margin-right: 5px;
							cursor: pointer;
							display: flex;
					    	align-items: end;
						}
						.interest {
							color: #FF6464;
							cursor: pointer;
							display: flex;
							align-items: center;
						}

						body.react-confirm-alert-body-element {
								overflow: hidden;
						}
						
						.react-confirm-alert-blur {
								filter: url(#gaussian-blur);
								filter: blur(2px);
								-webkit-filter: blur(2px);
						}
						
						.react-confirm-alert-overlay {
								position: fixed;
								top: 0;
								left: 0;
								right: 0;
								bottom: 0;
								z-index: 99;
								background: rgba(255, 255, 255, 0.9);
								display: -webkit-flex;
								display: -moz-flex;
								display: -ms-flex;
								display: -o-flex;
								display: flex;
								justify-content: center;
								-ms-align-items: center;
								align-items: center;
								opacity: 0;
								-webkit-animation: react-confirm-alert-fadeIn 0.5s 0.2s forwards;
								-moz-animation: react-confirm-alert-fadeIn 0.5s 0.2s forwards;
								-o-animation: react-confirm-alert-fadeIn 0.5s 0.2s forwards;
								animation: react-confirm-alert-fadeIn 0.5s 0.2s forwards;
						}
						
						.react-confirm-alert-body {
								font-family: Arial, Helvetica, sans-serif;
								width: 400px;
								padding: 30px;
								text-align: left;
								background: #fff;
								border-radius: 10px;
								box-shadow: 0 20px 75px rgba(0, 0, 0, 0.13);
								color: #666;
						}
						
						.react-confirm-alert-svg {
								position: absolute;
								top: 0;
								left: 0;
						}
						
						.react-confirm-alert-body > h1 {
								margin-top: 0;
						}
						
						.react-confirm-alert-body > h3 {
								margin: 0;
								font-size: 16px;
						}
						
						.react-confirm-alert-button-group {
								display: -webkit-flex;
								display: -moz-flex;
								display: -ms-flex;
								display: -o-flex;
								display: flex;
								justify-content: flex-start;
								margin-top: 20px;
						}
						
						.react-confirm-alert-button-group > button {
								outline: none;
								background: #333;
								border: none;
								display: inline-block;
								padding: 6px 18px;
								color: #eee;
								margin-right: 10px;
								border-radius: 5px;
								font-size: 12px;
								cursor: pointer;
						}
						
						@-webkit-keyframes react-confirm-alert-fadeIn {
								from {
								opacity: 0;
								}
								to {
								opacity: 1;
								}
						}
						
						@-moz-keyframes react-confirm-alert-fadeIn {
								from {
								opacity: 0;
								}
								to {
								opacity: 1;
								}
						}
						
						@-o-keyframes react-confirm-alert-fadeIn {
								from {
								opacity: 0;
								}
								to {
								opacity: 1;
								}
						}
						
						@keyframes react-confirm-alert-fadeIn {
								from {
								opacity: 0;
								}
								to {
								opacity: 1;
								}
						}
					`}
			</style>
		</div>
	}
}

const mapStateToProps = ({ members, user }) =>
	({
		activeMember: members.activeMember,
		user: user.data,
		isAdmin: user.isAdmin,
	})

export default connect(mapStateToProps)(MemberInfo)