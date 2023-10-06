import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import PrivateLayout from '../../layouts/private'
import { confirmAlert } from 'react-confirm-alert'
import { getFullMember, searchByFavorite, blockMember, searchByInterest, updateAdminComment, togleAdminBlockMember } from '../../actions/members'
import { Router } from '../../routes'
import BtnMain from '../../components/buttons/btn_main'
import FullScreenPreview from '../../components/gallery/full_screen_preview'
import Head from 'next/head'
import { setUiKey, toggleModal } from '../../actions/ui'
import { getUncompleteField } from '../../actions/user'
import { toFeet, toLbs, sexPhotoFinder, lastActivity } from '../../utils'
import { openDialog } from "../../actions/dialog"
import MemberBlock from '../../components/block/member_block2'

    // const Heart = () => {
    //     return <svg xmlns="http://www.w3.org/2000/svg" width="18px" fill="#FF6464" viewBox="0 0 62.36 54.57">
    //         <g id="Слой_2" data-name="Слой 2">
    //             <g id="Слой_1-2" data-name="Слой 1">
    //                 <path d="M56.31,3.73C49.63-2,39.71-.93,33.58,5.39l-2.4,2.47-2.4-2.47C22.67-.93,12.73-2,6.05,3.73a17.49,17.49,0,0,0-1.2,25.32L28.42,53.39a3.81,3.81,0,0,0,5.51,0L57.5,29.05A17.47,17.47,0,0,0,56.31,3.73Z" />
    //             </g>
    //         </g>
    //     </svg>
    // }

    // const Star = () => {
    //     return <svg xmlns="http://www.w3.org/2000/svg" width="18px" fill="#FFEB04" viewBox="0 0 62 59.34">
    //         <g id="Слой_2" data-name="Слой 2">
    //             <g id="Слой_1-2" data-name="Слой 1">
    //                 <path d="M27.67,2.06,20.11,17.41,3.18,19.88A3.71,3.71,0,0,0,1.12,26.2L13.37,38.14,10.48,55a3.7,3.7,0,0,0,5.37,3.91L31,51l15.15,8A3.71,3.71,0,0,0,51.52,55L48.63,38.14,60.88,26.2a3.71,3.71,0,0,0-2.06-6.32L41.89,17.41,34.33,2.06a3.72,3.72,0,0,0-6.66,0Z" />
    //             </g>
    //         </g>
    //     </svg>
    // }

    const Send = () => {
        return <svg xmlns="http://www.w3.org/2000/svg" width="20px" fill="#fff" viewBox="0 0 59.53 59.53">
            <g id="Слой_2" data-name="Слой 2">
                <g id="Слой_1-2" data-name="Слой 1">
                    <path d="M58.6.37a2.08,2.08,0,0,1,.9,2.12L51,53.51A2.09,2.09,0,0,1,49.93,55a2,2,0,0,1-1,.26,2.27,2.27,0,0,1-.8-.16L33.06,49l-8,9.8a2,2,0,0,1-1.63.77,1.76,1.76,0,0,1-.73-.14,2,2,0,0,1-1-.78,2,2,0,0,1-.39-1.21V45.81L50,10.63,14.45,41.36,1.33,36A1.94,1.94,0,0,1,0,34.15a2,2,0,0,1,1.07-2L56.34.3A2.08,2.08,0,0,1,58.6.37Z" />
                </g>
            </g>
        </svg>
    }

    const Block = () => {
        return <svg xmlns="http://www.w3.org/2000/svg" fill="#848183" width="20px" viewBox="0 0 56.69 42.12">
            <g id="Слой_2" data-name="Слой 2">
                <g id="Слой_1-2" data-name="Слой 1">
                    <path d="M26.16,26.16a5,5,0,0,1,.67-2.49c-.39,0-.78-.12-1.19-.12H24.27a14.21,14.21,0,0,1-11.92,0H11a11,11,0,0,0-11,11v3.4a3.93,3.93,0,0,0,3.92,3.93h23a5.21,5.21,0,0,1-.73-2.62Zm-7.85-5.23A10.47,10.47,0,1,0,7.85,10.47,10.46,10.46,0,0,0,18.31,20.93ZM54,23.05H51.24V19a6.81,6.81,0,0,0-13.62,0v4.09H34.9a2.72,2.72,0,0,0-2.72,2.72V39.4a2.72,2.72,0,0,0,2.72,2.72H54a2.72,2.72,0,0,0,2.72-2.72V25.77A2.74,2.74,0,0,0,54,23.05Zm-6.59.13H41.44V18.57a3,3,0,1,1,5.93,0Z" />
                </g>
            </g>
        </svg>
    }

    const Report = () => {
        return <svg xmlns="http://www.w3.org/2000/svg" fill="#848183" width="17px" viewBox="0 0 51.02 51.02">
            <g id="Слой_2" data-name="Слой 2">
                <g id="Слой_1-2" data-name="Слой 1">
                    <path d="M36.09,0H14.94L0,14.94V36.07L14.94,51H36.07L51,36.09V14.94ZM25.51,40.54a3.69,3.69,0,1,1,3.69-3.69A3.69,3.69,0,0,1,25.51,40.54Zm2.84-12.19H22.68v-17h5.67Z" />
                </g>
            </g>
        </svg>
    }

