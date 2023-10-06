import React from 'react';
import { connect } from 'react-redux';
import MembershipInfo from "./membership_info";
import BtnMain from "../buttons/btn_main";
import { Router } from '../../routes';
const Check = () => {
    return	<svg version="1.1" id="Layer_1" width="22px" fill="#98D538" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                   viewBox="0 0 512 512">
        <g>
            <g>
                <path d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0
							c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7
							C514.5,101.703,514.499,85.494,504.502,75.496z"/>
            </g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
    </svg>
}

const TankYou = ({ first_name }) => {
    return (
        <div className='thank-you'>
            <h3 className='text-secondary greeting'>Dear {first_name}</h3>
            <p className='welcome text-danger'>Welcome as a Premium member to Pinaheart!</p>
            <p className='options text-secondary'> You can now take advantage of all Premium options: </p>
            <div className="custom-table">
                <div className="custom-table-item">
                    <div className="first">
                        Message with all members
                    </div>
                    <div className="second bold">
                        <Check />
                    </div>
                </div>
                <div className="custom-table-item">
                    <div className="first">
                        Get higher ranking than other members
                    </div>
                    <div className="second bold">
                        <Check />
                    </div>
                </div>
                <div className="custom-table-item">
                    <div className="first">
                        Hide your profile / Anonymous browsing
                    </div>
                    <div className="second bold">
                        <Check />
                    </div>
                </div>
                <div className="custom-table-item">
                    <div className="first">
                        Advanced matching algorithms
                    </div>
                    <div className="second bold">
                        <Check />
                    </div>
                </div>
                <div className="custom-table-item">
                    <div className="first">
                        Show yourself as being "Busy"
                    </div>
                    <div className="second bold">
                        <Check />
                    </div>
                </div>
                <div className="custom-table-item form-group">
                    <div className="first">
                        Continued service through subscription
                    </div>
                    <div className="second bold">
                        <Check />
                    </div>
                </div>

            </div>
            <div className='info'>
                <p className='text-secondary'>In the Billing section you can switch on or off your recurring Premium membership subscribtion at any time.</p>
                <p className='text-secondary'>Start communicating now with thousands of potential partners and we wish you success in finding the love you have been looking for.
                    We at Pinaheart work very hard every day to eliminate fake or abusive accounts of people who want to take advantage of our members
                    looking for a relationship. Please take into account the following precaution measures:</p>

                <ul>
                    <li className='text-danger'>Never send money to people you meet online before having met them in person</li>
                    <li className='text-danger'>Report anyone who requests money or your financial details by clicking the "Report Abuse" icon.</li>
                </ul>

                <p>Should you need any help at any time, do not hesitate to
                    <span
                    onClick={() => Router.pushRoute('/contact-us')}
                    className="badge badge-pill badge-primary ml-5 contact-link">contact us</span></p>
            </div>
            <style jsx>{`
                     
                     .greeting {
                        margin-bottom: 2rem;
                     } 
                     
                     .welcome {
                        margin-bottom: 2rem;
                        font-size: 2rem
                     }
                     
                     .options {
                        margin-bottom: 6rem;
                     }
                     
                     .badge {
                        position: inherit;
                     }
                     
                     .contact-link:hover {
                        cursor: pointer;
                     }
                     
                     @media(max-width: 768px) {
                        .thank-you {
                            text-align: center;
                        }
                     }
                
					.custom-table {
						margin-top: -50px;
					}
					.first {
						width: 60%;
						font-weight: 600;
					}
					.second,
					.third {
						text-align: center;
						width: 20%;
					}
					.custom-table .custom-table-item:nth-child(odd) {
                        background: #F3F3F3;
                    }
                    .custom-table .custom-table-item {
                        border-radius: 9px;
                        padding: 5px 8px;
                        display: flex;
                        align-items: center;
                    }
                    @media (max-width: 768px) {
                    	.custom-table {
							padding: 0px 15px;
						}
                    }
                    @media (max-width: 768px) {
                    	.custom-table {
							padding: 0px 5px;
						}
                    }
				`}
            </style>

        </div>

    )
};

const mapStateToProps = ({ user } ) => {
    return {
        first_name: user.data.first_name
    }
};

export default connect(mapStateToProps)(TankYou);