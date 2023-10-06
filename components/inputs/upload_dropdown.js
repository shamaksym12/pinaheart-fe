import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addAttachMessage, clearAttachMessage, addAttachDraft, clearAttachDraft } from '../../actions/message'
import { getUserGallery } from '../../actions/user'
import { toggleModal } from '../../actions/ui'
import MainModal from '../modal'
import MessageGallery from '../gallery/message_gallery'

export class UploadDropdown extends Component {
	constructor(props) {
        super(props);
        this.state = {active: false}
    }

    createName = attach => attach.name ? attach.name : `photo ${attach.id}`

	showMenu = e => {
		e.preventDefault()
		this.setState({active: ! this.state.active})
	}

	showGallery = () => {
		const { dispatch } = this.props
		dispatch(getUserGallery())
        dispatch(toggleModal(true, 'gallery'))
	}

	upload = () => {
		this.uploadField.click()
	}

	onChange = ({target: {files}}) => {
		if (files) {
			const { dispatch, type = false } = this.props
			dispatch(addAttachMessage(files))
			this.setState({active: ! this.state.active})
            if (type === 'draft') {
                for (let file of files) {
                    const reader = new FileReader()
                        reader.readAsDataURL(file)
                        reader.onload = () => {
                            dispatch(addAttachDraft([reader.result]))
                    }
                }
            }
		}
	}

	chooseFromGallery = item => e => {
		const { dispatch, type = false } = this.props
		dispatch(addAttachMessage(item))
        if (type === 'draft') {
            dispatch(addAttachDraft(item))
        }
		dispatch(toggleModal(false, 'gallery'))
		this.setState({active: ! this.state.active})
	}

    clearAttach = i => e => {
        e.stopPropagation()
        const { dispatch, type = false } = this.props
        dispatch(clearAttachMessage(i))
        if (type === 'draft') {
            dispatch(clearAttachDraft(i))
        }
    }

    render() {
    	const { attach, gallery } = this.props
        return (
            <div className="dropdown-wrap">
                <span>
                	<a className="font-bebas" href="javascript:;" onClick={this.showMenu}>Add photo</a>
                	<ul className={`dropdown-menu-list ${this.state.active ? 'active' : ''}`}>
                        <li onClick={this.showGallery} className="dropdown-item font-bebas">Choose from gallery</li>
                        <li onClick={this.upload} className="dropdown-item font-bebas">Upload photo</li>
                    </ul>
                    <input type="file" ref={ref => this.uploadField = ref} multiple onChange={this.onChange} className="hidden" />
            	</span>
                <br />
                {   
                    attach.length
                    ?  attach.map((item, i) => {
	                        return  <span key={i} style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
	                                    <span className="dropdown-file-name">{this.createName(item)}</span>
	                                    <i onClick={this.clearAttach(i)} className="fas fa-times text-danger pointer"></i>
	                                </span>
                    	})
                    : 	null
                }
                <MainModal
                    body={<MessageGallery onClick={this.chooseFromGallery} />}
                    title="Gallery"
                    show={gallery}
                    size="lg"
                    keyModal="gallery" />
            </div>
        )
    }
}

const mapStateToProps = state =>
	({
	    attach: state.message.attach,
	    gallery: state.ui.modals.gallery,
	})

export default connect(mapStateToProps)(UploadDropdown)