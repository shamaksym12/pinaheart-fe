import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import PrivateLayout from '../../layouts/private'
import ProfileLayout from '../../layouts/profile'
import { getInterests, saveInterests, setUserParams } from '../../actions/user'
import InputInline from '../../components/inputs/InputInline'
import BtnMain from '../../components/buttons/btn_main'
import { Router } from '../../routes'
import Head from 'next/head'

class Edit extends Component {
    save = () => {
        const { dispatch } = this.props
        const data = {
            fun: this.props.user.fun,
            music: this.props.user.music,
            food: this.props.user.food,
            sport: this.props.user.sport,
        }
        dispatch(saveInterests(data)).then(success => {
            if (success) {
                setTimeout(() => {
                    Router.pushRoute('/edit/personality')
                }, 2000)
            }
        })
    }
    handleChange = (field, value) => {
        const { dispatch } = this.props
        dispatch(setUserParams({ [field]: value }))
    }
    goToProfile = () => {
        Router.pushRoute('/profile')
    }
    scrollToTopWindow() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getInterests()).then(() => {
            setTimeout(this.scrollToTopWindow, 0)
        })
    }
    render() {
        const { user } = this.props
        return (
            <Layout page="edit_interest">
                <PrivateLayout>
                    <ProfileLayout page="interest">
                        <Head>
                            <title>PinaHeart.com</title>
                        </Head>
                        <div className="fs-18 title form-group edit_interest_wrap">Edit Hobbies & Interests</div>
                        <div className="row form-group">
                            <div className="col-sm-8">
                                <div className="text-green text-justify">
                                    Let  others know what your Interests are and help us connect you with other users that may have similar interests.
                                    Answers all questions below to complete this step
                                </div>
                            </div>
                            <div className="col-sm-4 text-center p-15 no_mobile">
                                <BtnMain text="View my profile" className="btn-outline" onClick={this.goToProfile} />
                            </div>
                        </div>
                        <div className="row form-group edit_interest_wrap_footer">
                            <div className="col-sm-8">
                                <InputInline
                                    onChange={this.handleChange}
                                    label="What do you do for fun / entertaiment?"
                                    field="fun"
                                    value={user.fun}
                                    type="textarea" />
                                <InputInline
                                    field="music"
                                    onChange={this.handleChange}
                                    label="What sort of music  are you into?"
                                    value={user.music}
                                    type="textarea" />
                                <InputInline
                                    field="food"
                                    onChange={this.handleChange}
                                    label="What sort of food  do you like?"
                                    value={user.food}
                                    type="textarea" />
                                <InputInline
                                    field="sport"
                                    onChange={this.handleChange}
                                    label="What sport do you play or like to watch?"
                                    value={user.sport}
                                    type="textarea" />
                                <div className="text-center submit_btn_wrap">
                                    <BtnMain text="Submit" className="btn-green" onClick={this.save} />
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

const mapStateToProps = ({ user: { params } }) =>
    (
        {
            user: params
        }
    )

export default connect(mapStateToProps)(Edit)