import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import Loading from '../Loading';
import Comment from './Comment'


import { getAvatarFromUserName } from '../../util/ChangeUnit';
import RatingFeedback from '../../util/RatingFeedback'
import { isRequired } from '../../util/Validator';

import { postComment } from '../../actions/evaluation';

import {
    POST_COMMENT,
    POST_ANSWER,
} from '../../constants/actionType'

import io from 'socket.io-client' //

const Evaluation = ({ evaluation }) => {
    const dispatch = useDispatch();

    const { comments, book_id } = evaluation;
    const { comment_id } = comments;
    const user = useSelector(state => state.auth.user);

    const [canCommnet, setCanComment] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [ratingStars, setRatingStars] = useState(5);

    const [errorNewComment, setErrorNewComment] = useState('');

    const handlePostComment = () => {
        const element = document.querySelector('.evaluation-new-comment-content-text');
        let check = handleNewComment(element);
        if (!check) {
            const newCommnet = {
                book_id,
                newComment,
                ratingStars,
                comment_id,
            }

            dispatch(postComment(book_id, newComment, ratingStars, comment_id));
            dispatch({ type: POST_COMMENT, payload: newCommnet });

        }
        else {
            console.log("Error");
        }
    }
    const handleNewComment = (target) => {
        const value = target.value;
        console.log(target, value);
        const getError = isRequired(value) || "";
        if (getError) {
            target.classList.add("evaluation-new-comment-content-text-invalid");
            setErrorNewComment(getError);
            return 1;
        }
        return 0;
    }
    const clearError = (target) => {
        target.classList.remove("evaluation-new-comment-content-text-invalid");
        setErrorNewComment('');
    }
    if (comments.length === 0) {
        return (
            <Loading />
        )
    }
    return (
        <div className="evaluation">
            <h2 className="evaluation-title">
                Đánh giá của khách hàng
            </h2>
            <div className="evaluation-comment-list">
                {comments.map((comment, index) => {
                    return (
                        <Comment
                            comment={comment}
                            key={index}
                            book_id={book_id}
                        />
                    )
                })}
            </div>
            {user && canCommnet &&
                <div className="evaluation-new-comment">
                    <div className="evaluation-new-comment-avatar">
                        <span>{getAvatarFromUserName(user.username)}</span>
                    </div>
                    <div className="evaluation-new-comment-content">
                        <input
                            type="text"
                            className="evaluation-new-comment-content-text"
                            onChange={(e) => setNewComment(e.target.value)}
                            onKeyUp={(e) => clearError(e.target)}
                            onBlur={(e) => clearError(e.target)}
                            value={newComment}
                            placeholder="Viết đánh giá gì đó..."
                        />
                        <p className="evaluation-new-comment-content-error">
                            {errorNewComment}
                        </p>
                        <div className="evaluation-new-comment-content-rating">
                            <span className="evaluation-new-comment-content-rating-text">Độ hài lòng đối với sản phẩm</span>
                            <RatingFeedback
                                ratingStars={ratingStars}
                                setRatingStars={setRatingStars}
                            />
                        </div>
                    </div>
                    <button
                        className="evaluation-new-comment-submit"
                        onClick={handlePostComment}
                    >
                        Submit
                    </button>
                </div>
            }
        </div>
    )
}

export default Evaluation
