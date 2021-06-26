import React from 'react'

import {    changeTimeStamp, 
            changeFullTimeStamp,
            getAvatarFromUserName,
} from '../../util/ChangeUnit'

const Answer = ({ answer }) => {
    const { content, create_at, user_id } = answer;
    const { username } = user_id;
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
                <span className="evaluation-answer-item-content-time">
                    Đã trả lời vào lúc: <span>{changeFullTimeStamp(create_at)}</span> ngày <span>{changeTimeStamp(create_at)}</span>
                </span>
            </div>
        </div>
    )
}

export default Answer
