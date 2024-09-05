import axios from "axios";
import { RootUrl } from "./RootUrl";
const rootURL = RootUrl();

// 게시글 저장
export const insertPostApi = async (data) => {
    const response = await axios.post(`${rootURL}/se/post`, data);
    return response.data;
};

// 게시글 목록 조회
export const selectPostListApi = async (data) => {
    const response = await axios.get(`${rootURL}/se/post?pg=${data.pg}&type=${data.type}&keyword=${data.keyword}`);
    return response.data;
};

// 게시글 호출
export const selectPostApi = async (pno) => {
    const response = await axios.get(`${rootURL}/se/post/${pno}`);
    return response.data;
};