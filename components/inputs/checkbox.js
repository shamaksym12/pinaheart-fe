import React, { Component } from 'react'

class CheckBox extends Component {
	onChange = ({target: {checked}}) => {
		this.props.onChange(checked)
	}

    render() {
        const { value, inputRef, onChange = () => {}, title, disabled = false } = this.props
        return (
            <label className="checkbox custom">
                <input type="checkbox" disabled={disabled} checked={value} onChange={this.onChange} ref={inputRef} />
                <div className={`checkbox__text ${disabled ? `disabled` : ``}`}></div>
                <div className="checkbox-title">{title}</div>
            </label>
        );
    }
}

export default CheckBox