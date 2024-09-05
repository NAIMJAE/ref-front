import React, { useState } from 'react'
import { insertPostApi } from '../../api/SearchEngineApi'

const WritePage = ({ changePage, uid }) => {

    const [post, setPost] = useState({
        title : "",
        contents : "",
        uid : uid,
    })

    const savePost = async () => {
        if (post.title === "" || post.contents === "") {
            alert("제목과 내용을 입력해주세요.");
            return;
        }
        try {
            const response = await insertPostApi(post);
            console.log(response);


            changePage("list")
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div id='writePage'>
        <h1>게시글 작성</h1>

        <input type="text" placeholder='제목' value={post.title} 
            onChange={(e) => setPost((prev) => ({...prev, title: e.target.value}))}/>

        <textarea placeholder='내용' value={post.contents}
            onChange={(e) => setPost((prev) => ({...prev, contents: e.target.value}))}></textarea>

        <div className='postBtn'>
            <button onClick={() => changePage("list")}>취소</button>
            <button onClick={savePost}>저장</button>
        </div>
    </div>
  )
}

export default WritePage