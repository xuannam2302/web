import {
    SEARCH,
    LANDING_PAGE,
    CREATE_ITEM,
    UPDATE_ITEM,
    DELETE_ITEM,
    RESET_STATE,
    DISPLAY_ALL,
    START_LOADING,
    END_LOADING,
} from '../constants/actionType'

const books = (state = { books: [], isLoading: false }, action) => {
    switch (action.type) {
        case START_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case END_LOADING:
            return {
                ...state,
                isLoading: false,
            }
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
        default:
            return state;
    }
}

const initialState = {
    msg: "",
    book_history: [],
    current_book: {}
};
const item = (state = initialState, action) => {
    switch (action.type) {
        case LANDING_PAGE:
            console.log(state.book_history);
            return {
                ...state,
                current_book: action.payload,
                book_history: [...state.book_history, action.payload],
            }
        case CREATE_ITEM:
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
            return {
                ...state,
                current_book: {}
            }
        default:
            return state;
    }
}

const data = (state = { books: [] }, action) => {
    switch (action.type) {
        case DISPLAY_ALL:
            return { books: action.payload.results }
        default:
            return state;
    }

}

export { books, item, data };