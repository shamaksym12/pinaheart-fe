import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import BtnMain from "../buttons/btn_main";
import MembershipInfo from "../block/membership_info";
import {cancelSubscription} from "../../actions/payment";
import {toggleModal} from "../../actions/ui";


const AutoRenewal = ({ cancelSubscription, active, toggleModal }) => {
    return (
        <Fragment>
            <div>
                <div className='head'>
                    <div className='exclamation-circle'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><circle cx="11" cy="-1041.36" r="8" transform="matrix(1 0 0-1 0-1030.36)" opacity=".98" fill="#da4453"/><path d="m-26.309 18.07c-1.18 0-2.135.968-2.135 2.129v12.82c0 1.176.948 2.129 2.135 2.129 1.183 0 2.135-.968 2.135-2.129v-12.82c0-1.176-.946-2.129-2.135-2.129zm0 21.348c-1.18 0-2.135.954-2.135 2.135 0 1.18.954 2.135 2.135 2.135 1.181 0 2.135-.954 2.135-2.135 0-1.18-.952-2.135-2.135-2.135z" transform="matrix(.30056 0 0 .30056 18.902 1.728)" fill="#fff" stroke="#fff"/></svg>
                    </div>
                    <p>Disable Auto Renewal</p>                    
                </div>

                <div className='para'>
                    <p>
                        When you disable auto renewal, you will lose all benefits only preminum members
                        enjoy, once your current membership expires
                    </p>
                </div>

                <div className='buttons'>
                    <BtnMain style={{ marginBottom: '3rem' }}
                             className='btn-green' text='Confirm'
                             onClick={() => {
                                cancelSubscription(active);
                                toggleModal(false, 'autoRenewal')
                             }}
                    />
                    <BtnMain style={{ marginBottom: '3rem' }}
                             className='btn-default' text='Keep Auto Renewal enabled'
                             onClick={() => toggleModal(false, 'autoRenewal')}
                    />
                </div>

                <MembershipInfo withoutBtn={true} />
            </div>
            <style jsx>
                {
                  `.buttons {
                            display: flex;
                            margin-bottom: 4rem;
                            justify-content: space-around;
                    }

                    .exclamation-circle {
                      width: 12rem;
                      margin: 0 auto;
                      margin-bottom: 1rem;
                    }
                    
                    .head {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin-bottom: 1rem;
                        margin-top: -65px;
                    }
                    
                    .head p {
                        font-size: 2rem;
                    }
                    
                    .btn-green {
                        background: green;
                    }
                    
                    .para {
                        margin-bottom: 1rem;
                        text-align: center;
                    }

                    .para p {
                        margin-bottom: 3px;
                    }
                    
                    @media (max-width: 456px) {
                        .buttons {
                            flex-direction: column;
                            align-items: center;
                        }
                    }
                  `
                }
            </style>
        </Fragment>
    )
};

const mapStateToProps = ({payment: { active }}) => {
    return {
        active
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        cancelSubscription: cancelSubscription(dispatch),
        toggleModal: (val, key) => dispatch(toggleModal(val, key))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(AutoRenewal);