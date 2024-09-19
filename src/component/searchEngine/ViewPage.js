import React, { useEffect, useState } from 'react'
import { selectPostApi } from '../../api/SearchEngineApi';

const ViewPage = ({ changePage, pageNo }) => {

  const [post, setPost] = useState("");

  useEffect(() => {
    const selectPost = async () => {
      try {
        const response = await selectPostApi(pageNo);
        console.log(response);
        setPost(response);
      } catch (error) {
        console.log(error);
      }
    }
    selectPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const modify = () => {
    
  }

  return (
    <div id='viewPage'>
      <h1>글 보기</h1>
      <input type='text' readOnly value={post.title}/>
      <textarea value={post.contents} readOnly></textarea>
      <div className='postBtn'>
            <button onClick={() => changePage("list")}>뒤로</button>
            <button onClick={modify}>수정</button>
        </div>
    </div>
  )
}

export default ViewPage