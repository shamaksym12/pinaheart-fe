import React, { Component } from 'react'
import BtnMain from '../buttons/btn_main'
import { connect } from 'react-redux'
import { Router } from '../../routes'
import { removeMessage, restoreMessage, removeDraft, removeMessagePermanent } from '../../actions/message'
import { setActiveTab, setAlert } from '../../actions/ui'
import { makeCDN } from '../../utils'

class MailItem extends Component {

    getMessage = () => {
        const { type, id } = this.props
        Router.pushRoute(`/mail/${type}/${id}`)
    }

    removeMessage = () => {
    	const { dispatch, type, id, testing } = this.props
        if (testing) {
            dispatch(setAlert('Not available for test user', 'error'))
            return
        }
    	dispatch(removeMessage(id, type))
    }

    removePermanent = () => {
    	const { dispatch, id, type, testing } = this.props
        if (testing) {
            dispatch(setAlert('Not available for test user', 'error'))
            return
        }
    	dispatch(removeMessagePermanent(id, type))
    }

    removeDraft = () => {
    	const { dispatch, id, testing } = this.props
        if (testing) {
            dispatch(setAlert('Not available for test user', 'error'))
            return
        }
    	dispatch(removeDraft(id))
    }

    restore = () => {
    	const { dispatch, id, userId, sender_id } = this.props
    	const key = userId === sender_id ? 'outgoing' : 'incoming'
    	dispatch(restoreMessage(id, key))
    	.then(res => {
    		dispatch(setActiveTab(key, 'mail'))
    	})
    }

    goToMember = id => e => {
    	e.preventDefault()
    	Router.pushRoute(`/member/${id}`)
    }

    getDate = type => {
        const [date, time] = this.props.date.split(' ')
        return type === 'date' ? date : time
    }

    getData = () => {
    	const { 
    		type,
    		sender_avatar,
    		sender_first_name,
    		sender_id,
    		role,
    		translation,
    		original,
    		receiver_avatar,
    		receiver_first_name,
    		receiver_id,
    		userId
    	} = this.props

    	switch (type) {
    		case 'outgoing':
    			return {
    				fromTo: 'To',
                    avatar: receiver_avatar,
                    oponent: receiver_first_name,
                    member_id: receiver_id,
                    removeFunc: this.removeMessage,
                    text: original
    			}
    		case 'draft':
    			return {
    				fromTo: 'To',
                    avatar: userId === sender_id ? receiver_avatar : sender_avatar,
                    oponent: userId === sender_id ? receiver_first_name : sender_first_name,
                    member_id: userId === sender_id ? receiver_id : sender_id,
                    removeFunc: this.removeDraft,
                    text: original
    			}
    		case 'deleted':
    			return {
    				fromTo: userId === sender_id ? 'To' : 'From',
                    avatar: userId === sender_id ? receiver_avatar : sender_avatar,
                    oponent: userId === sender_id ? receiver_first_name : sender_first_name,
                    member_id: userId === sender_id ? receiver_id : sender_id,
                    removeFunc: this.removePermanent,
                    text: userId === sender_id ? original : (role === 'client' ? translation : original)
    			}
    		default:
    			return {
    				fromTo: 'From',
                    avatar: sender_avatar,
                    oponent: sender_first_name,
                    member_id: sender_id,
                    removeFunc: this.removeMessage,
                    text: role === 'client' ? translation : original
    			}
    	}
    }

    componentDidMount() {
        const isFirefox = typeof InstallTrigger !== 'undefined'
        if (isFirefox) {
            if (this.elipsis.innerText.length >= 30) {
                this.elipsis.innerText = this.elipsis.innerText.replace(/\n/g, '').slice(0, 30) + '...'
            }
        }
    }

    render() {
    	const { type, role, read } = this.props
    	const data = this.getData()
        
        return (
           <div className="p-15">
                <div className={`row ${role} ${!read && (type === 'incoming' || type === 'deleted') ? 'unread-message' : ''}`}>
                    <div className="col-sm-2">
                        <a href={`/member/${data.member_id}`} onClick={this.goToMember(data.member_id)}>
                            <img src={makeCDN(data.avatar)} alt="" className="img-responsive pointer" />
                        </a>
                    </div>
                    <div className="col-sm-10">
                        <div><strong>{data.fromTo}: </strong>{data.oponent}</div>
                        {
                            type != 'draft' &&  <div>
				                                    <div><strong>Date: </strong>{this.getDate('date')}</div>
				                                    <div><strong>Time: </strong>{this.getDate('time')}</div>
				                                </div>
                        }  
                        <div ref={ref => this.elipsis = ref} className="form-group text-elipsis">
                            <strong>Message: </strong>
                            <span id={`description-${this.props.id}`} dangerouslySetInnerHTML={{__html: data.text}} />
                        </div>
                        <BtnMain
                            onClick={this.getMessage}
                            text="Read Message" />
                        &nbsp;
                        <BtnMain
                            onClick={data.removeFunc}
                            text="Remove message" />
                        &nbsp;
                        {
                            type === 'deleted' && <BtnMain
				                                    onClick={this.restore}
				                                    text="Restore message" />
                        }  
                    </div>
                </div>
                <hr />
            </div> 
        )
    }
}

const mapStateToProps = ({user}) => 
    (
        {
            role: user.data.role,
            userId: user.data.id,
            testing: user.testing,
        }
    )

export default connect(mapStateToProps)(MailItem)