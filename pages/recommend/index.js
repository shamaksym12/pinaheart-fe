import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import PrivateLayout from '../../layouts/private'
import MemberBlock from '../../components/block/member_block'
import BtnMain from '../../components/buttons/btn_main'
import InputInline from '../../components/inputs/InputInline'
import Pagination from '../../components/pagination'
import { getMembers, getMembersMatch, checkSubscriptionsCheckEndPeriod, checkExpiredSubscription } from '../../actions/members'
import { ageArrayBetween, getCounriesArrey, sexPhotoFinder } from '../../utils'
import { getOptionsSearch, toggleModal } from '../../actions/ui'
import Autocomplete from '../../components/inputs/autocomplete'
import { Router } from '../../routes'
import SelectField from '../../components/inputs/select_field'
import CheckboxField from '../../components/inputs/checkbox_field'
import Head from 'next/head'
import BtnUpgradeMembership from '../../components/buttons/btn_upgrade_membership'

class Recommend extends Component {
	state = {
		search: {
			sex: '',
			formatted_address: '',
			country_id: '',
			with_photo: true,
			last_active: "3month"
		}
	};

	search = () => {
		const { search } = this.state
		const { dispatch } = this.props
		let params = {}
		if (Object.keys(search).length) {
			params.search = search
		}
		dispatch(getMembers(params))
		params = JSON.stringify(params)
		Router.pushRoute(`/results?query=${params}`)
	}
	handleChangePage = page => {
		const { dispatch } = this.props
		dispatch(getMembersMatch(page))
	}
	handleChange = (field, value) => {
		this.setState({ search: { ...this.state.search, [field]: value } })
	}
	handleChangeCountry = (field, data) => {
		this.setState({ search: { ...this.state.search, formatted_address: '', place: '', country_id: data.value } })
	}

	handleChangeCity = (value) => {
		this.handleChange('formatted_address', value)
	}

	handleSelectCity = (value, place) => {
		this.handleChange('formatted_address', value)
		const keys = ['formatted_address', 'place_id', 'geometry']

		const temp = Object.keys(place).reduce((obj, key) => {
			if (keys.includes(key)) {
				obj[key] = place[key]
			}
			return obj
		}, {})
		this.handleChange('place', temp)
	}

	componentWillReceiveProps(props) {

	}

