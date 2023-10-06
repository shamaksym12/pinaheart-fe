import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Grid, Col, FormGroup } from 'react-bootstrap'
import Layout from './index'
import SmallDivider from '../components/list/small_divider'
import BtnMain from '../components/buttons/btn_main'
import { getPopularBlogs, setUiKey } from '../actions/ui'
import { Router } from '../routes'

class Blog extends Component {

	goToRegistration = () => {
		const { dispatch } = this.props
		dispatch(setUiKey('showRegistration', true))
		Router.pushRoute('/')
		window.scrollTo(0,0)
	}

	goToBlog = id => e => {
		Router.pushRoute(`/blogs/${id}`)
	}

	printBlogs = (item, i) => {
		return	<FormGroup key={i}>
					<div className="popular-blog-wrap" onClick={this.goToBlog(item.id)}>
						<Row>
							<Col xs={1}>
								<span className="popular-blog-title">
									<span className="popular-blog-num">#{i+1}:&nbsp;</span>
								</span>
							</Col>
							<Col xs={10}>
								<span className="popular-blog-title">{item.title}</span>
								<div>
									<span>{item.views} views</span>
									<span className="pull-right">{item.comments} comments</span>
								</div>
							</Col>
						</Row>
					</div>
				</FormGroup>
	}

	componentDidMount() {
		const { dispatch } = this.props
		dispatch(getPopularBlogs())
	}

	render() {
		const { children, popularBlogs, token } = this.props
		return (
			<Layout>
				<div className="pt-100">
		            <Grid>
		            	<div className="bg-white p-15">
		            		<Row>
			            		<Col sm={9}>
				            		{ children }
		                    	</Col>
		                    	<Col sm={3}>
		                    		<FormGroup>
			                            <img src="https://d2etktq4v0899q.cloudfront.net/static/assets/img/banner.jpg" className="img-responsive" alt="" />
			                        </FormGroup>
		                    		{
		                    			!token && 	<FormGroup className="text-center">
									                	<BtnMain
									                        bsStyle="success"
									                        text="Sign Up"
									                        onClick={this.goToRegistration} />
									                </FormGroup>
		                    		}
					                <FormGroup>
										<SmallDivider text="Popular Blogs" />
									</FormGroup>
									{popularBlogs.map((item, i) => this.printBlogs(item, i))}
		                    	</Col>
	                    	</Row>
		                </div>
		            </Grid>
	            </div>
            </Layout>
		)
	}
}

const mapStateToProps = state =>
    ({
        popularBlogs: state.ui.popularBlogs,
        token: state.user.token,
    })

export default connect(mapStateToProps)(Blog)