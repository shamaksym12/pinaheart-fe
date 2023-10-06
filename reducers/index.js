import { combineReducers } from 'redux'
import signup from './signup.js'
import members from './members.js'
import ui from './ui.js'
import user from './user.js'
import options from './options.js'
import shop from './shop.js'
import message from './message.js'
import membership from './membership.js'
import chat from './chat.js'
import search from './search.js'
import dialog from './dialog.js'
import payment from './payment';
import notifications from './notifications';

const reducer = combineReducers({
	user,
	signup,
	members,
	ui,
	options,
	shop,
	message,
	membership,
	chat,
	search,
	dialog,
	payment,
	notifications,
});

export default reducer