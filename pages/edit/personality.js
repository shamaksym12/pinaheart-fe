import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import PrivateLayout from '../../layouts/private'
import ProfileLayout from '../../layouts/profile'
import BtnMain from '../../components/buttons/btn_main'
import InputInline from '../../components/inputs/InputInline'
import { getPersonality, savePersonality, setUserParams } from '../../actions/user'
import { Router } from '../../routes'
import Head from 'next/head'

class Edit extends Component {
    save = (device) => {
        const { dispatch } = this.props
        const data = {
            desc: this.props.user.desc,
            travel: this.props.user.travel,
            weekend: this.props.user.weekend,
            humor: this.props.user.humor,
            person: this.props.user.person,
            dress: this.props.user.dress,
        }
        dispatch(savePersonality(data)).then(success => {
            if (success) {
                setTimeout(() => {
                    if (device == 'desktop') Router.pushRoute('/')
                    else if (device == 'mobile') Router.pushRoute('/matches')
                }, 2000)
            }
        })
    }
    handleChange = (field, value) => {
        const { dispatch } = this.props
        dispatch(setUserParams({[field]: value}))
    }
    goToProfile = () => {
        Router.pushRoute('/profile')
    }
    componentDidMount() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        const { dispatch } = this.props
        dispatch(getPersonality())
    }
    render() {
        const { user } = this.props
        return (
            <Layout page="edit_personality">
            	<PrivateLayout>
                    <ProfileLayout page="personality">
                        <Head>
                            <title>PinaHeart.com</title>
                        </Head>
                        <div className="fs-18 title form-group edit_personality_wrap">Edit Personality Profile</div>
                        <div className="row form-group">
                            <div className="col-sm-8">
                                <div className="text-green text-justify">
                                    Let your personality shine. Express yourself in your own words to give other users a better understanding of who you are.
                                </div>
                            </div>
                            <div className="col-sm-4 text-center p-15 no_mobile">
                                <BtnMain text="View my profile" className="btn-outline" onClick={this.goToProfile} />
                            </div>
                        </div>
                        <div className="row form-group edit_personality_wrap_footer">
                            <div className="col-sm-8">
                                <InputInline
                                    field="desc"
                                    onChange={this.handleChange}
                                    label="How would you describe your personality?"
                                    value={user.desc}
                                    type="textarea" />
                                <InputInline
                                    field="travel"
                                    value={user.travel}
                                    onChange={this.handleChange}
                                    label="Where have you traveled or would like to travel to?"
                                    type="textarea" />
                                <InputInline
                                    field="weekend"
                                    value={user.weekend}
                                    onChange={this.handleChange}
                                    label="How would you spend a perfect romantic weekend?"
                                    type="textarea" />
                                <InputInline
                                    field="humor"
                                    value={user.humor}
                                    onChange={this.handleChange}
                                    label="How would you describe your sense of humor?"
                                    type="textarea" />
                                <InputInline
                                    field="person"
                                    value={user.person}
                                    onChange={this.handleChange}
                                    label="What sort of person would be your perfect match?"
                                    type="textarea" />
                                <InputInline
                                    field="dress"
                                    value={user.dress}
                                    onChange={this.handleChange}
                                    label="How would you describe your dress sense and physical appearence?"
                                    type="textarea" />
                                <div className="text-center submit_btn_wrap no_mobile">
                                    <BtnMain text="Submit" className="btn-green" onClick={() => this.save('desktop')} />
                                </div>
                                <div className="text-center submit_btn_wrap only_mobile">
                                    <BtnMain text="Submit" className="btn-green" onClick={() => this.save('mobile')} />
                                </div>
                            </div>
                        </div>
                        <style jsx>{`
                            .title {
                                background-color: #F9F9F9;
                                padding: 15px;
                                border-radius: 9px;
                            }
                            .text-green {
                                color: #98D538;
                                padding: 15px 0px;
                            }
                        `}
                        </style>
                    </ProfileLayout>
        		</PrivateLayout>
            </Layout>
        )
    }
}

const mapStateToProps = ({user: {params}}) => 
    (
        {
            user: params
        }
    )

export default connect(mapStateToProps)(Edit)