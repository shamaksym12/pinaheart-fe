import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, Row, Col } from 'react-bootstrap'
import { resendEmail } from '../../actions/auth'

export class StepConfirm extends Component {
    resend = () => {
        const { dispatch, email } = this.props;
        dispatch(resendEmail(email))
    };

    render() {
        return (
        	<Row>
                <Col sm={8} smOffset={2}>
                    <FormGroup className="text-center">
                        <p>Email verification link was sent to
                        &nbsp;
                        <strong>{this.props.email}</strong>. 
                            To activate your account please check your email and click on the confirmation link.
                        </p>
                        <p>Please, check ALL your folders as sometimes confirmation letters may appear in junk folder.</p>
                        <p>Didn’t get the link? Click <a href="javascript:;" onClick={this.resend}>here</a> to resend.</p>
                    </FormGroup>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = state => ({data: state.signup.data, email: state.signup.data.email})

export default connect(mapStateToProps)(StepConfirm)