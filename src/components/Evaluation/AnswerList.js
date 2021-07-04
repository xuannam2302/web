import React, { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import Answer from './Answer'

import { getAvatarFromUserName } from '../../util/ChangeUnit';
import { isRequired } from '../../util/Validator';

import { postAnswer, deleteAnswer } from '../../actions/evaluation';

const AnswerList = ({ answers, isRepComment, comment_id, book_id, setIsRepComment, socket }) => {
    const dispatch = useDispatch();
    // Get user from data
    const user = useSelector(state => state.auth.user);

    const [repComment, setRepComment] = useState('');
    const [errorRepComment, setErrorRepComment] = useState('');

    const handleReplyComment = (target) => {
        const value = target.value;
        const getError = isRequired(value) || "";
        if (getError) {
            target.classList.add("evaluation-answer-reply-comment-content-text-invalid");
            setErrorRepComment(getError);
            return 1;
        }
        return 0;
    }
    const clearError = (target) => {
        target.classList.remove('evaluation-answer-reply-comment-content-text-invalid');
        setErrorRepComment('');
    }
    const handleReplyCommentSubmit = () => {
        const element = document.querySelector('.evaluation-answer-reply-comment-content-text');
        let check = handleReplyComment(element);
        if (!check) {
            dispatch(postAnswer(book_id, comment_id, repComment, socket));
            setIsRepComment(false);
            setRepComment('');
        }
        else {
            console.log("Error");
        }
    }
    const handleDeleteAnswerSubmit = (answerID) => {
        dispatch(deleteAnswer(book_id, comment_id, answerID, socket));
    }
    return (
        <>
            {isRepComment && user &&
                <>
                    <div className="evaluation-answer-reply-comment">
                        <div className="evaluation-answer-reply-comment-avatar">
                            <span>{getAvatarFromUserName(user.username)}</span>
                        </div>
                        <div className="evaluation-answer-reply-comment-content">
                            <input
                                type="text"
                                className="evaluation-answer-reply-comment-content-text"
                                onChange={(e) => setRepComment(e.target.value)}
                                onBlur={(e) => clearError(e.target)}
                                onKeyUp={(e) => clearError(e.target)}
                                value={repComment}
                                placeholder="Viết gì đó..."
                            />
                            <button
                                className="evaluation-answer-reply-comment-content-icon-send"
                                onClick={handleReplyCommentSubmit}
                            >
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                    <p className="evaluation-answer-reply-comment-content-error">
                        {errorRepComment}
                    </p>
                </>
            }
            <div className="evaluation-answer-list">
                {answers.map((answer, index) => {
                    return (
                        <Answer
                            key={index}
                            answer={answer}
                            handleDeleteAnswerSubmit={handleDeleteAnswerSubmit}
                        />
                    )
                })}
            </div>
        </>
    )
}

export default AnswerList
