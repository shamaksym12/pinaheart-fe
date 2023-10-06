import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormGroup, Row, Col } from 'react-bootstrap'
import SelectField from '../inputs/select_field'
import BtnSignUp from '../buttons/btn_signup'
import { getArray, heightsArray, weightsArray } from '../../utils'
import { getOptions } from '../../actions/ui'
import { sendSignUpOne, setSignupKey } from '../../actions/signup'
import Validator from '../../validate'

export class StepOneGirl extends Component {
	constructor(props) {
		super(props)
		this.signup = {}
		const { dispatch } = props
		dispatch(getOptions('height'))
		dispatch(getOptions('weight'))
		dispatch(getOptions('body_style'))
		dispatch(getOptions('hair_lengths'))
        dispatch(getOptions('hair_colors'))
        dispatch(getOptions('eyes'))
        dispatch(getOptions('eye_wear'))
	}

	getSignUpTwo = () => {
        gtag('event', '2step', {'event_category': '2step', 'event_action': 'registraciya5'}) // google metrics

        let error = 1

        error *= Validator.check(this.signup.height.value, ['required'], 'Height')
        error *= Validator.check(this.signup.weight.value, ['required'], 'Weight')
        error *= Validator.check(this.signup.eyes.value, ['required'], 'Eyes Color')
        error *= Validator.check(this.signup.eye_wear.value, ['required'], 'Eyes Wear')
        error *= Validator.check(this.signup.hair_color.value, ['required'], 'Hair Color')
        error *= Validator.check(this.signup.hair_length.value, ['required'], 'Hair Length')
        error *= Validator.check(this.signup.body_style.value, ['required'], 'Body style')

        if (error) {
            const { dispatch } = this.props
            const data = {
                height_id: this.signup.height.value,
                weight_id: this.signup.weight.value,
                body_style: this.signup.body_style.value,
                eye_wear: this.signup.eye_wear.value,
                eyes_id: this.signup.eyes.value,
                hair_color_id: this.signup.hair_color.value,
                hair_length_id: this.signup.hair_length.value,
                custom_remember_token: this.props.custom_remember_token
            }
            dispatch(sendSignUpOne(data, 5, this.props.role))
        }
        
	}

    prevStep = () => {
        const { dispatch } = this.props
        dispatch(setSignupKey('step', 0))
    }

    componentDidMount() {
        /*const el = document.getElementById('register-2step')
        if (el) {
            el.setAttribute('onclick', "ga('send', 'event', '2step', 'registraciya'); return true;")
        }*/
    }

    render() {
        const { 
        	height_id,
			weight_id,
			body_style,
			hair_color_id,
			hair_length_id,
			eyes_id,
			eye_wear,
			heights,
			weights,
			body_styles,
			hair_colors,
			hair_lengths,
			eyes_colors,
    		eyes_wears,
		} = this.props

        return (
            <form noValidate={true}>
                <Row>
                    <Col xs={12} className="text-center">
                        <h3 className="title">Appearance</h3>
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                inputRef={ref => { this.signup.height = ref }}
                                options={heightsArray(heights)}
                                value={height_id} />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                inputRef={ref => { this.signup.weight = ref }}
                                options={weightsArray(weights)}
                                value={weight_id} />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                inputRef={ref => { this.signup.body_style = ref }}
                                options={getArray(body_styles, 'Body Style')}
                                value={body_style} />
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                inputRef={ref => { this.signup.hair_color = ref }}
                                options={getArray(hair_colors, 'Hair Color')}
                                value={hair_color_id} />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                inputRef={ref => { this.signup.hair_length = ref }}
                                options={getArray(hair_lengths, 'Hair Length')}
                                value={hair_length_id} />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                inputRef={ref => { this.signup.eyes = ref }}
                                options={getArray(eyes_colors, 'Eye Color')}
                                value={eyes_id} />
                        </FormGroup>
                         <FormGroup>
                            <SelectField
                                inputRef={ref => { this.signup.eye_wear = ref }}
                                options={getArray(eyes_wears, 'Eye wear')}
                                value={eye_wear} />
                        </FormGroup>
                    </Col>
                    <Col xs={12} className="text-center">
                        <div className="position-relative">
                            <BtnSignUp
                                text="Prev"
                                orientation="left"
                                onClick={this.prevStep} />
                            <BtnSignUp
                                id="register-2step"
                                text="Next"
                                orientation="right"
                                onClick={this.getSignUpTwo} />
                        </div>
                    </Col>
                </Row>
            </form>
        )
    }
}

const mapStateToProps = state =>
	({
	    height_id: state.signup.data.height_id,
		weight_id: state.signup.data.weight_id,
		body_style: state.signup.data.body_style,
		hair_color_id: state.signup.data.hair_color_id,
		hair_length_id: state.signup.data.hair_length_id,
		eyes_id: state.signup.data.eyes_id,
		eye_wear: state.signup.data.eye_wear,
		heights: state.options.height,
		weights: state.options.weight,
		body_styles: state.options.body_style,
		hair_colors: state.options.hair_colors,
		hair_lengths: state.options.hair_lengths,
		eyes_colors: state.options.eyes,
		eyes_wears: state.options.eye_wear,
		custom_remember_token: state.signup.custom_remember_token,
		role: state.signup.data.role
	})

export default connect(mapStateToProps)(StepOneGirl)