import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import PrivateLayout from '../../layouts/private'
import ProfileLayout from '../../layouts/profile'
import { getOptions, getLocations, setUiKey, setAlert } from '../../actions/ui'
import { getUserFullInfo, saveProfile, saveProfileParams, setUserParams } from '../../actions/user';
import BtnMain from '../../components/buttons/btn_main'
import InputInline from '../../components/inputs/InputInline'
import { getArray, heightArray, weightArray, getArrayAge, getArrayChildren, getCounriesArrey } from '../../utils'
import _v from '../../validate'
import cn from 'classnames'
import { post, getMyCountry } from '../../api'
import { Router } from '../../routes'
import { API_URL } from '../../config'
import Autocomplete from '../../components/inputs/autocomplete'
import Head from 'next/head'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

let timeout;
let request = {};
let interval;

let controller;
let signal;

const makeJson = async (response, status) => {
	const json = await response.json()
	return Promise.resolve({ ...json, statusCode: status })
}

class Edit extends Component {
	static async getInitialProps({ query }) {
		return { type: query.slug }
	}

	componentWillReceiveProps() {
		$('[data-toggle="tooltip"]').tooltip()
	}

	state = {
		check: false,
		basics: true,
		lifestyle: true,
		appearence: true,
		about: true,
		fieldCheck: {},
		loaders: [],
		lostConnection: [],
		changed: [],
		address: '',
		select_options: []
	}

	save = () => {
		const { user, dispatch } = this.props
		const underValidate = {
			first_name: _v.check(user.first_name, ['required'], 'First Name'),
			sex: _v.check(user.sex, ['required'], 'Gender'),
			dob_day: _v.check(user.dob_day, ['required'], 'Birth'),
			dob_month: _v.check(user.dob_month, ['required'], 'Birth'),
			dob_year: _v.check(user.dob_year, ['required'], 'Birth'),
			hair_color: _v.check(user.hair_color, [], 'Hair color'),
			hair_length: _v.check(user.hair_length, [], 'Hair length'),
			eye_color: _v.check(user.eye_color, [], 'Eye color'),
			eye_wear: _v.check(user.eye_wear, [], 'Eye wear'),
			height: _v.check(user.height, ['required'], 'Height'),
			weight: _v.check(user.weight, ['required'], 'Weight'),
			body_type: _v.check(user.body_type, [], 'Body type'),
			your_ethnicity_is_mostly: _v.check(user.your_ethnicity_is_mostly, [], 'your_ethnicity_is_mostly'),
			i_consider_my_appearance_as: _v.check(user.i_consider_my_appearance_as, [], 'i_consider_my_appearance_as'),
			do_you_drink: _v.check(user.do_you_drink, ['required'], 'do_you_drink'),
			do_you_smoke: _v.check(user.do_you_smoke, ['required'], 'do_you_smoke'),
			marital_status: _v.check(user.marital_status, ['required'], 'marital_status'),
			do_you_have_children: _v.check(user.do_you_have_children, ['required'], 'do_you_have_children'),
			do_you_want_more_children: _v.check(user.do_you_want_more_children, ['required'], 'do_you_want_more_children'),
			do_you_have_pets: _v.check(user.do_you_have_pets, [], 'do_you_have_pets'),
			occupation: _v.check(user.occupation, [], 'occupation'),
			employment_status: _v.check(user.employment_status, [], 'employment_status'),
			home_type: _v.check(user.home_type, [], 'home_type'),
			living_situation: _v.check(user.living_situation, [], 'living_situation'),
			willing_to_relocate: _v.check(user.willing_to_relocate, [], 'willing_to_relocate'),
			relationship_youre_looking_for: _v.check(user.relationship_youre_looking_for, [], 'relationship_youre_looking_for'),
			nationality: _v.check(user.nationality, ['required'], 'nationality'),
			education: _v.check(user.education, ['required'], 'education'),
			english_language_ability: _v.check(user.english_language_ability, [], 'english_language_ability'),
			religion: _v.check(user.religion, [], 'religion'),
			star_sign: _v.check(user.star_sign, [], 'star_sign'),
			languages_spoken: _v.check(user.languages_spoken, [], 'languages_spoken'),
			country_id: _v.check(user.country_id, ['required'], 'country_id'),
			formatted_address: _v.check(user.formatted_address, [], 'formatted_address'),
			about: _v.check(user.about, [], 'about'),
			heading: _v.check(user.heading, [], 'heading'),
			looking: _v.check(user.looking, [], 'looking'),
		}
		if (user.do_you_have_children * 1 !== 57) {
			underValidate.number_of_children = _v.check(user.number_of_children, ['required'], 'number_of_children')
			underValidate.oldest_child = _v.check(user.oldest_child, ['required'], 'oldest_child')
			if (user.number_of_children * 1 > 1) {
				underValidate.youngest_child = _v.check(user.youngest_child, ['required'], 'youngest_child')
			}
		}

		this.setState({ check: true })

		if (_v.isValid(underValidate)) {
			setTimeout(() => {
				Router.pushRoute('/edit/match')
			}, 2000)
		} else {
			const { inValid } = this.props;
			dispatch(setAlert('Please fill in all missing fields', 'error'))
		}
	}

	handleChange = (field, value) => {
		const changed = this.state.changed
		if (!changed.includes(field)) {
			changed.push(field)
		}
		this.setState({ ...this.state, changed: changed })

		const fieldsWithTimeout = ['heading', 'about', 'looking', 'first_name'];

		const { dispatch, inValid } = this.props;
		const { fieldCheck } = this.state;
		dispatch(setUserParams({ [field]: value }))
		if (field in inValid) {
			let temp = Object.assign({}, inValid)
			delete temp[field]
			dispatch(setUiKey('inValid', temp))
		}

		if (fieldsWithTimeout.includes(field)) {
			clearTimeout(timeout)
			timeout = setTimeout(() => {
				this.sendPropertyValues(field, value)
			}, 500);
		} else {
			this.sendPropertyValues(field, value)
		}
	}

	sendPropertyValues = (field, value) => {
		const { dispatch, inValid } = this.props;
		const { fieldCheck, loaders } = this.state;
		let tempField = field
		if (field === 'place') {
			tempField = 'formatted_address'
		}
		this.setState({ loaders: [...loaders, tempField] }, () => {
			this.sendRequest(field, value)
		})
	}

