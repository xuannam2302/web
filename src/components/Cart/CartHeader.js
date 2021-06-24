import React from 'react'
import {useSelector} from 'react-redux'

const CartHeader = ({ isOrder }) => {

    const amount = useSelector(state => state.get_quantity);

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
