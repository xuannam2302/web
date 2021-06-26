import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:5000/trade'

class CartService {
    // Get quantity
    get_quantity() {
        return axios
            .get(API_URL + '/quantity', {
                headers: authHeader()
            })
            .then(response => response.data)
            .catch(error => Promise.reject(error));

    }
    // Added Cart
    get_cart() {
        return axios
            .get(API_URL + '/cart', {
                headers: authHeader()
            })
            .then(response => response.data)
            .catch(error => Promise.reject(error));
    }
    // Order cart
    get_ordered_cart() {
        return axios
            .get(API_URL + '/order_list', {
                headers: authHeader()
            })
            .then(response => response.data)
            .catch(error => Promise.reject(error));
            
    }

    add_to_cart(book_list) {
        // send request is a list of object includes books_id and quantity
        return axios
            .post(API_URL + '/add_to_cart', {
                book_list
            },
                {
                    headers: authHeader()
                })
            .then(response => response.data)
            .catch(error => Promise.reject(error));

    }

    remove_from_cart(book_list) {
        // Send request is a list of object includes book._id
        return axios
            .post(API_URL + '/remove_from_cart', {
                book_list
            },
                {
                    headers: authHeader()
                })
            .then(response => response.data)
            .catch(error => Promise.reject(error));

    }

    add_to_cart_ordered(book_list) {
        // send_request is a list of object include _id and quantity
        return axios
            .post(API_URL + '/order',
                {
                    book_list
                },
                {
                    headers: authHeader()
                })
            .then(response => response.data)
            .catch(error => Promise.reject(error));

    }

    cancle_order(book_list) {
        // Order list is a list of object _id
        return axios
            .post(API_URL + '/cancle_order', book_list, {
                headers: authHeader()
            })
            .then(response => response.data)
            .catch(error => Promise.reject(error));

    }
}

export default new CartService();
