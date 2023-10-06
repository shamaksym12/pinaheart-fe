import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import PrivateLayout from '../../layouts/private'
import { Router } from '../../routes'
import Head from 'next/head'
import { sexPhotoFinder, lastActivity } from '../../utils'
import { searchByFavorite, blockMember, searchByInterest, getFullMember } from '../../actions/members'
import { postMessage, getDialog, addToInDialog, setDialog, deleteDialogs } from '../../actions/dialog'
import { getUserInfo } from '../../actions/user';
import MessageBlock from "../../components/block/message_block"
import BtnMain from '../../components/buttons/btn_main'
import DialogTextArea from '../../components/inputs/dialog_text_area'
import { toggleModal } from '../../actions/ui'
import BtnUpgradeMembership from '../../components/buttons/btn_upgrade_membership';
import { get, post, put } from '../../api'

const Heart = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18px" fill="#FF6464" viewBox="0 0 62.36 54.57">
        <g id="Слой_2" data-name="Слой 2">
            <g id="Слой_1-2" data-name="Слой 1">
                <path d="M56.31,3.73C49.63-2,39.71-.93,33.58,5.39l-2.4,2.47-2.4-2.47C22.67-.93,12.73-2,6.05,3.73a17.49,17.49,0,0,0-1.2,25.32L28.42,53.39a3.81,3.81,0,0,0,5.51,0L57.5,29.05A17.47,17.47,0,0,0,56.31,3.73Z" />
            </g>
        </g>
    </svg>
}

const Star = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18px" fill="#FFEB04" viewBox="0 0 62 59.34">
        <g id="Слой_2" data-name="Слой 2">
            <g id="Слой_1-2" data-name="Слой 1">
                <path d="M27.67,2.06,20.11,17.41,3.18,19.88A3.71,3.71,0,0,0,1.12,26.2L13.37,38.14,10.48,55a3.7,3.7,0,0,0,5.37,3.91L31,51l15.15,8A3.71,3.71,0,0,0,51.52,55L48.63,38.14,60.88,26.2a3.71,3.71,0,0,0-2.06-6.32L41.89,17.41,34.33,2.06a3.72,3.72,0,0,0-6.66,0Z" />
            </g>
        </g>
    </svg>
}

const Send = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="20px" fill="#fff" viewBox="0 0 59.53 59.53">
        <g id="Слой_2" data-name="Слой 2">
            <g id="Слой_1-2" data-name="Слой 1">
                <path d="M58.6.37a2.08,2.08,0,0,1,.9,2.12L51,53.51A2.09,2.09,0,0,1,49.93,55a2,2,0,0,1-1,.26,2.27,2.27,0,0,1-.8-.16L33.06,49l-8,9.8a2,2,0,0,1-1.63.77,1.76,1.76,0,0,1-.73-.14,2,2,0,0,1-1-.78,2,2,0,0,1-.39-1.21V45.81L50,10.63,14.45,41.36,1.33,36A1.94,1.94,0,0,1,0,34.15a2,2,0,0,1,1.07-2L56.34.3A2.08,2.08,0,0,1,58.6.37Z" />
            </g>
        </g>
    </svg>
}

const Block = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="#FF6464" width="20px" viewBox="0 0 56.69 42.12">
        <g id="Слой_2" data-name="Слой 2">
            <g id="Слой_1-2" data-name="Слой 1">
                <path d="M26.16,26.16a5,5,0,0,1,.67-2.49c-.39,0-.78-.12-1.19-.12H24.27a14.21,14.21,0,0,1-11.92,0H11a11,11,0,0,0-11,11v3.4a3.93,3.93,0,0,0,3.92,3.93h23a5.21,5.21,0,0,1-.73-2.62Zm-7.85-5.23A10.47,10.47,0,1,0,7.85,10.47,10.46,10.46,0,0,0,18.31,20.93ZM54,23.05H51.24V19a6.81,6.81,0,0,0-13.62,0v4.09H34.9a2.72,2.72,0,0,0-2.72,2.72V39.4a2.72,2.72,0,0,0,2.72,2.72H54a2.72,2.72,0,0,0,2.72-2.72V25.77A2.74,2.74,0,0,0,54,23.05Zm-6.59.13H41.44V18.57a3,3,0,1,1,5.93,0Z" />
            </g>
        </g>
    </svg>
}

