import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, FormGroup } from 'react-bootstrap'
import Layout from '../../layouts/stories'
import BtnMain from '../../components/buttons/btn_main'
import { toggleModal, setUiKey } from '../../actions/ui'
import MainModal from '../../components/modal'
import { Router } from '../../routes'
import MemberCarouselSmall from '../../components/block/member_carousel_small'

class Testimonials extends Component {

	goToRegistration = () => {
        const { dispatch } = this.props
        dispatch(setUiKey('showRegistration', true))
        Router.pushRoute('/')
        window.scrollTo(0,0)
    }

	printTestimonials = (item, i) => {
		return 	<div key={i} className="testimonials-item-wrap">
                    <div className="row">
	                    <div className="col-sm-4 text-center">
	                        <img src={item.img} className="img-responsive" alt="" />
	                    </div>
	                    <div className="col-sm-8">
	                        <div className="testimonials-item-text">{item.text}</div>
	                        <div className="row">
	                            <div className="col-sm-6">
	                                <div className="testimonials-item-name">{item.name}</div>
	                            </div>
	                            <div className="col-sm-6 text-center">
	                                <div className="testimonials-item-name">
	                                    <BtnMain
	                                        bsStyle="success"
	                                        text="Review"
	                                        onClick={this.onClick(item)} />
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                </div>
                </div>
	}

	onClick = item => () => {
		const { dispatch } = this.props
		this.testimonialImg = item.text_img
		dispatch(toggleModal(true, 'testimonials'))
	}

	render() {
		const { testimonials, testimonialsModal, country, token } = this.props
		return (
			<Layout>
				<Row>
            		<Col sm={9}>
						<h1 className="font-bebas">Testimonials</h1>
		                <p className="text-justify">Dear Members, we are pleased to present you our clients' testimonials. Here you can read experience and appreciation of those who have found their beloved with our help. As well as opinions and suggestions from those who are still in the search of their soulmate.</p>
		                <hr />
		            	<div>
		                   { testimonials.map((item, i) => this.printTestimonials(item, i)) }
		                </div>
		                <MainModal
		                    body={<div><img src={this.testimonialImg} className="img-responsive" alt="" /></div>}
		                    title="Testimonials"
		                    show={testimonialsModal}
		                    keyModal="testimonials" />
                    </Col>
                    <Col sm={3}>
		                <FormGroup className="text-center">
                            <img className="img-responsive" src="https://d2etktq4v0899q.cloudfront.net/static/assets/img/banner.jpg" alt="" />
                        </FormGroup>
                        <FormGroup className="text-center">
                            <BtnMain
                                bsStyle="success"
                                text="Sign Up"
                                onClick={this.goToRegistration} />
                        </FormGroup>
                        <hr />
                        { country === 'UA' && !token ? null : <MemberCarouselSmall /> }		
                	</Col>
                </Row>
        	</Layout>
		)
	}
}

const mapStateToProps = ({ui, signup, user}) =>
    ({
        testimonials: ui.testimonials,
        testimonialsModal: ui.modals.testimonials,
        country: signup.country,
        token: user.token,
    })

export default connect(mapStateToProps)(Testimonials)