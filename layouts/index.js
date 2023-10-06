import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '../components/header'
import Footer from '../components/footer'
import Alert from '../components/alert'
import loadable from '@loadable/component'
import { getImage } from '../utils'

const MainModal = loadable(() => import('../components/modal'))
const Credits = loadable(() => import('../components/forms/credits'))

class Layout extends Component {
    componentDidMount() {
        console.log('mount public')
    }
	render() {
		const { children, credits, country, token, active, userAgent, page, status, handleMessageMode, clearForm, setLink, toggleBlock, is_block, link, user_address, confirmDeletePhoto, cancelDeletePhoto, setMain, photos, isMain } = this.props
		return (
			<div>
				<header>
					<Header page={page} userAgent={userAgent} status={status} handleMessageMode={handleMessageMode} toggleBlock={toggleBlock} is_block={is_block} clearForm={clearForm} setLink={setLink} user_address={user_address} setMain={setMain} cancelDeletePhoto={cancelDeletePhoto} confirmDeletePhoto={confirmDeletePhoto} photos={photos} isMain={isMain} />
			    </header>
			    <main 
                    className="main-layout">
			      { children }
			    </main>
			    <footer className="only_desktop">
			    	<Footer />
			    </footer>
                {
                    credits
                    ?   <MainModal
                            body={<Credits />}
                            title="Dibs"
                            show={credits}
                            keyModal="credits" />
                    :   null
                }
                <Alert />
		    </div>
		)
	}
}

const mapStateToProps = state =>
    ({
        credits: state.ui.modals.credits,
        token: state.user.token,
        country: state.signup.country,
        active: state.user.data.active,
    })

export default connect(mapStateToProps)(Layout)