import React, { useState } from 'react'

const CartPayment = ({handleOrderCart}) => {

    const [payment, setPayment] = useState('');
    const handleClickPayment = (e) => {
        // Remove error
        const cartPaymentElement = document.querySelector('.cart-payment');
        cartPaymentElement.classList.remove('cart-payment-error')
        const errorMessageElement = cartPaymentElement.nextElementSibling;
        errorMessageElement.style.display = 'none';

        // Logic loop and check
        let element = e.target;
        while (!element.matches('.cart-payment-item')) {
            element = element.parentElement;
        }

        const inputElement = element.querySelector('.cart-payment-checkbox');
        inputElement.setAttribute('checked', 'true');

        const value = element.querySelector('label').innerText;
        setPayment(value);
    }
    const handleOrderSubmit = () => {
        if (payment === '') {
            // Show error
            const cartPaymentElement = document.querySelector('.cart-payment');
            cartPaymentElement.classList.add('cart-payment-error');
            const errorMessageElement = cartPaymentElement.nextElementSibling;
            errorMessageElement.style.display = 'block';
        }
        else {
            handleOrderCart();
            console.log("Successfully");
        }
    }

    const methodPayment = [
        {
            method: "Visa",
            url: "https://www.visa.com.vn/dam/VCOM/regional/ap/vietnam/global-elements/images/vn-visa-gold-card-498x280.png"
        },
        {
            method: "Master Card",
            url: "https://www.mastercard.com.vn/etc/designs/mccom/vi-vn/jcr:content/global/logo.img.png/1552934595210.png"
        },
        {
            method: "Momo",
            url: "https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.6435-9/160176169_3784880351567934_8714292608011170377_n.jpg?_nc_cat=1&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=5CxU6WJnY14AX-zFFmj&_nc_ht=scontent.fsgn3-1.fna&oh=494e2334435ea10229dd1b8416679a4e&oe=60CF702B"
        },
        {
            method: "Tiền mặt",
            url: "https://e3audiomiennam.com/upload/images/Hinh-thuc-thanh-toan-bang-tien-mat.jpg"
        },
        {
            method: "Thẻ tín dụng",
            url: "https://news.nganluong.vn/wp-content/uploads/LU%CC%9BU-Y%CC%81-4-die%CC%82%CC%80u-kie%CC%A3%CC%82n-mo%CC%9B%CC%89-the%CC%89-ti%CC%81n-du%CC%A3ng-MO%CC%9B%CC%81I-NHA%CC%82%CC%81T-2021.jpg"
        }
    ]

    return (
        <>
            <div className="cart-payment">
                <h3 className="cart-payment-title">Chọn hình thức thanh toán</h3>
                <div className="cart-payment-list">
                    {methodPayment.map((item, index) => {
                        return (
                            <div
                                className="cart-payment-item"
                                key={index}
                                onClick={handleClickPayment}
                            >
                                <input
                                    type="radio"
                                    className="cart-payment-checkbox"
                                    name="payment"
                                />
                                <img
                                    src={item.url}
                                    alt={item.method}
                                    className="cart-payment-img"
                                />
                                <label
                                    htmlFor="payment"
                                    className="cart-payment-label"
                                >{item.method}
                                </label>
                            </div>
                        )
                    })}
                </div>
            </div>
            <p className="cart-payment-error-message">Vui lòng chọn hình thức thanh toán</p>
            <div
                className="cart-payment-submit-btn cart-submit-btn"
                onClick={handleOrderSubmit}
            >
                Đặt hàng
            </div>
        </>
    )
}

export default CartPayment
