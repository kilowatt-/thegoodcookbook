import {CLOSE_LOGIN, CLOSE_SIGNUP, OPEN_LOGIN, OPEN_SIGNUP} from "../actions/user.js";

export const loginDialogReducer = (isOpen = false, action) => {
    if (action.type === OPEN_LOGIN) {
        return true;
    } else if (action.type === CLOSE_LOGIN) {
        return false;
    } else {
        return isOpen;
    }
};

export const signupDialogReducer = (isOpen = false, action) => {
    if (action.type === OPEN_SIGNUP) {
        return true;
    } else if (action.type === CLOSE_SIGNUP) {
        return false;
    } else {
        return isOpen;
    }
};
