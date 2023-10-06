import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import PrivateLayout from '../../layouts/private'
import ProfileLayout from '../../layouts/profile'
import { getUserFullInfo } from '../../actions/user'
import Gallery from '../../components/block/gallery'
import Head from 'next/head'
import { setUiKey } from '../../actions/ui'
import { removePhoto, makeMainPhoto } from '../../actions/user'

class Edit extends Component {
	state = {
		photos: 0,
		deletePhoto: '',
		photo: 0,
		isMain: 0,
		gallery: [],
		afterDelete: 0
	}

	setGallery = (gallery) => {
		this.setState({gallery: gallery})
	}

	setPhotos = (photos) => {
		this.setState({photos: photos})
	}

	setPhoto = (photo) => {
		this.setState({photo: photo})
	}

	setIsMain = (isMain) => {
		this.setState({isMain: isMain})
	}

	confirmDeletePhoto = () => {
		this.setState({deletePhoto: 'yes'})
		const { dispatch } = this.props
		var id = 0
		if (this.state.photo) id = this.state.photo
		else id = this.state.gallery[0].id
		dispatch(removePhoto(id)).then(res => {
			if (res) {
				// window.location.reload(false);
				this.setState({afterDelete: 1})
				setTimeout(() => {
					this.setState({afterDelete: 0})
				}, 500)
			}
		})
		// dispatch(setUiKey('lastPhoto', null))
	}

	cancelDeletePhoto = () => {
		this.setState({deletePhoto: 'no'})
	}

	setMain = () => {
		const { dispatch } = this.props
		dispatch(makeMainPhoto(this.state.photo))
		dispatch(setUiKey('lastPhoto', null))
	}

	render() {
		const {confirmDeletePhoto, cancelDeletePhoto} = this.props
		return (
			<Layout page="edit_gallery" photos={this.state.photos} isMain={this.state.isMain} confirmDeletePhoto={this.confirmDeletePhoto} cancelDeletePhoto={this.cancelDeletePhoto} setMain={this.setMain}>
				<PrivateLayout>
					<ProfileLayout page="gallery">
						<Head>
							<title>PinaHeart.com</title>
						</Head>
						<Gallery afterDelete={this.state.afterDelete} setGallery={this.setGallery} setPhotos={this.setPhotos} setPhoto={this.setPhoto} setIsMain={this.setIsMain} handleDelete={this.state.deletePhoto} />
					</ProfileLayout>
				</PrivateLayout>
			</Layout>
		)
	}
}

const mapStateToProps = ({user: {data}}) => ({role: data.role})

// export default Edit
export default connect(mapStateToProps)(Edit)