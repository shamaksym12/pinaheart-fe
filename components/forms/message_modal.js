import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup } from 'react-bootstrap'
import BtnMain from '../buttons/btn_main'
import Textarea from '../inputs/textarea'
import Validator from '../../validate'
import UploadDropdown from '../inputs/upload_dropdown'
import { sendMessage, setSendingMessage, buyMessage, saveDraft, clearAttachAll, setMessagesKey } from '../../actions/message'
import { setActiveTab, toggleModal, setAlert } from '../../actions/ui'
import { Router } from '../../routes'
import { LETTER_PRICE, PHOTO_PRICE } from '../../config'
import { confirmAlert } from 'react-confirm-alert'

export class MessageModal extends Component {

    state = {
        value: ''
    }

    showAlert = data => {
        const { dispatch, userCredits, letterPrice } = this.props
        //const messagePrice = LETTER_PRICE + (data.attachment.length * PHOTO_PRICE)
        confirmAlert({
            title: '',
            message: userCredits >= letterPrice ? 'Use Your Dibs to send message' : 'You do not have enough dibs to send message. Click Buy Dibs to chose the package.',
            buttons: [
                {
                    label: 'Cancel',
                    onClick: () => {
                        dispatch(setSendingMessage({}))
                    }
                }, {
                    label: userCredits >= letterPrice ? 'Use Dibs' : 'Buy Dibs',
                    onClick: () => {
                        if (userCredits >= letterPrice) {
                            dispatch(buyMessage(data)).then(res => {
                                if (res) {
                                    dispatch(toggleModal(false, 'message'))
                                    dispatch(setActiveTab('outgoing', 'mail'))
                                    Router.pushRoute('/mail/outgoing')
                                }
                            })
                        } else {
                            // console.log(letterPrice)
                            dispatch(setSendingMessage({...data, letterPrice}))
                            dispatch(toggleModal(true, 'credits'))
                        }
                    }
                }
            ]
        })
    }

    saveDraft = () => {
        let error = 1
        error *= Validator.check(this.message.value, ['required'], 'Message')
        if (error) {
            const { dispatch, attach, newMessage, testing } = this.props
            const data = {
                original: this.message.value,
                receiver_id: this.props.memberId,
                attachment: attach.map(item => item.src ? item.src : item)
            }
            if (testing) {
                dispatch(setAlert('Not available for test user', 'error'))
                return
            }
            dispatch(saveDraft(data)).then(res => {
                if (res) {
                    dispatch(toggleModal(false, 'message'))
                    Router.pushRoute(`/mail/draft`)
                }
            })
        }
    }

	send = () => {
		let error = 1
		error *= Validator.check(this.message.value, ['required'], 'Message')
		if (error) {
			const { dispatch, attach, testing } = this.props
			const data = {
                original: this.message.value,
                receiver_id: this.props.memberId,
                attachment: attach.map(item => item.src ? item.src : item),
            }
            if (testing) {
                dispatch(setAlert('Not available for test user', 'error'))
                return
            }
            dispatch(sendMessage(data)).then(res => {
                if (res === true) {
                    this.message.value = ''
                    dispatch(setActiveTab('outgoing', 'mail'))
                    Router.pushRoute('/mail/outgoing')
                } else {
                    dispatch(setMessagesKey('letterPrice', res['_price_message']))
                    this.showAlert(data)
                }
            })
		}
	}

    handleChange = value => {
        this.setState({value})
    }

    handleSpellChacker = ({target: {textContent}}) => {
        this.setState({message: textContent})
    }

    componentWillUnmount() {
        const { dispatch } = this.props
        dispatch(clearAttachAll())
    }

    /*componentDidMount() {
        $Spelling.SpellCheckAsYouType('messageTextArea')
        const el = document.getElementById('messageTextArea___livespell_proxy')
        el.addEventListener('input', this.handleSpellChacker)
    }*/

    render() {
        const { first_name } = this.props

        return (
            <div>
                <FormGroup className="member">
    	           <Textarea
                        id="messageTextArea"
                        label={true}
                        counter={4500}
                        inputRef={ref => { this.message = ref }}
                        onChange={this.handleChange}
                        value={this.state.value}
                        placeholder={`Message to ${first_name}`} />
                </FormGroup>
                <FormGroup>
                    <BtnMain
                        type="button"
                        bsStyle="success"
                        text="Save to drats"
                        onClick = {this.saveDraft} />
                    &nbsp;
                    <BtnMain
                        bsStyle="success"
                        text="Send"
                        onClick={this.send} />
                </FormGroup>
                <UploadDropdown />
            </div>
        )
    }
}

const mapStateToProps = ({message, user, members}) =>
	({
	    attach: message.attach,
        userCredits: user.data.credits,
        first_name: members.member.first_name,
        testing: user.testing,
        letterPrice: message.letterPrice,
	})

export default connect(mapStateToProps)(MessageModal)