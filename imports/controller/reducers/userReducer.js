import {LOAD_USER} from '../actions/user.js';

const INITIAL_USER = {
	username: '',
	userid: '',
	email: ''
}

export const userReducer = (user = INITIAL_USER, action) => {
	if (action.type === LOAD_USER) {
		return {
			username: action.data.username,
			userid: action.data._id,
			email: action.data.emails[0].address
		}
	}

	else
		return user;
} 