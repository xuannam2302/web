import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AdminList from './AdminList';
import AdminContent from './AdminContent';

import { refreshToken } from '../../actions/auth'
import {displayAll} from '../../actions/books'

import Error from '../Error';

const Admin = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const message = useSelector(state => state.message);

    useEffect(() => {
        if(message) {
            const token = JSON.parse(localStorage.getItem('token-verify'));
            if(message.msg === 'Token is expired') {
                dispatch(refreshToken(token.id, token.refresh_token))
                console.log("Token ", token);
            }
        }
    }, [dispatch, message])

    useEffect(() => {
        dispatch(displayAll());
    }, [dispatch]);

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
