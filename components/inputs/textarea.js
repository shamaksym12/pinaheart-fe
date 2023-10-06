import React, { Component } from 'react'
import { FormControl } from 'react-bootstrap'

class Textarea extends Component {
	constructor(props) {
        super(props)
        this.input = null
        this.state = {value: props.value, active: false}
    }

	thisRef = ref => {
        this.props.inputRef(ref)
        this.input = ref
    }

    handleBlur = () => {
        if (!this.state.value) {
            this.setState({active: false})
        }
    }

    handleChange = ({target: {value}}) => {
        const { counter } = this.props
        if (value.length > counter) {
            value = value.slice(0, counter)
        }
        this.setState({value, active: true})
        if (this.props.onChange) {
           this.props.onChange(value)
        }
    }

    componentWillReceiveProps(nextProps) {
        const value = nextProps.value ? nextProps.value : ''
        if (value !== this.state.value) {
            this.setState({value: value})
        }
    }

    focus = () => {
        this.input.focus()
    }

	render() {
		const { value = '', placeholder, label, className, counter = false, id = '' } = this.props
		return (
			<div className="textarea-wrap">
                {label ? <label>{placeholder}</label> : null}
                <textarea
                    id={id} 
                    ref={this.thisRef}
                    className="textarea-main form-control"
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    value={this.state.value}>
                </textarea>
                {label ? null : <span className={`textarea-placeholder ${this.state.active ? 'active' : ''}`} onClick={this.focus}>{placeholder}</span>}
                { counter && <span className={`textarea-counter ${this.state.value.length === counter ? `danger` : ``}`}>{this.state.value.length} / {counter}</span> }
            </div>
		)
	}
}

export default Textarea