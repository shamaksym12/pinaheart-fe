import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import store from '../../store'
import { toggleModal } from '../../actions/ui'
import BtnMain from '../buttons/btn_main.js'

class MainModal extends Component {
    closeModal = () => {
        store.dispatch(toggleModal(false, this.props.keyModal))
        if (this.props.callback) {
            this.props.callback()
        }
    }
    
    render() {
        const { className, show, size, title, body, keyModal, isTitle, closeIcon = true } = this.props;
        // console.log(isTitle);
        return (
            <Modal
                className={className}
                show={show} 
                backdrop={keyModal === 'login' ? 'static' : ''}
                dialogClassName="modal-60w"
                onHide={this.closeModal}
                bsSize={size != 'large' ? size : null}>
                <Modal.Header bsClass={' modal-header'} closeButton={closeIcon}>
                {
                    keyModal === 'login'
                    ?   <div className="text-center">
                            <img src="/static/assets/img/pinaheart_logo.png" style={{width: 186}} alt="" />
                        </div>
                    :   title
                        ?   <h3 className="modal-title title fs-30 text-center">
                                &nbsp;{title}
                            </h3>
                        :   null
                }
                    
                </Modal.Header>
                <Modal.Body>{body}</Modal.Body>
                <style jsx>
                    {
                        `
                        .modal-60w {
                            width: 60%;
                            max-width: none!important;
                        }

                        @media (max-width: 767px) {
                            .modal-content{
                                padding: 0 10px;
                            }
                        }
                        `
                    }
                </style>
            </Modal>
        );
    }
}

export default MainModal