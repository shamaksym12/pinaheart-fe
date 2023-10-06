import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, FormGroup } from 'react-bootstrap'
import { getNumArray, getArray } from '../../utils'
import { getOptions, setAlert } from '../../actions/ui'
import SelectField from '../inputs/select_field'
import BtnMain from '../buttons/btn_main'
import { getSearch, getPublicSearch } from '../../actions/members'

class SearchForm extends Component {
    constructor() {
        super()
        this.search = {
        	match: {}
        }
    }

    getSearch = () => {
    	const { dispatch, publicPage = false } = this.props
    	if (this.search.match.from.value > this.search.match.to.value && this.search.match.to.value > 0) {
            dispatch(setAlert('Match is incorrect', 'error'))
            return
        }
        const data = {
            from: this.search.match.from.value,
            to: this.search.match.to.value ? (this.search.match.to.value * 1) + 1 : this.search.match.to.value,
            eyes_id: this.search.eyes.value,
            children: this.search.children.value,
            hair_color_id: this.search.hair_color.value
        }
        if (publicPage) {
            dispatch(getPublicSearch(data))
        } else {
            dispatch(getSearch(data))
        }
    }

    componentDidMount() {
        const { dispatch } = this.props
    }

    render() {
    	const { eyes_colors, hair_colors } = this.props
        return (
            <Row>
                <Col sm={6}>
                    <Row>
                        <Col sm={2}>
                            <FormGroup className="p-7-4">
                                <span>Match</span>
                            </FormGroup>
                        </Col>
                        <Col sm={5}>
                            <FormGroup>
                                <SelectField
                                    inputRef={ref => { this.search.match.from = ref }}
                                    options={getNumArray('from', 18, 99)}
                                    value={''} />
                            </FormGroup>
                        </Col>
                        <Col sm={5}>
                            <FormGroup>
                                <SelectField
                                    inputRef={ref => { this.search.match.to = ref }}
                                    options={getNumArray('to', 99, 18)}
                                    value={''} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <SelectField
                            inputRef={ref => { this.search.children = ref }}
                            options={[{ 'value': '', 'name': 'Children' }, { 'value': '1', 'name': 'Yes' }, { 'value': '0', 'name': 'No' }]}
                            value={''} />
                    </FormGroup>
                </Col>
                <Col sm={6}>
                    <FormGroup>
                        <SelectField
                            inputRef={ref => { this.search.eyes = ref }}
                            options={getArray(eyes_colors, 'Eye Color')}
                            value={''} />
                    </FormGroup>
                    <FormGroup>
                        <SelectField
                            inputRef={ref => { this.search.hair_color = ref }}
                            options={getArray(hair_colors, 'Hair Color')}
                            value={''} />
                    </FormGroup>
                </Col>
                <Col sm={12}>
                    <FormGroup className="text-right">
                        <BtnMain
                            bsStyle="success"
                            text="Search"
                            onClick={this.getSearch} />
                    </FormGroup>
                </Col>
            </Row>
        );
    }
}
const mapStateToProps = state =>
    ({
    	eyes_colors: state.options.eyes,
		hair_colors: state.options.hair_colors,
    })

export default connect(mapStateToProps)(SearchForm)