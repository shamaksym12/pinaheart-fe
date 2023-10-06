import React, { Component } from 'react'
import { connect } from 'react-redux'
import Slider from 'react-slick'
import { confirmAlert } from 'react-confirm-alert'
import { VIDEO_PRICE } from '../../config'
import { toggleModal } from '../../actions/ui' 
import { buyVideo } from '../../actions/user'
import FullScreenPreview from '../gallery/full_screen_preview'
import { makeCDN } from '../../utils'
import { Router } from '../../routes'

const NextArrow = props => {
  const { className, style, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
        <i className="fas fa-chevron-right" style={{ ...style, 
                                                    position: "absolute", 
                                                    transform: "translateY(-50%)", 
                                                    top: "50%",
                                                    fontSize: "14px",
                                                    color: "initial" }}></i>
    </div>
  );
}

const PrevArrow = props => {
  const { className, style, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
        <i className="fas fa-chevron-left" style={{ ...style, 
                                                    position: "absolute", 
                                                    transform: "translateY(-50%)", 
                                                    top: "50%",
                                                    fontSize: "14px",
                                                    color: "initial",
                                                    right: '0' }}></i>
    </div>
  );
}

class VideoSlider extends Component {

    state = {
            show: false,
            video: ''
        }

    printVideo = (video, i) => {
    	const hiddenClass = (video.private && ! video.purchased && this.props.membership.view_video !== 'Unlimited') ? 'hidden-video' : ''
        return 	<div key={i}>
        			<div key={i} className="video-block-item">
	        			<div className="video-block-inner">
		        			<video className={`video-block-video ${hiddenClass}`} height="200" src={makeCDN(video.src)}></video>
			                <span className="video-item-icon" onClick={this.showVideo(video)}>
			                	<i className="far fa-play-circle fa-3x"></i>
		                	</span>
	                	</div>
	    			</div>
    			</div>
    }

    showVideo = video => e => {
    	const { dispatch, membership, credits, memberId } = this.props
		if (video.private && ! video.purchased && membership.view_video === 'Limited') {
			confirmAlert({
                title: '',
                message: 'You can\'t see this video',
                buttons: [
                    {
                        label: 'Cancel'
                    }, {
                        label: credits < VIDEO_PRICE ? 'Buy Dibs' : 'Use Dibs',
                        onClick: () => {
                            if (credits < VIDEO_PRICE) {
                               	dispatch(toggleModal(true, 'credits'))
                            } else {
                                dispatch(buyVideo(video.id, memberId))
                            }
                        }
                    }, {
                        label: 'Upgrade Membership',
                        onClick: () => {
                            Router.pushRoute('/subscribe')
                        }
                    }
                ]
            })
            return
		}
        this.setState({show: true, video: video.src})
    }

    closeVideo = () => {
        this.setState({show: false, video: ''})
    }

    render() {
    	const { video } = this.props
    	const settings = {
            slidesToShow: 3,
            dots: false,
            infinite: true,
            autoplay: false,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
            ...this.props.settings
        };
        const arrayLength = video.length <= 3 ? 3 - video.length : 0
        const fakeList = Array.apply(null, Array(arrayLength))

        return (
            <div>
                <Slider {...settings}>
                    { video.map((video, i) => this.printVideo(video, i)) }
                    { fakeList.map((item, i) => <div key={i}></div>) }
                </Slider>
                <FullScreenPreview video={this.state.video} show={this.state.show} onClose={this.closeVideo} />
            </div>
        );
    }
}

const mapStateToProps = state =>
	({
		membership: state.user.data.membership,
		credits: state.user.data.credits,
	})

export default connect(mapStateToProps)(VideoSlider)