	scrollToTopWindow() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}

	sendRequest = (field, value) => {
		const { fieldCheck, loaders, lostConnection } = this.state;
		let tempField = field
		if (field === 'place') {
			tempField = 'formatted_address'
		}
		if (loaders.includes(tempField)) {

			request[tempField] = new AbortController;
			fetch(`${API_URL}/profile/params`, {
				signal: request[tempField].signal,
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': `Bearer ${this.props.token}`,
				},
				body: JSON.stringify({ [field]: value })
			}).then(res => {
				const promise = makeJson(res, res.status)

				promise.then(res => {
					this.setState({
						fieldCheck: { ...fieldCheck, [tempField]: res.statusCode === 200 },
						loaders: loaders.filter(item => item !== tempField),
						lostConnection: lostConnection.filter(item => item !== tempField),
					})
				})
			})
			setTimeout(() => {
				if (request[tempField] !== undefined && loaders.includes(tempField)) {
					request[tempField].abort();
					this.setState({ lostConnection: [...lostConnection, tempField] }, () => {
						setTimeout(() => {
							this.setState({ lostConnection: lostConnection.filter(item => item !== tempField) }, () => {
								this.sendRequest(field, value)
							})
						}, 5000)
					})
				}
			}, 10000)
		}
	}

	checkField = (property) => {
		const { fieldCheck } = this.state;
		return (property in fieldCheck);
	}

	checkValid = (property) => {
		let check = false
		const { fieldCheck } = this.state;
		const { inValid } = this.props
		if ((property in fieldCheck)) {
			return fieldCheck[property]
		}
		return !(property in inValid)
	}

	checkDateValid = () => {
		return ['dob_day', 'dob_month', 'dob_year'].every(this.checkValid)
	}

	checkDateField = () => {
		return ['dob_day', 'dob_month', 'dob_year'].every(this.checkField)
	}

	handleChangeCountry = (field, data) => {
		const { dispatch } = this.props
		const { fieldCheck } = this.state
		this.handleChange(field, data.value)
		dispatch(setUserParams({ formatted_address: '' }))
		this.setState({ fieldCheck: { ...fieldCheck, formatted_address: false } })
	}

	handleChangeCity = (value) => {
		const { fieldCheck } = this.state
		const { user, dispatch } = this.props
		dispatch(setUserParams({ formatted_address: value }))
		if (user.formatted_address) {
			this.setState({ fieldCheck: { ...fieldCheck, formatted_address: false } })
		}
	}

	handleSelectCity = (value, place) => {
		const { dispatch } = this.props
		dispatch(setUserParams({ formatted_address: value }))
		this.handleChange('place', place)
	}

	handleChangeState = (field, value) => {
		const { dispatch } = this.props
		const { fieldCheck } = this.state
		dispatch(getLocations('cities', value))
		this.handleChange(field, value)
		dispatch(setUserParams({ city_id: '' }))
		this.setState({ fieldCheck: { ...fieldCheck, city_id: false } })
	}

	validBasics = () => {
		const { inValid } = this.props
		return !('dob_day' in inValid)
			&& !('dob_month' in inValid)
			&& !('dob_year' in inValid)
			&& !('first_name' in inValid)
			&& !('sex' in inValid)
			&& !('country_id' in inValid)
			&& !('state_id' in inValid)
			&& !('city_id' in inValid)
			&& !('nationality' in inValid)
			&& !('education' in inValid)
	}

	validAppearence = () => {
		const { inValid } = this.props
		return !('hair_color' in inValid)
			&& !('hair_length' in inValid)
			&& !('eye_color' in inValid)
			&& !('eye_wear' in inValid)
			&& !('height' in inValid)
			&& !('weight' in inValid)
			&& !('body_type' in inValid)
			&& !('your_ethnicity_is_mostly' in inValid)
			&& !('i_consider_my_appearance_as' in inValid)
	}

	validAbout = () => {
		const { inValid } = this.props
		return !('heading' in inValid)
			&& !('about' in inValid)
			&& !('looking' in inValid)
	}

	validLifestyle = () => {
		const { inValid } = this.props
		return !('do_you_drink' in inValid)
			&& !('do_you_smoke' in inValid)
			&& !('marital_status' in inValid)
			&& !('do_you_have_children' in inValid)
			&& !('number_of_children' in inValid)
			&& !('oldest_child' in inValid)
			&& !('youngest_child' in inValid)
			&& !('do_you_want_more_children' in inValid)
		//&& !('do_you_have_pets' in inValid)
		//&& !('occupation' in inValid)
		//&& !('employment_status' in inValid)
		//&& !('home_type' in inValid)
		//&& !('living_situation' in inValid)
		//&& !('willing_to_relocate' in inValid)
		//&& !('relationship_youre_looking_for' in inValid)
	}

	validBackgound = () => {
		const { inValid } = this.props
		return !('languages_spoken' in inValid)
			&& !('english_language_ability' in inValid)
			&& !('religion' in inValid)
			&& !('star_sign' in inValid)
	}

	initWatchHash = () => {
		window.onhashchange = () => {
			let hash = location.hash.replace('#', '')
			hash = JSON.parse(decodeURI(hash))
			if (this[hash.action]) {
				this[hash.action]();
				location.hash = '';
			}
		}
	}

	btnNextPress() {
		this.save()
	}

	componentDidMount() {
		const { dispatch } = this.props
		dispatch(getOptions()).then(options => {
			if (options) {
				var language_options = options.profile_params.languages_spoken;
				var select_options = [];
				for (var i = 0; i < language_options.length; i++) {
					var temp = {}
					temp.key = language_options[i].id;
					temp.cat = language_options[i].name;
					select_options[i] = temp;
				}
				this.setState({select_options: select_options})

				dispatch(getUserFullInfo()).then(user => {
					this.scrollToTopWindow()
					if (user) {
						this.setState({address: user.formatted_address})
						if (!user.country_id) {
							getMyCountry().then(res => {
								if (options.location_params.countries.length) {
									const country = options.location_params.countries.find(country => country.code === res.country)
									if (country) {
										this.handleChange('country_id', country.id)
									}
								}
							})
						}
					}
				})
			}
		})

		this.initWatchHash();
	}

	onChangeSelect = (values) => {
        var value = []
        if (values) {
            for (var i = 0; i < values.length; i++) {
                value[i] = '' + values[i].value
            }
        }
        
        const changed = this.state.changed
        if (!changed.includes('languages_spoken')) {
            changed.push('languages_spoken')
        }
		this.setState({ ...this.state, changed: changed })
		
		const fieldsWithTimeout = ['heading', 'about', 'looking', 'first_name'];

        const { dispatch, inValid } = this.props;
		const { fieldCheck } = this.state;
        dispatch(setUserParams({ 'languages_spoken': value }))
        if ('languages_spoken' in inValid) {
			let temp = Object.assign({}, inValid)
			delete temp['languages_spoken']
			dispatch(setUiKey('inValid', temp))
		}

		if (fieldsWithTimeout.includes('languages_spoken')) {
			clearTimeout(timeout)
			timeout = setTimeout(() => {
				this.sendPropertyValues('languages_spoken', value)
			}, 500);
		} else {
			this.sendPropertyValues('languages_spoken', value)
		}
    }

	render() {
		const { check, basics, fieldCheck, loaders, lostConnection } = this.state
		const { options, user, inValid, location_options, account_status, userObj } = this.props
		const selectedCountry = location_options.countries.find(country => country.id === user.country_id * 1) || {}
		const freePremiumUntill = userObj.free_platinum_until ? userObj.free_platinum_until.split(' ')[0].split('-').join('/') : null;

		const languages = []
        const languages_pre = []
        var k = 0
        
        if (typeof(user.languages_spoken) != 'undefined') {
            for (var i = 0; i < options.languages_spoken.length; i++) {
                var temp = {label: options.languages_spoken[i].name, value: options.languages_spoken[i].id}
                languages[i] = temp
                if (user.languages_spoken) {
                    for (var j = 0; j < user.languages_spoken.length; j++) {
                        if (options.languages_spoken[i].id == user.languages_spoken[j]){
                            languages_pre[k] = temp
                            k++
                        }
                    }
                }
            }
		}       
		console.log(languages_pre) 
		
        const animatedComponents = makeAnimated();

		let { router } = Router
		let showMsgFillFields = false

		if (router) {
			let { query } = router
			showMsgFillFields = query['show-msg-fill-fields']
		}

		var relations = []
		const old_relations = options.relationship_youre_looking_for
		if (typeof(old_relations) != 'undefined') {
			relations[0] = old_relations[old_relations.length - 1]
			for (var i = 0; i < old_relations.length - 1; i++) relations[i + 1] = old_relations[i]
		}

		return (
			<Layout page="edit_info" user_address={this.state.address}>
				<PrivateLayout>
					<ProfileLayout page="info">
						<Head>
							<title>PinaHeart.com</title>
						</Head>
						<div className="edit_info_wrap no_mobile">
							<div className="only_mobile">
								<h5 className="mobile_description">
									Try to fill in as many answers as possible. This will allow more people to find your profile.
								</h5>
								<h5 className="mobile_form_warn">
									* These field are required
								</h5>
							</div>
							<div className="fs-18 title text-align-left no_mobile">
								Edit Profile <span className="text-danger danger-text asterix-label">* Fields with asterix are required</span>
							</div>

							{
								showMsgFillFields ?
									<div key={`text-danger-message`}>
										<div className="danger-text asterix-message">
											<span className="arrow-right">
												&#8594;
											</span>
											You must fill in the minimum required fields of you profile, before you can search potential partners.
										</div>
									</div> : <div></div>
							}

							<div className="text-green no_mobile">Answer all questions below and you will find the best matches</div>

							<div className="row form-group">
								<div className="col-sm-6">
									<div className={cn('fs-18 title form-group no_mobile', { success: this.validBasics() && check, danger: !this.validBasics() && check })}>
										Your basics
										{
											account_status === 'platinum' ? <span style={{ color: '#0cf6dd' }}>Premium member</span>
												: account_status === 'free_platinum' ? <span style={{ color: '#e9e707' }}>Free Premium member till {freePremiumUntill}</span>
													: account_status === 'free_platinum_on_hold' ? <span style={{ fontSize: '12px', color: '#f17eeb' }}>Free Premin membership temporary <br /> halted for security reasons</span>
														: null
										}

										{(!this.validBasics() && check) && <span>You missed a few fields :(</span>}
									</div>
									<InputInline
										label="First Name:"
										onChange={this.handleChange}
										required={true}
										field="first_name"
										valid={this.checkValid('first_name')}
										check={(this.checkField('first_name') || this.state.changed.includes('first_name') || check) || !check && this.checkValid('first_name') && user.first_name}
										loader={loaders.includes('first_name')}
										lostConnection={lostConnection.includes('first_name')}
										value={user.first_name} />

									<InputInline
										label="I’m a:"
										type="select"
										field="sex"
										required={true}
										options={[{ id: '', name: 'Please select...' }, { id: 'M', name: 'Male' }, { id: 'F', name: 'Female' }]}
										onChange={this.handleChange}
										valid={this.checkValid('sex')}
										check={(this.checkField('sex') || this.state.changed.includes('sex') || check) || !check && this.checkValid('sex') && user.sex}
										loader={loaders.includes('sex')}
										lostConnection={lostConnection.includes('sex')}
										value={user.sex} />

									<InputInline
										onChange={this.handleChange}
										label="Date of Birth:"
										field="birth"
										required={true}
										valid={this.checkDateValid()}
										check={(this.checkDateField() || this.state.changed.includes('dob_year') || check) || !check && this.checkDateValid() && user.dob_day && user.dob_month && user.dob_year}
										lostConnection={lostConnection.includes('dob_day') || lostConnection.includes('dob_month') || lostConnection.includes('dob_year')}
										loader={loaders.includes('dob_day') || loaders.includes('dob_month') || loaders.includes('dob_year')}
										value={{ dob_day: user.dob_day, dob_month: user.dob_month, dob_year: user.dob_year }}
										type="select" />

									<InputInline
										label="Country:"
										required={true}
										onChange={this.handleChangeCountry}
										options={getCounriesArrey(location_options.countries, false)}
										check={(this.checkField('country_id') || this.state.changed.includes('country_id') || check) || !check && this.checkValid('country_id') && user.country_id}
										value={user.country_id}
										field="country_id"
										loader={loaders.includes('country_id')}
										valid={this.checkValid('country_id')}
										type="select" />
									<Autocomplete
										label="Which City, Town or Area are you living in? (be as precise as possible)"
										required={true}
										onSelect={this.handleSelectCity}
										onChange={this.handleChangeCity}
										value={user.formatted_address}
										check={(this.checkField('formatted_address') || this.state.changed.includes('formatted_address') || check) || !check && this.checkValid('formatted_address') && user.formatted_address}
										loader={loaders.includes('formatted_address')}
										field="formatted_address"
										valid={this.checkValid('formatted_address')}
										country={selectedCountry.code} />

									<InputInline
										type="select"
										required={true}
										field="nationality"
										value={user.nationality}
										options={getCounriesArrey(options.nationality, false)}
										onChange={this.handleChange}
										lostConnection={lostConnection.includes('nationality')}
										loader={loaders.includes('nationality')}
										valid={this.checkValid('nationality')}
										check={(this.checkField('nationality') || this.state.changed.includes('nationality') || check) || !check && this.checkValid('nationality') && user.nationality}
										label="Nationality:" />

									<InputInline
										type="select"
										required={true}
										field="education"
										value={user.education}
										options={getArray(options.education)}
										valid={this.checkValid('education')}
										lostConnection={lostConnection.includes('education')}
										loader={loaders.includes('education')}
										check={(this.checkField('education') || this.state.changed.includes('education') || check) || !check && this.checkValid('education') && user.education}
										onChange={this.handleChange}
										label="Education:" />

									<div className={cn('fs-18 title form-group', { success: this.validAppearence() && check, danger: !this.validAppearence() && check })}>
										Your Appearance
										{(!this.validAppearence() && check) && <span>You missed a few fields :(</span>}
									</div>

									<InputInline
										options={heightArray()}
										required={true}
										field="height"
										value={user.height}
										label="Height:"
										lostConnection={lostConnection.includes('height')}
										loader={loaders.includes('height')}
										valid={this.checkValid('height')}
										check={(this.checkField('height') || this.state.changed.includes('height') || check) || !check && this.checkValid('height') && user.height}
										onChange={this.handleChange}
										type="select" />

									<InputInline
										options={weightArray()}
										required={true}
										label="Weight:"
										field="weight"
										value={user.weight}
										lostConnection={lostConnection.includes('weight')}
										loader={loaders.includes('weight')}
										valid={this.checkValid('weight')}
										check={(this.checkField('weight') || this.state.changed.includes('weight') || check) || !check && this.checkValid('weight') && user.weight}
										onChange={this.handleChange}
										type="select" />

									<InputInline
										options={getArray(options.hair_color)}
										field="hair_color"
										label="Hair color:"
										value={user.hair_color}
										loader={loaders.includes('hair_color')}
										lostConnection={lostConnection.includes('hair_color')}
										valid={this.checkValid('hair_color')}
										check={(this.checkField('hair_color') || this.state.changed.includes('hair_color')) || !check && this.checkValid('hair_color') && user.hair_color}
										onChange={this.handleChange}
										type="select" />

									<InputInline
										options={getArray(options.hair_length)}
										field="hair_length"
										value={user.hair_length}
										label="Hair length:"
										loader={loaders.includes('hair_length')}
										lostConnection={lostConnection.includes('hair_length')}
										valid={this.checkValid('hair_length')}
										check={(this.checkField('hair_length') || this.state.changed.includes('hair_length')) || !check && this.checkValid('hair_length') && user.hair_length}
										onChange={this.handleChange}
										type="select" />

									<InputInline
										options={getArray(options.eye_color)}
										label="Eye color:"
										field="eye_color"
										value={user.eye_color}
										lostConnection={lostConnection.includes('eye_color')}
										loader={loaders.includes('eye_color')}
										valid={this.checkValid('eye_color')}
										check={(this.checkField('eye_color') || this.state.changed.includes('eye_color')) || !check && this.checkValid('eye_color') && user.eye_color}
										onChange={this.handleChange}
										type="select" />

									<InputInline
										options={getArray(options.eye_wear)}
										field="eye_wear"
										value={user.eye_wear}
										label="Eye wear:"
										lostConnection={lostConnection.includes('eye_wear')}
										loader={loaders.includes('eye_wear')}
										valid={this.checkValid('eye_wear')}
										check={(this.checkField('eye_wear') || this.state.changed.includes('eye_wear')) || !check && this.checkValid('eye_wear') && user.eye_wear}
										onChange={this.handleChange}
										type="select" />

									<InputInline
										options={getArray(options.body_type)}
										field="body_type"
										value={user.body_type}
										label="Body type:"
										lostConnection={lostConnection.includes('body_type')}
										loader={loaders.includes('body_type')}
										valid={this.checkValid('body_type')}
										check={(this.checkField('body_type') || this.state.changed.includes('body_type')) || !check && this.checkValid('body_type') && user.body_type}
										onChange={this.handleChange}
										type="select" />

									<InputInline
										options={getArray(options.your_ethnicity_is_mostly)}
										field="your_ethnicity_is_mostly"
										value={user.your_ethnicity_is_mostly}
										label="Your ethnicity is mostly:"
										lostConnection={lostConnection.includes('your_ethnicity_is_mostly')}
										loader={loaders.includes('your_ethnicity_is_mostly')}
										valid={this.checkValid('your_ethnicity_is_mostly')}
										check={(this.checkField('your_ethnicity_is_mostly') || this.state.changed.includes('your_ethnicity_is_mostly')) || !check && this.checkValid('your_ethnicity_is_mostly') && user.your_ethnicity_is_mostly}
										onChange={this.handleChange}
										type="select" />

									<InputInline
										field="i_consider_my_appearance_as"
										value={user.i_consider_my_appearance_as}
										options={getArray(options.i_consider_my_appearance_as)}
										label="I consider my appearance as:"
										loader={loaders.includes('i_consider_my_appearance_as')}
										lostConnection={lostConnection.includes('i_consider_my_appearance_as')}
										valid={this.checkValid('i_consider_my_appearance_as')}
										check={(this.checkField('i_consider_my_appearance_as') || this.state.changed.includes('i_consider_my_appearance_as')) || !check && this.checkValid('i_consider_my_appearance_as') && user.i_consider_my_appearance_as}
										onChange={this.handleChange}
										type="select" />

									<div className={cn('fs-18 title form-group', { success: this.validAbout() && check, danger: !this.validAbout() && check })}>
										About Yourself
										{(!this.validAbout() && check) && <span>You missed a few fields :(</span>}
									</div>

									<InputInline
										valid={this.checkValid('heading')}
										check={(this.checkField('heading') || this.state.changed.includes('heading')) || !check && this.checkValid('heading') && user.heading}
										value={user.heading}
										field="heading"
										loader={loaders.includes('heading')}
										lostConnection={lostConnection.includes('heading')}
										onChange={this.handleChange}
										label="Your profile heading:" />

									<InputInline
										valid={this.checkValid('about')}
										check={(this.checkField('about') || this.state.changed.includes('about')) || !check && this.checkValid('about') && user.about}
										value={user.about}
										field="about"
										loader={loaders.includes('about')}
										lostConnection={lostConnection.includes('about')}
										onChange={this.handleChange}
										label="A little about yourself:" type="textarea" />

									<InputInline
										label="What are you looking in a partner:"
										valid={this.checkValid('looking')}
										check={(this.checkField('looking') || this.state.changed.includes('looking')) || !check && this.checkValid('looking') && user.looking}
										loader={loaders.includes('looking')}
										lostConnection={lostConnection.includes('looking')}
										value={user.looking}
										field="looking"
										onChange={this.handleChange}
										type="textarea" />

								</div>
								<div className="col-sm-6">
									<div className={cn('fs-18 title form-group', { success: this.validLifestyle() && check, danger: !this.validLifestyle() && check })}>
										Your Lifestyle
										{(!this.validLifestyle() && check) && <span>You missed a few fields :(</span>}
									</div>
									<InputInline
										options={getArray(options.do_you_drink)}
										valid={this.checkValid('do_you_drink')}
										check={(this.checkField('do_you_drink') || this.state.changed.includes('do_you_drink') || check) || !check && this.checkValid('do_you_drink') && user.do_you_drink}
										loader={loaders.includes('do_you_drink')}
										lostConnection={lostConnection.includes('do_you_drink')}
										field="do_you_drink"
										value={user.do_you_drink}
										type="select"
										required={true}
										onChange={this.handleChange}
										label="Do you drink?" />

									<InputInline
										field="do_you_smoke"
										required={true}
										value={user.do_you_smoke}
										loader={loaders.includes('do_you_smoke')}
										valid={this.checkValid('do_you_smoke')}
										lostConnection={lostConnection.includes('do_you_smoke')}
										check={(this.checkField('do_you_smoke') || this.state.changed.includes('do_you_smoke') || check) || !check && this.checkValid('do_you_smoke') && user.do_you_smoke}
										options={getArray(options.do_you_smoke)}
										type="select"
										onChange={this.handleChange}
										label="Do you smoke?" />

									<InputInline
										field="marital_status"
										required={true}
										value={user.marital_status}
										lostConnection={lostConnection.includes('marital_status')}
										loader={loaders.includes('marital_status')}
										valid={this.checkValid('marital_status')}
										check={(this.checkField('marital_status') || this.state.changed.includes('marital_status') || check) || !check && this.checkValid('marital_status') && user.marital_status}
										onChange={this.handleChange}
										options={getArray(options.marital_status)}
										type="select"
										label="Marital Status:" />

									<InputInline
										field="do_you_have_children"
										required={true}
										value={user.do_you_have_children}
										lostConnection={lostConnection.includes('do_you_have_children')}
										loader={loaders.includes('do_you_have_children')}
										valid={this.checkValid('do_you_have_children')}
										check={(this.checkField('do_you_have_children') || this.state.changed.includes('do_you_have_children') || check) || !check && this.checkValid('do_you_have_children') && user.do_you_have_children}
										onChange={this.handleChange}
										options={getArray(options.do_you_have_children)}
										type="select"
										label="Do you have children?" />
									{
										(['58', '59', '60'].includes(user.do_you_have_children))
										&& <Fragment>
											<InputInline
												field="number_of_children"
												value={user.number_of_children}
												required={user.do_you_have_children * 1 !== 57}
												lostConnection={lostConnection.includes('number_of_children')}
												loader={loaders.includes('number_of_children')}
												valid={this.checkValid('number_of_children')}
												check={(this.checkField('number_of_children') || this.state.changed.includes('number_of_children') || check) || !check && user.number_of_children && this.checkValid('number_of_children') && user.number_of_children}
												onChange={this.handleChange}
												options={getArrayChildren()}
												type="select"
												label="Number of children:" />

											<InputInline
												field="oldest_child"
												required={user.do_you_have_children * 1 !== 57}
												value={user.oldest_child}
												lostConnection={lostConnection.includes('oldest_child')}
												loader={loaders.includes('oldest_child')}
												valid={this.checkValid('oldest_child')}
												check={(this.checkField('oldest_child') || this.state.changed.includes('oldest_child') || check) || !check && this.checkValid('oldest_child') && user.oldest_child}
												onChange={this.handleChange}
												options={getArrayAge()}
												type="select"
												label="Oldest child:" />
											{
												user.number_of_children * 1 > 1
												&& <InputInline
													field="youngest_child"
													value={user.youngest_child}
													required={user.number_of_children * 1 > 1}
													lostConnection={lostConnection.includes('youngest_child')}
													loader={loaders.includes('youngest_child')}
													valid={this.checkValid('youngest_child')}
													check={(this.checkField('youngest_child') || this.state.changed.includes('youngest_child') || check) || !check && this.checkValid('youngest_child') && user.youngest_child}
													onChange={this.handleChange}
													options={getArrayAge()}
													type="select"
													label="Youngest child:" />
											}
										</Fragment>
									}

									<InputInline
										field="do_you_want_more_children"
										value={user.do_you_want_more_children}
										required={true}
										onChange={this.handleChange}
										lostConnection={lostConnection.includes('do_you_want_more_children')}
										loader={loaders.includes('do_you_want_more_children')}
										valid={this.checkValid('do_you_want_more_children')}
										check={(this.checkField('do_you_want_more_children') || this.state.changed.includes('do_you_want_more_children') || check) || !check && this.checkValid('do_you_want_more_children') && user.do_you_want_more_children}
										options={getArray(options.do_you_want_more_children)}
										type="select"
										label="Do you want (more) children?" />

									<InputInline
										field="do_you_have_pets"
										value={user.do_you_have_pets}
										required={true}
										onChange={this.handleChange}
										lostConnection={lostConnection.includes('do_you_have_pets')}
										loader={loaders.includes('do_you_have_pets')}
										valid={this.checkValid('do_you_have_pets')}
										check={(this.checkField('do_you_have_pets') || this.state.changed.includes('do_you_have_pets') || check) || !check && this.checkValid('do_you_have_pets') && user.do_you_have_pets}
										options={getArray(options.do_you_have_pets)}
										type="select"
										label="Do you have pets?" />

									<InputInline
										field="occupation"
										value={user.occupation}
										options={getArray(options.occupation)}
										type="select"
										lostConnection={lostConnection.includes('occupation')}
										loader={loaders.includes('occupation')}
										valid={this.checkValid('occupation')}
										check={(this.checkField('occupation') || this.state.changed.includes('occupation')) || !check && this.checkValid('occupation') && user.occupation}
										onChange={this.handleChange}
										label="Occupation:" />

									<InputInline
										type="select"
										field="employment_status"
										value={user.employment_status}
										options={getArray(options.employment_status)}
										onChange={this.handleChange}
										lostConnection={lostConnection.includes('employment_status')}
										loader={loaders.includes('employment_status')}
										valid={this.checkValid('employment_status')}
										check={(this.checkField('employment_status') || this.state.changed.includes('employment_status')) || !check && this.checkValid('employment_status') && user.employment_status}
										label="Employment status:" />

									<InputInline
										type="select"
										value={user.home_type}
										field="home_type"
										options={getArray(options.home_type)}
										onChange={this.handleChange}
										lostConnection={lostConnection.includes('home_type')}
										loader={loaders.includes('home_type')}
										valid={this.checkValid('home_type')}
										check={(this.checkField('home_type') || this.state.changed.includes('home_type')) || !check && this.checkValid('home_type') && user.home_type}
										label="Home type:" />

									<InputInline
										type="select"
										field="living_situation"
										value={user.living_situation}
										options={getArray(options.living_situation)}
										onChange={this.handleChange}
										lostConnection={lostConnection.includes('living_situation')}
										loader={loaders.includes('living_situation')}
										valid={this.checkValid('living_situation')}
										check={(this.checkField('living_situation') || this.state.changed.includes('living_situation')) || !check && this.checkValid('living_situation') && user.living_situation}
										label="Living situation:" />

									<InputInline
										type="select"
										value={user.willing_to_relocate}
										field="willing_to_relocate"
										options={getArray(options.willing_to_relocate)}
										lostConnection={lostConnection.includes('willing_to_relocate')}
										loader={loaders.includes('willing_to_relocate')}
										valid={this.checkValid('willing_to_relocate')}
										check={(this.checkField('willing_to_relocate') || this.state.changed.includes('willing_to_relocate')) || !check && this.checkValid('willing_to_relocate') && user.willing_to_relocate}
										onChange={this.handleChange}
										label="Willing to relocate:" />

									<InputInline
										label="Relationship you’re looking for:"
										field="relationship_youre_looking_for"
										loader={loaders.includes('relationship_youre_looking_for')}
										lostConnection={lostConnection.includes('relationship_youre_looking_for')}
										value={user.relationship_youre_looking_for}
										onChange={this.handleChange}
										// options={options.relationship_youre_looking_for}
										options={relations}
										valid={this.checkValid('relationship_youre_looking_for')}
										check={(this.checkField('relationship_youre_looking_for') || this.state.changed.includes('relationship_youre_looking_for'))}
										type="multiselect" />
									<div className={cn('fs-18 title form-group', { success: this.validBackgound() && check, danger: !this.validBackgound() && check })}>
										Your Backgound/Cultural Values
										{(!this.validBackgound() && check) && <span>You missed a few fields :(</span>}
									</div>

									<InputInline
										type="select-multiple"
										valid={this.checkValid('languages_spoken')}
										check={(this.checkField('languages_spoken') || this.state.changed.includes('languages_spoken')) || !check && this.checkValid('languages_spoken') && user.languages_spoken}
										loader={loaders.includes('languages_spoken')}
										lostConnection={lostConnection.includes('languages_spoken')}
										value={user.languages_spoken}
										field="languages_spoken"
										options={getArray(options.languages_spoken)}
										onChange={this.handleChange}
										label="Language spoken:" />

									<InputInline
										type="select"
										value={user.english_language_ability}
										field="english_language_ability"
										lostConnection={lostConnection.includes('english_language_ability')}
										valid={this.checkValid('english_language_ability')}
										check={(this.checkField('english_language_ability') || this.state.changed.includes('english_language_ability')) || !check && this.checkValid('english_language_ability') && user.english_language_ability}
										loader={loaders.includes('english_language_ability')}
										options={getArray(options.english_language_ability)}
										onChange={this.handleChange}
										label="English language ability:" />

									<InputInline
										type="select"
										valid={this.checkValid('religion')}
										check={(this.checkField('religion') || this.state.changed.includes('religion')) || !check && this.checkValid('religion') && user.religion}
										loader={loaders.includes('religion')}
										lostConnection={lostConnection.includes('religion')}
										field="religion"
										value={user.religion}
										options={getArray(options.religion)}
										onChange={this.handleChange}
										label="Religion:" />

									<InputInline
										type="select"
										valid={this.checkValid('star_sign')}
										lostConnection={lostConnection.includes('star_sign')}
										check={(this.checkField('star_sign') || this.state.changed.includes('star_sign')) || !check && this.checkValid('star_sign') && user.star_sign}
										loader={loaders.includes('star_sign')}
										value={user.star_sign}
										field="star_sign"
										options={getArray(options.star_sign)}
										onChange={this.handleChange}
										label="Star sign:" />
								</div>
							</div>
							<div className="text-center" id="btn-next-match">
								<BtnMain text="Next: Match Criteria for your partner" className="btn-green" onClick={this.save} />
							</div>
						</div>
						<div className="edit_info_wrap only_mobile">
							<div className="only_mobile">
								<h6 className="mobile_description">
									Try to fill in as many answers as possible. This will allow more people to find your profile.
								</h6>
								<h6 className="mobile_form_warn">
									* These field are required
								</h6>
							</div>
							<div className="fs-18 title text-align-left no_mobile">
								Edit Profile <span className="text-danger danger-text asterix-label">* Fields with asterix are required</span>
							</div>

							{
								showMsgFillFields ?
									<div key={`text-danger-message`}>
										<div className="danger-text asterix-message">
											<span className="arrow-right">
												&#8594;
											</span>
											You must fill in the minimum required fields of you profile, before you can search potential partners.
										</div>
									</div> : <div></div>
							}

							<div className="text-green no_mobile">Answer all questions below and you will find the best matches</div>

							<div className="row form-group">
								<div className="col-sm-6">
									<div className={cn('fs-18 title form-group no_mobile', { success: this.validBasics() && check, danger: !this.validBasics() && check })}>
										Your basics
										{
											account_status === 'platinum' ? <span style={{ color: '#0cf6dd' }}>Premium member</span>
												: account_status === 'free_platinum' ? <span style={{ color: '#e9e707' }}>Free Premium member till {freePremiumUntill}</span>
													: account_status === 'free_platinum_on_hold' ? <span style={{ fontSize: '12px', color: '#f17eeb' }}>Free Premin membership temporary <br /> halted for security reasons</span>
														: null
										}

										{(!this.validBasics() && check) && <span>You missed a few fields :(</span>}
									</div>
									<InputInline
										label="First Name:"
										onChange={this.handleChange}
										required={true}
										field="first_name"
										valid={this.checkValid('first_name')}
										check={(this.checkField('first_name') || this.state.changed.includes('first_name') || check) || !check && this.checkValid('first_name') && user.first_name}
										loader={loaders.includes('first_name')}
										lostConnection={lostConnection.includes('first_name')}
										value={user.first_name} />

									<InputInline
										label="I’m a:"
										type="select"
										field="sex"
										required={true}
										options={[{ id: '', name: 'Please select...' }, { id: 'M', name: 'Male' }, { id: 'F', name: 'Female' }]}
										onChange={this.handleChange}
										valid={this.checkValid('sex')}
										check={(this.checkField('sex') || this.state.changed.includes('sex') || check) || !check && this.checkValid('sex') && user.sex}
										loader={loaders.includes('sex')}
										lostConnection={lostConnection.includes('sex')}
										value={user.sex} />

									<InputInline
										onChange={this.handleChange}
										label="Date of Birth:"
										field="birth"
										required={true}
										valid={this.checkDateValid()}
										check={(this.checkDateField() || this.state.changed.includes('dob_year') || check) || !check && this.checkDateValid() && user.dob_day && user.dob_month && user.dob_year}
										lostConnection={lostConnection.includes('dob_day') || lostConnection.includes('dob_month') || lostConnection.includes('dob_year')}
										loader={loaders.includes('dob_day') || loaders.includes('dob_month') || loaders.includes('dob_year')}
										value={{ dob_day: user.dob_day, dob_month: user.dob_month, dob_year: user.dob_year }}
										type="select" />

									<InputInline
										label="Country:"
										required={true}
										onChange={this.handleChangeCountry}
										options={getCounriesArrey(location_options.countries, false)}
										check={(this.checkField('country_id') || this.state.changed.includes('country_id') || check) || !check && this.checkValid('country_id') && user.country_id}
										value={user.country_id}
										field="country_id"
										loader={loaders.includes('country_id')}
										valid={this.checkValid('country_id')}
										type="select" />
									<Autocomplete
										label="Which City, Town or Area are you living in? (be as precise as possible)"
										required={true}
										onSelect={this.handleSelectCity}
										onChange={this.handleChangeCity}
										value={user.formatted_address}
										check={(this.checkField('formatted_address') || this.state.changed.includes('formatted_address') || check) || !check && this.checkValid('formatted_address') && user.formatted_address}
										loader={loaders.includes('formatted_address')}
										field="formatted_address"
										valid={this.checkValid('formatted_address')}
										country={selectedCountry.code} />

									<InputInline
										type="select"
										required={true}
										field="nationality"
										value={user.nationality}
										options={getCounriesArrey(options.nationality, false)}
										onChange={this.handleChange}
										lostConnection={lostConnection.includes('nationality')}
										loader={loaders.includes('nationality')}
										valid={this.checkValid('nationality')}
										check={(this.checkField('nationality') || this.state.changed.includes('nationality') || check) || !check && this.checkValid('nationality') && user.nationality}
										label="Nationality:" />

									<InputInline
										type="select"
										required={true}
										field="education"
										value={user.education}
										options={getArray(options.education)}
										valid={this.checkValid('education')}
										lostConnection={lostConnection.includes('education')}
										loader={loaders.includes('education')}
										check={(this.checkField('education') || this.state.changed.includes('education') || check) || !check && this.checkValid('education') && user.education}
										onChange={this.handleChange}
										label="Education:" />

									<InputInline
										options={heightArray()}
										required={true}
										field="height"
										value={user.height}
										label="Height:"
										lostConnection={lostConnection.includes('height')}
										loader={loaders.includes('height')}
										valid={this.checkValid('height')}
										check={(this.checkField('height') || this.state.changed.includes('height') || check) || !check && this.checkValid('height') && user.height}
										onChange={this.handleChange}
										type="select" />

									<InputInline
										options={weightArray()}
										required={true}
										label="Weight:"
										field="weight"
										value={user.weight}
										lostConnection={lostConnection.includes('weight')}
										loader={loaders.includes('weight')}
										valid={this.checkValid('weight')}
										check={(this.checkField('weight') || this.state.changed.includes('weight') || check) || !check && this.checkValid('weight') && user.weight}
										onChange={this.handleChange}
										type="select" />

									<div className={cn('fs-18 title form-group', { success: this.validLifestyle() && check, danger: !this.validLifestyle() && check })}>
										Your Lifestyle
										{(!this.validLifestyle() && check) && <span>You missed a few fields :(</span>}
									</div>

									<InputInline
										options={getArray(options.do_you_drink)}
										valid={this.checkValid('do_you_drink')}
										check={(this.checkField('do_you_drink') || this.state.changed.includes('do_you_drink') || check) || !check && this.checkValid('do_you_drink') && user.do_you_drink}
										loader={loaders.includes('do_you_drink')}
										lostConnection={lostConnection.includes('do_you_drink')}
										field="do_you_drink"
										value={user.do_you_drink}
										type="select"
										required={true}
										onChange={this.handleChange}
										label="Do you drink?" />

									<InputInline
										field="do_you_smoke"
										required={true}
										value={user.do_you_smoke}
										loader={loaders.includes('do_you_smoke')}
										valid={this.checkValid('do_you_smoke')}
										lostConnection={lostConnection.includes('do_you_smoke')}
										check={(this.checkField('do_you_smoke') || this.state.changed.includes('do_you_smoke') || check) || !check && this.checkValid('do_you_smoke') && user.do_you_smoke}
										options={getArray(options.do_you_smoke)}
										type="select"
										onChange={this.handleChange}
										label="Do you smoke?" />

									<InputInline
										field="marital_status"
										required={true}
										value={user.marital_status}
										lostConnection={lostConnection.includes('marital_status')}
										loader={loaders.includes('marital_status')}
										valid={this.checkValid('marital_status')}
										check={(this.checkField('marital_status') || this.state.changed.includes('marital_status') || check) || !check && this.checkValid('marital_status') && user.marital_status}
										onChange={this.handleChange}
										options={getArray(options.marital_status)}
										type="select"
										label="Marital Status:" />

									<InputInline
										field="do_you_have_children"
										required={true}
										value={user.do_you_have_children}
										lostConnection={lostConnection.includes('do_you_have_children')}
										loader={loaders.includes('do_you_have_children')}
										valid={this.checkValid('do_you_have_children')}
										check={(this.checkField('do_you_have_children') || this.state.changed.includes('do_you_have_children') || check) || !check && this.checkValid('do_you_have_children') && user.do_you_have_children}
										onChange={this.handleChange}
										options={getArray(options.do_you_have_children)}
										type="select"
										label="Do you have children?" />
									{
										(['58', '59', '60'].includes(user.do_you_have_children))
										&& <Fragment>
											<InputInline
												field="number_of_children"
												value={user.number_of_children}
												required={user.do_you_have_children * 1 !== 57}
												lostConnection={lostConnection.includes('number_of_children')}
												loader={loaders.includes('number_of_children')}
												valid={this.checkValid('number_of_children')}
												check={(this.checkField('number_of_children') || this.state.changed.includes('number_of_children') || check) || !check && user.number_of_children && this.checkValid('number_of_children') && user.number_of_children}
												onChange={this.handleChange}
												options={getArrayChildren()}
												type="select"
												label="Number of children:" />

											<InputInline
												field="oldest_child"
												required={user.do_you_have_children * 1 !== 57}
												value={user.oldest_child}
												lostConnection={lostConnection.includes('oldest_child')}
												loader={loaders.includes('oldest_child')}
												valid={this.checkValid('oldest_child')}
												check={(this.checkField('oldest_child') || this.state.changed.includes('oldest_child') || check) || !check && this.checkValid('oldest_child') && user.oldest_child}
												onChange={this.handleChange}
												options={getArrayAge()}
												type="select"
												label="Oldest child:" />
											{
												user.number_of_children * 1 > 1
												&& <InputInline
													field="youngest_child"
													value={user.youngest_child}
													required={user.number_of_children * 1 > 1}
													lostConnection={lostConnection.includes('youngest_child')}
													loader={loaders.includes('youngest_child')}
													valid={this.checkValid('youngest_child')}
													check={(this.checkField('youngest_child') || this.state.changed.includes('youngest_child') || check) || !check && this.checkValid('youngest_child') && user.youngest_child}
													onChange={this.handleChange}
													options={getArrayAge()}
													type="select"
													label="Youngest child:" />
											}
										</Fragment>
									}

									<InputInline
										field="do_you_want_more_children"
										value={user.do_you_want_more_children}
										required={true}
										onChange={this.handleChange}
										lostConnection={lostConnection.includes('do_you_want_more_children')}
										loader={loaders.includes('do_you_want_more_children')}
										valid={this.checkValid('do_you_want_more_children')}
										check={(this.checkField('do_you_want_more_children') || this.state.changed.includes('do_you_want_more_children') || check) || !check && this.checkValid('do_you_want_more_children') && user.do_you_want_more_children}
										options={getArray(options.do_you_want_more_children)}
										type="select"
										label="Do you want (more) children?" />

									<InputInline
										field="do_you_have_pets"
										value={user.do_you_have_pets}
										onChange={this.handleChange}
										lostConnection={lostConnection.includes('do_you_have_pets')}
										loader={loaders.includes('do_you_have_pets')}
										valid={this.checkValid('do_you_have_pets')}
										check={(this.checkField('do_you_have_pets') || this.state.changed.includes('do_you_have_pets') || check) || !check && this.checkValid('do_you_have_pets') && user.do_you_have_pets}
										options={getArray(options.do_you_have_pets)}
										type="select"
										label="Do you have pets?" />

									<InputInline
										field="occupation"
										value={user.occupation}
										options={getArray(options.occupation)}
										type="select"
										lostConnection={lostConnection.includes('occupation')}
										loader={loaders.includes('occupation')}
										valid={this.checkValid('occupation')}
										check={(this.checkField('occupation') || this.state.changed.includes('occupation')) || !check && this.checkValid('occupation') && user.occupation}
										onChange={this.handleChange}
										label="Occupation:" />

									<InputInline
										type="select"
										field="employment_status"
										value={user.employment_status}
										options={getArray(options.employment_status)}
										onChange={this.handleChange}
										lostConnection={lostConnection.includes('employment_status')}
										loader={loaders.includes('employment_status')}
										valid={this.checkValid('employment_status')}
										check={(this.checkField('employment_status') || this.state.changed.includes('employment_status')) || !check && this.checkValid('employment_status') && user.employment_status}
										label="Employment status:" />

									<InputInline
										type="select"
										value={user.home_type}
										field="home_type"
										options={getArray(options.home_type)}
										onChange={this.handleChange}
										lostConnection={lostConnection.includes('home_type')}
										loader={loaders.includes('home_type')}
										valid={this.checkValid('home_type')}
										check={(this.checkField('home_type') || this.state.changed.includes('home_type')) || !check && this.checkValid('home_type') && user.home_type}
										label="Home type:" />

									<InputInline
										type="select"
										field="living_situation"
										value={user.living_situation}
										options={getArray(options.living_situation)}
										onChange={this.handleChange}
										lostConnection={lostConnection.includes('living_situation')}
										loader={loaders.includes('living_situation')}
										valid={this.checkValid('living_situation')}
										check={(this.checkField('living_situation') || this.state.changed.includes('living_situation')) || !check && this.checkValid('living_situation') && user.living_situation}
										label="Living situation:" />

									<InputInline
										type="select"
										value={user.willing_to_relocate}
										field="willing_to_relocate"
										options={getArray(options.willing_to_relocate)}
										lostConnection={lostConnection.includes('willing_to_relocate')}
										loader={loaders.includes('willing_to_relocate')}
										valid={this.checkValid('willing_to_relocate')}
										check={(this.checkField('willing_to_relocate') || this.state.changed.includes('willing_to_relocate')) || !check && this.checkValid('willing_to_relocate') && user.willing_to_relocate}
										onChange={this.handleChange}
										label="Willing to relocate:" />

									<InputInline
										label="Relationship you’re looking for:"
										field="relationship_youre_looking_for"
										loader={loaders.includes('relationship_youre_looking_for')}
										lostConnection={lostConnection.includes('relationship_youre_looking_for')}
										value={user.relationship_youre_looking_for}
										onChange={this.handleChange}
										// options={options.relationship_youre_looking_for}
										options={relations}
										valid={this.checkValid('relationship_youre_looking_for')}
										check={(this.checkField('relationship_youre_looking_for') || this.state.changed.includes('relationship_youre_looking_for'))}
										type="multiselect" />
									

									<div className={cn('fs-18 title form-group', { success: this.validAppearence() && check, danger: !this.validAppearence() && check })}>
										Your Appearance
										{(!this.validAppearence() && check) && <span>You missed a few fields :(</span>}
									</div>

									<InputInline
										options={getArray(options.hair_color)}
										field="hair_color"
										label="Hair color:"
										value={user.hair_color}
										loader={loaders.includes('hair_color')}
										lostConnection={lostConnection.includes('hair_color')}
										valid={this.checkValid('hair_color')}
										check={(this.checkField('hair_color') || this.state.changed.includes('hair_color')) || !check && this.checkValid('hair_color') && user.hair_color}
										onChange={this.handleChange}
										type="select" />

									<InputInline
										options={getArray(options.hair_length)}
										field="hair_length"
										value={user.hair_length}
										label="Hair length:"
										loader={loaders.includes('hair_length')}
										lostConnection={lostConnection.includes('hair_length')}
										valid={this.checkValid('hair_length')}
										check={(this.checkField('hair_length') || this.state.changed.includes('hair_length')) || !check && this.checkValid('hair_length') && user.hair_length}
										onChange={this.handleChange}
										type="select" />

									<InputInline
										options={getArray(options.eye_color)}
										label="Eye color:"
										field="eye_color"
										value={user.eye_color}
										lostConnection={lostConnection.includes('eye_color')}
										loader={loaders.includes('eye_color')}
										valid={this.checkValid('eye_color')}
										check={(this.checkField('eye_color') || this.state.changed.includes('eye_color')) || !check && this.checkValid('eye_color') && user.eye_color}
										onChange={this.handleChange}
										type="select" />

									<InputInline
										options={getArray(options.eye_wear)}
										field="eye_wear"
										value={user.eye_wear}
										label="Eye wear:"
										lostConnection={lostConnection.includes('eye_wear')}
										loader={loaders.includes('eye_wear')}
										valid={this.checkValid('eye_wear')}
										check={(this.checkField('eye_wear') || this.state.changed.includes('eye_wear')) || !check && this.checkValid('eye_wear') && user.eye_wear}
										onChange={this.handleChange}
										type="select" />

									<InputInline
										options={getArray(options.body_type)}
										field="body_type"
										value={user.body_type}
										label="Body type:"
										lostConnection={lostConnection.includes('body_type')}
										loader={loaders.includes('body_type')}
										valid={this.checkValid('body_type')}
										check={(this.checkField('body_type') || this.state.changed.includes('body_type')) || !check && this.checkValid('body_type') && user.body_type}
										onChange={this.handleChange}
										type="select" />

									<InputInline
										options={getArray(options.your_ethnicity_is_mostly)}
										field="your_ethnicity_is_mostly"
										value={user.your_ethnicity_is_mostly}
										label="Your ethnicity is mostly:"
										lostConnection={lostConnection.includes('your_ethnicity_is_mostly')}
										loader={loaders.includes('your_ethnicity_is_mostly')}
										valid={this.checkValid('your_ethnicity_is_mostly')}
										check={(this.checkField('your_ethnicity_is_mostly') || this.state.changed.includes('your_ethnicity_is_mostly')) || !check && this.checkValid('your_ethnicity_is_mostly') && user.your_ethnicity_is_mostly}
										onChange={this.handleChange}
										type="select" />

									<InputInline
										field="i_consider_my_appearance_as"
										value={user.i_consider_my_appearance_as}
										options={getArray(options.i_consider_my_appearance_as)}
										label="I consider my appearance as:"
										loader={loaders.includes('i_consider_my_appearance_as')}
										lostConnection={lostConnection.includes('i_consider_my_appearance_as')}
										valid={this.checkValid('i_consider_my_appearance_as')}
										check={(this.checkField('i_consider_my_appearance_as') || this.state.changed.includes('i_consider_my_appearance_as')) || !check && this.checkValid('i_consider_my_appearance_as') && user.i_consider_my_appearance_as}
										onChange={this.handleChange}
										type="select" />

									<div className={cn('fs-18 title form-group', { success: this.validAbout() && check, danger: !this.validAbout() && check })}>
										About Yourself
										{(!this.validAbout() && check) && <span>You missed a few fields :(</span>}
									</div>

									<InputInline
										valid={this.checkValid('heading')}
										check={(this.checkField('heading') || this.state.changed.includes('heading')) || !check && this.checkValid('heading') && user.heading}
										value={user.heading}
										field="heading"
										loader={loaders.includes('heading')}
										lostConnection={lostConnection.includes('heading')}
										onChange={this.handleChange}
										label="Your profile heading:" />

									<InputInline
										valid={this.checkValid('about')}
										check={(this.checkField('about') || this.state.changed.includes('about')) || !check && this.checkValid('about') && user.about}
										value={user.about}
										field="about"
										loader={loaders.includes('about')}
										lostConnection={lostConnection.includes('about')}
										onChange={this.handleChange}
										label="A little about yourself:" type="textarea" />

									<InputInline
										label="What are you looking in a partner:"
										valid={this.checkValid('looking')}
										check={(this.checkField('looking') || this.state.changed.includes('looking')) || !check && this.checkValid('looking') && user.looking}
										loader={loaders.includes('looking')}
										lostConnection={lostConnection.includes('looking')}
										value={user.looking}
										field="looking"
										onChange={this.handleChange}
										type="textarea" />

								</div>
								<div className="col-sm-6">
									<div className={cn('fs-18 title form-group', { success: this.validBackgound() && check, danger: !this.validBackgound() && check })}>
										Your Backgound/Cultural Values
										{(!this.validBackgound() && check) && <span>You missed a few fields :(</span>}
									</div>

									<InputInline
										type="select-multiple"
										valid={this.checkValid('languages_spoken')}
										check={(this.checkField('languages_spoken') || this.state.changed.includes('languages_spoken')) || !check && this.checkValid('languages_spoken') && user.languages_spoken}
										loader={loaders.includes('languages_spoken')}
										lostConnection={lostConnection.includes('languages_spoken')}
										value={user.languages_spoken}
										field="languages_spoken"
										options={getArray(options.languages_spoken)}
										onChange={this.handleChange}
										label="Language spoken:"
										id="language_wrap" />

									{typeof(user.languages_spoken) != 'undefined' && <Select
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        defaultValue={languages_pre}
                                        isMulti
                                        options={languages}
                                        onChange={this.onChangeSelect}
										id="lang_spok"
										isSearchable={false}
										placeholder= 'Any'
                                    />}

									<InputInline
										type="select"
										value={user.english_language_ability}
										field="english_language_ability"
										lostConnection={lostConnection.includes('english_language_ability')}
										valid={this.checkValid('english_language_ability')}
										check={(this.checkField('english_language_ability') || this.state.changed.includes('english_language_ability')) || !check && this.checkValid('english_language_ability') && user.english_language_ability}
										loader={loaders.includes('english_language_ability')}
										options={getArray(options.english_language_ability)}
										onChange={this.handleChange}
										label="English language ability:" />

									<InputInline
										type="select"
										valid={this.checkValid('religion')}
										check={(this.checkField('religion') || this.state.changed.includes('religion')) || !check && this.checkValid('religion') && user.religion}
										loader={loaders.includes('religion')}
										lostConnection={lostConnection.includes('religion')}
										field="religion"
										value={user.religion}
										options={getArray(options.religion)}
										onChange={this.handleChange}
										label="Religion:" />

									<InputInline
										type="select"
										valid={this.checkValid('star_sign')}
										lostConnection={lostConnection.includes('star_sign')}
										check={(this.checkField('star_sign') || this.state.changed.includes('star_sign')) || !check && this.checkValid('star_sign') && user.star_sign}
										loader={loaders.includes('star_sign')}
										value={user.star_sign}
										field="star_sign"
										options={getArray(options.star_sign)}
										onChange={this.handleChange}
										label="Star sign:" />
								</div>
							</div>
							<div className="text-center" id="btn-next-match">
								<BtnMain text="Next: Match Criteria for your partner" className="btn-green" onClick={this.save} />
							</div>
						</div>
						<style jsx>{`
							.danger-text {
								float: unset !important;
							}
							.only_mobile{
								display: none;
							}
							.title {
								background-color: #F9F9F9;
								padding: 15px;
								border-radius: 9px;
								font-weight: bold;
								margin-top: 35px;
							}
							.title.danger {
								background-color: #FFC7C9;
							}
							.title.success {
								background-color: #F1FFE0;
							}
							.title > span {
								color: #E8373E;
								font-size: 14px;
								float: right;
								font-weight: bold;
								padding-top: 3px;
								margin-left: 57px;
								display: inline-block;
							}
							.text-green {
								color: #98D538;
								padding: 15px;
							}

							.asterix-label {
								color: #a94442 !important;
							}

							.asterix-message {
								color: #a94442 !important;
								padding: 15px;
								font-weight: 600;
							}

							.arrow-right {
								font-size: 31px;
								vertical-align: sub;
								margin-right: 5px;
								animation: blink-animation 1s steps(5, start) infinite;
							}

							@keyframes blink-animation {
								to {
									visibility: hidden;
								}
							}
							@-webkit-keyframes blink-animation {
								to {
									visibility: hidden;
								}
							}
							@media screen and (max-width: 768px) {
								.only_mobile{
									display: block !important;
								}
								.mobile_description{
									color: rgba(0, 0, 0, 0.5);
									line-height: 1.5;
									margin-top: 5px;
								}
								.mobile_form_warn{
									color: #C5141B;
									margin: 20px 0;
								}
								.select-multiple{
									min-height: 120px;
								}
								.title{
									font-size: 17px;
								}
							}
							#btn-next-match{
								margin-top: 25px;
							}
						`}
						</style>
					</ProfileLayout>
				</PrivateLayout>
			</Layout >
		)
	}
}

const mapStateToProps = ({ user, ui }) => {
	return {
		userObj: user.data,
		account_status: user.data.account_status,
		user: user.params,
		token: user.token,
		options: ui.options.profile_params,
		location_options: ui.options.location_params,
		inValid: ui.inValid,
	}
}

export default connect(mapStateToProps)(Edit)
