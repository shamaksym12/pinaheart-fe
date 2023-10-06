import React, { Component, Fragment } from 'react'
import { Navbar } from 'react-bootstrap'
import { connect } from 'react-redux'
import { toggleModal, setAlert, setUiKey } from '../../actions/ui'
import { Router } from '../../routes'
import BtnMain from '../buttons/btn_main'
import loadable from '@loadable/component'
import { getImage, sexPhotoFinder } from '../../utils'
import {logout} from '../../actions/auth'
import cn from 'classnames'
import {getUserInfo} from '../../actions/user';
import {StripeProvider} from 'react-stripe-elements';
import AutoRenewal from "../forms/auto-renewal";
import NineDayToAutoRenewal from "../forms/nine-day-to-autorenewal";
import ExpiredSubscription from '../forms/expired-subscription';
import { getDialog } from '../../actions/dialog';
import $, { timers } from 'jquery';
import { getSortMatch, getMembers, searchByProfileId } from '../../actions/members'
import { getOptionsSearch } from '../../actions/ui'
import { getActivities } from '../../actions/user'

const MainModal = loadable(() => import('../modal'))
const Login = loadable(() => import('../forms/login'))
const Uncomplete = loadable(() => import('../forms/uncomplete'))
const Recovery = loadable(() => import('../forms/recovery'))
const MemberInfo = loadable(() => import('../block/member_info'))
const MembershipInfo = loadable(() => import('../block/membership_info'))
const Switch_profile = loadable(() => import('../block/switch_my_profile'))
const Shure_delete = loadable(() => import('../block/shure_delete'))
const MemberFrom = loadable(() => import('../forms/member-form/member-form'));

const Down = () => {
	return  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
				viewBox="0 0 407.437 407.437" fill="#fff" width="20px" height="12px">
				<polygon points="386.258,91.567 203.718,273.512 21.179,91.567 0,112.815 203.718,315.87 407.437,112.815 "/>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
			</svg>
}

const ChevronDown = () => {
	return  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
				viewBox="0 0 512 512" fill="#fff" width="26px" height="13px">
				<g>
					<g>
						<path d="M509.121,125.966c-3.838-3.838-10.055-3.838-13.893,0L256.005,365.194L16.771,125.966c-3.838-3.838-10.055-3.838-13.893,0
							c-3.838,3.838-3.838,10.055,0,13.893l246.18,246.175c1.842,1.842,4.337,2.878,6.947,2.878c2.61,0,5.104-1.036,6.946-2.878
							l246.17-246.175C512.959,136.021,512.959,129.804,509.121,125.966z"/>
					</g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
				<g>
				</g>
		</svg>
}

const initSearch = { formatted_address: '', distance_unit: 'kms', sort: 'last_active' }

class PublicHeader extends Component {
	state = {
		menu: false,
		sort: 'last_active',
		host: '',
		mobile_menu: 0,
		sort_show: 0,
		sort_menu_show: 0,
		messageMode: 'select',
		savedSearch: 0,
		search: initSearch,
		tab: {
			key: 'all',
			title: 'All Activities from users',
			my: false,
		},
		user_menu_show: 0,
		hidden_menu_show: 0,
		sub_menu_show: 0
	}
	showLogIn = () => e => {
		e.preventDefault()
		const {dispatch} = this.props
		dispatch(setUiKey('sizeLoginModal', 'sm'))
		dispatch(toggleModal(true, 'login'))
	}

	goTo = link => e => {
		if (e) {
			e.preventDefault()
		}
		const { page } = this.props
		var url = ''
		if (link == '/online') url = "online"
		else if (link == '/matches') url = "matches"
		else if (link == '/search') url = "search"
		else if (link == '/messages') url = "messages"
		else if (link == '/activity') url = "activity"
		if (page == url) this.setState({mobile_menu: false})
		else Router.pushRoute(link)
	}

	toggleMenu = () => {
		this.setState({menu: !this.state.menu})
		if (!this.state.menu) {
			document.body.addEventListener('click', this.bodyClickHandler)
		}
	}

	closeMenu = () => {
		this.setState({menu: false})
		document.body.removeEventListener('click', this.bodyClickHandler)
	}

	bodyClickHandler = e => {
		if (e && !e.target.closest('#user-menu')) {
			this.closeMenu()
		}
	}

	goToProfile = () => {
		this.closeMenu()
		Router.pushRoute('/profile')
	}

	goToSettings = () => {
		this.closeMenu()
		const { page } = this.props
		if (page == 'settings_profile') this.setState({mobile_menu: false})
		else Router.pushRoute('/settings/profile')
	}

	editMatches = () => {
		Router.pushRoute('/edit/match')
	}

	goToInfo = () =>{
		this.closeMenu()
		const { page } = this.props
		if (page == 'edit_info') this.setState({mobile_menu: false})
		else Router.pushRoute('/edit/info')
	}

	logOut = () =>{
		const {dispatch} = this.props
		dispatch(logout()).then(res => {
			if (res) {
				window.location.href = '/'
			}
		})
	}

	showMessage = () => {
		const { dispatch } = this.props
		dispatch(setAlert('Please fill in required fields', 'error')).then(res=> 
				dispatch(getUserInfo())
			)
	}

