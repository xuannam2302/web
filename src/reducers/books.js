import { SEARCH } from '../constants/actionType'

const books = (state = { books: [] }, action) => {
    switch (action.type) {
        case SEARCH:
            return {
                search: action.payload.url.query.search,
                sort: action.payload.url.query.sort,
                lower_price: action.payload.url.query.lower_price,
                upper_price: action.payload.url.query.upper_price,
                books: action.payload.results,
                message: action.payload.msg
            }
        default:
            return state;
    }
}

export default books;