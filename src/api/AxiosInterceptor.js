import axios from 'axios';

// 요청 인터셉터 설정
axios.interceptors.request.use(
  config => {
    config.withCredentials = true; 
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
