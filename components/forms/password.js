import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup } from 'react-bootstrap'
import TextField from '../inputs/text_field'
import Validator from '../../validate'
import BtnMain from '../buttons/btn_main'
import { changePassword } from '../../actions/user'

class PasswordForm extends Component {
	save = ()  => {
        let error = 1;
        const { dispatch } = this.props
        error *= Validator.check(this.old_password.value, ['required'], 'Old Password')
        error *= Validator.check(this.password.value, ['required'], 'New Password')
        error *= Validator.check(this.password_confirmation.value, ['required'], 'Password Confirmation')

        if (error) {
            const data = {
                old_password: this.old_password.value,
                password: this.password.value,
                password_confirmation: this.password_confirmation.value
            }
            dispatch(changePassword(data))
        }
    }

    render() {
        return (
           <div>
				<FormGroup>
                   <TextField
                        type="password"
                        placeholder="Old Password"
                        inputRef={ref => { this.old_password = ref }}
                        name="First Name"
                        label={true}
                    />
                </FormGroup>
				<FormGroup>
                    <TextField 
                        type="password"
                        placeholder="New password"
                        inputRef={ref => { this.password = ref }}
                        label={true}
                    />
                </FormGroup>
                <FormGroup>
                    <TextField 
                        type="password"
                        placeholder="Confirm password"
                        inputRef={ref => { this.password_confirmation = ref }}
                        label={true}
                    />
                </FormGroup>
                <FormGroup className="text-right">
                    <BtnMain
                        bsStyle="success"
                        text="Update"
                        onClick = {this.save} />
                </FormGroup>
			</div> 
        )
    }
}

export default connect()(PasswordForm)