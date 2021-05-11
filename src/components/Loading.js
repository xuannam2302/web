import React from 'react'
import Loader from 'react-spinners/ClipLoader'

const Loading = () => {
    return (
        <div className="container">
            <div className="loading">
                <Loader />
            </div>
        </div>
    )
}

export default Loading
