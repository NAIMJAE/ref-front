import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import '../../styles/webAnalytics.scss'
import { selectVisitorTrackingApi } from '../../api/VisitorTrackingApi'
import Moment from 'moment';

const VisitorTrackingPage = () => {
  /******* 일일 이용자 수 그래프 (2주) *******/
  const [maxCount, setMaxCount] = useState(0);
  const [dailyVisitors, setDailyVisitors] = useState([]);
  const [devicePercentage, setDevicePercentage] = useState([]);
  const [visitorCountForPeriod, setVisitorCountForPeriod] = useState([]);
  const [countryVisitorCount, setCountryVisitorCount] = useState([]);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const response = await selectVisitorTrackingApi();
        setDailyVisitors(response.data.dailyVisitors);
        setDevicePercentage(response.data.devicePercentage);
        setVisitorCountForPeriod(response.data.visitorCountForPeriod);
        setCountryVisitorCount(response.data.countryVisitorCount);
      } catch (e) {
        console.error('방문자 수 받아오기 에러 :', e);
      }
    };
    fetchVisitorCount();
  }, [])

  // visitCount에서 최대값을 찾는 함수
  const getMaxCount = () => {
    if (dailyVisitors.length === 0) return 0;

    return dailyVisitors.reduce((max, item) => {
      return item.visitCount > max ? item.visitCount : max;
    }, 0); // 초기값을 0으로 설정
  };

  // 방문자 수 배열이 업데이트될 때마다 최대값을 계산하고 maxCount 업데이트
  useEffect(() => {
    setMaxCount(getMaxCount());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dailyVisitors]); // visitorCount가 변경될 때마다 실행

  const [douColor] = useState([
    "#FF6B6B", "#4D96FF", "#6BCB77", "#FFD93D", "#FFF89A"
  ])

  // 도넛 차트 그리기
  let deg = 0; // 기준 각도
  const gradientParts = countryVisitorCount.map((item, index) => {
    const currentDeg = item.countryPercentage * 3.6;  // 100을 기준으로 바로 360도 중 차지할 각도 계산
    const startDeg = deg;
    deg += currentDeg;

    // 각도가 360도를 넘지 않도록 조정
    if (deg > 360) {
      deg = 360;
    }

    return `${douColor[index]} ${startDeg}deg ${deg}deg`;
  }).join(", ");

  const chartStyle = {
    background: `conic-gradient(${gradientParts})`,
  };

  return (

    <MainLayout>
      <div id='visitorTracking'>
        <div id='description'>
          <div className='ts_box'>
            <h1 className='bg_red'>Visitor Tracking</h1>
            <h2 className='bg_blue bold'>데이터 흐름</h2>
            
            <h3><span className='bold'>※ 데이터 수집:</span> 웹사이트에서 방문자와 세션 데이터를 수집하여 방문자의 행동을 기록합니다.</h3>
            <h3><span className='bold'>※ 데이터 저장:</span> 수집된 데이터를 데이터베이스에 저장하고, 날짜별, 세션별로 정리합니다.</h3>
            <h3><span className='bold'>※ 데이터 처리 및 분석:</span> 방문자 행동 데이터를 집계하고 분석하여, 사용자 행동 패턴이나 트래픽 변동을 파악합니다. </h3>
            <h3><span className='bold'>※ 리포팅 및 시각화:</span> 결과 데이터를 바탕으로 방문자 수 통계, 기기 비율, 지역별 방문자 수 등을 시각화하여 보고서를 생성합니다.</h3>
            <h2 className='bg_blue bold'> 활용 사례</h2>
            <h3><span className='bold'>※ 사용자 경험 개선:</span> 사용자가 웹사이트에서 자주 방문하는 페이지나 이탈하는 페이지를 분석하여, UX 개선을 위한 인사이트를 얻습니다.</h3>
            <h3><span className='bold'>※ 마케팅 효과 측정:</span> 유입 경로와 리퍼러 정보를 통해 어떤 마케팅 채널이 효과적인지 분석하고, 예산을 최적화할 수 있습니다.</h3>
            <h3><span className='bold'>※ 타겟 지역 설정:</span> 지역별 방문자 분석을 통해 특정 지역에서 인기 있는 콘텐츠를 확인하고, 해당 지역을 타겟으로 한 마케팅을 강화할 수 있습니다.</h3>
            <h3><span className='bold'>※ 기기별 최적화:</span> 사용자가 접속하는 주요 기기를 파악하여, 모바일/데스크탑 환경에 맞는 콘텐츠 최적화를 수행할 수 있습니다.</h3>
            <h3></h3>
          </div>
        </div>
        <div id='analytics'>
          <div id='daily'>
            <h1>Daily Visitor Statistics (Last 2 Weeks)</h1>
            <div>
              {dailyVisitors.map((item, index) => (
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
                  <h1>{visitorCountForPeriod.Today}</h1>
                  <h2>Today</h2>
                </div>
                <div id='week'>
                  <h1>{visitorCountForPeriod.Week}</h1>
                  <h2>Week</h2>
                </div>
                <div id='month'>
                  <h1>{visitorCountForPeriod.Month}</h1>
                  <h2>Month</h2>
                </div>
              </div>
            </div>

            <div id='division'>
              <h1>Device Usage Distribution of Visitors</h1>
              <div>
                <div>
                  <img src="../../images/visitor/visitor_icon_pc.png" alt="" />
                  <p>{devicePercentage.Desktop}%</p>
                </div>
                <div>
                  <img src="../../images/visitor/visitor_icon_mobile.png" alt="" />
                  <p>{devicePercentage.Mobile ? devicePercentage.Mobile : 0}%</p>
                </div>
              </div>
            </div>
          </div>

          <div id='doughnut'>
            <h1>Visitor Location Distribution Analysis</h1>
            <div className="chartWrap">
              <div className="chart" style={chartStyle}>
                <div className='center'></div>
                {(() => {
                  const radius = [115, 105, 115, 105, 115]; // 차트의 반지름, chart 크기에 맞춰 조정
                  let deg = -90; // 시작 각도 (상단에서 시작)
                  return countryVisitorCount.map((item, index) => {
                    const angle = item.countryPercentage * 3.6; // 각 항목의 전체 각도 계산
                    const currentDeg = deg + (angle / 2); // 각 항목의 중심 각도 계산
                    const radian = (currentDeg * Math.PI) / 180; // 각도를 라디안으로 변환

                    // 좌표 계산 (차트 중심을 기준으로)
                    const left = 50 + (radius[index] * Math.cos(radian)) / 300 * 100; // X 좌표를 퍼센트로 변환하여 계산
                    const top = 50 + (radius[index] * Math.sin(radian)) / 300 * 100; // Y 좌표를 퍼센트로 변환하여 계산

                    deg += angle; // 다음 항목의 시작 각도를 설정

                    return (
                      <div className="chart-bar" key={index}
                        style={{ position: "absolute", top: `${top}%`, left: `${left}%` }}>
                        {item.countryPercentage}%
                      </div>
                    );
                  });
                })()}
              </div>
              <div className='chartInfo'>
                <div className='infoBox'>
                  {countryVisitorCount.map((item, index) => (
                    <div key={index}>
                      <span></span>
                      <p>{item.country}</p>
                      <div className='city'>
                        {item.regions ? item.regions.map((region, id) => (
                          <div key={id}>
                            <p>ㆍ{region.regionName} : </p>
                            <p>{region.visitCount}</p>
                          </div>
                        )) : <div></div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default VisitorTrackingPage