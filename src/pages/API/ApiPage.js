import React, { useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import { getBicycleApi } from '../../api/ApiPageApi';
import MapComponent from '../../component/MapComponent';
import '../../styles/apiPage.scss'

const ApiPage = () => {

    const [locations, setLocations] = useState([]);

    const [searchYearCd, setSearchYearCd] = useState("");
    const [siDo, setSido] = useState("");

    const searchHandle = async () => { 
        const arr = siDo.split("_");
        console.log(arr)
        const data = {
            searchYearCd : searchYearCd,
            siDo : arr[0],
            guGun : arr[1],
        }

        try {
            const response = await getBicycleApi(data);
            console.log(response);
            makeLocation(response.items);
        } catch (error) {
            console.log(error);
        }
    }

    const makeLocation = (items) => {
        const locationsArray = items.item.map((spot) => {
            return {
                latitude: spot.la_crd,  // 위도
                longitude: spot.lo_crd, // 경도
                name: spot.spot_nm      // 장소 이름
            };
        });

        setLocations(locationsArray); 
    }

  return (
    <MainLayout>
        <div id='apiPage'>
            <div>
                <select name="searchYearCd" id="searchYearCd" onChange={(e) => setSearchYearCd(e.target.value)}>
                    <option value="2022">2022년</option>
                    <option value="2021">2021년</option>
                    <option value="2020">2020년</option>
                    <option value="2019">2019년</option>
                    <option value="2018">2018년</option>
                    <option value="2017">2017년</option>
                    <option value="2016">2016년</option>
                </select>

                <select name="siDo" id="siDo" onChange={(e) => setSido(e.target.value)}>
                    <option value="11_680">서울특별시 강남구</option>
                    <option value="11_740">서울특별시 강동구</option>
                    <option value="11_305">서울특별시 강북구</option>
                    <option value="26_380">부산광역시 사하구</option>
                    <option value="26_230">부산광역시 부산진구</option>
                </select>

                <button onClick={searchHandle}>검색</button>
            </div>

            <div>
                {locations && <MapComponent locations={locations}/>}
            </div>
        </div>
    </MainLayout>
  )
}

export default ApiPage