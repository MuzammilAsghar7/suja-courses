import axios from "axios";
export default class QuestionService {
    getAllQuestions() {
        return axios.get(`/questions`)
        .then((res) => res.data)
        .catch(function (error) {
            error;
        });
    }

    getQuestion(id) {
        return axios.get(`/questions/${id}`)
        .then((res) => res.data)
        .catch(function (error) {
            error;
        });
    }

    addQuestion(payload) {
        return axios.post(`add-question`,payload)
        .then((res) => res.data)
        .catch(function (error) {
            error;
        });
    }

    updateQuestion(id) {
        return axios.get(`/questions/${id}`)
        .then((res) => res.data)
        .catch(function (error) {
            error;
        });
    }

    deleteQuestion(id) {
        return axios.get(`/questions/${id}`)
        .then((res) => res.data)
        .catch(function (error) {
            error;
        });
    }
}
