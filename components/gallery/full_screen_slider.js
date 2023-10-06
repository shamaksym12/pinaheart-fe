import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleModal } from '../../actions/ui'
import BtnMain from '../buttons/btn_main'
import Slider from 'react-slick'
import { confirmAlert } from 'react-confirm-alert'
import { PHOTO_PRICE } from '../../config'
import { buyPhoto } from '../../actions/members'
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
                                                    fontSize: "40px",
                                                    left: '15px',
                                                    color: "#fff" }}></i>
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
                                                    fontSize: "40px",
                                                    color: "#fff",
                                                    right: '15px' }}></i>
    </div>
  );
}

class FullScreenSlider extends Component {
	printItems = (item, i) => {
		return 	<div key={i} className="text-center position-relative" id="backdrop">
					<img src={makeCDN(item.src)} className="img-responsive full-screen-slider-img" style={{transform: `rotate(${item.angle}deg)`}} />
					{
						this.getButton(item)
						? 	<div className="full-screen-slider-button">
								<BtnMain
			                        type="button"
			                        bsStyle="success"
			                        text="Upgrade to review"
			                        onClick = {this.buyPhoto(item)} />
		                    </div>
                        :   null
					}	
				</div>
	}

	buyPhoto = item => e => {
        const { credits, dispatch, memberId } = this.props
		confirmAlert({
            title: '',
            message: 'You can\'t see this photo',
            buttons: [
                {
                    label: 'Cancel'
                }, {
                    label: 'Use Dibs',
                    onClick: () => {
                        if (credits < PHOTO_PRICE) {
                            dispatch(toggleModal(true, 'credits'))
                        } else {
                            dispatch(buyPhoto(item.id, memberId))
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
	}

	getButton = item => {
        const { membership } = this.props
		return (item.private && ! item.purchased && membership && membership.view_photo === 'Limited')
	}

	close = e => {
		e.preventDefault()
		if (e.target.id === 'backdrop') {
			this.props.backDrop()
		}
	}

	render() {
        const { list } = this.props
		const settings = {
            slidesToShow: 1,
            dots: false,
            infinite: true,
            autoplay: false,
            draggable: false,
            adaptiveHeight: false,
            initialSlide: this.props.initialSlide,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        arrows: false,
                    }
                }
            ],
            ...this.props.settings
        };

		return 	<div id="backdrop" className="wrap-full-screen-slider" onClick={this.close}>
					<div className="container slider-container">
						<div className="wrap-full-screen-list">
							<Slider {...settings}>
				                { list.map((item, i) => this.printItems(item, i)) }
				            </Slider>
			            </div>
		            </div>
				</div>
	}
}

const mapStateToProps = state =>
    ({
        token: state.user.token,
        role: state.user.data.role,
        membership: state.user.data.membership,
        credits: state.user.data.credits,
    })

export default connect(mapStateToProps)(FullScreenSlider)