class Member extends Component {
    static async getInitialProps({ query }) {
        return { id: query.id }
    }

    state = {
        showPreview: false,
        photoPreview: '',
        mainPhoto: { path: '' },
        photoColection: [],
        adminComment: '',
        member: {},
        is_interested: 0,
        is_favorite: 0,
        loading_interest: 0,
        loading_favorite: 0
    }

    toggleFavorite = (e) => {
        e.stopPropagation()
        const { member, dispatch, id } = this.props;
        this.setState({loading_favorite: 1})
        dispatch(searchByFavorite(member.id)).then(success => {
            if (success) {
                dispatch(getFullMember(id))
                if (success.message == 'User added to favorites') this.setState({ is_favorite: 1 })
                else this.setState({ is_favorite: 0 })
                this.setState({loading_favorite: 0})
            }
        })
    }

    toggleBlock = (e) => {
        e.stopPropagation()
        const { member, dispatch, id } = this.props
        dispatch(blockMember(member.id)).then(
            success => {
                if (success) {
                    dispatch(getFullMember(id)).then(() => {
                        const { member } = this.props
                        this.setState({member: member})
                    })
                }
            }
        );
    }

    toggleInterest = (e) => {
        e.stopPropagation()
        const { member, dispatch, id } = this.props
        this.setState({loading_interest: 1})
        dispatch(searchByInterest(member.id)).then(
            success => {
                if (success) {
                    dispatch(getFullMember(id))
                    if (success.message == 'User added to interest') this.setState({ is_interested: 1 })
                    else this.setState({ is_interested: 0 })
                    this.setState({loading_interest: 0})
                }
            }
        );
    }

    send = () => {
        const { user, dispatch, member } = this.props
        if (!user.filled_info) {
            dispatch(getUncompleteField())
            dispatch(openDialog(id)).then(res => dispatch(setUiKey('targetPage', `/messages/dialog/${res}`)))
            dispatch(toggleModal(true, 'uncomplete'))
            return
        }
        dispatch(openDialog(member.id)).then(res => {
            const a = document.createElement('a')
            a.href = `/messages/dialog/${res}`
            a.target = "_blank"
            a.click();
        })
    }

    goToSearch = () => {
        Router.back()
    }

    scrollToTopWindow() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    componentDidMount() {
        setTimeout(this.scrollToTopWindow, 0)
        const { id, dispatch } = this.props
        dispatch(getFullMember(id)).then(() => {
            const { member } = this.props
            this.setState({member: member})
            this.setState({ adminComment: member.comment })
            this.setState({ is_interested: member.is_interested })
            this.setState({ is_favorite: member.is_favorite })
        })
    }

    closePreview = () => {
        this.setState({ showPreview: false })
    }

    showPreview = src => () => {
        this.setState({ showPreview: true, photoPreview: src })
    }

    haveAppearance = () => {
        const { member } = this.props
        return member.hair_color ||
            member.hair_length ||
            member.eye_color ||
            member.eye_wear ||
            member.body_type ||
            member.your_ethnicity_is_mostly ||
            member.i_consider_my_appearance_as
    }

    haveLifestyle = () => {
        const { member } = this.props
        return member.do_you_have_children ||
            member.number_of_children ||
            member.oldest_child ||
            member.youngest_child ||
            member.do_you_want_more_children ||
            member.do_you_have_pets ||
            member.occupation ||
            member.employment_status ||
            member.home_type ||
            member.living_situation
    }

    haveBackground = () => {
        const { member } = this.props
        return member.languages_spoken ||
            member.english_language_ability ||
            member.religion ||
            member.star_sign
    }

    haveLooking = () => {
        return true
    }

    haveIntersts = () => {
        const { member } = this.props
        return member.interest_entertaiment ||
            member.interest_music ||
            member.interest_food ||
            member.interest_sport
    }

    haveAboutMyself = () => {
        const { member } = this.props
        return member.personality_desc ||
            member.personality_travel ||
            member.personality_weekend ||
            member.personality_humor ||
            member.personality_person ||
            member.personality_dress
    }

    renderPhotos = (item, i) => {
        return <div className="photo" onClick={() => this.changeMain(item, i)}>
            <style jsx>{`
                        .photo {
                            width: 100%;
                            padding-top: 100%;
                            background-image: url(${item.path_thumb});
                            background-size: cover;
                            border-radius: 9px;
                            background-position: center;
                            margin-bottom: 15px;
                            cursor: pointer;
                        }
                    `}
            </style>
        </div>
    }
    changeMain = (item, i) => {
        this.setState({
            mainPhoto: item,
            photoColection: this.state.photoColection.filter(photo => {
                photo.id !== item.id ? photo.is_main = false : photo.is_main = true
                return photo
            })
        })
    }

