import React, { Component } from 'react'

class OnlineDot extends Component {
    render() {
    	const { active } = this.props
    	const activeClass = active ? 'online' : 'offline'
        return (
           <div className={`online-dot ${activeClass}`}><span>{activeClass}</span></div>
        )
    }
}

export default OnlineDot