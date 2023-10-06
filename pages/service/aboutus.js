import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import PrivateLayout from '../../layouts/private'
import Head from 'next/head'

class Edit extends Component {
	componentWillReceiveProps() {
        
	}

	state = {
        
	}
	componentDidMount() {
        
	}

	render() {
		return (
			<Layout page="about us" user_address={this.state.address}>
				<PrivateLayout>
                    <Head>
                        <title>PinaHeart.com</title>
                    </Head>
                    <div id="aboutus">
                        <div className="form-group title fs-18 bold no_mobile">
                            About Us
                        </div>
                        <div className="fs-18 form-group sub_title first_title">Pinaheart is a trusted site for dating and marriage partner searching.</div>
                        <ul className="about_info_ul">
                            <li className="about_info_li">Pinaheart Ltd.</li>
                            <li className="about_info_li">Street address and nr</li>
                            <li className="about_info_li">city zip code</li>
                            <li className="about_info_li">Country</li>
                        </ul>
                        <div className="fs-18 form-group sub_title">To contact us, please use the <a href="/service/contactus">contact form.</a></div>
                        <div className="fs-20 form-group second_title">Why use the Pinaheart dating site?</div>
                        <div className="fs-14 form-group">At Pinaheart we want to give our members the best possible and honest online dating experience. We do that by serving our users a friendly user interface and the best possible search tools.</div>
                        <div className="fs-14 form-group">Security is very important to us. We monitor irregular user behavior and do everything we can to provide you a positive and safe dating journey.</div>
                    </div>

                    <style jsx>{`
                        #aboutus{
                            padding-top: 20px;
                        }
                        .about_info_ul{
                            margin-top: 10px;
                            padding: 0;
                        }
                        .about_info_li{
                            list-style: none;
                        }
						.title {
							background-color: #F9F9F9;
							padding: 15px;
							border-radius: 9px;
                        }
                        .first_title{
                            color: black;
                        }
                        .sub_title{
                            margin-top: 25px;
                        }
                        .second_title{
                            margin-top: 50px;
                            color: black;
                        }
					`}
					</style>
				</PrivateLayout>
			</Layout >
		)
	}
}

const mapStateToProps = ({ user, ui }) => {
	return {
		userObj: user.data,
		account_status: user.data.account_status,
		user: user.params,
		token: user.token,
		options: ui.options.profile_params,
		location_options: ui.options.location_params,
		inValid: ui.inValid,
	}
}

export default connect(mapStateToProps)(Edit)
