import React, { Component } from 'react'
import { connect } from 'react-redux'
import BtnMain from './buttons/btn_main'

class NotActive extends Component {
	resendActivation = () => {
		const { dispatch, email } = this.props
		dispatch(resendEmail(email))
	}

    render() {
        return (
        	<div className="not-active-wrap">
        		<div className="not-active-inner box-shadow">
        			<p className="form-group">
        				Your Account is not Verified yet.
        				<br />
        				Please, click here to confirm your email address.
    				</p>
        			<BtnMain 
        				onClick={this.resendActivation}
        				text="Resent the Confirmation Letter" />
        		</div>
        	</div>
        )
    }
}

const mapStateToProps = state => ({email: state.user.data.email})

export default connect(mapStateToProps)(NotActive)