import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPublicMembers } from '../../actions/members'
import MemberPreview from './member_preview'
import { setUiKey } from '../../actions/ui'
import { Router } from '../../routes'

class MemberCarouselSmall extends Component {

    state = {active: 0}

    onClickItem = id => {
        const { dispatch, token } = this.props
        if (token) {
            Router.pushRoute(`/member/${id}`)
        } else {
            dispatch(setUiKey('showRegistration', true))
            Router.pushRoute('/')
            window.scrollTo(0,0)
        } 
    }

    printList = (member, i) => {
        let activeClass = i == this.state.active ? 'active fadeInRight' : ''
        
        return  <div key={i} className={`member-carousel-small-item ${activeClass}`}>
                    <MemberPreview
                        onClickItem={() => this.onClickItem(member.id)}
                        stars={false}
                        member={member} />
                </div>
    }

    next = () => {
        let active = this.state.active == this.props.publicList.length - 1 ? 0 : this.state.active+1
        this.setState({active})
    }

    prev = () => {
        let active = this.state.active == 0 ? this.props.publicList.length - 1 : this.state.active-1
        this.setState({active})
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getPublicMembers('popular'))
    }

    render() {
        const { publicList } = this.props
        return (
            <div className="member-carousel-small-wrap">
                <div className="member-carousel-small-arrows" onClick={this.prev}>
                    <i className="fas fa-chevron-left"></i>
                </div>
                <div>{ publicList.map((member, i) => this.printList(member, i)) }</div>
                <div className="member-carousel-small-arrows" onClick={this.next}>
                    <i className="fas fa-chevron-right"></i>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>
    ({
        publicList: state.members.public,
        token: state.user.token,
    })

export default connect(mapStateToProps)(MemberCarouselSmall)