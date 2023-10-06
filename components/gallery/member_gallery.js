import React, { Component } from 'react'
import Slider from 'react-slick'
import { makeCDN } from '../../utils'

const NextArrow = props => {
    const { className, style, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <i  
                className="fas fa-chevron-right" 
                style={{ ...style, 
                        position: "absolute", 
                        transform: "translateY(-50%)", 
                        top: "50%",
                        fontSize: "14px",
                        color: "initial" }}>
            </i>
        </div>
    )
}

const PrevArrow = props => {
    const { className, style, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <i 
                className="fas fa-chevron-left" 
                style={{ ...style, 
                    position: "absolute", 
                    transform: "translateY(-50%)", 
                    top: "50%",
                    fontSize: "14px",
                    color: "initial",
                    right: '0' }}>
            </i>
        </div>
    )
}

const SliderItem = props => {
    const { item, onClick, i } = props
    return  <div
                onClick={onClick(i)}
                className="pointer"
                style={{
                        backgroundImage: `url(${makeCDN(item.src)})`,
                        transform: `rotate(${item.angle}deg)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: 100
                    }}>
            </div>
}

class MemberGallery extends Component {
    printItems = (item, i) =>  <SliderItem key={i} {...this.props} item={item} i={i} />

    render() {
        const arrayLength = this.props.list.length <= 3 ? 3 - this.props.list.length : 0
        const fakeList = Array.apply(null, Array(arrayLength))
        const settings = {
            slidesToShow: 3,
            dots: false,
            infinite: true,
            autoplay: false,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
            ...this.props.settings
        };
        return (
        	<div className="member-gallery">
	            <Slider {...settings}>
	                { this.props.list.map((item, i) => this.printItems(item, i))}
                    { fakeList.map((item, i) => <div key={i}></div>) }
	            </Slider>
			</div>
        );
    }
}

export default MemberGallery