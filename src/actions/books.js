import axios from 'axios'
import {
    SEARCH,
    LANDING_PAGE,
    CREATE_ITEM,
    UPDATE_ITEM,
    DELETE_ITEM,
    RESET_STATE,
    DISPLAY_ALL,
    SET_MESSAGE,
    GET_EVALUATION,

} from '../constants/actionType';

import AdminService from '../services/admin.service';
import authHeader from '../services/auth-header';
import showErrorMessage from './general'

const url = 'http://localhost:5000';

export const searchFunction = (search = '', sort = '', lower_price = '', upper_price = '', page = 1) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${url}/search?search=${search}&sort=${sort}&lower_price=${lower_price}&upper_price=${upper_price}&page=${page}`)
        dispatch({ type: SEARCH, payload: data })
    }
    catch (err) {
        console.log(err.message);
    }
}

export const findLandingPage = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${url}/book/${id}`, {
            headers: authHeader()
        });
        const { book, evaluation } = data;
        console.log(data);

        dispatch({ type: LANDING_PAGE, payload: book });
        dispatch({ type: GET_EVALUATION, payload: evaluation })

    }
    catch (error) {
        const message = showErrorMessage(error);
        console.log(message);

        dispatch({ type: SET_MESSAGE, payload: message})
    }
}

export const createItem = (newItem) => (dispatch) => {
    return AdminService.create_item(newItem).then(
        (data) => {
            dispatch({ type: CREATE_ITEM, payload: data });

            return Promise.resolve()
        },
        (error, dispatch) => {
            const message = showErrorMessage(error);

            console.log(message);
            dispatch({ type: SET_MESSAGE, payload: message });

            return Promise.reject();
        }
    )
}

export const updateItem = (id, newItem) => (dispatch) => {
    return AdminService.update_item(id, newItem).then(
        (data) => {
            dispatch({ type: UPDATE_ITEM, payload: data });
        },
        (error) => {
            const message = showErrorMessage(error);

            console.log(message);
            dispatch({ type: SET_MESSAGE, payload: message });

            return Promise.reject();
        }
    )
}

export const deleteItem = (id) => (dispatch) => {
    return AdminService.delete_item(id).then(
        (data) => {
            dispatch({ type: DELETE_ITEM, payload: data });

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

export const displayAll = () => (dispatch) => {
    return AdminService.display_all()
        .then(
            (data) => {
                dispatch({ type: DISPLAY_ALL, payload: data })

                return Promise.resolve();
            },
            (error) => {
                const message = showErrorMessage(error);

                console.log(message);
                dispatch({ type: SET_MESSAGE, payload: message });

                return Promise.reject();

            })
}

export const resetState = () => (dispatch) => {
    dispatch({ type: RESET_STATE, payload: {} });
}