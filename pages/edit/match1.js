import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import PrivateLayout from '../../layouts/private'
import ProfileLayout from '../../layouts/profile'
import { getOptionsMatch, getOptions, getLocations, setAlert } from '../../actions/ui'
import { getUserMatch, getUserInfo } from '../../actions/user'
import BtnMain from '../../components/buttons/btn_main'
import InputInline from '../../components/inputs/InputInline'
import { getArray, heightArray, weightArray, getArrayAge, ageArray, getMultiArray, ageArrayBetween, heightArrayBetween, weightArrayBetween, getCounriesArrey } from '../../utils'
import SelectField from '../../components/inputs/select_field'
import { getInterests, setUserKey, saveMatch } from '../../actions/user'
import { Router } from '../../routes'
import Autocomplete from '../../components/inputs/autocomplete'
import cn from 'classnames'
import Head from 'next/head'
import { API_URL } from '../../config'
let request = {};

class Edit extends Component {
  save = () => {
    const { dispatch, match } = this.props
    const notParams = ['age_from', 'age_to', 'country_id', 'formatted_address', 'lat', 'long', 'place_id', 'sex', 'place', 'distance', 'distance_unit']

    const params = Object.keys(match).reduce((obj, key) => {
      if (!notParams.includes(key)) {
        obj[key] = match[key]
        if (key === 'languages_spoken' && match[key] && match[key].includes('0')) {
          obj[key] = []
        }
      }
      return obj
    }, {})
    const data = {
      age_from: match.age_from,
      age_to: match.age_to,
      country_id: match.country_id,
      formatted_address: match.formatted_address,
      lat: match.lat,
      long: match.long,
      place_id: match.place_id,
      sex: match.sex,
      place: match.place,
      distance: match.distance,
      distance_unit: match.distance_unit,
      match_params: params,
    }

    dispatch(saveMatch(data)).then(success => {
      dispatch(getUserInfo())
      if (this.props.user.food && this.props.user.fun && this.props.user.sport && this.props.user.music) {
        const { dob_day, dob_month, dob_year, first_name, sex, country_id, weight, height, education, nationality, do_you_drink, do_you_smoke, marital_status, do_you_have_children } = this.props.user
        if (!dob_day || !dob_month || !dob_year || !first_name || !sex || !country_id || !weight || !height || !education || !nationality || !do_you_drink || !do_you_smoke || !marital_status || !do_you_have_children) {
          setTimeout(() => {
            Router.pushRoute('/edit/info?show-msg-fill-fields=1')
          }, 1000)
          return
        }

        setTimeout(() => {
          Router.pushRoute('/matches')
        }, 1000)
      } else if (success) {
        setTimeout(() => {
          Router.pushRoute('/edit/interest')
        }, 1000)
      }
    })
  }

  handleChange = (field, value) => {
    const { dispatch } = this.props
    dispatch(setUserKey('match', { [field]: value }))
    this.sendRequest(field, value).then(r => {
      dispatch(setAlert('Successfuly updated.'))
      dispatch(getUserInfo());
    })
  }

