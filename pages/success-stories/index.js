import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import Layout from '../../layouts/stories'
import { getStories } from '../../actions/ui'
import BtnMain from '../../components/buttons/btn_main'
import { Router } from '../../routes'
import { makeCDN } from '../../utils'

class SuccessStories extends Component {

	componentDidMount() {
		const { dispatch } = this.props
		dispatch(getStories())
	}

	goToStory = id => () => {
		Router.pushRoute(`/success-stories/${id}`)
	}

	getText = (text = '') => text.length > 250 ? text.slice(0, 250) + '...' : text

	printStories = (item, i) => {
		return 	<Col key={i} xs={12} md={4}>
					<div className="form-group story-list-item">
						<div className="story-list-img-wrap">
							<img src={makeCDN(item.files[0])} onClick={this.goToStory(item.id)} className="img-responsive story-list-img pointer" alt="" />
						</div>
						<div className="story-list-names">{item.texts[0]}</div>
						<div className="story-list-story">{this.getText(item.texts[1])}</div>
						<div className="text-center">
							<BtnMain text="See More" bsStyle="outline" onClick={this.goToStory(item.id)} />
						</div>
					</div>
				</Col>
	}

	render() {
		const { stories } = this.props
		return (
			<Layout>
				<div className="story-list-header">
					<h1>Success Stories</h1>
				</div>
                <p>Note: <span className="small-italic">We are glad to share great successful love stories with you, although most of couples prefer to keep Happiness in Silence. With that we post only some of those couples who gave us personal permission.</span></p>
                <hr />
            	<Row>
                   { stories.map((item, i) => this.printStories(item, i)) }                   
                </Row>
        	</Layout>
		)
	}
}

const mapStateToProps = ({ui: {stories}}) => ({stories})

export default connect(mapStateToProps)(SuccessStories)