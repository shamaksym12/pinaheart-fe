import React, { Component } from 'react'
import Head from 'next/head'
import Layout from '../../layouts/blogs'
import { connect } from 'react-redux'
import { sendComment } from '../../actions/ui'
import { FormGroup, Col, Row } from 'react-bootstrap'
import TextField from '../../components/inputs/text_field.js'
import BtnMain from '../../components/buttons/btn_main.js'
import Textarea from '../../components/inputs/textarea.js'
import Validator from '../../validate'
import { API_URL } from '../../config'
import { makeCDN } from '../../utils'

class Blog extends Component {
	static async getInitialProps(app) {
        const res = await fetch(`${API_URL}/blog/${app.query.slug}`)
        const json = await res.json()
        return {blog: json.data}
  	}

  	printComments = (comment, i) => {
		return 	<div key={i} className="commentWrap">
					<div>
						<strong className="text-uppercase">{comment.name}</strong>
					</div>
					<div>{ comment.comment }</div>
					<div className="text-right">
						<span className="small-italic"><i>{comment.date}</i></span>
					</div>
				</div>
	}

  	setComment = () => {
        const { dispatch, id } = this.props
        let error = 1
        error *= Validator.check(this.name.value, ['required'], 'Name')
        error *= Validator.check(this.comment.value, ['required'], 'Comment')
        if (error) {
            const data = {
                name: this.name.value,
                comment: this.comment.value,
                post_id: this.props.id
            }
            dispatch(sendComment(data, id))
        }
  	}

    printMetas = (item, i) => <meta key={i} name={item.name} content={item.content} />

	render() {
		const { blog } = this.props
		let html = ''
        if (blog.post) {
            html = blog.post.replace(/&nbsp;/g, ' ')
        }
		return (
			<Layout>
                <Head>
                    <title>{blog.title}</title>
                    { blog.metas && blog.metas.length ? blog.metas.map((item, i) => this.printMetas(item, i)) : null }
                    <meta property="og:image" content={blog.image} />
                </Head>
                <h1 className="font-bebas">Blog</h1>
                <hr />
				<div>
                    <FormGroup>
                        <h2>{blog.title}</h2>
                    </FormGroup>
                    <FormGroup>
                        <img className="img-responsive" src={makeCDN(blog.image)} alt="" />
                        <hr />
                    </FormGroup>
                    <FormGroup>
                        <div dangerouslySetInnerHTML={{__html: html}} />
                    </FormGroup>
                    <hr />
                    <div>
                        <p className="blog-comments-title">Comments:</p>
                    </div>
                    <div>
                        { blog.comments.map((comment, i) => this.printComments(comment, i)) }
                    </div>
                    <Row className="pt-15">
                        <Col sm={6} smOffset={6}>
                            <FormGroup>
                                <TextField
                                    placeholder="First Name"
                                    inputRef={ref => { this.name = ref }}
                                    name="Name" />
                            </FormGroup>
                            <FormGroup>
                                <Textarea
                                    inputRef={ref => { this.comment = ref }}
                                    placeholder="Comment" />
                            </FormGroup>
                            <FormGroup className="text-right">
                                <BtnMain
                                    bsStyle="success"
                                    text="Comment"
                                    onClick={this.setComment} />
                            </FormGroup>
                        </Col>
                    </Row>
                </div>
			</Layout>
		)
	}
}

export default connect()(Blog)