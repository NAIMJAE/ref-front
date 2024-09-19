import React from 'react'

const PopupComponent = ({ setPopup }) => {

    // Create REF_POPUP Cookie
    const createCookie = () => {
        document.cookie = 'REF_POPUP=true; Max-Age=86400; path=/;';
        setPopup(false);
    }

  return (
    <div id='PopupComponent'>
        <div id='Popup'>
            <img src='../../images/dataStorage/ref_dataStorage_popup.PNG' alt=''/>
            <div>
                <p onClick={() => createCookie()}>오늘 하루 보지 않기</p>
                <p onClick={() => setPopup(false)}>닫기</p>
            </div>
        </div>
    </div>
  )
}

export default PopupComponent