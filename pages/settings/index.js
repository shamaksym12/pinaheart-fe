import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import PrivateLayout from '../../layouts/private'
import SettingsLayout from '../../layouts/settings'
import { setUserInfo, updateEmail, updatePassword, setIsUserOnline, setIsUserHidden } from '../../actions/user' 
import InputInline from '../../components/inputs/InputInline'
import BtnMain from '../../components/buttons/btn_main'
import { toggleModal } from '../../actions/ui'
import _v from '../../validate'
import Head from 'next/head'
import BtnUpgradeMembership from '../../components/buttons/btn_upgrade_membership';

class Settings extends Component {
	state = {
		password: '',
		new_password: '',
		confirm_password: '',
		checkEmail: false,
		checkPasswords: false,
		fieldCheck: [],
		isOnline: true,
		isDisplaying: true,
	}
	openModal = () => {
		const {dispatch} = this.props
		setTimeout(() => {
			dispatch(toggleModal(true, 'switch_profile'))
		}, 500)
	}

	handleChangeOnline = (val) => {
		this.props.dispatch(setIsUserOnline(val));
	}

	handleChangeDisplaying = (val) => {
		this.props.dispatch(setIsUserHidden(val))
	}

	handleChange = (field, value) => {
		const { dispatch } = this.props
		dispatch(setUserInfo({[field]: value}))
	}
	handleChangePassword = (field, value) => {
		this.setState({[field]: value})
	}
	changeEmail = () => {
		const valid = _v.check(this.props.user.email, ['required', 'email'], 'Email').valid
		const { fieldCheck } = this.state
		if (!valid) {
			this.setState({fieldCheck: [...fieldCheck, 'email'], checkEmail: true})
			return
		}
		const { dispatch } = this.props
		dispatch(updateEmail(this.props.user.email)).then(success => {
			if (success) {
				this.setState({fieldCheck: fieldCheck.filter(item => item !== 'email'), checkEmail: false})
			}
		})
	}
	changePassword = () => {
		const { fieldCheck } = this.state
		const validPasswords = {
			password: _v.check(this.state.password, ['required'], 'Old password'),
			new_password: _v.check(this.state.new_password, ['required'], 'New password'),
			confirm_password: _v.check(this.state.confirm_password, ['required'], 'Confirm password'),
		}
		const inValid = Object.keys(validPasswords).filter(key => !validPasswords[key].valid)
		if (inValid.length) {
			this.setState({fieldCheck: [...inValid]})
			return
		}
		if (this.state.new_password !== this.state.confirm_password) {
			this.setState({fieldCheck: [...fieldCheck, 'new_password', 'confirm_password']})
			return
		}
		const { dispatch } = this.props
		const data = {
			password: this.state.new_password,
			old_password: this.state.password,
			password_confirmation: this.state.confirm_password
		}
		dispatch(updatePassword(data)).then(success => {
			if (success) {
				this.setState({fieldCheck: [], password: '', new_password: '', confirm_password: ''})
			} else {
				this.setState({fieldCheck: ['password']})
			}
		})
	}
	showMembershipInfo = () => {
		const { dispatch } = this.props
		dispatch(toggleModal(true, 'membershipInfo'))
	}
	render() {
		const { user } = this.props
		const { fieldCheck, checkEmail, checkPasswords } = this.state
		return (
			<Layout page="settings_profile">
				<PrivateLayout>
					<SettingsLayout page="profile">
						<Head>
							<title>PinaHeart.com</title>
						</Head>
						<div className="row setting_profile_wrap">
							<div className="col-md-6">
								<div className="title fs-18 form-group">
									{ user.first_name } <span className="user_status">You are a <span className="user_status_text">{ user.account_status }</span> user</span>
								</div>
								<div>
									<InputInline
										check={checkEmail}
										valid={!fieldCheck.includes('email')}
										icon={false}
										value={user.email}
										field="email"
										onChange={this.handleChange}
										label="Email address:" />
								</div>
								<div className="text-right form-group no_mobile">
									<BtnMain
											onClick={this.changeEmail}
											className="btn-change"
											text="Change" />
								</div>
								<div className="text-center form-group only_mobile">
									<BtnMain
											onClick={this.changeEmail}
											className="btn-change"
											text="Change" />
								</div>
								<div className="title form-group fs-18">
										Change password (min 8 char)
								</div>
								<div>
									<InputInline
										check={fieldCheck.includes('password')}
										valid={!fieldCheck.includes('password')}
										icon={false}
										value={this.state.password}
										field="password"
										onChange={this.handleChangePassword}
										label="Old password:" />
									<InputInline
										check={fieldCheck.includes('new_password')}
										valid={!fieldCheck.includes('new_password')}
										icon={false}
										value={this.state.new_password}
										field="new_password"
										onChange={this.handleChangePassword}
										label="New password:" />
									<InputInline
										check={fieldCheck.includes('confirm_password')}
										valid={!fieldCheck.includes('confirm_password')}
										icon={false}
										value={this.state.confirm_password}
										field="confirm_password"
										onChange={this.handleChangePassword}
										label="Confirm password:" />
								</div>
								<div className="text-right form-group no_mobile">
									<BtnMain
										onClick={this.changePassword}
										className="btn-change"
										text="Save" />
								</div>
								<div className="text-center form-group only_mobile">
									<BtnMain
										onClick={this.changePassword}
										className="btn-change"
										text="Save" />
								</div>
							</div>
							<div className="col-md-6">
								{
									user.account_status === 'platinum'
									?   <div className="fs-18 form-group">
											You are a Platinum Membership user
										</div>
									: user.account_status === 'free' ?
										<div className="text-center wrap-free">
											<div className="fs-20">
												You are a Free Member
											</div>
											<div className="form-group">
												
											<div className="upgrade-btn btn-main">
												<div className="upgrade-btn-wrapper">
													<BtnUpgradeMembership  /> 
												</div>
											</div>

											</div>
											<div onClick={this.showMembershipInfo} style={{cursor: 'pointer'}}>
												Why platinum membership?
											</div>
										</div>
									: user.account_status === 'free_platinum' ?
									  <div className="fs-18 form-group">
										You enjoy Free Membership with a Promotion code
									  </div>
									: null
								}
								{
									!user.is_paid
									?   <div className="fs-18 form-group bold">
											Some functions are only available for Platinum Membership users
										</div>
									:   null
								}
								<div className="row form-group" style={{position: 'relative'}}>
									{
										!user.is_paid
										?   <div className="not-premium">
											</div>
										:   null
									}
									<div className="col-sm-6 select-section">
										<div className="select-section-wrapper">
											<div onClick={() => user.is_busy && this.handleChangeOnline(false)} className={`block-select ${!user.is_busy && 'selected'}`}>
												Show me  as online
											</div>
											<div onClick={() => !user.is_busy && this.handleChangeOnline(true)} className={`block-select ${user.is_busy && 'selected'}`}>
												Show me as busy
											</div>
										</div>  
									</div>
									<div className="col-sm-6 select-section">
										<div className="select-section-wrapper">
											<div onClick={() => user.is_hidden && this.handleChangeDisplaying(false)} className={`block-select ${!user.is_hidden && 'selected'}`}>
												Display my Profile to others
											</div>
											<div onClick={() => !user.is_hidden && this.handleChangeDisplaying(true)} className={`block-select ${user.is_hidden && 'selected'}`}>
												Hide my Profile from others
											</div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-6">
										<div className="block-select switch_btn" onClick={this.openModal}>
											Switch my profile Off
										</div>
									</div>
								</div>
							</div>
						</div>
						<style jsx>{`
							.title {
								background-color: #F9F9F9;
								padding: 15px;
								border-radius: 9px;
								font-weight: bold;
							}
							.select-section-wrapper {
								// margin: 5px;
								padding: 15px;
								border-radius: 9px;
								background-color: #F9F9F9;
							}
							.select-section {
								// background-color: #F9F9F9;
								// padding: 15px;
								// border-radius: 9px;
								// margin: 0 5px;
							}
							.upgrade-btn {
								display: flex;
								justify-content: center;
								margin-left: auto;
								margin-top: 15px;
							}
							.upgrade-btn-wrapper {
								width: 300px;
							}
							.wrap-free {
								background-color: #F9F9F9;
								padding: 15px;
								border-radius: 9px;
								margin-bottom: 15px;
								color: rgb(204, 208, 212);

							}
							.wrap-free > div:first-child {
								font-weight: bold;
								margin-bottom: 15px;
							}
							.block-select {
								border: 1px solid #ccc;
								border-radius: 9px;
								padding: 9px 10px;
								cursor: pointer;
								white-space: nowrap;
								margin-bottom: 10px;
							}
							.block-select.selected,
							.block-select:hover {
								background-color: #F1FFE0;
							}
							.not-premium {
								position: absolute;
								background-color: rgba(255,255,255,0.5);
								width: 100%;
								height: 100%;
								z-index: 1;
							}
						`}
						</style>
					</SettingsLayout>
				</PrivateLayout>
			</Layout>
		)
	}
}



const mapStateToProps = ({user}) => ({
	user: user.data
})

export default connect(mapStateToProps)(Settings)