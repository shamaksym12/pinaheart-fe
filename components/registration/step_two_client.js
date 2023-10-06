import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, Row, Col } from 'react-bootstrap'
import SelectField from '../inputs/select_field'
import BtnSignUp from '../buttons/btn_signup'
import { getOptions } from '../../actions/ui'
import { sendSignUpTwo, skipStep, setSignupKey } from '../../actions/signup'
import { getArray } from '../../utils'

let state = {
    languages: [],
    current_lang: '',
    current_level: ''
}

export class StepTwoClient extends Component {
	constructor(props) {
		super(props)
		this.signup = {}
        this.state = state

        const { dispatch } = props
        dispatch(getOptions('education'))
        dispatch(getOptions('field_of_work'))
        dispatch(getOptions('employment_status'))
        dispatch(getOptions('living_situation'))
        dispatch(getOptions('primary_language'))
        dispatch(getOptions('language_level'))
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

    getSignUpTwo = () => {
        gtag('event', '3step', {'event_category': '3step', 'event_action': 'registraciya6'}) // google metrics

        const { dispatch } = this.props
    	const data = {
            education_id: this.signup.education.value,
            living_situation: this.signup.living_situation.value,
            field_of_work: this.signup.field_of_work.value,
            employment_status: this.signup.employment_status.value,
            languages: this.state.languages,
            custom_remember_token: this.props.custom_remember_token
        }
        dispatch(sendSignUpTwo(data, 2, this.props.role))
    }

    prevStep = () => {
        const { dispatch } = this.props
        dispatch(setSignupKey('step', 1))
    }

    skip = () => {
    	const { dispatch } = this.props
        //dispatch(skipStep(3, this.props.custom_remember_token))
        dispatch(setSignupKey('step', 2))
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

    render() {
    	const { 
    		education_id,
    		field_of_work,
    		employment_status,
    		living_situation,
    		education,
    		employment_statuses,
    		living_situations,
    		primary_language,
    		language_level,
            field_of_works
    	} = this.props

        return (
            <form noValidate={true}>
                <Row>
                    <Col xs={12} className="text-center">
                        <h3 className="title">Work and background</h3>
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                inputRef={ref => { this.signup.education = ref }}
                                options={getArray(education, 'Education')}
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
                                options={getArray(employment_statuses, 'Employment Status')}
                                value={employment_status} />
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                inputRef={ref => { this.signup.living_situation = ref }}
                                options={getArray(living_situations, 'Living Situation')}
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
                                                options={getArray(language_level, 'Level')}
                                                onChange={this.setLanguageLevel}
                                                value={this.state.current_level} />
                                        </Col>
                                    </Row>
                                </FormGroup>
                        }
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
		role: state.signup.data.role,
	    education_id: state.signup.data.education_id,
		field_of_work: state.signup.data.field_of_work,
		employment_status: state.signup.data.employment_status,
		living_situation: state.signup.data.living_situation,
		education: state.options.education,
		field_of_works: state.options.field_of_work,
		employment_statuses: state.options.employment_status,
		living_situations: state.options.living_situation,
		primary_language: state.options.primary_language,
		language_level: state.options.language_level,
		custom_remember_token: state.signup.custom_remember_token,
	})

export default connect(mapStateToProps)(StepTwoClient)