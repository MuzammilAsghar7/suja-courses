import axios from "axios";
export default class QuestionService {

    getQuestions(courseId) {
       console.log(courseId);
       return false;
       return axios.get('/courses')
        .then((res) => res.data)
        .catch(function (error) {
             error;
        });
    }

    getAllLessons(chapterId) {
      return axios.get(`/chapters/${chapterId}/lessons`)
       .then((res) => res.data)
       .catch(function (error) {
            error;
       });
    }

    getLesson(id) {
    return axios.get('/lessons/'+id)
     .then((res) => res.data)
     .catch(function (error) {
          error;
     });
    }

    updateLesson(id,payload) {
      return axios.put('/lessons/'+id,payload)
      .then((res) => res.data)
      .catch(function (error) {
            error;
      });
    }

     addLesson(lesson){
         var fileData = new FormData();
         fileData.append('file', lesson.file);
         console.log(lesson);
        return axios.post('http://127.0.0.1:8000/api/add-lesson', {
            ...lesson,
            fileData
          },{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => res.data)
        .catch(function (error) {
            console.log(error)
          });
     }

     getChapter(id){
        return axios.get('http://127.0.0.1:8000/api/chapters/'+id)
        .then((res) => res.data)
        .catch(function (error) {
          error;
        });
     }

}