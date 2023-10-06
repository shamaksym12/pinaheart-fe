import { connect } from 'react-redux'
import BtnMain from '../buttons/btn_main'
import { addPhotos, setUserKey, updateFacebookAlbums } from '../../actions/user'
import { toggleModal, setUiKey } from '../../actions/ui'
import { Router } from '../../routes'

const PhotosNext = ({dispatch}) => {
	let upload = null
	const onChange = () => {
		dispatch(toggleModal(false, 'avatar_next'))
		dispatch(toggleModal(true, 'avatar_next_next'))
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
		dispatch(toggleModal(false, 'avatar_next'))
		Router.pushRoute('/edit/info')
	}

	const gotoMatches = () => {
		dispatch(toggleModal(false, 'avatar_next'))
	}

	return 	<div className="photos_wrap photos_next_wrap">
				<input 
        			type="file"
        			ref={ref => upload = ref}
        			multiple={false}
        			onChange={onChange}
        			className="hidden" />
				<div className="">
					<div className="upload_icon_wrap upload_modal_item">
						<img src="../../static/assets/img/upload_success.png" className="upload_success_icon upload_modal_item" />
					</div>				
					<h3 className="upload_success_title">Your photo has been uploaded</h3>
				</div>
				<div className="col-sm-6 col-12 text-center form-group upload_button_wrap">
					<BtnMain text="Add a photo from your phone" className="btn-green upload_btn" onClick={onChange} />
				</div>
				<div className="col-sm-6 col-12 text-center form-group">
					<button type="button" className="photos_next_button continue_btn" onClick={gotoEdit}>Continue & finish my profile</button>
				</div>
				<div className="col-sm-6 col-12 text-center form-group matches_wrap">
				<button type="button" className="photos_next_button matches_btn" onClick={gotoMatches}>View my matches now</button>
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

export default connect()(PhotosNext)