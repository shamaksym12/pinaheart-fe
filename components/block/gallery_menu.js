import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removePhotos, toggleActive, makePrivate, rotateImgGallery } from '../../actions/user'
import { setAlert } from '../../actions/ui'
import { confirmAlert } from 'react-confirm-alert'
import { makeCDN } from '../../utils'

class GalleryItem extends Component {
	remove = id => e => {
		e.stopPropagation()
    	const { dispatch } = this.props
    	confirmAlert({
            title: '',
            message: 'Are you sure to remove this photo?',
            buttons: [
                {
                    label: 'Cancel'
                }, {
                    label: 'Confirm',
                    onClick: () => dispatch(removePhotos({'images': [id]}))
                }
            ]
        })
	}

	toggleActive = item => e => {
		e.stopPropagation()
    	const { dispatch, role, checkActive, onClose } = this.props

    	if (role === 'client') {
    		const url = item.active ? 'hide' : 'show'
    		if ((checkActive() && url === 'show') || url === 'hide') {
    			dispatch(toggleActive({'images': [item.id]}, url)).then(res => {
    				onClose()
    			})
    		} else {
    			dispatch(setAlert('You can\'t make more active photos', 'error'))
    		}
    	} else {
    		const url = item.private ? 'public' : 'private'
            if (!item.private) {
                this.makeBlur(item)
                return
            }
    		dispatch(toggleActive({'images': [item.id]}, url)).then(res => {
    			onClose()
    		})
    	}
	}

	makeBlur = item => {
        const { dispatch, onClose } = this.props
        const image = new Image()
        image.src = `${item.src}?${new Date().getTime()}`
        image.setAttribute('crossOrigin', '')
        
        const canvas = document.createElement(`canvas`)
        const ctx = canvas.getContext("2d")
        image.onload = () => {
            canvas.width = image.width
            canvas.height = image.height
            ctx.filter = 'blur(15px)'
            ctx.drawImage(image, 0, 0)
            const url = canvas.toDataURL()
            dispatch(makePrivate({id: item.id, base64: url})).then(res => {
                if (res) {
                    onClose()
                }
            })
        }
    }

	rotate = (item, angle) => e => {
		e.stopPropagation()
		const { dispatch, item } = this.props
		dispatch(rotateImgGallery(item.id, item.angle + angle))
	}

    render() {
    	const { active, onClose, role, item, showGallery, showMenu } = this.props

    	const textMenu = role === 'client' ? (!item.active ? 'active' : 'unactive') : (!item.private ? 'private' : 'public')
    	const text = role === 'client' ? (item.active ? 'active' : 'unactive') : (item.private ? 'private' : 'public')
    	const colorClass = role === 'client' ? (item.active ? 'success' : 'danger') : (item.private ? 'danger' : 'success')

        return (
        	<div className="wrap-gallery-item" onClick={showGallery}>
	            <img src={makeCDN(item.src)} className="gallery-item-img" alt="" style={{transform: `rotate(${item.angle}deg)`}} />
                <span className="gallery-item-icon" onClick={showMenu}>
                    <i className="fas fa-pen-square fa-2x"></i>
                </span>
                <ul className={`gallery-item-menu ${active ? `active` : ``}`}>
	                <span onClick={onClose} className="gallery-item-close pointer"><i className="fas fa-times"></i></span>
	                <li onClick={this.remove(item.id)} className="gallery-item-menu-item font-bebas">Remove Photo</li>
	                <li onClick={this.toggleActive(item)} className="gallery-item-menu-item font-bebas">Make {textMenu}</li>
	                <li className="gallery-item-menu-item font-bebas">
	                    <i className="fas fa-chevron-left pointer pull-left" onClick={this.rotate(item, -90)}></i>
	                    Rotate
	                    <i className="fas fa-chevron-right pointer pull-right" onClick={this.rotate(item, 90)}></i>
	                </li>
	            </ul>
	            <span className={`gallery-item-info ${colorClass}`}>{text}</span>
	        </div>
            
        );
    }
}

const mapStateToProps = state => ({role: state.user.data.role})

export default connect(mapStateToProps)(GalleryItem)