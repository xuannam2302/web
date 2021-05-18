import { combineReducers } from 'redux';

import { books, item } from './books';

export const reducers = combineReducers({ books, item });