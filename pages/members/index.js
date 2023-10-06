import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts/stories'
import SearchForm from '../../components/forms/search_form'
import MemberBlock from '../../components/block/member_block'
import { getPublicMembers } from '../../actions/members'
import { Router } from '../../routes'
import { setUiKey } from '../../actions/ui'

class Members extends Component {

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getPublicMembers())
    }

    goToRegistration = e => {
    	const { dispatch } = this.props
    	dispatch(setUiKey('showRegistration', true))
    	window.scrollTo(0,0)
    	Router.pushRoute('/')
    }

    render() {
    	const { publicList } = this.props
        return (
            <Layout>
            	<SearchForm publicPage />
            	<MemberBlock
            		stars={false} 
        			list={publicList}
        			more={true}
        			onClickItem={this.goToRegistration}
        			onClick={this.goToRegistration} />
            </Layout>
        );
    }
}

const mapStateToProps = state => ({publicList: state.members.public})

export default connect(mapStateToProps)(Members)