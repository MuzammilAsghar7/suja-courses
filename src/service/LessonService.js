import axios from "axios";
export default class QuestionService {

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

    updateLesson(id,lesson) {
      var fileData = new FormData();
      fileData.append('file', lesson.file);

      return axios.post('/lessons/'+id,{
        ...lesson,
        fileData
      },{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
      .then((res) => res.data)
      .catch(function (error) {
            error;
      });
    }

    deleteMediaItem(id){
     return axios.post('/delete-media-item/'+id)
     .then((res) => res.data)
     .catch(function (error) {
         console.log(error)
       });
  }

     addLesson(lesson){
         var fileData = new FormData();
         fileData.append('file', lesson.file);

        return axios.post('/add-lesson', {
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
        return axios.get('/api/chapters/'+id)
        .then((res) => res.data)
        .catch(function (error) {
          error;
        });
     }

}
