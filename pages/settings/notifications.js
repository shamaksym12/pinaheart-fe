import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import PrivateLayout from '../../layouts/private'
import SettingsLayout from '../../layouts/settings'
import Head from 'next/head'
import { getNotificationsSettings, changeNotificationsActivitiesPeriod, changeNotificationsMessagesPeriod } from '../../actions/notifications';

class Notifications extends Component {
	componentDidMount() {
		this.props.dispatch(getNotificationsSettings());
	}

	handleChangeMessagesNotifications = (period) => {
		this.props.dispatch(changeNotificationsMessagesPeriod(period));
	}

	handleChangeActivitiesNotifications = (period) => {
		this.props.dispatch(changeNotificationsActivitiesPeriod(period));
	}

	render() {
		const { role, emailNotifications } = this.props
		const new_activity = emailNotifications['new-activity'];
		const new_message = emailNotifications['new-message'];

		return (
			<Layout page="settings_notifications">
				<PrivateLayout>
					<SettingsLayout page="notifications">
						<Head>
							<title>PinaHeart.com</title>
						</Head>
						<table className="table table-borderless setting_notification_table">
							<thead>
								<tr>
									<th scope="col" className="email_notifications">Email Notifications</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<div className="col-sm-3 row-title">New messages:</div>
									<div className="col-sm-9 row_content">
										<div className="select-section">
											<div className="select-section-wrapper">
												<div onClick={() => new_message !== 'daily' && this.handleChangeMessagesNotifications('daily')} className={` m-3 col-4 col-sm-2 block-select row_item ${new_message === 'daily' && 'selected'}`}>
													Daily
												</div>
												<div onClick={() => new_message !== 'weekly' && this.handleChangeMessagesNotifications("weekly")} className={`col-sm-2 block-select row_item ${new_message === 'weekly' && 'selected'}`}>
													Weekly
												</div>
												<div onClick={() => new_message !== 'never' && this.handleChangeMessagesNotifications("never")} className={`col-sm-2 block-select row_item ${new_message === 'never' && 'selected'}`}>
													Never
												</div>
											</div>  
										</div>
									</div>
								</tr>
								<tr>
									<div className="col-sm-3 row-title">Interests in me or adding me to favorites:</div>
									<div className="col-sm-9 row_content">
										<div className="select-section">
											<div className="select-section-wrapper">
												<div onClick={() => new_activity !== 'daily' && this.handleChangeActivitiesNotifications("daily")} className={`col-sm-2 block-select row_item ${new_activity === 'daily' && 'selected'}`}>
													Daily
												</div>
												<div onClick={() => new_activity !== 'weekly' && this.handleChangeActivitiesNotifications("weekly")} className={`col-sm-2 block-select row_item ${new_activity === 'weekly' && 'selected'}`}>
													Weekly
												</div>
												<div onClick={() => new_activity !== 'never' && this.handleChangeActivitiesNotifications("never")} className={`col-sm-2 block-select row_item ${new_activity === 'never' && 'selected'}`}>
													Never
												</div>
											</div>  
										</div>
									</div>
								</tr>
							</tbody>
						</table>
						<style jsx>
							{`
								.row-title {
									margin: 10px 0;
								}
								thead tr th {
									border: none;
									background-color: #F9F9F9;
									border-radius: 9px;
								}
								tbody tr {
									// border-top: 1px solid #F9F9F9;
									border-bottom: 1px solid #F9F9F9;

								}
								.block-select {
									border: 1px solid #ccc;
									border-radius: 9px;
									padding: 9px 10px;
									cursor: pointer;
									white-space: nowrap;
									margin: 10px;
								}
								.block-select.selected,
								.block-select:hover {
									background-color: #F1FFE0;
								}
							`}
						</style>
					</SettingsLayout>
				</PrivateLayout>
			</Layout>
		)
	}
}

const mapStateToProps = ({user: {data}, notifications: {email}}) => ({
	role: data.role,
	emailNotifications: email,
})

export default connect(mapStateToProps)(Notifications)