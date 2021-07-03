import EvaluationService from "../services/evaluation.service";

import showErrorMessage from './general'

import {
    SET_MESSAGE,

} from "../constants/actionType";

export const postComment = (_id, comment, rating_starts, comment_id, socket) => (dispatch) => {
    return EvaluationService.post_comment(_id, comment, rating_starts, comment_id).then(
        (data) => {
            console.log(data);
            socket.emit('create_comment', {_id, comment, rating_starts, comment_id});
            return Promise.resolve();
        },
        (error) => {
            const message = showErrorMessage(error);
            console.log(message);
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
            console.log(message);
            dispatch({type: SET_MESSAGE, payload: message})
            return Promise.reject();
        }
    )
}

export const deleteComment = (_id, comment_id, socket) => (dispatch) => {
    return EvaluationService.delete_comment(_id, comment_id).then(
        (data) => {
            console.log(data);
            socket.emit('create_comment', {_id});
            return Promise.resolve();
        },
        (error) => {
            const message = showErrorMessage(error);
            console.log(message);
            dispatch({type: SET_MESSAGE, payload: message})
            return Promise.reject();
        }
    )
}

export const deleteAnswer = (_id, comment_id, answer_id) => (dispatch) => {
    return EvaluationService.delete_answer(_id, comment_id, answer_id).then(
        (data) => {
            console.log(data);

            return Promise.resolve();
        },
        (error) => {
            const message = showErrorMessage(error);
            console.log(message);
            dispatch({type: SET_MESSAGE, payload: message})
            return Promise.reject();
        }
    )
}

export const likeComment = (_id, comment_id) => (dispatch) => {
    return EvaluationService.like_comment(_id, comment_id).then(
        (data) => {
            console.log(data);
            
            return Promise.resolve();
        },
        (error) => {
            const message = showErrorMessage(error);
            console.log(message);
            dispatch({type: SET_MESSAGE, payload: message})
            return Promise.reject();
        }
    )
}

export const unlikeComment = (_id, comment_id) => (dispatch) => {
    return EvaluationService.unlike_comment(_id, comment_id).then(
        (data) => {
            console.log(data);
            
            return Promise.resolve();
        },
        (error) => {
            const message = showErrorMessage(error);
            console.log(message);
            dispatch({type: SET_MESSAGE, payload: message})
            return Promise.reject();
        }
    )
}