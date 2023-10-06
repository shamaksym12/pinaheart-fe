import React, { Component } from 'react'
import { Grid, Row } from 'react-bootstrap'
import Layout from './index'

class Success extends Component {
	render() {
		const { children } = this.props
		return (
			<Layout>
				<div className="pt-100">
		            <Grid>
		            	<div className="bg-white p-15">
		            		<div>
				                { children }
				            </div>
		            	</div>
	            	</Grid>
	        	</div>
        	</Layout>
		)
	}
}

export default Success