import React from 'react'

const LikeList = ({ likeList }) => {
    return (
        <div className="evaluation-comment-item-content-container-react-like-container-likelist">
            {likeList.map((item, index) => {
                return (
                    <span className="evaluation-comment-item-content-container-react-like-container-likelist-item"
                        key={index}
                    >
                        {item}
                    </span>
                )
            })}
        </div>
    )
}

export default LikeList
