import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import { selectVisitorTrackingApi } from '../../api/VisitorTrackingApi'

const VisitorTrackingPage = () => {

  const [visitorCount, setVisitorCount] = useState([]);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const response = await selectVisitorTrackingApi();
        setVisitorCount(response.data);
      } catch (e) {
        console.error('방문자 수 받아오기 에러 :', e);
      }
    };
    fetchVisitorCount();
  }, [])
  return (

    <MainLayout>
      <div className='visitorTracking'>
        <div className='ts_box'>
          <h2>Visitor Tracking에 대한 설명...</h2>
        </div>
        {visitorCount.length > 0 && (
          <div className='visitorTable'>
            <h3>방문자 수</h3>
            <table>
              <thead>
                <tr>
                  <th>날짜</th>
                  <th>방문자 수</th>
                </tr>
              </thead>
              <tbody>
                {visitorCount.map((item, index) => (
                  <tr key={index}>
                    <td>{item.visitDate}</td>
                    <td>{item.visitCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default VisitorTrackingPage