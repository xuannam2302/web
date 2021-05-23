import React from 'react'

import LogoURL from '../../assets/Logo.webp'
const AdminHeader = () => {
    return (
        <div className="admin-header">
            <div className="container">
                <div className="admin-header-container">
                    <img src={LogoURL} alt="Logo" className="admin-header-logo" />
                    <div className="admin-header-current">
                        Books
                    </div>
                    <div>
                        <input type="text" placeholder="Từ khóa" className="admin-header-search-bar" />
                    </div>
                    <div className="admin-header-identify">
                        <i class="far fa-user-circle"></i>
                        <div className="admin-header-info">
                            <h3 className="admin-header-name">
                                Wibu never dies
                            </h3>
                            <p className="admin-header-id">
                                9932un28ndq00sfe
                            </p>
                        </div>
                        <div className="admin-header-log-out">
                            <button>Đăng xuất</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminHeader
