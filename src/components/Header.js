import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { searchFunction } from '../actions/books'

import Menu from './Profile/Menu';

import url_icon from '../assets/Logo.webp';

const Header = () => {
    // Global Variavles
    const history = useHistory();
    const dispatch = useDispatch();

    // Component State
    const auth = useSelector(state => state.auth);
    const { isLoggedIn, user } = auth;

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
    const linkToLogin = () => {
        history.push('/auth/login');
    }
    const linkToRegister = () => {
        history.push('/auth/register');
    }

    // Render
    return (
        <div className="header">
            <div className="container">
                <div className="header-container">
                    <div className="header-logo">
                        <Link to="/">
                            <img
                                src={url_icon}
                                alt="Logo"
                                className="header-logo-img"
                            />
                        </Link>
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
                        <li
                            className="header-item"
                            onClick={returnHomePage}>Trang chủ
                        </li>
                        <li
                            className="header-item"
                            onClick={changeToAbout}>Về chúng tôi
                        </li>
                        <li className="header-item header-indentify">
                            <i class="fas fa-user-circle"></i>
                            {isLoggedIn === false ?
                                <>
                                    <button
                                        className="header-item-log-in"
                                        onClick={linkToLogin}
                                    >
                                        <p>Đăng nhập</p>
                                    </button>
                                    <button
                                        className="header-item-register"
                                        onClick={linkToRegister}
                                    >
                                        <p>Đăng ký</p>
                                    </button>
                                </>
                                :
                                <>
                                    <div className="header-info">
                                        <h3 className="header-info-username">
                                            {user.username}
                                        </h3>
                                        <div className="header-setting">
                                            <i class="fas fa-cog header-config"></i>
                                            <Menu user={user}/>
                                        </div>
                                    </div>
                                </>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header;