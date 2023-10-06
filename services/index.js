import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../layouts'
import BtnMain from '../components/buttons/btn_main'
import { toggleModal, setUiKey } from '../actions/ui'
import { getUserInfo } from '../actions/user'
import { Router } from '../routes'
import SubscribeTable from '../components/tables/subscribe'
import SubscribeTabs from '../components/tabs/subscribe'

class Services extends Component {
    state = {
        titleSubscribe: '',
        showFirstText: false,
        showThirdText: false,
        showTextFourth: false,
        showTextFifth: false,
        showTextEigth: false,
        showTextEleventh: false,
        showTextLast: false,
    };

	resolveButtons = type => e => {
		const { dispatch, token } = this.props
		if (token) {
			dispatch(toggleModal(true, type))
		} else {
			dispatch(setUiKey('showRegistration', true))
			Router.pushRoute('/')
			window.scrollTo(0,0)
		}
	}

    showText = key => e => {
        e.preventDefault()
        this.setState({[key]: !this.state[key]})
    }

    getText = (...args) => {
        let [key, len, ...texts] = args.reverse()
        texts = texts.reverse()
        if (!this.state[key]) {
            return <span>{texts[0].slice(0,len)}....<a href="javascript:;" className="color-client" onClick={this.showText(key)}>show more</a></span>
        } else {
            return texts.map((item, i) => <span key={i}>{item}<br /><br /></span>)
        }
    }

    componentDidMount() {
        const { dispatch, token } = this.props
        if (token) {
            dispatch(getUserInfo())
        }
    }

