import axios from "axios";
import { RootUrl } from "./RootUrl";
const rootURL = RootUrl();

// 메인페이지 목록 조회
export const getRefListApi = async () => {
    const response = await axios.get(`${rootURL}/refList`);
    return response.data;
};
