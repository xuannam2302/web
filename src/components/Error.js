import React from 'react'
import { useHistory } from 'react-router-dom'

import {useDispatch} from 'react-redux'
import { searchFunction } from '../actions/books'
import url from '../assets/error.webp'
const Error = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const returnHomePage = () => {
        history.push('/');
        dispatch(searchFunction(''));
    }
    const changeToAbout = () => {
        history.push('/about')
    }
    return (
        <div className="error">
            <h2 className="error-title">Không tìm thấy kết quả</h2>
            <img src={url} alt="Error Page" className="error-img" />
            <ul className="error-list">
                <li className="error-item" onClick={returnHomePage}>Trang chủ</li>
                <li className="error-item" onClick={changeToAbout}>Về chúng tôi</li>
            </ul>
        </div>
    )
}

export default Error
