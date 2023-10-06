import React, { Component } from 'react'
import { PAYPAL_EMAIL } from '../../config'
import { getMemberships } from '../../actions/membership'
import { connect } from 'react-redux'
import BtnMain from '../../components/buttons/btn_main'
import { Radio } from 'react-bootstrap'
import { toggleModal, setUiKey, setAlert } from '../../actions/ui'
import * as config from '../../config'

class Subscribe extends Component {
    constructor() {
        super()

        this.paypal_id = new Date() * 1;

        this.state = {
            plan: {
                id: 0,
                name: '',
                amount: 0.00,
                period: 0,
                user_id: 0,
                value_id: 0,
                paypal_id: this.paypal_id
            }
        }        
    }

	componentDidMount() {
        const { dispatch } = this.props
        dispatch(getMemberships())
    }

    login = () => {
        const { dispatch } = this.props
        dispatch(toggleModal(false, 'subscribe'))
        dispatch(setUiKey('redirect', '/subscribe'))
        dispatch(toggleModal(true, 'login'))
    }

    createAttemptPay = (membership) => {
        fetch(config.API_URL + "/client/pay/attempt", {
            method: "post",
            credentials: 'same-origin',
            headers: {
                'Authorization': `Bearer ${this.props.token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                info: `Membership ${membership}`,
                paypal_id: this.paypal_id
            })
        });
    }

    subscribe = activePlan => e => {
        const { userId, testing, dispatch } = this.props
        
        this.createAttemptPay(activePlan.name)

        if (testing) {
            dispatch(setAlert('Not available for test user', 'error'))
            return
        }

        this.setState({
            plan: {
                ...this.state.plan,
                id: activePlan.id,
                name: activePlan.name,
                user_id: userId,
            }
        }, () => {
            this.createSubscription.submit()
        })
    }

    toggleValue = value => e => {
        this.setState({
            plan: {
                ...this.state.plan,
                amount: value.one_payment,
                period: value.month,
                value_id: value.id
            }
        })
    }

    getActivePlan = name => {
    	let temp = {
    		values: []
    	}
    	const activePlan = this.props.membership.find(item => item.name.toLowerCase() === name)
    	if (activePlan) {
    		temp = activePlan
            if (!this.state.plan.value_id) {
                this.setState({plan: {
                    ...this.state.plan,
                    amount: activePlan.values[0].one_payment,
                    period: activePlan.values[0].month,
                    value_id: activePlan.values[0].id,
                }})
            }
    	}
    	return temp
    }

    renderValues = (item, i) => {
    	return 	<tr key={i}>
    				<td className="text-center">
                        <Radio
                            value={item.id}
                            checked={this.state.plan.value_id === item.id}
                            onChange={this.toggleValue(item)} inline>
                            &nbsp;
                        </Radio>
                    </td>
                    <td>{item.month}</td>
    				<td>${item.one_payment}</td>
    				<td>{item.description}</td>
    			</tr>
    }

	render() {
		const { name, token } = this.props
		const activePlan = this.getActivePlan(name)
		return (
			<div>
				<div>
					<table className="table table-bordered credits-table table-striped">
						<thead>
							<tr>
                                <th></th>
								<th>Monthly</th>
								<th>Price</th>
								<th>Save</th>
							</tr>
                    	</thead>
                        <tbody>
                        	{ activePlan.values.map((item, i) => this.renderValues(item, i)) }
						</tbody>
					</table>
                    <div className="text-right">
                        <BtnMain
                            bsStyle="success"
                            text={token ? 'Subscribe' : 'Log In'}
                            onClick={token ? this.subscribe(activePlan) : this.login} /> 
                    </div>
				</div>
				<form ref={ref => this.createSubscription = ref} action="https://www.paypal.com/cgi-bin/websc" method="post" target="_top">
                    <input type="hidden" name="cmd" value="_xclick-subscriptions" />
                    <input type="hidden" name="business" value={ PAYPAL_EMAIL } />
                    <input type="hidden" name="item_name" value={ this.state.plan.name } />
                    <input type="hidden" name="no_note" value="1" />
                    <input type="hidden" name="no_shipping" value="1" />
                    <input type="hidden" name="return" value={ `https://${window.location.host}/redirect/paypal` } />
                    <input type="hidden" name="src" value="1" />
                    <input type="hidden" name="a3" value={ this.state.plan.amount } />
                    <input type="hidden" name="p3" value={ this.state.plan.period } />
                    <input type="hidden" name="t3" value="M" />
                    <input id="customData" type="hidden" name="custom" defaultValue={ JSON.stringify(this.state.plan) } />
                    <input type="hidden" name="currency_code" value={'USD'} />
                </form>
			</div>
		)
	}
}
const mapStateToProps = state =>
	({
	    membership: state.membership.membership,
	    userId: state.user.data.id,
        token: state.user.token,
        testing: state.user.testing,
	})

export default connect(mapStateToProps)(Subscribe)