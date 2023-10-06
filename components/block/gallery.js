import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { removePhoto, toggleActive, addToGallery, getUserGallery, makePrivate, makeMainPhoto, getUserInfo } from '../../actions/user'
import {sexPhotoFinder} from '../../utils'
import { setUiKey } from '../../actions/ui'
import Photos from '../gallery/photos'
import BtnMain from '../buttons/btn_main'
import { Router } from '../../routes'
import Slider from "react-slick";

class Gallery extends Component {
	state = {
		menu: 0,
		uploading: 0,
		index: 0
	}

	makeMain = id => () => {
		const { dispatch } = this.props
		dispatch(makeMainPhoto(id)).then(res => dispatch(getUserInfo()))
		dispatch(setUiKey('lastPhoto', null))
		this.setState({menu: false})
	}
	removePhoto = id => () => {
		const { dispatch } = this.props
		dispatch(removePhoto(id)).then(res => dispatch(getUserInfo()))
		this.setState({menu: false})
		dispatch(setUiKey('lastPhoto', null))
	}

	goTo = link => e => {
		e.preventDefault()
		Router.pushRoute(`${link}`)
	}

	photoApproved = (approved) =>{
		switch (approved) {
			case true:
					return <div  className="Wraper">
								<span>{"Approved"}</span>
								<style jsx>{`
									.Wraper{
										padding: 3px 5px;
										border-radius: 5px;
										background: rgba(0, 0, 0, 0.4);
										color: #48ce10;
										display: flex;
										align-items: center;
										}`}</style> 
							</div>
			case null:
					return <div  className="Wraper">
								<span>{"Awaiting approval"}</span>
								<style jsx>{`
									.Wraper{
										padding: 4px 7px;
										border-radius: 5px;
										background: rgba(0, 0, 0, 0.4);
										color: #f3ad10;
										display: flex;
										align-items: center;
										}`}</style> 
							</div>
			default:
					return <div  className="Wraper">
								<span>{"Not approved"}</span>
								<style jsx>{`
									.Wraper{
										padding: 4px 7px;
										border-radius: 5px;
										background: rgba(0, 0, 0, 0.4);
										color: red;
										display: flex;
										align-items: center;
										}`}</style> 
							</div>
		}
	}

	renderGallery = (photo, i) => {
		const last = i === 9
		const background = photo ? photo.path_thumb : (!last ? '/static/assets/img/placeholder.png' : '')
		const backColor = last ? '#FDECED' : '#fff'

		const toggleMenu = id => () => {
			this.setState({menu: this.state.menu !== id && id})
			document.body.addEventListener('click', closeMenu);
		}
		const closeMenu = e => {
			if (!e.target.closest(`#drop-menu-${photo.id}`)) {
				this.setState({menu: false})
				document.body.removeEventListener('click', closeMenu)
			}
		}
		return (
			<div className="photo-gallery-item">
				{
					photo
						? <div className="member-info">{this.photoApproved(photo.approved)}
								{
									photo.is_main && photo.approved
									&& 	<div  className="Default">
												<span>{"Default photo"}</span> 
											</div>	
								}
							</div> 
						: null
				}
				{	
					photo
						? <div id={`drop-menu-${photo.id}`}>
								<div className="menu-wrap">
									<i className="fas fa-edit pointer" onClick={toggleMenu(photo.id)}></i>
								</div>
								{
									this.state.menu === photo.id
										? <div className="menu">
													<div className="menu-list">
														{
															photo.approved
																? <div className="pointer" onClick={this.makeMain(photo.id)}>Choose as default photo</div>
																: null
														}
														<div className="pointer" onClick={this.removePhoto(photo.id)}>Delete</div>
													</div>
												</div>
										: null
								}
							</div>
						: null
					}
					{
						last && 
							<div className="pending-text">
								<div className="warning">
									!
								</div>
								Pending photos 
								should be processed
								within 24 hours
							</div>
					}
				<style jsx>{`
					.Default{
						padding: 3px 5px;
						border-radius: 5px;
						background: rgba(0, 0, 0, 0.4);
						color: white;
						display: flex;
						align-items: center;
						margin-left: 5px;
						margin-right: 4px;
						
					}
					.member-info{
						position: absolute;
						left: 30px;
						bottom: 10px;
						display: flex;
						-webkit-box-align: center;
						align-items: center;
					}
					.GreyWraper{
						padding: 4px 7px;
						border-radius: 5px;
						background: rgba(0, 0, 0, 0.4);
						color: #48ce10;
						display: flex;
						align-items: center;
					}
					.photo-gallery-item {
						border-radius: 10px;
						width: 190px;
						height: 190px;
						background-color: ${backColor};
						background-image: url(${background});
						background-size: cover;
						background-position: center;
						position: relative;
					}
					.warning {
						width: 63px;
						height: 63px;
						border: 1px solid #C98387;
						border-radius: 50%;
						margin: 0 auto;
						font-size: 30px;
						line-height: 2;
					}
					.pending-text {
						position: absolute;
						text-align: center;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						width: 80%;
						color: #C98387;
						font-size: 12px;
					}
					.menu-wrap {
						position: absolute;
						right: 0;
						top: 0;
					}
					.menu {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						min-width: 80%;
						white-space: nowrap;
					}
					.menu-list {
						background: #fff;
						border-radius: 5px;
						overflow: hidden;
					}
					.menu-list div {
						padding: 10px 10px;
					}
					.menu-list div:hover {
						background: #98D538;
						color: #fff;
					}
				`}</style>
			</div>
		)	
	}

