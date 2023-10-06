import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MONTH } from '../../config'

class Info extends Component {

    getBirthday = date => `${date.day} ${MONTH[date.month - 1]}`

    getAge = date => {
        const [d,m,y] = date.split('/')
        const birthday = new Date(`${y}-${m}-${d}`)
        const ageDifMs = Date.now() - birthday.getTime()
        const ageDate = new Date(ageDifMs)
        return `${Math.abs(ageDate.getUTCFullYear() - 1970)} y.o.`
    }

    render() {
    	const { user } = this.props
        return (
            <div className="pt-15 mb-5">
            	<div className="row">
            		<div className="col-sm-6">
	            		<div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">From: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        {`${user.city}, ${user.state ? user.state + ', ' : ``}${user.country.country_name}`}
		                    </div>	                
	                    </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Seeking: </span>
		                    </div>
		                    <div className="col-xs-7">
	                        	{`${user.role === 'client' ? 'woman' : 'man'} from ${user.match.from} to ${user.match.to}`}
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Birthdate: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        {this.getBirthday(user.birth)}
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Star sign: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        {user.zodiac.replace(/^\w/, c => c.toUpperCase())}
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Height: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        {`${user.height.cm} cm / ${user.height.inch}`}
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Weight: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        {`${user.weight.kg} kg / ${user.weight.lbs} lbs`}
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Body style: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        {user.body_style.value || 'N/A'}
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Eye color: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        {user.eyes.value}
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Eyewear: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        {user.eye_wear.value || 'N/A'}
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Hair Color: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        {user.hair_color.value}
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Hair Length: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        {user.hair_length.value}
		                    </div>
		                </div>
		                {
		                    user.role === 'client'
		                    &&   <div className="row">
		                            <div className="col-xs-5">
		                                <span className="font-bebas fs-18">Ethnicity: </span>
		                            </div>
		                            <div className="col-xs-7">
		                                {user.ethnicity.value || 'N/A'}
		                            </div>
		                        </div>
		                }
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Religion: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        {user.religion.value}
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Marital Status: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        {user.marital_status.value}
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Children: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        <div>{user.children.value}</div>
		                    </div>
		                </div>
		                {
		                    user.about_children.length
		                    ?  <div className="row">
		                            <div className="col-xs-5">
		                                <span className="font-bebas fs-18">About Children: </span>
		                            </div>
		                            <div className="col-xs-7">
		                                {user.about_children.map((item, i) => <div key={i}><span className="text-capitalize">{item.sex}</span> - {this.getAge(item.birth)}</div>)}
		                            </div>
		                        </div>
	                        : 	null
		                }
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Want children: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        {user.want_children.value}
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Education: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        {user.education.value}
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Field of work: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        {user.field_of_work.value || 'N/A'}
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Employment Status: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        {user.employment_status.value || 'N/A'}
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Smoke: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        {user.smoke.value}
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-xs-5">
		                        <span className="font-bebas fs-18">Drink: </span>
		                    </div>
		                    <div className="col-xs-7">
		                        {user.drink.value}
		                    </div>
		                </div>
		                {
		                	user.languages.length
		                	? 	<div className="row">
				                    <div className="col-xs-5">
				                        <span className="font-bebas fs-18">Languages: </span>
				                    </div>
				                    <div className="col-xs-7">
				                        {user.languages.map((item, i) => <div key={i}>{item.name} - {item.level_value}</div>)}
				                    </div>
				                </div>
		                	: 	null 
		                }
	                </div>
	                <div className="col-sm-6">
                        <h4 className="text-dark-blue"><strong>Interests</strong></h4>
                         {user.interests_value && user.interests_value.length ? user.interests_value.join(', ') : null}
                        <h4 className="text-dark-blue"><strong>More about me</strong></h4>
                        {user.about_me}
                        <h4 className="text-dark-blue"><strong>The one I would like to meet</strong></h4>
                        {user.like_to_meet}
                        {
                            user.role === 'girl'
                            ?   <div>
                                    <h4 className="text-dark-blue"><strong>More about my leisure time</strong></h4>
                                    {user.leisure_time}
                                    <h4 className="text-dark-blue"><strong>About my family</strong></h4>
                                    {user.about_family}
                                    <h4 className="text-dark-blue"><strong>My Future Goals</strong></h4>
                                    {user.future_goals}
                                </div>
                            :   null
                        }
	                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({user: state.user.data})

export default connect(mapStateToProps)(Info)