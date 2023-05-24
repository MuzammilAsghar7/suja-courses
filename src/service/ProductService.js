const contextPath = import.meta.env.BASE_URL;
import axios from "axios";
export default class ProductService {

    getChapters() {
       return axios.get('/chapters')
        .then((res) => res.data)
        .catch(function (error) {
             error;
        });
    }

    addCourses(course) {
        if(course.file){
            var fileData = new FormData();
            fileData.append('file', course.file);
        }
        return axios.post('/create-course', {
            ...course,
            status : course.status.value,
            icon: course.icon.code,
            },{
            headers: {
              'Content-Type': 'multipart/form-data'
            }})
          .then((res) => res.data)
          .catch(function (error) {
            error;
          });
     }

     updateCourses(course) {
        if(course.file){
            var fileData = new FormData();
            fileData.append('file', course.file);
        }
        return axios.post('/update-course', {
            ...course,
            status : course.status.value,
            icon: course.icon.code,
            },{
            headers: {
              'Content-Type': 'multipart/form-data'
            }})
          .then((res) => res.data)
          .catch(function (error) {
            error;
          });
     }

     addOption(title) {
        return axios.post('/create-option', {
            title,
          })
          .then((res) => res.data)
          .catch(function (error) {
            error;
          });
     }

    deleteOption(id) {
        return axios.post('/delete-option', {
            id,
        })
        .then((res) => res.data)
        .catch(function (error) {
            error;
        });
    }

    getoptions() {
        return axios.get('/options')
         .then((res) => res.data)
         .catch(function (error) {
              error;
         });
    }

    getModules() {
        return axios.get('/modules')
         .then((res) => res.data)
         .catch(function (error) {
              error;
         });
     }
}
