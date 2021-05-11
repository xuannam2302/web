import { FETCH_ALL, FILTER, SEARCH } from '../constants/actionType'

const books = (books = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case FILTER:
            return action.payload;
        case SEARCH:
            return action.payload;
        default:
            return books;
    }
}

export default books;