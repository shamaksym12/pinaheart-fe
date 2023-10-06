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
			<Layout page="terms of use" user_address={this.state.address}>
				<PrivateLayout>
                    <Head>
                        <title>PinaHeart.com</title>
                    </Head>
                    <div id="term">
                        <div className="form-group title fs-18 bold no_mobile">
                            Terms of Use
                        </div>
                        <div className="fs-14 form-group">
                            By using this website or software, you agree completely with the Terms of Use and other conditions written on this page and other locations on our site. If you don’t completely agree with our conditions then we ask you please do not make use of our services. <br /><br />
                            The Terms of Use set out the relationship between you and Pinaheart (further called the “Company”), independent of how you use our services, be it by phone, email, website, app or computer. We provide the right to change our Terms of Use at any time, without notice. By using our services you commit to regularly consult our Terms of Use and Privacy Statement for latest updates. We do our best to notify you before any changes, but it is your responsibility to check our latest amendments.<br /><br />
                            If you don’t agree, please do not use our services.<br /><br />
                            You understand that we will use your personal information in accordance with our Privacy Statement.<br /><br />
                            If you are under the age of 18 years old, you are not allowed to use our services. You can only use our services for your personal use – commercial use is not permitted. <br /><br />
                            You acknowledge that your use of the Service and the Website is solely at your own risk.<br /><br />
                            You acknowledge that we offer our services in different and, as such, you acknowledge that the information included in your profile will be visible freely to our members and non-members in any country.
                        </div>
                        <div className="section_title">
                            1.	Subscription
                        </div>
                        <div className="fs-14 form-group section_content">
                            By signing in on our servers, you subscribe to membership with the Company. We are no marriage agency nor do we provide marriage agency services. Neither do we provide mail order bride services or a matchmaking services. We help members to find partners by providing information and photos which are made available by other members whereby you agree to our Privacy Statement. <br /><br />
                            Members with the Company agree only to provide genuine information and commit to not give any false information about their present or past. Convicted sex offenders are not allowed to use our services.<br /><br />
                            By signing up, you become a “free member” with no obligations from the Company. Periodically the Company will provide a promo code which gives temporary access to “premium membership” services. Access to these services can be halted or cancelled at any time without any warning or explanation and without any right for compensation towards subscribers of the Company’s services. <br /><br />
                            If you want to upgrade your membership by choosing a membership that is subject to a fee ("Premium Membership") you acknowledge that by pressing the “Buy” button (or similar), you will have confirmed that you want to purchase the Premium Membership that you have selected. Subscriptions can be acquired at the prices, for the periods and by the payment methods specified on the upgrade membership page. Prices are stated in the currency shown on the upgrade membership page and include all applicable taxes unless otherwise stated. Our contractual relationship for that Premium Membership will be confirmed on the date that Pinaheart sends you an e-mail confirmation of your order.<br /><br />
                            The kind of services we provide may evolve over time and not necessarily be preferred by all members. The Company wants to provide the best possible services for a set price and intends to improve how to do that, without commitment to a specific methodology or functionality. <br /><br />
                            Your membership will be automatically renewed. You can opt out of auto-renewal at any time. If you have not opted out, then, the subscription will be auto-renewed for the periods stated. You can cancel auto-renewal at any time on the Billing page of the Settings menu of the website or app.<br /><br />
                            In the event of a recurring billing facility for the payment of subscription fees applicable to the subscription plan you select, you hereby authorize the Company to charge those fees on a recurring basis.<br /><br />
                            We may at any time change our price for a subscription. Auto-renewals of existing subscription will continue at the old price.<br /><br />
                            In case of suspicious payment activity, the Company reserves the right to temporarily or permanently halt payment via your credit card or other electronic payment means.<br /><br />
                            Right to cancel: if you have changed your mind about subscribing for a premium membership, you have the right to cancel your subscription, without reason, within 14 days from the date on which we sent you an email confirmation of your purchase.<br /><br />
                            To exercise your right to cancel, you must notify us using the contact form and clearly indicate in the subject field that you wish to cancel your subscription. Absolutely needed and condition to cancel is that you provide us with your profile name and profile ID, as well as your service password on our site or app. Failing to do so will be considered as a non valid cancellation, as we need proof of your identity and intention.<br /><br />
                            In case of premium membership purchased from Apple via the iOS app or Google via the Android app,  Apple / Google may also provide additional mechanisms for you to cancel your subscription. To cancel your premium membership purchased from Apple via the iOS app or Google via the Android app, please see their instructions for cancelling.<br /><br />
                            If you cancel your subscription within the 14-day cancellation period, we will refund to you all payments that we have received from you for the cancelled premium membership within a matter of days. We will normally provide your refund using the same means of payment that you used for the initial transaction, unless you have expressly agreed otherwise.
                            Amount of refund: if you have started to use the premium membership within the 14day cancellation period, we will be entitled to retain from the refunded payment a reasonable amount (value compensation) to account for that portion of the premium membership that you have already received.
                        </div>
                        <div className="section_title">
                            2.	Identity checks
                        </div>
                        <div className="fs-14 form-group section_content">
                            Security and safety at utmost important to us, therefore we might request in some cases additional info to prove your identity. This happens mainly after abuse reporting from other users or when our automated security systems warn us of suspicious behavior.
                        </div>
                        <div className="section_title">
                            3.	Information
                        </div>
                        <div className="fs-14 form-group section_content">
                            <div className="sub_section_title">
                                a.	Confidentiality
                            </div>
                            <div className="fs-14 form-group sub_section_content">
                                By providing information to the Company, you understand that it can and will be available for any person making use of our services and/or visiting our site.<br /><br />
                                You agree that any material or information provided by you, including personal data, will be treated as non-confidential and non-proprietary and we may use such material or information without restriction, provided such use to the extent it relates to your personal data is compliant with the terms of our Privacy Statement and any applicable laws. Specifically, you consent to the Company using material or information (including any profile information, photographs, video or audio recordings) in order to copy your profile into any other relevant dating site owned and operated by the Company. You acknowledge that any such material or information provided by you will be available for other members or users of the site(s) or app(s) to read and consult.<br /><br />
                                You agree that you will not use any information about third parties (including other members) that you receive through the Service for commercial or advertising purposes. It is not allowed to use technological methods or processes to automatically download or otherwise access information about other members in order to use this information outside our platform. Usage of crawlers is strictly prohibited.
                            </div>
                            <div className="sub_section_title">
                                b.	Accurate and appropriate information
                            </div>
                            <div className="fs-14 form-group sub_section_content">
                                You are responsible for the accuracy of the content that you provide at registration and for all the information you provide about yourself in your profile. By providing us with this information, you agree and confirm that it is truthful and accurate. Intentional and / or fraudulent misrepresentation of your identity, including use of another or fake identity, can also subject you to potential legal liability.<br /><br />
                                You warrant and undertake that the information and media that you supply to the Company are accurate in all respects, not in breach of this agreement and not harmful to any person in any way. You must not transmit or post on our website or platform any images that contain nudity, cartoons, illegal information, hate speech, obscene or harming content, severely manipulated photos or other persons.<br /><br />
                                Posting of links to other websites or apps is not allowed in your profile, as well as any action to show other users how to come in contact with you, other than by our provided services.<br /><br />
                                The Company has the right to delete, manipulate or edit messages or material (including profiles, messages, links, videos and audio recordings) that we, in our sole discretion, deem to breach our Terms of Use or to be otherwise unacceptable.
                            </div>
                            <div className="sub_section_title">
                                c.	Your records, cancellation
                            </div>
                            <div className="fs-14 form-group sub_section_content">
                                You understand that all your data relating to your current membership can be automatically deleted if your profile is inactive for more than twelve months.<br /><br />
                                You can switch off your account at any time in Settings on our (web)site. Premium members can there make their profile invisible to other users while still being able to use our services.<br /><br />
                                You expressly consent to the transfer and storage of your personal data to our members, employees and the third parties, in your country and any other country, in full knowledge and appreciation of the risks that may be associated with such transfers and storage, particularly where such countries do not have the same or a similar level of protection as that in your country of residence. <br /><br />
                                You grant permission to the Company to reproduce, use, copy, perform, display, distribute and exploit the material, information or content and you consent to any and all such uses, including, without limitation, for any promotional or commercial purposes.
                            </div>
                        </div>
                        <div className="section_title">
                            4.	Behavior and responsibility
                        </div>
                        <div className="fs-14 form-group section_content">
                            Intentional and / or fraudulent misrepresentation of your identity, including use of another or fictitious identity, can also subject you to potential legal liability.<br /><br />
                            Information your receive from other members cannot be freely communicated to third parties without explicit consent front the member who’s information you received.<br /><br />
                            The Company cannot be held responsible for keeping important information that you save in your profile or communicate to other members. You should make copies of information important to you and not rely on the Company to keep your records or messages. The Company has the intention to keep all your records intact during the time members are paying for services, though we don’t act as a save heaven or backup center of your data.<br /><br />
                            You are solely responsible for your interaction with other members of the Service.<br /><br />
                            You understand that we have the right (but not the obligation) at our sole discretion to refuse to post, or to remove, any information that you make available on the service; and that we have the right to change, condense or delete such content.<br /><br />
                            The Company strictly forbids using our services to threaten or harass other members, or to infringe any third party rights (including personal rights).<br /><br />
                            The Company strictly forbids to intercept any e-mails / messages or to attempt to intercept them. It is strictly forbidden to offer or promote any goods or services to other members. Any message with the slightest commercial intend are not allowed, as well as use of chain letters or any communication with other intend than using our platform to find a dating partner.<br /><br />
                            The Company does not accept responsibility for any interference or damage to your own computer system which arises in connection with your use of the service, the website or any linked website.<br /><br />
                            we do not make any representations or warranties that the material or information provided through the service or on the (web)site (including any member profile, advise, opinion, statement or other information displayed) is reliable or accurate or that your access to the service or the (web)site will be uninterrupted, speedy or secure. <br /><br />
                            If you reside in the Philippines, or any such jurisdiction that prohibits marriage-matching services to its residents, you hereby warrant, represent and covenant that you will not use our services or the website for any purpose in breach of any legislation prohibiting marriage-matching. You hereby acknowledge and agree that it is your sole responsibility to ensure that you do not breach any prohibition on marriage-matching.<br /><br />
                            If you do not comply with the conduct requirements as mentioned above or if you fail to materially comply with any other of the Terms, we may take the following actions: we may ask you to stop your non-compliant activities (or otherwise send you a warning that your activities do not comply with our conduct requirements); we may delete any content which you have submitted via the Service in breach of any of our conduct requirements; we may suspend the provision of the Service to you (in whole or in part) until the issue is resolved (for example, while we investigate your activities); or (if it is clear to us that you are seriously misusing the Service) we may terminate the provision of the Service to you. If we do decide to terminate your subscription because you have misused the Service, we will refund to you any payment that you have already made to us for any unused portion of the Premium Membership that we have not provided. However, we may still also deduct from this refund or charge you a reasonable amount as compensation for the net costs we will incur as a result of your non-compliance in accordance with this clause.
                        </div>
                        <div className="section_title">
                            5.	Direct marketing
                        </div>
                        <div className="fs-14 form-group section_content">
                            You expressly agree and consent that the Company may use and disclose Personal Data that the Company collects about you for the purpose of direct marketing. You are entitled to revoke your consent, or object to our use of your personal data at any time.
                        </div>
                        <div className="section_title">
                            6.	Endorsement
                        </div>
                        <div className="fs-14 form-group section_content">
                            Links to other (web)sites or platforms you may find on our app or site should not be considered as an endorsement, recommendation or review by the Company of the linked sites or organisations. When you follow a link to another site or app, we urge you to first read the Terms of Use of the linked organisation.
                        </div>
                    </div>

                    <style jsx>{`
                        #term{
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
