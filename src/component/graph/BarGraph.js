import React, { useEffect, useState } from 'react'
import '../../styles/graph.scss'
import Moment from 'moment';

const BarGraph = ({ graphData, graphHeight, graphColor, eachLineView, graphTitle, xTitle, yTitle, hoverValue }) => {
    /** ※ Props List
     *  1. graphData[] *필수*
     *    - item : 가로축 항목
     *    - value : 가로축 값
     * 
     *  2. graphHeight *필수*
     *    - 그래프 막대의 최대 높이
     *    - 그래프의 실제 높이는 조금 더 큼
     * 
     *  3. graphColor[]
     *    - 그래프 막대의 색상
     *    - 배열에 들어 있는 색상을 반복
     * 
     *  4. eachLineView
     *    - 그래프 가로줄 표시
     *    - 기본값 true
     * 
     *  5. graphTitle
     *    - title : 그래프 제목
     *    - size : 제목 글자 크기
     * 
     *  6. xTitle
     *    - 그래프 x축 제목
     * 
     *  7. yTitle
     *    - 그래프 y축 제목
     * 
     *  8. hoverValue
     *    - 그래프 hover시 값 표시
     *    - 기본값 false
     */
    const [maxCount, setMaxCount] = useState(0);
    const [graphDataArray, setGraphDataArray] = useState([]);
    const [yAxis, setYAxis] = useState([]);
    const [widthCount, setWidthCount] = useState('');
    const [eachLine, setEachLine] = useState({
        view: true,
        value: '',
        color: '',
    });

    // 그래프 data 생성
    useEffect(()=>{
        const checkData = () => {
            if(graphData.length > 0) {
                if (graphColor !== undefined) {
                    setGraphDataArray(graphData.map((obj, index) => ({
                        ...obj, color: graphColor[index % graphColor.length]
                    })));
                }else {
                    setGraphDataArray(graphData.map((obj) => ({
                        ...obj, color: '#6EC207'
                    })));
                }
                setWidthCount(graphData.length);
            }
            if (eachLineView != null) {
                setEachLine((prev) => ({...prev, view:eachLineView}));
            }
            // + 에러처리
        }
        checkData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[graphData])

    // visitCount에서 최대값을 찾는 함수
    const getMaxCount = () => {
        if (graphDataArray.length === 0) return 0;

        const maxCount = graphDataArray.reduce((max, item) => {
            return item.value > max ? item.value : max;
        }, 0); // 초기값을 0으로 설정

        let YArray = [];
        if (maxCount < 1) {
            YArray = [0];
            return 0;
        }else if (1 < maxCount && maxCount <= 10) {
            YArray = [10, 5, 0];
        }else if (10 < maxCount && maxCount <= 20) {
            YArray = [20, 15, 10, 5, 0];
        }else if (20 < maxCount && maxCount <= 30) {
            YArray = [30, 20, 10, 0];
        }else if (30 < maxCount && maxCount <= 40) {
            YArray = [40, 30, 20, 10, 0];
        }

        if (40 < maxCount && maxCount <= 80) {
            const a = maxCount/20 + 1;
            for (let i=0; i< a; i++) {
                YArray.unshift(i*20);
            }
        }
        if (80 < maxCount && maxCount <= 120) {
            const a = maxCount/30 + 1;
            for (let i=0; i< a; i++) {
                YArray.unshift(i*30);
            }
        }
        if (120 < maxCount && maxCount <= 160) {
            const a = maxCount/40 + 1;
            for (let i=0; i< a; i++) {
                YArray.unshift(i*40);
            }
        }
        //
        if (160 < maxCount && maxCount <= 1000) {
            const interval = Math.floor(maxCount/100);

            if (maxCount % 100 === 0) {
                for (let i=0; i<= interval; i++) {
                    YArray.unshift(i*100);
                }
            }else {
                const aa = Math.floor(maxCount/50)+2;
                if (aa%2 !== 0) {
                    for (let i=0; i<= aa/2; i++) {
                        YArray.unshift(i*100);
                    }
                }else {
                    for (let i=0; i< aa; i++) {
                        YArray.unshift(i*50);
                    }
                }
            }
        }

        setYAxis(YArray);
        return YArray[0];
    };

    // 방문자 수 배열이 업데이트될 때마다 최대값을 계산하고 maxCount 업데이트
    useEffect(() => {
        setMaxCount(getMaxCount());
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [graphDataArray]); // visitorCount가 변경될 때마다 실행

  return (
    <div className='BarGraph'>
        {graphTitle && <p className='graphTitle' style={{fontSize:graphTitle.size + 'px'}}>{graphTitle.title}</p>}
        <div className='graphBody'>
            <div className='graphBox'>
                {graphDataArray.map((item, index) => (
                    <div className='each' key={index}
                        style={{width: `calc(100% / ${widthCount})`}}
                    >
                        <div className='graph' style={{height: graphHeight + 'px'}}>
                            <div className='bar' 
                                style={{ height: graphHeight * (item.value / maxCount) + 'px',
                                    maxHeight: graphHeight + 'px',
                                    backgroundColor: item.color
                                }}
                                onMouseOver={() => setEachLine((prev) => ({...prev, value:graphHeight * (item.value / maxCount), color:item.color}))}
                                onMouseOut={() => setEachLine((prev) => ({...prev, value:0}))}
                            >
                                <p>{item.value}</p>
                                {hoverValue && item.value > 0 &&
                                    <div className='hoverBox'>
                                        <span className='xName'>{Moment(item.item).format('MM.DD')}</span>
                                        <span className='xValue'>{item.value}</span>
                                    </div>
                                }
                            </div>
                        </div>
                        <p>{item.item}</p>
                    </div>
                ))}
                <div className='lineBox' style={{height: graphHeight + 2 + 'px'}}>
                    {yAxis && yAxis.map((axis, index) => (
                        <span className='line' key={index} style={{bottom:graphHeight * (axis / maxCount) + 'px'}}></span>
                    ))}
                </div>
                {eachLine.view && eachLine.value > 0 && 
                    <span className='eachLine' style={{bottom:eachLine.value, border: `2px solid ${eachLine.color}`}}></span>
                }
            </div>

            {xTitle && <p className='xTitle'>{xTitle}</p>}
            
            <div className='y-axis'
                style={{
                    height: `${graphHeight + 20}px`}}
                >
                {yAxis && yAxis.map((axis, index) => (
                    <span key={index} style={{bottom:graphHeight * (axis / maxCount) + 'px'}}>{axis}</span>
                ))}
                {yTitle && <p className='yTitle' >{yTitle}</p>}
            </div>
        </div>
    </div>
  )
}

export default BarGraph