import React from 'react'
import StepZero from './registration/step_zero'
import BtnMain from '../components/buttons/btn_main'
import { Router } from '../routes'
import  { withRouter } from 'next/router';
import Layout from '../layouts'
import { getImage } from '../utils'

const Landing = (props) => {
	const { userAgent, router } = props;
	const goToRegister = () => {
			window.scroll({
			  top: 0,
			  behavior: 'smooth'
			});
		}
		return (
			<Layout userAgent={userAgent}>
				<div className="homeWrapper">
					<div style={{paddingTop: 40}}>
						<div className="mainPart">
		                    <div className="innerMain container">
		                        <div className="row">
		                            <div className={`col-xs-12 col-sm-6 col-md-5 col-lg-4`}>
		                            	<StepZero promo={router.asPath} />
		                            </div>
		                            <div className="wrapLogin col-sm-12 col-md-8">
		                            	
		                            </div>
		                        </div>
		                    </div>
		                    <div className="bg-white pt-100 pb-50 no_mobile">
		                    	<div className="container">
				                    <div className="row">
			                        	<div className="col-sm-6 text-center">
			                        		<div className="form-group">
			                        			<img src={getImage('/static/assets/img/couple.jpg', userAgent)} className="img-responsive landing_image" alt="" />
		                        			</div>
			                        		<BtnMain text="Join us now for free" onClick={goToRegister} style={{padding: '20px 40px'}} className="fs-16" />
			                        	</div>
			                        	<div className="col-sm-6 landing_text_wrap">
			                        		<div className="fs-18 form-group">
			                        			<a href="#">Filipino Woman</a>
			                        		</div>
			                        		<div className="fs-16 landing_text" style={{lineHeight: 1.8}}>
			                        			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
												Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
												laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
			                        		</div>
			                        	</div>
			                        </div>
		                        </div>
	                        </div>
		                </div>
					</div>
				</div>
			</Layout>
		)
}

export default withRouter(Landing)
