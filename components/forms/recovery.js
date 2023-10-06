import React, { Component } from 'react'
import { connect } from 'react-redux'
import Validator from '../../validate'
import { FormGroup } from 'react-bootstrap'
import TextField from '../inputs/text_field'
import BtnMain from '../buttons/btn_main'
import { sendRecovery, updatePassword } from '../../actions/auth'
import { toggleModal, setAlert } from '../../actions/ui'
import cn from 'classnames'

class Recovery extends Component {
    recovery = () => {
        const { dispatch } = this.props
        const underValidate = {
            email: Validator.check(this.email.value, ['required', 'email'], 'Email'),
        }
        
        if (Validator.isValid(underValidate)) {
            const data = {
                email: this.email.value,
                link: `${window.location.origin}/recovery/{hash}`,
            }
            dispatch(sendRecovery(data)).then(res => {
                if (res) {
                    dispatch(toggleModal(false, 'recovery'))
                }
            })
        }
    }

    render() {
        const { inValid } = this.props
        return (
            <form noValidate={true}>
                <div style={{marginBottom: 60}}>
                    <FormGroup className="text-center">
                        <TextField 
                            type="email"
                            label="Your Email Address"
                            placeholder="Enter email"
                            className={cn({'input-danger': ('email' in inValid)})}
                            inputRef={ref => { this.email = ref }} />
                        <span className="description-error">{inValid.email}</span>
                    </FormGroup>
                    <FormGroup className="text-center">
                        <BtnMain
                            className="btn-block btn-green"
                            onClick={this.recovery}
                            text="Send" />
                    </FormGroup>
                </div>
                <style jsx>{`
                    .description-error {
                        font-size: 12px;
                        color: #C5141B;
                    }
                `}
                </style>
            </form>
        )
    }
}

const mapStateToProps = state => ({inValid: state.ui.inValid})

export default connect(mapStateToProps)(Recovery)