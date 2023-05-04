const contextPath = import.meta.env.BASE_URL;
import axios from "axios";
export default class ChapterService {
    getAllChapters() {
        return axios.get(`${contextPath}/chapters`)
        .then((res) => res.data)
        .catch(function (error) {
            error;
        });
    }

    getCustomersMedium() {
        return fetch(contextPath + 'demo/data/customers-medium.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }

    getCustomersLarge() {
        return fetch(contextPath + 'demo/data/customers-large.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }

    getCustomersXLarge() {
        return fetch(contextPath + 'demo/data/customers-xlarge.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }

    getCustomers(params) {
        const queryParams = Object.keys(params)
            .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');
        return fetch('https://www.primefaces.org//demo/data/customers?' + queryParams).then((res) => res.json());
    }
}
