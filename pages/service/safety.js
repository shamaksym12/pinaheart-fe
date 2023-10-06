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
			<Layout page="dating safety" user_address={this.state.address}>
				<PrivateLayout>
                    <Head>
                        <title>PinaHeart.com</title>
                    </Head>
                    <div id="safety">
                        <div className="form-group title fs-18 bold no_mobile">
                            Dating Safety
                        </div>
                        <div className="fs-14 form-group">
                            Online dating can and should be very safe.  As in offline ‘real’ life, people should take the same precautions when interacting with others.<br /><br />
                            Pinaheart is working hard every day to provide you a safe and fun experience. Our staff is constantly monitoring suspicious behavior and we encourage you to report abusing or offending members you would encounter by choosing the “report abuse” button you find on all members profiles.
                        </div>
                        <div className="section_title">
                            Communication means
                        </div>
                        <div className="fs-14 form-group section_content">
                            Always be careful when users ask you in your first chat to start communicating off platform. This is often done by people with bad intentions and a way to get your private communication information. Once away from our platform we have no way to monitor their behavior.
                        </div>
                        <div className="section_title">
                            Tips
                        </div>
                        <div className="fs-14 form-group section_content">
                            Our site allows you to remain anonymous to other users until you feel ready to provide contact information to your chat partner(s). Follow your intuition.<br /><br />
                            It is not allowed and you should never include your personal contact information in your profile, especially telephone numbers, email, Facebook name, home address or even your last name.<br /><br />
                            We recommend setting up an email address which you will only use for online dating. This keeps a firewall between your private life and people you are getting to know.<br /><br />
                            Never share your password with others and make sure they are not easy to guess. Choose a unique password for online dating that you use nowhere else.<br /><br />
                            Be careful when a user claims to be from the U.S. but is currently living, working or traveling abroad.<br /><br />
                            Don’t believe stories when somebody claims he or she is experiencing an emergency situation (abroad) that requires your assistance, especially to send money with promise to send it back to you.<br /><br />
                            Don’t fall into stories how to make easy money.<br /><br />
                            Use your best judgement when a user asks inappropriate questions or urges you to compromise your principles.
                            Don’t believe somebody will fall in love with you soon after your first conversation. Be patient, let interest grow, don’t let others push you.<br /><br />
                            Be very careful when sent links to other sites, you could become the victim on phishing, and people may try to obtain personal or financial information from you.<br /><br />
                            Never follow a link to a competing site but report to Pinaheart immediately.<br /><br />
                            Never send money to someone you haven’t met yet in real life. Though the majority of users are genuine and we work hard every day to delete profiles of users with wrong intentions, some people are trying to live from goodwill from others.
                        </div>
                        <div className="section_title">
                            Before meeting someone
                        </div>
                        <div className="fs-14 form-group section_content">
                            Try to find out as much information as possible about the person you are going to meet. Ask additional photos, check if the background of the photos correspond with the stories you have been told, and in doubt if somebody’s photos are real, ask to hold hands for example in a certain way that you can see if this person is who he/she is telling.<br /><br />
                            Getting information from social media like Facebook can provide a wealth of information: is it a longtime established account, is there normal interaction with friends and family, are there additional photos showing your future partner. You can also check what kind of people are reacting on his/her posts. Use common sense.
                        </div>
                        <div className="section_title">
                            Your first meeting
                        </div>
                        <div className="fs-14 form-group section_content">
                            Always meet the first time in a public place. If the situation is not what you expected, at least you didn’t have to reveal your location and you can go away safely.<br /><br />
                            If your date pressures you to meet at their house or at an isolated place, please cancel the date.<br /><br />
                            Tell at least one friend of family member about who you’re going to meet and where. Don’t let them pick you up at your home but meet directly in a safe public place. Let someone call you at a certain time to hear if you’re ok.
                            Don’t exaggerate alcohol consumption. Always keep an eye on your drinks so nobody can fool with it. And don’t lose your purse out of sight.
                        </div>
                        <div className="section_title">
                            Next steps
                        </div>
                        <div className="fs-14 form-group section_content">
                            Take your time to know your partner. Meet your partner’s friends and family, don’t judge too fast unless you feel danger or inappropriate behavior.<br /><br />
                            Be aware that other cultures far away can be very different and are not better or worse. Respect another view, other habits and take your time to see if you can live with a different mentality.<br /><br />
                            It’s a funny saying, but in many countries, marrying someone means like you “marry” the family.
                        </div>
                    </div>

                    <style jsx>{`
                        #safety{
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
