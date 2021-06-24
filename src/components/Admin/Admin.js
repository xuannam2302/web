import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AdminList from './AdminList';
import AdminContent from './AdminContent';

import { displayAll } from '../../actions/books'

import Error from '../Error';

const Admin = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const token = JSON.parse(localStorage.getItem('token-verify'));

    useEffect(() => {
        dispatch(displayAll());
    }, [dispatch, token.refresh_token]);

    if (!user || !user.admin) {
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
