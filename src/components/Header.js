import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { searchFunction } from '../actions/books'

import { getQuantity } from '../actions/cart'

import Menu from './Profile/Menu';

const Header = () => {
    // Global Variavles
    const history = useHistory();
    const dispatch = useDispatch();
    const amount = useSelector(state => state.get_quantity);

    const auth = useSelector(state => state.auth);
    const { isLoggedIn, user } = auth;

    useEffect(() => {
        dispatch(getQuantity());
    }, [dispatch, isLoggedIn])

    // Component State
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
        dispatch(searchFunction(m_search, sort, lower_price, upper_price, 1));
        history.push(`/search?search=${m_search}&sort=${sort}&lower_price=${lower_price}&upper_price=${upper_price}&page=1`);
    }
    const linkToLogin = () => {
        history.push('/auth/login');
    }
    const linkToRegister = () => {
        history.push('/auth/register');
    }
    const linkToCart = () => {
        history.push('/cart');
    }
    const handleOnKeyUp = (e) => {
        const keyCode = e.keyCode;
        if(keyCode === 13) {
            handleSearch();
        }
    }
    // Render
    return (
        <div className="header">
            <div className="container">
                <div className="header-container">
                    <div className="header-logo">
                        <Link to="/">
                            <img
                                src="https://images.unsplash.com/photo-1562307534-a03738d2a81a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80"
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
                            onKeyUp={e => handleOnKeyUp(e)}
                        />
                        <div className="header-search-icon" onClick={handleSearch}>
                            <i className="fas fa-search"></i>
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
                            <i className="fas fa-user-circle"></i>
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
                                            <i className="fas fa-caret-down header-config"></i>
                                            <Menu user={user} />
                                        </div>
                                    </div>
                                </>
                            }
                        </li>
                        <li
                            className="header-item-cart"
                            onClick={linkToCart}
                        >
                            <i className="fas fa-shopping-cart"></i>
                            <span className="header-item-cart-amount">{amount}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header;