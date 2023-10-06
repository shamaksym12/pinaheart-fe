import React, { Component } from 'react'
import { FormControl } from 'react-bootstrap'

class TextField extends Component {
    constructor(props) {
        super(props)
        this.input = null
        this.state = {value: props.value, active: false}
    }

    thisRef = ref => {
        this.props.inputRef(ref);
        this.input = ref
    };

    handleChange = ({target: {value}}) => {
        this.setState({value, active: true});
        if (this.props.onChange) {
           this.props.onChange(value)
        }
    };

    handleBlur = () => {
        if (!this.state.value) {
            this.setState({active: false})
        }
    }

    componentDidMount() {
        if (this.props.value && !this.state.active) {
            this.setState({active: true})
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value && !this.state.active) {
            this.setState({active: true})
        }
    }

    focus = () => {
        this.input.focus()
    }

	render() {
		const { label, placeholder, type = 'text', thisRef, className, value, description, name, disabled,labelClassName } = this.props
		return (
			<div className="text-field-wrap">
                {label ? <label className={labelClassName}>{label}</label> : null}
                <input
                    type={type}
                    disabled={disabled}
                    ref={this.thisRef}
                    name={name}
                    onBlur={this.handleBlur}
                    className={`text-field form-control  ${className}`}
                    onChange={this.handleChange}
                    defaultValue={value} />
            </div>
		)
	}
}

export default TextField