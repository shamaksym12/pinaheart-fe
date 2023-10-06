import React, { Component } from 'react'
import Head from 'next/head'
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion'
import TextField from '../../components/inputs/text_field'

class Questions extends Component {
    constructor() {
		super()
        this.list = [
                {
                    'question': 'How does the company work?', 
                    'answer': 'First of all we were created for YOU and YOUR LADY with the aim to join your hearts. We make an agreement with each of our clients. We check our clients. We offer a personal free consultation, we pay attention to your expectations and needs.'
                },{
                    'question': 'How much does it cost me to be the member?',
                    'answer': 'Please, Register for Free and go to Services-Payments to check on Prices.'
                },{
                    'question': 'Do I have to buy full membership to be able to use the company?',
                    'answer': 'No, you can use the services without a full membership. However different types of Membership give you a lot of privileges and discounts. You can check all the Membership packages on Prices.'
                },{
                    'question': 'How can I trust the company?',
                    'answer': 'Honesty is the main peculiarity of our work. No one here neither demand nor persuade that you give your personal data. All the details of payments are in the agreement that we sign before starting our work.'
                },{
                    'question': 'How can I be sure to get a high level of professional service?',
                    'answer': 'We are interested in satisfying all of our members. Our aim is to help people to find their happiness. It is in our priority and this is the main target to provide all kind of the highest quality service'
                },{
                    'question': 'Who applies to the company?',
                    'answer': 'Our company is ideal for all singles searching for their real life partners. It is ideal for singles who are either too busy to search for dates or do not know where to meet quality singles. We provide a wonderful solution for many singles to find a person of their dreams.'
                },{
                    'question': 'Why should I search for a Ukrainian lady?',
                    'answer': 'Our ladies are honest, family-oriented, loving, active, attractive women who are motivated to find a partner, and ready to follow their real love. They are sincere, caring, educated and most of them really love cooking. Ukrainian ladies know how to turn one’s house into a real sweet home and how to make a man happy.' 
                },{
                    'question': 'Which regions do you work with?',
                    'answer': 'Our ladies are the representative of all the parts of our hospitable Ukrainian land.'
                },{
                    'question': 'Do all the ladies speak foreign language?',
                    'answer': 'We motivate our ladies to learn the languages in order to be more successful in the communication with their possible life partner here. But from the very beginning the ladies get the help from our translators for free.'
                },{
                    'question': 'Are the ladies honest?',
                    'answer': 'We strongly appreciate every person who decided to apply to us. We make all possible to check the information  of the members to make the communication real and secure.'
                },{
                    'question': 'Are there some guarantees that we will get married?',
                    'answer': 'We provide all the necessary services and consultations to help you to talk and to meet the lady you would like but no one can predict the future. All is in your hands and we are here to help you understand if really met a lady of your dreams.'
                },{
                    'question': 'Have more questions?',
                    'answer': 'Apply to our support team to get an answer to any questions you may have.'
                }, {
                    'question': 'How can I delete my profile?',
                    'answer': 'To delete your profile, you need to write the request to Support Service using the Send Request form on the site.'
                }
            ]
		this.state = {
            list: this.list
        }
	}

	handleSearch = val => {
        this.setState({list: this.list.filter(item => item.question.toLowerCase().indexOf(val.toLowerCase()) + 1)})
    }

	printAccordion = (item, i) => {
        return  <AccordionItem key={i}>
                    <AccordionItemTitle>
                        <div className="u-position-relative">{item.question}
                            <div className="accordion__arrow" role="presentation"></div>
                        </div>
                    </AccordionItemTitle>
                    <AccordionItemBody>
                        <p>{item.answer}</p>
                    </AccordionItemBody>
                </AccordionItem>
    }

    render() {
        return (
        	<div>
                <Head>
                    <link rel="stylesheet" href="https://d2etktq4v0899q.cloudfront.net/static/assets/css/accordion.min.css"/>
                </Head>
	        	<div className="form-group">
	                <TextField
	                    placeholder="Search"
	                    onChange={this.handleSearch}
	                    inputRef={ref => { this.search = ref }} />
	            </div>
	           	<Accordion>{ this.state.list.map((item, i) => this.printAccordion(item, i)) }</Accordion>
            </div> 
        )
    }
}

export default Questions