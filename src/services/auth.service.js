import axios from "axios";

const API_URL = "http://localhost:5000/auth";

class AuthService {
    login(username, password) {
        return axios
        .post(API_URL + "/login", { username, password })
            .then((response) => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }
    
    logout() {
        localStorage.removeItem("user");
    }
    
    register(username, email, password) {
        console.log("AuthService");
        return axios.post(API_URL + "/register", {
            username,
            email,
            password,
        });
    }
}

export default new AuthService();