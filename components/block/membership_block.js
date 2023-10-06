import React, { Component } from 'react'
import { connect } from 'react-redux'
import BtnMain from '../buttons/btn_main'
import { Router } from '../../routes'

class MembershipInfo extends Component {

	goToSubscribe = () => {
		Router.pushRoute('/subscribe')
	}

    render() {
    	const { membership } = this.props;
        return (
            <div className="pt-15">
				<div className="form-group">
					<div>
						<span className="font-bebas">Current plan: </span>
						<strong>{ membership.name + ( membership.value.trial ? '(Trial)' : '' ) }</strong>
					</div>
					<div>
						<span className="font-bebas">Expression of Interest: </span>
						<strong>{ membership.likes }</strong>
					</div>
					<div>
						<span className="font-bebas">View ALL additional photos in profiles: </span>
						<strong>{ membership.view_photo }</strong>
					</div>
					<div>
						<span className="font-bebas">View ALL videos in profiles: </span>
						<strong>{ membership.view_video }</strong>
					</div>
					<div>
						<span className="font-bebas">Set photos in your profile: </span>
						<strong>{ membership.my_photo }</strong>
					</div>
					<div>
						<span className="font-bebas">Send 1st free letter to any girl: </span>
						<strong>{ membership.free_leter }</strong>
					</div>
					<div>
						<span className="font-bebas">Accept/send private photos: </span>
						<strong>{ membership.private_photo }</strong>
					</div>
					<div>
						<span className="font-bebas">Discount on ALL additional communicative services: </span>
						<strong>{ membership.discount }%</strong>
					</div>
					<div>
						<span className="font-bebas">Value: </span>
						<strong>{`${membership.value.month} months - $${membership.value.month_payment || membership.value.one_payment} per month (billed in one payment $${membership.value.one_payment})`}</strong>
					</div>
				</div>
				<div>
					<BtnMain
                        bsStyle="success"
                        text="Upgrade"
                        onClick={this.goToSubscribe} />
				</div>
			</div>
        )
    }
}

const mapStateToProps = state => ({membership: state.user.data.membership})

export default connect(mapStateToProps)(MembershipInfo)