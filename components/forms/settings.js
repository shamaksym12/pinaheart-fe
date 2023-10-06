import React, { Component } from 'react'
import { connect } from 'react-redux'
import Checkbox from '../inputs/checkbox'
import { toggleHidden } from '../../actions/user'
import { FormGroup } from 'react-bootstrap'
import TextField from '../inputs/text_field'
import Validator from '../../validate'
import BtnMain from '../buttons/btn_main'
import { changePassword } from '../../actions/user'

class SettingsForm extends Component {
    toggleHide = val => {
    	const { dispatch } = this.props
    	dispatch(toggleHidden(val))
    }

    render() {
    	const { hidden, hidden_request } = this.props
        return (
            <div className="row">
                <div className="col-sm-6">
                    <FormGroup>
                       <TextField
                            type="password"
                            label="Old Password"
                            inputRef={ref => { this.old_password = ref }}
                            name="First Name" />
                    </FormGroup>
                    <FormGroup>
                        <TextField 
                            type="password"
                            label="New password"
                            inputRef={ref => { this.password = ref }} />
                    </FormGroup>
                    <FormGroup>
                        <TextField 
                            type="password"
                            label="Confirm password"
                            inputRef={ref => { this.password_confirmation = ref }} />
                    </FormGroup>
                    <FormGroup className="text-right">
                        <BtnMain
                            bsStyle="success"
                            text="Update"
                            onClick = {this.save} />
                    </FormGroup>
                    <hr />
                	<Checkbox 
                		onChange={this.toggleHide}
                		title="Hide My Profile"
                		value={hidden}
                		disabled={hidden_request} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>
	({
	    hidden: state.user.data.hidden,
	    hidden_request: state.user.data.hidden_request,
	})

export default connect(mapStateToProps)(SettingsForm)