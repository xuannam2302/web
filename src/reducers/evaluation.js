import {
    GET_EVALUATION,
    POST_COMMENT,
    POST_ANSWER,

} from '../constants/actionType'

const getEvaluation = (state = { book_id: undefined, comments: [] }, action) => {
    switch (action.type) {
        case GET_EVALUATION:
            return action.payload;
        case POST_COMMENT: {
            const { book_id, comment_id, ratingStars, newComment } = action.payload;
            console.log(book_id, ratingStars, newComment);
            // return state;
        }

        case POST_ANSWER: {

            // return state;
        }
        default:
            return state;
    }
}




export { getEvaluation }