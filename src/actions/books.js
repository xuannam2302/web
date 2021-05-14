import axios from 'axios'
import { MULTI_FILTER, FETCH_ALL } from '../constants/actionType'

const url = 'http://localhost:5000';

export const getBooks = () => async (dispatch) => {
    try {
        const { data } = await axios.get(url);
        dispatch({ type: FETCH_ALL, payload: data });
    }
    catch (err) {
        console.log(err.message);
    }
}

export const multi_filter = (search, sort) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${url}/search?search=${search}&sort=${sort}`)
        dispatch({ type: MULTI_FILTER, payload: data })
    }
    catch (err) {
        console.log(err.message);
    }
}