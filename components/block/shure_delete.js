import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleModal } from '../../actions/ui'
import { Router } from '../../routes'
import store from '../../store'
import { deleteDialogs } from '../../actions/dialog'

class Shure_delete extends Component {
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
        store.dispatch(toggleModal(false, 'shure_delete'))
    }

    deleteDialog = (id) => {
        // console.log(id)
        const {dispatch} = this.props
        const temp = {
            ids: [id]
        }
        dispatch(deleteDialogs(temp))
            .then(store.dispatch(toggleModal(false, 'shure_delete')))
                .then(Router.pushRoute('/messages'))
    }
    
    render() {
        const {dialog} = this.props
        // console.log(dialog)
        return (
            <div className="custom-table switch_modal text-center">
                <div className="switch_title">Are you sure to delete all the messages for both of you?</div>
                <div className="block-select yes" onClick={()=>this.deleteDialog(dialog.id)} type="submit">
                    Yes
                </div>
                <div className="block-select no" onClick={this.closeModal} type="submit">
                    No
                </div>
                <style jsx>{`
                .yes{
                    background-color: #98D538;
                }
                .no{
                    background-color: #d7262d
                }
                .block-select{
                    width: 45%;
                    display: inline-block;
                    margin: 5px;
                    color: white;
                    font-weight: 600;
                }
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
                        margin-bottom: 30px;
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
const mapStateToProps = ({dialog}) =>
    ({
        dialog : dialog.messages
    })

export default connect(mapStateToProps)(Shure_delete) 