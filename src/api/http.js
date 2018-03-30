import axios from 'axios';
import qs from 'qs';
import { Indicator, Toast } from 'mint-ui';

////添加请求拦截器
axios.interceptors.request.use(
  config => {
    Indicator.open({
      text: 'Loading...',
      spinnerType: 'triple-bounce'
    });
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//添加响应拦截
axios.interceptors.response.use(
  response => {
    Indicator.close();
    return response;
  },
  error => {
    Indicator.close();
    return Promise.resolve(error.response);
  }
);

function checkStatus(response) {
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response.data;
  }
  return {
    status: -404,
    msg: '网络异常'
  };
}

function checkCode(res) {
  if (res.status === -404) {
    Toast(res.msg);
  }

  if (res.status === 10000001) {
    Toast(res.errorCode);
  }
  return res;
}

export default {
  post(url, data) {
    return axios({
      method: 'post',
      // baseURL: 'https://novastar.org/api/vx6',
      url,
      data: qs.stringify(data),
      timeout: 5000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
      .then(response => {
        return checkStatus(response);
      })
      .then(res => {
        return checkCode(res);
      });
  },
  get(url, params) {
    return axios({
      method: 'get',
      // baseURL: 'https://novastar.org/api/vx6',
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
      .then(response => {
        return checkStatus(response);
      })
      .then(res => {
        return checkCode(res);
      });
  }
};
