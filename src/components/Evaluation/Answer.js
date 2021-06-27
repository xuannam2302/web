import React from 'react'

import {
    changeTimeStamp,
    changeFullTimeStamp,
    getAvatarFromUserName,
} from '../../util/ChangeUnit'

const Answer = ({ answer, handleDeleteAnserSubmit }) => {
    const currentUserID = JSON.parse(localStorage.getItem('token-verify')).id;
    const { content, create_at, user_id, _id: answerID } = answer;
    const { username, _id: userID } = user_id;

    return (
        <div className="evaluation-answer-item">
            <div className="evaluation-answer-item-avatar">
                <span>{getAvatarFromUserName(username)}</span>
            </div>
            <div className="evaluation-answer-item-content">
                <h3 className="evaluation-answer-item-content-username">
                    {username}
                </h3>
                <p className="evaluation-answer-item-content-text">
                    {content}
                </p>
                <div className="evaluation-answer-item-content-footer">
                    <div className="evaluation-answer-item-content-time">
                        Đã trả lời vào lúc: <span>{changeFullTimeStamp(create_at)}</span> ngày <span>{changeTimeStamp(create_at)}</span>
                    </div>
                    {currentUserID === userID ?
                        <div className="evaluation-answer-item-content-control">
                            <div 
                                className="evaluation-answer-item-content-control-delete"
                                onClick={() => handleDeleteAnserSubmit(answerID)}
                            >
                                <button>
                                    Xóa
                                </button>
                                <i className="fas fa-trash"></i>
                            </div>
                        </div>
                        :
                        <>
                        </>
                    }

                </div>
            </div>
        </div>
    )
}

export default Answer
