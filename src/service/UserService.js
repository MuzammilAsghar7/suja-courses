import axios from "axios";
export default class QuestionService {
    getAllUsers() {
        return axios.get(`/users`)
        .then((res) => res.data)
        .catch(function (error) {
            error;
        });
    }

    addUser(payload) {
        return axios.post(`/add-user/`, payload)
        .then((res) => res.data)
        .catch(function (error) {
            error;
        });
    }

}