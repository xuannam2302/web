import React from 'react'

const CartHeader = ({ amount, isOrder }) => {
    if (isOrder) {
        return (
            <div className="cart-header">
                Thông tin đơn hàng
            </div>
        )
    }
    return (
        <div className="cart-header">
            Giỏ hàng (<span>{amount}</span>)
        </div>
    )
}

export default CartHeader
