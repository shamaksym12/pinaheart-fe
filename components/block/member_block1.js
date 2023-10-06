import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleModal, setUiKey } from '../../actions/ui'
import { setMembersKey } from '../../actions/members'
import loadable from '@loadable/component'
import { getUncompleteField } from '../../actions/user'
import { sexPhotoFinder, lastActivity } from '../../utils'
import { Router } from '../../routes'
import Slider from "react-slick";
import { getFullMember, searchByFavorite, blockMember, searchByInterest, updateAdminComment, togleAdminBlockMember } from '../../actions/members'
import { openDialog } from "../../actions/dialog"
import $ from 'jquery';
import ReactDOM from 'react-dom';
import {Modal, Button} from "react-bootstrap";

class MemberBlock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photos: [],
            id: 0,
            is_interested: 0,
            is_favorite: 0,
            show: false,
            index: 0
        }
        this.index_temp = 0;
    }    

    handleClose = () => {
        this.setState({show: false})
        this.slider_original.slickGoTo(this.index_temp)
    }

    handleShow = (index) => {
        this.setState({show: true}, () => {
            setTimeout(() => {
                this.slider_modal.slickGoTo(index)
            }, 100)
        })
        
    }

    afterChange_modal = (index) => {
        this.index_temp = index;
    }

    afterChange_original = (index) => {
        this.setState({ index: index })
    }

    componentDidMount() {
        const { member, dispatch } = this.props
        this.setState({id: member.id})
        dispatch(getFullMember(member.id)).then(() => {
            const { members } = this.props
            this.setState({ photos: members.photos })
            this.setState({ is_interested: members.is_interested })
            this.setState({ is_favorite: members.is_favorite })
        })
    }

    goToProfile = (user, dispatch, member) => {
        if (!user.filled_info) {
            dispatch(getUncompleteField())
            dispatch(setUiKey('targetPage', `/member/${member.id}`))
            dispatch(toggleModal(false, 'member'))
            dispatch(toggleModal(true, 'uncomplete'))
            return
        }
        Router.pushRoute(`/member/${member.id}`)
        dispatch(toggleModal(false, 'member'))
    }

    toggleFavorite = (e) => {
        e.stopPropagation()
        const { member, dispatch, id } = this.props;
        dispatch(searchByFavorite(member.id)).then(data => {
            if (data.data) {
                dispatch(getFullMember(id))
                if (data.message == 'User added to favorites') this.setState({ is_favorite: 1 })
                else this.setState({ is_favorite: 0 })
            }
        })
    }

    toggleInterest = (e) => {
        e.stopPropagation()
        const { member, dispatch, id } = this.props
        dispatch(searchByInterest(member.id)).then(
            data => {
                if (data.data) {
                    dispatch(getFullMember(id))
                    if (data.message == 'User added to interest') this.setState({ is_interested: 1 })
                    else this.setState({ is_interested: 0 })
                }
            }
        );
    }

    send = () => {
        const { user, dispatch, member } = this.props
        if (!user.filled_info) {
            dispatch(getUncompleteField())
            dispatch(openDialog(id)).then(res => dispatch(setUiKey('targetPage', `/messages/dialog/${res}`)))
            dispatch(toggleModal(true, 'uncomplete'))
            return
        }
        dispatch(openDialog(member.id)).then(res => {
            const a = document.createElement('a')
            a.href = `/messages/dialog/${res}`
            // a.target = "_blank"
            a.click();
        })
    }

    render() {
        const { member, memberModal, dispatch, user, height = 300, isAdmin = false } = this.props;

        const Heart = () => {
            if (this.state.is_interested) {
                return <svg xmlns="http://www.w3.org/2000/svg" width="30px" fill="#C5141B" viewBox="0 0 24 24">
                    <g id="Слой_2" data-name="Слой 2">
                        <g id="Слой_1-2" data-name="Слой 1">
                            <path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z" />
                        </g>
                    </g>
                </svg>
            }
            else {
                return <svg xmlns="http://www.w3.org/2000/svg" width="30px" fill="#C5141B" viewBox="0 0 24 24">
                    <g id="Слой_2" data-name="Слой 2">
                        <g id="Слой_1-2" data-name="Слой 1">
                            <path d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z" />
                        </g>
                    </g>
                </svg>
            }
        }
        
        const Star = () => {
            if (this.state.is_favorite) {
                return <svg xmlns="http://www.w3.org/2000/svg" width="30px" fill="#FFEB04" viewBox="0 0 24 24">
                    <g id="Слой_2" data-name="Слой 2">
                        <g id="Слой_1-2" data-name="Слой 1">
                            <path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" />
                        </g>
                    </g>
                </svg>
            }
            else {
                return <svg xmlns="http://www.w3.org/2000/svg" width="30px" fill="#FFEB04" viewBox="0 0 24 24">
                    <g id="Слой_2" data-name="Слой 2">
                        <g id="Слой_1-2" data-name="Слой 1">
                            <path d="M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z" />
                        </g>
                    </g>
                </svg>
            }
        }
        
        const Send = () => {
            return <svg xmlns="http://www.w3.org/2000/svg" width="25px" fill="#fff" viewBox="0 0 59.53 59.53">
                <g id="Слой_2" data-name="Слой 2">
                    <g id="Слой_1-2" data-name="Слой 1">
                        <path d="M58.6.37a2.08,2.08,0,0,1,.9,2.12L51,53.51A2.09,2.09,0,0,1,49.93,55a2,2,0,0,1-1,.26,2.27,2.27,0,0,1-.8-.16L33.06,49l-8,9.8a2,2,0,0,1-1.63.77,1.76,1.76,0,0,1-.73-.14,2,2,0,0,1-1-.78,2,2,0,0,1-.39-1.21V45.81L50,10.63,14.45,41.36,1.33,36A1.94,1.94,0,0,1,0,34.15a2,2,0,0,1,1.07-2L56.34.3A2.08,2.08,0,0,1,58.6.37Z" />
                    </g>
                </g>
            </svg>
        }

        const settings_original = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            afterChange: this.afterChange_original
        };
        const settings_modal = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            afterChange: this.afterChange_modal
        };
        return (
            <div className="wrap-member memberblock_mobile">
                <Modal show={this.state.show} onHide={this.handleClose} className="member_modal">
                    <Modal.Header closeButton>
                        
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modal_body_content" id={`modal_body_content${member.id}`} onClick={this.handleClose}>
                            {this.state.photos.length ? (
                                <Slider ref={c2 => (this.slider_modal = c2)} {...settings_modal}>
                                    {this.state.photos.map((el, idx) => (
                                        <div key={idx} index={idx} className="member_photo_wrap modal_photo" >
                                            <img src={el.path} className="member_photo_modal" />
                                        </div>
                                    ))}
                                </Slider>
                            ) : (
                                <div className="member_photo_wrap">
                                    <img src={sexPhotoFinder(member.sex, member.main_photo_thumb)} className="member_photo_modal" />
                                </div>
                            )}
                        </div>
                    </Modal.Body>
                </Modal>
                
                <div className="first_wrap">
                    <div className="avatars_wrap" onClick={() => this.goToProfile(user, dispatch, member)}>
                        <img src={sexPhotoFinder(member.sex, member.main_photo_thumb)} className="avatar_photo" />
                        {member.activity_diff_in_seconds <= 180 && member.activity_diff_in_seconds !== null ? <div className="online_status online_active_statue"></div> : ''}
                    </div>
                    <div className="member_left_wrap float-left">
                        <div className="name">
                            <span style={{ marginRight: 10 }}>{member.first_name}, {member.age}</span>
                        </div>
                        <div className="address">
                            {member.formatted_address}
                        </div>
                    </div>
                    
                    <div className="member-infos float-right">
                        <div style={{ color: '#747373' }} className="form-group">
                            <strong>ID:</strong> {member.profile_id}
                        </div>
                        <div className="last-activity">
                            {member.activity_diff_in_seconds <= 180 && member.activity_diff_in_seconds !== null ? <div className="green_while"> </div> : ""}
                            {member.activity_diff_in_seconds <= 180 && member.activity_diff_in_seconds !== null ? "" : <br />}
                            <span>{lastActivity(member.activity_diff_in_seconds)} {member.activity_diff_in_seconds}</span>
                        </div>
                    </div>
                </div>
                <div className="first_content">
                    {
                    this.state.photos.length ? (
                        <Slider ref={c1 => (this.slider_original = c1)} {...settings_original}>
                            {this.state.photos.map((el, idx) => (
                                <div key={idx} index={idx} className="member_photo_wrap">
                                    <a href="javascript:;" onClick={() => this.handleShow(`${idx}`)}><img src={el.path} className="member_photo" /></a>
                                </div>
                            ))}                            
                        </Slider>
                    ) : (
                        <div className="member_photo_wrap">
                            <img src={sexPhotoFinder(member.sex, member.main_photo_thumb)} className="member_photo" />
                        </div>
                    )}

                    <div className="inner-avatar">
                        <div onClick={this.toggleInterest} className="interest GreyWraper">
                            <Heart />
                        </div>
                        <div onClick={this.toggleFavorite} className="favorite GreyWraper">
                            <Star />
                        </div>
                        <div onClick={this.send} className="send GreyWraper">
                            <Send />
                        </div>
                    </div>

                    <div className="member_new_wrap">
                        <span className="member-new">new</span>
                    </div>
                </div>
                
                <style jsx>{`
                    .staff-comment {
                        font-weight: 600;
                        color: #2980b9;
                    }
    
                    .staff-admin-block {
                        font-weight: 600;
                        color: #c0392b;
                    }
    
                    .isBlocked{
                        color: #fff;
                        margin-right: 7px;
                        border-radius: 5px;
                        background: rgba(0,0,0,0.4);
                        padding: 1px 7px;
                        text-align: center;
                        font-size: 12px;
    
                    }
                    .member-status {
                        position: absolute;
                        top: 52px;
                        left: -26px;
                        font-size: 13px;
                        transform: rotate(-90deg);
                        font-weight: bold;
                        color: #f17eeb;
                        // border: 1px solid #f17eeb;
                        padding: 0 10px;
                        // border-radius: 5px;
                    }
                    .member-status-premium {
                        color: #0cf6dd;
                    }
                    .member-status-free-premium {
                        color: #e0e507;
                    }
                    .member-blocked{
                        position: absolute;
                        top: 7%;
                        left: 50%;
                        -webkit-transform: translate(-50%,-50%);
                        -ms-transform: translate(-50%,-50%);
                        transform: translate(-50%,-50%);
                        min-width: 65%;
                        white-space: nowrap;
                        align-items: center;
                    }
                    .green_while{
                        background-color: #98D538;
                        height: 12px;
                        width: 12px;
                        border-radius: 10px;
                        float: right;
                        margin-top: 5px;
                        margin-left: 10px;
                    }
                    .top_tansform{
                        transform: translateY(-3px);
                        display: -webkit-inline-box;
                    }
                    .member-new.green_circle{
                        font-size: 8px;
                        border-radius: 20px;
                        margin-bottom: 10px;
                    }
                   
                    .wrap-member {
                        width: 100%;
                        height: ${height}px;
                        margin: 0 auto;
                        overflow: hidden;
                        cursor: pointer;
                    }
                    .address {
                        max-width: 100%;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        margin-bottom: 5px;
                    }
                    .member-avatar {
                        width: 100%;
                        padding-top: 100%;
                        position: relative;
                        background-image: url(${sexPhotoFinder(member.sex, member.main_photo_thumb)});
                        border-radius: 9px;
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size: cover;
                        margin-bottom: 6px;
                    }
                    .name {
                        font-size: 18px;
                        color: #777074;
                        margin-bottom: 6px;
    
                    }
                    .member-info {
                        position: absolute;
                        left: 10px;
                        bottom: 10px;
                        display: flex;
                        align-items: center;
                    }
                    .photo-count {
                        color: #fff;
                        margin-right: 7px;
                        border-radius: 5px;
                        background: rgba(0,0,0,0.4);
                        padding: 1px 7px;
                    }
                    .photo-count span {
                        font-size: 12px;
                    }
                    .photo-count i {
                        margin-right: 10px;
                    }
                    .last-activity {
                        padding: 1px 7px;
                        border-radius: 5px;
                        text-align: right;
                    }
                    .last-activity span {
                        font-size: 12px;
                    }
                    .member-new {
                        background: #98D538;
                        color: #fff;
                        font-size: 16px;
                        border-radius: 5px;
                        padding: 1px 7px 2px 7px;
                    }
                    .member-busy {
                        background: #C5141B;
                        color: #fff;
                        font-size: 16px;
                        border-radius: 5px;
                        padding: 1px 6px 2px 6px;
                        margin-left: 3px;
                    } 
                `}
                </style>
            </div>
        )
    }
}

const mapStateToProps = ({ members }) =>
    ({
        members: members.activeMember
    })

export default connect(mapStateToProps)(MemberBlock)