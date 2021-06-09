import React from 'react';
import { useSelector } from 'react-redux';

import AdminList from './AdminList';
import AdminContent from './AdminContent';

import Error from '../Error';

const Admin = () => {
    const user = useSelector(state => state.auth.user);
    // console.log(user);
    if (user === undefined || !user.admin) {
        return (
            <Error />
        )
    }
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

export default Admin;
