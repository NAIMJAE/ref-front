import MainLayout from '../../layout/MainLayout'
import '../../styles/testPage.scss'
import BarGraph from '../../component/graph/BarGraph'

const TestPage = () => {

  const example = [
    {item: "2023년", value:203},
    {item: "2022년", value:274},
    {item: "2021년", value:547},
    {item: "2020년", value:344},
    {item: "2019년", value:102},
    {item: "2018년", value:42},
    {item: "2017년", value:0},
    {item: "2016년", value:223},
    {item: "2015년", value:504},
    {item: "2014년", value:262},
    {item: "2013년", value:603},
  ]

  const example2 = [
    {item: "11-09", value:100},
    {item: "11-08", value:200},
    {item: "11-07", value:300},
    {item: "11-06", value:400},
    {item: "11-05", value:500},
    {item: "11-04", value:600},
    {item: "11-03", value:0},
  ]

  const example3 = [
    {item: "11-09", value:200},
    {item: "11-08", value:870},
    {item: "11-07", value:540},
    {item: "11-06", value:300},
    {item: "11-05", value:100},
    {item: "11-04", value:400},
    {item: "11-03", value:0},
    {item: "11-02", value:200},
    {item: "11-01", value:500},
    {item: "10-31", value:260},
    {item: "10-30", value:600},
    {item: "10-29", value:230},
    {item: "10-28", value:0},
    {item: "10-27", value:230},
    {item: "10-26", value:100},
    {item: "10-25", value:200},
    {item: "10-24", value:300},
    {item: "10-23", value:400},
    {item: "10-22", value:500},
    {item: "10-21", value:600},
    {item: "10-20", value:700},
    {item: "10-19", value:800},
    {item: "10-18", value:900},
    {item: "10-17", value:599},
  ]

  const color3 = ['#4D96FF', '#FF6B6B', '#FFD93D'];
  const color4 = ['#4D96FF', '#FF6B6B', '#FFD93D', '#6BCB77'];

  return (
    <MainLayout>
        <div id='testPage'>

          <div className='w100'>
          <BarGraph
            graphData={example}
            graphHeight={200}
            yTitle={'테스트 y축 제목'}
          />
          </div>

          <div className='w100'>
          <BarGraph
            graphData={example2}
            graphHeight={300}
            graphColor={color3}
            graphTitle={{title:'테스트 제목입니다.', size:'40'}}
            xTitle={'테스트 X축 제목'}
            yTitle={'테스트 y축 제목'}
            hoverValue={true}
          />
          </div>

          <div className='w100'>
          <BarGraph
            graphData={example3}
            graphHeight={300}
            graphColor={color4}
            graphTitle={{title:'방문자 집계', size:'30'}}
            yTitle={'테스트 y축 제목'}
          />
          </div>

          <div className='w25'>

          </div>

        </div>
    </MainLayout>
  )
}

export default TestPage