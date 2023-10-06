import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { sendSocialData } from '../actions/auth'
import { toggleModal } from '../actions/ui'
import Recommend from './recommend'
import Landing from '../components/Landing'
import { getImage } from '../utils'
import Head from 'next/head'
import { Router } from '../routes'
import Cookies from 'js-cookie'

class Index extends Component {
	static async getInitialProps({query, req}) {
		const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
	    return {
	    	recovery: query.recovery,
	    	userAgent: userAgent,
	    	google: req ? (req.url.indexOf('google') + 1 ? req.url : '') : '',
	    	facebook: req ? (req.url.indexOf('facebook') + 1 ? req.url : '') : '',
	    }
  	}

	componentDidMount() {
		const { dispatch, recovery, google, facebook, token } = this.props
		if (google) {
			dispatch(sendSocialData(google))
			return
		}
		if (facebook) {
			dispatch(sendSocialData(facebook))
			return
		}
		if (Router.router.asPath === '/' && !token && Cookies.get('login')) {
			dispatch(toggleModal(true, 'login'))
		}
	}

	render () {
		const { token, userAgent } = this.props;
		return (
			<div className="App" style={{backgroundImage: `url(${token ? '' : getImage('static/assets/img/bg_pinheart_2.jpg', userAgent)})`}}>
				<Head page="index">
					<title>PinaHeart.com</title>
				</Head>
				{token ? <Recommend page="recommend" /> : <Landing userAgent={userAgent} />}
				<style jsx>{`
					.App {
						position: relative;
					    min-height: 500px; 
					    background-attachment: fixed; 
					    background-position: center;
					    background-repeat: no-repeat;
					    background-size: cover;
					}
				`}
				</style>
			</div>
		)
	}
}

const mapStateToProps = ({user}) => ({
	token: user.token,
})

export default connect(mapStateToProps)(Index)