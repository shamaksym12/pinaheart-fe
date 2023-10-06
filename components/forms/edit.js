import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, FormGroup } from 'react-bootstrap'
import TextField from '../inputs/text_field'
import SelectField from '../inputs/select_field'
import BtnMain from '../buttons/btn_main'
import Autocomplete from '../inputs/autocomplete'
import SmallDivider from '../list/small_divider'
import { monthArray, dayArray, yearArray, heightsArray, weightsArray, getNumArray, getArray, formatDate } from '../../utils'
import { getOptions, setAlert } from '../../actions/ui'
import Block from '../block'
import Validator from '../../validate'
import { updateUser, setUserInfo } from '../../actions/user'

class Edit extends Component {
	constructor(props) {
		super(props)
		const { dispatch } = props
		this.user = {
			birth: {},
			match: {},
		}

		this.interests = []

        this.USState = ''

		this.state = {
            languages: props.data.languages,
            current_lang: '',
            current_level: '',
            childrens: props.data.about_children,
            children: props.data.children.id === 2 ? 2 : (props.data.children.id ? 1 : ''),
            current_childSex: '',
            current_childBirth: '',
            country: props.data.country.country_code,
            interests: [],
        }

        dispatch(getOptions('countries'))
        dispatch(getOptions('height'))
        dispatch(getOptions('weight'))
        dispatch(getOptions('body_style'))
		dispatch(getOptions('ethnicities'))
		dispatch(getOptions('eyes'))
        dispatch(getOptions('eye_wear'))
		dispatch(getOptions('hair_lengths'))
        dispatch(getOptions('hair_colors'))
        dispatch(getOptions('marital_statuses'))
        dispatch(getOptions('religions'))
		dispatch(getOptions('want_children'))
		dispatch(getOptions('smoke'))
        dispatch(getOptions('drink'))
		dispatch(getOptions('children'))
		dispatch(getOptions('primary_language'))
        dispatch(getOptions('language_level'))
        dispatch(getOptions('field_of_work'))
        dispatch(getOptions('employment_status'))
        dispatch(getOptions('education'))
		dispatch(getOptions('living_situation'))
		dispatch(getOptions('interests'))
	}

