import React, { Component } from 'react'

class BtnFacebook extends Component {
    render() {
        const { id = '' } = this.props
        return (
            <button
                id={id}
                type="button"
                className="btn btn-default btn-facebook"
                onClick={this.props.onClick} >
                <i className="fab fa-facebook"></i>
                <span>{this.props.title}</span>
            </button>
        );
    }
}

export default BtnFacebook