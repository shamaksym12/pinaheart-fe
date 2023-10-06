import React, { Component } from 'react'

class SmallDivider extends Component {
    render() {
        return (
            <div className="wrap-divider">
	            { this.props.text && <span className="text-divider">{this.props.text}</span> }
                <div className="divider"></div>
            </div>
        );
    }
}

export default SmallDivider