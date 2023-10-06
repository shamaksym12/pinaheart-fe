import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, FormGroup } from 'react-bootstrap'
import TextField from '../inputs/text_field'
import Validator from '../../validate'
import BtnMain from '../buttons/btn_main'
import { updateUser } from '../../actions/user'

export class ContactForm extends Component {
	constructor() {
		super()
		this.user = {}
	}

	save = () => {
		let error = 1
		const { dispatch, role } = this.props
        error *= Validator.check(this.user.email.value, ['required', 'email'], 'Email')

        if (role === 'girl') {
            error *= Validator.check(this.user.mobile.value, ['required'], 'Phone')
        }
		
		if (error) {
			let data = {
				email: this.user.email.value,
				mobile: this.user.mobile.value
			}

            if (role === 'girl') {
                data.facebook = this.user.facebook.value
                data.vk = this.user.vk.value
                data.other_social = this.user.other_social.value
            }
			dispatch(updateUser(data))
		}
	}

    render() {
    	const {
    		email,
			mobile,
			facebook,
			vk,
			other_social,
			role,
    	} = this.props

        return (
            <div>
    			<Row>
    				<Col sm={6}>
    					<FormGroup>
    		                <TextField
    		                    type="email"
    		                    placeholder="Enter email"
    		                    inputRef={ref => { this.user.email = ref }}
    		                    value={email}
                                label={true} />
    		            </FormGroup>
    		            <FormGroup>
    		                <TextField
    		                    placeholder="Phone"
    		                    inputRef={ref => { this.user.mobile = ref }}
    		                    value={mobile}
                                label={true} />
    		            </FormGroup>
                        {
                            role === 'girl'
                            ?   <div>
                                    <FormGroup>
                                        <TextField
                                            placeholder="Facebook"
                                            inputRef={ref => { this.user.facebook = ref }}
                                            value={facebook}
                                            label={true} />
                                    </FormGroup>
                                    <FormGroup>
                                        <TextField
                                            placeholder="VK"
                                            inputRef={ref => { this.user.vk = ref }}
                                            value={vk}
                                            label={true} />
                                    </FormGroup>
                                    <FormGroup>
                                        <TextField
                                            placeholder="Other Social Media"
                                            inputRef={ref => { this.user.other_social = ref }}
                                            value={other_social}
                                            label={true} />
                                    </FormGroup>
                                </div>
                            :   null
                        }
    				</Col>
				</Row>
				<FormGroup className="text-right">
                    <BtnMain
                        bsStyle="success"
                        text="Save"
                        onClick={this.save} />
                </FormGroup>
			</div>
        )
    }
}

const mapStateToProps = state =>
	({
	    email: state.user.data.email,
		mobile: state.user.data.mobile,
		facebook: state.user.data.facebook,
		vk: state.user.data.vk,
		other_social: state.user.data.other_social,
		role: state.user.data.role,
	})

export default connect(mapStateToProps)(ContactForm)