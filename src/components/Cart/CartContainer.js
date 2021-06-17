import React from 'react'
import {useHistory} from 'react-router-dom'

import CartItem from './CartItem'
import CartInfo from './CartInfo'

const CartContainer = ({cart, total_price, discount_price, isOrder}) => {
    const history = useHistory();
    const handleOrderCart = () => {
        let book_list = cart.map(item => {return {book_id: item._id, quantity: item.quantity}});
        console.log(book_list);
        history.push("/cart/checkout");
    }

    return (
        <div className="cart-container">
            <div className="cart-list">
                {cart.map((item, index) => {
                    return (
                        <CartItem key={index} item={item} isOrder={isOrder}/>
                    )
                })}
            </div>
            <CartInfo total_price={total_price} discount_price={discount_price} handleOrderCart={handleOrderCart} isOrder={isOrder}/>
        </div>
    )
}

export default CartContainer
