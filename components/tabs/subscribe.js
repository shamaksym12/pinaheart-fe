import React, { Component } from 'react'
import { connect } from 'react-redux'
import BtnMain from '../../components/buttons/btn_main'
import { toggleModal, setUiKey } from '../../actions/ui'
import MainModal from '../../components/modal'
import Subscribe from '../../components/forms/subscribe'

const Gold = props => {
	return <tbody className="color-888">
            	<tr>
            		<td>
            			<strong>Free Dibs</strong>
            			<div>10 dibs per month</div>
        			</td>
    			</tr>
            	<tr>
            		<td>
            			<strong>Video Call</strong>
            			<div>-</div>
        			</td>
        		</tr>
                <tr>
                	<td>
                    	<strong>Expression of Interest</strong>
                    	<div>+</div>
                	</td>
            	</tr>
            	<tr>
                	<td>
                    	<strong>Send Letter -1st Letter FREE</strong>
                    	<div>+</div>
                	</td>
            	</tr>
            	<tr>
                	<td>
                    	<strong>% Discount on ALL dib Packages</strong>
                    	<div>10% Discount</div>
                	</td>
            	</tr>
            	<tr>
                	<td>
                    	<strong>View Photos in Profiles</strong>
                    	<div>-</div>
                	</td>
            	</tr>
            	<tr>
                	<td>
                    	<strong>View Videos in Profiles</strong>
                    	<div>-</div>
                	</td>
            	</tr>
            	<tr>
                	<td>
                    	<strong>Save Profile Photos</strong>
                    	<div>3 Included</div>
                	</td>
            	</tr>
            	<tr>
                	<td>
                    	<strong>Accept/Send Private Photos FREE*</strong>
                    	<div>10 photos per month</div>
                	</td>
            	</tr>
            	<tr>
                	<td>
                    	<strong>Share Contact Info **</strong>
                    	<div>-</div>
                	</td>
            	</tr>
            	<tr>
                	<td>
                    	<strong>Price</strong>
                    	<div>$15.99 Monthly</div>
                	</td>
            	</tr>
                <BtnMain
                    text="Details"
                    bsStyle="btn-block"
                    onClick={props.openSubscribe('gold')} /> 
            </tbody>
}

const Platinum = props => {
	return <tbody className="color-888">
            	<tr>
            		<td>
            			<strong>Free Dibs</strong>
            			<div>20 dibs per month</div>
        			</td>
    			</tr>
            	<tr>
            		<td>
            			<strong>Video Call</strong>
            			<div>-</div>
        			</td>
        		</tr>
                <tr>
                	<td>
                    	<strong>Expression of Interest</strong>
                    	<div>+</div>
                	</td>
            	</tr>
            	<tr>
                	<td>
                    	<strong>Send Letter -1st Letter FREE</strong>
                    	<div>+</div>
                	</td>
            	</tr>
            	<tr>
                	<td>
                    	<strong>% Discount on ALL dib Packages</strong>
                    	<div>20% Discount</div>
                	</td>
            	</tr>
            	<tr>
                	<td>
                    	<strong>View Photos in Profiles</strong>
                    	<div>+</div>
                	</td>
            	</tr>
            	<tr>
                	<td>
                    	<strong>View Videos in Profiles</strong>
                    	<div>+</div>
                	</td>
            	</tr>
            	<tr>
                	<td>
                    	<strong>Save Profile Photos</strong>
                    	<div>5 Included</div>
                	</td>
            	</tr>
            	<tr>
                	<td>
                    	<strong>Accept/Send Private Photos FREE*</strong>
                    	<div>15 photos per month</div>
                	</td>
            	</tr>
            	<tr>
                	<td>
                    	<strong>Share Contact Info **</strong>
                    	<div>-</div>
                	</td>
            	</tr>
            	<tr>
                	<td>
                    	<strong>Price</strong>
                    	<div>$29.99 Monthly</div>
                	</td>
            	</tr>
                <BtnMain
                    text="Details"
                    bsStyle="btn-block"
                    onClick={props.openSubscribe('platinum')} />
            </tbody>
}

