import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ToastContainer } from "react-toastr"
import { removeAlert } from '../../actions/ui'

class Alert extends Component {
    constructor() {
        super()
        this.container = false
    }

    componentWillReceiveProps(nextProps) {
        const { messages } = this.props.alerts
        if (nextProps.alerts.messages.length !== messages.length) {
            this.showMessages(messages)
        }
    }

    showMessages = messages => {
        for (let message of messages) {
            this.container[message.level](message.text, '', { closeButton: true, timeOut: message.timeout })
        }
        const { dispatch } = this.props
        dispatch(removeAlert())
    }

    render() {
        return (
            <ToastContainer
                ref={ref => this.container = ref}
                className="toast-bottom-right" />
        );
    }
}

const mapStateToProps = state =>
    ({ 
        alerts: {
            messages: state.ui.messages
        }   
    })

export default connect(mapStateToProps)(Alert)