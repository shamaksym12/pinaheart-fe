import React, { Component } from 'react'
import Slider from 'react-slick'
import { makeCDN } from '../../utils'

const NextArrow = (props) => {
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

const PrevArrow = (props) => {
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

class MembersCarousel extends Component {
	printItems = (item, i) => {
		return 	<div key={i} className="position-relative">
					<img src={makeCDN(item.avatar)} className="img-responsive" alt="" />
					<div className="member-carousel-name">{item.first_name}, {item.age}</div>
				</div>
	}

	render() {
        const { items } = this.props
		let settings = {
            slidesToShow: 6,
            dots: false,
            dotsClass: 'slick-dots slick-thumb',
            infinite: true,
            arrows: true,
            autoplay: false,
            adaptiveHeight: true,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
            responsive: [
                {
                    breakpoint: 1650, 
                    settings: {slidesToShow: 6}
                }, {
                    breakpoint: 768,
                    settings: {slidesToShow: 4}
                }, {
                    breakpoint: 460,
                    settings: {slidesToShow: 2}
                }
            ]
        };
		return (
			<Slider {...settings}>
                { items.map((item, i) => this.printItems(item, i)) }
            </Slider>
            )
	}
}

export default MembersCarousel