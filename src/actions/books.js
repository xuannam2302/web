import * as api from '../api/index'
import { FETCH_ALL, FILTER , SEARCH} from '../constants/actionType'

export const getBooks = () => async (dispatch) => {
    try {
        const { data } = await api.fetchBooks();
        dispatch({ type: FETCH_ALL, payload: data });
    }
    catch (err) {
        console.log(err.message);
    }
}

export const filterBy = (type) => async (dispatch) => {
    try {
        const { data } = await api.filterBy(type);
        dispatch({ type: FILTER, payload: data });
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