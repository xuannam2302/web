import EvaluationService from "../services/evaluation.service";

import showErrorMessage from './general'

import {
    SET_MESSAGE,

} from "../constants/actionType";

export const postComment = (_id, comment, rating_starts, comment_id) => (dispatch) => {
    return EvaluationService.post_comment(_id, comment, rating_starts, comment_id).then(
        (data) => {
            console.log(data);

            return Promise.resolve();
        },
        (error) => {
            const message = showErrorMessage(error);
            dispatch({type: SET_MESSAGE, payload: message})
            return Promise.reject();
        }
    )
}

export const postAnswer = (_id, comment_id, answer) => (dispatch) => {
    return EvaluationService.post_answer(_id, comment_id, answer).then(
        (data) => {
            console.log(data);

            return Promise.resolve();
        },
        (error) => {
            const message = showErrorMessage(error);
            dispatch({type: SET_MESSAGE, payload: message})
            return Promise.reject();
        }
    )
}