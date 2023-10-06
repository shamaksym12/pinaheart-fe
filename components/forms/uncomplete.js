import InputInline from '../inputs/InputInline'
import BtnMain from '../buttons/btn_main'
import { connect } from 'react-redux'
import { setUserParams, saveUncomplete, setUserInfo } from '../../actions/user'
import { toggleModal } from '../../actions/ui'
import { Router } from '../../routes'

const Uncomplete = ({dispatch, user, activeMember, targetPage}) => {
	const handleChange = (field, value) => {
		dispatch(setUserParams({[field]: value}))
	}
	const save = () => {
		const data = {
			heading: user.heading,
			about: user.about,
			looking: user.looking,
		}
		dispatch(saveUncomplete(data)).then(success => {
			if (success) {
                dispatch(setUserInfo({filled_info: true}))
                Router.pushRoute(targetPage)
                dispatch(toggleModal(false, 'uncomplete'))
			}
		})
	}
	return 	<div>
				<div className="text-center title">
					Attract more singles by answering the following questions about yourself:
				</div>
				<InputInline
					icon={false}
                    value={user.heading}
                    field="heading"
                    onChange={handleChange}
                    label="Your profile heading:" />
                <InputInline
                	icon={false}
                    value={user.about}
                    field="about"
                    onChange={handleChange}
                    label="A little about yourself:"
                    type="textarea" />
                <InputInline
                	icon={false}
                    label="What are you looking in a partner:"
                    value={user.looking}
                    field="looking"
                    onChange={handleChange}
                    type="textarea" />
            	<div className="text-center">
                    <BtnMain text="Submit" className="btn-green" onClick={save} />
                </div>
                <style jsx>{`
                	.title {
                		font-size: 18px;
                		margin-top: -20px;
                		margin-bottom: 25px;
                	}
            	`}
                </style>
			</div>
}

const mapStateToProps = ({user, members, ui}) => {
    return  {
                user: user.params,
                activeMember: members.activeMember,
                targetPage: ui.targetPage,
            }
}

export default connect(mapStateToProps)(Uncomplete)