import axios from "axios";
import { RootUrl } from "./RootUrl";
const rootURL = RootUrl();

export const sessionLoginApi = async (data) => {
    try {
        const response = await axios.post(`${rootURL}/datastorage/login`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
    
};
/*
    { withCredentials: true }는 Axios 또는 Fetch API에서 사용하는 옵션
    쿠키 및 인증 정보를 포함한 요청을 서버에 보낼 때 사용
    이 옵션을 설정하지 않으면, 기본적으로 **크로스 도메인 요청(Cross-Origin Request)**에서는 쿠키가 전송되지 않음
    클라이언트가 **쿠키나 인증 정보(예: 세션 쿠키, HTTP 인증 헤더)**를 함께 전송할 수 있도록 허용하는 옵션
    기본적으로, 브라우저는 **크로스 오리진 요청(CORS)**일 때 인증 정보(쿠키 등)를 포함하지 않음
    
*/
export const loginCheckApi = async () => {
    try {
        const response = await axios.get(`${rootURL}/datastorage/check`, { withCredentials: true });
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
    
};

// 장바구니 관리
export const managmentCartApi = async (data) => {
    const response = await axios.get(`${rootURL}/datastorage/managementCart?type=${data.type}&prodId=${data.prodId}`, { withCredentials: true });
    return response.data;
};

// Logout
export const sessionLogoutApi = async () => {
    const response = await axios.get(`${rootURL}/datastorage/logout`, { withCredentials: true });
    return response.data;
};

// 공통 Api 요청 에러 처리 함수
export const handleApiError = (error) => {
    if (error.response) {
        switch (error.response.status) {
            // 잘못된 요청 파라미터
            case 400:
                console.error('Bad Request:', error.response.data);
                return error.response.data;
            // 
            default:
                console.error('Other Error:', error.response.data);
                return error.response.data;
        }
    } else {
        // 서버 응답이 없는 경우 또는 기타 에러
        console.error('Error:', error.message);
        return { message: '네트워크 오류가 발생했습니다.' };
    }
};