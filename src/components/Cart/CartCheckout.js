import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {getOrderedCart} from '../../actions/cart'

import CartHeader from './CartHeader'
import CartContainer from './CartContainer'

const CartCheckout = () => {
    const dispatch = useDispatch();
    const ordered_cart = useSelector(state => state.ordered_cart);

    const { cart, total_price, discount_price } = ordered_cart;

    useEffect(() => {
        dispatch(getOrderedCart());
    }, [dispatch])

    return (
        <div className="cart-checkout">
            <div className="container">
                <CartHeader isOrder={true} />
                <CartContainer cart={cart} total_price={total_price} discount_price={discount_price} isOrder={true} />
            </div>
        </div>
    )
}

export default CartCheckout
