import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, FormGroup } from 'react-bootstrap'
import Validator from '../../validate'
import BtnMain from '../buttons/btn_main'
import Textarea from '../inputs/textarea'
import { updateUser } from '../../actions/user'

export class PersonalityForm extends Component {
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
            personality,
            traveled,
            romantic,
            humor,
            person,
            dress,
        } = this.props

        return (
            <div>
                <Row>
                    <Col sm={12}>
                        <FormGroup>
                            <Textarea
                                inputRef={ref => { this.user.personality = ref }}
                                value={personality}
                                placeholder="How would you describe your personality?"
                                label={true} />
                        </FormGroup>
                        <FormGroup>
                            <Textarea
                                inputRef={ref => { this.user.traveled = ref }}
                                value={traveled}
                                placeholder="Where have you traveled or would like to travel to?"
                                label={true} />
                        </FormGroup>
                        <FormGroup>
                            <Textarea
                                inputRef={ref => { this.user.romantic = ref }}
                                value={romantic}
                                placeholder="How would you spend a perfect romantic weekend?"
                                label={true} />
                        </FormGroup>
                        <FormGroup>
                            <Textarea
                                inputRef={ref => { this.user.humor = ref }}
                                value={humor}
                                placeholder="How would you describe your sense of humor?"
                                label={true} />
                        </FormGroup>
                        <FormGroup>
                            <Textarea
                                inputRef={ref => { this.user.person = ref }}
                                value={person}
                                placeholder="What sort of person would be your perfect match?"
                                label={true} />
                        </FormGroup>
                        <FormGroup>
                            <Textarea
                                inputRef={ref => { this.user.dress = ref }}
                                value={dress}
                                placeholder="How would you describe your dress sense and physical appearance?"
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
        personality: user.data.personality,
        traveled: user.data.traveled,
        romantic: user.data.romantic,
        humor: user.data.humor,
        person: user.data.person,
        dress: user.data.dress,
    })

export default connect(mapStateToProps)(PersonalityForm)