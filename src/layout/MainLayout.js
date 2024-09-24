import React, { useState } from 'react'
import Contents from './Contents'
import Header from './Header'
import Register from '../component/modal/Register'
import Login from '../component/modal/Login'
import Footer from './Footer'

const MainLayout = ({children}) => {

  const [registerModal, setRegisterModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

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