const YouFree = ({ showMembershipInfo, whyPlatinum }) => {
    return <div>
        <div className="text-center wrap-free">
            <div className="fs-20">
                You are a Free Member
                    </div>
            <div className="need_platinum mb-15">
                To be able to send/receive messages, you or your partner should upgrade to Platinum membership
                    </div>
            <div className="form-group">
                <div className="upgrade-btn btn-main">
                    <div className="upgrade-btn-wrapper">
                        <BtnUpgradeMembership />
                    </div>
                </div>
            </div>
            <div onClick={whyPlatinum} className="h-p">
                Why platinum membership?
            </div>
        </div>
        <style jsx>{`
                            .h-p:hover{
                                cursor: pointer;
                            }
                            .need_platinum{
                                font-size: 14px;
                                color: #848183;
                                opacity: 0.5;
                                font-family: "Open Sans";

                            }
                            .wrap-free {
                                width: 80%;
                                background-color: #F9F9F9;
                                margin: auto;
                                margin-top:15px;
                                display: table;
                                padding: 15px 30px;
                                border-radius: 10px;
                                margin-bottom: 15px;
                                color: rgb(204,208,212);

                            }
                            .upgrade-btn {
                                display: flex;
                                justify-content: center;
                                margin-left: auto;
                                margin-top: 15px;
                            }
                            .upgrade-btn-wrapper {
                                width: 300px;
                            }
                            .wrap-free > div:first-child {
                                font-weight: bold;
                                margin-bottom: 15px;
                                font-size: 22px;
                            }
                        `}
        </style>
    </div>

}
class Dialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            activity_diff_in_seconds: 0
        };
        this.onChange = this.onChange.bind(this);
        this.forScrol = React.createRef();
    }

    state = {
        dialogHeight: '340px'
    }

    whyPlatinum = () => {
        const { dispatch } = this.props
        dispatch(toggleModal(true, 'membershipInfo'))
    }

    toggleBlock = (e) => {
        e.stopPropagation()
        const { dispatch, dialog } = this.props
        dispatch(blockMember(dialog.user.id)).then(success => {
            if (success) {
                dispatch(addToInDialog(!dialog.user.is_blocked, "is_blocked"))
            }
        })
    }

    toggleFavorite = (e) => {
        e.stopPropagation()
        const { dispatch, dialog } = this.props
        dispatch(searchByFavorite(dialog.user.id)).then(success => {
            if (success) {
                dispatch(addToInDialog(!dialog.user.is_favorite, "is_favorite"))
            }
        })
    }

    toggleInterest = (e) => {
        e.stopPropagation()
        const { dispatch, dialog } = this.props
        dispatch(searchByInterest(dialog.user.id)).then(success => {
            if (success) {
                dispatch(addToInDialog(!dialog.user.is_interested, "is_interested"))
            }
        })
    }

    onChange = (value) => {
        this.setState({ message: value });
    }

    goToMember = (id) => {
        Router.pushRoute(`/member/${id}`)
    }

    goTo = (target) => {
        Router.pushRoute(target)
    }

    goToBack = () => {
        Router.back()
    }

    scrolBottom = (target, behavior) => {
        const height = target.scrollHeight
        target.scrollTo({
            top: height,
            behavior
        })
    }

    delete = (id) => {
        const { dispatch } = this.props
        const temp = {
            ids: [id]
        }
        dispatch(deleteDialogs(temp)).then(Router.pushRoute('/messages'))
    }

    openModal = () => {
        const { dispatch } = this.props
        setTimeout(() => {
            dispatch(toggleModal(true, 'shure_delete'))
        }, 500)
    }

    send = () => {
        if (this.state.message) {
            const { dispatch } = this.props
            const id = Router.router.query.id
            const message = {
                data: {}
            }
            message.data.text = this.state.message
            message.id = id
            dispatch(postMessage(message))
        }
        this.setState({
            message: "",
        })

        if (window.innerWidth > 768) {
            document.getElementById('dialogArea').style.height = '56vh';
            document.getElementById('message-area').style.height = '50px';
        }
        else {
            document.getElementById('dialogArea').style.height = '76vh';
            document.getElementById('message-area').style.height = '45px';
        }        
    }

    componentWillMount() {
        const { dispatch } = this.props
        const data = {
            id: null,
            has_paid_user: true,
            messages: [],
            user: {
                is_favorite: false,
                is_interested: false,
                is_blocked: false,
                id: null,
                profile_id: null,
                first_name: null,
                last_name: null,
                age: null,
                main_photo: null,
                main_photo_thumb: null,
                sex: null,
            }
        }
        dispatch(setDialog(data))
    }

    componentDidMount() {
        const { dispatch } = this.props
        const id = Router.router.query.id
        dispatch(getDialog(id)).then(res => {
            !res.data.has_paid_user ? dispatch(getUserInfo()) : null;
            res.data.is_deleted ? this.goTo('/messages') : null;

            const user_id = res.data.user.id;
            get(`people/${user_id}/detail`).then(res => {
                this.setState({activity_diff_in_seconds: res.data.activity_diff_in_seconds})
            })
        });

        const dialog = this.props.dialog

        const dialogbox = document.getElementById('message-area').offsetHeight;
        const messagelist = document.getElementById('dialogArea');
        const messagelist_height = messagelist.offsetHeight;

        const autoExpand = function (field) {
            field.style.height = 'inherit';
            var computed = window.getComputedStyle(field);
            var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                         + parseInt(computed.getPropertyValue('padding-top'), 10)
                         + field.scrollHeight
                         + parseInt(computed.getPropertyValue('padding-bottom'), 10)
                         + parseInt(computed.getPropertyValue('border-bottom-width'), 10);        
            field.style.height = height + 'px';

            messagelist.style.height = (messagelist_height - height + dialogbox) + 'px';
            window.scrollTo(1, window.innerHeight)
        };

        document.addEventListener('input', function (event) {
            if (event.target.tagName.toLowerCase() !== 'textarea') return;
            autoExpand(event.target);
        }, false);
    }

    componentDidUpdate() {
        this.scrolBottom(this.forScrol.current,
            // 'smooth'
        )
    }

    render() {
        const { dialog } = this.props
        
        const Heart_mobile = () => {
            if (dialog.user.is_interested) {
                return <svg xmlns="http://www.w3.org/2000/svg" width="25px" fill="#C5141B" viewBox="0 0 24 24">
                    <g id="Слой_2" data-name="Слой 2">
                        <g id="Слой_1-2" data-name="Слой 1">
                            <path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z" />
                        </g>
                    </g>
                </svg>
            }
            else {
                return <svg xmlns="http://www.w3.org/2000/svg" width="25px" fill="#C5141B" viewBox="0 0 24 24">
                    <g id="Слой_2" data-name="Слой 2">
                        <g id="Слой_1-2" data-name="Слой 1">
                            <path d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z" />
                        </g>
                    </g>
                </svg>
            }
        }

        const Star_mobile = () => {
            if (dialog.user.is_favorite) {
                return <svg xmlns="http://www.w3.org/2000/svg" width="28px" fill="#FFEB04" viewBox="0 0 24 24">
                    <g id="Слой_2" data-name="Слой 2">
                        <g id="Слой_1-2" data-name="Слой 1">
                            <path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" />
                        </g>
                    </g>
                </svg>
            }
            else {
                return <svg xmlns="http://www.w3.org/2000/svg" width="28px" fill="#FFEB04" viewBox="0 0 24 24">
                    <g id="Слой_2" data-name="Слой 2">
                        <g id="Слой_1-2" data-name="Слой 1">
                            <path d="M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z" />
                        </g>
                    </g>
                </svg>
            }
        }

        return (
            <Layout page="message_detail">
                <PrivateLayout page="dialog">
                    <Head page="message_detail" dialog={dialog.id}>
                        <title>PinaHeart.com</title>
                    </Head>
                    <div className="row dialog_wrap">
                        <div className="col-md-10 col-md-offset-1 dialog_sub_wrap">
                            <div className="form-group no_mobile">
                                <span className="pointer" onClick={() => this.goTo('/messages')}>
                                    <i className="fas fa-arrow-left"></i>
                                    &nbsp;
                                    <span>Return to mailbox</span>
                                </span>
                                {
                                    dialog.messages.length
                                        ? <BtnMain style={{ minWidth: "95px", float: 'right', marginTop: '-4px', height: '29px' }} onClick={() => this.openModal(dialog.id)} text="Delete all" className="btn btn-outline btmt-dialog" />
                                        : null
                                }
                            </div>
                            {dialog.user.id && window.innerWidth > 768 &&
                                <div className="topDialog">
                                    <div className="dialogInfo">
                                        <div className="dialogAvatar" onClick={() => this.goToMember(dialog.user.id)}> </div>
                                        <div className="dialog_member_info">
                                            <div className="name">
                                                <span style={{ marginRight: 10 }}>{dialog.user.first_name}, {dialog.user.age}</span>
                                            </div>
                                            <div className="address mb-15">
                                                {dialog.user.formatted_address ? dialog.user.formatted_address : <br />}
                                            </div>
                                            <div>
                                                <strong>Looking for: </strong>{dialog.user.looking_for}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="toggles">
                                        <div onClick={this.toggleFavorite} className="favorite GreyWraper">
                                            <Star />
                                            <span style={{ marginLeft: 10 }}>{dialog.user.is_favorite ? "Remove from favorites" : "Add to favorites"}</span>
                                        </div>
                                        <div onClick={this.toggleInterest} className="interest GreyWraper">
                                            <Heart />
                                            <span style={{ marginLeft: 10 }}>{dialog.user.is_interested ? "Remove Interest" : "Show Interest"}</span>
                                        </div>
                                        <div onClick={this.toggleBlock} className="blocked GreyWraper">
                                            <Block />
                                            <span style={{ marginLeft: 10 }} onClick={this.toggleBlock}>{dialog.user.is_blocked ? "Unblock user" : "Block user"}</span>
                                        </div>
                                    </div>
                                </div>
                            }

                            {dialog.user.id && window.innerWidth < 769 &&
                                <div className="topDialog">
                                    <div className="dialogInfo">
                                        <span className="pointer" onClick={this.goToBack}>
                                            <img src="../../static/assets/img/long_arrow_left.png" className="back_btn" />
                                        </span>
                                        <img className="dialogAvatar_mobile" onClick={() => this.goToMember(dialog.user.id)} src={sexPhotoFinder(dialog.user.sex, dialog.user.main_photo_thumb)} />
                                        {this.state.activity_diff_in_seconds <= 180 && this.state.activity_diff_in_seconds !== null ? <div className="online_dialog_status online_active_statue"></div> : <div className="online_dialog_status"></div>}
                                        <div className="dialog_user_info">
                                            <div className="name">
                                                <span >{dialog.user.first_name}, {dialog.user.age}</span><br />
                                                <span className="dialog_user_status">{lastActivity(this.state.activity_diff_in_seconds)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="toggles">
                                        <div onClick={this.toggleFavorite} className="favorite GreyWraper">
                                            <Star_mobile />
                                        </div>
                                        <div onClick={this.toggleInterest} className="interest GreyWraper">
                                            <Heart_mobile />
                                        </div>
                                    </div>
                                </div>
                            }

                            <div className="dialogArea" ref={this.forScrol} id="dialogArea">
                                {
                                    dialog.messages &&
                                    dialog.messages.map((item, i) => <MessageBlock key={i} index={i} length={dialog.messages.length} message={item} user={dialog.user} has_paid_user={dialog.has_paid_user} user_status={this.state.activity_diff_in_seconds} />)
                                }
                                {
                                    (!dialog.has_paid_user && dialog.messages.length && window.innerWidth > 768)
                                        ? <YouFree showMembershipInfo whyPlatinum={this.whyPlatinum} />
                                        : null
                                }
                            </div>
                            <div className="butmnDialog row">
                                <div className="col-sm-8 message_text_area">
                                    <DialogTextArea
                                        field="desc"
                                        onChange={this.onChange}
                                        label=""
                                        height="45px"
                                        placeholder={"Start to write message here ..."}
                                        value={this.state.message}
                                        type="message-area" />
                                </div>

                                <div className=" as-c col-sm-4 message_btn_wrap">
                                    <BtnMain
                                        className="btn-green"
                                        style={{ minWidth: `auto`, margin: `18px`, padding: "9px", width: "-webkit-fill-available" }}
                                        onClick={this.send}
                                        text={
                                            <div style={{ display: `inline-flex` }} className="btn-text">
                                                <div>
                                                    <Send />
                                                </div>
                                                <span className="no_mobile">&nbsp; &nbsp; Send Message</span>
                                            </div>}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <style jsx>{`
                        .online_dialog_status{
                            width: 20px;
                            height: 20px;
                            border-radius: 50%;
                            background: #cccccc;
                            position: absolute;
                            top: 35px;
                            left: 90px;
                            z-index: 99;
                            border: 2px solid #ffffff;
                        }
                        .dialog_member_info{
                            padding-top: 15px;
                        }
                        .dialogArea ::-webkit-scrollbar { 
                            display: none; 
                        }
                        .as-c{
                            align-self: center;
                        }
                        .butmnDialog{
                            display: flex
                            background-color: #F9F9F9;
                            margin: 0px;
                        }
                        .dialogArea{
                            border: 1px solid  #EFEFEF;
                            border-top: none;
                            overflow: scroll;
                            height:${this.state.dialogHeight};
                            overflow-x: hidden;
                            padding-top: 15px;
                            height: 430px;
                            overflow: auto;
                            padding-bottom: 15px;
                        }
                        #dialogArea{
                            height: 56vh;
                        }
                        .form-group{
                            padding-bottom: 10px;
                            padding: 10px;
                            background-color: #F9F9F9;
                            border-top-right-radius: 10px;
                            border-top-left-radius: 10px;
                            margin-bottom: 0
                        }
                        .dialogInfo{
                            display: inherit;
                            width: 50%;
                        }
                        .toggles{
                            float: right;
                            text-align: right;
                            width: 50%;
                        }
                        .toggles .GreyWraper{
                            margin-top: 15px;
                            cursor: pointer;
                            width: 100%;
                        }
                        .toggles .favorite{
                            margin-top: 0;
                        }
                        .topDialog{
                            display:flex;
                            justify-content: space-between;
                            padding: 15px;
                            border: 1px solid  #EFEFEF;
                        }
                        .name {
                            color: rgb(119, 112, 116);
                            font-size: 18px;
                            font-weight: 600;
                        }
                        .dialogAvatar {
                            height: 75px;
                            width: 75px;
                            position: relative;
                            background-image: url(${sexPhotoFinder(dialog.user.sex, dialog.user.main_photo_thumb)});
                            border-radius: 9px;
                            background-position: center;
                            background-repeat: no-repeat;
                            background-size: cover;
                            align-self: center;
                            margin-right: 15px;
                            cursor: pointer;
                        }
                        .address {
                            max-width: 100%;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            margin-bottom: 5px;
                        }
                        
                        @media (min-width: 767px) {
                            .butmnDialog{
                                display: flex
                            }
                        }
                        @media (max-width: 768px) {
                            .dialog_sub_wrap{
                                padding: 0;
                            }
                            .toggles{
                                width: 30%;
                                padding-top: 15px;
                            }
                            .dialogInfo{
                                width: 70%;
                                position: relative;
                            }
                            .toggles .GreyWraper{
                                width: 50%;
                                margin: 0;
                                float: right;
                            }
                            .toggles .interest{
                                padding-top: 3px;
                            }
                            #dialogArea{
                                height: 84vh;
                            }
                            .topDialog{
                                position: fixed;
                                z-index: 10;
                                background-color: white;
                            }
                            #dialogArea{
                                padding-top: 85px;
                            }
                            .dialog_user_status{
                                font-size: 14px;
                                color: rgba(0, 0, 0, 0.5);
                            }
                        }
                        @media (max-width: 415px){
                            #dialogArea{
                                height: 76vh;
                            }
                            .topDialog {
                                padding: 5px 15px 10px 15px !important;
                            }
                        }
                    `}</style>
                </PrivateLayout>
            </Layout>
        )
    }
}

const mapStateToProps = ({ dialog }) =>
    ({
        dialog: dialog.messages
    })

export default connect(mapStateToProps)(Dialog)

