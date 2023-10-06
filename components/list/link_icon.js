import React, { Component } from 'react'

class LinkIcon extends Component {
    render() {
        const { icon, color, onClick, text, className = '' } = this.props
        return (
            <div className={`link-icon ${className}`}>
                <i className={icon} style={{color: color}}></i>
                <a href="javascript:;" onClick={onClick} ><span>{text}</span></a>
            </div>
        )
    }
}

export default LinkIcon