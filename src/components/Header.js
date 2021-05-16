import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { searchFunction } from '../actions/books'

import url_icon from '../assets/Logo.webp'
const Header = () => {
    // Global Variavles
    const history = useHistory();
    const dispatch = useDispatch();
    const { search, sort, lower_price, upper_price } = useSelector(state => state.books);
    const [m_search, setM_Search] = useState(search === undefined ? '' : search);
    // Function handler
    const returnHomePage = () => {
        history.push('/');
    }
    const changeToAbout = () => {
        history.push('/about');
    }
    const handleSearch = () => {
        console.log(m_search, sort, lower_price, upper_price);
        dispatch(searchFunction(m_search, sort, lower_price, upper_price));
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
                            value={m_search}
                            onChange={(e) => setM_Search(e.target.value)}
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