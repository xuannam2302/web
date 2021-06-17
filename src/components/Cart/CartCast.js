import React from 'react'
import { changeToLocalePrice } from '../../util/ChangeUnit'

import CartPayment from './CartPayment'

const CartCast = ({ total_price, discount_price, handleOrderCart, isOrder }) => {

    return (
        <>
            <div className="cart-info-total">
                <div className="cart-info-total-line">
                    <span className="cart-info-total-line-text">Tạm tính</span>
                    <div className="cart-info-total-sum">
                        {changeToLocalePrice(total_price + discount_price)}
                    </div>
                </div>
                <div className="cart-info-total-line">
                    <span className="cart-info-total-line-text">Giảm giá</span>
                    <div className="cart-info-total-discount">
                        {changeToLocalePrice(discount_price)}
                    </div>
                </div>
                <div className="cart-info-total-line">
                    <span className="cart-info-total-line-text">Thành tiền</span>
                    <div className="cart-info-total-final">
                        {changeToLocalePrice(total_price)}
                    </div>
                </div>
            </div>
            {
                isOrder ?
                    <div className="cart-checkout-summary">
                        <CartPayment />
                    </div>
                    :

                    <div className="cart-info-submit-btn cart-submit-btn" onClick={handleOrderCart}>
                        Tiến hành đặt hàng
                    </div>
            }
        </>
    )
}

export default CartCast
