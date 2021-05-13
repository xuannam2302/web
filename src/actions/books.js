import * as api from '../api/index'
import { FETCH_ALL, SORT, SEARCH, FILTER_PRICE } from '../constants/actionType'

export const getBooks = () => async (dispatch) => {
    try {
        const { data } = await api.fetchBooks();
        dispatch({ type: FETCH_ALL, payload: data });
    }
    catch (err) {
        console.log(err.message);
    }
}

export const sort = (type, books) => async (dispatch) => {
    try {
        const { data } = await api.sort(type, books);
        dispatch({ type: SORT, payload: data });
    }
    catch (err) {
        console.log(err.message);
    }
}

export const search = (value, books) => async (dispatch) => {
    try {
        const { data } = await api.search(value, books);
        dispatch({ type: SEARCH, payload: data })
    }
    catch (err) {
        console.log(err.message);
    }
}

export const filterPrice = (lower_price, upper_price, books) => async (dispatch) => {
    try {
        const { data } = await api.filterPrice(lower_price, upper_price, books);
        dispatch({ type: FILTER_PRICE, payload: data })
    }
    catch (err) {
        console.log(err.message);
    }
}