	save = () => {
		let error = 1
		const { dispatch } = this.props
		const { role } = this.props.data

		if (this.state.children !== 2 && role === 'girl') {
            if (this.user.children) {
                error *= Validator.check(this.user.children.value, ['required'], 'Children')
            } else {
                dispatch(setAlert('About Children is requared', 'error'))
                error = 0
            }
            
            if (this.state.childrens.length < 1 && error) {
                dispatch(setAlert('About Children is requared', 'error'))
                error = 0
            }
        } else if (this.state.children !== 2 && role === 'girl') {
            dispatch(setAlert('About Children is requared', 'error'))
            error = 0
        }

        for (var k in this.user.birth) {
            if (error) {
                error *= Validator.check(this.user.birth[k].value, ['required'], 'Birthday')
            }
        }

        error *= Validator.check(this.user.first_name.value, ['required', 'string', 'alphabet'], 'First Name')
        error *= Validator.check(this.user.last_name.value, ['required', 'string', 'alphabet'], 'Last Name')
        error *= Validator.check(this.user.country.value, ['required'], 'Country')
        error *= Validator.check(this.user.city.value, ['required'], 'City')

        if (role === 'girl') {
            for (var k in this.user.match) {
                if (error) {
                    error *= Validator.check(this.user.match[k].value, ['required'], 'Future Partner')
                }
            }
            error *= Validator.check(this.user.first_name.value, ['required', 'string', 'alphabet'], 'First Name')
            error *= Validator.check(this.user.height.value, ['required'], 'Height')
            error *= Validator.check(this.user.weight.value, ['required'], 'Weight')
            error *= Validator.check(this.user.body_style.value, ['required'], 'Body Style')
            error *= Validator.check(this.user.hair_color.value, ['required'], 'Hair Color')
            error *= Validator.check(this.user.hair_length.value, ['required'], 'Hair Length')
            error *= Validator.check(this.user.eye_wear.value, ['required'], 'Eye Wear')
            error *= Validator.check(this.user.marital.value, ['required'], 'Marital Status')
            error *= Validator.check(this.user.religion.value, ['required'], 'Religion')
            error *= Validator.check(this.user.smoke.value, ['required'], 'Smoke')
            error *= Validator.check(this.user.drink.value, ['required'], 'Drink')
            error *= Validator.check(this.user.want_children.value, ['required'], 'Want Children')
            error *= Validator.check(this.user.education.value, ['required'], 'Education')
            error *= Validator.check(this.user.living_situation.value, ['required'], 'Living Situation')
            error *= Validator.check(this.user.field_of_work.value, ['required'], 'Field Of Work')
            error *= Validator.check(this.user.employment_status.value, ['required'], 'Employment Status')

            if (this.interests.length < 5) {
	            dispatch(setAlert('Pick at least 5 interest', 'error'))
	            error = 0
	        }
        }

        if (error) {
        	const data = {
                first_name: this.user.first_name.value,
                last_name: this.user.last_name.value,
                birth: {
                    month: this.user.birth.month.value,
                    day: this.user.birth.day.value,
                    year: this.user.birth.year.value
                },
                country: this.user.country.value,
                city: this.user.city.value,
                state: this.user.country.value === 'US' ? this.USState : '',
                height_id: this.user.height.value,
                weight_id: this.user.weight.value,
                body_style: this.user.body_style.value,
                ethnicity_id: role === 'client' ? this.user.ethnicity.value : '',
                hair_color_id: this.user.hair_color.value,
                hair_length_id: this.user.hair_length.value,
                eyes_id: this.user.eyes.value,
                eye_wear: this.user.eye_wear.value,
                marital_status_id: this.user.marital.value,
                religion_id: this.user.religion.value,
                smoke_id: this.user.smoke.value,
                drink_id: this.user.drink.value,
                children: this.state.children === 2 ? this.state.children : (this.user.children ? this.user.children.value : ''),
                about_children: this.state.childrens,
                want_children_id: this.user.want_children.value,
                languages: this.state.languages,
                match: {
                    from: this.user.match.from.value,
                    to: this.user.match.to.value
                },
                education_id: this.user.education.value,
                living_situation: this.user.living_situation.value,
                field_of_work: this.user.field_of_work.value,
                employment_status: this.user.employment_status.value,
                interest_id: this.interests,
            }
            dispatch(updateUser(data))
        }
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.data.languages !== this.state.languages) {
			this.setState({languages: nextProps.data.languages})
		}

		if (nextProps.data.about_children !== this.state.childrens) {
			this.setState({childrens: nextProps.data.about_children})
		}

		if (nextProps.data.children.id && !this.state.children) {
			this.setState({children: nextProps.data.children.id === 2 ? 2 : (nextProps.data.children.id ? 1 : '')})
		}

		if (nextProps.data.country.country_code !== this.state.country) {
			this.setState({country: nextProps.data.country.country_code})
		}

