import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, Row, Col } from 'react-bootstrap'
import SelectField from '../inputs/select_field'
import BtnSignUp from '../buttons/btn_signup'
import TextField from '../inputs/text_field'
import { getOptions } from '../../actions/ui'
import { setSignupKey, sendSignUpOne, skipStep } from '../../actions/signup'
import { getArray, heightsArray, weightsArray, formatDate, getNumArray } from '../../utils'

let state = {
    childrens: [],
    current_lang: '',
    current_level: '',
    children: '',
    current_childSex: '',
    current_childBirth: ''
}

class StepOneClient extends Component {
    constructor(props) {
        super(props)
        this.signup = {match: {}}
        this.state = state
        const { dispatch } = this.props
        dispatch(getOptions('height'))
        dispatch(getOptions('weight'))
        dispatch(getOptions('body_style'))
        dispatch(getOptions('eyes'))
        dispatch(getOptions('eye_wear'))
        dispatch(getOptions('hair_lengths'))
        dispatch(getOptions('hair_colors'))
        dispatch(getOptions('ethnicities'))
        dispatch(getOptions('religions'))
        dispatch(getOptions('marital_statuses'))
        dispatch(getOptions('want_children'))
        dispatch(getOptions('smoke'))
        dispatch(getOptions('drink'))
        dispatch(getOptions('children'))
    }

    setChildren = val => {
        this.setState({children: val * 1})
    }

    changeChildSex = val => {
        this.setState({current_childSex: val})
    }

    changeChildBirth = val => {
        this.setState({current_childBirth: val})
        const digits = formatDate(val)
        this.signup.childYear.value = digits

        if (digits && digits.length >= 10) {
            this.setState({
                childrens: [...this.state.childrens, {sex: this.state.current_childSex, birth: val}],
                current_childSex: '',
                current_childBirth: ''
            })
            this.signup.childYear.value = ''
            this.signup.childSex.value = ''
        }
    }

    removeChildrens = index => e => {
        const childrens = this.state.childrens.filter((item, i) => i !== index)
        this.setState({childrens})
    }

    printChildrens = (item, i) => {
        return  <div key={i} className="position-relative font-bebas">
                    <div className="row">
                        <div className="col-xs-6">
                            <span className="text-capitalize">{item.sex}</span>
                        </div>
                        <div className="col-xs-6">
                            <span>{item.birth}</span>
                        </div>
                    </div>
                    <i className="fas fa-times pull-right remove-languages" onClick={this.removeChildrens(i)}></i>
                    <hr style={{marginTop: 5}} />
                </div>
    }

    getSignUpTwo = () => {
        gtag('event', '2step', {'event_category': '2step', 'event_action': 'registraciya5'}) // google metrics
        
    	const { dispatch } = this.props
    	const data = {
    		height_id: this.signup.height.value,
            weight_id: this.signup.weight.value,
            body_style: this.signup.body_style.value,
            eyes_id: this.signup.eyes.value,
            eye_wear: this.signup.eye_wear.value,
            hair_color_id: this.signup.hair_color.value,
            hair_length_id: this.signup.hair_length.value,
            ethnicity_id: this.signup.ethnicity.value,
            marital_status_id: this.signup.marital.value,
            children: this.state.children === 2 ? this.state.children : (this.signup.children ? this.signup.children.value : ''),
            about_children: this.state.childrens,
            smoke_id: this.signup.smoke.value,
            drink_id: this.signup.drink.value,
            want_children_id: this.signup.want_children.value,
            religion_id: this.signup.religion.value,
            match: {
                from: this.signup.match.from.value,
                to: this.signup.match.to.value
            },
            custom_remember_token: this.props.custom_remember_token
    	}
    	dispatch(sendSignUpOne(data, 7, this.props.data.role))
    }

    prevStep = () => {
    	const { dispatch } = this.props
    	dispatch(setSignupKey('step', 0))
    }

    skip = () => {
    	const { dispatch } = this.props
        dispatch(skipStep(2, this.props.custom_remember_token))
        dispatch(setSignupKey('step', 7))
    }

    componentWillUnmount() {
        state = this.state
    }

    componentDidMount() {
        /*const el = document.getElementById('register-2step')
        if (el) {
            el.setAttribute('onclick', "ga('send', 'event', '2step', 'registraciya'); return true;")
        }*/
    }