	componentDidMount() {
		var url = $(location).attr('href').split('?')
		var host = url[0].split('/')
		this.setState({ host: host[3] } )
		if (url.indexOf('&') > 0) {
			var params = url[1].split('&')
			var first_param = params[0].split('=')
			$('.current_sort').removeClass('current_sort');
			$('.' + first_param[1]).parent().addClass('current_sort');
		}
		
		const { dispatch } = this.props
		
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
                    const { search, name } = JSON.parse(Router.router.query.query)
                    params = {
                        search: {
                            sex: '',
                            formatted_address: '',
                            country_id: '',
                            ...search
                        },
                    }
                    if (name) {
                        params.name = name
                    }
                } else {
                    params.search = {
                        ...this.state.search,
                        iam: options.search_params.iam,
                        sex: options.search_params.iam === 'M' ? 'F' : 'M'
                    }
                }
                this.setState({ search: params.search })
                // dispatch(getMembers(params)).then(() => {
				// 	this.setState({ ...this.state, ...{ finish: true } })
                // }).catch(() => {
                //     this.setState({ ...this.state, ...{ finish: true } })
                // })
            }
        })
	}

	handleChange = (value) => {
		this.setState({ sort: value } )
		const { dispatch } = this.props
		dispatch(getSortMatch(value))
		window.location.href = `/${this.state.host}?sort=${value}`
	}

	confirmDeletePhoto = () => {
		this.setState({ sort_show: 0 })
		this.props.confirmDeletePhoto()
	}

	cancelDeletePhoto = () => {
		this.setState({ sort_show: 0 })
		this.props.cancelDeletePhoto()
	}

	setMain = () => {
		this.props.setMain()
	}

	handleChangeResult = (value) => {
        this.setState({ search: { ...this.state.search, sort: value } }, () => {
            const { search } = this.state
            const { dispatch } = this.props
            let params = {}

            //if search by id
            const query = JSON.parse(Router.router.query.query)
            if (query.name && !query.search) {
                params = {
                    search: { ...this.state.search },
                    name: query.name
                }
                dispatch(searchByProfileId({
                    search: { ...this.state.search },
                    name: query.name
                }));
                params = JSON.stringify(params)
                Router.pushRoute(`/results?query=${params}`)
                return true
            }

            if (Object.keys(search).length) {
                params.search = search
            }
            dispatch(getMembers(params))
            params = JSON.stringify(params)
			Router.pushRoute(`/results?query=${params}`)
			this.setState({ sort_show: 0 })
        })
    }

	showMobileMenu =() => {
		this.setState({mobile_menu: 1});
	}

	hideMobileMenu =(e) => {
		if (e.target.id == 'menu_wrap' || e.target.id == 'menu_logo_wrap') this.setState({mobile_menu: 0});
	}

	showSortMenu = () => {
		this.setState({ sort_show: 1 });
	}

	hideSortMenu = (e) => {
		if (e.target.id == 'sort_wrap') this.setState({ sort_show: 0 });
	}

	sortMenuHandling = (e) => {
		this.setState({sort_menu_show: !this.state.sort_menu_show}, () => {
			if (this.state.sort_menu_show) {
				document.addEventListener('click', this.closeDropdown)
			}
		})
	}

	hiddenHandling = (e) => {
		this.setState({hidden_menu_show: !this.state.hidden_menu_show}, () => {
			if (this.state.hidden_menu_show) {
				document.addEventListener('click', this.closeDropdownHidden)
			}
		})
	}

	userMenuHandling = (e) => {
		this.setState({user_menu_show: !this.state.user_menu_show}, () => {
			if (this.state.user_menu_show) {
				document.addEventListener('click', this.closeDropdownUser)
			}
		})
	}

	closeDropdown = () => {
		this.setState(
		  {
			sort_menu_show: false,
		  },
		  () => document.removeEventListener('click', this.closeDropdown)
		)
	}

	closeDropdownUser = () => {
		this.setState(
		  {
			user_menu_show: false,
		  },
		  () => document.removeEventListener('click', this.closeDropdownUser)
		)
	}

	closeDropdownHidden = () => {
		this.setState(
		  {
			hidden_menu_show: false,
		  },
		  () => document.removeEventListener('click', this.closeDropdownHidden)
		)
	}

	showSavedSearch = () => {
		this.setState({ savedSearch: 1 })
	}

	goToSearch = () => {
		Router.pushRoute('/search')
	}

	goToBack = () => {
        Router.back()
    }

	openModal = () => {
        const { dispatch } = this.props
        setTimeout(() => {
            dispatch(toggleModal(true, 'shure_delete'))
        }, 500)
	}
	
	scrollToTopWindow() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
	}

	render() {
		const {inbox_unread_messages_count, count_online_members, token, login, recovery, unreadMessage, page, userAgent, memberModal, membershipInfo, main_photo_thumb, uncomplete, switch_profile, sex, has_default_match, shure_delete, handleMessageMode, status, clearForm, setLink, toggleBlock, is_block, subscription, autoRenewal, account_status, is_busy, is_hidden, isAdmin, role, sizeLoginModal, nineDayToAutoRenewal, expiredSubscription, dialog, age, first_name, user_address, profile_id, photos, isMain } = this.props;
		const logo = token ? '/static/assets/img/pinaheart_logo2.png' : '/static/assets/img/pinaheart_logo.png'
		const logo_mobile = token ? '/static/assets/img/pinaheart_logo2.png' : '/static/assets/img/pinaheart_logo2.png'

		const color = account_status === 'platinum' ? '#0cf6dd' 
					: account_status === 'free_platinum' ? '#e9e707' 
					: account_status === 'free_platinum_on_hold' ? '#f17eeb'
					: null ;

		const statusBorder = {
			border: '4px solid ' + color,
		}

		const goTo = link => e => {
			e.preventDefault()
			Router.pushRoute(`/search${link}`)
		}

		const goToProfile = link => e => {
			e.preventDefault()
			Router.pushRoute(`/edit${link}`)
		}

		const goToSettings = link => e => {
			e.preventDefault()
			Router.pushRoute(`/settings${link}`)
		}

		const { tab } = this.state

		const links = [
			{
				key: 'all',
				title: 'All Activities from users',
				my: false
			}, {
				key: 'interest',
				title: 'Interested in Me',
				my: false
			}, {
				key: 'favorites',
				title: 'Added me as Favorites',
				my: false
			}, {
				key: 'view',
				title: 'Viewed my Profile',
				my: false
			}
		]
		
		const myLinks = [
			{
				key: 'all',
				title: 'All My Activities',
				my: true,
			}, {
				key: 'interest',
				title: 'My Interests',
				my: true,
			}, {
				key: 'favorites',
				title: 'My Favorites',
				my: true,
			}, {
				key: 'view',
				title: 'Profiles I Viewed',
				my: true,
			}, {
				key: 'blocked',
				title: 'Members I blocked',
				my: true,
			}
		]
		
		return (
			<div className={`wrap-header ${token && 'private'}`}>
				<Navbar className={`desktop_header title ${(isAdmin || role == 'junior') && 'admin'}`} collapseOnSelect={true}>
					<Navbar.Header className="main_menu_wrap">
						<Navbar.Brand>
							<img onClick={this.goTo('/')} src={getImage(logo, userAgent)} alt="" className={`logo pointer ${( page == 'messages') && 'logo_messages'}`} />
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Header className="main_menu_wrap">
						<Navbar.Brand>
							<img onClick={this.goTo('/')} src={getImage(logo, userAgent)} alt="" className="logo logo1" />
						</Navbar.Brand>
					</Navbar.Header>
					<Navbar.Collapse id="collapse" className="collapse-head">
						<ul className={`navBar nav navbar-nav navbar-right avatar_wrap ${( page == 'messages') && 'avatar_wrap_messages'}`}>
							{ 
								token
								?   <Fragment>
										<li role="presentation">
											<div className="d-flex align-items-center toggle-menu">
												<span className="role">{ isAdmin || role == 'junior' ? role : ''}</span>
												{
													account_status === 'platinum' ||
													account_status === 'free_platinum' ||
													account_status === 'free_platinum_on_hold' ?
													<i
													style={{
														color: 'white',
														fontSize: '14px',
														position: "relative",
														left: '15px',
													}}
													className="fas fa-info-circle status-circle"></i>
													: null
												}
												<div className="tooltip">
													<span className="tooltip-overlay"></span>
													{
														account_status === 'platinum' ?
														(
															<span>
																<span style={{
																	display: 'inline-block',
																	height: '10px',
																	width: '10px',
																	backgroundColor: '#0cf6dd',
																	marginRight: '10px',
																}}
																>
																</span>
																Premium member
															</span>
														)
														: null
													}
													
													{
														account_status === 'free_platinum' ?
														(
															<span>
																<span style={{
																	display: 'inline-block',
																	height: '10px',
																	width: '10px',
																	backgroundColor: '#e0e507',
																	marginRight: '10px',
																}}
																>
																</span>
																Free Premium member
															</span>
														)
														: null
													}
													   
													{
														account_status === 'free_platinum_on_hold' ?
														(
															<span>
																<span style={{
																	display: 'inline-block',
																	height: '10px',
																	width: '10px',
																	backgroundColor: '#f17eeb',
																	marginRight: '10px',
																}}
																>
																</span>
																Free Premium membership <br/> on hold for security reasons
															</span>
														)
														:null
													}
												
												</div>
												<div className='status-wrapper'>
												</div>
												<div style={{...statusBorder}} className="logo-user" onClick={this.goTo('/edit/gallery')}>
												</div>
												<div id="user-menu" className={isAdmin || role == 'junior' ? 'admin' : ''}>
													<div className="pointer" onClick={this.toggleMenu}><Down /></div>
													<div className={cn('wrap-menu', {show: this.state.menu})}>
														<div className="menu-item" onClick={this.goToProfile}>View my profile</div>
														<div className="menu-item" onClick={this.goToInfo}>Edit my profile</div>
														<div className="menu-item" onClick={this.goToSettings}>Settings</div>
														<div className="menu-item" onClick={this.logOut}>Logout</div>
													</div>
												</div>
											</div>
										</li>
									</Fragment>
								:   <Fragment>
										<li>
											<div className="string-header">Already a member?</div>
											<BtnMain text="Log In" onClick={this.showLogIn()} className="fs-16 pull-right" />
										</li>
									</Fragment>
							}
						</ul>
						<ul className={`navBar nav navbar-nav navbar-right main_menu ${( page == 'messages') && 'main_menu_messages'}`}>
							{
								token
								?   <Fragment>
										<li role="presentation" className={(page === 'online' || !page) ? 'active' : null}>
											<a href="/online" onClick={this.goTo('/online')}>{count_online_members} Members online</a>
										</li>
										<li role="presentation" className={page === 'matches' ? 'active' : null}>
											<a href="/matches" onClick={has_default_match ? this.goTo('/edit/match') : this.goTo('/matches') }>Matches</a>
										</li>
										<li role="presentation" className={page === 'search' || page == 'search_result' ? 'active' : null}>
											<a href="/search" onClick={this.goTo('/search')}>Search</a>
										</li>
										<li role="presentation" className={page === 'messages' ? 'active' : null}>
											<a href="/messages" onClick={this.goTo('/messages')}>{inbox_unread_messages_count >= 1 ? inbox_unread_messages_count : ""} Messages</a>
										</li>
										<li role="presentation" className={page === 'activity' ? 'active' : null}>
											<a href="/activity" onClick={this.goTo('/activity')}>Activity</a>
										</li>
										{is_busy &&
										<li className='busy-status-label'>
											<span>Busy</span>
										</li>}
										{is_hidden &&
										<li className='hidden-status-label'>
											<i className="fas fa-user-secret"> <span>Profile hidden</span></i>
										</li>}
										{account_status === 'platinum' ||
										account_status === 'free_platinum' ||
										account_status === 'free_platinum_on_hold' ? <li id="special_li"></li> : ''}
									</Fragment>
								:   null
							}
						</ul>
					</Navbar.Collapse>
				</Navbar>

				<div className={`mobile_header title ${(isAdmin || role == 'junior') && 'admin'}`}>
					<div className="mobile_header_wrap row">
						<div className="menu_icon_btn_wrap">
							{
								token ? (
									<a href="javascript:;" className="menu_icon_btn" onClick={this.showMobileMenu}>
										<img src="../../static/assets/img/menu.png" className="menu_icon" />
									</a>
								) : (
									''
								)
							}							
						</div>
						<div className={`menu_wrap modal ${this.state.mobile_menu ? 'menu_wrap_show' : ''}`} id="menu_wrap"  onClick={this.hideMobileMenu}>
							<div className={`menu_wrap_content ${this.state.mobile_menu ? 'menu_wrap_content_animation' : ''}`}>
								<div className="menu_logo_wrap" id="menu_logo_wrap">
									<img onClick={this.goTo('/')} src={getImage(logo, userAgent)} alt="" className="logo2" />
								</div>
								<ul className="men_ul">
									<li className="menu_li">
										<a href="/online" onClick={this.goTo('/online')} className="menu_link" ><img src="../../static/assets/img/multy-user.png" className="menu_item_icon" />{count_online_members} Members Online</a>
									</li>
									<li className="menu_li">
										{/* <a href="/matches" onClick={has_default_match ? this.goTo('/edit/match') : this.goTo('/matches') } className="menu_link" ><img src="../../static/assets/img/matches.png" className="menu_item_icon" />Matches</a> */}
										<a href="/matches" onClick={this.goTo('/matches') } className="menu_link" ><img src="../../static/assets/img/matches.png" className="menu_item_icon" />Matches</a>
									</li>
									<li className="menu_li">
										<a href="/search" onClick={this.goTo('/search')} className="menu_link" ><img src="../../static/assets/img/search.png" className="menu_item_icon" />Search</a>
									</li>
									<li className="menu_li">
										<a href="/messages" onClick={this.goTo('/messages')} className="menu_link" ><img src="../../static/assets/img/message.png" className="menu_item_icon" />Messages</a>
									</li>
									<li className="menu_li">
										<a href="/activity" onClick={this.goTo('/activity')} className="menu_link" ><img src="../../static/assets/img/activity.png" className="menu_item_icon" />Activity</a>
									</li>
									<li className="menu_li">
										<a href="javascript:;" onClick={this.goToInfo} className="menu_link" ><img src="../../static/assets/img/myprofile.png" className="menu_item_icon" />My Profile</a>
									</li>
									<li className="menu_li">
										<a href="javascript:;" onClick={this.goToSettings} className="menu_link" ><img src="../../static/assets/img/setting.png" className="menu_item_icon" />Settings</a>
									</li>
									{
										token ? (
											<li className="menu_li">
												<a href="javascript:;" onClick={this.logOut} className="menu_link" ><img src="../../static/assets/img/logout.png" className="menu_item_icon" />Logout</a>
											</li>
										) : (
											''
										)
									}
									{
										!this.state.sub_menu_show && 
										<li className="menu_li">
											<a href="javascript:;" className="menu_link menu_more" onClick={() => this.setState({sub_menu_show: 1})}>More...</a>
										</li>
									}
									{
										this.state.sub_menu_show == 1 && 
										<>
											<li className="menu_li">
												<a href="/service/aboutus" className="menu_link menu_more" >About Us</a>
											</li>
											<li className="menu_li">
												<a href="/service/contactus" className="menu_link menu_more" >Contact Us</a>
											</li>
											<li className="menu_li">
												<a href="/service/term" className="menu_link menu_more" >Terms of Use</a>
											</li>
											<li className="menu_li">
												<a href="/service/privacy" className="menu_link menu_more" >Privacy Statement</a>
											</li>
											<li className="menu_li">
												<a href="/service/safety" className="menu_link menu_more" >Dating Safety</a>
											</li>
											<li className="menu_li">
												<a href="javascript:;" className="menu_link menu_more" onClick={() => this.setState({sub_menu_show: 0})}>Less...</a>
											</li>
										</>
									}
								</ul>
							</div>
						</div>
						
						<div className="page_header_title">
						{
							page == 'matches' ? (
								<img onClick={this.goTo('/')} src={getImage(logo, userAgent)} alt="" className="logo2" />
							) : !token ? (
								<>
									<img onClick={this.goTo('/')} src={getImage(logo_mobile, userAgent)} alt="" className="logo2" />
								</>
							) : page == 'online' ? (
								count_online_members + ' Members ' + page
							) : page == 'search' ? (
								page
							) : page == 'recommend' ? (
								<img onClick={this.goTo('/')} src={getImage(logo, userAgent)} alt="" className="logo2" />
							) : page == 'search sub' ? (
								'search'
							) : page == 'edit_gallery' ? (
								'photo upload'
							) : page == 'edit_info' ? (
								'my profile'
							) : page == 'edit_match' ? (
								'edit match criteria'
							) : page == 'edit_interest' ? (
								'my interests'
							) : page == 'edit_personality' ? (
								'personality'
							) : page == 'message_detail' ? (
								'messages'
							) : page == 'settings_profile' ? (
								'settings'
							) : page == 'settings_billing' ? (
								'settings'
							) : page == 'settings_notifications' ? (
								'settings'
							) : page == 'search_result' ? (
								<img onClick={this.goTo('/')} src={getImage(logo, userAgent)} alt="" className="logo2" />
							) : page == 'member' || page == 'member_my' ? (
								<><a className="back_link" onClick={this.goToBack}> ‹ </a><span className="profile_label">profile</span></>
							) : (
								page
							)
						}
						</div>
						{
							!token ? (
								<a text="Log In" onClick={this.showLogIn()} className="fs-16 pull-right mobile_login_btn">Login <img src="../../static/assets/img/login.png" className="login_icon" /></a>
							) : (
								<div>
									{
										page == 'message_detail' ? (
											<div className='remove_message_btn_wrap' id="remove_message_btn_wrap">
												<a href="javascript:;" className="remove_message_link" onClick={() => this.openModal(dialog)}><img src="../../static/assets/img/remove.png" className="remove_message_btn" /></a>
											</div>
										) : page == 'messages' ? (
											<div className={`messages_con ${status == 'delete selected' ? 'delete_selected' : ''}`} onClick={handleMessageMode}>{ status }</div>
										) : page == 'edit_info' || page == 'edit_match' || page == 'edit_interest' || page == 'edit_personality' || page == 'member_my' ? (
											''
										) : page == 'member' ? (
											<a href="javascript:;" className="dot_wrap" onClick={this.userMenuHandling}>
												<img src="../../static/assets/img/dot.png" className="dot_btn" />
											</a>
										) : page == 'settings_profile' || page == 'contact us' || page == 'about us' || page == 'privacy statement' || page == 'dating safety' || page == 'terms of use' || page == 'settings_billing' || page == 'settings_notifications' ? (
											''
										) : page == 'edit_gallery' && photos ? (
											<div className='sort_wrap_wrap' id="sort_wrap_wrap">
												<a href="javascript:;" className="sort_wrap" onClick={this.sortMenuHandling}><img src="../../static/assets/img/sort.png" className="sort_btn" /></a>
											</div>
										) : (
											<div className='sort_wrap_wrap' id="sort_wrap_wrap">
												<a href="javascript:;" className="sort_wrap" onClick={this.sortMenuHandling}><img src="../../static/assets/img/sort.png" className="sort_btn" /></a>
											</div>
										)
									}
									{is_hidden && <div className='hidden_wrap_wrap' id="hidden_wrap_wrap">
										<a href="javascript:;" className="hidden_wrap" onClick={this.hiddenHandling}><img src="../../static/assets/img/hidden.png" className="hidden_btn" /></a>
									</div>}
									{!is_hidden && is_busy && <div className='hidden_wrap_wrap' id="hidden_wrap_wrap">
										<a href="javascript:;" className="hidden_wrap" onClick={this.hiddenHandling}><img src="../../static/assets/img/busy.png" className="hidden_btn" /></a>
									</div>}
								</div>
							)
						}
						<div className={`sort_menu_wrap ${this.state.hidden_menu_show ? 'hidden_menu_wrap_show' : ''}`}>
							{
								<ul className="sort_ul">
									{is_hidden && <li className="sort_li">
										<span className="sort_link tab_title">Your profile is hidden for others</span>
									</li>}
									{!is_hidden && is_busy && <li className="sort_li">
										<span className="sort_link tab_title">Your profile is set as busy</span>
									</li>}
									<li className="sort_li">
										<a className="sort_link" onClick={goToSettings('/profile')}>Go to setup menu to adjust</a>
									</li>
									<li className="sort_li">
										<a href="javascript:;" className="sort_link">Cancel</a>
									</li>
								</ul>
							}
						</div>
						<div className={`sort_menu_wrap ${this.state.sort_menu_show ? 'sort_menu_wrap_show' : ''}`}>
							{
								page == 'search' || page == 'search sub' ? (
									<ul className="sort_ul">
										<li className="sort_li">
											<a className="sort_link" onClick={goTo('/saved')}>Saved searches</a>
										</li>
										<li className="sort_li">
											<a href="javascript:;" className="sort_link" onClick={goTo('/by_id')}>Member first name or ID</a>
										</li>
										{
											page == 'search' ? (
												<li className="sort_li">
													<a href="javascript:;" className="sort_link" onClick={clearForm}>Clear search form</a>
												</li>
											) : (
												<li className="sort_li">
													<a href="javascript:;" className="sort_link" onClick={goTo('')}>Return Search</a>
												</li>
											)
										}
										
									</ul>
								) : page== 'recommend' ? (
									<ul className="sort_ul">
										<li className="sort_li">
											<a href="javascript:;" className="sort_link" onClick={this.showSortMenu}>Sort by</a>
										</li>
										<li className="sort_li">
											<a href="javascript:;" onClick={this.editMatches} className="sort_link" >Improve Matches</a>
										</li>
										<li className="sort_li">
											<a href="javascript:;" onClick={this.goToSearch} className="sort_link" >Advanced search</a>
										</li>
									</ul>
								) : page== 'edit_gallery' ? (
									<ul className="sort_ul">
										<li className="sort_li">
											<a href="javascript:;" className="sort_link" onClick={this.showSortMenu}>Delete this photo</a>
										</li>
										{isMain ? <li className="sort_li">
											<a href="javascript:;" onClick={() => this.setMain()} className="sort_link" >Set as detault photo</a>
										</li> : ''}
									</ul>
								) : page == 'activity' ? (
									<div className="activity_right_menu">
										<div className="form-group title fs-18 bold">
											Actions from other users to me
										</div>
										<div className="pl-15 sub_item">
											{
												links.map((link, i) =>
												<div key={i} onClick={() => this.setState({tab: link}) || setLink(link)} className={cn('link-item', {active: (tab.key === link.key) && !tab.my})}>{link.title}</div>)
											}
										</div>
										<div className="form-group title fs-18 bold">
											My Activities
										</div>
										<div className="pl-15 sub_item">
											{
												myLinks.map((link, i) =>
												<div key={i} onClick={() => this.setState({tab: link}) || setLink(link)} className={cn('link-item', {active: (tab.key === link.key) && tab.my})}>{link.title}</div>)
											}
										</div>
									</div>
								) : (
									<ul className="sort_ul">
										<li className="sort_li">
											<a href="javascript:;" className="sort_link" onClick={this.showSortMenu}>Sort by</a>
										</li>
										{
											page == 'matches' ? (
												<li className="sort_li">
													<a href="javascript:;" onClick={this.editMatches} className="sort_link" >Improve Matches</a>
												</li>
											) : page == 'online' ? (
												''
											) : (
												''
											)
										}
									</ul>
								)
							}
						</div>
						<div className={`user_menu_wrap ${this.state.user_menu_show ? 'user_menu_wrap_show' : ''}`}>
							<ul className="sort_ul">
								<li className="sort_li">
									<a href="javascript:;" className="sort_link" onClick={toggleBlock}><img src="../../static/assets/img/block_user.png" className="block_user_btn" />{is_block ? 'Unblock user' : 'Block user'}</a>
								</li>
								<li className="sort_li">
									<a href="javascript:;" className="sort_link" ><img src="../../static/assets/img/report_user.png" className="report_user_btn" />Report user</a>
								</li>
							</ul>
						</div>
						<div className={`sort_item_wrap modal ${this.state.sort_show ? 'sort_item_wrap_show' : ''}`} id="sort_wrap" onClick={this.hideSortMenu}>
							<div className='sort_item_wrap_content'>
								{
									page == 'search_result' ? (
										<ul className="sort_ul">
											<li className="sort_li">
												<a href="javascript:;" className="sort_link sort_item_link" onClick={() => this.handleChangeResult('last_active')}>Last Active</a>
											</li>
											<li className="sort_li">
												<a href="javascript:;" className="sort_link sort_item_link" onClick={() => this.handleChangeResult('newest')}>Newest members</a>
											</li>
											<li className="sort_li">
												<a href="javascript:;" className="sort_link sort_item_link" onClick={() => this.handleChangeResult('youngest')}>Youngest</a>
											</li>
										</ul>
									) : page == 'edit_gallery' ? (
										<div className="confirm_delete">
											<h5 className="confirm_title">Are you sure to delete this photo?</h5>
											<div className="confirm_button_wrap">
												<button className="confirm_button confirm_yes" onClick={() => this.confirmDeletePhoto()}>Yes</button>
												<button className="confirm_button confirm_no" onClick={() => this.cancelDeletePhoto()}>No</button>
											</div>
										</div>
									) : (
										<ul className="sort_ul">
											<li className="sort_li">
												<a href="javascript:;" className="sort_link sort_item_link" onClick={() => this.handleChange('last_active')}>Last Active</a>
											</li>
											<li className="sort_li">
												<a href="javascript:;" className="sort_link sort_item_link" onClick={() => this.handleChange('newest')}>Newest members</a>
											</li>
											<li className="sort_li">
												<a href="javascript:;" className="sort_link sort_item_link" onClick={() => this.handleChange('youngest')}>Youngest</a>
											</li>
										</ul>
									)
								}
							</div>
						</div>						
					</div>
				</div>
				{
					page == 'recommend' || page == 'matches' || page == 'activity' || page == 'online' || page == 'search_result' || page == 'messages' ? (
						<div className="secondary_menu only_mobile">
							<ul className="secondary_ul">
								<li className="secondary_li">
									<a href="/online" onClick={this.goTo('/online')} className={`menu_link ${page == 'online' ? 'active_secondary_menu' : ''}`} >
										{
											page == 'online' ? (
												<img src="../../static/assets/img/multy-user.png" className="menu_item_icon" />
											) : (
												<img src="../../static/assets/img/multy-user_dark.png" className="menu_item_icon" />
											)
										}
										<br />{count_online_members} online
									</a>
								</li>
								<li className="secondary_li">
									<a href="/matches" onClick={has_default_match ? this.goTo('/edit/match') : this.goTo('/matches') } className={`menu_link ${page == 'matches' ? 'active_secondary_menu' : ''}`} >
										{
											page == 'matches' ? (
												<img src="../../static/assets/img/matches.png" className="menu_item_icon" />
											) : (
												<img src="../../static/assets/img/matches_dark.png" className="menu_item_icon" />
											)
										}									
										<br />matches
									</a>
								</li>
								<li className="secondary_li">
									<a href="/search" onClick={this.goTo('/search')} className={`menu_link ${page == 'search_result' ? 'active_secondary_menu' : ''}`} >
										{
											page == 'search_result' ? (
												<img src="../../static/assets/img/search.png" className="menu_item_icon" />
											) : (
												<img src="../../static/assets/img/search_dark.png" className="menu_item_icon" />
											)
										}
										<br />search
									</a>
								</li>
								<li className="secondary_li">
									<a href="/messages" onClick={this.goTo('/messages')} className={`menu_link ${page == 'messages' ? 'active_secondary_menu' : ''}`} >
										{
											page == 'messages' ? (
												<img src="../../static/assets/img/message.png" className="menu_item_icon" />
											) : (
												<img src="../../static/assets/img/message_dark.png" className="menu_item_icon" />
											)
										}
										<br />messages
									</a>
								</li>
								<li className="secondary_li">
									<a href="/activity" onClick={this.goTo('/activity')} className={`menu_link ${page == 'activity' ? 'active_secondary_menu' : ''}`} >
										{
											page == 'activity' ? (
												<img src="../../static/assets/img/activity.png" className="menu_item_icon" />
											) : (
												<img src="../../static/assets/img/activity_dark.png" className="menu_item_icon" />
											)
										}
										<br />activity
									</a>
								</li>
							</ul>
						</div>
					) : page == 'edit_info' || page == 'edit_match' || page == 'edit_interest' || page == 'edit_personality' || page == 'edit_gallery' ? (
						<div className="only_mobile">
							<div className="secondary_profile_menu">
								<a
									onClick={goToProfile('/gallery')}
									className={cn('profile-link', { active: page === 'edit_gallery' })}>Photos</a>

								<a
									onClick={goToProfile('/info')}
									className={cn('profile-link', { active: page === 'edit_info' })}>Profile</a>
								<a
									onClick={goToProfile('/match')}
									variant="navigation"
									className={cn('profile-link', { active: page === 'edit_match' })}>Match</a>
								<a
									onClick={goToProfile('/interest')}
									variant="navigation"
									className={cn('profile-link', { active: page === 'edit_interest' })}>Interest</a>
								<a
									text="Personality"
									onClick={goToProfile('/personality')}
									variant="navigation"
									className={cn('profile-link', { active: page === 'edit_personality' })}>Personality</a>
							</div>
							{
								page == 'edit_info' ? (
									<div className="user_info_wrap">
										<div className="user_photo_wrap">
											<img src={main_photo_thumb} className="user_photo" />
										</div>
										<div className="user_private_wrap">
											<h4 className="user_name">{first_name}, {age}</h4>
											<h5 className="user_address">{user_address}</h5>
										</div>
										<div className="user_special_info_wrap">
											<h5 className="user_status1">
												{
													account_status == 'platinum' ? 'Premium Member'
													: account_status == 'free_platinum' ? 'Free Premium member'
													: account_status == 'free_platinum_on_hold' ? 'Free Premium membership'
													: account_status
												}
											</h5>
											<h6 className="user_id">Your ID: {profile_id}</h6>
										</div>
									</div>
								) : (
									''
								)
							}
						</div>
					) : page == 'settings_profile' || page == 'settings_billing' || page == 'settings_notifications' ? (
						<div className="secondary_profile_menu secondary_settings_menu only_mobile">
							<a
								onClick={goToSettings('/profile')}
								className={cn('profile-link settings-link', { active: page === 'settings_profile' })}>Profile Settings</a>

							<a
								onClick={goToSettings('/billing')}
								className={cn('profile-link settings-link', { active: page === 'settings_billing' })}>Billing</a>
							<a
								onClick={goToSettings('/notifications')}
								variant="navigation"
								className={cn('profile-link settings-link', { active: page === 'settings_notifications' })}>Notifications</a>
						</div>
					) : (
						''
					)
				}
				{
					login
					?   <MainModal
							body={<Login />}
							title="Log In"
							show={login}
							size={sizeLoginModal}
							keyModal="login" />
					:   null
				}
				{
					switch_profile 
					?   <MainModal 
							body ={<Switch_profile/>}
							show = {switch_profile}
							size = "sm"
							keyModal = "switch_profile" /> 
					:   null
				}
				{
					shure_delete 
					?   <MainModal 
							body ={<Shure_delete/>}
							className = {'shure_delete'}
							show = {shure_delete}
							size = "sm"
							keyModal = "shure_delete" /> 
					:   null
				}
				{
					recovery
					?   <MainModal
							body={<Recovery />}
							title="Forgot password"
							show={recovery}
							size="sm"
							keyModal="recovery" />
					:   null
				}
				{
					memberModal
					?   <MainModal
							body={<MemberInfo />}
							title=""
							show={memberModal}
							size="lg"
							keyModal="member" />
					:   null
				}
				{
					membershipInfo
					?   <MainModal
							body={<MembershipInfo />}
							show={membershipInfo}
							keyModal="membershipInfo" />
					:   null
				}
				{
					uncomplete
					?   <MainModal
							title="Complete your profile to continue"
							body={<Uncomplete />}
							show={uncomplete}
							callback={this.showMessage}
							keyModal="uncomplete" />
					:   null
				}
				{
					subscription ?
							<StripeProvider apiKey="pk_test_Df8DayIsIlhBCpUTWp0o3UXT00WlMTfpDJ">
								<MainModal
								title=""
								body={<MemberFrom />}
								show={subscription}
								callback={() => {
									const [, path, page, dialogId] = window.location.pathname.split('/');
									if(path === 'messages', page === 'dialog') {
										this.props.dispatch(getDialog(dialogId)).then(res=> console.log(res))
									}
								}}
								keyModal="subscription" />
							</StripeProvider>
					:   null
				}

				{
					autoRenewal ?
						<MainModal
							title=''
							body={<AutoRenewal />}
							show={autoRenewal}
							keyModal='autoRenewal'
						/> : null
				}

				{
					nineDayToAutoRenewal ?
						<MainModal
							title=''
							body={<NineDayToAutoRenewal />}
							show={nineDayToAutoRenewal}
							keyModal='nineDayToAutoRenewal'
						/> : null
				}

				{
					expiredSubscription ?
						<MainModal
							title=''
							body={<ExpiredSubscription />}
							show={expiredSubscription}
							keyModal='expiredSubscription'
						/> : null
				}
				
				<style jsx>{`
					// .logo_messages{
					// 	margin-left: -23px !important;
					// }
					// .main_menu_messages {
					// 	// margin-right: 9px !important;
					// }
					// .avatar_wrap_messages {
					// 	margin-right: -7px !important;
					// }
					.mobile_login_btn{
						background: transparent;
						color: #fff;
						padding-top: 5px;
						min-width: 50px;
						border: none;
					}
					.wrap-header.private .navbar-default.admin {
						background-color: #1453c5 !important;
					}

					.status-wrapper {
						margin-right: 20px;
						font-size: 13px;

					}
					.busy-status-label {
						margin: 15px;
						color: red;
						background-color: white;
						border-radius: 9px;
						margin-right: 5px !important;
					}
					.hidden-status-label {
						margin: 15px;
						color: black;
						background-color: white;
						border-radius: 9px;
						font-size: 15px;
					}
					.hidden-status-label i span {
						font-family: Open Sans;
						font-size: 13px;
					}
					.tooltip {
						position: absolute;
						width: 138px;
						opacity: 0;
						z-index: -2;
						right: 110px;
						color: white;
						top: 7px;
						padding: 10px;
						border-radius: 5px;
						transition: opacity .3s;
					}
					.status-circle {
						cursor: pointer;
					}
					.status-circle:hover ~ .tooltip {
						z-index: 1;
						display: initial;
						opacity: 1;
						transition: opacity .3s;
						
					}
					.tooltip-overlay {
						right: 0px;
						top: 0px;
						left: 0px;
						bottom: 0px;
						border-radius: 5px;
						position: absolute;
						z-index: -1;
						background: rgba(0, 0, 0, 0.2);
						width: 100%;
						height: 100%;
					}
					.logo-user {
						width: 50px;
						height: 50px;
						border-radius: 5px;
						background: #fff;
						background-image: url(${sexPhotoFinder(sex, main_photo_thumb)});
						background-size: cover;
						background-position: center;
						cursor: pointer;
					}
					#user-menu {
						position: relative;
					}
					.wrap-menu {
						position: absolute;
						white-space: nowrap;
						top: 50px;
						right: 0;
						background: #fff;
						border-radius: 5px;
						box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.2);
						height: auto;
						z-index: 1;
						overflow: hidden;
						display: none;
					}
					.wrap-menu.show {
						display: block;
					}
					.menu-item {
						cursor: pointer;
						padding: 5px 20px;
					}

					.menu-item:hover {
						background: #EE363D;
						color: #fff;
					}

					.admin .menu-item:hover {
						background: #1453c5 !important;
						color: #fff;
					}
					
					@media screen and (max-width: 1000px) {
						.status-circle {
							display: none;
						}
					}
					@media screen and (max-width: 768px) {
						.profile-link {
							cursor: pointer;
							text-transform: none;
							font-weight: bold;
							border-radius: 5px;
							padding: 10px 6.5%;
							border: 1px solid #fff;
							color: #C5141B;
						}
						.settings-link{
							padding: 10px 9%;
						}
						.profile-link.active {
							border-color: #C5141B;
						}
						.profile-link:hover {
							text-decoration: none;
						}
						.user_info_wrap{
							padding: 5px 10px;
							border-bottom: 1px solid rgba(0, 0, 0, 0.1);
							height: 60px;
						}
						.user_photo_wrap{
							float: left;
						}
						.user_photo{
							width: 50px;
							height: 50px;
							border-radius: 50%;
							object-fit: cover;
						}
						.user_private_wrap{
							float: left;
							padding-left: 10px;
						}
						.user_name{
							font-weight: 900;
							margin-top: 7px;
						}
						.user_address{
							margin-top: -5px;
						}
						.user_special_info_wrap{
							float: right;
						}
						.user_id{
							margin-top: -3px;
						}
						.user_status1{
							color: ${color};
							text-transform: capitalize;
						}
					}
					@media screen and (max-width: 415px) {
						.profile-link {
							padding: 10px 2%;
						}
						.settings-link{
							padding: 10px 4%;
						}
					}
				`}
				</style>
			</div>
		);
	}
}

