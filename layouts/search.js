import BtnMain from '../components/buttons/btn_main'
import { Router } from '../routes'
import cn from 'classnames'
import { Fragment } from 'react';
import BtnUpgradeMembership from '../components/buttons/btn_upgrade_membership';

const LayoutSearch = ({children, page}) => {
	const goTo = link => e => {
		e.preventDefault()
        Router.pushRoute(`/search${link}`)
    }
	return (
		<div className="" style={{marginTop: 15}}>
			<div className="wrap-navigation">
				<a
					onClick={goTo('')}
					className={cn('profile-link', {active: page === 'search'})}>Advanced search</a> 

				<a
					onClick={goTo('/saved')}
					className={cn('profile-link', {active: page === 'saved'})}>Saved Searches</a> 
				<a
					onClick={goTo('/by_id')}
					variant="navigation"
					className={cn('profile-link', {active: page === 'by_id'})}>Member first name or ID</a>
				<div className="upgrade-btn">
					<BtnUpgradeMembership />
                </div>
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

export default LayoutSearch