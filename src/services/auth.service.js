import axios from "axios";

import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/auth";

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "/login", { username, password })
            .then((response) => {
                return response.data;
            });
    }

    logout() {
        const token = localStorage.getItem('token-verify');
        axios.post(API_URL + '/refresh_token/delete', token.refresh_token);
        localStorage.removeItem("token-verify");
    }

    register(username, email, password) {
        return axios.post(API_URL + "/register", {
            username,
            email,
            password,
        });
    }

    resend_verify(username) {
        return axios.post(API_URL + "/resend_verify", {
            username
        })
    }

    get_information() {
        return axios
            .get(API_URL + "/information", {
                headers: authHeader()
            })
            .then((response) => {
                return response.data
            })
            .catch(error => console.log(error.message || error.msg))
    }

    refresh_token(id, refresh_token) {
        return axios
            .post(API_URL + "/refresh_token", {
                id,
                refresh_token
            })
            .then(response => response.data)
            .catch(console.log("Error "))
    }
}

export default new AuthService();