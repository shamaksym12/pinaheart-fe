import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup } from 'react-bootstrap'
import TextField from '../inputs/text_field'
import BtnMain from '../buttons/btn_main'
import { toggleModal } from '../../actions/ui'
import InputInline from '../../components/inputs/InputInline'
import Autocomplete from '../inputs/autocomplete'
import {setOffAccount} from '../../actions/user'
import {setOnAccount} from '../../actions/user'
import { Router } from '../../routes'
import {logout} from '../../actions/auth'
import store from '../../store'

class Switch_profile extends Component {
    constructor() {
        super()
        this.auth = {}
        this.state = {
                    reason: "Please Select..",
                    password: ""
        }
    }

    goTo = link => e => {
        e.preventDefault()
        Router.pushRoute(`${link}`)
    }

    closeModal = () => {
        store.dispatch(toggleModal(false, 'switch_profile'))
    }

    switch_Prof_off = () =>{
        const {dispatch} = this.props
        dispatch(setOffAccount(this.state)).then(
           res=> {
               if (res) {
                this.closeModal();
                dispatch(logout());
                window.location.href='/';

                } else {
                this.closeModal()
                }
            }
        );
        
    }


    handleChangeReason = (field, value) => {
        // console.log(value)
        this.setState({
            reason:value
        })
    }

    handleChangePassword = (value) => {
        // console.log(value)
        this.setState({
            password:value
        },()=>{})
        
    }


    handleSelectPassword = (value, place) => {

    }

    showRecovery = () => {
        store.dispatch(toggleModal(true, 'recovery'))
        store.dispatch(toggleModal(false, this.props.keyModal))
    }
    
    render() {
        // console.log(this.state)
        return (
            <div className="custom-table switch_modal text-center">
                <div className="switch_title">Are you sure you want to switch off your profile?</div>
                <div className="swithch_undertitle">We would be sorry to see you go</div>
                <form>
                <FormGroup>
                                    <InputInline
                                            className="swith_input"
                                            icon={false}
                                            label="What is the reason you want to leave us?"
                                            type="select"
                                            field="reason"
                                            value={this.state.reason}
                                            onChange={this.handleChangeReason}
                                            options={[{id: '', name: 'Please Select...'},
                                                      {id: "The site doesn't work well", name: "The site doesn't work well"},
                                                      {id: "Issues with members", name: "Issues with members"},
                                                      {id: "I prefer another dating site", name: "I prefer another dating site"},
                                                      {id: "I found someone and dont need it anymore", name: "I found someone and dont need it anymore"},
                                                      {id: "I want to take a break", name: "I want to take a break"},
                                                      {id: "Other", name: "Other"}]}
                                             />
                </FormGroup>
                <FormGroup className="swith_input">
                                    <TextField
                                            type="password"
                                            label="To switch Off My Profile please enter your password"
                                            className={this.state.password !== true ? '' : ''}
                                            description={<span className="text-danger">{this.state.password}</span>}
                                            placeholder="Enter password"
                                            inputRef={ref => { this.auth.password = ref }}
                                            onChange={res => this.handleChangePassword(res)}
                                            />
                                            

                                    <div className="Forgot_pas"  onClick={this.showRecovery}>Forgot your password?</div>
                </FormGroup>
                <FormGroup>
                                    <BtnMain
                                            type="submit"
                                            className="btn-green btn-block"
                                            onClick={this.closeModal}
                                            text="Return to Settings"/>
                </FormGroup>

                <div className="block-select" onClick={this.switch_Prof_off} type="submit">
                                            Switch Off My Profile 
                </div>


                </form>
                <style jsx>{`

                .Forgot_pas{
                    height: 14px;		
                    color: #848183;	
                    font-family: "Open Sans";	
                    font-size: 12px;
                    text-align: center;
                    cursor: pointer;
                    margin-bottom: 40px;
                    margin-top: 10px;
                }
                    .custom-table{
                        margin-top:-50px;
                    }
                    .custom-table .switch_title{
                        height: 48px;	
                        color: #747373;	
                        font-family: "Open Sans";	
                        font-size: 18px;	
                        font-weight: 600;	
                        line-height: 29px;	
                        text-align: center;
                    }
                    .custom-table .swithch_undertitle{
                        height: 15px;	
                        opacity: 0.6;	
                        color: #747373;	
                        font-family: "Open Sans";	
                        font-size: 14px;	
                        font-weight: 600;	
                        line-height: 29px;	
                        text-align: center;
                    }
                    
                    .modal-content {
                        width:405px;
                    }
                `}
                </style>
            </div>
        );
    }
}

export default connect()(Switch_profile) 