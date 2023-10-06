import React, { Component } from 'react'
import Link from 'next/link'
import { Router } from '../../routes'

class MiddleItem extends Component {
    goTo = link => e => {
        e.preventDefault()
        Router.pushRoute(link)
    }

    render() {
        const { link, text, icon, onClick, role } = this.props
        return (
            <div className={`middle-item ${role}`} onClick={onClick}>
                <i className={icon}></i>
                <strong>
                {
                    link
                    ? <a href={link} onClick={this.goTo(link)}>{text}</a>
                    : <span>{text}</span>
                }
                </strong>
            </div>
        );
    }
}

export default MiddleItem