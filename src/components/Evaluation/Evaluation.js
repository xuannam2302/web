import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import Loading from '../Loading';
import Comment from './Comment';
import NewComment from './NewComment';
import { isRequired } from '../../util/Validator';

import { postComment, deleteComment } from '../../actions/evaluation';
import { findLandingPage } from '../../actions/books';

const Evaluation = ({ evaluation }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { comments, book_id } = evaluation;
    const { comment_id } = comments;
    const user = useSelector(state => state.auth.user);

    const myRef = useRef(null);
    const [errorNewComment, setErrorNewComment] = useState('');
    const [newComment, setNewComment] = useState('');
    const [ratingStars, setRatingStars] = useState(5);

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
    const handlePostComment = () => {
        const element = document.querySelector('.evaluation-new-comment-content-text');
        let check = handleNewComment(element);
        if (!check) {
            dispatch(postComment(book_id, newComment, ratingStars, comment_id));
            // Reset page
            setRatingStars(5);
            setNewComment('');
            history.push('/book/' + book_id);
            dispatch(findLandingPage(book_id));
            myRef.current.scrollIntoView();
        }
        else {
            console.log("Error");
        }
    }
    const handleDeleteComment = (comment_id) => {
        dispatch(deleteComment(book_id, comment_id));
        dispatch(findLandingPage(book_id));
    }
    if (comments.length === 0) {
        if (user) {
            return (
                <>
                    <h2 className="evaluation-title" ref={myRef}>
                        Đánh giá của khách hàng ({comments.length})
                    </h2>
                    <NewComment
                        user={user}
                        clearError={clearError}
                        handlePostComment={handlePostComment}
                        errorNewComment={errorNewComment}
                        newComment={newComment}
                        setNewComment={setNewComment}
                        ratingStars={ratingStars}
                        setRatingStars={setRatingStars}
                    />
                </>
            )
        }
        return (
            <Loading />
        )
    }
    return (
        <div className="evaluation">
            <h2 className="evaluation-title" ref={myRef}>
                Đánh giá của khách hàng ({comments.length})
            </h2>
            <div className="evaluation-comment-list">
                {comments.map((comment, index) => {
                    return (
                        <Comment
                            comment={comment}
                            key={index}
                            book_id={book_id}
                            handleDeleteComment={handleDeleteComment}
                        />
                    )
                })}
            </div>
            {user &&
                <NewComment
                    user={user}
                    clearError={clearError}
                    handlePostComment={handlePostComment}
                    errorNewComment={errorNewComment}
                    newComment={newComment}
                    setNewComment={setNewComment}
                    ratingStars={ratingStars}
                    setRatingStars={setRatingStars}
                />
            }
        </div>
    )
}

export default Evaluation
