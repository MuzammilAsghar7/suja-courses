import axios from "axios";
export default class AuthService {

    login(payload) {
      return axios.post('/auth/login',payload)
      .then((res) => res.data)
      .catch((error) => error.response.data);
    }

    register(payload) {
        return axios.post('/auth/register',payload)
        .then((res) => res.data)
        .catch(function (error) {
              error;
        });
      }

}
