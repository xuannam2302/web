import React, {useEffect} from 'react'

import {
    REMOVE_FROM_CART,
    GET_PSEUDO_CART,
    CHECKED_ITEM,
    REMOVE_CHECKED,

} from '../../constants/actionType'

import { removeFromCart, orderedCart, getQuantity } from '../../actions/cart'

import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import $ from 'jquery';

import { toast } from 'react-toastify'
import ToastNotify from '../../util/ToastNotify'
import Toast from '../../util/Toast'

import CartItem from './CartItem'
import CartInfo from './CartInfo'

const CartContainer = ({ cart, total_price, discount_price, isOrder }) => {

    const dispatch = useDispatch();
    const warningNoItem = () => toast.warn(<Toast state="Warning" desc="Vui lòng chọn sản phẩm trước khi đặt hàng" />)

    const history = useHistory();
    const handleOrderCart = () => {

        const isSubmit = $('input[name="items[]"]:checked');
        const productItem = $('input[name="items[]"]');

        const length = isSubmit.length;
        let bookList = [];
        if (length) {
            // Get list of book
            Array.from(isSubmit).forEach(item => {
                const book = { book_id: $(item).attr('id'), quantity: $(item).attr('value') }
                bookList.push(book);
            })

            // Delete in added_item
            dispatch(orderedCart(bookList));
            dispatch(removeFromCart(bookList));
            dispatch({ type: REMOVE_FROM_CART, payload: bookList });
            productItem.prop('checked', false);

            // Link to checkout
            history.push("/cart/checkout");
        }
        else {
            warningNoItem();
        }

    }
    const handleCheckboxAll = () => {
        const checkboxAllElement = $('#cart-choose-checkbox-all');
        const productItem = $('input[name="items[]"]');

        const isChecked = checkboxAllElement.prop('checked');
        productItem.prop('checked', isChecked);

        let add_list = [];
        Array.from(productItem).forEach(item => {
            add_list.push($(item).attr('id'));
        })

        if (isChecked) {
            dispatch({ type: CHECKED_ITEM, payload: add_list });
        }
        else {
            dispatch({ type: REMOVE_CHECKED, payload: add_list })
        }

        dispatch({ type: GET_PSEUDO_CART })

    }

    const handleCheckboxItem = () => {
        const checkboxAllElement = $('#cart-choose-checkbox-all');
        const productItem = $('input[name="items[]"]');

        const isCheckedAll = productItem.length === $('input[name="items[]"]:checked').length;
        checkboxAllElement.prop('checked', isCheckedAll);

        let add_list = [];
        Array.from(productItem).forEach(product => {
            if ($(product).prop('checked')) {
                add_list.push($(product).attr('id'));
            }
        })

        dispatch({ type: CHECKED_ITEM, payload: add_list });
        dispatch({ type: GET_PSEUDO_CART });

    }

    const handleDeleteAll = () => {
        const isSubmit = $('input[name="items[]"]:checked');

        let list_remove = [];
        Array.from(isSubmit).forEach(item => {
            const book = { book_id: $(item).attr('id'), quantity: $(item).attr('value') };
            list_remove.push(book);
        })
        dispatch({ type: REMOVE_FROM_CART, payload: list_remove });
        dispatch(removeFromCart(list_remove))
        dispatch({ type: GET_PSEUDO_CART })
        dispatch(getQuantity())
    }

    useEffect(() => {
        dispatch(getQuantity())
    }, [dispatch])

    if (isOrder) {
        return (
            <div className="cart-container">
                <div className="cart-list">
                    {cart.map((item, index) => {
                        return (
                            <CartItem key={index} item={item} isOrder={isOrder} />
                        )
                    })}
                </div>
                <CartInfo total_price={total_price} discount_price={discount_price} isOrder={isOrder} />
            </div>
        )
    }

    return (
        <>
            <div className="cart-choose-option">
                <div className="cart-choose-all">
                    <input
                        name="all"
                        type="checkbox"
                        id="cart-choose-checkbox-all"
                        onChange={handleCheckboxAll}
                    />
                    <label htmlFor="cart-choose-checkbox-all" className="cart-choose-all-text">Tất cả</label>
                </div>
                <div className="cart-choose-action-all">
                    <button className="cart-choose-action-delete" onClick={handleDeleteAll}>
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div className="cart-container">
                <div className="cart-list">
                    {cart.map((item, index) => {
                        return (
                            <CartItem
                                key={index}
                                item={item}
                                isOrder={isOrder}
                                handleCheckboxItem={handleCheckboxItem}
                            />
                        )
                    })}
                </div>
                <CartInfo
                    total_price={total_price}
                    discount_price={discount_price}
                    handleOrderCart={handleOrderCart}
                    isOrder={isOrder}
                />
            </div>
            <ToastNotify />
        </>
    )
}

export default CartContainer
