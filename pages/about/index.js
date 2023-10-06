import React, { Component } from 'react'
import Layout from '../../layouts'
import { getImage } from '../../utils'

class About extends Component {
	static async getInitialProps({req}) {
		const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
	    return {
	    	userAgent: userAgent,
	    }
  	}
	render() {
		const { userAgent } = this.props
		return (
			<Layout>
				<div className="pt-100" id="about-container">
	                <div className="container">
	                    <div className="bg-white p-15" style={{lineHeight: 2.5}}>
	                        <h1 className="font-bebas">About Company</h1>
	                        <hr />
	                        <img 
	                        	src={getImage('https://d2etktq4v0899q.cloudfront.net/static/assets/img/Lifeinlove+About+Us+page+photo1.jpg', userAgent)} className="img-responsive center-block" alt="" />
	                        <h1 className="text-center title mb-35">
	                        	NO GAMES - JUST LOVE. LIVE YOUR LIFE IN LOVE!
	                        </h1>
	                        <div className="row mb-50 px-65">
	                            <div className="col-sm-6">
	                                Psychologists define Love as “the strong desire for emotional union with another person”. Although it is a common emotion – Love can be confusing and hard to find. At Life In Love, we’re focused on removing the mystery that surrounds Love, and simplifying the sometimes-complicated process of finding Love that Lasts. Our goal is to identify mutually compatible individuals with genuine interests and a strong desire to build a meaningful and lasting bond. If you’re looking for love and/or companionship – you’ve come to the right place!
	                            </div>
	                            <div className="col-sm-6">
	                            	We’ve accomplished a remarkable record of facilitating successful Love Connections. In a saturated market such as ours, we’ve managed to rise above the crowd. A quick search of the internet will provide unending lists of organizations that offer a roster of beautiful, desirable ladies. What’s unique about our business - what sets us apart from the rest - are (1) our strong commitment to providing exceptional service to our clients and (2) our process of ensuring sincere, legitimate connections without compromising integrity.
	                            </div>
	                        </div>
	                        <div className="row mb-50 px-65">
	                        	<div className="col-sm-6 form-group pull-left" style={{marginRight: 15}}>
	                                <img src="https://d2etktq4v0899q.cloudfront.net/static/assets/img/Lifeinlove+About+Us+page+photo2.jpg" className="img-responsive center-block" alt="" />
	                            </div>
	                            <div className="form-group">
	                            	<h1 className="title mb-35" style={{marginTop: 0}}>LIFE IN LOVE</h1>
	                            	<div>
	                            		has been in business for several years. We’ve witnessed the successful union of countless couples. Our clients’ satisfaction stems from the fact that we have an earnest desire to break down barriers –  geographical, cultural or language – and connect individuals across borders. We have programs and procedures in place to assist our clients with making a connection with the person of their dreams.
	                            		<br />
	                            		<br />
	                            		We’ve also developed a comprehensive vetting procedure for all individuals that we accept as clients. Whether you employ our services as a gentleman in search of his soul mate, or a lady seeking her ‘knight’; the process of carefully screening clients to validate each person’s legitimacy, is carefully executed for every applicant. Our organization is reputable, responsible and ethical in our business dealings. We value relationships, respect your time and most of all, we appreciate you as our valued client.
	                            	</div>
	                            </div>
	                        </div>
	                        <div className="row mb-35 px-65">
	                        	<div className="col-xs-12 col-sm-6 col-md-6 pull-right" style={{marginLeft: 15}}>
	                        			<img
	                        				src={getImage('https://d2etktq4v0899q.cloudfront.net/static/assets/img/Lifeinlove+About+Us+page+photo3.jpg', userAgent)}
	                        				alt=""
	                        				style={{width: '80%'}}
	                        				className="img-responsive" />
	                        			<img 
	                        				src={getImage('https://d2etktq4v0899q.cloudfront.net/static/assets/img/Lifeinlove+About+Us+page+photo4.jpg', userAgent)}
	                        				alt=""
	                        				className="img-responsive"
	                        				style={{float: 'right',marginTop: '-40%',position: 'relative', width: '50%'}} />
	                        	</div>
	                        	<div>
	                        		<h1 className="title mb-35">LIFE IN LOVE</h1>
	                        		<div>
	                        			maintains an impressive roster of Ukrainian and Russian women. We’ve often been asked “what’s so special about a Ukrainian or Russian woman?” … The answer? Everything! In addition to their obvious beauty, Ukrainian and Russian women are educated and intelligent. They’re also smart enough to know that family matters.
	                        			<br />
	                        			<br />
	                        			They’re loving mothers, attentive & caring partners and they’re well versed in the domestic, emotional and physical responsibilities of a wife.
	                        			If you’re ready to meet the lady of your dreams; we’re ready to connect you! Take the first step – complete the questionnaire on this site. Need more information? Please review the How it works and Services pages on our site, and feel free to Contact Us if you have further questions.
	                        		</div>
	                        	</div>
	                        	
	                        </div>
		                </div>
		            </div>
	            </div>
			</Layout>
		)
	}
}

export default About