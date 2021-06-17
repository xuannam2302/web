import React from 'react'
import {Link} from 'react-router-dom'

import url_image from '../../assets/cart_empty.png';

const CartEmpty = () => {
    return (
        <div className="cart-empty">
            <img src={url_image} alt="Cart-Empty" className="cart-empty-img" />
            <div className="cart-empty-control">
                <Link to="/">
                    <div className="cart-empty-back-home cart-empty-btn">
                        Trang chủ
                    </div>
                </Link>
                <Link to="/about">
                    <div className="cart-empty-about cart-empty-btn">
                        Về chúng tôi
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default CartEmpty
