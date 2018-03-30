/**
 * Created by Administrator on 2017/12/25.
 */
import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.http.interceptors.push((request, next) => {
  //request

  next(response => {
    const result = response.body;
    return result;
  });
});
const API_URL = window.IP;
const PORT = 5000;
class Model {
  static get(url, params) {
    return Vue.http.get(`http://${API_URL}:${PORT}${url}`, params);
  }

  static put(url, data = Object.create(null)) {
    return Vue.http.put(`http://${API_URL}:${PORT}${url}`, data);
  }

  static post(url, data = Object.create(null)) {
    return Vue.http.post(`http://${API_URL}:${PORT}${url}`, data);
  }

  static delete(url, data = Object.create(null)) {
    return Vue.http.delete(`http://${API_URL}:${PORT}${url}`, data);
  }
}

export default Model;
