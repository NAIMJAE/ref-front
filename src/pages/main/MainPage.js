import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import { useNavigate } from 'react-router-dom';
import { getRefListApi } from '../../api/MainPageApi';
import InspectionPage from '../../layout/ErrorPage';
/**
 * 
 * [진진] 
 *  1. 프로시저, 트리거, 스케줄러 사용해서 간이 인기검색어 
 *  2. JWT
 *  3. 결제 시스템 
 *  4. 방문자 체크 
 * 
 */
const MainPage = () => {

  const navigate = useNavigate();

  const [refList, setRefList] = useState([]);
  const [refLoad, setRefLoad] = useState(true);

  useEffect(() => {
    const getRefList = async () => {
      try {
        const response = await getRefListApi();
        setRefList(response);
      } catch (error) {
        console.log(error);
        setRefLoad(false);
      }
    }
    getRefList();
  },[]);

  // refList의 길이가 3의 배수가 아닐 경우 필요한 fakeBox 개수 계산
  const fakeBoxes = [];
  if (refList.length % 3 !== 0) {
    const fakeBoxCount = 3 - (refList.length % 3);
    for (let i = 0; i < fakeBoxCount; i++) {
      fakeBoxes.push(<div className="fakeBox" key={`fake-${i}`}></div>);
    }
  }

  return (
    <MainLayout>
      <div id='mainPage'>
        <div className='pageList'>
          {refLoad && refList.length > 0 ? (refList.map((ref, index)=>(
            <div className='refBox' key={index} onClick={() => navigate(`${ref.refApi}`)}>
              <div className='imgBox'>
                <img src={`../../images/main/${ref.refThumb}`} alt="a" />
              </div>
              <div className='textBox'>
                <div className='refInfo'>
                  <pre>{ref.refCate}</pre>
                </div>

                <div className='refTitle'>
                  <h1>{ref.refTitle}</h1>
                  <h2>{ref.refIntro}</h2>
                </div>

              </div>
            </div>
          ))) : (
            <InspectionPage/>
          )}

          {fakeBoxes}
        </div>
      </div>
    </MainLayout>
  )
}

export default MainPage