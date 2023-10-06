import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserVideo } from '../../actions/user'
import FullScreenPreview from '../gallery/full_screen_preview'

class VideoBlock extends Component {

    state = {
            video: '',
            show: false,
        }

    showVideo = video => e => {
    	this.setState({video, show: true})
    }

    closeVideo = () => {
    	this.setState({show: false})
    }

    printVideo = (video, i) => {
    	const colorClass = video.private ? 'danger' : 'success'
    	const text = video.private ? 'private' : 'public'
        return 	<div key={i} className="video-block-item">
        			<video className="video-block-video" height="200" src={video.video}></video>
		                <span className="video-item-icon" onClick={this.showVideo(video.video)}>
		                	<i className="far fa-play-circle fa-3x"></i>
	                	</span>
		                <span className={`gallery-item-info ${colorClass}`}>{text}</span>
    			</div>
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getUserVideo())
    }

    render() {
    	const { video = [] } = this.props
        return (
            <div className="video-block-wrap">
            	{ video.map((video, i) => this.printVideo(video, i)) }
            	<FullScreenPreview video={this.state.video} show={this.state.show} onClose={this.closeVideo} />
        	</div>
        );
    }
}

const mapStateToProps = state => ({video: state.user.data.video})

export default connect(mapStateToProps)(VideoBlock)