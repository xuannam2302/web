import CartService from '../services/cart.service'

import {
    GET_ADDED_CART,
    SET_MESSAGE,
    GET_ORDERED_CART,
    GET_QUANTITY,
    RESET_QUANTITY,
} from '../constants/actionType'

import showErrorMessage from './general'

export const getCart = () => (dispatch) => {
    return CartService.get_cart().then(
        (data) => {

            console.log(data);

            const { items } = data;

            dispatch({ type: GET_ADDED_CART, payload: items });

            return Promise.resolve();
        },
        (error) => {
            const message = showErrorMessage(error);

            dispatch({ type: SET_MESSAGE, payload: message })
            return Promise.reject();
        }
    )
}

export const getOrderedCart = () => (dispatch) => {
    return CartService.get_ordered_cart().then(
        (data) => {

            console.log(data);
            dispatch({ type: GET_ORDERED_CART, payload: data });

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

            const { quantity } = data;

            dispatch({ type: GET_QUANTITY, payload: quantity })

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
    return CartService.add_to_cart_ordered(bookList).then(
        (data) => {

            dispatch({ type: GET_ORDERED_CART, payload: data });
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

export const getQuantity = () => (dispatch) => {
    return CartService.get_quantity().then(
        (data) => {

            if(data) {
                const { quantity } = data;
                dispatch({ type: GET_QUANTITY, payload: quantity });
            }
            else {
                dispatch({ type: RESET_QUANTITY });
            }

            // if (data && data?.msg !== 'Token is expired') {
            //     const { quantity } = data;
            //     dispatch({ type: GET_QUANTITY, payload: quantity });
            // }
            // else if (data?.msg === 'Token is expired') {
            //     dispatch({ type: RESET_QUANTITY });
            //     dispatch({ type: SET_MESSAGE, payload: data.msg });
            // }

            return Promise.resolve();
        },
        (error) => {
            const message = showErrorMessage(error);
            dispatch({ type: SET_MESSAGE, payload: message })

            return Promise.reject();
        }

    )
}