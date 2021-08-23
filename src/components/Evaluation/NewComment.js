import React from 'react'

import RatingFeedback from '../../util/RatingFeedback'
import { getAvatarFromUserName } from '../../util/ChangeUnit'

const NewComment = ({ user,
    handlePostComment,
    errorNewComment,
    clearError,
    newComment,
    setNewComment,
    ratingStars,
    setRatingStars }) => {
        
        const handlePressEnter = (e) => {
            if(e.keyCode === 13) {
                handlePostComment();
            }
        }

    return (
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
                    onKeyDown={(e) => handlePressEnter(e)}
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
    )
}

export default NewComment
