import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import { deleteItem } from '../actions/books'

const Manage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { _id } = useParams();
    const handleDelete = () => {
        dispatch(deleteItem(_id));
        history.push(`/book/${_id}`);
    }
    const handleUpdate = () => {
        history.push(`/book/${_id}/edit`);
    }
    return (
        <div className="manage">
            <h2 className="manage-title">
                Thông tin người dùng
            </h2>
            <div className="manage-info">
                <h3 className="mange-name">User: Wibu Never Dies</h3>
                <div className="manage-authority">
                    <strong>User id: 182nd82DEC30ksjS</strong>
                    <p>Authority: Admin</p>
                </div>
            </div>
            <div className="manage-control">
                <button className="manage-control-btn" onClick={handleUpdate}>Sửa</button>
                <button className="manage-control-btn" onClick={handleDelete}>Xóa</button>
            </div>
        </div>
    )
}

export default Manage;
