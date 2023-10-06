import React, { Component } from 'react'

class SelectField extends Component {
    constructor(props) {
        super(props)
        this.state = { value: props.value || '' }
    }

    printOptions = (option, i) => {
        const disabled = !!option.disabled
        return <option key={i} id={option.id} disabled={disabled} value={option.id}>{option.name}</option>
    }

    handleChange = ({ target: { value } }) => {
        this.setState({ value })

        if (this.props.onChange) {
            this.props.onChange(value)
        }
    }

    componentWillReceiveProps(nextProps) {
        const value = nextProps.value ? nextProps.value : ''
        if (value !== this.state.value && value !== this.props.value) {
            this.setState({ value: value })
        }
    }

    render() {
        const { label, placeholder, inputRef, value, options, style = {}, check } = this.props
        return (
            <div className={`wrap-select-field ${check ? 'success' : ''}`}>
                {this.props.label ? <label>{this.props.label}</label> : ''}
                <select
                    style={style}
                    className="select-field form-control"
                    ref={inputRef}
                    value={this.state.value}
                    onChange={this.handleChange} >
                    {options.map((option, i) => this.printOptions(option, i))}
                </select>
                <style jsx>{`
                    .wrap-select-field.success {
                        border-color: #98D538;
                    }
                `}
                </style>
            </div>
        );
    }
}

export default SelectField