import { combineReducers } from 'redux';

import { books, item, data } from './books';
import auth from "./auth";
import message from "./message";

export const reducers = combineReducers({ books, item, auth, message, data });