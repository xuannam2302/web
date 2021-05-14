import { FETCH_ALL, SORT, SEARCH, FILTER_PRICE } from '../constants/actionType'

const books = (state = {books: []}, action) => {
    switch (action.type) {
        case FETCH_ALL: {
            console.log(action);
            return {
                books: action.payload.results,
                url: action.payload.url
            }
        }
        case SORT:
            return {
                books: action.payload.results,
                url: action.payload.url
            }
        case SEARCH:
            console.log(action.payload.url);
            return {
                books: action.payload.results,
                url: action.payload.url
            }
        case FILTER_PRICE:
            return action.payload;
        default:
            return state;
    }
}

export default books;