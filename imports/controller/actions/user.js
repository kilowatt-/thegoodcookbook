export const CLOSE_LOGIN = "CLOSE_LOGIN";
export const closeLoginDialog = () => {
    return {
        type: CLOSE_LOGIN
    }
};

export const CLOSE_SIGNUP = "CLOSE_SIGNUP";
export const closeSignupDialog = () => {
    return {
        type: CLOSE_SIGNUP
    }
};

export const OPEN_LOGIN = "OPEN_LOGIN";
export const openLoginDialog = () => {
    return {
        type: OPEN_LOGIN
    }
};

export const OPEN_SIGNUP = "OPEN_SIGNUP";
export const openSignupDialog = () => {
    return {
        type: OPEN_SIGNUP
    }
};
