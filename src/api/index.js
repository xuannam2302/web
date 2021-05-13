import axios from 'axios';

const url = 'http://localhost:5000';

export const fetchBooks = () => axios.get(url);
export const filterBy = (value) => axios.post(url + '/sort', { value: value });
export const search = (value) => axios.post(url + '/search', { value: value });