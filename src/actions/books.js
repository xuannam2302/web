import axios from 'axios'
import { SEARCH } from '../constants/actionType'

const url = 'http://localhost:5000';

export const searchFunction = (search = '', sort = 'name', lower_price = '', upper_price = '') => async (dispatch) => {
    try {
        const { data } = await axios.post(`${url}/search?search=${search}&sort=${sort}&low_price=${lower_price}&upper_price=${upper_price}`)
        dispatch({ type: SEARCH, payload: data })
    }
    catch (err) {
        console.log(err.message);
    }
}