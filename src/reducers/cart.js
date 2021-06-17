import {
    GET_ADDED_CART,
    CHANGE_AMOUNT,
    GET_PSEUDO_CART,
    REMOVE_FROM_CART,

} from '../constants/actionType'

const initialState = {
    total_price: 0,
    discount_price: 0,
    amount: 0,
    cart: []
};

const added_cart = (state = initialState, action) => {
    switch (action.type) {
        case GET_ADDED_CART: {
            const book_list = action.payload;
            const { total_price, discount_price, amount, books } = book_list.reduce((acc, item) => {
                if (item.book_id) {
                    const { quantity, book_id } = item;
                    const { old_price, price, author, name, image, _id } = book_id;
                    const book = { _id, old_price, price, author, name, image, quantity };

                    acc.books.push(book);
                    acc.amount += quantity;
                    acc.discount_price = acc.discount_price + (old_price ? (old_price - price) * quantity : 0);
                    acc.total_price += price * quantity;
                }

                return acc;
            }, {
                total_price: 0,
                discount_price: 0,
                amount: 0,
                books: []
            });

            return {
                ...state,
                total_price,
                discount_price,
                amount,
                cart: books
            }
        }
        case CHANGE_AMOUNT: {
            const { _id, quantity } = action.payload;
            let newCart = state.cart
                .map(item => {
                    return _id === item._id ? { ...item, quantity: item.quantity + quantity } : item;
                })

            return {
                ...state,
                cart: newCart
            }
        }
        case GET_PSEUDO_CART: {
            const { total_price, discount_price, amount } = state.cart
                .reduce((acc, item) => {
                    const { quantity, price, old_price } = item;
                    acc.amount += quantity;
                    acc.discount_price = acc.discount_price + (old_price ? (old_price - price) * quantity : 0);
                    acc.total_price += price * quantity;

                    return acc;
                }, {
                    total_price: 0,
                    discount_price: 0,
                    amount: 0
                })

            return {
                ...state,
                total_price: total_price, 
                discount_price: discount_price, 
                amount: amount
            }
        }
        case REMOVE_FROM_CART: {
            let newCart = state.cart.filter(item => {
                return item._id !== action.payload
            })

            return {
                ...state,
                cart: newCart
            }
        }
        default:
            return state;
    }
}

export { added_cart };