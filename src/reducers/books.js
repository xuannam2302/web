import { MULTI_FILTER, FETCH_ALL } from '../constants/actionType'

const books = (state = { books: [] }, action) => {
    switch (action.type) {
        case FETCH_ALL: {
            return{ 
                url: action.payload.url,
                books: action.payload.results 
            }
        }
        case MULTI_FILTER:
            return {
                url: action.payload.url,
                books: action.payload.results
            }
        default:
            return state;
    }
}

export default books;