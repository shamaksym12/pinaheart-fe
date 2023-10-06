import React, { Component } from 'react'
import MailItem from './mail_item'
import ContactItem from './contact_item'

class MessagesList extends Component {
	getList = list => {
		const { userId, type } = this.props
		if (type === 'incoming' || type === 'outgoing') {
			return list.filter(item => ! item.remove_for_user.split(',').includes(this.props.userId.toString()))
		}
		return list
	}

	printList = (item, i) => {
		const { type } = this.props
		return type === 'contacts' ? <ContactItem key={i} {...item} /> : <MailItem key={i} type={type} {...item} />
	}

    render() {
    	const { list } = this.props
        return (
            <div>{this.getList(list).map((item, i) => this.printList(item, i))}</div>
        )
    }
}

export default MessagesList