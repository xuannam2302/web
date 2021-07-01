import React from 'react'

import LikeList from './LikeList'

const Like = ({ comment_likes, handleLikeComment, isLike, likeList }) => {

    return (
        <div className="evaluation-comment-item-content-container-react-like-container">
            <button
                className={`evaluation-comment-item-content-container-react-like 
                                            ${isLike ? "evaluation-comment-item-content-container-react-unlike" : ""}  `}
                onClick={handleLikeComment}
            >
                <span>{!isLike ? 'Thích' : 'Bỏ thích'} ({comment_likes.length})</span>
                <i className="far fa-thumbs-up"></i>
            </button>
            {likeList.length > 0 &&
                <LikeList
                    likeList={likeList}
                />
            }
        </div>
    )
}

export default Like
