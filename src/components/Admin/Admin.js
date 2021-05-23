import React from 'react';
import AdminList from './AdminList'
import AdminContent from './AdminContent'

const Admin = () => {
    return (
        <div className="admin">
            <div className="container">
                <div className="admin-container">
                    <AdminList />
                    <AdminContent />
                </div>
            </div>
        </div>
    );
}

export default Admin
