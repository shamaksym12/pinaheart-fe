import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup } from 'react-bootstrap'
import { toggleModal, setActiveTab, setAlert } from '../../actions/ui'
import { setSendingMessage, setBuyingAttach, buyMessage, buyAttach } from '../../actions/message'
import { confirmAlert } from 'react-confirm-alert'
import { Router } from '../../routes'
import * as config from '../../config'

class Credits extends Component {
	
	constructor() {
		super();
		this.paypal_id = new Date() * 1;
	}

	setPackage = item => e => {
		const { dispatch, membership } = this.props
		const data = {
            id: item.id,
            price: (item.price - (item.price / 100 * membership.discount)).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
            credits: item.credits,
        }
		dispatch(setPackage(data))
	}

	printPackages = (item, i) => {
		const rounded = (item.price / item.credits).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
		const { discount } = this.props.membership
		const { activePackage } = this.props

		return 	<div key={i} id={item.id} className={`wrapPackage ${activePackage.id === item.id ? 'active' : ''}`} onClick={this.setPackage(item)}>
	                <strong className="font-bebas">
	                	{item.credits} dibs / ${rounded} per dib - ${item.price} 
	                	{ discount ? <span> (-{discount}%)</span> : null }
	                </strong>
	            </div>
	}

	goToSubscribe = e => {
		e.preventDefault()
		const { dispatch } = this.props
		dispatch(toggleModal(false, 'credits'))
		Router.pushRoute('/subscribe')
	}

	createAttemptPay = () => {
        fetch(config.API_URL + "/client/pay/attempt", {
            method: "post",
            credentials: 'same-origin',
            headers: {
                'Authorization': `Bearer ${this.props.token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                info: `Dibs ${this.props.activePackage.price}`,
                paypal_id: this.paypal_id
            })
        });
    }

	checkOut = () => {
		window.paypal.Button.render({
            env: 'production', // sandbox | production
            commit: true,
            style: {
                label: 'paypal',
                size:  'large',    // small | medium | large | responsive
                shape: 'rect',     // pill | rect
                color: 'blue',     // gold | blue | silver | black
                tagline: false    
            },
            client: {
                sandbox:    'AfDGqe6kXnSsTM9gDI2OZdUXxrydoxVCG7CZbp76Nr-NdDvHjyKs7W52X7n8s8_i4k6cQqwF7gor72f_',
                production: 'AUjZF0corGMnwDfnp4_EGJkFESZn6u96_wnxqVL2XNQ_RCkqnHjLJaNRKSB9j4Ypn4LniWukXuSJ_bF7'
            },
            payment: (data, actions) => {
				this.createAttemptPay();
                return actions.payment.create({
                    payment: {
                        transactions: [
                            { amount: { total: this.props.activePackage.price, currency: 'USD' } }
                        ]
                    }
                });
            },
            onAuthorize: (data, actions) => {
                return actions.payment.execute().then(() => {
                	const { dispatch, activePackage, credits, sendingMessage, buyingAttach } = this.props

                    const mas = {
                        paypal_id: data.paymentID,
						package_id: activePackage.id,
						attempt: this.paypal_id
                    }
                    
                    dispatch(buyPackage(mas)).then(res => {
	                    if (res) {
	                    	if (Object.keys(sendingMessage).length) {
	                    		const totalCredits = credits + activePackage.credits
	                    		if (totalCredits >= sendingMessage.letterPrice) {
	                    			dispatch(buyMessage(sendingMessage)).then(res => {
	                    				if (res) {
	                    					dispatch(setSendingMessage({}))
	                    					dispatch(setActiveTab('outgoing', 'mail'))
	                    					dispatch(toggleModal(false, 'credits'))
	                    					Router.pushRoute('/mail/outgoing')
	                    				}
	                    			})
	                    		} else {
	                    			confirmAlert({
	                                    title: '',
	                                    message: 'You do not have enough dibs to send message. Click Buy Dibs to chose the package.',
	                                    buttons: [
	                                        {
	                                            label: 'Cancel',
	                                            onClick: () => {
	                                                dispatch(setSendingMessage({}))
	                                            }
	                                        }, {
	                                            label: 'Buy Dibs',
	                                            onClick: () => {
	                                                dispatch(toggleModal(true, 'credits'))
	                                            }
	                                        }
	                                    ]
	                                })
	                    		}
	                    	}

	                    	if (Object.keys(buyingAttach).length) {
	                    		dispatch(buyAttach(buyingAttach))
	                    		dispatch(setBuyingAttach({}))
	                    	}
	                    	dispatch(toggleModal(false, 'credits'))
	                    }
                    })
                })
            }
        }, '#paypal-button');
	}

	renderPayPal = () => {
		if (!window.paypal) {
			const script = document.createElement('script')
	        script.src = 'https://www.paypalobjects.com/api/checkout.js'

	        script.onload = () => {
        		this.checkOut()
	        }
	        document.body.appendChild(script)
		} else {
			this.checkOut()
		}
    }

    checkTesting = () => {
        const { dispatch, testing } = this.props
        if (testing) {
            dispatch(setAlert('Not Available for test user', 'error'))
        }
    }

    componentWillUnmount() {
    	const { dispatch } = this.props
    	dispatch(setPackage({id: 0}))
    }

	componentDidMount() {
   		this.renderPayPal()
   		const { dispatch } = this.props
		dispatch(getPackages())
    }

    render() {
    	const { packages, activePackage, testing } = this.props
        return (
            <div>
                <FormGroup>
                    { packages.map((item, i) => this.printPackages(item, i))}
                </FormGroup>
                {
                	testing
                	? 	<div className={`${!activePackage.id ? ' hidden' : ''} testing-class`} onClick={this.checkTesting}>
                            <div>Not Available for test user</div>
                        </div>
                	: 	null
                }
                <div className={`text-center form-group ${!activePackage.id ? ' hidden' : ''}`} id="paypal-button"></div>
                <div className="text-center">
                	<strong>
                		<a href="/subscribe" className="font-bebas fs-16 main-hover" onClick={this.goToSubscribe}>Upgrade Membership</a>
            		</strong>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>
	({
	    packages: state.membership.packages,
	    activePackage: state.membership.activePackage,
	    membership: state.user.data.membership,
	    credits: state.user.data.credits,
	    sendingMessage: state.message.sendingMessage,
		buyingAttach: state.message.buyingAttach,
		testing: state.user.testing,
		token: state.user.token
	})

export default connect(mapStateToProps)(Credits)