	render() {
        const lineHeight = 1.8
        const textFirst = "As an active member of Life In Love, you can rest assured that we’ll be there to help you through the introductory process. We serve as a liaison between you and your desired mate. Our staff is comprised of residents from the local area, who are knowledgeable about the Ukrainian and Russian cultures. On your own, the culture and language barrier may be an obstacle – but as our client, you can relax in knowing we have a competent staff to guide you in understanding the culture, and our translators will help you communicate effectively with your potential mate."
        const textSecond = "Clients sign up with us at different stages in their search for love. Some need a comprehensive plan with step-by-step directions; while others need assistance with one or two services. Whichever scenario applies to you; know that we’ve created our packages with you in mind. Our Membership Program offers a variety of plans. Depending on the benefits you desire, you may choose the Gold, Platinum or VIP Package. Now that you’re ready to enroll, please review the packages below and choose the plan that’s right for you."
		const textThird = "When you enroll in this service we will translate your emails, letters and/or other communications to/from Russian or Ukrainian, English, German, Spanish, French or Portuguese. We can translate other languages as needed. Please contact us directly for special translation requests."
        const textFourth = "Most packages include the option to share extra photos and video files with your potential mate. We highly recommend you engage is Video Chat as it gives both individuals the opportunity to see the other person’s smile, hear them speak and get a feel for their personality. Photo Sharing also helps both parties get to know their potential mate. Whether via photos or video, seeing the other person is a great way to help you both decide whether there is an attraction. We encourage you to take advantage of these resources."
        const textFifth = "Connect any lady and enjoy the new level of communication with the function of Video Call. It is the unique Service you can use not only to see your lady online in real time, but to hear as well. VideoCall is the best way to break the wall between you and your potential mate. You will have an opportunity to talk just like you are in the same room. You can look into her eyes which, as everyone knows, is a mirror of any soul. This is a great chance to get to know each other for real before you decide to arrange personal meeting."
        const textSixth = "Our Company will make sure you have no language barrier by providing professional interpreter if needed."
        const textSeventh = "Please note that you need to be a Vip Member to use the VideoCall Service."
        const textEigth = "Ukraine is a well-kept secret as a beautiful tourist destination. The country is layered in mountains, such as the Carpathian Mountain which is perfect for skiing, fishing and hunting. The landscape is dotted with beautiful vineyards that yield grapes used to produce our native wines, table grapes, raisins and non-alcoholic grape juice."
        const textNinth = "Your plans to visit Ukraine must include a stop-over in Odessa. Located along the Black Sea, this popular vacation destination is known for its beaches and its shoreline is lined with quaint stores and intimate eateries.There are many other points of interest in Ukraine. Although you can plan the trip on your own, as residents we have the inside track on what to see, where to go, and things to do to ensure you enjoy your visit. When you enroll in this service, Life In Love will help with making all your travel arrangements. From reserving your airline tickets to recommending a safe place to stay, we can organize the entire trip on your behalf."
        const textTen = "Our client’s satisfaction is our #1 priority. We can arrange a first-class trip with luxurious accommodations, fine dining restaurants with celebrity chefs and high-end shopping districts. We also organize trips for clients on a more modest budget. Since our services vary depending on the client’s needs, a fixed package price is not available. Please contact our service center directly and a staff member will provide an accurate package quote, based on the services you desire. If you opt to book the trip on your own, let us know when you’re coming, how long your trip will be, and the cities you plan to visit. The most exciting aspect of your visit will undoubtedly be your face-to-face meeting with your love. You’ve waited a long time for this moment and everything must be perfect. Once you’ve advised us of your potential interest(s), our team will reach out to her to manage the logistics on our side, and we’ll be sure her availability is synced with your travel itinerary. Sign up for this service and we’ll confirm that every detail of your visit is well orchestrated to ensure a successful connection."
        const textEleventh = "As your relationship becomes more serious, you will need to start thinking about preparing legal documents such as immigration papers, your fiancée visa, other legal papers, etc. Many types of documents will need to be translated. We have assisted many couples with compiling the necessary paperwork to present to the authorities and we’re equipped to assist you as well."
        const textTwelve = "If you’re a United States resident, one of the most important things to consider is the International Marriage Broker Regulation Act (IMBRA). IMBRA is a US Federal Statute that requires background checks for all Marriage Visa Sponsors. To be sure you’re legally covered before you travel, confirm any fees associated with IMBRA, and/or for further information, please check the US Citizen & Immigration Services site at USCIS.gov."
        const textLast = "Fact: Ladies love attention and affection. Ukrainian and Russian women are no different. They appreciate receiving flowers and gifts from their lover. Be romantic! Show your potential mate your undivided attention by sending a beautiful bouquet or a considerate gift, with a nice note. Life In Love can help with arranging delivery of your gifts to your mate. We can also have a photo taken of her surprise response when she receives the gift. Contact us for other great ideas of how to surprise your love. Let’s plan her surprise today!"
        return (
			<Layout>
	            <div className="container pt-100">
	            	<div className="bg-white p-15">
	            		<h1 className="font-bebas">Services</h1>
                        <hr />
                        <div className="form-group">
                            <h1 className="text-center title mb-35">
                                At Life In Love, our ultimate goal is to successfully create mutually compatible connections.
                            </h1>
                            <div className="fs-18 color-client mb-35">
                                Approaching an attractive, desirable lady for the first time isn’t always easy.
                                Your heart rate increases while beads of sweat roll down your temple.
                                Although this is a natural response, your nervousness can negatively affect the outcome of your initial interaction.
                                This is even more challenging when you’re attempting to connect with someone from a foreign culture, who speaks a different language.
                            </div>
                            <div className="form-group color-888 mb-50">
                                <div className="hidden-xs hidden-sm hidden-md">
                                    { textFirst }
                                    <br />
                                    <br />
                                    { textSecond }
                                </div>
                                <div className="visible-xs visible-sm visible-md">
                                    { this.getText(textFirst, textSecond, 291, 'showFirstText') }
                                </div>
                            </div>
                            <div className="hidden-xs hidden-sm hidden-md">
                                <SubscribeTable />
                            </div>
                            <div className="visible-xs visible-sm visible-md">
                                <SubscribeTabs />
                            </div>
                            <div className="color-888 mb-35">
                                After trying this Sampler option, many clients decide to enroll in a monthly Membership Plan. If you opt for this route, you may convert to our Gold, Platinum or VIP packages at any time.
                                Don’t forget you’ve got DIBS on all services we offer. Use your DIBS today! With Memership Plan the price of Dib starts from <strong>ONLY $0.52</strong> for each!
                            </div>
                            <div className="hidden-xs hidden-sm hidden-md">
                                <div className="table-responsive">
                                    <table className="table table-bordered credits-table table-striped">
                                        <tbody className="color-888 text-center">
                                            <tr>
                                                <td>10 Dibs/$1.09 per Dib. - $10.99</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>20 Dibs/$0.99 per Dib. - $19.99</td>
                                                <td>1 private photo = 2 Dibs</td>
                                            </tr>
                                            <tr>
                                                <td>50 Dibs/$0.94 per Dib. - $46.99</td>
                                                <td>1 private video = 4 Dibs</td>
                                            </tr>
                                            <tr>
                                                <td>100 Dibs/$0.89 per Dib. - $89.99</td>
                                                <td>1 letter = 5 Dibs</td>
                                            </tr>
                                             <tr>
                                                <td>200 Dibs/$0.84 per Dib. - $169.99</td>
                                                <td>1 minute of Video Call = 2 Dibs<br />(requires VIP Membership)</td>
                                            </tr>
                                             <tr>
                                                <td>500 Dibs/$0.74 per Dib. - $374.99</td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="text-center">
                                    <BtnMain
                                        bsStyle="success"
                                        text="Buy dibs"
                                        onClick={this.resolveButtons('credits')} />
                                </div>
                            </div>
                            <div className="visible-xs visible-sm visible-md">
                                <div className="table-responsive">
                                    <table className="table table-bordered credits-table table-striped">
                                        <tbody className="color-888 text-center">
                                            <tr>
                                                <td><strong>10 Dibs/$1.09 per Dib. - $10.99</strong></td>
                                            </tr>
                                            <tr>
                                                <td><strong>20 Dibs/$0.99 per Dib. - $19.99</strong></td>
                                            </tr>
                                            <tr>
                                                <td><strong>50 Dibs/$0.94 per Dib. - $46.99</strong></td>
                                            </tr>
                                            <tr>
                                                <td><strong>100 Dibs/$0.89 per Dib. - $89.99</strong></td>
                                            </tr>
                                             <tr>
                                                <td><strong>200 Dibs/$0.84 per Dib. - $169.99</strong></td>
                                            </tr>
                                             <tr>
                                                <td><strong>500 Dibs/$0.74 per Dib. - $374.99</strong></td>
                                            </tr>
                                            <tr>
                                                <td>1 private photo = 2 Dibs</td>
                                            </tr>
                                            <tr>
                                                <td>1 private video = 4 Dibs</td>
                                            </tr>
                                            <tr>
                                                <td>1 letter = 5 Dibs</td>
                                            </tr>
                                            <tr>
                                                <td>1 minute of Video Call = 2 Dibs<br />(requires VIP Membership)</td>
                                            </tr>
                                        </tbody>
                                        <BtnMain
                                            bsStyle="success btn-block"
                                            text="Buy dibs"
                                            onClick={this.resolveButtons('credits')} />
                                    </table>
                                </div>
                            </div>
                            <div className="mb-50">
                            </div>
                            <div>
                                <h1 className="visible-xs visible-sm visible-md text-right title">
                                    <div className="color-client">01</div>
                                    TRANSLATION SERVICES
                                </h1>
                                <div className="service-wrap-items">
                                    <div className="service-left-item hidden-xs hidden-sm hidden-md">
                                        <div className="text-right title service-left-title">
                                            <span className="color-client">01</span><br />
                                            TRANSLATION<br />
                                            SERVICES
                                        </div>
                                    </div>
                                    <div className="service-right-item in-services">
                                        <div className="service-inner-text" style={{lineHeight: lineHeight}}>
                                            <div className="hidden-xs hidden-sm hidden-md">
                                                {textThird}
                                            </div>
                                            <div className="visible-xs visible-sm visible-md">
                                                { this.getText(textThird, 64, 'showThirdText') }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h1 className="visible-xs visible-sm visible-md text-right title">
                                    <div className="color-client">02</div>
                                    PHOTO & VIDEO<br />
                                    SHARING
                                </h1>
                                <div className="service-wrap-items">
                                    <div className="service-left-item hidden-xs hidden-sm hidden-md">
                                        <div className="text-right title service-left-title">
                                            <span className="color-client">02</span><br />
                                            PHOTO & VIDEO<br />
                                            SHARING
                                        </div>
                                    </div>
                                    <div className="service-right-item in-services">
                                        <div className="service-inner-text" style={{lineHeight: lineHeight}}>
                                            <div className="hidden-xs hidden-sm hidden-md">
                                                {textFourth}
                                            </div>
                                            <div className="visible-xs visible-sm visible-md">
                                                { this.getText(textFourth, 58, 'showTextFourth') }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h1 className="visible-xs visible-sm visible-md text-right title">
                                    <div className="color-client">03</div>
                                    VIDEO CALLING
                                </h1>
                                <div className="service-wrap-items">
                                    <div className="service-left-item hidden-xs hidden-sm hidden-md">
                                        <div className="text-right title service-left-title">
                                            <span className="color-client">03</span><br />
                                            VIDEO CALLING
                                        </div>
                                    </div>
                                    <div className="service-right-item in-services">
                                        <div className="service-inner-text" style={{lineHeight: lineHeight}}>
                                            <div className="hidden-xs hidden-sm hidden-md">
                                                {textFifth}
                                                <br />
                                                <br />
                                                {textSixth}
                                                <br />
                                                <br />
                                                {textSeventh}
                                            </div>
                                            <div className="visible-xs visible-sm visible-md">
                                                { this.getText(textFifth, textSixth, textSeventh, 57, 'showTextFifth') }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h1 className="visible-xs visible-sm visible-md text-right title">
                                    <div className="color-client">04</div>
                                    FACE-TO-FACE<br />
                                    MEETING
                                </h1>
                                <div className="service-wrap-items">
                                    <div className="service-left-item hidden-xs hidden-sm hidden-md">
                                        <div className="text-right title service-left-title">
                                            <span className="color-client">04</span><br />
                                            FACE-TO-FACE<br />
                                            MEETING
                                        </div>
                                    </div>
                                    <div className="service-right-item in-services">
                                        <div className="service-inner-text" style={{lineHeight: lineHeight}}>
                                            <div className="hidden-xs hidden-sm hidden-md">
                                                {textEigth}
                                                <br />
                                                <br />
                                                {textNinth}
                                                <br />
                                                <br />
                                                {textTen}
                                            </div>
                                            <div className="visible-xs visible-sm visible-md">
                                                { this.getText(textEigth, textNinth, textTen, 60, 'showTextEigth') }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h1 className="visible-xs visible-sm visible-md text-right title">
                                    <div className="color-client">05</div>
                                    DOCUMENT<br />
                                    PREPARATION
                                </h1>
                                <div className="service-wrap-items">
                                    <div className="service-left-item hidden-xs hidden-sm hidden-md">
                                        <div className="text-right title service-left-title">
                                            <span className="color-client">05</span><br />
                                            DOCUMENT<br />
                                            PREPARATION
                                        </div>
                                    </div>
                                    <div className="service-right-item in-services">
                                        <div className="service-inner-text" style={{lineHeight: lineHeight}}>
                                            <div className="hidden-xs hidden-sm hidden-md">
                                                {textEleventh}
                                                <br />
                                                <br />
                                                {textTwelve}
                                            </div>
                                            <div className="visible-xs visible-sm visible-md">
                                                { this.getText(textEleventh, textTwelve, 58, 'showTextEleventh') }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h1 className="visible-xs visible-sm visible-md text-right title">
                                    <div className="color-client">06</div>
                                    GIFT GIVING PROGRAM
                                </h1>
                                <div className="service-wrap-items">
                                    <div className="service-left-item hidden-xs hidden-sm hidden-md">
                                        <div className="text-right title service-left-title">
                                            <span className="color-client">06</span><br />
                                            GIFT GIVING PROGRAM
                                        </div>
                                    </div>
                                    <div className="service-right-item in-services">
                                        <div className="service-inner-text" style={{lineHeight: lineHeight}}>
                                            <div className="hidden-xs hidden-sm hidden-md">
                                                {textLast}
                                            </div>
                                            <div className="visible-xs visible-sm visible-md">
                                                { this.getText(textLast, 55, 'showTextLast') }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h1 className="text-center title mb-35">
                                    Finding love abroad can be challenging – but it’s not impossible.
                                    Life In Love will guide you through the process.
                                    Sign up for our services and let us help you meet the lady of your dreams today!
                                </h1>
                            </div>
                        </div>
                        
                        <div className="color-888 fs-12">
                            Disclosure:<br />
                            * Client agrees to send and/or receive private photos at his own discretion. Life In Love cannot be responsible for communications transmitted without prior knowledge and/or approval from our organization.<br />
                            ** Life In Love respects our clients Right to Privacy. To maintain confidentiality, we encourage you to adhere to all conditions below:
                            <ul>
                                <li>Your potential mate speaks English at the Intermediate, Upper or Advanced Level</li>
                                <li>The lady agrees to share her credentials</li>
                                <li>Client’s Member Profile has been Verified</li>
                                <li>Both parties have accepted the Terms & Conditions</li>
                            </ul>
                        </div>
	                </div>
	            </div>
            </Layout>
        )
	}
};

const mapStateToProps = ({user, ui: {modals}}) => ({token: user.token, subscribe: modals.subscribe});

export default connect(mapStateToProps)(Services)