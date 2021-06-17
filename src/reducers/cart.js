import {
    GET_ADDED_CART,
    GET_ORDERED_CART,
    CHANGE_AMOUNT,
    GET_PSEUDO_CART,
    REMOVE_FROM_CART,
    CHECKED_ITEM,
    REMOVE_CHECKED,

} from '../constants/actionType'

const initialStateAddedCart = {
    amount: 0,
    cart: [],
    discount_price: 0,
    total_price: 0
};

const added_cart = (state = initialStateAddedCart, action) => {
    switch (action.type) {
        case GET_ADDED_CART: {
            const book_list = action.payload;
            const { amount, books } = book_list.reduce((acc, item) => {
                if (item.book_id) {
                    const { quantity, book_id } = item;
                    const { old_price, price, author, name, image, _id } = book_id;
                    const book = { _id, old_price, price, author, name, image, quantity, isChecked: false };

                    acc.books.push(book);
                    acc.amount += quantity;
                }

                return acc;
            }, {
                amount: 0,
                books: []
            });

            return {
                ...state,
                amount,
                cart: books
            }
        }
        case GET_PSEUDO_CART: {
            const { total_price, discount_price } = state.cart
                .reduce((acc, item) => {
                    if(item.isChecked) {
                        const { quantity, price, old_price } = item;
    
                        acc.discount_price = acc.discount_price + (old_price ? (old_price - price) * quantity : 0);
                        acc.total_price += price * quantity;
                    }

                    return acc;
                }, {
                    total_price: 0,
                    discount_price: 0,
                })

            return {
                ...state,
                total_price: total_price,
                discount_price: discount_price,
            }
        }
        case CHECKED_ITEM: {
            const list_checked = action.payload;

            for(let i = 0; i < state.cart.length; i++) {
                let isCheck = false;
                for(let j = 0; j < list_checked.length; j++) {
                    if(list_checked[j] === state.cart[i]._id) {
                        isCheck = true;
                        state.cart[i].isChecked = true;
                        break;
                    }
                }
                if(!isCheck) {
                    state.cart[i].isChecked = false;
                }
            }

            return {
                ...state
            }
        }
        case REMOVE_CHECKED: {

            const list_checked = action.payload;

            for(let i = 0; i < state.cart.length; i++) {
                for(let j = 0; j < list_checked.length; j++) {
                    if(list_checked[j] === state.cart[i]._id) {
                        state.cart[i].isChecked = false;
                        break;
                    }
                }
            }

            return {
                ...state
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
        case REMOVE_FROM_CART: {
            const book_list = action.payload;
            for (let i = 0; i < state.cart.length; i++) {
                for (let j = 0; j < book_list.length; j++) {
                    if (book_list[j].book_id === state.cart[i]._id) {
                        state.cart.splice(i, 1);
                        break;
                    }
                }
            }
            
            return {
                ...state
            }
        }
        default:
            return state;
    }
}

const initialStateOrderedCart = {
    total_price: 0,
    discount_price: 0,
    cart: [],
    userMoney: 0
}

const ordered_cart = (state = initialStateOrderedCart, action) => {
    switch (action.type) {
        case GET_ORDERED_CART: {
            const { items, money } = action.payload
            const book_list = items;
            const { total_price, discount_price, books } = book_list.reduce((acc, item) => {
                if (item.book_id) {
                    const { quantity, book_id } = item;
                    const { old_price, price, author, name, image, _id } = book_id;
                    const book = { _id, old_price, price, author, name, image, quantity };

                    acc.books.push(book);
                    acc.discount_price = acc.discount_price + (old_price ? (old_price - price) * quantity : 0);
                    acc.total_price += price * quantity;
                }

                return acc;
            }, {
                total_price: 0,
                discount_price: 0,
                books: []
            });

            return {
                ...state,
                total_price,
                discount_price,
                cart: books,
                userMoney: money ? money : 0
            }
        }

        default:
            return state;
    }
}

export { added_cart, ordered_cart };