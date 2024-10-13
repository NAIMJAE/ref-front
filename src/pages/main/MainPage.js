import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import { useNavigate } from 'react-router-dom';
import { getRefListApi } from '../../api/MainPageApi';
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

  useEffect(() => {
    const getRefList = async () => {
      try {
        const response = await getRefListApi();
        setRefList(response);
      } catch (error) {
        console.log(error);
      }
    }
    getRefList();
  },[]);

  return (
    <MainLayout>
      <div id='mainPage'>
        <div className='pageList'>
          {refList && refList.map((ref, index)=>(
            <div className='refBox' key={index} onClick={() => navigate(`${ref.refApi}`)}>
              <div className='imgBox'>
                <img src={`../../images/main/${ref.refThumb}`} alt="a" />
              </div>
              <div className='textBox'>
                <div className='refInfo'>
                  <h3>{ref.refCate}</h3>
                </div>

                <div className='refTitle'>
                  <h1>{ref.refTitle}</h1>
                  <h2>{ref.refIntro}</h2>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}

export default MainPage