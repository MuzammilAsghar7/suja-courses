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
        return axios.post('/create-course', {
            ...course,
            status : course.status.value,
            icon: course.icon.code

          })
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

    getProductsSmall() {
        return fetch(contextPath + 'demo/data/products-small.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }

    getProducts() {
        return fetch(contextPath + 'demo/data/products.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }

    getProductsWithOrdersSmall() {
        return fetch(contextPath + 'demo/data/products-orders-small.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }
}
