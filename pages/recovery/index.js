import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import PrivateLayout from '../../layouts/private'
import { Router } from '../../routes'
import BtnMain from '../../components/buttons/btn_main'
import TextField from '../../components/inputs/text_field'
import { getImage } from '../../utils'
import _v from '../../validate'
import cn from 'classnames'
import { resetPassword } from '../../actions/auth'

class Recovery extends Component {
    static async getInitialProps({query, req}) {
        const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
        return {
            hash: query.hash,
            userAgent: userAgent,
        }
    }
    reset = () => {
        const underValidate = {
            password: _v.check(this.password.value, ['required'], 'Password'),
            confirm_password: _v.check(this.confirm_password.value, ['required'], 'Confirm Password')
        }
        if (this.password.value !== this.confirm_password.value) {
            _v.setInvalid({password: ['Must be same'], confirm_password: ['Must be same']})
            return
        }
        if (_v.isValid(underValidate)) {
            const data = {
                password: this.password.value,
                hash: this.props.hash,
            }
            const { dispatch } = this.props
            dispatch(resetPassword(data)).then(success => {
                if (success) {
                    Router.pushRoute('/')
                }
            })
        }
    }
    render() {
        const { userAgent, inValid } = this.props     
        return (
            <div className="App">
                <Layout>
                    <div className="container" style={{marginTop: 50}}>
                        <div className="row">
                            <div className={`col-xs-12 col-sm-6 col-md-5 col-lg-4`}>
                               <div className="register-wrap">
                                    <div className="text-red fs-30 text-center bold form-group">Password reset</div>
                                    <div className="form-group">
                                        <TextField
                                            type="password"
                                            label="New Password"
                                            name="password"
                                            className={cn({'input-danger': ('password' in inValid)})}
                                            inputRef={ref => { this.password = ref }} />
                                        <span className="description-error">{inValid.password}</span>
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            type="password"
                                            label="Repeat new password"
                                            name="confirm_password"
                                            className={cn({'input-danger': ('confirm_password' in inValid)})}
                                            inputRef={ref => { this.confirm_password = ref }} />
                                        <span className="description-error">{inValid.confirm_password}</span>
                                    </div>
                                    <div className="text-center form-group">
                                        <BtnMain text="Reset password" className="btn-block" onClick={this.reset} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
                <style jsx>{`
                    .App {
                        position: relative;
                        background-image: url(${getImage('/static/assets/img/bg_pinheart_2.jpg', userAgent)});
                        min-height: 500px; 
                        background-attachment: fixed;
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size: cover;
                    }
                    .description-error {
                        font-size: 12px;
                        color: #C5141B;
                    }
                `}
                </style>
            </div>
        );
    }
}

const mapStateToProps = ({ui}) => 
    (
        {
            inValid: ui.inValid,
        }
    )

export default connect(mapStateToProps)(Recovery)