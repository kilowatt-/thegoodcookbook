import {GET_FAVOURITES_BEGIN, GET_FAVOURITES_ERROR, GET_FAVOURITES_SUCCESS} from "../actions/favourites";

const INITIAL_STATE = {
    loading: false,
    error: null
};

export const favouritesReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case GET_FAVOURITES_BEGIN:
            return {
                loading: true,
                error: null
            };
        case GET_FAVOURITES_SUCCESS:
            return {
                loading: false,
                error: null
            };
        case GET_FAVOURITES_ERROR:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }

};
