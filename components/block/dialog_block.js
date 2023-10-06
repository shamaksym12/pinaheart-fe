import React, { Component } from 'react'
import { connect } from 'react-redux'
import {sexPhotoFinder} from '../../utils'
import CheckboxField from '../../components/inputs/checkbox_field'
import {textTrunc} from '../../utils/index'
import { Router } from '../../routes'
import {openDialog} from "../../actions/dialog"

class DialogBlock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photos: [],
        }
    }

    // componentDidMount() {
    //     dispatch(getFullMember(member.id)).then(() => {
    //         const { user } = this.props.user
    //         this.setState({ photos: members.photos })
    //         this.setState({ is_interested: members.is_interested })
    //         this.setState({ is_favorite: members.is_favorite })
    //     })
    // }

    render() {
        const { dialog, checked, handleCheck, status } = this.props;
        const Crown = () => {
            return	<svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#FFEB04" viewBox="0 0 62 59.34">
                        <g id="Слой_2" data-name="Слой 2">
                            <g id="Слой_1-2" data-name="Слой 1">
                                <path d="M27.67,2.06,20.11,17.41,3.18,19.88A3.71,3.71,0,0,0,1.12,26.2L13.37,38.14,10.48,55a3.7,3.7,0,0,0,5.37,3.91L31,51l15.15,8A3.71,3.71,0,0,0,51.52,55L48.63,38.14,60.88,26.2a3.71,3.71,0,0,0-2.06-6.32L41.89,17.41,34.33,2.06a3.72,3.72,0,0,0-6.66,0Z"/>
                            </g>
                        </g>
                    </svg>
        }

        const user = dialog.user;
        const lust_message = dialog.last_message !== null 
            ? dialog.last_message 
            : {
                created_at: '',
                dialog_id: null,
                id: null,
                is_paid: false,
                is_read: false,
                my: false,
                text: false
            }
        const created_date = lust_message.created_at.split(' ');
        const date = new Date();
        const month = (date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
        const day = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();
        const today = date.getUTCFullYear() + '-' + month + '-' + day;
        const created_date_display = created_date[0].split('-')

        const id = dialog.id;
        const has_paid_user = dialog.has_paid_user;
        const clickDialog = (id) => {
            Router.pushRoute(`/messages/dialog/${id}`)
        }
        const goToMember = (id) => {
            Router.pushRoute(`/member/${id}`)
        }

        if (window.innerWidth >= 768) {
            return (
                <div className={`wrap-dialog ${lust_message.is_read || lust_message.my ? "" : "notReaded"}`}  onClick={()=>{}}>
                    <div className="checkbox_dialog">
                        <CheckboxField
                            id= {id}
                            className = "checkbox"
                            onChange={handleCheck}
                            checked={checked} 
                            />
                    </div>
        
                    <div  onClick={lust_message.id !== null ? ()=>clickDialog(id) : ()=>goToMember(user.id)} style = {{cursor: "pointer"}} className="message-avatar"> </div>
                    {
                        lust_message.id !== null 
                        ?
                        <div onClick={()=>clickDialog(id)} style = {{cursor: "pointer"}}>
                            <div className="name">
                                <span style={{marginRight: 10}}>{user.first_name}, {user.age}</span>
                            </div>
        
                            <div className="location">
                                {user.formatted_address ? user.formatted_address : <br/>}
                            </div>
        
                            <div className={!has_paid_user ? `blurry-text shortMessage` : 'shortMessage'}>
                                {textTrunc(lust_message.text, 58)} 
                            </div>
                        </div>
                        :
                        <div className="removedConversation">
                            User <span onClick={()=>goToMember(user.id)} style={{cursor: 'pointer'}}> {user.first_name} </span> has removed your conversation
                        </div>
                    }
        
                    {
                    lust_message.id &&
                    <div className="leftSide">
                        <div className="date mb-15">
                            {lust_message.created_at ? lust_message.created_at : ""}
                        </div>
                        {/* <div className= "premium "> &nbsp; <Crown/> &nbsp;Premium </div> */}
                    </div>
                    }
        
                    <style jsx>{`
                        .removedConversation {
                            text-align: center;
                            font-weight: 600;
                            align-self: center;
                            margin: auto;
                            font-size: 22px;
                            color: rgb(204,208,212);
                        }
                        .blurry-text {
                            color: transparent;
                            text-shadow: 0 0 5px rgba(0,0,0,0.5);
                        }
                        .notReaded{
                            background-color: #f9f9f9;
                            // border-top: 1px solid white;
                            border: 1px solid rgba(0, 0, 0, 0.1);
                        }
                        .notReaded .shortMessage{
                            font-weight: 700;
                        }
                        .location{
                            color: #848183;
                        }
                        .date{
                            opacity: 0.6;
                            text-align: right;
                            font-size: 12px;	
                            line-height: 24px;
                        }
                        .leftSide{
                            margin-left: auto;
                            margin-right: 20px;
                        }
                        .shortMessage{
                            color: #525C61;
                            font-size: 14px;
                            margin-top: 7px;
                        }
                        .checkbox_dialog{
                            align-self: center;
                            margin-right: 20px;
                            margin-top: -10px;
                            margin-left: 18px;
                        }
                        .checkbox{
                            align-self:center;
                        }
                        .wrap-dialog{
                            display:flex;
                            justify-content: flex-start;
                            height: 100px;
                            justify-content: flex-start;
                            // border-bottom: 1px solid #F9F9F9;
                            // border-left: 1px solid #F9F9F9;
                            // border-right: 1px solid #F9F9F9;
                            padding: 12px;
                        }
                        .name {
                            color: rgb(119, 112, 116);
                            font-size: 18px;
                            font-weight: 600;
                        }
                        .message-avatar {
                            height: 75px;
                            width: 75px;
                            position: relative;
                            background-image: url(${sexPhotoFinder(user.sex ,user.main_photo_thumb)});
                            border-radius: 9px;
                            background-position: center;
                            background-repeat: no-repeat;
                            background-size: cover;
                            margin-right: 20px;
                            align-self: center;
                        }
                        .date {
                            margin-bottom: 5px;
                            opacity: 0.6;	
                            color: #525C61;	
                            font-size: 12px;
                        }
                        .blurry-text {
                            color: transparent;
                            text-shadow: 0 0 5px rgba(0,0,0,0.5);
                            user-select: none;
                        }
                    `}
                    </style>
                </div>
            )
        }
        else {
            return (
                <div className={`wrap-dialog ${lust_message.is_read || lust_message.my ? "" : "notReaded"}`}  onClick={()=>{}}>
                    {
                        status != 'select' ? (
                            <div className="checkbox_dialog">
                                <CheckboxField
                                    id= {id}
                                    className = "checkbox"
                                    onChange={handleCheck}
                                    checked={checked} 
                                    />
                            </div>
                        ) : (
                            ''
                        )
                    }                
        
                    <div  onClick={lust_message.id !== null ? ()=>clickDialog(id) : ()=>goToMember(user.id)} style = {{cursor: "pointer"}} className="message-avatar"> </div>
                    {
                        lust_message.id !== null 
                        ?
                        <div onClick={()=>clickDialog(id)} style = {{cursor: "pointer"}} className="main_wrap">
                            <div className="name">
                                <span style={{marginRight: 10}}>{user.first_name}, {user.age}</span>
                            </div>
        
                            <div className={dialog.is_read ? `read_message shortMessage` : 'shortMessage'}>
                                {textTrunc(lust_message.text, 58)} 
                            </div>
                        </div>
                        :
                        <div className="removedConversation">
                            User <span onClick={()=>goToMember(user.id)} style={{cursor: 'pointer'}}> {user.first_name} </span> has removed your conversation
                        </div>
                    }
        
                    {
                    lust_message.id &&
                    <div className="leftSide">
                        {
                            status == 'select' ? (
                                <div className="date mb-15">
                                    {/* {
                                        created_date[0] == today ? created_date[1] : created_date_display[1] + '/' + created_date_display[2]
                                    } */}
                                    {lust_message.created_at}
                                </div>
                            ) : (
                                ''
                            )
                        }
                        {
                            dialog.is_read ? (
                                <div className='isRead'></div>
                            ) : (
                                <div className='nonRead'><img src="../../static/assets/img/check.png" className="checkIcon" /></div>
                            )
                        }
                    </div>
                    }
        
                    <style jsx>{`
                        .checkIcon{
                            width: 10px;
                            margin-top: -6px;
                            margin-left: 2px;
                        }
                        .nonRead{
                            float: right;
                            width: 15px;
                            height: 15px;
                            margin-top: 0px;
                            background-color: #c2c5cc;
                            border-radius: 50%;
                        }
                        .isRead{
                            float: right;
                            width: 15px;
                            height: 15px;
                            margin-top: 20px;
                            background-color: #00adfe;
                            border-radius: 50%;
                        }
                        .main_wrap, .removedConversation{
                            width: 50%;
                            padding-top: 10px;
                        }
                        .removedConversation {
                            text-align: center;
                            font-weight: 600;
                            align-self: center;
                            margin: auto;
                            font-size: 22px;
                            color: rgb(204,208,212);
                        }
                        .blurry-text {
                            color: transparent;
                            text-shadow: 0 0 5px rgba(0,0,0,0.5);
                        }
                        .notReaded{
                            background-color: #f9f9f9;
                            // border-top: 1px solid white;
                            border: 1px solid rgba(0, 0, 0, 0.1);
                        }
                        .notReaded .shortMessage{
                            font-weight: 700;
                        }
                        .location{
                            color: #848183;
                        }
                        .date{
                            opacity: 0.6;
                            text-align: right;
                            font-size: 12px;	
                            line-height: 24px;
                            padding-top: 30px;
                            // float: left;
                            padding-top: 20px;
                        }
                        .shortMessage{
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .leftSide{
                            margin-left: auto;
                            margin-right: 0px;
                            width: 25%;
                        }
                        .shortMessage{
                            color: rgba(0, 0, 0, 0.5);
                            font-size: 14px;
                            margin-top: 7px;
                        }
                        .read_message{
                            color: black;
                            font-weight: 700;
                        }
                        .checkbox_dialog{
                            align-self: center;
                            margin-right: 20px;
                            margin-top: -10px;
                            margin-left: 18px;
                        }
                        .checkbox{
                            align-self:center;
                        }
                        .wrap-dialog{
                            display:flex;
                            justify-content: flex-start;
                            height: 100px;
                            justify-content: flex-start;
                            // border-bottom: 1px solid #F9F9F9;
                            // border-left: 1px solid #F9F9F9;
                            // border-right: 1px solid #F9F9F9;
                            padding: 12px;
                        }
                        .name {
                            color: rgb(119, 112, 116);
                            font-size: 18px;
                            font-weight: 600;
                        }
                        .message-avatar {
                            height: 75px;
                            width: 75px !important;
                            position: relative;
                            background-image: url(${sexPhotoFinder(user.sex ,user.main_photo_thumb)});
                            border-radius: 9px;
                            background-position: center;
                            background-repeat: no-repeat;
                            background-size: cover;
                            margin-right: 20px;
                            align-self: center;
                        }
                        .date {
                            margin-bottom: 5px;
                            opacity: 0.6;	
                            color: #525C61;	
                            font-size: 12px;
                        }
                        .blurry-text {
                            color: transparent;
                            text-shadow: 0 0 5px rgba(0,0,0,0.5);
                            user-select: none;
                        }
                        @media (max-width: 768px){
                            .removedConversation{
                                text-align: left;
                                font-size: 14px;
                                width: 75%;
                            }
                        }
                    `}
                    </style>
                </div>
            )
        }
    }
}

export default connect()(DialogBlock)