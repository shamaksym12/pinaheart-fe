import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Tabs, Tab } from 'react-bootstrap'
import { setActiveTab } from '../../actions/ui'
import { logout } from '../../actions/auth'
import { Router } from '../../routes'
import BtnMain from '../buttons/btn_main'

export class CustomTabs extends Component {
	handleSelect = key => {
		const { dispatch, tabKey } = this.props
		if (key === 'logout') {
			dispatch(logout()).then(res => {
	            if (res) {
	                Router.pushRoute('/')
	            }
	        })
	        return
		}
		dispatch(setActiveTab(key, tabKey))
		this.props.onChange(key)
	}

	printTabs = (tab, i) => {
		const className = tab.eventKey === 'button' ? 'button-tab' : null
		return 	<Tab key={i} eventKey={tab.eventKey} className={className} title={tab.title}>
					<div className={`pt-15`}>{tab.content}</div>
				</Tab>
	}

    render() {
    	const { tabs, activeTab, tabKey } = this.props
        return (
            <div className="tabs-wrap">
				<Tabs id="tab" activeKey={activeTab[tabKey]} onSelect={this.handleSelect}>
					{ tabs.map((tab, i) => this.printTabs(tab, i)) }
					{
						tabKey === 'edit'
						&& 	<BtnMain
			                    className="btn-green"
			                    onClick={this.recovery}
			                    text="Upgrade membership" />
					}
				</Tabs>
				<style jsx>{`
					.tabs-wrap {
						position: relative;
					}
				`}
				</style>
			</div>
        )
    }
}

const mapStateToProps = state => ({activeTab: state.ui.tab})

export default connect(mapStateToProps)(CustomTabs)