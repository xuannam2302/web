import { combineReducers } from 'redux';

import { books, item, data } from './books';
import auth from "./auth";
import message from "./message";
import { added_cart, ordered_cart } from './cart'

export const reducers = combineReducers({ books, item, auth, message, data, added_cart, ordered_cart });