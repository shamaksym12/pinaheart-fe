import React, { Component } from 'react'
import Layout from '../../layouts'
import PrivateLayout from '../../layouts/private'
import SubscribeTable from '../../components/tables/subscribe'
import SubscribeTabs from '../../components/tabs/subscribe'

class Subscribe extends Component {
	render() {
		return (
			<Layout>
				<PrivateLayout>
					<div className="pt-15">
						<div className="hidden-xs hidden-sm hidden-md">
                            <SubscribeTable />
                        </div>
                        <div className="visible-xs visible-sm visible-md">
                            <SubscribeTabs />
                        </div>
					</div>
				</PrivateLayout>
			</Layout>
		)
	}
}

export default Subscribe