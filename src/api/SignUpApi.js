import axios from "axios";
import { RootUrl } from "./RootUrl";
const rootURL = RootUrl();

// 회원 가입
export const signUpApi = async (data) => {
    const response = await axios.post(`${rootURL}/signup`, data);
    return response.data;
};

// 아이디 중복 확인
export const checkUidApi = async (uid) => {
    const response = await axios.get(`${rootURL}/signup/${uid}`);
    return response.data;
};

// 로그인
export const loginApi = async (data) => {
    const response = await axios.post(`${rootURL}/login`, data);
    return response.data;
};