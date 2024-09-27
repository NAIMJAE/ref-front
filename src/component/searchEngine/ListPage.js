import React, { useEffect, useState } from 'react'
import { selectPostListApi } from '../../api/SearchEngineApi';

const ListPage = ({ changePage, checkLogin, listState, setListState, loginSlice }) => {

    const [postList, setPostList] = useState([]);

    const [normalKeyword, setNormalKeyword] = useState("");
    const [komoranKeyword, setKomoranKeyword] = useState("");

    useEffect(() => {
        const selectPostList = async () => {
            try {
                const response = await selectPostListApi(listState);
                console.log(response);
                setPostList(response);
            } catch (error) {
                console.log(error);
            }
        }
        selectPostList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const normalSearchBtn = async () => {
        setListState((prev) => ({...prev, keyword: normalKeyword}));
        setListState((prev) => ({...prev, type: "normal"}));
        const data = {
            pg : listState.pg,
            type : "normal",
            keyword : normalKeyword,
        }
        try {
            const response = await selectPostListApi(data);
            console.log(response);
            setPostList(response);
        } catch (error) {
            console.log(error);
        }
    }

    const komoranSearchBtn = async () => {
        setListState((prev) => ({...prev, keyword: komoranKeyword}));
        setListState((prev) => ({...prev, type: "komoran"}));
        const data = {
            pg : listState.pg,
            type : "komoran",
            keyword : komoranKeyword,
        }
        try {
            const response = await selectPostListApi(data);
            console.log(response);
            setPostList(response);
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div id='listPage' className='frame'>
        <h1>게시글 목록</h1>
        <div className='searchBar'>
            <div>
                <h5>커스텀 검색 엔진</h5>
                <input type="text" value={normalKeyword}
                    onChange={(e) => setNormalKeyword(e.target.value)}/>
                <button onClick={normalSearchBtn}>검색</button>
            </div>
        </div>
        <div className='searchBar'>
            <div>
                <h5>KOMORAN 적용</h5>
                <input type="text" value={komoranKeyword}
                    onChange={(e) => setKomoranKeyword(e.target.value)}/>
                <button onClick={komoranSearchBtn}>검색</button>
            </div>
        </div>
        <div className='example'>
            <h2>※ 간단하게 제작한 검색 엔진 사용을 위한 예제 게시글들이 있습니다.</h2>
            <h2>※ Spilt을 통해 Stopword를 제거한 모델과 형태소 분석기인 KOMORAN이 적용된 모델이 있습니다.</h2>
            <h2>※ 검색을 통해 두 모델의 차이점을 확인해보세요. ex) "치킨 만드는 방법", "건강한 운동 방법" 검색</h2>
        </div>
        <div className='postList'>
            <table>
                <tr>
                    <td>No</td>
                    <td>제목</td>
                    <td>글쓴이</td>
                    <td>날짜</td>
                </tr>
                {postList.dtoList && postList.dtoList.length > 0 && postList.dtoList.map((post, index) => (
                    <tr key={index}>
                        <td>{post.pno}</td>
                        <td onClick={() => changePage("view", post.pno)}>{post.title} 
                            {post.related !== 0 && <span>{post.related}</span>}
                        </td>
                        <td>{post.uid}</td>
                        <td>{post.rdate}</td>
                    </tr>
                ))}
                
            </table>
        </div>
        <div className='postPaging'>

        </div>
        {loginSlice && loginSlice.role === "ADMIN" &&
            <div className='postBtn'>
                <button onClick={() => checkLogin("write")}>글쓰기</button>
            </div>
        }
    </div>
  )
}

export default ListPage