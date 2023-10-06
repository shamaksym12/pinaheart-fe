import React, { Component, Fragment } from 'react';
import { sendPaymentData, paidStatusSuccess, paidStatusFailure, paypalLoading} from '../../actions/membership';
import { getUserInfo } from '../../actions/user';

import { connect } from 'react-redux';
import Spinner from "../spinner";
import Loader from "../loader";

 class BtnPaypal extends Component {

    initPaypal = () => {
        paypal.Buttons({
            createSubscription: (data, actions) => {
                // console.log(this.props.currentPlan);
                return actions.subscription.create({
                    'plan_id': `${this.props.currentPlan.origin_id}`,
                    'auto_renewal': true,
                });
            },
            onApprove: (data, actions) => {
                const { type, id } = this.props.currentPlan;
                // console.log(this.props.currentPlan);
                this.props.sendPaymentData(type, id, data)
                    .then(data => {
                        if(data.statusCode === 200) {
                            this.props.getUserInfo();
                            this.props.paidStatusSuccess();
                        } else {
                            this.props.paidStatusFailure();
                        }
                    })
            }
        }).render('#paypal-button-container');
    };

    componentDidMount() {
        if(!window.paypal) {
            const script = document.createElement('script');
            script.src = `https://www.paypal.com/sdk/js?client-id=${this.props.clientId}&vault=true`;
            script.onload = () => {
                    this.initPaypal();
                    // important don't touch it
                    setTimeout(() => {
                        this.props.paypalBtnLoading();
                    })
            };
            document.body.appendChild(script);
        } else  {
            this.props.paypalBtnLoading();
            this.initPaypal();
        }
    };

    render() {
        const { paypalLoading } = this.props;

        return (
            <Fragment>
                { paypalLoading ? <Loader /> : null }
                <div style={{ height: '17rem'}} id='paypal-button-container' className='d-flex  justify-content-center'>
                </div>
            </Fragment>


      )
    };
};

const mapStateToProps = ({ membership: { clientId, currentPlan, paypalLoading } }) => {
    return {
        clientId,
        currentPlan,
        paypalLoading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo: () => dispatch(getUserInfo()),
        paidStatusSuccess: () => dispatch(paidStatusSuccess()),
        paidStatusFailure: () => dispatch(paidStatusFailure()),
        paypalBtnLoading: () => dispatch(paypalLoading()),
        sendPaymentData: sendPaymentData(dispatch),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(BtnPaypal);