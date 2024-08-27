import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import { useNavigate } from 'react-router-dom';
import { getRefListApi } from '../../api/MainPageApi';
import Moment from 'moment';

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
            <h1>{ref.refTitle}</h1>
            <h2>{ref.refIntro}</h2>
            <div>
              <h3>버전 {ref.refVersion}</h3>
              <h3>&nbsp;생성 {Moment(ref.refCreate).format('YY.MM.DD')}</h3>
              <h3>&nbsp;수정 {Moment(ref.refUpdate).format('YY.MM.DD')}</h3>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  )
}

export default MainPage