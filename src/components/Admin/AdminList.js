import React from 'react'

const AdminList = () => {
    const list = ['books', 'users'];
    return (
        <div className="admin-list">
            {list.map((category, index) => {
                return (
                    <div className="admin-item" key={index}>
                        <i class="fas fa-bars"></i>
                        <div className="admin-item-text">{category[0].toUpperCase() + category.substring(1)}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default AdminList
