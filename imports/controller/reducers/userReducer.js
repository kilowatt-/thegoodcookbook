import {LOAD_USER, OPEN_LOGIN, CLOSE_LOGIN, OPEN_SIGNUP, CLOSE_SIGNUP} from '../actions/user.js';

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

export const loginDialogReducer = (isOpen = false, action) => {
	if (action.type === OPEN_LOGIN) {
		return true;
	} else if (action.type === CLOSE_LOGIN) {
		return false;
	} else {
		return isOpen;
	}
}

export const signupDialogReducer = (isOpen = false, action) => {
	if (action.type === OPEN_SIGNUP) {
		return true;
	} else if (action.type === CLOSE_SIGNUP) {
		return false;
	} else {
		return isOpen;
	}
}
