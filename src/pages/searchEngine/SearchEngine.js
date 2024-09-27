import React, { useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import '../../styles/searchEngine.scss'
import ListPage from '../../component/searchEngine/ListPage'
import WritePage from '../../component/searchEngine/WritePage'
import ViewPage from '../../component/searchEngine/ViewPage'
import ModifyPage from '../../component/searchEngine/ModifyPage'
import { useSelector } from 'react-redux'

const SearchEngine = () => {

  const loginSlice = useSelector((state) => state.loginSlice);
  
  const [pageState, setPageState] = useState({
    list: true,
    write: false,
    view: false,
    modify: false,
  })

  const [listState, setListState] = useState({
    pg : 1,
    type : "",
    keyword : "",
  })
  const [pageNo, setPageNo] = useState();

  const changePage = (type, pno) => {
    setPageState({
      list: type === 'list',
      write: type === 'write',
      view: type === 'view',
      modify: type === 'modify',
    });
    setPageNo(pno);
  }

  const checkLogin = (type) => {
    console.log(loginSlice)
    if(loginSlice.uid === undefined) {
      alert("로그인 후 사용 가능합니다.");
      return;
    }else {
      changePage(type);
    }
  }

  return (
    <MainLayout>
        <div id='searchEngine'>

          <div className='ts_box'>
            <h1>검색 엔진</h1>
            <h2 className='bg_blue bold'>검색 엔진 구현 과정</h2>
            <h3 className='bg_green bold'>1. 크롤링(Crawling)</h3>
            <h4>검색 엔진의 첫 번째 단계는 웹의 데이터를 수집하는 것</h4>
            <h4>웹의 데이터를 수집하기 위해 웹 크롤러 또는 스파이더라는 자동화된 프로그램을 사용</h4>
            <h4>크롤러는 웹 페이지를 방문하고 해당 페이지의 HTML 소스를 분석하며, 페이지 내의 모든 링크를 따라가며 탐색</h4><br/>

            <h3 className='bg_green bold'>2. 인덱싱(Indexing)</h3>
            <h4>크롤링을 통해 수집된 데이터를 저장하고 효율적으로 검색할 수 있도록 구조화하는 과정</h4>
            <h4>크롤링된 웹 페이지의 텍스트, 제목, 메타 태그, 이미지 설명 등이 분석되고, 이를 통해 검색어에 대한 적절한 결과를 제공하기 위해 중요한 키워드가 추출</h4>
            <h4><span className='bold'>※ 토큰화(Tokenization) :</span> 수집된 텍스트를 단어 단위로 분할</h4>
            <h4><span className='bold'>※ 정규화(Normalization) :</span> 대소문자 통합, 불필요한 기호 제거, 형태소 분석 등을 통해 동일한 단어를 일관된 형태로 변환</h4>
            <h4><span className='bold'>※ 역색인(Inverted Index) :</span> 각 단어가 어느 페이지에 위치해 있는지에 대한 맵핑을 생성, 검색할 때 해당 단어를 포함하는 모든 문서들을 빠르게 찾음</h4><br/>

            <h3 className='bg_green bold'>3. 검색 및 순위 매기기(Ranking)</h3>
            <h4>인덱싱이 완료된 후, 사용자가 입력한 검색어에 대한 가장 적합한 결과를 제공하기 위해 검색 알고리즘이 동작</h4>
            <h4>검색 엔진은 사용자가 입력한 키워드와 인덱스된 문서의 관련성을 평가하여 순위를 측정</h4><br/>

            <div className='line'></div>

            <h2 className='bg_blue bold'>간단한 커스텀 검색 엔진 구현 예제</h2>
            <h4>여러 검색 엔진 구현을 위한 라이브러리와 서비스들이 존재</h4>
            <h4>이 예제는 직접 Indexing(색인화) 및 Ranking(랭킹) 과정에 초점을 맞춘 간단한 검색 엔진 구현을 소개</h4><br/>

            <h3 className='bg_green bold'>1. 게시글 작성 과정에서 Indexing</h3>
            <h4>※ 게시글이 작성될 때 각 게시글의 내용을 분석하여 특정 키워드나 단어를 추출하고 이를 색인으로 저장</h4><br/>

            <h3 className='bold'>1.1. 특수문자 제거 및 단어 추출</h3>
            <h4>작성한 게시글을 저장하는 과정에서 게시글 내용에서 모든 특수문자를 제거</h4>
            <h4>내용을 공백을 기준으로 분리하여 모든 단어를 추출</h4><br/>

            <h3 className='bold'>1.2. 스톱워드 제거</h3>
            <h4>스톱워드(Stopwords)는 분석에 큰 의미가 없는 단어들을 뜻함</h4>
            <h4>한국어에서는 "이", "가", "은", "는"과 같은 조사, 영어에서는 "is", "are", "the"와 같은 단어들이 스톱워드에 해당</h4><br/>

            <h3 className='bold'>1.3. 형태소 분석 사용</h3>
            <h4>보다 정확한 단어 추출을 위해 KOMORAN과 같은 형태소 분석기 라이브러리를 사용하여 게시글 내용을 분석</h4>
            <h4>KOMORAN은 한국어의 형태소(명사, 동사, 형용사 등)를 분석하고, 기본형으로 변환하여 단어를 추출할 수 있음</h4><br/>

            <h3 className='bold'>1.4. 가중치 적용 및 단어 빈도 계산</h3>
            <h4>게시글 제목에 등장하는 단어는 게시글 내용을 대표하는 중요한 단어이므로 가중치를 부여</h4>
            <h4>각 단어의 빈도를 계산한 후, 등장 빈도 상위 10개의 단어를 추출하여 Indexing Table에 해당 단어와 글번호를 저장</h4><br/>

            <h3 className='bg_green bold'>2. 게시글 검색 과정에서 Ranking</h3>
            <h4>※ 검색 과정에서는 사용자가 입력한 검색어에서 의미 있는 단어를 추출하고, 이를 바탕으로 관련성이 높은 게시글을 순위로 정렬하여 검색 결과를 반환</h4><br/>

            <h3 className='bold'>2.1. 검색어 분석</h3>
            <h4>사용자가 입력한 검색어에서 단어를 추출한 후, 게시글 작성 과정과 동일하게 형태소 분석 및 스톱워드 제거를 진행</h4>
            <h4 className='exam blue'>- 예를 들어, 사용자가 "치킨 만드는 방법"이라는 검색어를 입력하면, 형태소 분석을 통해 "치킨", "만들다", "방법"과 같은 단어들을 추출</h4><br/>
            
            <h3 className='bold'>2.2. Indexing Table에서 검색</h3>
            <h4>추출된 단어들을 Indexing Table에서 조회하여 해당 단어가 포함된 글번호 목록을 가져옴</h4>
            <h4 className='exam blue'>- 예를 들어, "치킨"이라는 단어는 1, 4, 7, 8번 글에서, "만들다"는 3, 4, 8번 글에서, "방법"은 4, 5, 9번 글에서 등장한다고 가정할 수 있음</h4><br/>
            
            <h3 className='bold'>2.3. Ranking 결과 계산</h3>
            <h4>각 글번호가 검색어에서 추출된 단어들과 얼마나 일치하는지를 계산</h4>
            <h4 className='exam blue'>- 위 예시에서는 4번 글이 모든 단어와 일치하므로 100% 일치, 8번 글은 66% 일치, 그 외의 게시글들은 33% 일치로 순위 결정</h4><br/>
            
            <h3 className='bold'>2.4. TF-IDF 계산 추가</h3>
            <h4>추가적으로, TF-IDF(Term Frequency-Inverse Document Frequency) 알고리즘을 사용하여 각 단어의 중요도를 더욱 정밀하게 계산할 수 있음</h4>
            <h4 className='exam blue'>- TF(Term Frequency)는 특정 단어가 한 문서에서 얼마나 자주 등장하는지, IDF(Inverse Document Frequency)는 특정 단어가 전체 문서에서 얼마나 드물게 등장하는지</h4>

          </div>

          {pageState.list && <ListPage changePage={changePage} checkLogin={checkLogin} listState={listState} setListState={setListState} loginSlice={loginSlice}/>}
          {pageState.write && <WritePage changePage={changePage} uid={loginSlice.uid}/>}
          {pageState.view && <ViewPage changePage={changePage} pageNo={pageNo}/>}
          {pageState.modify && <ModifyPage changePage={changePage} pageNo={pageNo}/>}
        </div>
    </MainLayout>
  )
}

export default SearchEngine