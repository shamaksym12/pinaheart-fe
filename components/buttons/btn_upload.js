import React, { Component } from 'react'
import BtnMain from './btn_main'

class BtnUpload extends Component {

    openUpload = () => {
    	this.uploadField.click()
    }

    onChange = ({target: {files}}) => {
        if (files) {
        	this.props.onChange(files)
        }
    }

    render() {
    	const { text, multiple = false, className = '' } = this.props
        return (
        	<div className={`fileUploader ${className}`}>
        		<input 
        			type="file"
        			ref={ref => this.uploadField = ref}
        			multiple={multiple}
        			onChange={this.onChange}
        			className="hidden" />
	            <BtnMain
	            	text={text}
	            	onClick={this.openUpload} />
        	</div>
        );
    }
}

export default BtnUpload