import React, { Component } from 'react'
import Layout from '../../layouts/stories'
import { connect } from 'react-redux'
import Questions from './questions'
import { setUiKey } from '../../actions/ui'
import BtnMain from '../../components/buttons/btn_main'
import { Router } from '../../routes'
import MemberCarouselSmall from '../../components/block/member_carousel_small'

class Faq extends Component {
    goToRegistration = () => {
        const { dispatch } = this.props
        dispatch(setUiKey('showRegistration', true))
        Router.pushRoute('/')
        window.scrollTo(0,0)
    }

	render() {
        const { token, country } = this.props
		return (
			<Layout>
				<div className="row">
            		<div className="col-sm-9">
						<h1 className="font-bebas">FAQ</h1>
			            <hr />
                        <Questions />
		            </div>
		            <div className="col-sm-3">
                        <div className="form-group">
                            <img src="https://d2etktq4v0899q.cloudfront.net/static/assets/img/banner.jpg" className="img-responsive" alt="" />
                        </div>
                        {
                            !token &&   <div className="text-center form-group">
                                            <BtnMain
                                                text="Sign Up"
                                                onClick={this.goToRegistration} />
                                        </div>
                        }
                        <hr />
                        { country === 'UA' && !token ? null : <MemberCarouselSmall /> }
                	</div>
            	</div>
            </Layout>
		)
	}
}

const mapStateToProps = ({signup, user}) =>
    ({
        country: signup.country,
        token: user.token,
    })

export default connect(mapStateToProps)(Faq)