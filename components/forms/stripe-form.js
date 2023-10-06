import React, { Component } from 'react';
import { connect } from 'react-redux';
import {CardElement, injectStripe} from 'react-stripe-elements';
import { post } from '../../api'
import { paidStatusSuccess, startLoading, endLoading} from "../../actions/membership";
import { getDialog } from "../../actions/dialog";
import { getUserInfo } from "../../actions/user";
import { setAlert } from "../../actions/ui";
import Spinner from "../spinner";
import Loader from "../loader";
import {Router} from '../../routes'

class CheckoutForm extends Component {

    submit = async (ev) => {
        this.props.startLoading();
        const { method, id } = this.props;
        // console.log(id);
        try {
            let res = await this.props.stripe.createToken();

            if(!res.token) {
                this.props.endLoading();
                return setAlert(res.error.massage, 'error')
            }

            let { data } = await post(`payments/${method}/${id}`, true, {token: res.token.id});

            if(!data) {
                this.props.endLoading();
                return  setAlert('err', 'error')
            }

            if(data.subscription_status === 'incomplete' && data.payment_intent_status === 'requires_action') {
                const paymentIntentSecret = data.secret;

                this.props.stripe.handleCardPayment(paymentIntentSecret).res(result => {
                    if (result.error) {
                        // console.log(`err: ${result.error}`);
                        // Display error.message in your UI.
                    } else {
                        this.props.paidStatusSuccess();
                        this.props.endLoading();
                        this.props.getUserInfo();
                    }
                });
            } else {
                this.props.paidStatusSuccess();
                this.props.endLoading();
                this.props.getUserInfo();
            }
        } catch (e) {
            this.props.setAlert(e, 'error');
        }

    };

    render() {
        return (
             <div className="checkout" style={{ height: '17rem'}}>
                <p>Would you like to complete the purchase?</p>
                <CardElement style={{base: {fontSize: '1rem'}}} />
                 {!this.props.stripeLoading  ?
                     <button onClick={this.submit} className='submit-payment'>Submit Payment</button> : <Loader /> }
                <style jsx>
                    {
                      `
                      .checkout {
                        background: #F7F8F9;
                        padding: 1rem;
                      }

                      .submit-payment {
                            border: none;
                            border-radius: 4px;
                            outline: none;
                            text-decoration: none;
                            color: #fff;
                            background: #32325d;
                            white-space: nowrap;
                            display: inline-block;
                            height: 40px;
                            line-height: 40px;
                            padding: 0 14px;
                            box-shadow: 0 4px 6px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08);
                            border-radius: 4px;
                            font-size: 15px;
                            font-weight: 600;
                            letter-spacing: 0.025em;
                            text-decoration: none;
                            -webkit-transition: all 150ms ease;
                            transition: all 150ms ease;
                            margin-left: 12px;
                            margin-top: 28px;
                      }`
                    }
                </style>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDialog: (id) => dispatch(getDialog(id)),
        getUserInfo: () => dispatch(getUserInfo()),
        paidStatusSuccess: () => dispatch(paidStatusSuccess()),
        setAlert: (text, level) => dispatch(setAlert(text, level)),
        startLoading: () => dispatch(startLoading()),
        endLoading: () => {
            dispatch(endLoading())
        },
    }
};

const mapStateToProps = ({membership: { stripeLoading }}) => {
    return {
        stripeLoading,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(injectStripe(CheckoutForm));