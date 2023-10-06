import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '../inputs/text_field'
import SelectField from '../inputs/select_field'
import CheckboxField from '../inputs/checkbox_field'
import RadioSwitch from '../inputs/radio_switch'
import BtnMain from '../buttons/btn_main'
import { register, signUpSocial } from '../../actions/signup'
import Validator from '../../validate'
import { ageArraySignup } from '../../utils'
import { setAlert } from '../../actions/ui'
import { setSignupDataKey } from '../../actions/auth'

export class StepZero extends Component {
    signup = {}

    state = {
        gender: '',
        terms: false,
        age: '',
    }

    toggleRole = value => {
        const { dispatch } = this.props
        this.setState({
            gender:value
        })
        dispatch(setSignupDataKey({sex: value}))
    }

    handleChange = value => {
        const { dispatch } = this.props
        dispatch(setSignupDataKey({age: value}))
    }

    resolveRegistration = () => {
        const { dispatch } = this.props
        let error = 1
        const underValidate = {
            first_name: Validator.check(this.signup.first_name.value, ['required'], 'First Name'),
            email: Validator.check(this.signup.email.value, ['required'], 'Email'),
            password: Validator.check(this.signup.password.value, ['required'], 'Password'),
            gender: Validator.check(this.props.sex, ['required'], 'Gender'),
            age: Validator.check(this.signup.age.value, ['required'], 'Age'),
            terms: Validator.check(this.state.terms, ['required'], 'Terms & Privacy'),
        };
        Object.keys(underValidate).forEach(field => {
            if (!underValidate[field].valid) {
                dispatch(setAlert(underValidate[field].message, 'error'))
                error = 0
            }
        })

         const coupon = this.signup.promoCode ? this.signup.promoCode.value : '';


        if (error) {
            let data = {
                first_name: this.signup.first_name.value,
                sex: this.props.sex,
                age: this.signup.age.value,
                email: this.signup.email.value,
                password: this.signup.password.value,
                coupon,
            };
            dispatch(register(data))
        }
    }

    signUpSocial = provider => e => {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(signUpSocial(provider))
    }

    

    render() {
        const {
            first_name,
            email,
            age,
            sex,
            password,
            authMessage,
            promo,
            promoCode,
        } = this.props;

        return (
            <div className="signup_wrap">
                <div className="register-wrap">
                    {
                        authMessage
                        &&  <div className="text-center" style={{backgroundColor: '#F1FFE0', borderRadius: 5, padding: 5}}>
                                {authMessage}
                            </div>
                    }
                    <div className="text-red fs-48 bold form-group">Join for free</div>
                    <form noValidate={true}>
                        <div className="form-group">
                            <TextField
                                label="First Name"
                                inputRef={ref => { this.signup.first_name = ref }}
                                value={first_name}
                                name="First Name"
                                social={this.state.social} />
                        </div>
                        <div className="row">
                            <div className="col-xs-8">
                                <label>I am</label>
                                <div className="d-flex form-group">
                                    <RadioSwitch text="Male" value="M" className="mr-15" onChange={this.toggleRole} checked={sex} />
                                    <RadioSwitch text="Female" value="F" onChange={this.toggleRole} checked={sex} />
                                </div>
                            </div>
                            <div className="col-xs-4">
                                <label>Age</label>
                                <SelectField
                                    value={age}
                                    onChange={this.handleChange}
                                    inputRef={ref => { this.signup.age = ref }}
                                    options={ageArraySignup()} />
                            </div>
                        </div>
                        <div className="form-group">
                            <TextField
                                type="email"
                                label="Your Email Address"
                                inputRef={ref => { this.signup.email = ref }}
                                social={this.state.social}
                                value={email} />
                        </div>
                        <div className="form-group">
                            <TextField
                                type="password"
                                label="Choose Password"
                                name="password"
                                inputRef={ref => { this.signup.password = ref }}
                                value={password} />
                        </div>
                        {
                            promo === '/promo' ?
                            <div className="form-group">
                                <TextField
                                    labelClassName={'text-danger'}
                                    type="text"
                                    label="Enter your promo code for free premium access"
                                    name="promocode"
                                    inputRef={ref => { this.signup.promoCode = ref }}
                                    value={promoCode} />
                            </div> : null

                        }
                        <div className="form-group text-left">
                            <CheckboxField
                                id="signup"
                                onChange={val => this.setState({terms: val})}
                                inputRef={ref => { this.signup.terms = ref }}
                                text={<span>Yes, I agree to the <a href="/policy.html" target="_blank">Terms of Use</a> and <a href="/policy.html" target="_blank">Privacy Statement</a></span>}
                                checked={this.state.terms} />
                        </div>
                        <div className="form-group">
                            <BtnMain
                                text="View Singles Now"
                                className="btn-block btn-green"
                                onClick={this.resolveRegistration} />
                        </div>
                        <div className="d-flex justify-content-between form-group no_mobile">
                            <div className="mr-15 text-facebook">
                                <i className="fab fa-facebook fs-18"></i>
                                <a href="#" onClick={this.signUpSocial('facebook')}>Join via Facebook</a>
                            </div>
                            <div className="text-google">
                                <i className="fab fa-google-plus-square fs-18"></i>
                                <a href="#" onClick={this.signUpSocial('google')}>Join via Google</a>
                            </div>
                        </div>
                        <div className="text-center no_mobile">
                            We never post on your behalf.
                        </div>
                    </form>
                </div>
                <div className="special_act row">
                    <div className="d-flex justify-content-between form-group no_desktop">
                        <div className="mr-15 text-facebook">
                            <i className="fab fa-facebook fs-18"></i>
                            <a href="#" onClick={signUpSocial('facebook')}>Join via Facebook</a>
                        </div>
                        <div className="text-google">
                            <i className="fab fa-google-plus-square fs-18"></i>
                            <a href="#" onClick={signUpSocial('google')}>Join via Google</a>
                        </div>
                    </div>
                    <div className="text-center no_desktop signup_comment">
                        We never post on your behalf.
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({signup, ui}) =>
	({
        first_name: signup.data.first_name,
        email: signup.data.email,
        sex: signup.data.sex,
        age: signup.data.age,
        password: signup.data.password,
        authMessage: ui.authMessage,
        promoCode: signup.data.promoCode,
	});

export default connect(mapStateToProps)(StepZero)