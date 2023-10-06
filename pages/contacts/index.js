import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import PrivateLayout from '../../layouts/private'
import { getContacts } from '../../actions/members'
import MemberBlock from '../../components/block/member_block'

class Contacts extends Component {
	static async getInitialProps({query}) {
	    return {type: query.slug}
  	}

    componentDidMount() {
        const { dispatch, type } = this.props
        dispatch(getContacts(type))
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch, type } = this.props
        if (nextProps.type !== type) {
            dispatch(getContacts(nextProps.type))
        }
    }

    render() {
        const { type, contacts } = this.props;
        return (
            <Layout>
            	<PrivateLayout>
                    <div className="pt-15">
                        <MemberBlock list={contacts[type]} type={type} />
                    </div>
            	</PrivateLayout>
        	</Layout>
        )
    }
}

const mapStateToProps = ({members: {contacts}}) => ({contacts})

export default connect(mapStateToProps)(Contacts)