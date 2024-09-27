import axios from 'axios';

// 요청 인터셉터 설정
axios.interceptors.request.use(
  config => {
    console.log('인터셉터 ! ');
    config.withCredentials = true; 
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
