import * as api from '../api/index'
import axios from 'axios'
import { FETCH_ALL, SORT, SEARCH, FILTER_PRICE } from '../constants/actionType'

const url = 'http://localhost:5000';

export const getBooks = () => async (dispatch) => {
    try {
        const { data } = await api.fetchBooks();
        dispatch({ type: FETCH_ALL, payload: data });
    }
    catch (err) {
        console.log(err.message);
    }
}

export const sort = (value) => async (dispatch) => {
    try {
        const { data } = await api.sort(value);
        dispatch({ type: SORT, payload: data });
    }
    catch (err) {
        console.log(err.message);
    }
}

export const search = (value) => async (dispatch) => {
    try {
        const { data } = await api.search(value);
        dispatch({ type: SEARCH, payload: data })
    }
    catch (err) {
        console.log(err.message);
    }
}

export const filterPrice = (lower_price, upper_price) => async (dispatch) => {
    try {
        const { data } = await api.filterPrice(lower_price, upper_price);
        dispatch({ type: FILTER_PRICE, payload: data })
    }
    catch (err) {
        console.log(err.message);
    }
}