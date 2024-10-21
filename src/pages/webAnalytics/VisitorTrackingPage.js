import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import '../../styles/webAnalytics.scss'
import { selectVisitorTrackingApi } from '../../api/VisitorTrackingApi'
import Moment from 'moment';

const VisitorTrackingPage = () => {

  const [visitorCount, setVisitorCount] = useState([]);

  // 서버에서 방문자수 받아올때 방문자수 0명인 인스턴스 처리 필요
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

  // 일일 이용자수, 일일 지역별 이용자수 OR 이용자 지역별 비율, 일주일 평균 시간대별 접속자 수, 이용자 브라우저 종류 비율?

/******* 일일 이용자 수 그래프 (2주) *******/
  const [maxCount, setMaxCount] = useState(0);

  const [example, setExample] = useState([
    {visitDate:"2024.10.06",visitCount:12},
    {visitDate:"2024.10.07",visitCount:18},
    {visitDate:"2024.10.08",visitCount:4},
    {visitDate:"2024.10.09",visitCount:6},
    {visitDate:"2024.10.10",visitCount:12},
    {visitDate:"2024.10.11",visitCount:0},
    {visitDate:"2024.10.12",visitCount:32},
    {visitDate:"2024.10.13",visitCount:15},
    {visitDate:"2024.10.14",visitCount:0},
    {visitDate:"2024.10.15",visitCount:24},
    {visitDate:"2024.10.16",visitCount:21},
    {visitDate:"2024.10.17",visitCount:4},
    {visitDate:"2024.10.18",visitCount:7},
    {visitDate:"2024.10.19",visitCount:25},
  ])

  // visitCount에서 최대값을 찾는 함수
  const getMaxCount = () => {
    if (example.length === 0) return 0;

    return example.reduce((max, item) => {
      return item.visitCount > max ? item.visitCount : max;
    }, 0); // 초기값을 0으로 설정
  };

  // 방문자 수 배열이 업데이트될 때마다 최대값을 계산하고 maxCount 업데이트
  useEffect(() => {
    setMaxCount(getMaxCount());
  }, [visitorCount]); // visitorCount가 변경될 때마다 실행


/******* 도넛 차트 *******/
  const [doughnut, setDoughnut] = useState([
    {region:"한국", data:50},
    {region:"미국", data:30},
    {region:"독일", data:10},
    {region:"프랑스", data:5},
    {region:"기타", data:5},
  ]);

  const [douColor, setDouColor] = useState([
    "#FF6B6B","#4D96FF","#6BCB77","#FFD93D","#FFF89A"
  ])

  // 도넛 차트 그리기
  let deg = 0; // 기준 각도
  const gradientParts = doughnut.map((item, index) => {
    const currentDeg = item.data * 3.6;  // 100을 기준으로 바로 360도 중 차지할 각도 계산
    const startDeg = deg;
    deg += currentDeg;
    return `${douColor[index]} ${startDeg}deg ${deg}deg`;
  }).join(", ");

  const chartStyle = {
    background: `conic-gradient(${gradientParts})`,
  };

  return (

    <MainLayout>
      <div id='visitorTracking'>
        <div className='ts_box'>
          <h2>Visitor Tracking에 대한 설명...</h2>
        </div>
        <div id='analytics'>
          <div id='daily'>
            <h1>Daily Visitor Statistics (Last 2 Weeks)</h1>
            <div>
              {example.map((item, index) => (
                <div className='each' key={index}>
                  <div className='graphBox'>
                    <p>{item.visitCount}</p>
                    <div className='graph' style={{ height: 200 * (item.visitCount / maxCount) + 'px' }}></div>
                  </div>
                  <p>{Moment(item.visitDate).format('MM.DD')}</p>
                </div>
              ))}
            </div>
          </div>

          <div id='summary'>
            <div id='visitors'>
              <h1>Visitor Traffic Summary by Period</h1>
              <div id='visitorBox'>
                <div id='today'>
                  <h1>18</h1>
                  <h2>today</h2>
                </div>
                <div id='week'>
                  <h1>242</h1>
                  <h2>week</h2>
                </div>
                <div id='month'>
                  <h1>1543</h1>
                  <h2>month</h2>
                </div>
              </div>
            </div>

            <div id='division'>
              <h1>Device Usage Distribution of Visitors</h1>
              <div>
                <div>
                  <img src="../../images/visitor/visitor_icon_pc.png" alt="" />
                  <p>82%</p>
                </div>
                <div>
                  <img src="../../images/visitor/visitor_icon_mobile.png" alt="" />
                  <p>18%</p>
                </div>
              </div>
            </div>
          </div>

          <div id='doughnut'>
            <h1>Visitor Location Distribution Analysis</h1>
            <div class="chartWrap">
              <div class="chart" style={chartStyle}>
                <div className='center'></div>
              {(() => {
                const radius = 120; // 차트의 반지름, chart 크기에 맞춰 조정
                let deg = -90; // 시작 각도 (상단에서 시작)
                return doughnut.map((item, index) => {
                  const angle = item.data * 3.6; // 각 항목의 전체 각도 계산
                  const currentDeg = deg + (angle / 2); // 각 항목의 중심 각도 계산
                  const radian = (currentDeg * Math.PI) / 180; // 각도를 라디안으로 변환

                  // 좌표 계산 (차트 중심을 기준으로)
                  const left = 50 + (radius * Math.cos(radian)) / 300 * 100; // X 좌표를 퍼센트로 변환하여 계산
                  const top = 50 + (radius * Math.sin(radian)) / 300 * 100; // Y 좌표를 퍼센트로 변환하여 계산

                  deg += angle; // 다음 항목의 시작 각도를 설정

                  return (
                    <div className="chart-bar" key={index}
                      style={{position: "absolute", top: `${top}%`,left: `${left}%`}}>
                      {item.region}<br/>{item.data}%
                      <div className='city'>
                        <div>
                          <p>ㆍBusan : </p>
                          <p>51</p>
                        </div>
                        <div>
                          <p>ㆍSeoul : </p>
                          <p>22</p>
                        </div>
                        <div>
                          <p>ㆍEtc : </p>
                          <p>13</p>
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default VisitorTrackingPage