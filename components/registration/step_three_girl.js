import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormGroup, Row, Col } from 'react-bootstrap'
import Textarea from '../inputs/textarea'
import SelectField from '../inputs/select_field'
import BtnMain from '../buttons/btn_main'
import { getOptions, setAlert } from '../../actions/ui'
import { sendSignUpFour } from '../../actions/signup'
import CheckboxField from '../inputs/checkbox_field'
import Link from 'next/link'
import Block from '../block'
import Validator from '../../validate'
import { getNumArray } from '../../utils'

export class StepThreeGirl extends Component {
    constructor(props) {
        super(props)
        this.signup = {
            match: {}
        }
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

    getSignUpThree = () => {
        gtag('event', 'finish', {'event_category': 'finish', 'event_action': 'registraciya8'}) // google metrics
        const { dispatch } = this.props
        let error = 1

        for (var k in this.signup.match) {
            if (error) {
                error *= Validator.check(this.signup.match[k].value, ['required'], 'Future Partner')
            }
        }

        error *= Validator.check(this.signup.about_me.value, ['required'], 'About me')
        error *= Validator.check(this.signup.like_to_meet.value, ['required'], 'Like to meet')
        error *= Validator.check(this.signup.leisure_time.value, ['required'], 'About Leisure time')
        error *= Validator.check(this.interests, ['required'], 'Interests')
        error *= Validator.check(this.signup.terms.checked, ['checked'], 'Terms & Privacy')
        
        if (this.interests.length < 5) {
            dispatch(setAlert('Pick at least 5 interest', 'error'))
            error = 0
        }

        if (error) {
            const data = {
                about_me: this.signup.about_me.value,
                like_to_meet: this.signup.like_to_meet.value,
                leisure_time: this.signup.leisure_time.value,
                interest_id: this.interests,
                match: {
                    from: this.signup.match.from.value,
                    to: this.signup.match.to.value
                },
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
        const { 
            about_me,
            like_to_meet,
            match,
            leisure_time,
            interests,
        } = this.props
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
                        <FormGroup>
                            <Row>
                                <Col sm={4}>
                                    <div>
                                        <span className="text-uppercase font-bebas">Future Partner Preferred age</span>
                                    </div>
                                </Col>
                                <Col sm={4}>
                                    <SelectField
                                        inputRef={ref => { this.signup.match.from = ref }}
                                        options={getNumArray('from', 19, 70)}
                                        value={match.from} />
                                </Col>
                                <Col sm={4}>
                                    <SelectField
                                        inputRef={ref => { this.signup.match.to = ref }}
                                        options={getNumArray('to', 70, 19)}
                                        value={match.to} />
                                </Col>
                            </Row>
                        </FormGroup>
                        <div><span className="font-bebas fs-18">Interests <span className="small-italic">(pick at least 5)</span></span></div>
                        { interests.map((interest, i) => this.printInterest(interest, i)) }
                    </Col>
                    <Col xs={12}>
                        <FormGroup>
                            <Textarea
                                inputRef={ref => { this.signup.leisure_time = ref }}
                                value={leisure_time}
                                placeholder="More about my Leisure time"
                                label={true} />
                        </FormGroup>
                    </Col>
                    <Col xs={12} className="text-center">
                        <CheckboxField
                            inputRef={ref => { this.signup.terms = ref }}
                            text={<span>By clicking "Join Us for Free" above you agree to <a href="/terms" target="_blank">"Terms of Use" & "Privacy Policy"</a></span>}
                            value={false} />
                        <div className="position-relative">
                            <BtnMain
                                id="register-finish"
                                text="Add profile to the women's gallery"
                                onClick={this.getSignUpThree}
                                orientation="right" />
                        </div>

                    </Col>
                </Row>
            </form>
        );
    }
}

const mapStateToProps = state =>
	({
	    about_me: state.signup.data.about_me,
        like_to_meet: state.signup.data.like_to_meet,
        match: state.signup.data.match,
        leisure_time: state.signup.data.leisure_time,
        interests: state.options.interests,
        custom_remember_token: state.signup.custom_remember_token,
	})

export default connect(mapStateToProps)(StepThreeGirl)