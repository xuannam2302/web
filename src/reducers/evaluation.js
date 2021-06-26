import {
    GET_EVALUATION,
    POST_COMMENT,
    POST_ANSWER,

} from '../constants/actionType'

const getEvaluation = (state = { book_id: undefined, comments: [] }, action) => {
    switch (action.type) {
        case GET_EVALUATION:
            console.log(action.payload);
            return action.payload;
        // case POST_COMMENT: {
        //     const { book_id, comment_id, ratingStars, newComment } = action.payload;
        //     console.log(book_id, ratingStars, newComment);
        //     return state;
        // }

        case POST_ANSWER: {
            const newAnswer = action.payload;
            console.log(newAnswer);
            const old_comments = state.comments;
            console.log(old_comments);
            let new_comments = old_comments.map((comment) => {
                return comment._id === newAnswer.comment_id ? {...comment, answers: comment.answers.unshift("ha ha")} : comment;
            })
            console.log(new_comments);
            return state;
        }
        default:
            return state;
    }
}




export { getEvaluation }