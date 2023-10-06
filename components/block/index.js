import React, { Component } from 'react'

class Block extends Component {
	constructor(props) {
		super(props)
		this.state = {
			active: props.active
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.active !== this.state.active) {
			this.setState({active: nextProps.active})
		}
	}

	toggleState = () => {
		this.setState({active: !this.state.active}, () => {
			this.props.onChange(this.props.value, this.state.active)
		})
	}

    render() {
    	const { text } = this.props
        return (
            <div className={`block title ${this.state.active ? 'active' : ''}`} onClick={this.toggleState}>
                {text}
            </div>
        )
    }
}

export default Block