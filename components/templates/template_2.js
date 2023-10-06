import React, { Component } from 'react'
import { makeCDN } from '../../utils'

class TemplateTwo extends Component {

	render() {
		const { texts, files } = this.props
		const imageStyle = {
			backgroundImage: `url('${makeCDN(files[0])}')`,
			width: '100%',
		    height: '100%',
		    position: 'relative',
		    overflow: 'hidden',
		    backgroundSize: 'contain',
		    backgroundRepeat: 'no-repeat',
		    backgroundPosition: '50%',
		}
		return (
			<div className="pt-50">
				<div className="row form-group">
					<div className="col-md-7 col-sm-6 px-50">
						<div className="story-list-header form-group">
							<h1>{ texts[0] }</h1>
						</div>
						<pre style={{lineHeight: 1.9, overflow: 'hidden'}}>{ texts[1] }</pre>
					</div>
					<div className="col-md-5 col-sm-6 px-50">
						<div style={imageStyle}>
							<img src={makeCDN(files[0])} style={{opacity: 0, width: '100%'}} />
						</div>
					</div>
				</div>
				<div className="row mb-50">
					<div className="col-md-7 col-sm-6">
						<div className="divider-story"></div>
					</div>
				</div>
				<div className="row mb-50">
					<div className="col-sm-7 px-50 hidden-xs">
						<div style={{...imageStyle, backgroundImage: `url('${makeCDN(files[1])}')`}}>
							<img src={makeCDN(files[1])} style={{opacity: 0, width: '100%'}} />
						</div>
					</div>
					<div className="col-sm-5 px-50">
						<pre style={{lineHeight: 1.9, overflow: 'hidden'}}>{ texts[2] }</pre>
					</div>
					<div className="col-sm-7 px-50 visible-xs-block">
						<div style={{...imageStyle, backgroundImage: `url('${makeCDN(files[1])}')`}}>
							<img src={makeCDN(files[1])} style={{opacity: 0, width: '100%'}} />
						</div>
					</div>
				</div>
				<div className="row form-group">
					<div className="col-sm-12 px-50">
						<pre style={{lineHeight: 1.9, overflow: 'hidden'}}>{ texts[3] }</pre>
					</div>
				</div>
			</div>
		)
	}
}

export default TemplateTwo