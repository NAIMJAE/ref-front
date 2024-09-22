import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import { useNavigate } from 'react-router-dom';
import { getRefListApi } from '../../api/MainPageApi';
import Moment from 'moment';
/**
 * 
 * [진진] 
 *  1. 프로시저, 트리거, 스케줄러 사용해서 간이 인기검색어 
 *  2. JWT
 *  3. 결제 시스템 
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
        {refList && refList.map((ref, index)=>(
          <div className='refBox' key={index} onClick={() => navigate(`${ref.refApi}`)}>
            <div className='imgBox'>
              <img src={`../../images/main/${ref.refThumb}`} alt="a" />
            </div>
            <div className='textBox'>
              <h1>{ref.refTitle}</h1>
              <div className='refInfo'>
                <h2>{ref.refIntro}</h2>
                <div>
                  <h3>버전 {ref.refVersion}</h3>
                  <h3>생성 {Moment(ref.refCreate).format('YY.MM.DD')}</h3>
                  <h3>수정 {Moment(ref.refUpdate).format('YY.MM.DD')}</h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  )
}

export default MainPage