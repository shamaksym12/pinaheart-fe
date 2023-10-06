import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, Row, Col } from 'react-bootstrap'
import { getArray, formatDate } from '../../utils'
import { getOptions, setAlert } from '../../actions/ui'
import { sendSignUpTwo, setSignupKey } from '../../actions/signup'
import SelectField from '../inputs/select_field'
import BtnSignUp from '../buttons/btn_signup'
import Textarea from '../inputs/textarea'
import TextField from '../inputs/text_field'
import Validator from '../../validate'

let state = {
	languages: [],
    current_lang: '',
    current_level: '',
    childrens: [],
    children: '',
    current_childSex: '',
    current_childBirth: ''
}

export class StepTwoGirl extends Component {
	constructor(props) {
		super(props)
		this.signup = {}
		const { dispatch } = props
		this.state = state

		dispatch(getOptions('marital_statuses'))
		dispatch(getOptions('children'))
		dispatch(getOptions('want_children'))
		dispatch(getOptions('smoke'))
        dispatch(getOptions('drink'))
        dispatch(getOptions('religions'))
        dispatch(getOptions('education'))
        dispatch(getOptions('field_of_work'))
        dispatch(getOptions('employment_status'))
        dispatch(getOptions('living_situation'))
        dispatch(getOptions('primary_language'))
        dispatch(getOptions('language_level'))
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

    setLanguage = val => {
        this.setState({current_lang: val})
        if (this.state.current_level) {
            this.addLanguage({lang: val, level: this.state.current_level})
        }
    }

    setLanguageLevel = val => {
        this.setState({current_level: val})
        if (this.state.current_lang) {
            this.addLanguage({lang: this.state.current_lang, level: val})
        }
    }

    addLanguage = val => {
        this.setState({languages: [...this.state.languages, val]}, () => {
        	this.setState({
        		current_lang: '',
            	current_level: ''
        	})
        })

        this.signup.languages.value = ''
        this.signup.languages_level.value = ''
    }

    removeLanguages = index => e => {
        const languages = this.state.languages.filter((item, i) => i !== index)
        this.setState({languages})
    }

    printLanguages = (item, i) => {
        const lang = this.props.primary_language.find(row => row.id === item.lang * 1).value
        const level = this.props.language_level.find(row => row.id === item.level * 1).value
        return <div key={i} className="position-relative">
                    <div className="row">
                        <div className="col-xs-6">
                            <span className="font-bebas">{lang}</span>
                        </div>
                        <div className="col-xs-6">
                            <span className="font-bebas">{level}</span>
                        </div>
                    </div>
                    <i className="fas fa-times pull-right remove-languages" onClick={this.removeLanguages(i)}></i>
                    <hr style={{marginTop: 5}} />
                </div>
    }

    getSignUpThree = () => {
        gtag('event', '3step', {'event_category': '3step', 'event_action': 'registraciya6'}) // google metrics
        
        const { dispatch } = this.props
        let error = 1

        if (this.state.children === 1) {
            error *= Validator.check(this.signup.children.value, ['required'], 'About Children')
            if (this.state.childrens.length < 1 && error) {
                dispatch(setAlert('About Children is requared', 'error'))
                error = 0
            }
        } else if (this.state.children !== 2) {
            dispatch(setAlert('About Children is requared', 'error'))
            error = 0
        }

        error *= Validator.check(this.signup.marital.value, ['required'], 'Marital status')
        error *= Validator.check(this.signup.smoke.value, ['required'], 'Smoking')
        error *= Validator.check(this.signup.drink.value, ['required'], 'Drink')
        error *= Validator.check(this.signup.want_children.value, ['required'], 'Want children')
        error *= Validator.check(this.signup.about_family.value, ['required'], 'About family')
        error *= Validator.check(this.signup.education.value, ['required'], 'Education')
        error *= Validator.check(this.signup.religions.value, ['required'], 'Religions')
        error *= Validator.check(this.signup.field_of_work.value, ['required'], 'Field of work')
        error *= Validator.check(this.signup.employment_status.value, ['required'], 'Employment status')
        error *= Validator.check(this.signup.living_situation.value, ['required'], 'Living Situation')
        error *= Validator.check(this.signup.future_goals.value, ['required'], 'Future goals')
        
        if (! this.state.languages.find(item => item.lang == 1)) {
            dispatch(setAlert('English language is requared', 'error'))
            error = 0
        }
        if (! this.state.languages.find(item => item.lang == 2)) {
            dispatch(setAlert('Russian language is requared', 'error'))
            error = 0
        }

        if (error) {
            const data = {
                marital_status_id: this.signup.marital.value,
                children: this.state.children === 2 ? this.state.children : this.signup.children.value,
                about_children: this.state.childrens,
                want_children_id: this.signup.want_children.value,
                smoke_id: this.signup.smoke.value,
                drink_id: this.signup.drink.value,
                religion_id: this.signup.religions.value,
                education_id: this.signup.education.value,
                employment_status: this.signup.employment_status.value,
                living_situation: this.signup.living_situation.value,
                about_family: this.signup.about_family.value,
                field_of_work: this.signup.field_of_work.value,
                languages: this.state.languages,
                future_goals: this.signup.future_goals.value,
                custom_remember_token: this.props.custom_remember_token
            }

            dispatch(sendSignUpTwo(data, 2, this.props.role))
        }
    }

	componentWillUnmount() {
        state = this.state
    }

    componentDidMount() {
        /*const el = document.getElementById('register-3step')
        if (el) {
            el.setAttribute('onclick', "ga('send', 'event', '3step', 'registraciya'); return true;")
        }*/
    }

    prevStep = () => {
        const { dispatch } = this.props
        dispatch(setSignupKey('step', 8))
    }

    render() {
    	const {
    		marital_status_id,
			children,
			want_children_id,
			smoke_id,
			drink_id,
			about_family,
			religion_id,
			education_id,
			field_of_work,
			employment_status,
			living_situation,
			future_goals,
			marital_statuses,
			childrens,
			want_children,
			drink,
			smoke,
			religions,
			field_of_works,
			education,
			employment_statuses,
			living_situations,
			primary_language,
    		language_level,
    	} = this.props
        
        return (
            <form noValidate={true}>
                <Row>
                    <Col xs={12} className="text-center">
                        <h3 className="title">Lifestyle, education and work</h3>
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                inputRef={ref => { this.signup.marital = ref }}
                                options={getArray(marital_statuses, 'Marital Status')}
                                value={marital_status_id} />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                inputRef={ref => { this.signup.children_yes_no = ref }}
                                options={[{value: '', name: 'Do you have children?'}, {value: 1, name: 'Yes'}, {value: 2, name: 'No'}]}
                                onChange={this.setChildren}
                                value={this.state.children} />
                        </FormGroup>
                        {
                            this.state.children === 1
                            &&  <div>
                                    <FormGroup>
                                        <SelectField
                                            componentClass="select"
                                            inputRef={ref => { this.signup.children = ref }}
                                            options={getArray(childrens, 'About children')}
                                            value={children} />
                                    </FormGroup>
                                    <FormGroup>
                                        {this.state.childrens.map((item, i) => this.printChildrens(item, i))}
                                    </FormGroup>
                                        {
                                            this.state.childrens.length < 3
                                            &&   <FormGroup>
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
                        <FormGroup>
                            <SelectField
                                inputRef={ref => { this.signup.want_children = ref }}
                                options={getArray(want_children, 'Do you want children?')}
                                value={want_children_id} />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                inputRef={ref => { this.signup.smoke = ref }}
                                options={getArray(smoke, 'smoke')}
                                value={smoke_id} />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                inputRef={ref => { this.signup.drink = ref }}
                                options={getArray(drink, 'drink')}
                                value={drink_id} />
                        </FormGroup>
                        
                        <FormGroup>
                            <Textarea
                                inputRef={ref => { this.signup.about_family = ref }}
                                value={about_family}
                                placeholder="More about my family" />
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                inputRef={ref => { this.signup.religions = ref }}
                                options={getArray(religions, 'religions')}
                                value={religion_id} />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                inputRef={ref => { this.signup.education = ref }}
                                options={getArray(education, 'education')}
                                value={education_id} />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                inputRef={ref => { this.signup.field_of_work = ref }}
                                options={getArray(field_of_works, 'Field of work')}
                                value={field_of_work} />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                inputRef={ref => { this.signup.employment_status = ref }}
                                options={getArray(employment_statuses, 'employment status')}
                                value={employment_status} />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                inputRef={ref => { this.signup.living_situation = ref }}
                                options={getArray(living_situations, 'living situation')}
                                value={living_situation} />
                        </FormGroup>
                        <FormGroup>
                            {this.state.languages.map((item, i) => this.printLanguages(item, i))}
                        </FormGroup>
                        {
                            this.state.languages.length < 5
                            &&   <FormGroup>
                                    <Row>
                                        <Col xs={6}>
                                            <SelectField
                                                inputRef={ref => { this.signup.languages = ref }}
                                                options={getArray(primary_language, 'Language')}
                                                onChange={this.setLanguage}
                                                value={this.state.current_lang} />
                                        </Col>
                                        <Col xs={6}>
                                            <SelectField
                                                inputRef={ref => { this.signup.languages_level = ref }}
                                                options={getArray(language_level, 'language level')}
                                                onChange={this.setLanguageLevel}
                                                value={this.state.current_level} />
                                        </Col>
                                    </Row>
                                </FormGroup>
                        }
                        <FormGroup>
                            <Textarea
                                inputRef={ref => { this.signup.future_goals = ref }}
                                value={future_goals}
                                placeholder="My future goals" />
                        </FormGroup>
                    </Col>
                    <Col xs={12} className="text-center">
                        <div className="position-relative">
                            <BtnSignUp
                                text="Prev"
                                orientation="left"
                                onClick={this.prevStep} />
                            <BtnSignUp
                                id="register-3step"
                                text="Next"
                                orientation="right"
                                onClick={this.getSignUpThree} />
                        </div>
                    </Col>
                </Row>
            </form>
        )
    }
}

const mapStateToProps = state =>
	({
		marital_status_id: state.signup.data.marital_status_id,
		children: state.signup.data.children,
		want_children_id: state.signup.data.want_children_id,
		smoke_id: state.signup.data.smoke_id,
		drink_id: state.signup.data.drink_id,
		about_family: state.signup.data.about_family,
		religion_id: state.signup.data.religion_id,
		education_id: state.signup.data.education_id,
		field_of_work: state.signup.data.field_of_work,
		employment_status: state.signup.data.employment_status,
		living_situation: state.signup.data.living_situation,
		future_goals: state.signup.data.future_goals,
		marital_statuses: state.options.marital_statuses,
		childrens: state.options.children,
		want_children: state.options.want_children,
		smoke: state.options.smoke,
		drink: state.options.drink,
		religions: state.options.religions,
		education: state.options.education,
		field_of_works: state.options.field_of_work,
		employment_statuses: state.options.employment_status,
		living_situations: state.options.living_situation,
	   	primary_language: state.options.primary_language,
		language_level: state.options.language_level,
		custom_remember_token: state.signup.custom_remember_token,
		role: state.signup.data.role,
	})

export default connect(mapStateToProps)(StepTwoGirl)