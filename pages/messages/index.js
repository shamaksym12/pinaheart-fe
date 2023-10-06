import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import PrivateLayout from '../../layouts/private'
import { getDialogList, deleteDialogs } from '../../actions/dialog'
import Pagination from '../../components/pagination'
import BtnMain from '../../components/buttons/btn_main'
import Head from 'next/head'
import DialogBlock from '../../components/block/dialog_block'
import CheckboxField from '../../components/inputs/checkbox_field'


class Messages extends Component {
    state = {
        load: false,
        id_checked: [{
            checked: false
        }],
        all_checked: false,
        status: 'select',
        check_num: 0
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getDialogList()).then(res =>
            this.setState({
                load: true
            })
        )
    }

    componentWillReceiveProps(next_props) {
        const { dialogs } = next_props
        let id_checked = []
        {
            [...new Array(dialogs.length)].map((item, i) => {
                id_checked[i] = {
                    id: dialogs[i].id,
                    checked: false
                }
            })
        }
        this.setState({
            id_checked
        })
    }

    handleCheck = (i) => {
        const { dispatch } = this.props
        if (this.state.id_checked[i].checked) {
            this.state.id_checked[i].checked = false
            this.setState({ check_num: this.state.check_num - 1 }, () => {
                if (!this.state.check_num) this.setState({ status: 'cancel' })
            })
        } else {
            this.state.id_checked[i].checked = true
            this.setState({ check_num: this.state.check_num + 1 })
            this.setState({ status: 'delete selected' })
        }
    }

    allCheck = (dialogs) => {
        let id_checked = []
        if (this.state.all_checked) {
            {
                [...new Array(dialogs.length)].map((item, i) => {
                    id_checked[i] = {
                        id: dialogs[i].id,
                        checked: false
                    }
                })
                this.setState({
                    id_checked,
                    all_checked: false
                })

            }
        } else {
            {
                [...new Array(dialogs.length)].map((item, i) => {
                    id_checked[i] = {
                        id: dialogs[i].id,
                        checked: true
                    }
                })
            }
            this.setState({
                id_checked,
                all_checked: true
            })
        }
    }

    handleChangePage = page => {

        // const { search } = this.state
        // const {dispatch} = this.props
        // let params = {}
        // if (Object.keys(search).length) {
        //     params = search.sort
        // } 
        // dispatch(getSortMatch(params, page))
        // Router.pushRoute(`/massages?sort=${params}&page=${page}`)
    }

    handleMessageMode = () => {
		if (this.state.status == 'select') this.setState({ status: 'cancel' })
		else if (this.state.status == 'cancel') this.setState({ status: 'select' })
		else {
            this.setState({ status: 'select' })
            this.delete()
        }
	}

    renderList = (dialog, i) => {
        return <div key={i} className="dialog">
            <DialogBlock height={370}
                dialog={dialog}
                checked={this.state.id_checked[i] ? this.state.id_checked[i].checked : false}
                status={this.state.status}
                handleCheck={() => this.handleCheck(i)} />
        </div>
    }

    handleChangePage = page => {
    }

    delete = () => {
        const { dispatch } = this.props
        const temp = {
            ids: []
        }
        this.state.id_checked.map((item, i) => {
            if (item.checked) {
                temp.ids.push(item.id)
            }
        })
        dispatch(deleteDialogs(temp)).then(res => {
            dispatch(getDialogList())
        }
        )
    }

    render() {
        const { dialogs } = this.props
        return (
            <Layout page="messages" handleMessageMode={this.handleMessageMode} status={this.state.status}>
                <PrivateLayout page="messages">
                    <Head page="messages">
                        <title>PinaHeart.com</title>
                    </Head>
                    <div className="row messages_list_wrap">
                        {dialogs.length && this.state.load
                            ?
                            <div className="col-md-10 messages_list_wrap_wrap">
                                {
                                    window.innerWidth >= 768 ? (
                                        <div className="form-group title fs-18 bold">
                                            Last Messages sent or received
                                        </div>
                                    ) : (
                                        ''
                                    )
                                }                                
                                <div>
                                    <div className="fs-18 title-5 form-group df no_mobile">
                                        {
                                            window.innerWidth >= 768 ? (
                                                <div className="checkbox_dialog">
                                                    <CheckboxField
                                                        id="all"
                                                        onChange={() => this.allCheck(dialogs)}
                                                        checked={this.state.all_checked} />
                                                </div>
                                            ) : (
                                                ''
                                            )
                                        }
                                        {
                                            window.innerWidth >= 768 ? (
                                                <BtnMain style={{ minWidth: "85px" }} onClick={() => this.delete()} text="Delete" className="btn btn-outline" />
                                            ) : (
                                                ''
                                            )
                                        }
                                    </div>
                                    {
                                        dialogs
                                            ? dialogs.map((dialog, i) => this.renderList(dialog, i))
                                            : <div></div>
                                    }
                                </div>
                            </div>
                            :
                            !dialogs.length && this.state.load
                                ?
                                <div className="col-md-10 col-md-offset-1">
                                    <div className="form-group title fs-18 bold noMessages">
                                        Sorry, you don't have any messages yet.
                                    </div>
                                </div>
                                :
                                <div className="col-md-10 col-md-offset-1">

                                </div>
                        }

                    </div>
                    <style jsx>{`
                        .main_menu_wrap.navbar-header {
                            margin-right: 0;
                            margin-left: -16px !important;
                        }
                        .navbar-nav {
                            margin: 7.5px -7px 7.5px -15px;
                            /* margin: 7.5px -15px; */
                        }
                        .noMessages{
                            text-align: center;
                            font-size: 26px;
                        }
                        .df{
                            display: flex
                        }
                        .title {
                            background-color: #F9F9F9;
                            padding: 15px;
                            border-radius: 9px;
                        }
                        .title-5 {
                            background-color: #F9F9F9;
                            padding: 5px;
                            border-top-left-radius: 9px;
                            border-top-right-radius: 9px;
                            margin-bottom: 0px;
                        }
                        .checkbox_dialog{
                            align-self: center;
                            margin-right: 20px;
                            margin-left:26px;
                            margin-top: -25px;
                        }
                    `}
                    </style>
                </PrivateLayout>
            </Layout>
        );
    }
}

const mapStateToProps = ({ dialog }) =>
    (
        {
            dialogs: dialog.dialogs
        }
    )

export default connect(mapStateToProps)(Messages)