import React from 'react'
import {useSelector} from 'react-redux'

import CartHeader from './CartHeader'
import CartContainer from './CartContainer'

const CartCheckout = () => {
    const added_cart = useSelector(state => state.added_cart);

    const { amount, cart, total_price, discount_price } = added_cart;


    return (
        <div className="cart-checkout">
            <div className="container">
                <CartHeader amount={amount} isOrder={true} />
                <CartContainer cart={cart} total_price={total_price} discount_price={discount_price} isOrder={true}/>
            </div>
        </div>
    )
}

export default CartCheckout
