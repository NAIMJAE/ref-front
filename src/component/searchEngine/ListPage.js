import React, { useEffect, useState } from 'react'
import { selectPostListApi } from '../../api/SearchEngineApi';

const ListPage = ({ changePage, checkLogin, listState, setListState }) => {

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
    <div id='listPage'>
        <h1>게시글 목록</h1>
        <div className='searchBar'>
            <div>
                <h5>수제 검색</h5>
                <input type="text" value={normalKeyword}
                    onChange={(e) => setNormalKeyword(e.target.value)}/>
                <button onClick={normalSearchBtn}>검색</button>
            </div>
        </div>
        <div className='searchBar'>
            <div>
                <h5>KOMORAN 검색</h5>
                <input type="text" value={komoranKeyword}
                    onChange={(e) => setKomoranKeyword(e.target.value)}/>
                <button onClick={komoranSearchBtn}>검색</button>
            </div>
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
        <div className='postBtn'>
            <button onClick={() => checkLogin("write")}>글쓰기</button>
        </div>
    </div>
  )
}

export default ListPage