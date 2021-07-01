import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import AnswerList from './AnswerList'
import Like from './Like'

import RatingStar from '../../util/RatingStar'
import { changeTimeStamp } from '../../util/ChangeUnit'
import ToastNotify from '../../util/ToastNotify'
import Toast from '../../util/Toast'
import { toast } from 'react-toastify'

import { likeComment, unlikeComment } from '../../actions/evaluation'
import { findLandingPage } from '../../actions/books'

function checkRatingStar(value) {
    switch (value) {
        case 1:
            return 'Rất không hài lòng';
        case 2:
            return 'Không hài lòng';
        case 3:
            return 'Bình thường';
        case 4:
            return 'Hài lòng';
        case 5:
            return 'Rất hài lòng';
        default:
            return 'Không có đánh giá';
    }
}

const Comment = ({ comment, book_id, handleDeleteComment }) => {
    const dispatch = useDispatch();

    const warningLike = () => toast.warn(<Toast state="Warning" desc="Bạn không thể like đánh giá của mình"/>)

    const { _id: commentID, user_id, content, rating, create_at, answers, likes: comment_likes } = comment;
    const { username, evaluations, likes: user_like, _id: userID } = user_id;
    const [isRepComment, setIsRepComment] = useState(false);
    // const currentUserID = ''
    // if(localStorage.getItem('token-verify'))
    const currentUserID = JSON.parse(localStorage.getItem('token-verify')).id;

    // Handle action like
    const [isLike, setIsLike] = useState(false);
    const [likeList, setLikeList] = useState([]);

    const handleLikeComment = () => {
        if (currentUserID === userID) {
            warningLike()
            return ;
        }
        const state = !isLike;
        setIsLike(state);
        if (state) {
            dispatch(likeComment(book_id, commentID));
        }
        else {
            dispatch(unlikeComment(book_id, commentID));
        }
        dispatch(findLandingPage(book_id));
    }

    useEffect(() => {
        const checkLikeComment = () => {
            let newList = [];
            comment_likes.forEach(like => {
                const { user_id } = like;
                newList.push(user_id.username);
                if (user_id._id === currentUserID)
                    setIsLike(true);
            })
            setLikeList(newList);
        }
        checkLikeComment();
    }, [comment_likes, currentUserID])

    return (
        <div className="evaluation-comment-item">
            <div className="evaluation-comment-item-info">
                <h3 className="evaluation-comment-item-info-author">
                    <i className="fas fa-address-card"></i>
                    <span>{username}</span>
                </h3>
                <div className="evaluation-comment-item-info-control">
                    <i className="fas fa-pen"></i>
                    <span>Đã viết: {evaluations.comments.length} đánh giá</span>
                </div>
                <div className="evaluation-comment-item-info-control">
                    <i className="fas fa-thumbs-up"></i>
                    <span>Đã nhận: {user_like || 0} lượt cảm ơn</span>
                </div>
            </div>
            <div className="evaluation-comment-item-content">
                <div className="evaluation-comment-item-content-header">
                    <div className="evaluation-comment-item-content-header-rating">
                        <RatingStar value={rating} />
                        <span className="evaluation-comment-item-content-header-rating-desc">{checkRatingStar(rating)}</span>
                    </div>
                    <div className="evaluation-comment-item-content-header-create">
                        Đã viết đánh giá vào ngày: <span>{changeTimeStamp(create_at)}</span>
                    </div>
                </div>
                <div className="evaluation-comment-item-content-container">
                    <p
                        type="text"
                        className="evaluation-comment-item-content-container-text"
                    >
                        {content}
                    </p>
                    <div className="evaluation-comment-item-content-container-react">
                        <Like
                            handleLikeComment={handleLikeComment}
                            isLike={isLike}
                            likeList={likeList}
                            comment_likes={comment_likes}
                        />

                        <button
                            className="evaluation-comment-item-content-container-react-reply"
                            onClick={() => setIsRepComment(!isRepComment)}
                        >
                            <span>Trả lời</span>
                            <i className="fas fa-reply"></i>
                        </button>
                        {currentUserID === userID ?
                            <button
                                className="evaluation-comment-item-content-container-react-delete"
                                onClick={() => handleDeleteComment(commentID)}
                            >
                                <span>Xóa</span>
                                <i className="fas fa-trash"></i>
                            </button>
                            :
                            <>
                            </>
                        }
                    </div>
                    <AnswerList
                        answers={answers}
                        isRepComment={isRepComment}
                        username={username}
                        book_id={book_id}
                        comment_id={commentID}
                        setIsRepComment={setIsRepComment}
                    />
                </div>
            </div>
            <ToastNotify />
        </div>
    )
}

export default Comment
