import BtnMain from '../components/buttons/btn_main'
import { Router } from '../routes'
import cn from 'classnames'
import { Fragment } from 'react';
import BtnUpgradeMembership from '../components/buttons/btn_upgrade_membership';
import BtnBextMatchCriteria from '../components/buttons/btn_next_match_criteria';

const LayoutProfile = ({ children, page }) => {
	const goTo = link => e => {
		e.preventDefault()
		Router.pushRoute(`/edit${link}`)
	}

	const onSubmitBtnNext = () => {
		const props = {
			action: 'btnNextPress',
		}
		location.hash = JSON.stringify(props)
	}

	const { router } = Router

	return (
		<div className="container" style={{ marginTop: 15 }}>
			<div className="wrap-navigation">
				<a
					onClick={goTo('/gallery')}
					className={cn('profile-link', { active: page === 'edit_info' })}>Photos</a>

				<a
					onClick={goTo('/info')}
					className={cn('profile-link', { active: page === 'info' })}>Profile</a>
				<a
					onClick={goTo('/match')}
					variant="navigation"
					className={cn('profile-link', { active: page === 'match' })}>Match</a>
				<a
					onClick={goTo('/interest')}
					variant="navigation"
					className={cn('profile-link', { active: page === 'interest' })}>Interest</a>
				<a
					text="Personality"
					onClick={goTo('/personality')}
					variant="navigation"
					className={cn('profile-link', { active: page === 'personality' })}>Personality</a>
				<div className="upgrade-btn">
					{router && router.route && router.route == '/edit/info' ? <BtnBextMatchCriteria onSubmit={onSubmitBtnNext} /> : <BtnUpgradeMembership />}
				</div>
			</div>
			<div style={{ paddingTop: 15 }}>
				{children}
			</div>
			<style jsx>{`
		    	.wrap-navigation {
	    		    display: flex;
    				flex-wrap: wrap;
    				align-items: center;

		    	}
		    	.upgrade-btn {
		    		margin-left: auto;
		    		margin-top: 15px;
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

export default LayoutProfile