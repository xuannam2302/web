import React from 'react'
import { useHistory } from 'react-router-dom'

import url from '../assets/Logo.webp'
const Header = () => {
    const history = useHistory();
    const returnHomePage = () => {
        history.push('/');
    }
    const changeToAbout = () => {
        history.push('/about');
    }
    return (
        <div className="header">
            <div className="container">
                <div className="header-container">
                    <div className="header-logo">
                        <img src={url} alt="Logo" className="header-logo-img" onClick={returnHomePage}/>
                    </div>
                    <div className="header-search">
                        <input
                            type="text"
                            className="header-search-field"
                            placeholder="Nhập tên bạn muốn tìm kiếm"
                        />
                        <div className="header-search-icon">
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