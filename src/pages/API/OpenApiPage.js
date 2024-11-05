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
                setServiceKey(response);
            } catch (error) {
                console.log(error);
            }
        }
        selectServiceKey();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    // serviceKey 생성
    const createServiceKey = async () => {
        try {
            const response = await createServiceKeyApi(loginSlice.uid);
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
            setCharInfoList(response.items)
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <MainLayout>
        <div id='openApiPage'>

            <div className='ts_box'>
                <h1>제목</h1>
                <h2 className='bg_blue bold'>Open API란?</h2>
                <h3>- 정부, 공공기관, 기업 등이 데이터를 공개하고, 다양한 목적으로 활용할 수 있도록 제공</h3>
                <h3>- API 중에서 플랫폼의 기능 또는 컨텐츠를 외부에서 쓸 수 있도록 웹 프로토콜(HTTP)로 호출할 수 있도록 개방(open)한 API를 의미</h3>
                <br/>
                
                <h3 className='bg_green bold'>1. Open API의 특징</h3>
                <h3>- Open API는 데이터를 일정한 형식으로 제공하여 데이터를 일관되게 처리할 수 있게 함 (JSON, XML 등)</h3>
                <h3>- 데이터 조회에 특화된 API의 경우, GET 요청만으로 충분히 목적을 달성할 수 있음</h3>
                <h3>- GET 요청은 웹 브라우저, 모바일 앱, API 클라이언트 등 다양한 환경에서 쉽게 사용될 수 있음</h3>
                <h3>- API 제공자는 인증된 사용자만이 API에 접근할 수 있도록 하여, 무단 접근을 방지</h3>
                <h3>- 사용자나 애플리케이션의 API 사용량 추적을 통해, 과도하게 사용하는 것을 방지</h3>
                <br/>

                <h3 className='bg_green bold'>2. 국가에서 무료 Open API를 제공하는 이유</h3>
                <h3>- 공공 데이터를 API를 통해 공개함으로써 정부의 운영을 투명하게 만들 수 있음</h3>
                <h3>- 개발자들이 이 데이터를 활용해 시민들에게 유용한 애플리케이션이나 서비스를 만들 수 있게 됨</h3>
                <h3>- 데이터를 공개하고, 많은 사람들이 이 데이터를 활용할 수 있도록 함으로써, 데이터의 활용도를 극대화할 수 있음</h3>
                <h3>- 국제적으로 통용되는 데이터 표준과 기술을 따르게 되고, 이는 국가의 IT 경쟁력을 강화하는 데 도움</h3>
                <br/>

                <h3 className='bg_green bold'>3. 기업에서 무료 Open API를 제공하는 이유</h3>
                <h3>- 기업의 입장에서 Open API 제공을 통해 더 많은 고객 데이터를 확보할 수 있음 </h3>
                <h3>- API를 제작하여 제공하는 투자 비용에 비해 기업이 얻는 브랜드 이미지와 이익이 더욱 크기 때문</h3>
                <br/>
                
            </div>

            <div className='section'>
                <h1>OpenAPI SERVICE 예제</h1>
                <p>서비스 개요</p>
                <div className='serviceOutline'>
                    <div className='listBox'>
                        <h4>기본 정보</h4>
                        <div>
                            <h4>데이터명</h4>
                            <h5>짱구 등장인물 정보</h5>
                        </div>
                        <div>
                            <h4>서비스 유형</h4>
                            <h5>REST (GET)</h5>
                        </div>
                        <div>
                            <h4>데이터 포맷</h4>
                            <h5>JSON</h5>
                        </div>
                        <div>
                            <h4>서비스 인증/권한</h4>
                            <h5>ServiceKey</h5>
                        </div>
                        <div>
                            <h4>End Point</h4>
                            <h5>https://api.refcode.info/ref/shinchan/v1/</h5>
                        </div>
                        <div className='serviceKey'>
                            <div>
                                <h4>인증키(serviceKey)</h4>
                                <button onClick={createServiceKey}>ServiceKey 발급</button>
                            </div>
                            <h5>{serviceKey}</h5>
                        </div>
                    </div>

                    <div className='listBox'>
                        <h4>API 서비스 정보</h4>
                        <div>
                            <h4>API명 (영문)</h4>
                            <h5>ShinChanCharacterInfo</h5>
                        </div>
                        <div>
                            <h4>API명 (국문)</h4>
                            <h5>짱구 캐릭터 인물 정보 조회 서비스</h5>
                        </div>
                        <div>
                            <h4>API 설명</h4>
                            <h5>
                                1-1 캐릭터 이름을 이용해 캐릭터 정보 조회<br/>
                                1-2 캐릭터들의 인물 정보 조회
                            </h5>
                        </div>
                    </div>

                    <div className='listBox'>
                        <h4>API 서비스 배포정보</h4>
                        <div>
                            <h4>서비스 버전</h4>
                            <h5>v1.1</h5>
                        </div>
                        <div>
                            <h4>서비스 시작 / 배포일</h4>
                            <h5>2024-08-21 / 2024-08-21</h5>
                        </div>
                        <div>
                            <h4>서비스 이력</h4>
                            <h5>
                                2024-08-21 : 서비스 시작<br/>
                                2024-10-18 : End Point 변경
                            </h5>
                        </div>
                        <div>
                            <h4>메세지 교환유형</h4>
                            <h5>Request-Response</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className='section'>
                <p>상세 기능 목록</p>
                <div className='serviceList'>
                    <div>
                        <h3>1</h3>
                        <div>
                            <div>
                                <h4>API명 (국문)</h4>
                                <h5>짱구 캐릭터 인물 정보 조회 서비스</h5>
                            </div>
                            <div>
                                <h4>상세기능명 (영문)</h4>
                                <h5>getCharacterInfo</h5>
                            </div>
                            <div>
                                <h4>상세기능명 (국문)</h4>
                                <h5>이름을 이용한 캐릭터 정보 REST 조회</h5>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3>2</h3>
                        <div>
                            <div>
                                <h4>API명 (국문)</h4>
                                <h5>짱구 캐릭터 인물 정보 조회 서비스</h5>
                            </div>
                            <div>
                                <h4>상세기능명 (영문)</h4>
                                <h5>getCharacterListInfo</h5>
                            </div>
                            <div>
                                <h4>상세기능명 (국문)</h4>
                                <h5>캐릭터 전체 정보 REST 조회</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='section'>
                <p>API 목록</p>
                <div className='apiList'>
                    <div className='listBox'>
                        <h4>/getCharacterInfo 이름으로 캐릭터 정보 조회</h4>
                        <div>
                            <h5>요청 메세지 명세</h5>
                            <div>
                                <div>
                                    <h4>serviceKey</h4>
                                    <h5>발급받은 인증키</h5>
                                </div>
                                <div>
                                    <h4>type</h4>
                                    <h5>결과형식(json)</h5>
                                </div>
                                <div>
                                    <h4>name</h4>
                                    <h5>캐릭터 이름</h5>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='listBox'>
                        <h4>/getCharacterListInfo 캐릭터 전체 정보 조회</h4>
                        <div>
                            <h5>요청 메세지 명세</h5>
                            <div>
                                <div>
                                    <h4>serviceKey</h4>
                                    <h5>발급받은 인증키</h5>
                                </div>
                                <div>
                                    <h4>type</h4>
                                    <h5>결과형식(json)</h5>
                                </div>
                                <div>
                                    <h4>numOfRows</h4>
                                    <h5>검색건수</h5>
                                </div>
                                <div>
                                    <h4>pageNo</h4>
                                    <h5>페이지 번호</h5>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='listBox'>
                        <div>
                            <h5>응답 메세지 명세 (공통)</h5>
                            <div>
                                <div>
                                    <h4>charNo</h4>
                                    <h5>캐릭터 구분 번호</h5>
                                </div>
                                <div>
                                    <h4>charImg</h4>
                                    <h5>캐릭터 이미지</h5>
                                </div>
                                <div>
                                    <h4>charName</h4>
                                    <h5>캐릭터 이름</h5>
                                </div>
                                <div>
                                    <h4>charGender</h4>
                                    <h5>캐릭터 성별</h5>
                                </div>
                                <div>
                                    <h4>charBirth</h4>
                                    <h5>캐릭터 생년월일</h5>
                                </div>
                                <div>
                                    <h4>charAge</h4>
                                    <h5>캐릭터 나이</h5>
                                </div>
                                <div>
                                    <h4>charHeight</h4>
                                    <h5>캐릭터 키</h5>
                                </div>
                                <div>
                                    <h4>charWeight</h4>
                                    <h5>캐릭터 몸무게</h5>
                                </div>
                                <div>
                                    <h4>charJob</h4>
                                    <h5>캐릭터 직업</h5>
                                </div>
                                <div>
                                    <h4>charBloodType</h4>
                                    <h5>캐릭터 혈액형</h5>
                                </div>
                                <div>
                                    <h4>charEtc</h4>
                                    <h5>캐릭터 기타 정보</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='section'>
                <p>오류 코드 정리</p>
                <div className='error'>
                    <h4>오류 코드</h4>
                    <div className='listBox'>
                        <div>
                            <h4>SERVICE_KEY_IS_NOT_REGISTERED_ERROR</h4>
                            <h5>유효하지 않은 ServiceKey</h5>
                        </div>
                        <div>
                            <h4>INVALID_REQUEST_PARAMETER_ERROR_TYPE</h4>
                            <h5>올바르지 않은 파라미터 (type)</h5>
                        </div>
                        <div>
                            <h4>INVALID_REQUEST_PARAMETER_ERROR_NAME</h4>
                            <h5>올바르지 않은 파라미터 (name)</h5>
                        </div>
                        <div>
                            <h4>PAGE_NUMBER_EXCEEDS_TOTAL_PAGES</h4>
                            <h5>페이지 번호가 총 페이지 수를 초과</h5>
                        </div>
                        <div>
                            <h4>UNKNOWN_ERROR</h4>
                            <h5>기타 에러</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className='openApiExam frame'>
                <p className='frameInfo'>불러오기 예제 (로그인 및 인증키 발급 후 사용 가능)</p>
                <div className='frameBody'>
                    <h1>/getCharacterInfo (이름으로 캐릭터 정보 조회)</h1>
                    <div className='searchBox'>
                        <input type="text" value={charName} onChange={(e) => setCharName(e.target.value)}/>
                        <button onClick={getInfoByName}>검색</button>
                    </div>
                    <div className='searchResult'>
                        <div className='imgBox'>
                            <img src={`${RootUrl()}/uploads/openApi/shinchan/${charInfo.charImg}`} alt="img" />
                        </div>
                        <div className='infoBox'>
                            <div>
                                <h4>이름</h4>
                                <h5>{charInfo.charName}</h5>
                                <h4>성별</h4>
                                <h5>{charInfo.charGender}</h5>
                            </div>
                            <div>
                                <h4>생년월일</h4>
                                <h5>{charInfo.charBirth}</h5>
                                <h4>나이</h4>
                                <h5>{charInfo.charAge}</h5>
                            </div>
                            <div>
                                <h4>키</h4>
                                <h5>{charInfo.charHeight}</h5>
                                <h4>몸무게</h4>
                                <h5>{charInfo.charWeight}</h5>
                            </div>
                            <div>
                                <h4>직업</h4>
                                <h5>{charInfo.charJob}</h5>
                                <h4>혈액형</h4>
                                <h5>{charInfo.charBloodType}</h5>
                            </div>
                            <div>
                                <h4>기타</h4>
                                <h5>{charInfo.charEtc}</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='frameBody'>
                    <h1>/getCharacterListInfo (캐릭터 전체 정보 조회)</h1>
                    <div className='searchBox2'>
                        <div>
                            <h2>페이지번호</h2>
                            <input type="number" min="1" value={pg} onChange={(e) => setPg(e.target.value)}/>
                            <h2>검색결과수</h2>
                            <input type="number" step="5" min="5" max="20" value={rows} onChange={(e) => setRows(e.target.value)}/>
                        </div>
                        <button onClick={getAllInfo}>전체 부르기</button>
                    </div>
                    {charInfoList.length > 0 && charInfoList.map((charInfo, index) => (
                        <div className='searchResult' key={index}>
                            <div className='imgBox'>
                                <img src={`${RootUrl()}/uploads/openApi/shinchan/${charInfo.charImg}`} alt="img" />
                            </div>
                            <div className='infoBox'>
                                <div>
                                    <h4>이름</h4>
                                    <h5>{charInfo.charName}</h5>
                                    <h4>성별</h4>
                                    <h5>{charInfo.charGender}</h5>
                                </div>
                                <div>
                                    <h4>생년월일</h4>
                                    <h5>{charInfo.charBirth}</h5>
                                    <h4>나이</h4>
                                    <h5>{charInfo.charAge}</h5>
                                </div>
                                <div>
                                    <h4>키</h4>
                                    <h5>{charInfo.charHeight}</h5>
                                    <h4>몸무게</h4>
                                    <h5>{charInfo.charWeight}</h5>
                                </div>
                                <div>
                                    <h4>직업</h4>
                                    <h5>{charInfo.charJob}</h5>
                                    <h4>혈액형</h4>
                                    <h5>{charInfo.charBloodType}</h5>
                                </div>
                                <div>
                                    <h4>기타</h4>
                                    <h5>{charInfo.charEtc}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>
        </div>
    </MainLayout>
  )
}

export default OpenApiPage