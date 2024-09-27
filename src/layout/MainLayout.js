import React, { useEffect, useState } from 'react'
import Contents from './Contents'
import Header from './Header'
import Register from '../component/modal/Register'
import Login from '../component/modal/Login'
import Footer from './Footer'

const MainLayout = ({children}) => {

  const [registerModal, setRegisterModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  // 모달 열림/닫힘에 따른 body 스크롤 관리
  useEffect(() => {
    if (registerModal || loginModal) {
      document.body.style.overflow = 'hidden'; // 모달이 열렸을 때 스크롤 비활성화
    } else {
      document.body.style.overflow = 'auto'; // 모달이 닫혔을 때 스크롤 활성화
    }
    
    return () => {
      document.body.style.overflow = 'auto'; // 컴포넌트가 언마운트되면 스크롤을 복구
    };
  }, [registerModal, loginModal]);

  return (
    <div id='mainLayout'>
      <Header setRegisterModal={setRegisterModal} setLoginModal={setLoginModal}/>
      <Contents>{children}</Contents>
      {registerModal && <Register setRegisterModal={setRegisterModal}/>}
      {loginModal && <Login setLoginModal={setLoginModal}/>}
      <Footer></Footer>
    </div>
  )
}

export default MainLayout