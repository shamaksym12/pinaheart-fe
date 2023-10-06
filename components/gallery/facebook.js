import { connect } from 'react-redux'
import React, { Component, Fragment } from 'react'
import { updateFacebookAlbums, saveFacebookPhotos } from '../../actions/user'
import CheckboxField from '../inputs/checkbox_field'
import cn from 'classnames'
import BtnMain from '../buttons/btn_main'
import { toggleModal } from '../../actions/ui'

class FacebookGallery extends Component {
	state = {
		photos: [],
		selected: [],
		albumId: false,
	}
	save = () => {
		const { albums, dispatch } = this.props
		let temp = []
		albums.list.forEach(album => {
			album.list.forEach(photo => {
				if (this.state.selected.includes(photo.id)) {
					temp.push(photo)
				}
			})
		})
		dispatch(saveFacebookPhotos(temp)).then(success => {
			if (success) {
				dispatch(toggleModal(false, 'facebook'))
			}
		})
	}

	getAlbum = album => () => {
		// console.log(album)
		if (!album.list.length) {
			FB.api(`/${album.id}/photos?fields=source,name,id`, response => {
				const { dispatch } = this.props
				dispatch(updateFacebookAlbums(album.id, {list: response.data}))
				this.setState({photos: response.data, albumId: album.id})
	  		})
		} else {
			this.setState({photos: album.list, albumId: album.id})
		}
	}

	toggleSelected = (val, id) => {
		const { selected } = this.state
		if (val) {
			this.setState({selected: [...selected, id]})
		} else {
			this.setState({selected: selected.filter(item => item !== id)})
		}
	}

	toggleSelectedPhoto = (photo, e) => {
		// binde thit ivent to class name stopPropagation() don't work
		if(e.target.className.indexOf('photo') > 0){
			const { selected } = this.state
			if (!this.state.selected.includes(photo.id)) {
				this.setState({selected: [...selected, photo.id]})
			} else {
				this.setState({selected: selected.filter(item => item !== photo.id)})
		}}
	}

	renderAlbums = album => {
		return	<Fragment>
					<div onClick={this.getAlbum(album)} className={cn('album', {active: album.id === this.state.albumId})}>
					</div>
					<div>{ album.name }</div>
					<style jsx>{`
						.album {
							background-image: url(${album.cover});
							width: 100%;
							padding-top: 100%;
							background-size: cover;
							background-position: center;
							border-radius: 5px;
							cursor: pointer;
						}
						.album.active {
							box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.5);
						}
					`}
					</style>
				</Fragment>
	}

	renderPhotos = photo => {
		return 	<div className="photo" onClick = {e => this.toggleSelectedPhoto(photo, e)}>
					<div className="switch">
						<CheckboxField
	                        id={photo.id}
	                        onChange={val => this.toggleSelected(val, photo.id)}
	                        checked={this.state.selected.includes(photo.id)} />
                    </div>
					<style jsx>{`
						.photo {
							background-image: url(${photo.source});
							width: 100%;
							padding-top: 100%;
							background-size: cover;
							background-position: center;
							border-radius: 5px;
							cursor: pointer;
							position: relative;
						}
						.switch {
							position: absolute;
						    bottom: 15px;
    						right: -1px;
						}
					`}
					</style>
				</div>
	}

	render() {
		const { albums } = this.props
		return 	<div className="row">
					<div className="col-sm-6">
						<div className="title">
							Select album
						</div>
						<div className="row">
							{
								albums.list.map((album, i) =>
								album.cover_photo ?
								 <div key={i} className="col-sm-4 form-group">{this.renderAlbums(album)}</div>
								 : null
								 )
							}
						</div>
					</div>
					<div className="col-sm-6">
						<div className="title">
							Select photo
						</div>
						<div className="row">
							{
								this.state.photos.map((photo, i) => <div key={i} className="col-sm-4 form-group">{this.renderPhotos(photo)}</div>)
							}
						</div>
					</div>
					<div className="text-center col-sm-12">
						<BtnMain text="Save" onClick={this.save} className="btn-green" />
					</div>
					<style jsx>{`
						.title {
							background-color: #F9F9F9;
	                        padding: 15px;
	                        border-radius: 9px;
	                        font-weight: bold;
	                        font-size: 18px;
	                        margin-bottom: 15px;
						}
					`}
					</style>
				</div>
	}
	
}

const mapStateToProps = ({user}) =>
    ({
        albums: user.facebookAlbums,
    })

export default connect(mapStateToProps)(FacebookGallery)