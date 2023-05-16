import axios from "axios";
export default class QuestionService {
    getAllQuestions(payload) {
        // return axios.get(`/questions/${lessonId}/${chapterId}`)
        return axios.get(`/lesson_questions/${payload.lessonId}/${payload.chapterId}`)
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

    updateQuestion(id,payload) {
        return axios.post(`/questions/${id}`, payload)
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
