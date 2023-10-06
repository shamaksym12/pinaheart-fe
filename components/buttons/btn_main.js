import React, { Component } from 'react'

class BtnMain extends Component {
    render() {
        const { type = 'button', className, onClick, disabled, text, icon, id = '', style = {} } = this.props
        return (
            <button
                type={type}
                style={{outline: 'none', ...style}}
                className={`btn main button ${className}`}
                onClick={onClick}
                id={id}
                disabled={disabled} >
                <span>{icon} {text}</span>
            </button>
        );
    }
}

export default BtnMain