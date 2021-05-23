import axios from 'axios'
import { SEARCH, LANDING_PAGE, CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM } from '../constants/actionType'

const url = 'http://localhost:5000';

export const searchFunction = (search = '', sort = 'name', lower_price = '', upper_price = '') => async (dispatch) => {
    try {
        const { data } = await axios.post(`${url}/search?search=${search}&sort=${sort}&lower_price=${lower_price}&upper_price=${upper_price}`)
        dispatch({ type: SEARCH, payload: data })
    }
    catch (err) {
        console.log(err.message);
    }
}

export const findLandingPage = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${url}/book/${id}`);
        dispatch({ type: LANDING_PAGE, payload: data })
    }
    catch (err) {
        console.log(err.message);
    }
}

export const createItem = (newItem) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${url}/manage/create`, newItem);
        dispatch({ type: CREATE_ITEM, payload: data })
    }
    catch (err) {
        console.log(err.message);
    }
}

export const updateItem = (id, newItem) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${url}/manage/update/${id}`, newItem);
        dispatch({ type: UPDATE_ITEM, payload: data })
    }
    catch (err) {
        console.log(err.message);
    }
}

export const deleteItem = (id) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${url}/manage/delete/${id}`);
        dispatch({ type: DELETE_ITEM, payload: data })
    }
    catch (err) {
        console.log(err.message);
    }
}