	renderMessage = () => {
		return (
			<div className="message-wrap">
				<div>
					<div className="success">
						<div className="icon">
							<i className="fas fa-check"></i>
						</div>
					</div>
				</div>
				<div>
					<div className="fs-18">Your photo has been uploaded</div>
					<div>Your photo has been successfully uploaded and will be reviewed shortly</div>
				</div>
				<style jsx>{`
					.message-wrap {
						display: flex;
						margin-bottom: 15px;
						padding: 30px;
						border-radius: 10px;
					}
					.success {
						color: #98D538;
						border: 1px solid #98D538;
						border-radius: 50%;
						width: 66px;
						height: 66px;
						margin-right: 15px;
						position: relative;
					}
					.icon {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						font-size: 20px;
					}
				`}
				</style>
			</div>
		)	
	}

	componentDidMount() {
		const { dispatch } = this.props
		dispatch(getUserGallery()).then(res => {			
			this.props.setGallery(this.props.gallery)
		})
	}

	componentWillUnmount() {
		const { dispatch } = this.props
		dispatch(setUiKey('lastPhoto', null))
	}

	setUploading = () => {
		this.setState({uploading: 1}, function () {
			console.log(this.state.uploading)
		})
	}

	afterChange = (index) => {
		const {gallery} = this.props
		this.setState({ index: gallery[index].id })
		this.props.setPhoto(gallery[index].id)
		this.props.setIsMain(!gallery[index].is_main && gallery[index].approved)
	}
	
	uploadedPhoto = () => {
		const {gallery} = this.props
		this.slider.slickGoTo(gallery.length -1, true)
		// setTimeout(() => {
		// 	this.slider.slickNext()
		// }, 3000)
	}

