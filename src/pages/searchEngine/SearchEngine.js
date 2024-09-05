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
      alert("로그인 후 사용 가능합니다.")
      return;
    }else {
      changePage(type);
    }
  }

  return (
    <MainLayout>
        <div id='searchEngine'>
          {pageState.list && <ListPage changePage={changePage} checkLogin={checkLogin} listState={listState} setListState={setListState}/>}
          {pageState.write && <WritePage changePage={changePage} uid={loginSlice.uid}/>}
          {pageState.view && <ViewPage changePage={changePage} pageNo={pageNo}/>}
          {pageState.modify && <ModifyPage changePage={changePage} pageNo={pageNo}/>}
        </div>
    </MainLayout>
  )
}

export default SearchEngine