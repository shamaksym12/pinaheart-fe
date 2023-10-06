import React, { Component } from 'react'

class BtnSignUp extends Component {
    render() {
        const { type = 'button', onClick, disabled, text, icon, orientation = 'right', id = '' } = this.props
        return (
            <button
                type={type}
                className="main button btn-signup pointer"
                id={id}
                onClick={onClick}
                disabled={disabled} >
                <span className="opacity-0">{icon} {text}</span>
                <span className={`btn-signup-text ${orientation}`}>{icon} {text}</span>
                <i className={`fas fa-angle-${orientation}`}></i>

            </button>
        );
    }
}

export default BtnSignUp