  sendRequest = (field, value) => {

    const notParams = ['age_from', 'age_to', 'country_id', 'formatted_address', 'lat', 'long', 'place_id', 'sex', 'place', 'distance', 'distance_unit']
    const data = notParams.includes(field) ? { [field]: value } : { match_params: { [field]: value } }

    return fetch(`${API_URL}/match/params`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.props.token}`,
      },
      body: JSON.stringify(data)
    })
  }

  handleChangeCountry = (field, data) => {
    const { dispatch } = this.props
    this.handleChange(field, data.value)
    dispatch(setUserKey('match', { formatted_address: '', place: '' }))
  }

  handleChangeCity = (value) => {
    const { user, dispatch } = this.props
    this.handleChange('formatted_address', value)
  }

  handleSelectCity = (value, place) => {
    const { dispatch } = this.props
    this.handleChange('formatted_address', value)
    this.handleChange('place_id', place.place_id)
    this.handleChange('place', place)
  }

  handleChangeState = (field, value) => {
    const { dispatch } = this.props
    dispatch(getLocations('cities', value))
    this.handleChange(field, value)
    this.handleChange('city_id', '')
  }
  goTo = link => e => {
    e.preventDefault()
    Router.pushRoute(`${link}`)
  }
  scrollToTopWindow() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getInterests()).then(() => {
      setTimeout(this.scrollToTopWindow, 0)
    })

    dispatch(getOptionsMatch()).then(success => {
      if (success) {
        dispatch(getUserMatch())
      }
    })

    dispatch(getOptions())
  }

  render() {
    const { options, optionsAll, location_options, match } = this.props
    const selectedCountry = location_options.countries.find(country => country.id === match.country_id * 1) || {}

    let { router } = Router
    let showMsgFillFields = false

    if (router) {
      let { query } = router
      showMsgFillFields = query['show-msg-fill-fields']
    }


    return (
      <Layout page="edit">
        <PrivateLayout>
          <ProfileLayout page="match">
            <Head>
              <title>PinaHeart.com</title>
            </Head>
            <div className="fs-18 title form-group justify-content-between d-flex">
              <div>
                Edit Match Criteria
                                </div>
              <BtnMain onClick={this.goTo('/matches')} text="View My Matches" className="btn btn-outline btn-outline " />
            </div>
            <div className="row form-group">
              <div className="col-sm-6">
                <div className="fs-18 title form-group">Their basic details</div>
                <InputInline
                  label="I’m seeking a:"
                  type="select"
                  field="sex"
                  value={match.sex}
                  options={[{ id: '', name: 'Any' }, { id: 'M', name: 'Male' }, { id: 'F', name: 'Female' }]}
                  onChange={this.handleChange} />
                <div className="wrap-multiple-select">
                  <div className="label-multi-select">Aged between</div>
                  <div className="select-multi-select">
                    <SelectField
                      value={match.age_from}
                      onChange={val => this.handleChange('age_from', val * 1)}
                      style={{ minWidth: 100 }}
                      inputRef={ref => this.age_from = ref}
                      options={ageArrayBetween(18, match.age_to)} />
                  </div>
                  <span className="divider-multi-select">and</span>
                  <div className="select-multi-select">
                    <SelectField
                      value={match.age_to}
                      onChange={val => this.handleChange('age_to', val * 1)}
                      style={{ minWidth: 100 }}
                      inputRef={ref => this.age_to = ref}
                      options={ageArrayBetween(match.age_from, 70)} />
                  </div>
                </div>
                <InputInline
                  label="Living in:"
                  value={match.country_id}
                  onChange={this.handleChangeCountry}
                  options={getCounriesArrey(location_options.countries, false)}
                  field="country_id"
                  type="select" />
                {
                  match.country_id
                  && <Autocomplete
                    label=""
                    onSelect={this.handleSelectCity}
                    onChange={this.handleChangeCity}
                    value={match.formatted_address}
                    field="formatted_address"
                    country={selectedCountry.code} />
                }
                {
                  match.place_id
                  && <div className="wrap-multiple-select">
                    <div className="label-multi-select">Expand search by:</div>
                    <div className="select-multi-select">
                      <SelectField
                        onChange={val => this.handleChange('distance', val)}
                        style={{ minWidth: 100 }}
                        value={match.distance}
                        options={[
                          { id: '', name: '' },
                          { id: 50, name: '50' },
                          { id: 100, name: '100' },
                          { id: 250, name: '250' },
                          { id: 500, name: '500' },
                        ]} />
                    </div>
                    <div className="select-multi-select d-flex distance">
                      <div onClick={() => this.handleChange('distance_unit', 'kms')}
                        className={cn('block-select', { selected: match.distance_unit === 'kms' })}>
                        kms
                                                </div>
                      <div onClick={() => this.handleChange('distance_unit', 'miles')}
                        className={cn('block-select', { selected: match.distance_unit === 'miles' })}>
                        miles
                                                </div>
                    </div>
                  </div>
                }

                <InputInline
                  any={true}
                  field="nationality"
                  value={match.nationality}
                  type="select"
                  row="1"
                  options={getCounriesArrey(optionsAll.nationality, false)}
                  onChange={this.handleChange}
                  label="Nationality:" />

                <InputInline
                  any={true}
                  field="education"
                  value={match.education}
                  type="multiselect"
                  field="education"
                  row="1"
                  options={getArray(options.education, false)}
                  onChange={this.handleChange}
                  label="Education:" />

                <div className="fs-18 title form-group">Their appearance</div>

                <div className="wrap-multiple-select">
                  <div className="label-multi-select">Height:</div>
                  <div className="select-multi-select">
                    <SelectField
                      value={match.height_from}
                      onChange={val => this.handleChange('height_from', val * 1)}
                      style={{ minWidth: 100 }}
                      inputRef={ref => this.height_from = ref}
                      options={heightArrayBetween(140, match.height_to)} />
                  </div>
                  <span className="divider-multi-select">and</span>
                  <div className="select-multi-select">
                    <SelectField
                      value={match.height_to}
                      onChange={val => this.handleChange('height_to', val * 1)}
                      style={{ minWidth: 100 }}
                      inputRef={ref => this.height_to = ref}
                      options={heightArrayBetween(match.height_from, 216)} />
                  </div>
                </div>
                <div className="wrap-multiple-select">
                  <div className="label-multi-select">Weight:</div>
                  <div className="select-multi-select">
                    <SelectField
                      value={match.weight_from}
                      onChange={val => this.handleChange('weight_from', val * 1)}
                      style={{ minWidth: 100 }}
                      inputRef={ref => this.weight_from = ref}
                      options={weightArrayBetween(40, match.weight_to)} />
                  </div>
                  <span className="divider-multi-select">and</span>
                  <div className="select-multi-select">
                    <SelectField
                      value={match.weight_to}
                      onChange={val => this.handleChange('weight_to', val * 1)}
                      style={{ minWidth: 100 }}
                      inputRef={ref => this.weight_to = ref}
                      options={weightArrayBetween(match.weight_from, 221)} />
                  </div>
                </div>
                <InputInline
                  any={true}
                  field="hair_color"
                  value={match.hair_color}
                  options={getArray(options.hair_color, false)}
                  onChange={this.handleChange}
                  label="Hair color:"
                  type="multiselect" />
                <InputInline
                  options={getArray(options.body_type, false)}
                  onChange={this.handleChange}
                  field="body_type"
                  any={true}
                  value={match.body_type}
                  label="Body type:"
                  type="multiselect" />
                <InputInline
                  any={true}
                  field="your_ethnicity_is_mostly"
                  value={match.your_ethnicity_is_mostly}
                  options={getArray(options.your_ethnicity_is_mostly, false)}
                  onChange={this.handleChange}
                  label="Their ethnicity is mostly:"
                  type="multiselect" />
                <InputInline
                  any={true}
                  field="i_consider_my_appearance_as"
                  value={match.i_consider_my_appearance_as}
                  options={getArray(options.i_consider_my_appearance_as, false)}
                  onChange={this.handleChange}
                  label="Consider their apearance as:"
                  type="multiselect" />
              </div>
              <div className="col-sm-6">
                <div className="fs-18 title form-group">Their lifestyle</div>
                <InputInline
                  any={true}
                  field="do_you_drink"
                  value={match.do_you_drink}
                  options={getArray(options.do_you_drink, false)}
                  onChange={this.handleChange}
                  label="Do they drink?"
                  type="multiselect" />
                <InputInline
                  any={true}
                  field="do_you_smoke"
                  value={match.do_you_smoke}
                  options={getArray(options.do_you_smoke, false)}
                  onChange={this.handleChange}
                  label="Do they smoke?"
                  type="multiselect" />
                <InputInline
                  any={true}
                  field="marital_status"
                  value={match.marital_status}
                  options={getArray(options.marital_status, false)}
                  onChange={this.handleChange}
                  label="Marital status:"
                  type="multiselect" />
                <InputInline
                  any={true}
                  field="do_you_have_children"
                  value={match.do_you_have_children}
                  options={getArray(options.do_you_have_children, false)}
                  onChange={this.handleChange}
                  label="Do they have children?"
                  row="1"
                  type="multiselect" />
                <InputInline
                  any={true}
                  field="willing_to_relocate"
                  value={match.willing_to_relocate}
                  options={getArray(options.willing_to_relocate, false)}
                  onChange={this.handleChange}
                  row="1"
                  label="Willing to relocate:"
                  type="multiselect" />

                <div className="fs-18 title form-group">Their background / Cultural values</div>
                <InputInline
                  any={true}
                  value={match.languages_spoken}
                  type="select-multiple"
                  field="languages_spoken"
                  options={getMultiArray(options.languages_spoken, false)}
                  onChange={this.handleChange}
                  label="Language spoken:" />
                <InputInline
                  any={true}
                  field="english_language_ability"
                  value={match.english_language_ability}
                  type="multiselect"
                  options={getArray(options.english_language_ability, false)}
                  onChange={this.handleChange}
                  label="English language ability (or above):" />
                <InputInline
                  any={true}
                  field="religion"
                  value={match.religion}
                  type="multiselect"
                  options={getArray(options.religion, false)}
                  onChange={this.handleChange}
                  label="Religion:" />
              </div>
            </div>
            <div className="text-center">
              <BtnMain text="Submit" className="btn-green" onClick={this.save} />
            </div>
            <style jsx>{`

                            .title {
                                background-color: #F9F9F9;
                                padding: 15px;
                                border-radius: 9px;
                                font-weight: bold;
                            }
                            .wrap-multiple-select {
                                display: flex;
                                align-items: center;
                                
                                margin-bottom: 15px;
                            }
                            .label-multi-select {
                                margin-right: 5px;
                                width: 30%;
                                padding-left: 15px;
                                font-weight: bold;
                            }
                            .distance {
                                margin-left: 10px;
                            }
                            .distance .block-select:first-child {
                                border-radius: 9px 0px 0px 9px;
                            }
                            .distance .block-select:last-child {
                                border-radius: 0px 9px 9px 0px;
                            }
                            .divider-multi-select {
                                margin-right: 10px;
                                margin-left: 10px;
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
                            .block-select {
                                border: 1px solid #ccc;
                                padding: 10px 0px;
                                color: #555;
                                cursor: pointer;
                                white-space: nowrap;
                                width: 100px;
                                text-align: center;
                                height: 42px;
                            }
                            .block-select.selected,
                            .block-select:hover {
                                background-color: #F1FFE0;
                            }
                            @media (max-width: 375px) {
                                .wrap-multiple-select {
                                    flex-wrap: wrap;
                                }
                                .label-multi-select {
                                    width: 100%;
                                }
                            }
                            .divider-multi-select {
                                margin-right: 10px;
                                margin-left: 10px;
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
    match: user.match,
    options: ui.optionsMatch.match_params,
    optionsAll: ui.options.profile_params,
    location_options: ui.optionsMatch.location_params,
    inValid: ui.inValid,
    user: user.params,
    token: user.token,
  }
}

export default connect(mapStateToProps)(Edit)