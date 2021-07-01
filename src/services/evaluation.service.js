import axios from 'axios';
import { Socket } from 'socket.io-client';
import authHeader from './auth-header';
import io from 'socket.io-client'
const API_URL = 'http://localhost:5000/book';

class EvaluationService {
    post_comment(_id, comment, rating_stars, comment_id) {
        return axios
                    .post(API_URL + "/" + _id + '/post_comment', {
                        comment,
                        rating_stars,
                        comment_id,
                    }, {
                        headers: authHeader()
                    })
                    .then(response => response.data)
                    .catch(error => console.log(error.message))
    }

    post_answer(_id, comment_id, answer) {
        return axios
                    .post(API_URL + '/' + _id + '/' + comment_id + '/post_answer', {
                        answer
                    }, { 
                        headers: authHeader()
                    })
                    .then(response => response.data)
                    .catch(error => console.log(error.message))
    }
}

export default new EvaluationService()