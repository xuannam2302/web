import React from 'react'
import CartCast from './CartCast'
import CartAddress from './CartAddress'


const CartInfo = ({ total_price, discount_price, handleOrderCart, isOrder }) => {
    return (
        <div className="cart-info">
            <CartAddress />
            <CartCast total_price={total_price} discount_price={discount_price} handleOrderCart={handleOrderCart} isOrder={isOrder} />
        </div>
    )
}

export default CartInfo
