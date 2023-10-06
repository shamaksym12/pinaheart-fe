import React, { Component } from 'react'
import { connect } from 'react-redux'
import {sexPhotoFinder} from '../../utils'
import CheckboxField from '../../components/inputs/checkbox_field'


const MessageBlock = ({message, user, has_paid_user, length, index, user_status}) => {
    const created_date = message.created_at.split(' ');
    const date = new Date();
    const month = (date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    const day = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();
    const today = date.getUTCFullYear() + '-' + month + '-' + day;
    const created_date_display = created_date[0].split('-')
    
    return (
        message.my 
        ?
        <div className="wrap-dialog" onClick={()=>{}}>
            {
                index == (length - 1) ? (
                    <div className="created_at">
                        {/* {
                            created_date[0] == today ? created_date[1] : created_date_display[1] + '/' + created_date_display[2]
                        } */}
                        {
                            message.created_at
                        }
                    </div>
                ) : (
                    ''
                )
            }
            <div className={!has_paid_user ? `blurry-text text` : 'text'}>
                {message.text}
            </div>
            <style jsx>{`
                    .text{
                        color: #848183;
                        font-size: 14px;
                        padding: 10px 20px;
                        background-color: #F1FFE0;
                        text-align: left;
                        border-radius: 10px;
                        margin-left: auto;
                        max-width: 70%;
                        margin-right: 35px;
                        white-space: pre-wrap;
                        white-space: -moz-pre-wrap;
                        white-space: -pre-wrap;
                        white-space: -o-pre-wrap;
                        word-wrap: break-word;
                    }
                    .blurry-text {
                        color: transparent;
                        text-shadow: 0 0 5px rgba(0,0,0,0.5);
                        user-select: none;
                    }
                    .created_at{
                        opacity: 0.6;
                        text-align: right;
                        font-size: 12px;	
                        line-height: 24px;
                        margin-left: auto;
                        margin-right: 35px;
                    }
                    .wrap-dialog{
                        display:flex;
                        flex-direction: column;
                        justify-content: flex-end;
                        margin-bottom: 20px;
                    }
                    @media (max-width: 575px) {
                        .text{
                            margin-right: 15px;
                            padding: 10px 15px 8px 15px;
                        }
                        .created_at{
                            text-align: center;
                            margin: 0;
                        }
                    }
            `}
            </style>
        </div> 
        :         
        <div className="wrap-dialog" onClick={()=>{}}>
            {
                index == (length - 1) ? (
                    <div className="created_at">
                        {/* {
                            created_date[0] == today ? created_date[1] : created_date_display[1] + '/' + created_date_display[2]
                        } */}
                        {
                            message.created_at
                        }
                    </div>
                ) : (
                    ''
                )
            }
            <div className = "wrap_photo_text">
                <div className="dialogAvatar"></div>
                {user_status <= 180 && user_status !== null ? <div className="online_user_status online_active_statue"></div> : <div className="online_user_status"></div>}
                <div className={!has_paid_user ? `blurry-text text` : 'text'}>
                    {message.text}
                </div>
            </div>
            <style jsx>{`
                    .online_user_status{
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        background: #cccccc;
                        position: absolute;
                        top: 35px;
                        left: 65px;
                        z-index: 9;
                        border: 2px solid #ffffff;
                    }
                    .wrap_photo_text{
                        display:flex;
                        flex-direction: row;
                        justify-content: flex-start;
                        position: relative;
                    }
                    .dialogAvatar {
                        height: 55px;
                        width: 55px;
                        position: relative;
                        background-image: url(${sexPhotoFinder(user.sex , user.main_photo_thumb)});
                        border-radius: 9px;
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size: cover;
                        align-self: center;
                        margin-right: 15px;
                        margin-left: 25px;
                        border-radius: 50%;
                    }
                    .text{
                        display: inline-table;
                        color: #848183;
                        font-size: 14px;
                        padding: 10px 20px;
                        background-color: #F9F9F9;
                        text-align: left;
                        border-radius: 10px;
                        margin-right: auto;
                        margin-left: 15px;
                        margin-top: 6px;
                        max-width: 80%;
                    }
                    .created_at{
                        opacity: 0.6;
                        text-align: right;
                        font-size: 12px;	
                        line-height: 24px;
                        margin-left: 110px;
                        margin-right: auto;
                    }
                    .wrap-dialog{
                        display:flex;
                        flex-direction: column;
                        justify-content: flex-end;
                        margin-bottom: 20px;
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

export default connect()(MessageBlock)