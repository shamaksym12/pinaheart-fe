import React, { Component } from 'react'
import { FormGroup } from 'react-bootstrap'
import TextField from '../inputs/text_field'
import CheckBox from '../inputs/checkbox_field'
import BtnMain from '../buttons/btn_main'
import BtnUpload from '../buttons/btn_upload'
import { toggleModal, setUiKey, } from '../../actions/ui'
import { login, requestUnblock } from '../../actions/auth'
import {  checkUnFinishRegister } from '../../actions/members'
import { signUpSocial } from '../../actions/signup'
import store from '../../store'
import { Router } from '../../routes'
import Textarea from '../inputs/textarea.js'

import Validator from '../../validate'
import { setAlert } from '../../actions/ui'

class Login extends Component {
    constructor() {
        super()
        this.auth = {}
        this.state = {
            email: true,
            password: true,
            message: '',
            remember: false,
            account_admin_block: false,
            block: {
                device: '',
                location: '',
                comment: '',
                attach: null,
                email: '',
            }, 
        }
    }

    handleSubmit = e => {
    	e.preventDefault()
    	const data = {
            email: this.auth.email.value,
            password: this.auth.password.value
        }
        
        this.setState(state => {
            return {
                ...state, 
                block: {
                    ...state.block,
                    email: this.auth.email.value,
                }
            }
        })

        store.dispatch(login(data)).then(res => {            
            if (res) {
                const { ui } = store.getState()
                if (ui.redirect) {
                    window.location.href = ui.redirect
                } else {
                    store.dispatch(checkUnFinishRegister()).then(response => {
                        let { finish } = response			
                        if ( ! finish) {
                            Router.pushRoute('/edit/info')  
                        } else {
                            Router.pushRoute('/')                    
                        }
                    })
                }
            }
        }).catch(res => {
            if (res.statusCode == 423) {
                this.setState({ account_admin_block: true })                            
                store.dispatch(setUiKey('sizeLoginModal', 'large'))
            }
        })
    }

    handleSubmitBlockedAccount = e => {
        e.preventDefault()
        let error = true
        const underValidate = {
            device: Validator.check(this.state.block.device.value, ['required'], 'Device'),
            location: Validator.check(this.state.block.location.value, ['required'], 'Located'),
            comment: Validator.check(this.state.block.comment.value, ['required'], 'Comment'),
        }

        Object.keys(underValidate).forEach(field => {
            if (!underValidate[field].valid) {
                store.dispatch(setAlert(underValidate[field].message, 'error'))
                error = false
            }
        })

        if (error) {          
            const data = new FormData
            data.append('device', this.state.block.device.value)
            data.append('location', this.state.block.location.value)
            data.append('comment', this.state.block.comment.value)
            data.append('attach', this.state.block.attach ? this.state.block.attach : '')
            data.append('email', this.state.block.email)
            
            store.dispatch(requestUnblock(data)).then(res => {            
                setTimeout(() => {
                    location.href = "/"
                }, 1500)
            })
        }
    }
    
    showRecovery = () => {
        store.dispatch(setUiKey('sizeLoginModal', 'sm'))
        store.dispatch(toggleModal(true, 'recovery'))
        store.dispatch(toggleModal(false, 'login'))
    }

    closeLogin = () => {
        store.dispatch(setUiKey('sizeLoginModal', 'sm'))
        store.dispatch(toggleModal(false, 'login'))
    }

    signUpSocial = provider => e => {
        e.preventDefault()
        store.dispatch(signUpSocial(provider))
    }

    onChangeAttach = e => {
        const [ file ] = e        
        this.setState(state => {
            return {
                ...state, 
                block: {
                    ...state.block,
                    attach: file,
                }
            }
         })
    }

