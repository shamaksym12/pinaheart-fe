import React, { Component } from 'react'
import BtnMain from '../buttons/btn_main'
import Textarea from '../inputs/textarea'
import { FormGroup } from 'react-bootstrap'
import TextField from '../inputs/text_field'
import BtnUpload from '../buttons/btn_upload'
import Validator from '../../validate'
import { sendRequest } from '../../actions'
import { toggleModal } from '../../actions/ui'
import store from '../../store'

class Support extends Component {
    state = {
            file: {},
            value: '',
        }

    send = () => {
		let error = 1
        error *= Validator.check(this.name.value, ['required'], 'Name')
        error *= Validator.check(this.email.value, ['required', 'email'], 'Email')
        error *= Validator.check(this.subject.value, ['required'], 'Subject')
        error *= Validator.check(this.message.value, ['required'], 'Message')

        if (error) {
        	const data = {
        		name: this.name.value,
        		email: this.email.value,
        		subject: this.subject.value,
        		message: this.message.value,
        	}
            if (Object.keys(this.state.file).length) {
                data.file = this.state.file
            }
        	store.dispatch(sendRequest(data)).then(res => {
        		if (res) {
        			this.setState({file: {}})
        			store.dispatch(toggleModal(false, 'support'))
        		}
        	})
        }
	}

    handleChange = value => {
        this.setState({value})
    }

    onDrop = files => {
    	this.setState({file: files[0]})
    }

    render() {
        return (
            <div>
	            <FormGroup>
	                <TextField
	                    placeholder="Name"
	                    inputRef={ref => { this.name = ref }}
	                    name="Name" />
	            </FormGroup>
                <FormGroup>
                    <TextField
                        placeholder="Enter email"
                        inputRef={ref => { this.email = ref }} />
                </FormGroup>
                <FormGroup>
	                <TextField
	                    placeholder="Subject"
	                    inputRef={ref => { this.subject = ref }}
	                    name="Subject" />
	            </FormGroup>
	            <FormGroup>
                    <Textarea
                        onChange={this.handleChange}
                        value={this.state.value}
                        inputRef={ref => { this.message = ref }}
                        placeholder="Message" />
                </FormGroup>
                <FormGroup>
                    <span>{this.state.file.name}</span>
                </FormGroup>
                <div className="pull-left">
                    <BtnUpload
                        text="Upload File"
                        onChange={this.onDrop} />
                </div>
                <FormGroup className="text-right">
	                <BtnMain
	                    bsStyle="success"
	                    text="Send"
	                    onClick = {this.send} />
                </FormGroup>
            </div>
        )
    }
}

export default Support