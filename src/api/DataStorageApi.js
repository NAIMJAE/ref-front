import axios from "axios";
import { RootUrl } from "./RootUrl";
const rootURL = RootUrl();

export const sessionLoginApi = async (data) => {
    const response = await axios.post(`${rootURL}/datastorage/login`, data, { withCredentials: true });
    console.log("response : ", response);
    return response.data;
};
/*
    { withCredentials: true }는 Axios 또는 Fetch API에서 사용하는 옵션
    쿠키 및 인증 정보를 포함한 요청을 서버에 보낼 때 사용
    이 옵션을 설정하지 않으면, 기본적으로 **크로스 도메인 요청(Cross-Origin Request)**에서는 쿠키가 전송되지 않음
    클라이언트가 **쿠키나 인증 정보(예: 세션 쿠키, HTTP 인증 헤더)**를 함께 전송할 수 있도록 허용하는 옵션
    기본적으로, 브라우저는 **크로스 오리진 요청(CORS)**일 때 인증 정보(쿠키 등)를 포함하지 않음
    
*/
export const loginCheckApi = async () => {
    const response = await axios.get(`${rootURL}/datastorage/check`, { withCredentials: true });
    return response.data;
};