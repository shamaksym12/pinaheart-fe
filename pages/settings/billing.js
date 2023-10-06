import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import PrivateLayout from '../../layouts/private'
import SettingsLayout from '../../layouts/settings'
import { toggleModal } from '../../actions/ui'
import { fetchPayment, cancelSubscription, activeSubscription } from '../../actions/payment'
import Head from 'next/head'
import Spinner from "../../components/spinner"

const TableRow = ({ data: { idx, amt, currency, start, end, status } }) => {
	return (
		<tr>
			<th scope="row">{idx}</th>
			<td>{amt}</td>
			<td>{currency}</td>
			<td>{start}</td>
			<td>{end}</td>
			<td>{status}</td>
		</tr>
	)
};

class Billing extends Component {
	componentDidMount() {
		this.props.fetchPayment();
	}

	handleChangeAutoRenew = () => {
		if (!this.props.paymentList.length) {
			return
		}
		if (this.props.active.status === 'active') {
			this.props.toggleModal(true, 'autoRenewal')
		} else {
			this.props.activeSubscription(this.props.active)
		}
	}

	render() {
		const { loading, err, paymentList, active, user } = this.props;
		return (
			<Layout page="settings_billing">
				<PrivateLayout>
					<SettingsLayout page="billing">
						<Head>
							<title>PinaHeart.com</title>
						</Head>
						{
							paymentList.length
							? <h3>Last payment</h3>
							: <h3 className="no_billing">You have no archived payments</h3>
						}
						{ err ? 'Something has gone wrong' : null }
						{
							loading
							? <Spinner />
							: <Fragment>
									{ 
										user.account_status !== 'free' && user.account_status !== 'free_platinum'
										? <div className='mem-toggle'>
												<p>Your membership auto renew is {active.status === 'active' ? 'ON' : 'OFF'}</p>
												<input
													checked={active.status === 'active' ? true : false }
													onChange={this.handleChangeAutoRenew}
													type="checkbox"
													id="switch"/>
												<label htmlFor="switch">Toggle</label>
											</div>
										: null
								 	}
									{
										paymentList.length
										? <div className='payment-list table-responsive'>
												<table className="table table-borderless">
													<thead>
														<tr>
															<th scope="col">#</th>
															<th scope="col">Amount</th>
															<th scope="col">Currency</th>
															<th scope="col">Start</th>
															<th scope="col">End</th>
															<th scope="col">Status</th>
															<th scope="col"> </th>
														</tr>
													</thead>
													<tbody>
													{ paymentList.map((e, i) => <TableRow key={i} id={e.id} data={e} />) }
													</tbody>
												</table>
											</div>
										: null
									}
								</Fragment>
						}
						<style jsx>
							{`
								.mem-toggle {
									display: flex;
									align-items: center;
								}
								
								.mem-toggle p {
									margin: 0 3rem 0 0;
									font-size: 1.8rem;
									font-weight: bold;
									color: black;
								}

								input[type=checkbox] {
									height: 0;
									width: 0;
									visibility: hidden;
								}
								
								label {
									cursor: pointer;
									text-indent: -9999px;
									width: 6rem;
									height: 4rem;
									background: grey;
									display: block;
									border-radius: 100px;
									position: relative;
								}
								
								label:after {
									content: '';
									position: absolute;
									top: 5px;
									left: 5px;
									width: 3rem;
									height: 3rem;
									background: #fff;
									border-radius: 90px;
									transition: 0.3s;
								}
								
								input:checked + label {
									background: #bada55;
								}
								
								input:checked + label:after {
									left: calc(100% - 5px);
									transform: translateX(-100%);
								}
								
								label:active:after {
									width: 130px;
								}
							`}
						</style>
					</SettingsLayout>
				</PrivateLayout>
			</Layout>
		)
	}
}

const mapStateToProps = ({user, payment}) => {
	return {
		loading: payment.loading,
		paymentList: payment.paymentList,
		err: payment.err,
		user: user.data,
		active: payment.active,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchPayment: () => dispatch(fetchPayment()),
		toggleModal: (val, key) => dispatch(toggleModal(val, key)),
		activeSubscription: (active) => dispatch(activeSubscription(active)),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Billing)