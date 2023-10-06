import React, { Component } from 'react'
import { makeCDN } from '../../utils'

class AvatarMember extends Component {
    render() {
        const { onClick, src } = this.props
        return (
            <div className="avatar-member-wrap">
                <img onClick={onClick} src={makeCDN(src)} className="img-responsive pointer margin-auto" alt="" />
            </div>
        );
    }
}

export default AvatarMember