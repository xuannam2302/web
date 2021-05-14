import axios from 'axios';

const url = 'http://localhost:5000';

export const fetchBooks = () => axios.get(url);
export const sort = (value) => axios.post(url + '/sort?sort=value', { value: value });
export const search = (value) => axios.post(url + '/search?search=' + value, { value: value });
export const filterPrice = (lower_price, upper_price) => axios.post(url + '/price', { lower_price: lower_price, upper_price: upper_price });

