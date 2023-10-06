import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts/stories'
import { getStory } from '../../actions/ui'
import { makeCDN } from '../../utils'
import Loader from '../../components/loader'
import loadable from '@loadable/component'

const TemplateZero = loadable(() => import('../../components/templates/template_0'))
const TemplateOne = loadable(() => import('../../components/templates/template_1'))
const TemplateTwo = loadable(() => import('../../components/templates/template_2'))
const TemplateThree = loadable(() => import('../../components/templates/template_3'))

class Story extends Component {
	static async getInitialProps({query}) {
		return {id: query.slug}
	}

	getTemplate = story => {
		switch (story.template) {
			case 0:
				return <TemplateZero {...story} />
			case 1: 
				return <TemplateOne {...story} />
			case 2:
				return <TemplateTwo {...story} />
			case 3:
				return <TemplateThree {...story} />
			default:
				return null
		}
	}

	componentDidMount() {
		const { dispatch, id } = this.props
		dispatch(getStory(id))
	}

	render() {
		const { story } = this.props
		return (
			<Layout>
				{
					Object.keys(story).length && this.props.id*1 === story.id
					? 	this.getTemplate(story)
					: 	<Loader />
				}
			</Layout>
		)
	}
}

const mapStateToProps = ({ui: {story}}) => ({story})

export default connect(mapStateToProps)(Story)