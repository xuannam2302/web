import axios from 'axios';

const url = 'http://localhost:5000';

export const fetchBooks = () => axios.get(url);
export const sort = (value, books) => axios.post(url + '/sort', { value: value, data: books });
export const search = (value, books) => axios.post(url + '/search', { value: value, data: books });
export const filterPrice = (lower_price, upper_price, books) => axios.post(url + '/price', { lower_price: lower_price, upper_price: upper_price, data: books });