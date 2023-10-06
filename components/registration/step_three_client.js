import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, Col, Row } from 'react-bootstrap'
import Textarea from '../inputs/textarea'
import TextField from '../inputs/text_field'
import { getOptions } from '../../actions/ui'
import { setSignupKey, sendSignUpFour } from '../../actions/signup'
import BtnSignUp from '../buttons/btn_signup'
import Block from '../block'
import Validator from '../../validate'

export class StepThreeClient extends Component {
    constructor(props) {
        super(props)
        this.signup = {}
        this.interests = []
        const { dispatch } = props
        dispatch(getOptions('interests'))
    }

    toggleInterest = (id, value) => {
        if (value) {
            this.interests.push(id)
        } else {
            this.interests = this.interests.filter(item => item !== id)
        }
    }

    printInterest = (interest, i) => {
        return  <Col lg={3} md={4} sm={6} xs={12} className="text-center ethniticy-block" key={i}>
                    <Block text={interest.value} value={interest.id} onChange={this.toggleInterest} />
                </Col>
    }

    prevStep = () => {
        const { dispatch } = this.props
        dispatch(setSignupKey('step', 2))
    }

    getConfirm = () => {
        gtag('event', 'finish', {'event_category': 'finish', 'event_action': 'registraciya8'}) // google metrics
        
        const { dispatch } = this.props
        let error = 1
        error *= Validator.check(this.signup.mobile.value, ['required'], 'Phone')
        if (error) {
            const data = {
                about_me: this.signup.about_me.value,
                like_to_meet: this.signup.like_to_meet.value,
                interest_id: this.interests,
                mobile: this.signup.mobile.value,
                custom_remember_token: this.props.custom_remember_token
            }
            dispatch(sendSignUpFour(data))
        }
    }

    componentDidMount() {
        const el = document.getElementById('register-finish')
        if (el) {
            el.addEventListener('click', () => {
                fbq('track', 'CompleteRegistration')
            })
        }
    }

    render() {
        const { about_me, like_to_meet, mobile, interests } = this.props

        return (
            <form noValidate={true}>
                <Row>
                    <Col sm={12}>
                        <FormGroup>
                            <Textarea
                                inputRef={ref => { this.signup.about_me = ref }}
                                value={about_me}
                                placeholder="More about me"
                                label={true} />
                        </FormGroup>
                        <FormGroup>
                            <Textarea
                                inputRef={ref => { this.signup.like_to_meet = ref }}
                                value={like_to_meet}
                                placeholder="The one I would like to meet"
                                label={true} />
                        </FormGroup>
                        <div style={{fontSize: 12, opacity: 0.8}}>* Please do not post any contact details in your profile. We review each profile manually.</div>
                    </Col>
                    <Col sm={6}>
                        <FormGroup className="pt-15">
                            <TextField
                                type="text"
                                placeholder="Phone"
                                inputRef={ref => { this.signup.mobile = ref }}
                                description="* Your phone number is visible only for administrator."
                                value={mobile} />
                        </FormGroup>
                    </Col>
                    <Col sm={12}>
                        <div className="pt-15"><span className="font-bebas fs-18">Interests <span className="small-italic">(pick at least 5)</span></span></div>
                        <div className="form-group">
                            { interests.map((interest, i) => this.printInterest(interest, i)) }
                        </div>
                    </Col>
                    
                </Row>
                <FormGroup className="text-center pt-15">
                    <BtnSignUp
                        type="button"
                        text="Prev"
                        orientation="left"
                        onClick={this.prevStep} />
                    <BtnSignUp
                        id="register-finish"
                        type="button"
                        bsStyle="success"
                        text="Finish"
                        onClick = {this.getConfirm} />
                </FormGroup>
            </form>
        );
    }
}

const mapStateToProps = state =>
    ({
        about_me: state.signup.data.about_me,
        like_to_meet: state.signup.data.like_to_meet,
        mobile: state.signup.data.mobile,
        interests: state.options.interests,
        custom_remember_token: state.signup.custom_remember_token,
    })


export default connect(mapStateToProps)(StepThreeClient)