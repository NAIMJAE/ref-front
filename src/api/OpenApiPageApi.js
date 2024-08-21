import axios from "axios";
import { RootUrl } from "./RootUrl";
const rootURL = RootUrl();

// serviceKey 발급
export const createServiceKeyApi = async (uid) => {
    const response = await axios.get(`${rootURL}/openApi/create/${uid}`);
    return response.data;
};

// serviceKey 조회
export const selectServiceKeyApi = async (uid) => {
    const response = await axios.get(`${rootURL}/openApi/select/${uid}`);
    return response.data;
};

// serviceKey 조회
export const getInfoByNameApi = async (data) => {
    const response = await axios.get(`${rootURL}/shinchan/v1/getCharacterInfo?serviceKey=${data.sk}&type=${data.type}&name=${data.name}`);
    return response.data;
};

// 조회
export const getAllInfoApi = async (data) => {
    const response = await axios.get(`${rootURL}/shinchan/v1/getCharacterListInfo?serviceKey=${data.sk}&type=${data.type}&numOfRows=${data.numOfRows}&pageNo=${data.pageNo}`);
    return response.data;
};