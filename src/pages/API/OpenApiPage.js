import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import '../../styles/apiPage.scss'
import { createServiceKeyApi, getAllInfoApi, getInfoByNameApi, selectServiceKeyApi } from '../../api/OpenApiPageApi';
import { useSelector } from 'react-redux';
import { RootUrl } from '../../api/RootUrl';

const OpenApiPage = () => {

    const loginSlice = useSelector((state) => state.loginSlice);

    const [serviceKey, setServiceKey] = useState("");

    useEffect(() => {
        const selectServiceKey = async () => {
            try {
                const response = await selectServiceKeyApi(loginSlice.uid);
                console.log(response);
                setServiceKey(response);
            } catch (error) {
                console.log(error);
            }
        }
        selectServiceKey();
    },[]);

    // serviceKey 생성
    const createServiceKey = async () => {
        try {
            const response = await createServiceKeyApi(loginSlice.uid);
            console.log(response);
            setServiceKey(response);
        } catch (error) {
            console.log(error);
        }
    }

    // 불러오기 예제
    const [charInfo, setCharInfo] = useState("");
    const [charInfoList, setCharInfoList] = useState([]);
    const [charName, setCharName] = useState("");
    const [rows, setRows] = useState(5);
    const [pg, setPg] = useState(1);

    // 이름으로 불러오기
    const getInfoByName = async () => {

        const data = {
            sk: serviceKey,
            type: "json",
            name: charName,
        }

        try {
            const response = await getInfoByNameApi(data); 
            console.log("여기", response);
            setCharInfo(response);
        } catch (error) {
            console.log(error);
        }
    }

    // 전체 불러오기
    const getAllInfo = async () => {

        const data = {
            sk: serviceKey,
            type: "json",
            numOfRows: rows,
            pageNo: pg,
        }

        try {
            const response = await getAllInfoApi(data); 
            console.log("여기", response);
            setCharInfoList(response.items)
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <MainLayout>
        <div id='openApiPage'>
            <div>
                <p>기본정보</p>
                <table className='basicInfo'>
                    <tr>
                        <td>데이터명</td>
                        <td colSpan={3}>짱구 등장인물 정보</td>
                    </tr>
                    <tr>
                        <td>서비스 유형</td>
                        <td>Rest</td>
                        <td>심의여부</td>
                        <td>자동승인</td>
                    </tr>
                </table>
            </div>

            <div>
                <p>서비스정보</p>
                <table className='serviceInfo'>
                    <tr>
                        <td>데이터 포맷</td>
                        <td>JSON</td>
                    </tr>
                    <tr>
                        <td>End Point</td>
                        <td>http://localhost:8080/ref/shinchan/v1/</td>
                    </tr>
                    <tr>
                        <td>인증키(serviceKey)</td>
                        <td>
                            {serviceKey}
                            <button onClick={createServiceKey}>ServiceKey 발급</button>    
                        </td>
                    </tr>
                </table>
            </div>

            <div>
                <p>API 서비스 명세</p>
                <h3>서비스 개요</h3>
                <table className='serviceOutline'>
                    <tr>
                        <td rowSpan={3}>API 서비스 정보</td>
                        <td>API명 (영문)</td>
                        <td>ShinChanCharacterInfo</td>
                    </tr>
                    <tr>
                        <td>API명 (국문)</td>
                        <td>짱구 캐릭터 인물 정보 조회 서비스</td>
                    </tr>
                    <tr>
                        <td>API 설명</td>
                        <td>
                            1-1 캐릭터 이름을 이용해 캐릭터 정보 조회<br/>
                            1-2 캐릭터들의 인물 정보 조회
                        </td>
                    </tr>

                    <tr>
                        <td rowSpan={5}>API 서비스 보안적용 기술 수준</td>
                        <td>서비스 인증/ 권한</td>
                        <td><b>[O] ServiceKey</b> [] 인증서 [] Basic [] 없음</td>
                    </tr>
                    <tr>
                        <td>메세지 레벨 암호화</td>
                        <td>[] 전자서명 [] 암호화 <b>[O] 없음</b></td>
                    </tr>
                    <tr>
                        <td>전송 레벨 암호화</td>
                        <td>[] SSL <b>[O] 없음</b></td>
                    </tr>
                    <tr>
                        <td>인터페이스 표준</td>
                        <td><b>[O] REST(GET)</b> [] RSS1.0 [] RSS2.0 [] 기타</td>
                    </tr>
                    <tr>
                        <td>교환 데이터 표준</td>
                        <td>[] XML <b>[O] JSON</b> [] MIME [] MTOM</td>
                    </tr>
                    
                    <tr>
                        <td rowSpan={5}>API 서비스 배포정보</td>
                        <td>서비스 URL</td>
                        <td>http://localhost:8080/ref/shinchan/v1/</td>
                    </tr>
                    <tr>
                        <td>서비스 버전</td>
                        <td>v1.0</td>
                    </tr>
                    <tr>
                        <td>서비스 시작일 / 배포일</td>
                        <td>2024-08-21 / 2024-08-21</td>
                    </tr>
                    <tr>
                        <td>서비스 이력</td>
                        <td>2024-08-21 : 서비스 시작</td>
                    </tr>
                    <tr>
                        <td>메세지 교환유형</td>
                        <td>
                            <b>[O] Request-Response</b> [] Publish-Subscribe <br/>
                            [] Fire-and-Forgot [] Notification
                        </td>
                    </tr>
                </table>

                <h3>상세기능 목록</h3>
                <table className='serviceList'>
                    <tr>
                        <td>번호</td>
                        <td>API명(국문)</td>
                        <td>상세기능명(영문)</td>
                        <td>상세기능명(국문)</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td rowSpan={2}>짱구 캐릭터 인물 정보 조회 서비스</td>
                        <td>getCharacterInfo</td>
                        <td>이름을 이용한 캐릭터 정보 REST 조회</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>getCharacterListInfo</td>
                        <td>캐릭터 전체 정보 REST 조회</td>
                    </tr>
                </table>
            </div>

            <div>
                <p>API 목록</p>
                <table className='apiList'>
                    <tr>
                        <td colSpan={3}>/getCharacterInfo <span>이름으로 캐릭터 정보 조회</span></td>
                    </tr>
                    <tr>
                        <td rowSpan={3}>요청 메세지 명세</td>
                        <td>serviceKey</td>
                        <td>발급받은 인증키</td>
                    </tr>
                    <tr>
                        <td>type</td>
                        <td>결과형식(json)</td>
                    </tr>
                    <tr>
                        <td>name</td>
                        <td>캐릭터 이름</td>
                    </tr>

                    <tr>
                        <td colSpan={3}>/getCharacterListInfo <span>캐릭터 전체 정보 조회</span></td>
                    </tr>
                    <tr>
                        <td rowSpan={4}>요청 메세지 명세</td>
                        <td>serviceKey</td>
                        <td>발급받은 인증키</td>
                    </tr>
                    <tr>
                        <td>type</td>
                        <td>결과형식(json)</td>
                    </tr>
                    <tr>
                        <td>numOfRows</td>
                        <td>검색건수</td>
                    </tr>
                    <tr>
                        <td>pageNo</td>
                        <td>페이지 번호</td>
                    </tr>

                    <tr>
                        <td rowSpan={11}>응답 메세지 명세 (공통)</td>
                        <td>charNo</td>
                        <td>캐릭터 구분 번호</td>
                    </tr>
                    <tr>
                        <td>charImg</td>
                        <td>캐릭터 이미지</td>
                    </tr>
                    <tr>
                        <td>charName</td>
                        <td>캐릭터 이름</td>
                    </tr>
                    <tr>
                        <td>charGender</td>
                        <td>캐릭터 성별</td>
                    </tr>
                    <tr>
                        <td>charBirth</td>
                        <td>캐릭터 생년월일</td>
                    </tr>
                    <tr>
                        <td>charAge</td>
                        <td>캐릭터 나이</td>
                    </tr>
                    <tr>
                        <td>charHeight</td>
                        <td>캐릭터 키</td>
                    </tr>
                    <tr>
                        <td>charWeight</td>
                        <td>캐릭터 몸무게</td>
                    </tr>
                    <tr>
                        <td>charJob</td>
                        <td>캐릭터 직업</td>
                    </tr>
                    <tr>
                        <td>charBloodType</td>
                        <td>캐릭터 혈액형</td>
                    </tr>
                    <tr>
                        <td>charEtc</td>
                        <td>캐릭터 기타 정보</td>
                    </tr>
                </table>
            </div>

            <div>
                <p>불러오기 예제</p>
                <h3>/getCharacterInfo (이름으로 캐릭터 정보 조회)</h3>
                <div className='charInfoBtn'>
                    <input type="text" value={charName} onChange={(e) => setCharName(e.target.value)}/>
                    <button onClick={getInfoByName}>검색</button>
                </div>
                <table className='charInfo'>
                    <tr>
                        <td rowSpan={5}>
                            <img src={`${RootUrl()}/uploads/openApi/shinchan/${charInfo.charImg}`} alt="img" />
                        </td>
                        <td>이름</td>
                        <td>{charInfo.charName}</td>
                        <td>성별</td>
                        <td>{charInfo.charGender}</td>
                    </tr>
                    <tr>
                        <td>생년월일</td>
                        <td>{charInfo.charBirth}</td>
                        <td>나이</td>
                        <td>{charInfo.charAge}</td>
                    </tr>
                    <tr>
                        <td>키</td>
                        <td>{charInfo.charHeight}</td>
                        <td>몸무게</td>
                        <td>{charInfo.charWeight}</td>
                    </tr>
                    <tr>
                        <td>직업</td>
                        <td>{charInfo.charJob}</td>
                        <td>혈액형</td>
                        <td>{charInfo.charBloodType}</td>
                    </tr>
                    <tr>
                        <td>기타</td>
                        <td colSpan={3}>{charInfo.charEtc}</td>
                    </tr>
                </table>

                <h3>/getCharacterListInfo (캐릭터 전체 정보 조회)</h3>
                <div className='allInfo'>
                    <label htmlFor="">
                        <h2>페이지번호</h2>
                        <input type="number" min="1" value={pg} onChange={(e) => setPg(e.target.value)}/>
                    </label>
                    <label htmlFor="">
                        <h2>검색결과수</h2>
                        <input type="number" step="5" min="5" max="20" value={rows} onChange={(e) => setRows(e.target.value)}/>
                    </label>
                    <button onClick={getAllInfo}>전체 부르기</button>
                </div>

                {charInfoList.length > 0 && charInfoList.map((charInfo, index) => (
                    <table className='charInfo' key={index}>
                    <tr>
                        <td rowSpan={5}>
                            <img src={`${RootUrl()}/uploads/openApi/shinchan/${charInfo.charImg}`} alt="img" />
                        </td>
                        <td>이름</td>
                        <td>{charInfo.charName}</td>
                        <td>성별</td>
                        <td>{charInfo.charGender}</td>
                    </tr>
                    <tr>
                        <td>생년월일</td>
                        <td>{charInfo.charBirth}</td>
                        <td>나이</td>
                        <td>{charInfo.charAge}</td>
                    </tr>
                    <tr>
                        <td>키</td>
                        <td>{charInfo.charHeight}</td>
                        <td>몸무게</td>
                        <td>{charInfo.charWeight}</td>
                    </tr>
                    <tr>
                        <td>직업</td>
                        <td>{charInfo.charJob}</td>
                        <td>혈액형</td>
                        <td>{charInfo.charBloodType}</td>
                    </tr>
                    <tr>
                        <td>기타</td>
                        <td colSpan={3}>{charInfo.charEtc}</td>
                    </tr>
                    </table>
                ))}
            </div>
        </div>
    </MainLayout>
  )
}

export default OpenApiPage