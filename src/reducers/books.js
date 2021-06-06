import { SEARCH, LANDING_PAGE, CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM, RESET_STATE } from '../constants/actionType'

const books = (state = { books: [] }, action) => {
    switch (action.type) {
        case SEARCH:
            return {
                msg: action.payload.msg,
                search: action.payload.url.query.search,
                sort: action.payload.url.query.sort,
                lower_price: action.payload.url.query.lower_price,
                upper_price: action.payload.url.query.upper_price,
                books: action.payload.results,
                message: action.payload.msg,
                limit: action.payload.count
            }
        // case CREATE_ITEM: {
        //     return {
        //         msg: action.payload.msg,
        //         item: action.payload.results,
        //         books: [...state.books, action.payload.results]
        //     }
        // }
        default:
            return state;
    }
}

const initialState = {};
const item = (state = {}, action) => {
    switch (action.type) {
        case LANDING_PAGE:
            return action.payload;
        case CREATE_ITEM:
            console.log(4567);
            return {
                msg: action.payload.msg,
                item: action.payload.results
            }
        case UPDATE_ITEM:
            return action.payload;
        case DELETE_ITEM:
            return {
                msg: action.payload.msg
            }
        case RESET_STATE:
            return initialState;
        default:
            return state;
    }
}

export { books, item };