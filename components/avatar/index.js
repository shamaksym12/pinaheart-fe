import React, { Component } from 'react'
import { makeCDN } from '../../utils'

export class Avatar extends Component {
    render() {
    	const { src = '' } = this.props
        return (
            <div className="avatar-wrap">
                <div className="avatar-hover" onClick={this.props.onClick} >
                    <span>edit</span>
                </div>
                <img src={makeCDN(src)} className="avatar-img" alt="" />
            </div>
        )
    }
}

export default Avatar