    render() {
        return (
            <div>
                {
                   ! this.state.account_admin_block ?
                    <form onSubmit={this.handleSubmit} noValidate={true} className="admin_login">
                        <div>
                            <FormGroup>
                                <TextField 
                                    type="email"
                                    label="Your Email Address"
                                    className={this.state.email !== true ? 'border-bottom-danger' : ''}
                                    description={<span className="text-danger">{this.state.email}</span>}
                                    placeholder="Enter email"
                                    inputRef={ref => { this.auth.email = ref }} />
                            </FormGroup>
                            <div>&nbsp;</div>
                            <FormGroup>
                                <TextField 
                                    type="password"
                                    label="Password"
                                    className={this.state.password !== true ? 'border-bottom-danger' : ''}
                                    description={<span className="text-danger">{this.state.password}</span>}
                                    placeholder="Enter password"
                                    inputRef={ref => { this.auth.password = ref }} />
                            </FormGroup>
                            <div className="form-group">
                                <CheckBox
                                    text="Remember me for login"
                                    id="remember"
                                    checked={this.state.remember}
                                    onChange={val => this.setState({remember: val})} />
                            </div>
                            <FormGroup className="text-center">
                                <BtnMain
                                    type="submit"
                                    className="btn-green btn-block"
                                    text="Login"/>
                            </FormGroup>
                            <div className="form-group text-center">
                                OR
                            </div>
                            <div className="d-flex justify-content-center form-group">
                                <div className="mr-15 text-facebook">
                                    <i className="fab fa-facebook fs-18"></i>
                                    <a href="#" onClick={this.signUpSocial('facebook')}>Facebook</a>
                                </div>
                                <div className="text-google">
                                    <i className="fab fa-google-plus-square fs-18"></i>
                                    <a href="#" onClick={this.signUpSocial('google')}>Google +</a>
                                </div>
                            </div>
                            <div className="text-center">
                                <a href="javascript:;" className="soft-link" onClick={this.showRecovery}>Forgot password?</a>
                                &nbsp; &nbsp;
                                |
                                &nbsp; &nbsp; 
                                <a href="javascript:;" className="soft-link" onClick={this.closeLogin}>Join for free</a>
                            </div>
                        </div>
                    </form>
                    : 
                    <div>
                       <form onSubmit={this.handleSubmitBlockedAccount} noValidate={true}>  
                            <h3>Your profile is temporary suspended</h3>
                            <p>Because of unnatural behavior, our computers have notified us of security risks on you acount. 
                                In order to protect you and other customers, we have to avoid all security risks as much as possible.
                            </p>
                            <p>
                                If you think an error has been made suspending your account, please send us the following information:
                            </p>
                            <strong>
                                <p>
                                Are you using your own computer or are you working on a friend's pc, internet cafe ... please explain
                                </p>              
                            </strong>
                            <FormGroup>
                                <Textarea
                                    value={this.state.block.device.value}
                                    inputRef={ref => { this.state.block.device = ref }} />
                            </FormGroup>
                            <strong>
                                <p>
                                Where are you located (country, city ...)
                                </p>              
                            </strong>
                            <FormGroup>
                                <Textarea
                                    value={this.state.block.location.value}
                                    inputRef={ref => { this.state.block.location = ref }} />
                            </FormGroup>
                            <strong>
                                <p>
                                If you have any idea why your account has been suspended, please clarify
                                </p>
                            </strong>
                            <FormGroup>
                                <Textarea
                                    value={this.state.block.comment.value}
                                    inputRef={ref => { this.state.block.comment = ref }} />
                            </FormGroup>
                            <strong>
                                <p>
                                Upload your id for security verification
                                </p>
                            </strong>
                            <FormGroup>
                                <div className="d-flex justify-content-between">
                                <div className="mr-auto">
                                    <BtnUpload  
                                        onChange={this.onChangeAttach}
                                        text="+ Choose file" />
                                    {
                                        this.state.block.attach ? 
                                        <span className="ml-2">Selected document: {this.state.block.attach ? this.state.block.attach.name : ''}</span>
                                        : ''
                                    }
                                </div>
                                <div>
                                    <BtnMain
                                    type="submit"
                                    className="btn-green"
                                    text="Submit" />
                                </div>
                                </div>              
                            </FormGroup>
                        </form>
                    </div>
                }
            </div>
        );
    }
}

export default Login