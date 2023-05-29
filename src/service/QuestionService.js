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
        var fileData = new FormData();
        fileData.append('file', payload.file);
        return axios.post(`add-question`,payload,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => res.data)
        .catch(function (error) {
            error;
        });
    }

    updateQuestion(id,payload) {
        var fileData = new FormData();
        fileData.append('file', payload.file);
        return axios.post(`/questions/${id}`, payload,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => res.data)
        .catch(function (error) {
            error;
        });
    }

    deleteQuestion(id) {
        return axios.delete(`/questions/${id}`)
        .then((res) => res.data)
        .catch(function (error) {
            error;
        });
    }

    deleteMediaItem(id){
        return axios.delete('/delete-question-media/'+id)
        .then((res) => res.data)
        .catch(function (error) {
            console.log(error)
          });
     }
   
}
