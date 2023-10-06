import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlans, setTerm, setPaymentMethod, updatePlans, changeRatioButton, setCurrentPlan, onMemInfo } from '../../../actions/membership';
import { getUserInfo } from '../../../actions/user';
import Spinner from '../../spinner';
import { toggleModal } from '../../../actions/ui';
import { Elements } from 'react-stripe-elements';
import StripeForm from '../stripe-form';
import BtnPaypal from '../../buttons/btn_paypal';
import MembershipInfo from '../../block/membership_info';
import ThankYou from '../../block/thank_you';

class MemberForm extends Component {

    componentDidMount() {
        this.props.getPlans();
    }

    handleMethodChange = (label) => {
      this.props.setPaymentMethod(label);
      this.props.updatePlans();
    };

    handleChange = (id) => {
        this.props.setTerm(id);
        this.props.setCurrentPlan();
    };

    radioChange = (e) => {
         this.props.changeRatioButton(e.target.value);
     };

    render() {
        const { plans, paymentMethod, loading, currentPlan, paidStatus, memInfo } = this.props;
        const pricePerMonth = (name, price) => {
            let multiplyDiget = name.split(' ')[0];
                multiplyDiget = price / multiplyDiget;
                if(name === '1 month') {
                    multiplyDiget =  multiplyDiget.toFixed(2);
                } else {
                    multiplyDiget =  multiplyDiget.toFixed(1);
                }
            return multiplyDiget;
        };

        if (loading) return <Spinner />;

        const SubPlansItem = ({ data: { name, price, id }, counter }) => {

            return (
                <div className='sub-plans'>
                    <div className="sub-plans-item">
                        <div className='term'>
                            <p>{name}</p>
                        </div>
                        <div className='plan'>
                            <div className='input-wrapper'>
                                <div className='plan-input'>
                                    <div className="radio-first" >
                                        <input onClick={() => this.handleChange(id)}
                                               id={`radio-${counter}`} name="radio"
                                               type="radio"
                                               value={name}
                                               checked={this.props.selectedOption === name}
                                               onChange={this.radioChange} />
                                            <label htmlFor={`radio-${counter}`}  className="radio-label"></label>
                                    </div>
                                </div>
                                <div className='plan-details'>
                                    <p>$ {pricePerMonth(name, price)} USD per month</p>
                                    {name === '1 month' ? null : <small>Billed in one payment of {price} USD</small>}
                                </div>
                            </div>

                            { name === '1 month' ? null
                                 :  <div className='plan-save'>
                                    <p>Save {name === '12 month' ? '67%' : '33%'}</p>
                                    </div>}


                        </div>
                    </div>
                    <style jsx>{
                        `
.radio-first {
  margin: 0.5rem;
}
.radio-first label {
    margin: 0 1rem;
    padding: 0;
}
.radio-first input[type="radio"] {
  position: absolute;
  opacity: 0;
}
.radio-first input[type="radio"] + .radio-label:before {
  content: '';
  background: #f4f4f4;
  border-radius: 50%;
  border: 2px solid #b4b4b4;
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  position: relative;
  top: -0.2em;
  margin-right: 1em;
  vertical-align: top;
  cursor: pointer;
  text-align: center;
  transition: all 250ms ease;
}
.radio-first input[type="radio"]:checked + .radio-label:before {
  background-color: #225cff;
  border-color: #225cff;
  box-shadow: inset 0 0 0 4px #f4f4f4;
}
.radio-first input[type="radio"]:focus + .radio-label:before {
  outline: none;
  border-color: #225cff;
}
.radio-first input[type="radio"]:disabled + .radio-label:before {
  box-shadow: inset 0 0 0 4px #f4f4f4;
  border-color: #b4b4b4;
  background: #b4b4b4;
}
.radio-first input[type="radio"] + .radio-label:empty:before {
  margin-right: 0;
}


                    .sub-plans-item {
                        display: flex;
                        box-sizing: border-box;
                        border: 1px #cbcbcb solid;
                        border-top: 0;
                        border-collapse: collapse;
                    }

                    .term {
                        background: #f0f4ff;
                        width: 20%;
                        display: inherit;
                        align-items: center;
                        justify-content: center;
                    }

                    .plan {
                        display: flex;
                        width: 80%;
                        align-items: center;
                        justify-content: space-between;
                        padding: 1rem 0;
                    }

                    .plan-input input{
                        margin: 0 1rem;
                    }


                    .plan-save {
                        padding: 2rem;
                        background: #545caa;
                        color: #fff;
                        align-self: flex-end;
                        margin-right: 4rem;
                        padding: 2rem;
                        border-radius: 5px;
                    }

                    .plan-save p {
                        margin: 0;

                    }

                    .input-wrapper {
                        display: flex;
                        align-items: center;
                    }

                    .input-wrapper * {
                        margin: 0;
                    }

                       @media screen and (max-width: 414px) {
                          .plan{
                            flex-direction: column;
                            align-items: center;

                          }

                          .plan-save {
                            align-self: center;
                          }
                        }


                        @media screen and (max-width: 330px) {
                            .payment-item {
                                flex-wrap: wrap;
                            }

                            .payment-img {
                                width: 100%;
                            }

                            .recommendation {
                                margin-bottom: 1rem;
                            }
                        }

                        @media screen and (max-width: 330px) {

                            .sub-plans-item {
                                flex-direction: column;
                                align-items: center;
                            }

                            .term {
                                width: 100%;
                                padding: 2rem;
                            }

                            .term p {
                                margin: 0;
                            }

                            .plan-save {
                                align-self: center;
                                width: 50%;
                                margin: 0;
                            }

                            .input-wrapper {
                                margin-bottom: 2rem;
                            }
                        }

                    `
                    }</style>
                </div>
            );
        };

        let plansItems = [];
        let counter = 4;
        plans.map(e => {
                plansItems.push(<SubPlansItem key={e.origin_id} data={e} counter={counter} />);
                counter++;
        });

        let successPaidText = (
            <h5>Thank you for your purchase. <br/> Click
                <a href='/matches'><span className='text-danger'>here</span></a>
            to see your matches</h5>
        );

        return (
            paidStatus === 'success' ?  <ThankYou />
                :   <div id="subscription" className="ab form-wrapper">
            <div className='sub-hdr-wrapper'>
                <div className="sub-hdr">
                    <p>Platinum</p>
                    <a href='#why'
                    onClick={() => this.props.onMemInfo()}>Why Choose Platinum Membership?</a>
                </div>
            </div>

            <div className='mb-5'>
                {plansItems}
            </div>

            <div className='payment-wrapper'>
                <div className='payment-method-step-2'>
                    <div className='payment-hdr'>
                        <p>Step 2 - Choose a payment method</p>
                    </div>

                    <div className='payment-item'>

                        <label htmlFor="opt1" className="radio payment-item-input">
                            <input  onClick={() => this.handleMethodChange('stripe')}
                                    type="radio" defaultChecked name="payment-method" id="opt1" className="hidden"/>
                            <span className="label"></span>
                        </label>

                        <div className='recommendation'>
                            <p>Credit Card</p>
                            <p className='recommendation-label'>Recommended</p>
                        </div>

                        <div className='payment-img'>
                            <img src='/static/assets/img/visa.png' alt="visa"/>
                            <img src='/static/assets/img/american-express.png' alt="visa"/>
                            <img src='/static/assets/img/master-card.png' alt="visa"/>
                        </div>
                    </div>
                    <div className='payment-item'>

                        <label htmlFor="opt2" className="radio payment-item-input">
                            <input  onClick={() => this.handleMethodChange('paypal')}
                                    type="radio" name="payment-method" id="opt2" className="hidden"/>
                            <span className="label"></span>
                        </label>

                        <div className='recommendation'>
                            <p>PayPal</p>
                        </div>

                        <div className='payment-img'>
                            <img src='/static/assets/img/pay-pal.png' alt="visa"/>
                        </div>
                    </div>

                </div>
                <a name='why' id='why'> </a>
            </div>

        <div className='payment-area'>
            {
                paymentMethod === 'stripe' ?

                    <Elements>
                        <StripeForm method={currentPlan.type} id={currentPlan.id}/>
                    </Elements>

                    : <BtnPaypal />
            }
        </div>
                    {
                        memInfo ? <MembershipInfo withoutBtn={true} /> : null
                    }

            <style jsx>
                {
                    `
                    
                    .payment-area {
                        margin-bottom: 6rem
                    }

                        .form-wrapper {
                            margin-top: -6rem;
                        }

                    .radio {
                      position: relative;
                      cursor: pointer;
                      line-height: 20px;
                      font-size: 14px;
                      margin: 15px;
                    }
                    .radio .label {
                      font-family: "Roboto", sans-serif;
                      position: relative;
                      display: block;
                      float: left;
                      margin-right: 10px;
                      width: 20px;
                      height: 20px;
                      border: 2px solid #c8ccd4;
                      border-radius: 100%;
                      -webkit-tap-highlight-color: transparent;
                    }
                    .radio .label:after {
                      content: '';
                      position: absolute;
                      top: 3px;
                      left: 3px;
                      width: 10px;
                      height: 10px;
                      border-radius: 100%;
                      background: #225cff;
                      transform: scale(0);
                      transition: all 0.2s ease;
                      opacity: 0.08;
                      pointer-events: none;
                    }
                    .radio:hover .label:after {
                      transform: scale(3.6);
                    }
                    input[type="radio"]:checked + .label {
                      border-color: #225cff;
                    }
                    input[type="radio"]:checked + .label:after {
                      transform: scale(1);
                      transition: all 0.2s cubic-bezier(0.35, 0.9, 0.4, 0.9);
                      opacity: 1;
                    }
                    .cntr {
                      position: absolute;
                      top: calc(50% - 10px);
                      left: 0;
                      width: 100%;
                      text-align: center;
                    }
                    .hidden {
                      display: none;
                    }
                    .credit {
                      position: fixed;
                      right: 20px;
                      bottom: 20px;
                      transition: all 0.2s ease;
                      -webkit-user-select: none;
                      user-select: none;
                      opacity: 0.6;
                    }
                    .credit img {
                      width: 72px;
                    }
                    .credit:hover {
                      transform: scale(0.95);
                    }




                          .subscription {
                        border: 2px #cbcbcb solid;
                    }

                    .sub-hdr-wrapper {
                        border: 1px #cbcbcb solid;
                        padding: 1rem;
                    }

                    .sub-hdr {
                        display: flex;
                        justify-content: space-between;
                        background: #2A3294;
                        height: 5rem;
                        aline-items: center;
                        font-size: 2rem;
                        color: #fff;
                        font-weight: bold;
                        align-items: center;
                    }
                    .sub-hdr p{
                        margin: 0 0 0 20%;
                    }

                    .sub-hdr a {
                       font-size: 1.4rem;
                       align-self: flex-end;
                       color: #fff;
                       font-weight: 100;
                       font-size: 1rem;
                       margin: .5rem;
                    }

                    .payment-hdr {
                        padding: 0.8rem;
                        background: #eee;

                    }
                    .payment-hdr p {
                        margin: 0;
                    }

                    .payment-wrapper {
                        border: 1px #cbcbcb solid;
                        border-radius: 5px;
                        margin-bottom: 1rem;
                        border-bottom: 0;
                    }

                    .payment-item {
                        display: flex;
                        align-items: center;
                        padding: 1.5rem;
                        border-bottom: 1px solid #cbcbcb;
                    }

                    .payment-img img {
                        margin-right: 3px
                    }

                    .payment-item-input {
                        margin: 1rem;
                    }

                    .recommendation * {
                        margin: 0;
                    }

                    .recommendation {
                       margin-right: 3rem;
                     }

                    .recommendation-label {
                            display: block;
                            font-size: .9rem;
                            padding: .5rem;
                            border: 1px solid #7EAF31;
                            border-radius: 3px;
                            color: #7EAF31;
                    }

                    .update-btn {
                            background: #7EAF31;
                            color: #fff;
                            border-radius: .5rem;
                            padding: 1rem;
                            font-weight: 300;
                    }


                        `
                }
            </style>

        </div>
        )

    }
};

const mapStateToProps = ({ membership: { plans, planId, paymentMethod, selectedOption, currentPlan, card, paidStatus, memInfo, loading } }) => {
    return {
        plans,
        paymentMethod,
        planId,
        selectedOption,
        currentPlan,
        card,
        paidStatus,
        memInfo,
        loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setTerm: (id) => dispatch(setTerm(id)),
        getPlans: () => getPlans(dispatch),
        setPaymentMethod: (data) => dispatch(setPaymentMethod(data)),
        updatePlans: () => dispatch(updatePlans()),
        changeRatioButton: (data) => dispatch(changeRatioButton(data)),
        setCurrentPlan: () => dispatch(setCurrentPlan()),
        getUserInfo: () => dispatch(getUserInfo()),
        toggleModal: () => dispatch(toggleModal(false, 'subscription')),
        onMemInfo: () => dispatch(onMemInfo())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberForm);