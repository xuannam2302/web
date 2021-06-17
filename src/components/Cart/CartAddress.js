import React from 'react'

const CartAddress = () => {
    return (
        <div className="cart-info-contact">
            <div className="cart-info-title">
                <span>Thông tin giao hàng</span>
                <button className="cart-info-change-address">
                    Thay đổi
                    </button>
            </div>
            <div className="cart-info-contact-main">
                <div className="cart-info-contact-com">
                    <span className="cart-info-main-text">
                        Họ và tên:
                        </span>
                    <span className="cart-info-main-content">
                        Lê Hữu Đức Minh
                        </span>
                </div>
                <div className="cart-info-contact-com">
                    <span className="cart-info-main-text">
                        Số điện thoại:
                        </span>
                    <span className="cart-info-main-content">
                        0965xxxxxx
                        </span>
                </div>
                <div className="cart-info-contact-com">
                    <span className="cart-info-main-text">
                        Địa chỉ:
                        </span>
                    <span className="cart-info-main-content">
                        TP Tân An, Long An
                        </span>
                </div>
            </div>
        </div>
    )
}

export default CartAddress
