import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import PrivateLayout from '../../layouts/private'
import MemberBlock from '../../components/block/member_block'
import { getSortMatch } from '../../actions/members'
import InputInline from '../../components/inputs/InputInline'
import { Router } from '../../routes'
import Pagination from '../../components/pagination'
import BtnMain from '../../components/buttons/btn_main'
import Head from 'next/head'
import BtnUpgradeMembership from '../../components/buttons/btn_upgrade_membership'

class Matches extends Component {
	state = {
		search: {
			sort: 'last_active',
			page: 1
		},
		finish: false,
	}

	componentDidMount() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
		const query = Router.router.query
		const { dispatch } = this.props
		if (query.sort) {
			this.setState({
				search: {
					sort: query.sort
				}
			})
			dispatch(getSortMatch(query.sort, query.page)).then(() => {
				this.setState({ ...this.state, ...{ finish: true } })
			})
		} else {
			dispatch(getSortMatch(this.state.search.sort, this.state.search.page)).then(() => {
				this.setState({ ...this.state, ...{ finish: true } })
			})
		}
	}

	handleChangePage = page => {
		const { search } = this.state
		const { dispatch } = this.props
		let params = {}
		if (Object.keys(search).length) {
			params = search.sort
		}
		dispatch(getSortMatch(params, page))
		Router.pushRoute(`/matches?sort=${params}&page=${page}`)
	}

	renderList = (member, i, user) => {
		return <div key={i} className="col-md-3 col-sm-4 col-6 form-group matches_item_wrap">
			<MemberBlock height={370} member={member} user={user} page="matches" />
		</div>
	}

	editMatches = () => {
		Router.pushRoute('/edit/match')
	}

	handleChange = (field, value) => {
		this.setState({ search: { ...this.state.search, [field]: value } }, () => {
			const { search } = this.state
			const { dispatch } = this.props
			let params = {}
			if (Object.keys(search).length) {
				params = search.sort
			}
			dispatch(getSortMatch(params))
			Router.pushRoute(`/matches?sort=${params}`)
		})
	}

	render() {
		const { people, user } = this.props
		return (
			<Layout page="matches">
				<PrivateLayout>
					<Head page="matches">
						<title>PinaHeart.com</title>
					</Head>
					<div className="pt-15 main_wrap">
						<div className="matches_first d-flex align-items-center justify-content-between form-group flex-wrap">
							<div>
								<BtnMain
									text="Improve Matches"
									onClick={this.editMatches}
									className="btn-outline mr-15 mb-15" />
							</div>
							<div>
								<BtnUpgradeMembership />
							</div>
						</div>
						<div className="matches_second form-group row">
							<div className="col-sm-4">
								<InputInline
									label="Order by:"
									type="select"
									field="sort"
									options={[
										{ id: 'last_active', name: 'Last active' },
										{ id: 'newest', name: 'Newest members' },
										{ id: 'youngest', name: 'Youngest' }
									]}
									onChange={this.handleChange}
									value={this.state.search.sort}
								/>
							</div>
							<div className="col-sm-4">
								<Pagination
									allVisible={true}
									total={people.last_page}
									current={people.current_page}
									onChange={this.handleChangePage} />
							</div>
						</div>
						<div className="row form-group matches_list">
							{
								people.data.map((member, i) => this.renderList(member, i, user))
							}
							{
								this.state.finish && !people.data.length ?
									<div className="form-group title fs-18 bold noMessages">
										Sorry no matches, please adjust your criteria to find more partners.
								</div> : <div></div>
							}
						</div>
						<div className="form-group">
							<Pagination
								allVisible={true}
								total={people.last_page}
								current={people.current_page}
								onChange={this.handleChangePage} />
						</div>
					</div>
				</PrivateLayout>
			</Layout>
		);
	}
}

const mapStateToProps = ({ members, user }) => ({
	people: members.match,
	user: user.data,
})

export default connect(mapStateToProps)(Matches)