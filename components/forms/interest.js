import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, FormGroup } from 'react-bootstrap'
import Validator from '../../validate'
import BtnMain from '../buttons/btn_main'
import Textarea from '../inputs/textarea'
import { updateUser } from '../../actions/user'

export class InterestForm extends Component {
	constructor() {
		super()
		this.user = {}
	}

	save = () => {
		let error = 1
		const { dispatch, role } = this.props

        if (role === 'girl') {
            error *= Validator.check(this.user.about_me.value, ['required'], 'About Me')
            error *= Validator.check(this.user.like_to_meet.value, ['required'], 'The one I would like to meet')
            error *= Validator.check(this.user.about_family.value, ['required'], 'About my family')
            error *= Validator.check(this.user.leisure_time.value, ['required'], 'More about my Leisure time')
            error *= Validator.check(this.user.future_goals.value, ['required'], 'My future goals')
        }

        if (error) {
            let data = {
                like_to_meet: this.user.like_to_meet.value,
                about_me: this.user.about_me.value
            }
            if (role === 'girl') {
                data.about_family = this.user.about_family.value
                data.leisure_time = this.user.leisure_time.value
                data.future_goals = this.user.future_goals.value
            }
            dispatch(updateUser(data))
        }
	}

    render() {
    	const { 
            entertainment,
            food,
            music,
            sports
		} = this.props

        return (
            <div>
    			<Row>
    				<Col sm={12}>
    					<FormGroup>
                            <Textarea
                                inputRef={ref => { this.user.entertainment = ref }}
                                value={entertainment}
                                placeholder="What do you do for fun / entertainment?"
                                label={true} />
                        </FormGroup>
                        <FormGroup>
                            <Textarea
                                inputRef={ref => { this.user.food = ref }}
                                value={food}
                                placeholder="What sort of food do you like?"
                                label={true} />
                        </FormGroup>
                        <FormGroup>
                            <Textarea
                                inputRef={ref => { this.user.music = ref }}
                                value={music}
                                placeholder="What sort of music are you into?"
                                label={true} />
                        </FormGroup>
                        <FormGroup>
                            <Textarea
                                inputRef={ref => { this.user.sports = ref }}
                                value={sports}
                                placeholder="What sports do you play or like to watch?"
                                label={true} />
                        </FormGroup>
    				</Col>
				</Row>
				<FormGroup className="text-right">
                    <BtnMain
                        bsStyle="success"
                        text="Save"
                        onClick={this.save} />
                </FormGroup>
			</div>
        )
    }
}

const mapStateToProps = ({user}) =>
	({
        entertainment: user.data.entertainment,
        food: user.data.food,
        music: user.data.music,
        sports: user.data.sports,
	})

export default connect(mapStateToProps)(InterestForm)