    render() {
    	const {
    		data,
    		heights,
    		weights,
    		body_styles,
    		eyes_colors,
    		eyes_wears,
    		hair_colors,
    		hair_lengths,
    		ethnicities,
    		religions,
    		marital_statuses,
    		want_children,
    		smoke,
    		drink,
    		children
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
                                value={data.height_id} />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                inputRef={ref => { this.signup.weight = ref }}
                                options={weightsArray(weights)}
                                value={data.weight_id} />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                inputRef={ref => { this.signup.body_style = ref }}
                                options={getArray(body_styles, 'Body Style')}
                                value={data.body_style} />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                inputRef={ref => { this.signup.eyes = ref }}
                                options={getArray(eyes_colors, 'Eye Color')}
                                value={data.eyes_id} />
                        </FormGroup>
                         <FormGroup>
                            <SelectField
                                inputRef={ref => { this.signup.eye_wear = ref }}
                                options={getArray(eyes_wears, 'Eye wear')}
                                value={data.eye_wear} />
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                inputRef={ref => { this.signup.hair_color = ref }}
                                options={getArray(hair_colors, 'Hair Color')}
                                value={data.hair_color_id} />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                inputRef={ref => { this.signup.hair_length = ref }}
                                options={getArray(hair_lengths, 'Hair Length')}
                                value={data.hair_length_id} />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                inputRef={ref => { this.signup.ethnicity = ref }}
                                options={getArray(ethnicities, 'Ethnicity')}
                                value={data.ethnicity_id} />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                inputRef={ref => { this.signup.religion = ref }}
                                options={getArray(religions, 'Religion')}
                                value={data.religion_id} />
                        </FormGroup>
                    </Col>
                    <Col xs={12} className="text-center">
                        <h3 className="title">Lifestyle</h3>
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                inputRef={ref => { this.signup.marital = ref }}
                                options={getArray(marital_statuses, 'Marital Status')}
                                value={data.marital_status_id} />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                inputRef={ref => { this.signup.children_yes_no = ref }}
                                options={[{value: '', name: 'Do you have children?'}, {value: 1, name: 'Yes'}, {value: 2, name: 'No'}]}
                                name="children"
                                onChange={this.setChildren}
                                value={this.state.children} />
                        </FormGroup>
                        {
                            this.state.children === 1
                            &&  <div>
                                    <FormGroup>
                                        <SelectField
                                            inputRef={ref => { this.signup.children = ref }}
                                            options={getArray(children, 'About Children')}
                                            value={data.children} />
                                    </FormGroup>
                                    <FormGroup>
                                        {this.state.childrens.map((item, i) => this.printChildrens(item, i))}
                                    </FormGroup>
                                        {
                                            this.state.childrens.length < 3
                                            &&  <FormGroup>
                                                    <Row style={{marginBottom: -8}}>
                                                        <Col sm={6}>
                                                            <SelectField
                                                                inputRef={ref => { this.signup.childSex = ref }}
                                                                onChange={this.changeChildSex}
                                                                name="children"
                                                                options={[{value: '', name: 'Sex'}, {value: 'male', name: 'Male'}, {value: 'female', name: 'Female'}]}
                                                                value={this.state.current_childSex} />
                                                        </Col>
                                                        <Col sm={6}>
	                                                        <TextField
	                                                        	inputRef={ref => { this.signup.childYear = ref }}
						                                        disabled={this.state.current_childSex === ''}
                                                                placeholder="DD/MM/YYYY" 
                                                                onChange={this.changeChildBirth}
                                                                value={this.state.current_childBirth} />
                                                        </Col>
                                                    </Row>
                                                </FormGroup>
                                        }
                                </div>
                        }
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                inputRef={ref => { this.signup.smoke = ref }}
                                options={getArray(smoke, 'Smoke')}
                                value={data.smoke_id} />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                inputRef={ref => { this.signup.drink = ref }}
                                options={getArray(drink, 'Drink')}
                                value={data.drink_id} />
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <Row>
                                <Col sm={4}>
                                    <span className="title font-bebas">Future Partner<br /> Preferred age</span>
                                </Col>
                                <Col sm={4}>
                                    <SelectField
                                        inputRef={ref => { this.signup.match.from = ref }}
                                        options={getNumArray('from', 18, 55)}
                                        value={data.match.from} />
                                </Col>
                                <Col sm={4}>
                                    <SelectField
                                        inputRef={ref => { this.signup.match.to = ref }}
                                        options={getNumArray('to', 55, 18)}
                                        value={data.match.to} />
                                </Col>
                            </Row>
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                inputRef={ref => { this.signup.want_children = ref }}
                                options={getArray(want_children, 'Want Children')}
                                value={data.want_children_id} />
                        </FormGroup>
                    </Col>
                    <Col xs={12} className="text-center">
                        <div className="position-relative">
                            <BtnSignUp
                                orientation="left"
                                text="Prev"
                                onClick={this.prevStep} />
                            <BtnSignUp
                                id="register-2step"
                                orientation="right"
                                text="Next"
                                onClick={this.getSignUpTwo} />
                            <a href="javascript:;" className="skip-link" onClick={this.skip}>Skip</a>
                        </div>
                    </Col>
                </Row>
            </form>
        )
    }
}

const mapStateToProps = state =>
	({
		data: state.signup.data,
		heights: state.options.height,
		weights: state.options.weight,
		body_styles: state.options.body_style,
		eyes_colors: state.options.eyes,
		eyes_wears: state.options.eye_wear,
		hair_colors: state.options.hair_colors,
		hair_lengths: state.options.hair_lengths,
		ethnicities: state.options.ethnicities,
		religions: state.options.religions,
		marital_statuses: state.options.marital_statuses,
		want_children: state.options.want_children,
		smoke: state.options.smoke,
		drink: state.options.drink,
		children: state.options.children,
		custom_remember_token: state.signup.custom_remember_token
	})

export default connect(mapStateToProps)(StepOneClient)