import React, { useState } from 'react'

const CodeViewer = () => {

    const [codeText, setCodeText] = useState([
        "public void getUserName(String uid) {",
        "   String userName = userRepository.findById(uid);",
        "}",
    ]);

  return (
    <div className='codeViewer'>
        <div className='viewHead'>
            제목제목
        </div>

        <div className='viewBody'>
            {codeText}
        </div>
    </div>
  )
}

export default CodeViewer