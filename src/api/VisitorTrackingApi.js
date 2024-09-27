import axios from "axios";
import { RootUrl } from "./RootUrl";
const rootURL = RootUrl();

// 방문자 수 조회
export const selectVisitorTrackingApi = async () => {
    const response = await axios.get(`${rootURL}/visitor/count`);
    console.log("response Api : ", response);
    return response;
};