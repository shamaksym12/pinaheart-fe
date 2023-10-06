// import React from 'react';
import { connect } from 'react-redux';
import BtnMain from '../buttons/btn_main';
import { toggleModal } from '../../actions/ui';
import store from '../../store';
import user from '../../reducers/user';
import { setOnAccount, setAccountOnOff } from '../../actions/user';
import { logout } from '../../actions/auth';

const AccountRenewalModal = ({dispatch, user}) => {

  const setAccount = () => {
    dispatch(setOnAccount()).then(res => res && dispatch(setAccountOnOff(false)));

  }

  const doLogout = () => {
    console.log('logout')
    dispatch(logout());
  }

  return 	(
      <div className="p-15">
				<input 
        			type="file"
        			// ref={ref => upload = ref}
        			multiple={false}
        			// onChange={onChange}
        			className="hidden" />
				<div className="text-center form-group mb-100">Welcome, {user.data.first_name},
We are happy to see you again. Your profile is still switched off. Click to switch your profile ON again</div>
				<div className="row wrap-photos">
					<div className="location-divider">or</div>
					<div className="col-sm-6 col-12 text-center form-group">

						<BtnMain text="Switch my profile on" className="btn-green" onClick={setAccount} />
					</div>
					<div className="col-sm-6 col-12 text-center form-group">

						<div className="form-group">
							<BtnMain onClick={doLogout}  style={{color: '#DFDADA', backgroundColor: 'white', border: '1px solid #DFDADA'}}  text="Log out" />
						</div>
					</div>
				</div>
				<style jsx>{`
					.wrap-photos {
						position: relative;
						overflow: hidden;
          }
					.container-photos {
				        padding: 60px 15px;
				        height: 190px;
					}
					.location-divider {
						font-style: italic;
						color: #DFDADA;
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
					}
					.location-divider:after,
					.location-divider:before {
						content: "";
					    border-left: 1px solid #DFDADA;
					    height: 1000px;
					    position: absolute;
					    left: 50%;
					}
					.location-divider:after {
					    bottom: 30px;
					}
					.location-divider:before {
					    top: 30px;
          }
          @media (max-width: 990px) {
            .location-divider {
              display: none;
            }
          }
					@media (max-width: 576px) {
						.location-divider:after {
                display: none;
                height: 1px;
						    width: 1000px;
						    border-bottom: 1px solid;
						    top: 50%;
						    left: 30px;
						}
						.location-divider:before {
                display: none;
                height: 1px;
						    width: 1000px;
                border-bottom: 1px solid;
                // margin: 50px 0;
                // padding: 50px 0;
						    top: 50%;
						    left: -1015px;
						}
					}
				`}
				</style>
      </div>
      );
}

const mapStateToProps = state => ({
  user: state.user,
})

// const mapDispatchToProps = dispatch => ({
//   setAccountOn: () => dispatch(setOnAccount()),
//   setAccountOnOff: () => dispatch(setAccountOnOff()),
// })

export default connect(mapStateToProps)(AccountRenewalModal);//mapDispatchToProps
