import BtnMain from '../buttons/btn_main'
import {toggleModal} from "../../actions/ui";
import { connect } from 'react-redux'


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

const Close = () => {
	return 	<svg version="1.1" id="Capa_1" fill="rgb(201,45,55)" width="17px" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
				 viewBox="0 0 47.971 47.971">
			<g>
				<path d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88
					c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242
					C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879
					s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"/>
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

const MembershipInfo = ({ withoutBtn, toggleSubscriptionModal }) => {
	return	<div className="custom-table">
				<div className="custom-table-item">
					<div className="first"></div>
					<div className="second bold">
						Premium
					</div>
					<div className="third bold">
						Free
					</div>
				</div>
				<div className="custom-table-item">
					<div className="first">
						Browse and search matching partners
					</div>
					<div className="second bold">
						<Check />
					</div>
					<div className="third bold">
						<Check />
					</div>
				</div>
				<div className="custom-table-item">
					<div className="first">
						Message with paying members
					</div>
					<div className="second bold">
						<Check />
					</div>
					<div className="third bold">
						<Check />
					</div>
				</div>
				<div className="custom-table-item">
					<div className="first">
						Send interest
					</div>
					<div className="second bold">
						<Check />
					</div>
					<div className="third bold">
						<Check />
					</div>
				</div>
				<div className="custom-table-item">
					<div className="first">
						Add to favorites
					</div>
					<div className="second bold">
						<Check />
					</div>
					<div className="third bold">
						<Check />
					</div>
				</div>
				<div className="custom-table-item">
					<div className="first">
						Message with all members
					</div>
					<div className="second bold">
						<Check />
					</div>
					<div className="third bold">
						<Close />
					</div>
				</div>
				<div className="custom-table-item">
					<div className="first">
						Get higher ranking than other members
					</div>
					<div className="second bold">
						<Check />
					</div>
					<div className="third bold">
						<Close />
					</div>
				</div>
				<div className="custom-table-item">
					<div className="first">
						Hide your profile / Anonymous browsing
					</div>
					<div className="second bold">
						<Check />
					</div>
					<div className="third bold">
						<Close />
					</div>
				</div>
				<div className="custom-table-item">
					<div className="first">
						Advanced matching algorithms
					</div>
					<div className="second bold">
						<Check />
					</div>
					<div className="third bold">
						<Close />
					</div>
				</div>
				<div className="custom-table-item">
					<div className="first">
						Show yourself as being "Busy"
					</div>
					<div className="second bold">
						<Check />
					</div>
					<div className="third bold">
						<Close />
					</div>
				</div>
				<div className="custom-table-item form-group">
					<div className="first">
						Continued service through subscription
					</div>
					<div className="second bold">
						<Check />
					</div>
					<div className="third bold">
						<Close />
					</div>
				</div>
				<div className="text-center">
					{
						withoutBtn ? null  : <BtnMain text="Upgrade Now" className="btn-change" onClick={() => toggleSubscriptionModal()} /> 
					}
				</div>
				<style jsx>{`
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
					.custom-table .custom-table-item:nth-child(even) {
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
}

const mapDispatchToProps = dispatch => ({
	toggleSubscriptionModal: () => dispatch(toggleModal(true, 'subscription')),
 });

export default connect(null, mapDispatchToProps)(MembershipInfo);