const mapStateToProps = ({user, ui}) =>
	({
		account_status: user.data.account_status,
		role: user.data.role,
		isAdmin: user.isAdmin,
		is_busy: user.data.is_busy,
		is_hidden: user.data.is_hidden,
		shure_delete: ui.modals.shure_delete,
		switch_profile: ui.modals.switch_profile,
		login: ui.modals.login,
		uncomplete: ui.modals.uncomplete,
		recovery: ui.modals.recovery,
		sex: user.data.sex,
		profile_id: user.data.profile_id,
		first_name: user.data.first_name,
		age: user.data.age,
		token: user.token,
		unreadMessage: user.data.unread_message,
		main_photo_thumb: user.data.main_photo_thumb,
		memberModal: ui.modals.member,
		sizeLoginModal: ui.sizeLoginModal,
		membershipInfo: ui.modals.membershipInfo,
		has_default_match: user.data.has_default_match,
		count_online_members: user.data.count_online_members,
		inbox_unread_messages_count: user.data.inbox_unread_messages_count,
		subscription: ui.modals.subscription,
		autoRenewal: ui.modals.autoRenewal,
		nineDayToAutoRenewal: ui.modals.nineDayToAutoRenewal,
		expiredSubscription: ui.modals.expiredSubscription,
	})

export default connect(mapStateToProps)(PublicHeader)