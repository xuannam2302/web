import React, {useState} from 'react'
import AnswerList from './AnswerList'

import RatingStar from '../../util/RatingStar'
import { changeTimeStamp } from '../../util/ChangeUnit'

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

const Comment = ({ comment, book_id }) => {
    const { _id, user_id, content, rating, create_at, answers, like } = comment;
    const { username, evaluations, likes } = user_id;
    const [isRepComment, setIsRepComment] = useState(false);


    return (
        <div className="evaluation-comment-item">
            <div className="evaluation-comment-item-info">
                <h3 className="evaluation-comment-item-info-author">
                    <i className="fas fa-address-card"></i>
                    <span>{username}</span>
                </h3>
                <div className="evaluation-comment-item-info-control">
                    <i className="fas fa-pen"></i>
                    <span>Đã viết: {evaluations || 0} đánh giá</span>
                </div>
                <div className="evaluation-comment-item-info-control">
                    <i className="fas fa-thumbs-up"></i>
                    <span>Đã nhận: {likes || 0} lượt cảm ơn</span>
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
                        <button
                            className="evaluation-comment-item-content-container-react-like"
                        >
                            <span>Thích</span>
                            <i className="far fa-thumbs-up"></i>
                        </button>
                        <button
                            className="evaluation-comment-item-content-container-react-reply"
                            onClick={() => setIsRepComment(!isRepComment)}
                        >
                            <span>Trả lời</span>
                            <i className="fas fa-reply"></i>
                        </button>
                    </div>
                    <AnswerList 
                        answers={answers} 
                        isRepComment={isRepComment}
                        username={username}
                        book_id={book_id}
                        comment_id={_id}
                    />
                </div>
            </div>
        </div>
    )
}

export default Comment
