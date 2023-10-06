import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import PrivateLayout from '../../layouts/private'
import SearchLayout from '../../layouts/search'
import TextField from '../../components/inputs/text_field'
import BtnMain from '../../components/buttons/btn_main'
import { Router } from '../../routes'
import { getSavedSearch, removeSearch, getSearch } from '../../actions/search'
import Head from 'next/head'

class Search extends Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getSavedSearch())
    }

    goToSearch = item => () => {
        let params = {}
        const { dispatch } = this.props
        dispatch(getSearch(item.id)).then(
            res => {
                params.search = res.data
                params.name = res.name
                params = JSON.stringify(params)
                Router.pushRoute(`/results?query=${params}`)
            })

    }

    goToEdit = item => () => {
        Router.pushRoute(`/search/saved/${item.id}`)
    }

    remove = item => () => {
        const { dispatch } = this.props
        dispatch(removeSearch(item.id))
    }

    renderList = item => {
        return <div className="list-item">
            <div>{item.name}</div>
            <div className="d-flex align-items-center">
                <div onClick={this.goToSearch(item)} className="icon-item search">
                    <i className="fas fa-search"></i>
                </div>
                <div onClick={this.goToEdit(item)} className="icon-item edit">
                    <i className="fas fa-pencil-alt"></i>
                </div>
                <div onClick={this.remove(item)} className="icon-item remove">
                    <i className="fas fa-trash"></i>
                </div>
            </div>
            <style jsx>{`
                        .list-item {
                            background-color: #F9F9F9;
                            padding: 15px;
                            border-radius: 9px;
                            font-weight: bold;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            font-size: 16px;
                            margin-bottom: 10px;
                        }
                        .icon-item {
                            position: relative;
                            margin: 0 5px;
                            cursor: pointer;
                            color: #fff;
                            border-radius: 50%;
                            width: 30px;
                            height: 30px;
                        }
                        .icon-item i {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                        }
                        .search {
                            background-color: #98D538;
                        }
                        .edit {
                            background-color: #ffc107;
                        }
                        .remove {
                            background-color: #dc3545;
                        }
                    `}
            </style>
        </div>
    }

    render() {
        const { list } = this.props
        return (
            <Layout page="search sub">
                <PrivateLayout>
                    <SearchLayout page="saved">
                        <Head>
                            <title>PinaHeart.com</title>
                        </Head>
                        <div className="fs-18 title form-group d-flex justify-content-between saved_search_label_desktop">
                            <div>Saved Search</div>
                        </div>
                        <div className="saved_search_label_mobile">
                            Saved Search
                        </div>
                        <div>
                            {
                                list.map((item, i) => <div key={i}>{this.renderList(item)}</div>)
                            }
                        </div>
                        <style jsx>{`
                            .title {
                                background-color: #F9F9F9;
                                padding: 15px;
                                border-radius: 9px;
                                font-weight: bold;
                                height: 65px;
                            }
                        `}
                        </style>
                    </SearchLayout>
                </PrivateLayout>
            </Layout>
        );
    }
}

const mapStateToProps = ({ search }) =>
    ({
        list: search.list,
    })

export default connect(mapStateToProps)(Search)