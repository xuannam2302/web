import React from 'react';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'

import { logout } from '../../actions/auth'
import { RESET_QUANTITY } from '../../constants/actionType';

const Menu = ({ user }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const isAdmin = user.admin;
    // const isUser = user.user;
    // const isManager = user.manager;

    const handleLogout = () => {
        dispatch(logout());
        dispatch({ type: RESET_QUANTITY })
        history.push('/');
    }
    const linkToProfile = () => {
        history.push('/user/profile');
    }
    const linkToAdminPage = () => {
        history.push('/admin');
    }
    const linkToLuckyDraw = () => {
        history.push('/promotion/luckydraw')
    }
    const linkToWheel = () => {
        history.push('/promotion/wheel')
    }

    return (
        <ul className="header-dropdown-menu">
            <li className="header-dropdown-item header-dropdown-item-1" onClick={linkToProfile}>
                <span>Hồ sơ của tôi</span>
                <i className="fas fa-id-badge"></i>
            </li>
            <li className="header-dropdown-item header-dropdown-item-1" onClick={linkToWheel}>
                <span>Quay số</span>
                <i className="fas fa-dharmachakra"></i>
            </li>
            {isAdmin ?
                <>
                    <li className="header-dropdown-item header-dropdown-item-1" onClick={linkToAdminPage}>
                        <span>Admin Page</span>
                        <i className="fas fa-file-alt"></i>
                    </li>
                    <li className="header-dropdown-item header-dropdown-item-1" onClick={linkToLuckyDraw}>
                        <span>Lucky draw</span>
                        <i className="fas fa-users-cog"></i>
                    </li>

                </>
                :
                <>
                </>
            }

            <li className="header-dropdown-item header-dropdown-item-3 header-item-logout" onClick={handleLogout}>
                <span>Đăng xuất</span>
                <i className="fas fa-sign-out-alt"></i>
            </li>
        </ul>
    )
}

export default Menu;
