import axios from 'axios';
axios.defaults.baseURL = 'https://suja.vmi12.com/api';

const AxiosPlugin = {
  install(app) {
    const api = axios.create({
      baseURL: 'http://127.0.0.1:8000',
    });

    app.config.globalProperties.$axios = api;
  }
};

export default AxiosPlugin;