	render() {
		const { gallery, lastPhoto, sex, main_photo_thumb, handleDelete} = this.props
		this.props.setPhotos(gallery.length)
		
		const settings = {
			dots: true,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			speed:1000,
			afterChange: this.afterChange,
			initialSlide: 0
		};

		if(this.props.afterDelete){
			this.slider.slickGoTo(0, true)
		}

		return (
			<div >
				<div className="row form-group no_mobile">
					<div className="col-md-9">
						{ lastPhoto && this.renderMessage() }
						<div className="wrap-photos form-group border-radius-10 p-30">
							<div className="row">
								<div className="col-sm-6">
									<div className="fs-18 form-group">Next step - find your match</div>
									<div>
										Start browsing and communicating with your
										matches now
									</div>
								</div>
								<div onClick={this.goTo('/matches')} className="col-sm-6 text-center view_match">
									<BtnMain  text="View My Matches" className="btn-green" />
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-3">
						<div className="avatar">
						</div>
					</div>
				</div>
				<div className="row form-group">
					<div className="col-md-9 withphoto_panel_wrap">
						<div className="wrap-photos first form-group ">
							{gallery.length ? <div className="withphoto_panel only_mobile">
								<Slider ref={c1 => (this.slider = c1)} {...settings}>
                                    {gallery.map((el, idx) => (
                                        <div key={idx} index={idx} className="member_photo_wrap">
                                            <img src={el.path} className="member_photo" />
											<div className="photo_info">
												{
													el.approved ? (
														<>
															<span className="approved_wrap">Approved</span>
															{el.is_main ? <span className="default_photo_wrap">Default photo</span> : ''}
														</>
													) :
													(
														<span className="waiting_wrap">Awaiting approval</span>
													)
												}
											</div>
                                        </div>
                                    ))}                            
                                </Slider>
								</div>
								: ''
							}
							<Photos photos={gallery.length} uploading={this.state.uploading} setUploading={this.setUploading} uploadedPhoto={this.uploadedPhoto} />
						</div>
					</div>
					<div className="col-md-3 no_mobile">
						<div className="p-15 guidlines">
							<div className="fs-18 form-group">
								Photo Guidelines
							</div>
							<div className="wrap-photo-list form-group">
								<div className="guidlines-photo"></div>
								<div className="guidlines-photo"></div>
							</div>
							<div style={{marginBottom: 31}}>
								<div>What is a good photo:</div>
								<div> * Portrait photo clearly showing your face</div>
								<div> * Smile!</div>
								<div> * if group photo, it must be clear who are YOU</div>
								<div> * At least add 1 photo showing your full body</div>
								<div> * No nudity! Will be deleted</div>
							</div>
						</div>
					</div>
				</div>
				<div className="wrap-photos p-15 border-radius-10 form-group no_mobile">
					Manage Photos
				</div>
				<div className="wrap-photo-list no_mobile">
					{
						[...new Array(10)].map((item, i) => <div key={i} className="photo-gallery-item">{this.renderGallery(gallery[i], i)}</div>)
					}
				</div>
				<style jsx>{`
					.wrap-photos {
						background-color: #F9F9F9;
					}
					.avatar {
						height: 285px;
						border-radius: 10px;
						background-image: url(${sexPhotoFinder(sex, main_photo_thumb)});
						background-position: center;
						background-size: cover;
						margin: 0 auto;
					}
					.wrap-photos.first {
						border-radius: 10px;
					}
					.photo-gallery-item {
						padding-right: 10px;
						padding-left: 10px;
						margin-bottom: 15px;
					}
					.wrap-photo-list {
						display: flex;
						flex-wrap: wrap;
						justify-content: space-around;
					}
					.guidlines {
						border-radius: 10px;
						background: #F3F3F4;
					}
					.guidlines-photo {
						border-radius: 5px;
						width: 110px;
						height: 110px;
						background-image: url(${sex == "F" ? '/static/assets/img/default-avatar-woman.png' : '/static/assets/img/default-avatar-man.png'});
						background-position: center;
						background-size: cover;
					}
					@media (max-width: 768px) {
						.wrap-photos {
							background-color: transparent;
						}
					}
				`}</style>
			</div>
		)
	}
}

const mapStateToProps = ({user: {data}, ui}) => ({
	sex: data.sex,
	gallery: data.gallery,
	main_photo_thumb: data.main_photo_thumb,
	lastPhoto: ui.lastPhoto,
})

export default connect(mapStateToProps)(Gallery)