    componentWillReceiveProps(next_props) {
        if (next_props.member.photos) {
            if (next_props.member.photos.length && next_props.member.photos.find(item => item.is_main)) {
                this.setState({
                    photoColection: next_props.member.photos.filter((photo, id) => {
                        photo.id = id
                        return photo
                    }),
                    mainPhoto: next_props.member.photos.find(item => item.is_main)
                })
            } else if (next_props.member.photos.find(item => item.is_main) === undefined && next_props.member.photos.length != 0) {
                // if from serwer cames photos without is_main 
                this.setState({
                    mainPhoto: next_props.member.photos.find(item => item.is_main == false),
                    photoColection: next_props.member.photos.filter((photo, id) => {
                        id === 0 ? photo.is_main = true : photo.is_main = false
                        photo.id = id;
                        return photo
                    })
                })
            } else this.setState({
                mainPhoto: { path: sexPhotoFinder(next_props.member.sex) },
                photoColection: next_props.member.photos.filter((photo, id) => {
                    photo.id = id
                    return photo
                })
            })
        }
    }

    nextPhoto = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const findNextId = this.state.photoColection.find(item => item.is_main).id + 1
        const firstId = 0
        const lustId = this.state.photoColection[this.state.photoColection.length - 1].id
        if (findNextId <= lustId) {
            this.setState({
                photoColection: this.state.photoColection.filter(item => {
                    item.id === findNextId ? item.is_main = true : item.is_main = false
                    return item
                }),
                mainPhoto: this.state.photoColection.find(item => item.is_main)
            })
        } else {
            this.setState({
                photoColection: this.state.photoColection.filter(item => {
                    item.id === firstId ? item.is_main = true : item.is_main = false
                    return item
                }),
                mainPhoto: this.state.photoColection.find(item => item.is_main)
            })
        }
    }

    handleClickAdminBlock = e => {
        confirmAlert({
            title: '',
            message: 'Are you sure?',
            buttons: [
                {
                    label: 'No'
                },
                {
                    label: 'Yes',
                    onClick: () => {
                        e.preventDefault()
                        const { dispatch, member } = this.props
                        const data = {
                            id: member.id,
                            value: true,
                        }

                        dispatch(togleAdminBlockMember(data)).then(res => {
                            dispatch(getFullMember(member.id))
                        })
                    }
                }
            ]
        })
    }

    handleClickAdminUnBlock = e => {
        e.preventDefault()
        confirmAlert({
            title: '',
            message: 'Are you sure?',
            buttons: [
                {
                    label: 'No'
                },
                {
                    label: 'Yes',
                    onClick: () => {
                        const { dispatch, member } = this.props
                        const data = {
                            id: member.id,
                            value: false,
                        }
                        dispatch(togleAdminBlockMember(data)).then(success => {
                            if (success) {
                                dispatch(getFullMember(member.id))
                            }
                        })
                    }
                }
            ]
        })

    }


    textareaRef = ref => {
        this.textarea = ref
    }

    handleSubmitAdminComment = e => {
        e.preventDefault()
        const { dispatch, member } = this.props
        const data = {
            id: member.id,
            comment: this.state.adminComment,
        }
        dispatch(updateAdminComment(data))
    }

    handleChangeComment = e => {
        this.setState({ adminComment: e.target.value })
    }

    render() {
        const { isAdmin, id, user } = this.props
        const { member, mainPhoto, photoColection } = this.state

        const Heart = () => {
            if (this.state.loading_interest) return <i className="fas fa-spinner fa-spin loader text-info interest_spiner"></i>
            else {
                if (this.state.is_interested) {
                    return <svg xmlns="http://www.w3.org/2000/svg" width="20px" fill="#C5141B" viewBox="0 0 24 24">
                        <g id="Слой_2" data-name="Слой 2">
                            <g id="Слой_1-2" data-name="Слой 1">
                                <path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z" />
                            </g>
                        </g>
                    </svg>
                }
                else {
                    return <svg xmlns="http://www.w3.org/2000/svg" width="20px" fill="#C5141B" viewBox="0 0 24 24">
                        <g id="Слой_2" data-name="Слой 2">
                            <g id="Слой_1-2" data-name="Слой 1">
                                <path d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z" />
                            </g>
                        </g>
                    </svg>
                }
            }
        }
        
        const Star = () => {
            if (this.state.loading_favorite) return <i className="fas fa-spinner fa-spin loader text-info favorite_spiner"></i>
            else {
                if (this.state.is_favorite) {
                    return <svg xmlns="http://www.w3.org/2000/svg" width="20px" fill="#FFEB04" viewBox="0 0 24 24">
                        <g id="Слой_2" data-name="Слой 2">
                            <g id="Слой_1-2" data-name="Слой 1">
                                <path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" />
                            </g>
                        </g>
                    </svg>
                }
                else {
                    return <svg xmlns="http://www.w3.org/2000/svg" width="20px" fill="#FFEB04" viewBox="0 0 24 24">
                        <g id="Слой_2" data-name="Слой 2">
                            <g id="Слой_1-2" data-name="Слой 1">
                                <path d="M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z" />
                            </g>
                        </g>
                    </svg>
                }
            }
        }

        const color = member.account_status === 'platinum' ? '#0cf6dd' 
					: member.account_status === 'free_platinum' ? '#e9e707' 
					: member.account_status === 'free_platinum_on_hold' ? '#f17eeb'
					: null ;
        
        return member.id == id && (
            <Layout page="member" toggleBlock={this.toggleBlock} is_block={member.is_blocked}>
                <PrivateLayout page="member">
                    <Head>
                        <title>PinaHeart.com</title>
                    </Head>
                    <div className="form-group container no_mobile">
                        <span className="pointer" onClick={this.goToSearch}>
                            <i className="fas fa-arrow-left"></i>
                            &nbsp;
                            <span>Return to Search Results</span>
                        </span>
                    </div>
                    <div className="container member_item_wrap_wrap">
                        <div className="row member_item_wrap">
                            <div className="col-md-4 member_main_wrap">
                                <div className="avatar no_mobile" onClick={mainPhoto.path ? this.showPreview(mainPhoto.path) : null}>
                                    {
                                        member.account_status === 'platinum' ? <div className="avatar-info"><span className="member-status-premium">Premium</span></div>
                                            : member.account_status === 'free_platinum' ? <div className="avatar-info"><span className="member-status-free-premium">Premium</span></div>
                                                : null
                                    }
                                    {
                                        member.is_blocked
                                            ? <div className="isBlocked">
                                                <span> You blocked this member </span>
                                            </div>
                                            : null
                                    }
                                    <div className="inner-avatar">
                                        <div onClick={this.toggleFavorite} className="favorite GreyWraper">
                                            <Star />
                                            <span style={{ marginLeft: 10 }}> {this.state.is_favorite ? "Remove favorite" : "Add to favorites"}</span>
                                        </div>
                                        <div onClick={this.toggleInterest} className="interest GreyWraper">
                                            <Heart />
                                            <span style={{ marginLeft: 10 }}>{this.state.is_interested ? "Remove Interest" : "Show Interest"}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row no_mobile">
                                    {photoColection.map((item, i) => <div key={i} className="col-sm-4 form-group">{this.renderPhotos(item, i)}</div>)}
                                </div>
                                <div className="row no_mobile">
                                    {
                                        isAdmin
                                            ?
                                            <div className="form-group" >
                                                <form onSubmit={this.handleSubmitAdminComment} noValidate={true}>
                                                    <textarea ref={this.textareaRef} value={this.state.adminComment} onChange={this.handleChangeComment} className="form-group form-control text-field noresize" placeholder="Admin comments"></textarea>
                                                    <button className="btn main button btn-outline">Update comments</button>
                                                </form>
                                            </div>
                                            : ""
                                    }
                                </div>
                                <div className="only_mobile">
                                    <MemberBlock height={370} member={member} user={user} />
                                </div>
                            </div>
                            <div className="col-md-8 member_second_wrap">
                                <div className="row form-group">
                                    <div className="col-sm-6">
                                        <div className="form-group no_mobile">
                                            <span className="name">{member.first_name}, {member.age} &nbsp;</span>
                                            <span className="fs-12">
                                                {member.activity_diff_in_seconds <= 180 && member.activity_diff_in_seconds !== null
                                                    ? "online"
                                                    : lastActivity(member.activity_diff_in_seconds)}
                                            </span>
                                        </div>
                                        <div className="form-group no_mobile">
                                            {member.formatted_address}
                                        </div>
                                        {
                                            member.heading
                                            && <div className="heading form-group">
                                                {member.heading}
                                            </div>
                                        }
                                        <div className="custom-table no_mobile">
                                            {
                                                member.marital_status
                                                && <div className="custom-table-item">
                                                    <div className="left">Marital status:</div>
                                                    <div className="right">{member.marital_status}</div>
                                                </div>
                                            }
                                            {
                                                member.looking_for
                                                && <div className="custom-table-item">
                                                    <div className="left">Looking for:</div>
                                                    <div className="right">{member.looking_for}</div>
                                                </div>
                                            }
                                            {
                                                member.relationship_youre_looking_for
                                                && <div className="custom-table-item">
                                                    <div className="left">For:</div>
                                                    <div className="right">{member.relationship_youre_looking_for.join(', ')}</div>
                                                </div>
                                            }
                                            {
                                                member.height
                                                && <div className="custom-table-item">
                                                    <div className="left">Height:</div>
                                                    <div className="right">{`${member.height} / ${toFeet(member.height)}`}</div>
                                                </div>
                                            }
                                            {
                                                member.weight
                                                && <div className="custom-table-item">
                                                    <div className="left">Weight:</div>
                                                    <div className="right">{`${member.weight} / ${toLbs(member.weight)} lbs`}</div>
                                                </div>
                                            }
                                            {
                                                member.nationality
                                                && <div className="custom-table-item">
                                                    <div className="left">Nationality:</div>
                                                    <div className="right">{member.nationality}</div>
                                                </div>
                                            }
                                            {
                                                member.education
                                                && <div className="custom-table-item">
                                                    <div className="left">Education:</div>
                                                    <div className="right">{member.education}</div>
                                                </div>
                                            }
                                            {
                                                member.do_you_smoke
                                                && <div className="custom-table-item">
                                                    <div className="left">Smoke:</div>
                                                    <div className="right">{member.do_you_smoke}</div>
                                                </div>
                                            }
                                            {
                                                member.do_you_drink
                                                && <div className="custom-table-item">
                                                    <div className="left">Drink:</div>
                                                    <div className="right">{member.do_you_drink}</div>
                                                </div>
                                            }
                                        </div>
                                        <div className="custom-table only_mobile">
                                            {
                                                member.marital_status
                                                && <div className="custom-table-item">
                                                    <div className="left">Marital status:</div>
                                                    <div className="right">{member.marital_status}</div>
                                                </div>
                                            }
                                            {
                                                member.looking_for
                                                && <div className="custom-table-item">
                                                    <div className="left">Looking for:</div>
                                                    <div className="right">{member.looking_for}</div>
                                                </div>
                                            }
                                            {
                                                member.relationship_youre_looking_for
                                                && <div className="custom-table-item">
                                                    <div className="left">For:</div>
                                                    <div className="right">{member.relationship_youre_looking_for.join(', ')}</div>
                                                </div>
                                            }
                                            {
                                                member.height
                                                && <div className="custom-table-item">
                                                    <div className="left">Height:</div>
                                                    <div className="right">{`${member.height} / ${toFeet(member.height)}`}</div>
                                                </div>
                                            }
                                            {
                                                member.weight
                                                && <div className="custom-table-item">
                                                    <div className="left">Weight:</div>
                                                    <div className="right">{`${member.weight} / ${toLbs(member.weight)} lbs`}</div>
                                                </div>
                                            }
                                            {
                                                member.willing_to_relocate
                                                && <div className="custom-table-item">
                                                    <div className="left">Relocate:</div>
                                                    <div className="right">{member.willing_to_relocate ? member.willing_to_relocate : 'No'}</div>
                                                </div>
                                            }
                                            {
                                                member.do_you_have_children
                                                && <div className="custom-table-item">
                                                    <div className="left">Have children:</div>
                                                    <div className="right">{member.do_you_have_children}</div>
                                                </div>
                                            }
                                            {
                                                member.do_you_smoke
                                                && <div className="custom-table-item">
                                                    <div className="left">Smoke:</div>
                                                    <div className="right">{member.do_you_smoke}</div>
                                                </div>
                                            }
                                            {
                                                member.do_you_drink
                                                && <div className="custom-table-item">
                                                    <div className="left">Drink:</div>
                                                    <div className="right">{member.do_you_drink}</div>
                                                </div>
                                            }
                                            {
                                                member.nationality
                                                && <div className="custom-table-item">
                                                    <div className="left">Nationality:</div>
                                                    <div className="right">{member.nationality}</div>
                                                </div>
                                            }
                                            {
                                                member.education
                                                && <div className="custom-table-item">
                                                    <div className="left">Education:</div>
                                                    <div className="right">{member.education}</div>
                                                </div>
                                            }
                                            {
                                                member.occupation
                                                && <div className="custom-table-item">
                                                    <div className="left">Occupation:</div>
                                                    <div className="right">{member.occupation}</div>
                                                </div>
                                            }                                            
                                        </div>
                                    </div>
                                    <div className="col-sm-6 no_mobile">
                                        <div style={{ color: '#747373' }} className="form-group">
                                            <strong>ID:</strong> {member.profile_id}
                                        </div>
                                        <div className="form-group">
                                            <BtnMain
                                                className="btn-green"
                                                onClick={this.send}
                                                text={<div className="btn-text">
                                                    <div style={{ marginBottom: -5, marginRight: 10 }}><Send /></div>
                                                    <span>Send message</span>
                                                </div>} />
                                        </div>
                                        <div>
                                            <div onClick={this.toggleBlock} className="unblock" >
                                                <Block />
                                                <span style={{ marginLeft: 10 }}> {member.is_blocked ? "Unblock user" : "Block user"} </span>
                                            </div>
                                            <div className="report">
                                                <Report />
                                                <span style={{ marginLeft: 13 }}>Report user</span>
                                            </div>
                                            <div>
                                                {
                                                    isAdmin ?
                                                        <div className="form-group">
                                                            {
                                                                member.is_admin_block ?
                                                                    <div className="admin-btn blocked">
                                                                        <span>Blocked</span>
                                                                    </div> : ""
                                                            }
                                                            {
                                                                !member.is_admin_block ?
                                                                    <div className="admin-btn block" onClick={this.handleClickAdminBlock}>
                                                                        <span>Block by staff</span>
                                                                    </div> : ""
                                                            }
                                                            {
                                                                member.is_admin_block ?
                                                                    <div className="admin-btn unblock" onClick={this.handleClickAdminUnBlock}>
                                                                        <span>Unblock by staff</span>
                                                                    </div> : ""
                                                            }
                                                        </div>
                                                        : ""
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="title form-group no_mobile">
                                    Member Overview
                                </div>
                                {
                                    member.about
                                    && <div className="form-group no_mobile">
                                        {member.about}
                                    </div>
                                }
                                <div className="custom-table form-group no_mobile">
                                    {
                                        member.do_you_drink
                                        && <div className="custom-table-item">
                                            <div className="left">Drink:</div>
                                            <div className="right">{member.do_you_drink}</div>
                                        </div>
                                    }
                                    {
                                        member.age
                                        && <div className="custom-table-item">
                                            <div className="left">Age:</div>
                                            <div className="right">{member.age}</div>
                                        </div>
                                    }
                                    {
                                        member.formatted_address
                                        && <div className="custom-table-item">
                                            <div className="left">Lives in:</div>
                                            <div className="right">{member.formatted_address}</div>
                                        </div>
                                    }
                                    {
                                        member.willing_to_relocate
                                        && <div className="custom-table-item">
                                            <div className="left">Relocate:</div>
                                            <div className="right">{member.willing_to_relocate}</div>
                                        </div>
                                    }
                                </div>
                                <div className="custom-table-item little_about">
                                    A little about yourself. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </div>
                                                                
                                {
                                    <div className="title-white">
                                        I am searching for
                                    </div>
                                }
                                <div className="custom-table-item little_about1">
                                    What are you looking for in a partner Delectus accusata in pro Mel mollos omnesque adipisci et. Ex altera apeirian mea.
                                </div>
                                {
                                    this.haveAppearance()
                                    && <div className="title-white">
                                        Appearance
                                        </div>
                                }
                                <div className="custom-table form-group">
                                    {
                                        member.hair_color
                                        && <div className="custom-table-item">
                                            <div className="left">Hair color:</div>
                                            <div className="right">{member.hair_color}</div>
                                        </div>
                                    }
                                    {
                                        member.hair_length
                                        && <div className="custom-table-item">
                                            <div className="left">Hair length:</div>
                                            <div className="right">{member.hair_length}</div>
                                        </div>
                                    }
                                    {
                                        member.eye_color
                                        && <div className="custom-table-item">
                                            <div className="left">Eye color:</div>
                                            <div className="right">{member.eye_color}</div>
                                        </div>
                                    }
                                    {
                                        member.eye_wear
                                        && <div className="custom-table-item">
                                            <div className="left">Eye wear:</div>
                                            <div className="right">{member.eye_wear}</div>
                                        </div>
                                    }
                                    {
                                        member.body_type
                                        && <div className="custom-table-item">
                                            <div className="left">Body style:</div>
                                            <div className="right">{member.body_type}</div>
                                        </div>
                                    }
                                    {
                                        member.your_ethnicity_is_mostly
                                        && <div className="custom-table-item">
                                            <div className="left">Ethnicity:</div>
                                            <div className="right">{member.your_ethnicity_is_mostly}</div>
                                        </div>
                                    }
                                    {
                                        member.i_consider_my_appearance_as
                                        && <div className="custom-table-item">
                                            <div className="left">Appearance:</div>
                                            <div className="right">{member.i_consider_my_appearance_as}</div>
                                        </div>
                                    }
                                </div>
                                
                                {
                                    this.haveLifestyle()
                                    && <div className="title-white">
                                        Lifestyle
                                        </div>
                                }
                                <div className="custom-table form-group">
                                    {
                                        member.do_you_have_children
                                        && <div className="custom-table-item">
                                            <div className="left">Have children:</div>
                                            <div className="right">{member.do_you_have_children}</div>
                                        </div>
                                    }
                                    {
                                        member.number_of_children
                                        && <div className="custom-table-item">
                                            <div className="left">Number of children:</div>
                                            <div className="right">{member.number_of_children}</div>
                                        </div>
                                    }
                                    {
                                        member.oldest_child
                                        && <div className="custom-table-item">
                                            <div className="left">Oldest child:</div>
                                            <div className="right">{member.oldest_child}</div>
                                        </div>
                                    }
                                    {
                                        member.youngest_child
                                        && <div className="custom-table-item">
                                            <div className="left">Youngest child:</div>
                                            <div className="right">{member.youngest_child}</div>
                                        </div>
                                    }
                                    {
                                        member.do_you_want_more_children
                                        && <div className="custom-table-item">
                                            <div className="left">Want (more) children:</div>
                                            <div className="right">{member.do_you_want_more_children}</div>
                                        </div>
                                    }
                                    {
                                        member.do_you_have_pets
                                        && <div className="custom-table-item">
                                            <div className="left">Have pets:</div>
                                            <div className="right">{member.do_you_have_pets.join(', ')}</div>
                                        </div>
                                    }
                                    
                                    {
                                        member.employment_status
                                        && <div className="custom-table-item">
                                            <div className="left">Employment status:</div>
                                            <div className="right">{member.employment_status}</div>
                                        </div>
                                    }
                                    {
                                        member.home_type
                                        && <div className="custom-table-item">
                                            <div className="left">Home type:</div>
                                            <div className="right">{member.home_type}</div>
                                        </div>
                                    }
                                    {
                                        member.living_situation
                                        && <div className="custom-table-item">
                                            <div className="left">Living situation:</div>
                                            <div className="right">{member.living_situation}</div>
                                        </div>
                                    }
                                </div>
                                
                                {
                                    this.haveBackground()
                                    && <div className="title-white">
                                        Background/Cultural Values
                                        </div>
                                }
                                <div className="custom-table form-group">
                                    {
                                        member.languages_spoken
                                        && <div className="custom-table-item">
                                            <div className="left">Languages spoken:</div>
                                            <div className="right">{member.languages_spoken.join(', ')}</div>
                                        </div>
                                    }
                                    {
                                        member.english_language_ability
                                        && <div className="custom-table-item">
                                            <div className="left">English ability:</div>
                                            <div className="right">{member.english_language_ability}</div>
                                        </div>
                                    }
                                    {
                                        member.religion
                                        && <div className="custom-table-item">
                                            <div className="left">Religion:</div>
                                            <div className="right">{member.religion}</div>
                                        </div>
                                    }
                                    {
                                        member.star_sign
                                        && <div className="custom-table-item">
                                            <div className="left">Star sign:</div>
                                            <div className="right">{member.star_sign}</div>
                                        </div>
                                    }
                                </div>
                                {
                                    this.haveLooking()
                                    && <div className="title-white">
                                        Looking for
                                        </div>

                                }
                                <div className="custom-table form-group">
                                    {
                                        member.looking
                                        && <div className="custom-table-item">
                                            <div className="left">Ready to meet:</div>
                                            <div className="right">{member.looking}</div>
                                        </div>
                                    }
                                </div>
                                {
                                    this.haveIntersts()
                                    && <div className="title-white">
                                        Interests
                                        </div>

                                }
                                <div className="custom-table form-group">
                                    {
                                        member.interest_fun
                                        && <div className="custom-table-item">
                                            <div className="left">Entertaiment:</div>
                                            <div className="right">{member.interest_fun}</div>
                                        </div>
                                    }
                                    {
                                        member.interest_music
                                        && <div className="custom-table-item">
                                            <div className="left">Music:</div>
                                            <div className="right">{member.interest_music}</div>
                                        </div>
                                    }
                                    {
                                        member.interest_food
                                        && <div className="custom-table-item">
                                            <div className="left">Food:</div>
                                            <div className="right">{member.interest_food}</div>
                                        </div>
                                    }
                                    {
                                        member.interest_sport
                                        && <div className="custom-table-item">
                                            <div className="left">Sport:</div>
                                            <div className="right">{member.interest_sport}</div>
                                        </div>
                                    }
                                </div>
                                {
                                    this.haveAboutMyself()
                                    && <div className="title-white">
                                        More about myself
                                        </div>

                                }
                                <div className="custom-table form-group">
                                    {
                                        member.personality_desc
                                        && <div className="custom-table-item">
                                            <div className="left">Personality:</div>
                                            <div className="right">{member.personality_desc}</div>
                                        </div>
                                    }
                                    {
                                        member.personality_travel
                                        && <div className="custom-table-item">
                                            <div className="left">Travelling:</div>
                                            <div className="right">{member.personality_travel}</div>
                                        </div>
                                    }
                                    {
                                        member.personality_weekend
                                        && <div className="custom-table-item">
                                            <div className="left">My perfect romantic weekend:</div>
                                            <div className="right">{member.personality_weekend}</div>
                                        </div>
                                    }
                                    {
                                        member.personality_humor
                                        && <div className="custom-table-item">
                                            <div className="left">Sense of humor:</div>
                                            <div className="right">{member.personality_humor}</div>
                                        </div>
                                    }
                                    {
                                        member.personality_person
                                        && <div className="custom-table-item">
                                            <div className="left">My perfect match:</div>
                                            <div className="right">{member.personality_person}</div>
                                        </div>
                                    }
                                    {
                                        member.personality_dress
                                        && <div className="custom-table-item">
                                            <div className="left">My dress sense and physical appearence:</div>
                                            <div className="right">{member.personality_dress}</div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <style jsx>{`
                        .isBlocked {
                            color: #fff;
                            border-radius: 5px;
                            background: rgba(0,0,0,0.4);
                            padding: 1px 7px;
                            text-align: center;
                            font-size: 12px;
                            position: absolute;
                            top: 10px;
                            left: 50%;
                            transform: translateX(-50%);
                        }
						.GreyWraper{
							padding: 4px 4px;
							border-radius: 5px;
							background: rgba(0, 0, 0, 0.4);
						}
                        .avatar {
                            position: relative;
                            width: 100%;
                            padding-top: 100%;
                            background-image: url(${mainPhoto.path_thumb});
                            background-size: cover;
                            border-radius: 9px;
                            background-position: center;
                            margin-bottom: 30px;
                        }
                        .avatar-info {
							position: absolute;
							top: 60px;
							left: -25px;
							transform: rotate(-90deg);
							color: #f17eeb;
							// border: 1px solid #f17eeb;
							padding: 0 10px;
                            // border-radius: 5px;
                            background: rgba(0,0,0,0.4);
                            border-radius: 5px;
                            padding: 4px 15px;
                            letter-spacing: 1px;
                        }
                        .member-status-premium {
                            color: ${color};
                        }
                        .member-status-free-premium {
                            color: ${color};
                        }
                        .inner-avatar {
                            position: absolute;
                            display: flex;
                            bottom: 15px;
                            left: 15px;
                            flex-wrap: wrap;
                            width: 92%;
                        }
						.favorite {
							color: #FFEB04;
							margin-right: 5px;
							cursor: pointer;
							display: flex;
                            align-items: end;
                            width: 49%;
						}
						.interest {
							color: #FF6464;
							cursor: pointer;
							display: flex;
                            align-items: center;
                            width: 49%;
						}
                        .name {
                            color: #777074;
                            font-size: 18px;
                            font-weight: 600;
                        }
                        .heading {
                            background: #FFFCDF;
                            padding: 12px;
                            border-radius: 5px;
                            font-style: italic;
                        }
                        .custom-table .custom-table-item:nth-child(odd) {
                            background: #F3F3F3;
                        }
                        .custom-table .custom-table-item {
                            border-radius: 9px;
                            padding: 3px 8px;
                            display: flex;
                        }
                        .custom-table .custom-table-item .left {
                            font-weight: 600;
                            width: 40%;
                        }
                        .custom-table .custom-table-item .right {
                            width: 60%;
                        }
                        .title {
                            color: #777074;
                            font-size: 18px;
                            font-weight: 600;
                            background: #F9F9F9;
                            padding: 15px 11px;
                            border-radius: 9px;
                        }
                        .title-white {
                            font-size: 18px;
                            font-weight: 600;
                            padding: 15px 11px;
                            color: #777074;
                        }
                        .btn-text {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        .unblock {
                            margin-bottom: 15px;
                            cursor: pointer
                        }
                        .report {
                            display: flex;
                            align-items: center;
                            margin-bottom: 15px;
                        }

                        body.react-confirm-alert-body-element {
                            overflow: hidden;
                        }
                        
                        .react-confirm-alert-blur {
                            filter: url(#gaussian-blur);
                            filter: blur(2px);
                            -webkit-filter: blur(2px);
                        }
                        
                        .react-confirm-alert-overlay {
                            position: fixed;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            z-index: 99;
                            background: rgba(255, 255, 255, 0.9);
                            display: -webkit-flex;
                            display: -moz-flex;
                            display: -ms-flex;
                            display: -o-flex;
                            display: flex;
                            justify-content: center;
                            -ms-align-items: center;
                            align-items: center;
                            opacity: 0;
                            -webkit-animation: react-confirm-alert-fadeIn 0.5s 0.2s forwards;
                            -moz-animation: react-confirm-alert-fadeIn 0.5s 0.2s forwards;
                            -o-animation: react-confirm-alert-fadeIn 0.5s 0.2s forwards;
                            animation: react-confirm-alert-fadeIn 0.5s 0.2s forwards;
                        }
                        
                        .react-confirm-alert-body {
                            font-family: Arial, Helvetica, sans-serif;
                            width: 400px;
                            padding: 30px;
                            text-align: left;
                            background: #fff;
                            border-radius: 10px;
                            box-shadow: 0 20px 75px rgba(0, 0, 0, 0.13);
                            color: #666;
                        }
                        
                        .react-confirm-alert-svg {
                            position: absolute;
                            top: 0;
                            left: 0;
                        }
                        
                        .react-confirm-alert-body > h1 {
                            margin-top: 0;
                        }
                        
                        .react-confirm-alert-body > h3 {
                            margin: 0;
                            font-size: 16px;
                        }
                        
                        .react-confirm-alert-button-group {
                            display: -webkit-flex;
                            display: -moz-flex;
                            display: -ms-flex;
                            display: -o-flex;
                            display: flex;
                            justify-content: flex-start;
                            margin-top: 20px;
                        }
                        
                        .react-confirm-alert-button-group > button {
                            outline: none;
                            background: #333;
                            border: none;
                            display: inline-block;
                            padding: 6px 18px;
                            color: #eee;
                            margin-right: 10px;
                            border-radius: 5px;
                            font-size: 12px;
                            cursor: pointer;
                        }
                        
                        @-webkit-keyframes react-confirm-alert-fadeIn {
                            from {
                            opacity: 0;
                            }
                            to {
                            opacity: 1;
                            }
                        }
                        
                        @-moz-keyframes react-confirm-alert-fadeIn {
                            from {
                            opacity: 0;
                            }
                            to {
                            opacity: 1;
                            }
                        }
                        
                        @-o-keyframes react-confirm-alert-fadeIn {
                            from {
                            opacity: 0;
                            }
                            to {
                            opacity: 1;
                            }
                        }
                        
                        @keyframes react-confirm-alert-fadeIn {
                            from {
                            opacity: 0;
                            }
                            to {
                            opacity: 1;
                            }
                        }
                        @media (max-width: 991px) {
                            .inner-avatar{
                                width: 96%;
                            }
                        }
                        @media (max-width: 768px) {
                            .inner-avatar{
                                width: 96%;
                            }
                            .title-white {
                                padding: 15px 10px 8px 10px;
                            }
                        }
                        @media (max-width: 640px) {
                            .inner-avatar{
                                width: 94%;
                            }
                        }
                        @media (max-width: 415px) {
                            .inner-avatar{
                                width: 92%;
                            }
                        }
                    `}
                    </style>
                    <FullScreenPreview src={this.state.mainPhoto.path} show={this.state.showPreview} onClose={this.closePreview} clickOnImage={this.nextPhoto} />
                </PrivateLayout>
            </Layout>
        )
    }
}

const mapStateToProps = ({ members, user }) =>
    ({
        member: members.activeMember,
        user: user.data,
        isAdmin: user.isAdmin,
    })

export default connect(mapStateToProps)(Member)