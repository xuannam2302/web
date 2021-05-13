import { FETCH_ALL, SORT, SEARCH, FILTER_PRICE } from '../constants/actionType'

const books = (books = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case SORT:
            return action.payload;
        case SEARCH:
            return action.payload;
        case FILTER_PRICE:
            return action.payload;
        default:
            return books;
    }
}

export default books;