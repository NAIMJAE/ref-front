import axios from "axios";
import { RootUrl } from "./RootUrl";
const rootURL = RootUrl();

// Assistant 및 Thread 생성 요청 전송
export const createAssistantApi = async (userId) => {
    const response = await axios.get(`${rootURL}/assistant/${userId}`);
    return response;
};
// 사용자 메시지 전송 
export const ChatBottApi = async (data) => {
    const response = await axios.post(`${rootURL}/chatbot`, data);
    return response;
};
// 메시지 내역 조회 
export const getChatApi = async (threadId) => {
    const response = await axios.get(`${rootURL}/chatbot/${threadId}`);
    return response;
};
