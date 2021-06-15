import React from 'react'
import { Link } from 'react-router-dom'

const AdminList = () => {
    const list = ['books', 'users'];
    return (
        <div className="admin-list">
            {list.map((category, index) => {
                return (
                    <div className="admin-item" key={index}>
                        <i className="fas fa-bars"></i>
                        <div className="admin-item-text">{category[0].toUpperCase() + category.substring(1)}</div>
                    </div>
                )
            })}
            <Link to="/admin/create">
                <div className="admin-item">
                    <i className="fas fa-plus"></i>
                    <div className="admin-item-text">Create</div>
                </div>
            </Link>
        </div>
    )
}

export default AdminList
