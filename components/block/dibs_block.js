import React, { Component } from 'react'
import { connect } from 'react-redux'

class DibsInfo extends Component {

    render() {
    	const { membership, membership_count, credits } = this.props

        return (
            <div>
				<div>
    				<span className="font-bebas">Dibs: </span>
    				<strong>{credits}</strong>
				</div>
				<div>
					<span className="font-bebas">Current plan: </span>
					<strong>{`${membership.name} (${membership.value.month} month)`}</strong>
				</div>
				<div>
					<span className="font-bebas">Send 1st free letter to any girl: </span>
					<strong>{membership_count.free_letter} / {membership.free_leter}</strong>
				</div>
				<div>
					<span className="font-bebas">Accept/send private photos: </span>
					<strong>{membership_count.private_photo} / {membership.private_photo}</strong>
				</div>
				<div>
					<span className="font-bebas">Set photos in your profile: </span>
					<strong>{membership_count.my_photo} / {membership.my_photo}</strong>
				</div>
				<div>
					<span className="font-bebas">View photos in profiles: </span>
					<strong>{membership_count.view_photo}</strong>
				</div>
				<div>
					<span className="font-bebas">View videos in profiles: </span>
					<strong>{membership_count.view_video}</strong>
				</div>
				<div>
					<span className="font-bebas">Expression of Interest: </span>
					<strong>{membership_count.likes}</strong>
				</div>
				<div>
					<span className="font-bebas">Discount on ALL services: </span>
					<strong>{membership.discount} %</strong>
				</div>
				<div>
					<span className="font-bebas">Share contact details: </span>
					<strong>{membership_count.contact_details} / {membership.contact_details}</strong>
				</div>
			</div>
        );
    }
}

const mapStateToProps = ({user: {data}}) => ({membership: data.membership,membership_count: data.membership_count,credits: data.credits})

export default connect(mapStateToProps)(DibsInfo)