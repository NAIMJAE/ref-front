import axios from "axios";

const API_KEY = 'Y7iE1ppS7WlKIquWGNxNUKxgdhBRD7hJexI1KH0W%2FzstpVmXUkk8Q67%2FCugMO1A2RK4RLFPe2IUST1mHJI0oKw%3D%3D';

const url = `http://apis.data.go.kr/B552061/frequentzoneBicycle/getRestFrequentzoneBicycle?ServiceKey=${API_KEY}&numOfRows=10&pageNo=1&type=json`

export const getBicycleApi = async (data) => {
    const response = await axios.get(`${url}&searchYearCd=${data.searchYearCd}&siDo=${data.siDo}&guGun=${data.guGun}`);
    console.log(response);
    return response.data;
};