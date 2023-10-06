import React, { Component } from 'react'
import { Router } from '../routes'

class NotFound extends Component {
	goToMain = e => {
		e.preventDefault()
		Router.pushRoute('/')
	}
    render() {
        return (
        	<div className="bg-white p-15 wrap-404 position-relative">
        		<div className="arrow-404">
        			<img src="/static/assets/img/arrow.png" className="img-responsive" alt="" />
    			</div>
	        	<div className="container position-relative vh-100">
	        		<div className="content-404">
	        			<img className="content-404-img" src="/static/assets/img/ship_icon.png" alt="" />
		            	<div className="content-404-title font-bebas">THIS PAGE CAN'T <br />BE FOUND.</div>
		            	<div className="content-404-link">Please return to <a href="/" onClick={this.goToMain}> home page</a></div>
					</div>
				</div>
			</div>
        );
    }
}

export default NotFound