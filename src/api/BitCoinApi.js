import axios from "axios";
import { RootUrl } from "./RootUrl";
const rootURL = RootUrl();

// 
export const getCoinListApi = async () => {
    const response = await axios.get(`${rootURL}/getCoinList`);
    console.log(response);
    return response.data;
};