const Vip = props => {
	return <tbody className="color-888">
            	<tr>
            		<td>
            			<strong>Free Dibs</strong>
            			<div>30 dibs per month</div>
        			</td>
    			</tr>
            	<tr>
            		<td>
            			<strong>Video Call</strong>
            			<div>20 minutes per month</div>
        			</td>
        		</tr>
                <tr>
                	<td>
                    	<strong>Expression of Interest</strong>
                    	<div>+</div>
                	</td>
            	</tr>
            	<tr>
                	<td>
                    	<strong>Send Letter -1st Letter FREE</strong>
                    	<div>+</div>
                	</td>
            	</tr>
            	<tr>
                	<td>
                    	<strong>% Discount on ALL dib Packages</strong>
                    	<div>30% Discount</div>
                	</td>
            	</tr>
            	<tr>
                	<td>
                    	<strong>View Photos in Profiles</strong>
                    	<div>+</div>
                	</td>
            	</tr>
            	<tr>
                	<td>
                    	<strong>View Videos in Profiles</strong>
                    	<div>+</div>
                	</td>
            	</tr>
            	<tr>
                	<td>
                    	<strong>Save Profile Photos</strong>
                    	<div>10 Included</div>
                	</td>
            	</tr>
            	<tr>
                	<td>
                    	<strong>Accept/Send Private Photos FREE*</strong>
                    	<div>25 photos per month</div>
                	</td>
            	</tr>
            	<tr>
                	<td>
                    	<strong>Share Contact Info **</strong>
                    	<div>+</div>
                	</td>
            	</tr>
            	<tr>
                	<td>
                    	<strong>Price</strong>
                    	<div>$59.99 Monthly</div>
                	</td>
            	</tr>
                <BtnMain
                    text="Details"
                    bsStyle="btn-block"
                    onClick={props.openSubscribe('vip')} />
            </tbody>
}

export class SubscribeTabs extends Component {
	state = {
        titleSubscribe: '',
        tab: 'platinum',
    }
    setTab = tab => () => {
    	this.setState({tab})
    }
	openSubscribe = plan => e => {
        const { token, dispatch } = this.props
        this.setState({titleSubscribe: plan})
        dispatch(toggleModal(true, 'subscribeMobile'))
    }
	render() {
		const { subscribeMobile } = this.props
		return (
			<div>
				<div className="custom-thead">
                    <div 
                    	className={`text-center text-uppercase title fs-18 pointer ${this.state.tab === 'gold' ? 'active' : ''}`}
                    	onClick={this.setTab('gold')}>Gold</div>
                    <div
                    	className={`text-center text-uppercase title fs-18 pointer ${this.state.tab === 'platinum' ? 'active' : ''}`}
                    	onClick={this.setTab('platinum')}>Platinum</div>
                    <div
                    	className={`text-center text-uppercase title fs-18 pointer ${this.state.tab === 'vip' ? 'active' : ''}`}
                    	onClick={this.setTab('vip')}>VIP</div>
                </div>
                <div className="table-responsive">
                    <table className="table table-bordered table-striped text-center">
                    	{ this.state.tab === 'gold' && <Gold openSubscribe={this.openSubscribe} /> }
                    	{ this.state.tab === 'platinum' && <Platinum openSubscribe={this.openSubscribe} /> }
                    	{ this.state.tab === 'vip' && <Vip openSubscribe={this.openSubscribe} /> }
                    </table>
                </div>
                <MainModal
                    body={<Subscribe name={this.state.titleSubscribe} />}
                    title={this.state.titleSubscribe}
                    show={subscribeMobile}
                    keyModal="subscribeMobile" />
			</div>
		)
	}
}

const mapStateToProps = ({user, ui: {modals}}) => ({token: user.token, subscribeMobile: modals.subscribeMobile})

export default connect(mapStateToProps)(SubscribeTabs)