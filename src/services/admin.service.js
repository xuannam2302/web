import axios from "axios";

import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/manage";


class AdminServie {
    display_all() {
        return axios
            .get(API_URL, {
                headers: authHeader()
            })
            .then((response) => response.data)
    }

    create_item(new_item) {
        return axios
            .post(API_URL + '/create', new_item, { headers: authHeader() })
            .then((response) => response.data)
    }

    update_item(id, new_item) {
        return axios
            .post(API_URL + `/update/${id}`, new_item, { headers: authHeader() })
            .then((response) => response.data)
    }

    delete_item(id) {
        return axios
            .post(API_URL + `/delete/${id}`, {}, { headers: authHeader() })
            .then((response) => response.data)
    }
}

export default new AdminServie();