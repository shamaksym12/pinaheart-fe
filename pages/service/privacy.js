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
			<Layout page="privacy statement" user_address={this.state.address}>
				<PrivateLayout>
                    <Head>
                        <title>PinaHeart.com</title>
                    </Head>
                    <div id="privacy">
                        <div className="form-group title fs-18 bold no_mobile">
                            Privacy Statement
                        </div>
                        <div className="fs-14 form-group">
                            We at Pinaheart (further the “Company”), we understand your privacy is important to you. We've developed this privacy Statement to ensure maximum privacy protection. Please note that our site is available worldwide and your profile will be visible in all countries.<br /><br />
                            By providing your personal data you are explicitly consenting to the international transfer and processing of such data in accordance with this Privacy Statement in full and you have informed knowledge of the risks associated with such transfers and processing.<br /><br />
                            The controller of your personal data is Pinaheart. If you have any questions or remarks about how we use your personal data, please contact us.<br /><br />
                            When we say that we process personal data, this means that we collect, store, use, transfer to others or delete such data. The Company collects and processes your personal data when you visit us on our website without being a member, when you contact us, when you install our app(s) or when you subscribe to our membership plans (free or paying) and use our services.<br /><br />
                            Once you have signed up for an account, we will provide you with access to an online database over which you will be able to get know other registered customers (also known as members, subscribers). In order to provide you with the service as described in the Terms of Use, we need to use your personal data. If you do not want us to use your personal data, we will not be able to provide you with the service. You will also need to provide us with sensitive personal data such as information about your gender and sexual orientation. <br /><br />
                            Any material or information provided by you for inclusion in any member profile will be treated as non-confidential and non-proprietary.<br /><br />
                            In the course of using our site, we automatically track certain information such as your IP addresses and email addresses. Many sites collect this sort of information. We may tie your IP address to your personally identifiable information. If you choose to use our messaging system, you should be aware that any personally identifiable information you submit there can be read, collected, or used by other users of the website, and could be used to send you unsolicited messages. We are not responsible for the personally identifiable information you choose to submit in these areas. We reserve the right to terminate the accounts of members who use these services in a manner inconsistent with our Terms of Use.<br /><br />
                            If you send us personal correspondence, such as emails or letters, or if other users or third parties send us correspondence about your activities or postings on the site, we may collect such information into a file which is only accessed by authorized personnel. We may also collect other users' comments about you in our complaints department.<br /><br />
                            We do NOT sell personal data to any third parties for any business purpose.
                        </div>
                        <div className="section_title">
                            Cookies
                        </div>
                        <div className="fs-14 form-group section_content">
                            A cookie is a piece of data stored on the user's computer tied to information about the user. We use session ID cookies. A session ID cookie simply terminates once a user closes the browser. Some of our business partners use cookies on our site (for example, advertisers). However, we have no access to or control over these cookies, once we have given permission for them to set cookies for advertising.<br /><br />
                            You may refuse the use of cookies by selecting the appropriate settings on your browser, however please note that if you do this, you may not be able to use the full functionality of our Website.<br /><br />
                            Our Website uses Google Analytics, a service which transmits website traffic data to Google servers. Google Analytics does not identify individual users or associate your IP address with any other data held by Google. We use reports provided by Google Analytics to help us understand website traffic and web page usage.<br /><br />
                            You can customize or opt out of Google Analytics for Display Advertising using the Ads Settings for your Google account.<br /><br />
                            You may refuse the use of third party data collection by selecting the appropriate settings on your browser or by switching off your profile in ‘Settings’.
                        </div>
                        <div className="section_title">
                            Social media
                        </div>
                        <div className="fs-14 form-group section_content">
                            The Company interacts with social media sites such as Facebook, Twitter, YouTube, Instagram, Pinterest and others. If you choose to "like" or "share" information from our Website through these services, you should review the privacy Statement of the relevant service. If you are a member of a social media site, the interfaces may allow the social media site to connect your visits to this Website with other personal data.
                        </div>
                        <div className="section_title">
                            Control of your Password
                        </div>
                        <div className="fs-14 form-group section_content">
                            You may not disclose your password to any third parties or share it with any third parties. If, despite the foregoing, you lose control of your password, you may lose substantial control over your personally identifiable information and may be subject to legally binding actions taken on your behalf. Therefore, if your password has been compromised for any reason, you should immediately change your password.
                        </div>
                    </div>

                    <style jsx>{`
                        #privacy{
                            padding-top: 20px;
                        }
                        .title {
							background-color: #F9F9F9;
							padding: 15px;
							border-radius: 9px;
                        }
                        .section_title{
                            font-size: 18px;
                            color: black;
                            margin: 25px 0 10px 0;
                            font-weight: 700;
                        }
                        .sub_section_title{
                            font-size: 15px;
                            color: black;
                            margin: 10px 0 10px 0;
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
