export const GET_FAVOURITES_BEGIN = "GET_FAVOURITES_BEGIN";
export const GET_FAVOURITES_SUCCESS = "GET_FAVOURITES_SUCCESS";
export const GET_FAVOURITES_ERROR = "GET_FAVOURITES_ERROR";

export const getFavouritesBegin = () => {
    return {
        type: GET_FAVOURITES_BEGIN
    }
};

export const getFavouritesSuccess = () => {
    return {
        type: GET_FAVOURITES_SUCCESS
    }
};

export const getFavouritesError = (err) => {
    return {
        type: GET_FAVOURITES_ERROR,
        payload: err
    }
};