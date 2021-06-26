import React, { useState, useRef } from 'react'

import {
    CHANGE_AMOUNT,
    GET_PSEUDO_CART,
    REMOVE_CHECKED,
    REMOVE_FROM_CART,

} from '../../constants/actionType'

import { changeToLocalePrice, changeTimeStamp } from '../../util/ChangeUnit'
import { checkValidAmountOnBlur, checkValidAmountOnChange } from '../../util/Validator'
import { useDispatch } from 'react-redux'

import { addToCart, removeFromCart, getQuantity } from '../../actions/cart'

const CartItem = ({ item, isOrder, handleCheckboxItem, updateTempPrice }) => {
    const dispatch = useDispatch();

    const [amount, setAmount] = useState(item.quantity);
    const amountRef = useRef(item.quantity);

    const handleMinus = () => {
        if (amount > 1) {
            amountRef.current = amount - 1;
            setAmount(amount - 1);
            const bookList = [{ book_id: item._id, quantity: -1 }];
            dispatch(addToCart(bookList));
            dispatch({ type: CHANGE_AMOUNT, payload: { _id: item._id, quantity: -1 } });
            dispatch({ type: GET_PSEUDO_CART })
        }
    }
    const handlePlus = () => {
        amountRef.current = amount + 1;
        setAmount(amount + 1);
        const bookList = [{ book_id: item._id, quantity: 1 }];
        dispatch(addToCart(bookList));
        dispatch({ type: CHANGE_AMOUNT, payload: { _id: item._id, quantity: 1 } });
        dispatch({ type: GET_PSEUDO_CART })
    }
    const handleAmountChange = (e) => {
        const value = checkValidAmountOnChange(e.target.value);
        setAmount(value);
    }
    const handleAmountBlur = (e) => {
        const value = checkValidAmountOnBlur(e.target.value);
        setAmount(value);

        const bookList = [{ book_id: item._id, quantity: value - amountRef.current }];
        dispatch(addToCart(bookList));
        dispatch({ type: CHANGE_AMOUNT, payload: { _id: item._id, quantity: value - amountRef.current } });
        dispatch({ type: GET_PSEUDO_CART })

        amountRef.current = value;
    }
    const handleDelete = () => {
        const bookList = [{ book_id: item._id }];
        dispatch(removeFromCart(bookList));
        dispatch({ type: REMOVE_FROM_CART, payload: bookList });
        dispatch({ type: REMOVE_CHECKED, payload: [item._id] });
        dispatch({ type: GET_PSEUDO_CART });
        dispatch(getQuantity())
    }

    return (
        <div className="cart-item">
            <div className="cart-item-container">
                {!isOrder ?
                    <input
                        type="checkbox"
                        className="cart-item-choose"
                        id={item._id}
                        name="items[]"
                        value={amount}
                        onChange={handleCheckboxItem}
                    />
                    :
                    <>
                    </>
                }
                <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-img"
                />
                <div className="cart-item-content">
                    <h3 className="cart-item-name">
                        {item.name}
                    </h3>
                    <p className="cart-item-author">
                        Tác giả: {item.author}
                    </p>
                    <div className="cart-item-price">
                        <div className="cart-item-new-price">
                            Giá: <strong>{item.price === undefined ? 0 : changeToLocalePrice(item.price)}</strong>
                        </div>
                        {!isOrder &&
                            <>
                                {item.old_price !== undefined && item.old_price !== null ? <div className="cart-item-old-price">
                                    {changeToLocalePrice(item.old_price)}
                                </div> : <></>}
                                {item.old_price !== undefined && item.old_price !== null ? <div className="cart-item-discount">
                                    <strong>-{Math.ceil((1 - item.price / item.old_price) * 100)}%</strong>
                                </div> : <></>}

                            </>
                        
                        }
                    </div>
                    {isOrder &&
                        <div className="cart-item-order-date" style={{marginTop: '2rem'}}>
                            <span style={{fontWeight: 'bold'}}>Ngày đặt hàng: </span>{changeTimeStamp(item.create_at)}
                        </div>
                    }
                </div>
            </div>

            {!isOrder ?

                <div className="cart-item-control">
                    <h4 className="cart-item-control-text">Số lượng</h4>
                    <div className="cart-item-control-btn">
                        <button
                            className={`cart-item-control-click cart-item-control-minus ${amount === 1 ? "cart-item-control-disable" : null}`}
                            onClick={handleMinus}
                        >
                            <i className="fas fa-minus"></i>
                        </button>
                        <input
                            className="cart-item-control-click cart-item-control-label"
                            value={amount}
                            onChange={handleAmountChange}
                            onBlur={handleAmountBlur}
                            required
                        />
                        <button className="cart-item-control-click cart-item-control-plus" onClick={handlePlus}>
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                    <div className="cart-item-control-handle">
                        <button className="cart-item-control-delete" onClick={handleDelete}>
                            Xóa
                        </button>
                        <button className="cart-item-control-shop-later">
                            Để dành mua sau
                        </button>
                    </div>
                </div>

                :
                <div className="cart-item-checkout">
                    <h4 className="cart-item-checkout-text">Số lượng:</h4>
                    <span className="cart-amount-checkout">{item.quantity}</span>
                </div>


            }
        </div>
    )
}

export default CartItem
