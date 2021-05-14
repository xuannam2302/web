import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { multi_filter } from '../actions/books'

import url_icon from '../assets/Logo.webp'
const Header = () => {
    const data = useSelector(state => state.books);
    const {url, books} = data;
    const history = useHistory();
    const dispatch = useDispatch();
    const [searchKey, setSeearchKey] = useState('');
    const returnHomePage = () => {
        history.push('/');
    }
    const changeToAbout = () => {
        history.push('/about');
    }
    const handleSearch = () => {
        // dispatch(multi_filter(searchKey, ''));
    }
    return (
        <div className="header">
            <div className="container">
                <div className="header-container">
                    <div className="header-logo">
                        <img src={url_icon} alt="Logo" className="header-logo-img" onClick={returnHomePage} />
                    </div>
                    <div className="header-search">
                        <input
                            type="text"
                            className="header-search-field"
                            placeholder="Nhập tên bạn muốn tìm kiếm"
                            value={searchKey}
                            onChange={(e) => setSeearchKey(e.target.value)}
                        />
                        <div className="header-search-icon" onClick={handleSearch}>
                            <i class="fas fa-search"></i>
                        </div>
                    </div>
                    <ul className="header-menu">
                        <li className="header-item" onClick={returnHomePage}>Trang chủ</li>
                        <li className="header-item" onClick={changeToAbout}>Về chúng tôi</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header;