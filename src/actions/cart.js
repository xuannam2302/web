import CartService from '../services/cart.service'

import {
    GET_ADDED_CART,
    REMOVE_FROM_CART,
    CART_ORDER,
    CANCEL_ORDER,
    SET_MESSAGE,
} from '../constants/actionType'

import showErrorMessage from './general'

export const getCart = () => (dispatch) => {
    return CartService.get_cart().then(
        (data) => {

            console.log(data);

            const { items, money } = data;
            const { added_items, ordered_items, deliverd_items } = items;

            dispatch({ type: GET_ADDED_CART, payload: added_items });

            return Promise.resolve();
        },
        (error) => {
            const message = showErrorMessage(error);

            dispatch({ type: SET_MESSAGE, payload: message })
            return Promise.reject();
        }
    )
}

export const addToCart = (bookList) => (dispatch) => {
    return CartService.add_to_cart(bookList).then(
        (data) => {

            console.log(data);

            return Promise.resolve();
        },
        (error) => {
            const message = showErrorMessage(error);

            dispatch({ type: SET_MESSAGE, payload: message })

            return Promise.reject();
        })
}

export const removeFromCart = (bookList) => (dispatch) => {
    return CartService.remove_from_cart(bookList).then(
        (data) => {

            console.log(data);

            return Promise.resolve();
        },
        (error) => {
            const message = showErrorMessage(error);

            dispatch({ type: SET_MESSAGE, payload: message })

            return Promise.reject();

        }
    )
}

export const orderedCart = (bookList) => (dispatch) => {
    return CartService.ordered_cart(bookList).then(
        (data) => {
            console.log(data);

            return Promise.resolve();
        },
        (error) => {
            const message = showErrorMessage(error);

            dispatch({ type: SET_MESSAGE, payload: message })

            return Promise.reject();
        }
    )
}