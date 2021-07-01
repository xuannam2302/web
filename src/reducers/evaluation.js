import {
    GET_EVALUATION,

} from '../constants/actionType'

const getEvaluation = (state = { book_id: undefined, comments: [] }, action) => {
    switch (action.type) {
        case GET_EVALUATION:
            console.log(action.payload);
            return action.payload;
        default:
            return state;
    }
}


export { getEvaluation }