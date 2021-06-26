import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    RESEND_VERIFY,
    GET_INFORMATION,

} from "../constants/actionType";

import AuthService from "../services/auth.service";
import showErrorMessage from './general'

export const register = (username, email, password) => (dispatch) => {
    return AuthService.register(username, email, password).then(
        (response) => {
            dispatch({
                type: REGISTER_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.msg,
            });

            return Promise.resolve();
        },
        (error) => {
            const message = showErrorMessage(error);

            dispatch({
                type: REGISTER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(
        (data) => {
            const { send_back, unsend_back } = data;
            localStorage.setItem('token-verify', JSON.stringify(send_back));

            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: unsend_back },
            });

            dispatch({
                type: SET_MESSAGE,
                payload: unsend_back.msg,
            });

            return Promise.resolve();
        },
        (error) => {
            const message = showErrorMessage(error);

            dispatch({
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    )
};

export const logout = () => (dispatch) => {
    AuthService.logout();

    dispatch({
        type: LOGOUT,
    });
};

export const resendVerify = (username) => (dispatch) => {
    return AuthService.resend_verify(username)
        .then(
            (data) => {
                dispatch({
                    type: RESEND_VERIFY,
                });

                dispatch({ type: SET_MESSAGE, payload: data.msg })

                return Promise.resolve();
            },
            (error) => {
                const message = showErrorMessage(error);

                dispatch({ type: SET_MESSAGE, payload: message });

            })
        .catch(error => console.log(error.message))
}

export const getInformation = () => (dispatch) => {
    return AuthService.get_information()
        .then(
            (data) => {
                console.log(data);

                dispatch({
                    type: GET_INFORMATION,
                    payload: { user: data },
                });

                return Promise.resolve();
            },
            (error) => {
                const message = showErrorMessage(error);
                console.log(message);

                dispatch({ type: SET_MESSAGE, payload: message });

                return Promise.reject();
            }
        )
}

export const refreshToken = (id, refresh_token) => (dispatch) => {
    return AuthService.refresh_token(id, refresh_token)
        .then(
            (data) => {

                localStorage.removeItem('token-verify');
                localStorage.setItem('token-verify', JSON.stringify(data));

                return Promise.resolve();
            })
        .catch(
            (error) => {
                const message = showErrorMessage(error);
                console.log(message);

                dispatch({ type: SET_MESSAGE, payload: message });

                return Promise.reject();
            })
}