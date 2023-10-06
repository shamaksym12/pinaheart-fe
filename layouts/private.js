import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserInfo } from '../actions/user'
import Photos from '../components/gallery/photos'
import PhotosNext from '../components/gallery/photos_next'
import PhotosNextNext from '../components/gallery/photos_next_next'
import FacebookGallery from '../components/gallery/facebook'
import MainModal from '../components/modal'
import {Router} from '../routes/index'
import AccountRenewalModal from '../components/forms/account-renewal-modal';

class Private extends Component {
	state = {
		uploading: 0
	}
	
	componentDidMount() {
		const { dispatch, id, token } = this.props 
		if(!token){
			Router.pushRoute('/')
		}
		if(!id){
			dispatch(getUserInfo())
	   }
	}

	setUploading = () => {
		this.setState({uploading: 1}, function () {
			console.log(this.state.uploading)
		})
	}

	render() {
		const { children, avatar, avatar_next, avatar_next_next, active, facebook, isOff, token } = this.props

		return (
			<div className="position-relative">
				<div className="container" id="profile">
					{ children }
				</div>
				<MainModal
					body={<AccountRenewalModal />} 
					title="Your account is turned off"
					show={isOff}
					size="lg"
					keyModal="isOff"
					closeIcon={false} 
				/>

				<MainModal
					body={<Photos uploading={this.state.uploading} setUploading={this.setUploading} />}
					title="Add a photo"
					className="upload_modal"
					show={((isOff !== undefined) && !isOff && avatar && token)}
					size="lg"
					keyModal="avatar"                   
				/>

				<MainModal
					body={<PhotosNext />}
					title="Add a photo"
					className="upload_modal"
					show={((isOff !== undefined) && !isOff && avatar_next && token)}
					size="lg"
					keyModal="avatar_next"                   
				/>

				<MainModal
					body={<PhotosNextNext />}
					title="Add a photo"
					className="upload_modal"
					show={((isOff !== undefined) && !isOff && avatar_next_next && token)}
					size="lg"
					keyModal="avatar_next"                   
				/>
				
				<MainModal
					body={<FacebookGallery />}
					title="Facebook photo"
					show={facebook}
					size="lg"
					keyModal="facebook" />
			</div>
		);
	}
}

const mapStateToProps = ({user, ui}) => ({
	token: user.token,
	avatar: ui.modals.avatar,
	avatar_next: ui.modals.avatar_next,
	avatar_next_next: ui.modals.avatar_next_next,
	facebook: ui.modals.facebook,
	active: user.data.active,
	id: user.data.id,
	isOff: user.data.is_off,
})

export default connect(mapStateToProps)(Private)
