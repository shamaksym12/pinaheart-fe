import React, { Component } from 'react'
import Layout from '../../layouts/blogs'
import { getBlogs } from '../../actions/ui'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { Router } from '../../routes'
import Pagination from '../../components/pagination'
import { makeCDN } from '../../utils'

class Blog extends Component {

	goToBlog = id => e => {
		e.preventDefault()
		Router.pushRoute(`/blogs/${id}`)
	}

	printBlogs = (blog, i) => {
		return 	<a href={`/blogs/${blog.id}`} key={i} className="unset-a" onClick={this.goToBlog(blog.id)}>
					<div className="blogPreviewWrap">
						<Row>
			        		<Col sm={6}>
			        			<div className="imgWrap">
			        				<img src={makeCDN(blog.image)} className="img-responsive" alt="" />
			        			</div>
			        		</Col>
			        		<Col sm={6}>
			        			<div className="blogPreviewTitle">
			        				<h3>{blog.title}</h3>
			        			</div>
			        			<div>
			        				{blog.description}
			                        <br />
			                        <br />
			        			</div>
			        		</Col>
			        	</Row>
			        	<div className="date">
							{blog.created_at}
						</div>
					</div>
				</a>
	}

	changePage = page => e => {
		const { dispatch } = this.props
		dispatch(getBlogs(`?page=${page}`))
	}

	componentDidMount() {
		const { dispatch } = this.props
		dispatch(getBlogs())
	}

	render() {
		const { list, current_page, total } = this.props.blogs
		return (
			<Layout>
        		<h1 className="font-bebas">Blog</h1>
                <hr />
				{ list.map((blog, i) => this.printBlogs(blog, i)) }
				<Pagination onClick={this.changePage} total={total} current={current_page} />
			</Layout>
		)
	}
}

const mapStateToProps = ({ui: {blogs}}) => ({blogs})

export default connect(mapStateToProps)(Blog)