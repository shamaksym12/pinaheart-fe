import { connect } from 'react-redux'
import BtnMain from '../buttons/btn_main'
import { addPhotos, setUserKey, updateFacebookAlbums } from '../../actions/user'
import { toggleModal, setUiKey } from '../../actions/ui'
import { Router } from '../../routes'

const PhotosNextNext = ({dispatch}) => {
	let upload = null
	const onChange = ({target: {files}}) => {
		if (files) {
			let reader = new FileReader()
			reader.readAsDataURL(files[0])
            reader.onload = () => {
            	dispatch(addPhotos(files[0])).then(res => {
					if (res) {
						dispatch(setUiKey('lastPhoto', reader.result))
						setTimeout(() => {
							dispatch(toggleModal(false, 'avatar_next_next'))
							dispatch(toggleModal(true, 'avatar_next'))
						}, 500)
					}
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
							dispatch(toggleModal(true, 'avatar_next'))
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

	const cancel = () => {
		dispatch(toggleModal(false, 'avatar_next_next'))
	}

	return 	<div className="photos_wrap photos_next_wrap photos_next_next_wrap">
				<input 
        			type="file"
        			ref={ref => upload = ref}
        			multiple={false}
        			onChange={onChange}
        			className="hidden" />
				<div className="">
					<div className="upload_icon_wrap upload_modal_item">
						<img src="../../static/assets/img/upload.png" className="upload_success_icon upload_modal_item" />
					</div>				
					<h3 className="upload_success_title">Upload form</h3>
				</div>
				<div className="col-sm-6 col-12 text-center form-group upload_button_wrap">
					<BtnMain text="Add a photo from your phone" className="btn-green upload_btn" onClick={() => upload.click()} />
				</div>
				<div className="form-group facebook_wrap">
					<BtnMain text="Connect" className="btn-facebook" onClick={facebookLogin} icon={<i className="fab fa-facebook"></i>} />
				</div>
				<button type="button" className="upload_modal_item add_later close" onClick={cancel}>Cancel</button>
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
}

export default connect()(PhotosNextNext)