	componentDidMount() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})

		const { dispatch, user } = this.props

		dispatch(checkSubscriptionsCheckEndPeriod()).then(response => {
			let { data } = response
			if (data) {
				dispatch(toggleModal(true, 'nineDayToAutoRenewal'))
			}
		})


		dispatch(checkExpiredSubscription()).then(response => {
			let { data } = response
			if (data) {
				dispatch(toggleModal(true, 'expiredSubscription'))
			}
		})

		dispatch(getOptionsSearch()).then(options => {
			if (options) {
				let params = {
					search: {
						sex: '',
						formatted_address: '',
						country_id: '',
					}
				}
				if (Router.router.query.query) {
					const { search } = JSON.parse(Router.router.query.query)
					params = {
						search: {
							sex: '',
							formatted_address: '',
							country_id: '',
							...search
						}
					}
				} else {
					params.search = {
						...this.state.search,
						iam: options.search_params.iam,
						sex: options.search_params.iam === 'M' ? 'F' : 'M'
					}
				}
				this.setState({ search: params.search })
				dispatch(getMembersMatch())
			}
		})
	}

	editMatches = () => {
		Router.pushRoute('/edit/match')
	}

	goToSearch = () => {
		Router.pushRoute('/search')
	}

	renderList = (member, i, user) => {
		return <div key={i} className="col-lg-3 col-md-6 col-sm-12 form-group recommended_item_wrap">
			<MemberBlock member={member} user={user} />
		</div>
	}

	render() {
		const { people, user, location_options } = this.props
		const { search } = this.state;
		const selectedCountry = location_options.countries.find(country => country.id === search.country_id * 1) || {}

		return (
			<Layout page="recommend">
				<PrivateLayout page="recommend">
					<Head>
						<title>PinaHeart.com</title>
					</Head>
					<div className="pt-15 recommend_main_wrap">
						<div className="row recommended_all_wrap">
							<div className="col-md-3 col-sm-6 recommended_condition_wrap no_mobile">
								<div>
									<div className="avatar">
									</div>
									<div className="form-group mb-35 no_mobile">
										<BtnUpgradeMembership />
									</div>
									<div className="d-flex align-items-center justify-content-between no_mobile">
										<div className="fs-18 bold title">Search</div>
										<BtnMain
											text="Advanced search"
											onClick={this.goToSearch}
											className="btn-outline" />
									</div>
									<hr />
									<div>
										<InputInline
											icon={false}
											label="I am:"
											type="select"
											field="iam"
											value={search.iam}
											options={[{ id: '', name: 'Any' }, { id: 'M', name: 'Male' }, { id: 'F', name: 'Female' }]}
											onChange={this.handleChange} />
										<InputInline
											icon={false}
											label="Looking for:"
											type="select"
											field="sex"
											value={search.sex}
											options={[{ id: '', name: 'Any' }, { id: 'M', name: 'Male' }, { id: 'F', name: 'Female' }]}
											onChange={this.handleChange} />
										<div className="wrap-multiple-select">
											<div className="label-multi-select">Aged between</div>
											<div className="select-multi-select">
												<div>
													<SelectField
														onChange={val => this.handleChange('age_from', val)}
														style={{ minWidth: 80 }}
														value={search.age_from}
														options={ageArrayBetween(18, search.age_to)} />
												</div>
												<span className="divider-multi-select">and</span>
												<div className="second_select">
													<SelectField
														onChange={val => this.handleChange('age_to', val)}
														style={{ minWidth: 80 }}
														value={search.age_to}
														options={ageArrayBetween(search.age_from, 70)} />
												</div>
											</div>
										</div>
										<InputInline
											icon={false}
											label="Country:"
											value={search.country_id}
											onChange={this.handleChangeCountry}
											options={getCounriesArrey(location_options.countries, false)}
											field="country_id"
											type="select" />
										<Autocomplete
											icon={false}
											label="City:"
											onSelect={this.handleSelectCity}
											onChange={this.handleChangeCity}
											value={search.formatted_address}
											field="formatted_address"
											country={selectedCountry.code} />
										<div className="wrap-multiple-select">
											<div className="label-multi-select">Distance:</div>
											<div className="select-multi-select">
												<div>
													<SelectField
														onChange={val => this.handleChange('distance', val)}
														style={{ minWidth: 80 }}
														value={search.distance}
														options={[
															{ id: '', name: '' },
															{ id: 50, name: '50' },
															{ id: 100, name: '100' },
															{ id: 250, name: '250' },
															{ id: 500, name: '500' },
														]} />
												</div>
												<div className="second_select">
													<SelectField
														onChange={val => this.handleChange('distance_unit', val)}
														style={{ minWidth: 80 }}
														value={search.distance_unit}
														options={[
															{ id: '', name: '' },
															{ id: 'kms', name: 'kms' },
															{ id: 'miles', name: 'miles' },
														]} />
												</div>
											</div>
										</div>
										<div className="wrap-multiple-select">
											<div className="label-multi-select checkbox_label">Only with photo:</div>
											<div className="select-multi-select checkbox_input">
												<CheckboxField
													id="photo"
													onChange={val => this.handleChange('with_photo', val)}
													text=""
													checked={search.with_photo} />
											</div>
										</div>
										<BtnMain
											className="btn-green btn-block search_btn"
											onClick={this.search}
											text="Search" />
									</div>
								</div>
							</div>
							<div className="col-md-9 col-sm-6 recommended_wrap">
								<div className="fs-18 bold form-group title recommended_title no_mobile">Recommended matches</div>
								<div className="d-flex align-items-center justify-content-between form-group flex-wrap recommended_con_title no_mobile">
									<div>
										<BtnMain
											text="Improve Matches"
											onClick={this.editMatches}
											className="btn-outline" />
									</div>
									<div>
										<BtnUpgradeMembership />
									</div>
								</div>
								<div className="row form-group recommended_items_wrap">
									{
										people.data.map((member, i) => this.renderList(member, i, user))
									}
								</div>
								<div className="form-group">
									<Pagination
										total={people.last_page}
										allVisible={true}
										current={people.current_page}
										onChange={this.handleChangePage} />
								</div>
							</div>
						</div>
					</div>
					<style jsx>{`
						.litl_green_btmt {
							background-color: #98D538;
							padding: 0px;
							height: 35px;
						}
						.title {
							color: #777074;
							font-family: "Open Sans";
							font-size: 18px;
							font-weight: 600;
						}
						.avatar {
							width: 100%;
							position: relative;
							background-image: url(${sexPhotoFinder(this.props.user.sex, user.main_photo_thumb)});
							border-radius: 9px;
							background-position: center;
							background-repeat: no-repeat;
							background-size: cover;
							margin-bottom: 15px;
							padding-top: 100%;
						}
						.wrap-multiple-select {
							display: flex;
							align-items: center;
							margin-bottom: 15px;
							justify-content: space-between;
						}
						.select-multi-select {
							display: flex;
							align-items: center;
							justify-content: space-between;
							width: 70%;
						}
						.label-multi-select {
							margin-right: 5px;
							width: 30%;
							font-weight: bold;
						}
						.flex-wrap {
							flex-wrap: wrap;
						}

						@media (max-width: 375px) {
							.wrap-multiple-select {
								flex-wrap: wrap;
							}
							.label-multi-select {
								width: 100%;
							}
						}
					`}</style>
				</PrivateLayout>
			</Layout>
		);
	}
}

const mapStateToProps = ({ members, user, ui }) =>
	(
		{
			people: members.match,
			user: user.data,
			options: ui.optionsSearch.search_params,
			location_options: ui.optionsSearch.location_params,
		}
	);

export default connect(mapStateToProps)(Recommend)