		if (nextProps.data.interests !== this.state.interests) {
            this.setState({interests: nextProps.data.interests})
            this.interests = nextProps.data.interests
		}
	}

	getArrayCountries = array => {
        const temp = array.map(item => ({value: item.country_code, name: item.country_name}))
        return [{ 'value': '', 'name': 'Choose Country' }, ...temp]
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
        	this.setState({current_lang: '', current_level: ''})
        })

        this.user.languages.value = ''
        this.user.languages_level.value = ''
    }

    removeLanguages = index => e => {
        const languages = this.state.languages.filter((item, i) => i !== index)
        this.setState({languages})
    }

    printLanguages = (item, i) => {
        const lang = this.props.primary_language.length ? this.props.primary_language.find(row => row.id === item.lang * 1).value : ''
        const level = this.props.language_level.length ? this.props.language_level.find(row => row.id === item.level * 1).value : ''
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

    setChildren = val => {
        this.setState({children: val * 1})
    }

    changeChildSex = val => {
        this.setState({current_childSex: val})
    }

    changeChildBirth = val => {
        this.setState({current_childBirth: val})
        const digits = formatDate(val)
        this.user.childYear.value = digits

        if (digits && digits.length >= 10) {
            this.setState({
                childrens: [...this.state.childrens, {sex: this.state.current_childSex, birth: val}],
                current_childSex: '',
                current_childBirth: ''
            })
            this.user.childYear.value = ''
            this.user.childSex.value = ''
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

    toggleInterest = (id, value) => {
    	if (value) {
            this.interests.push(id)
        } else {
            this.interests = this.interests.filter(item => item !== id)
        }
        this.setState({interests: this.interests})
    }

    isInterest = id => {
    	return this.props.data.interests.includes(id)
    }

    printInterest = (interest, i) => {
        return  <Col lg={3} md={4} sm={6} xs={12} className="text-center ethniticy-block" key={i}>
                    <Block text={interest.value} value={interest.id} onChange={this.toggleInterest} active={this.isInterest(interest.id)} />
                </Col>
    }

    handleCountryChange = val => {
        const { dispatch } = this.props
        dispatch(setUserInfo({country: {country_code: val}}))
        this.user.city.value = ''
    }

    setUSState = val => {
        this.USState = val
    }

    render() {
    	const {
    		data,
    		countries,
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
			children,
			interests,
			living_situations,
			education,
			primary_language,
			language_level,
			field_of_works,
			employment_statuses,
    	} = this.props
        
        return (
            <div className={data.role}>
    			<Row>
    				<Col sm={12}>
                        <FormGroup>
                            <SmallDivider text="Main Information" />
                        </FormGroup>
                        <div>
                            <Row>
                                <Col sm={6}>
                					<FormGroup>
                		                <TextField
                		                    placeholder="First Name"
                		                    inputRef={ref => { this.user.first_name = ref }}
                		                    value={data.first_name}
                		                    name="First Name"
                		                    label />
                		            </FormGroup>
                		            <FormGroup>
                		                <TextField
                		                    placeholder="Last Name"
                		                    inputRef={ref => { this.user.last_name = ref }}
                		                    name="Last Name"
                		                    value={data.last_name}
                		                    label />
                		            </FormGroup>
                                </Col>
                                <Col sm={6}>
                                    <FormGroup>
                                        <Row>
                                            <Col sm={4}>
                                                <SelectField
                                                    inputRef={ref => { this.user.birth.month = ref }}
                                                    options={monthArray()}
                                                    value={data.birth.month}
                                                    label={true}
                                                    placeholder="Birthday" />
                                            </Col>
                                            <Col sm={4}>
                                                <SelectField
                                                    inputRef={ref => { this.user.birth.day = ref }}
                                                    options={dayArray()}
                                                    value={data.birth.day}
                                                    label={true}
                                                    placeholder={<span>&nbsp;</span>} />
                                            </Col>
                                            <Col sm={4}>
                                                <SelectField
                                                    inputRef={ref => { this.user.birth.year = ref }}
                                                    options={yearArray()}
                                                    value={data.birth.year}
                                                    label={true}
                                                    placeholder={<span>&nbsp;</span>} />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <SelectField
                                            inputRef={ref => { this.user.country = ref }}
                                            options={this.getArrayCountries(countries)}
                                            value={data.country.country_code}
                                            onChange={this.handleCountryChange}
                                            name="country"
                                            label={true}
                                            placeholder="Country" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Autocomplete 
                                            inputRef={ref => { this.user.city = ref }}
                                            placeholder="City"
                                            value={data.city}
                                            setUSState={this.setUSState}
                                            country={data.country.country_code}
                                            label={true} />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
    	            </Col>
    	            <Col sm={12}>
                        <FormGroup>
                            <SmallDivider text="Appearance" />
                        </FormGroup>
                        <div>
                            <Row>
                                <Col sm={6}>
                                    <FormGroup>
                                        <SelectField
                                            inputRef={ref => { this.user.height = ref }}
                                            options={heightsArray(heights)}
                                            value={data.height.id}
                                            label={true}
                                            placeholder="Height" />
                                    </FormGroup>
                                    <FormGroup>
                                        <SelectField
                                            inputRef={ref => { this.user.weight = ref }}
                                            options={weightsArray(weights)}
                                            value={data.weight.id}
                                            label={true}
                                            placeholder="Weight" />
                                    </FormGroup>
                                    <FormGroup>
                                        <SelectField
                                            inputRef={ref => { this.user.body_style = ref }}
                                            options={getArray(body_styles, 'Body Style')}
                                            value={data.body_style.id}
                                            label={true}
                                            placeholder="Body style" />
                                    </FormGroup>
                                    {
                                        data.role === 'client'
                                        ?   <FormGroup>
                                                <SelectField
                                                    inputRef={ref => { this.user.ethnicity = ref }}
                                                    options={getArray(ethnicities, 'Ethnicity')}
                                                    value={data.ethnicity.id}
                                                    label={true}
                                                    placeholder="Ethnicity" />
                                            </FormGroup>
                                        :   null
                                    }
                                </Col>
                                <Col sm={6}>
                                    <FormGroup>
                                        <SelectField
                                            inputRef={ref => { this.user.hair_color = ref }}
                                            options={getArray(hair_colors, 'Hair Color')}
                                            value={data.hair_color.id}
                                            label={true}
                                            placeholder="Hair Color" />
                                    </FormGroup>
                                    <FormGroup>
                                        <SelectField
                                            inputRef={ref => { this.user.hair_length = ref }}
                                            options={getArray(hair_lengths, 'Hair Length')}
                                            value={data.hair_length.id}
                                            label={true}
                                            placeholder="Hair Length" />
                                    </FormGroup>
                                    <FormGroup>
                                        <SelectField
                                            inputRef={ref => { this.user.eyes = ref }}
                                            options={getArray(eyes_colors, 'Eye Color')}
                                            value={data.eyes.id}
                                            label={true}
                                            placeholder="Eyes Color" />
                                    </FormGroup>
                                    <FormGroup>
                                        <SelectField
                                            inputRef={ref => { this.user.eye_wear = ref }}
                                            options={getArray(eyes_wears, 'Eye wear')}
                                            value={data.eye_wear.id}
                                            label={true}
                                            placeholder="Eye Wear" />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
    	            </Col>
                    <Col sm={12}>
                        <FormGroup>
                            <SmallDivider text="Lifestyle" />
                        </FormGroup>
                        <div>
                            <Row>
                                <Col sm={6}>
                                    <FormGroup>
                                        <SelectField
                                            inputRef={ref => { this.user.marital = ref }}
                                            options={getArray(marital_statuses, 'Marital Status')}
                                            value={data.marital_status.id}
                                            label={true}
                                            placeholder="Marital Status" />
                                    </FormGroup>
                                    <FormGroup>
                                        <SelectField
                                            inputRef={ref => { this.user.religion = ref }}
                                            options={getArray(religions, 'Religion')}
                                            value={data.religion.id}
                                            label={true}
                                            placeholder="Religion" />
                                    </FormGroup>
                                    <FormGroup>
                                        <SelectField
                                            inputRef={ref => { this.user.smoke = ref }}
                                            options={getArray(smoke, 'Smoke')}
                                            value={data.smoke.id}
                                            label={true}
                                            placeholder="Smoke" />
                                    </FormGroup>
                                    <FormGroup>
                                        <SelectField
                                            inputRef={ref => { this.user.drink = ref }}
                                            options={getArray(drink, 'Drink')}
                                            value={data.drink.id}
                                            label={true}
                                            placeholder="Drink" />
                                    </FormGroup>
                                </Col>
                                <Col sm={6}>
                                   <FormGroup>
                                        <SelectField
                                            label={true}
                                            placeholder="Children"
                                            inputRef={ref => { this.user.children_yes_no = ref }}
                                            options={[{value: '', name: 'Do you have children?'}, {value: 1, name: 'Yes'}, {value: 2, name: 'No'}]}
                                            name="children"
                                            onChange={this.setChildren}
                                            value={data.children.id === 2 ? 2 : (data.children.id ? 1 : '')} />
                                    </FormGroup>
                                    {
                                        this.state.children === 1
                                        ?   <div>
                                                <FormGroup>
                                                    <SelectField  
                                                        componentClass="select"
                                                        inputRef={ref => { this.user.children = ref }}
                                                        options={getArray(children, 'About Children')}
                                                        value={data.children.id} />
                                                </FormGroup>
                                                <FormGroup>
                                                    {this.state.childrens.map((item, i) => this.printChildrens(item, i))}                                                </FormGroup>
                                                    {
                                                        this.state.childrens.length < 3
                                                        ?   <FormGroup>
                                                                <Row style={{marginBottom: -8}}>
                                                                    <Col sm={6}>
                                                                        <SelectField
                                                                            inputRef={ref => { this.user.childSex = ref }}
                                                                            onChange={this.changeChildSex}
                                                                            name="children"
                                                                            options={[{value: '', name: 'Sex'}, {value: 'male', name: 'Male'}, {value: 'female', name: 'Female'}]}
                                                                            value={this.state.current_childSex} />
                                                                    </Col>
                                                                    <Col sm={6}>
                                                                        <TextField
				                                                        	inputRef={ref => { this.user.childYear = ref }}
									                                        disabled={this.state.current_childSex === ''}
			                                                                placeholder="DD/MM/YYYY" 
			                                                                onChange={this.changeChildBirth}
			                                                                value={this.state.current_childBirth} />
                                                                    </Col>
                                                                </Row>
                                                            </FormGroup>
                                                        : null
                                                    }
                                            </div>
                                        :   null
                                    }
                                    <FormGroup>
                                        <Row>
                                            <Col sm={6}>
                                                <SelectField
			                                        inputRef={ref => { this.user.match.from = ref }}
			                                        options={getNumArray('from', 18, 55)}
			                                        value={data.match.from} />
                                            </Col>
                                            <Col sm={6}>
                                                <SelectField
			                                        inputRef={ref => { this.user.match.to = ref }}
			                                        options={getNumArray('to', 55, 18)}
			                                        value={data.match.to} />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <SelectField
                                            inputRef={ref => { this.user.want_children = ref }}
                                            options={getArray(want_children, 'Want Children')}
                                            value={data.want_children.id}
                                            placeholder="Want Children"
                                            label={true} />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col sm={12}>
                        <FormGroup>
                            <SmallDivider text="Work and background" />
                        </FormGroup>
                        <div>
                            <Row>
                                <Col sm={6}>
                                    <FormGroup>
                                        <SelectField
                                            inputRef={ref => { this.user.living_situation = ref }}
                                            options={getArray(living_situations, 'Living Situation')}
                                            value={data.living_situation.id}
                                            placeholder="Living Situation"
                                            label={true} />
                                    </FormGroup>
                                    <FormGroup>
                                        <SelectField
                                            inputRef={ref => { this.user.education = ref }}
                                            options={getArray(education, 'Education')}
                                            value={data.education.id}
                                            placeholder="Education"
                                            label={true} />
                                    </FormGroup>
                                    <FormGroup>
                                        {this.state.languages.map((item, i) => this.printLanguages(item, i))}
                                    </FormGroup>
                                    {
                                        this.state.languages.length < 5
                                        ?   <FormGroup>
                                                <Row>
                                                    <Col xs={6}>
                                                        <SelectField
                                                            inputRef={ref => { this.user.languages = ref }}
                                                            options={getArray(primary_language, 'Language')}
                                                            onChange={this.setLanguage}
                                                            value={this.state.current_lang}
                                                            name="language" />
                                                    </Col>
                                                    <Col xs={6}>
                                                        <SelectField
                                                            inputRef={ref => { this.user.languages_level = ref }}
                                                            options={getArray(language_level, 'Level')}
                                                            onChange={this.setLanguageLevel}
                                                            value={this.state.current_level}
                                                            name="language_level" />
                                                    </Col>
                                                </Row>
                                            </FormGroup>
                                        :   null
                                    } 
                                </Col>
                                <Col sm={6}>
                                    <FormGroup>
                                        <SelectField
                                            inputRef={ref => { this.user.field_of_work = ref }}
                                            options={getArray(field_of_works, 'Field of work')}
                                            value={data.field_of_work.id}
                                            placeholder="Field of work"
                                            label={true} />
                                    </FormGroup>
                                    <FormGroup>
                                        <SelectField
                                            inputRef={ref => { this.user.employment_status = ref }}
                                            options={getArray(employment_statuses, 'Employment Status')}
                                            value={data.employment_status.id}
                                            placeholder="Employment Status"
                                            label={true} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <SmallDivider text="interests" />
                            </FormGroup>
                            <FormGroup>
                                <Row><Col sm={12}>{interests.map((interest, i) => this.printInterest(interest, i))}</Col></Row>
                            </FormGroup>
                        </div>
                        <FormGroup className="text-right">
                            <BtnMain
                                bsStyle="success"
                                text="Save"
                                onClick={this.save} />
                        </FormGroup>
                    </Col>
    			</Row>
            </div>
        )
    }
}

const mapStateToProps = state =>
	({
	    data: state.user.data,
	    countries: state.options.countries,
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
		interests: state.options.interests,
		primary_language: state.options.primary_language,
		language_level: state.options.language_level,
		living_situations: state.options.living_situation,
		education: state.options.education,
		field_of_works: state.options.field_of_work,
		employment_statuses: state.options.employment_status,
	})

export default connect(
    mapStateToProps
)(Edit)