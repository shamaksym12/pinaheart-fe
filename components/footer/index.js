import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router } from '../../routes'
import { setUiKey, toggleModal } from '../../actions/ui'

class Footer extends Component {

    goTo = link => e => {
    	e.preventDefault()
    	Router.pushRoute(link)
    }

    showSignUp = () => {
        const { dispatch } = this.props
        dispatch(setUiKey('showRegistration', true))
        Router.pushRoute('/')
        window.scrollTo(0,0)
    }

    showLogin = () => {
        const { dispatch } = this.props
        dispatch(toggleModal(true, 'login'))
    }

    render() {
    	const { role, token } = this.props
        return (
            <div className="footer-wrap">
                <div className="container">
                    <div className="fs-12 footer-inner">
                        <a href="/service/aboutus">About Us</a>
                        <a href="/service/contactus">Contact Us</a>
                        <a href="#">Success Stories</a>
                        <a href="/service/term">Terms of Use</a>
                        <a href="/service/privacy">Privacy Statement</a>
                        <a href="#">Cookie Policy</a>
                        <a href="/service/safety">Dating Safety</a>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>
	({
		token: state.user.token,
		role: state.user.data.role,
	})

export default connect(mapStateToProps)(Footer)