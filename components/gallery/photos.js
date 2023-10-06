import React from "react";
import { useHooks, useState } from "use-react-hooks";
import { connect } from 'react-redux'
import BtnMain from '../buttons/btn_main'
import { addPhotos, setUserKey, updateFacebookAlbums } from '../../actions/user'
import { toggleModal, setUiKey } from '../../actions/ui'
import { Router } from '../../routes'

const Photos = useHooks(props => {
	const [status, setStatus] = useState({ 
		text: 'Add a photo from your phone', icon: '',
	});
	
	const {dispatch, uploading, setUploading, photos} = props
	
	let upload = null

	const onChange = ({target: {files}}) => {
		if (files) {
			setUploading()

			setStatus({ 
				text: 'Uploading', icon: <i className="fas fa-spinner fa-spin loader text-info upload_spiner_mobile"></i>,
			})
			
			let reader = new FileReader()
			reader.readAsDataURL(files[0])
            reader.onload = () => {
            	dispatch(addPhotos(files[0])).then(res => {
					if (res) {
						dispatch(setUiKey('lastPhoto', reader.result))
						setTimeout(() => {
							dispatch(toggleModal(false, 'avatar'))
							if (window.innerWidth < 768) {
								if (!photos) dispatch(toggleModal(true, 'avatar_next'))
								else props.uploadedPhoto(photos)
							}
						}, 1000)
					}
					setStatus({ 
						text: 'Add a photo from your phone', icon: '',
					})
				})
            }
		}
	}
	const facebookLogin = () => {
        window.FB.login(response => {
            if (response.authResponse) {
                FB.api(`/${response.authResponse.userID}/albums?fields=name,cover_photo`, response => {
                      if (response && !response.error) {
                      	const albums = response.data.map(album => {
                      		album.list = []
                      		return album
						  })
						  dispatch(setUserKey('facebookAlbums', {list: albums}))
						
                      	response.data.forEach(album => {
							if(album.cover_photo){
								FB.api(`/${album.cover_photo.id}?fields=source`, response => {
									dispatch(updateFacebookAlbums(album.id, {cover: response.source}))
								})
							}
                      	})
						  dispatch(toggleModal(true, 'facebook'))
						  setTimeout(() => {
							dispatch(toggleModal(false, 'avatar'))
							if (window.innerWidth < 768 && !photos) dispatch(toggleModal(true, 'avatar_next'))
							Router.pushRoute('/matches')
						}, 500)
                      }
                    }
                );
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'user_photos'});
        // {scope: 'manage_pages', enable_profile_selector: true}	
	}
	
	const gotoEdit = () => {
		dispatch(toggleModal(false, 'avatar'))
		Router.pushRoute('/edit/info')
	}

	return 	<div className="photos_wrap">
				<input 
        			type="file"
        			ref={ref => upload = ref}
        			multiple={false}
        			onChange={onChange}
        			className="hidden" />
				{!photos ? <div className="text-center form-group only_mobile">Users with several good photos have much more success!</div> : ''}
				<div className={`upload_icon_wrap upload_modal_item ${photos ? 'no_mobile' : ''}`}>
					<img src="../../static/assets/img/upload.png" className="upload_icon upload_modal_item" />
				</div>
				{!photos ? <div className="text-center form-group special_title only_mobile">Upload a photo from your phone</div> : ''}
				<h3 className="upload_modal_title upload_modal_item no_mobile">Add a photo</h3>
				<div className="text-center form-group no_mobile">Users with several good photos have much more success!</div>
				<div className="row wrap-photos">
					<div className="location-divider no_mobile">or</div>
					{typeof(photos) == 'undefined' || photos < 9 ? <div className="col-sm-6 col-12 text-center form-group only_mobile">
						<div className="fs-22 text-center container-photos no_mobile" style={{opacity: 0.6}}>
							Upload a photo
							from your computer
						</div>
						<BtnMain text={status.text} icon={status.icon} className="btn-green upload_btn" onClick={() => upload.click()} />
					</div> : ''}
					<div className="col-sm-6 col-12 text-center form-group no_mobile">
						<div className="fs-22 text-center container-photos no_mobile" style={{opacity: 0.6}}>
							Upload a photo
							from your computer
						</div>
						<BtnMain text={status.text} icon={status.icon} className="btn-green upload_btn" onClick={() => upload.click()} />
					</div>
					<h5 className="upload_modal_item or_text no_mobile">or</h5>
					{!photos ? <div className="text-center form-group special_title only_mobile">Upload a photo from Facebook</div> : ''}
					<div className="col-sm-6 col-12 text-center form-group">
						<div className="fs-22 text-center container-photos no_mobile" style={{opacity: 0.6}}>
							Upload a photo 
							from Facebook
						</div>
						{typeof(photos) == 'undefined' || photos < 9 ? <div className="form-group only_mobile">
							<BtnMain text="Connect" className="btn-facebook" onClick={facebookLogin} icon={<i className="fab fa-facebook"></i>} />
						</div> : ''}
						<div className="form-group no_mobile">
							<BtnMain text="Connect" className="btn-facebook" onClick={facebookLogin} icon={<i className="fab fa-facebook"></i>} />
						</div>
						{photos == 9 ? <div className="maximum9 only_mobile">Maximum number of 9 photos uploaded</div> : ''}
						<div className="no_mobile">We never post on your behalf.</div>
						<button type="button" className="upload_modal_item add_later close no_mobile">I will add a photo later</button>
						{!photos ? <button type="button" className="upload_modal_item add_later close onlu_mobile" onClick={gotoEdit}>Cancel</button> : ''}
					</div>
				</div>
				<style jsx>{`
					.wrap-photos {
						position: relative;
						overflow: hidden;
					}
					.container-photos {
				        padding: 60px 15px;
				        height: 190px;
					}
					.location-divider {
						font-style: italic;
						color: #DFDADA;
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
					}
					.location-divider:after,
					.location-divider:before {
						content: "";
					    border-left: 1px solid #DFDADA;
					    height: 1000px;
					    position: absolute;
					    left: 50%;
					}
					.location-divider:after {
					    bottom: 30px;
					}
					.location-divider:before {
					    top: 30px;
					}
					@media (max-width: 768px) {
						.modal-header{
							display: none !important;
						}
						.modal-body{
							padding-top: 15px;
						}
					}
					@media (max-width: 576px) {
						.location-divider:after {
					        height: 1px;
						    width: 1000px;
						    border-bottom: 1px solid;
						    top: 50%;
						    left: 30px;
						}
						.location-divider:before {
				            height: 1px;
						    width: 1000px;
						    border-bottom: 1px solid;
						    top: 50%;
						    left: -1015px;
						}
					}
				`}
				</style>
			</div>
})

export default connect()(Photos)