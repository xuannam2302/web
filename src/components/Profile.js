import React from 'react'
import { useSelector } from 'react-redux'

import Loading from '../components/Loading'

const Profile = () => {
    const auth = useSelector(state => state.auth);
    const { isLoggedIn, user } = auth;

    if (!isLoggedIn) {
        return (
            <Loading />
        )
    }

    const authorityAdmin = user.admin;
    const authorityUser = user.user;
    const authorityManager = user.manager;

    const displayAuthority = () => {
        if (authorityAdmin)
            return "Admin";
        if (authorityUser)
            return "User";
        if (authorityManager)
            return "Manager";
    }
    
    return (
        <div className="container">
            <div className="profile">
                <div className="profile-container">
                    <h2 className="profile-title">Thông tin tài khoản</h2>
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />
                    <div className="profile-content">
                        <div className="profile-content-group">
                            <h3 className="profile-label">
                                Tên đăng nhập
                            </h3>
                            <input className="profile-username"
                                value={user.username}
                                readOnly
                            />
                        </div>
                        <div className="profile-content-group">
                            <h3 className="profile-label">
                                Email
                            </h3>
                            <input className="profile-email"
                                value={user.email}
                                readOnly
                            />
                        </div>
                        <div className="profile-content-group">
                            <h3 className="profile-label">Authority</h3>
                            <input
                                className="profile-authority"
                                type="text"
                                readOnly
                                value={displayAuthority()}
                            />
                        </div>
                    </div>
                    <div className="profile-content-group">
                        <div className="profile-btn">
                            <div className="profile-cancel">
                                <button>Hủy</button>
                            </div>
                            <div className="profile-update">
                                <button>Cập nhật</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
