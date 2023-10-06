import BtnMain from '../components/buttons/btn_main'
import { connect } from 'react-redux'
import { Router } from '../routes'
import cn from 'classnames'
import { Fragment } from 'react'
import { logout } from '../actions/auth'

const LayoutSettings = ({children, page, dispatch}) => {
	const goTo = link => e => {
		e.preventDefault()
      Router.pushRoute(`/settings${link}`)
    }
    const logOut = () => e => {
    	e.preventDefault()
    	dispatch(logout()).then(res => {
        	if (res) {
          	window.location.href = '/'
        	}
    	})
    }
	return (
		<div className="container" style={{marginTop: 15}}>
			<div className="wrap-navigation">
				<a
					onClick={goTo('/profile')}
					className={cn('profile-link', {active: page === 'profile'})}>Profile Settings</a>
				<a
					onClick={goTo('/billing')}
					className={cn('profile-link', {active: page === 'billing'})}>Billing</a> 
				<a
					onClick={goTo('/notifications')}
					variant="navigation"
					className={cn('profile-link', {active: page === 'notifications'})}>Notifications</a> 
				<a
					onClick={logOut()}
					variant="navigation"
					className={cn('profile-link logout')}>Logout</a>
			</div>
			<div style={{paddingTop: 15}}>
	      		{ children }
		    </div>
		    <style jsx>{`
		    	.wrap-navigation {
	    		    display: flex;
    				flex-wrap: wrap;
    				align-items: center;

		    	}
		    	.logout {
		    		margin-left: auto;
		    	}
		    	@media(max-width: 768px) {
		    		.upgrade-btn {
		    			width: 100%;
		    		}
		    		
		    	}
		    	.profile-link {
		    		cursor: pointer;
		    		padding-right: 20px;
		    		padding-left: 20px;
		    		text-transform: none;
		    		font-weight: bold;
		    		border-radius: 5px;
		    		padding: 10px 15px;
		    		border: 1px solid #fff;
		    		color: #C5141B;
		    	}
		    	.profile-link.active {
		    		border-color: #C5141B;
		    	}
		    	.profile-link:hover {
		    		text-decoration: none;
		    	}
	    	`}
		    </style>
	    </div>
	)
}

export default connect()(LayoutSettings)