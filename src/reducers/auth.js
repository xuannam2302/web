import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    GET_INFORMATION,
    REFRESH_TOKEN,
} from "../constants/actionType";

const Auth = (state = { isLoggedIn: false, user: {} }, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_INFORMATION: {
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user
            }
        }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
            };
        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case REFRESH_TOKEN: {
            return {

            }
        }
        default:
            return state;
    }
}

export default Auth;