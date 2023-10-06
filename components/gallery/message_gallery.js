import React, { Component } from 'react'
import { connect } from 'react-redux'
import BtnMain from '../buttons/btn_main'

export class MessageGallery extends Component {
    state = {active: []}

    handleClick = item => e => {
        let active = this.state.active
        if (!active.find(i => i.id === item.id)) {
            active = [...active, item]
        } else {
            active = active.filter(i => i.id !== item.id)
        }
        this.setState({active})
    }

	printGallery = (item, i) => {
		return 	<div key={i} className="message-gallery-item" onClick={this.handleClick(item)}>
					<img src={item.src} className="img-responsive pointer" alt="" />
                    {this.state.active.find(i => i.id === item.id) ? <i className="fas fa-check fa-3x"></i> : null}
				</div>
	}

    render() {
    	const { gallery } = this.props
        return (
            <div className="text-right">
                <div className="message-gallery-wrap">
                	{ gallery.map((item, i) => this.printGallery(item, i)) }
                </div>
                <BtnMain
                    bsStyle="success"
                    text="Add photos"
                    onClick={this.props.onClick(this.state.active)} />
            </div>
        );
    }
}

const mapStateToProps = state => ({gallery: state.user.data.gallery})

export default connect(mapStateToProps)(MessageGallery)