import React, { Component } from 'react'
import { Router } from '.../../../routes'

class MiddleString extends Component {
    goTo = link => e => {
        e.preventDefault()
        Router.pushRoute(`/${link}`)
        if (this.props.onClick) {
            this.props.onClick()
        }
    }
    render() {
        const { text = '', link = false, keyName, onClick = () => {} } = this.props
        return (
            <div className="middle-string">
                <span>{keyName}</span>&nbsp;
                    {
                        link
                        ?   <strong onClick={onClick}><a href={`/${link}`} onClick={this.goTo(link)}>{text.toString()}</a></strong>
                        :   <span className="middle-string-text" onClick={onClick}>{text}</span>
                    }
            </div>
        );
    }
}

export default MiddleString