import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { getCart } from '../../actions/cart';

import CartContainer from './CartContainer'
import CartHeader from './CartHeader'
import CartEmpty from './CartEmpty'

const Cart = () => {

    const dispatch = useDispatch();
    const added_cart = useSelector(state => state.added_cart);

    const { amount, cart, total_price, discount_price } = added_cart;

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch])

    if (cart.length === 0) {
        return (
            <div className="cart">
                <div className="container">
                    <CartHeader amount={amount} isOrder={false}/>
                    <CartEmpty />
                </div>
            </div>
        )
    }

    return (
        <div className="cart">
            <div className="container">
                <CartHeader amount={amount} />
                <CartContainer cart={cart} total_price={total_price} discount_price={discount_price} isOrder={false}/>
            </div>
        </div>
    )
}

export default Cart
