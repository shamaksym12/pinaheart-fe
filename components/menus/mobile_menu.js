import React, { Component } from 'react'
import { Router } from '../../routes'
import { toggleModal } from '../../actions/ui'
import store from '../../store'

class MobileMenu extends Component {
    showModal = type => e => {
    	store.dispatch(toggleModal(true, type))
    }

    goToSection = link => e => {
    	Router.pushRoute(link)
    }

    render() {
    	const { client } = this.props
        return (
           	<div className="mobileWrap">
	            <ul>
                    <li>
                        <a href="javascript:;">
                            <span onClick={this.goToSection('/profile/info')}>Profile</span>
                            <i className="fas fa-user"></i>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;">
                            <span onClick={this.goToSection('/edit/info')}>Edit</span>
                            <i className="fas fa-cog"></i>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;">
                            <span onClick={this.goToSection('/edit/password')}>Change password</span>
                            <i className="fas fa-unlock-alt"></i>
                        </a>
                    </li>
                    {
                        client &&  	<li>
		                                <a href="javascript:;">
		                                    <span onClick={this.showModal('credits')}>Add Credits</span>
		                                    <i className="fas fa-credit-card"></i>
		                                </a>
		                            </li>
                    }
                    {
                        client &&  	<li>
		                                <a href="javascript:;">
		                                    <span onClick={this.goToSection('/subscribe')}>Membership</span>
		                                    <i className="fab fa-paypal"></i>
		                                </a>
		                            </li>
                    }  
                </ul>
            </div> 
        );
    }
}

export default MobileMenu