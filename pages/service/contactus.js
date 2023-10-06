import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import PrivateLayout from '../../layouts/private'
import Head from 'next/head'

class Edit extends Component {
	constructor(props) {
        super(props);
        this.state = {
            subject: '',
            email: '',
            question: ''
        }
    }

    onSubjectChange(event) {
        this.setState({subject: event.target.value})
    }
    
      onEmailChange(event) {
        this.setState({email: event.target.value})
    }
    
      onQuestionChange(event) {
        this.setState({question: event.target.value})
    }

    handleSubmit( event ) {
        event.preventDefault()
        console.log(this.state)
    }

	render() {
		return (
			<Layout page="contact us" user_address={this.state.address}>
				<PrivateLayout>
                    <Head>
                        <title>PinaHeart.com</title>
                    </Head>
                    <div id="contactus">
                        <div className="form-group title fs-18 bold no_mobile">
                            Contact Us
                        </div>
                        <form id="contact-form" className="contact_form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                            <div className="row contact_item">
                                <div className="col-lg-3 contact_label">E-MAIL</div>
                                <div className="col-lg-9">
                                    <input type="email" name="email" id="email" className="form-control contact_input" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
                                </div>
                            </div>
                            <div className="row contact_item">
                                <div className="col-lg-3 contact_label">SUBJECT</div>
                                <div className="col-lg-9">
                                    <input type="subject" name="subject" id="subject" className="form-control contact_input" value={this.state.subject} onChange={this.onSubjectChange.bind(this)} />
                                </div>
                            </div>
                            <div className="row contact_item">
                                <div className="col-lg-3 contact_label">YOUR QUESTION</div>
                                <div className="col-lg-9">
                                    <textarea type="question" name="question" id="question" rows="10" className="form-control contact_input" value={this.state.question} onChange={this.onQuestionChange.bind(this)} ></textarea>
                                </div>
                            </div>
                            <div className="contact_button_wrap text-center">
                                <button type="submit" className="contact_btn btn-green">Submit</button>
                            </div>
                        </form>
                    </div>

                    <style jsx>{`
                        #contactus{
                            padding-top: 20px;
                            width: 40vw;
                            margin: 0 auto;
                        }
						.title {
							background-color: #F9F9F9;
							padding: 15px;
							border-radius: 9px;
                        }
                        .contact_form{
                            margin-top: 70px;
                        }
                        .contact_input{
                            border-radius: 9px;
                            height: 40px;
                            background: #FAF8F8;
                        }
                        .contact_input:focus{
                            box-shadow: 0 0 0 0 #fff;
                            border-color: #66afe9;
                            outline: 0;
                        }
                        .contact_label{
                            padding-top: 10px;
                        }
                        .contact_item{
                            margin-bottom: 20px;
                        }
                        #question{
                            height: 120px;
                        }
                        .contact_btn{
                            color: #fff;
                            padding: 14px;
                            min-width: 250px;
                            border-radius: 9px;
                            out-line: none;
                            border: 1px solid transparent;
                        }
                        .contact_button_wrap{
                            margin-top: 70px;
                        }
					`}
					</style>
				</PrivateLayout>
			</Layout >
		)
	}
}

const mapStateToProps = ({ user, ui }) => {
	return {
		userObj: user.data,
		account_status: user.data.account_status,
		user: user.params,
		token: user.token,
		options: ui.options.profile_params,
		location_options: ui.options.location_params,
		inValid: ui.inValid,
	}
}

export default connect(mapStateToProps)(Edit)
