import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { logout } from '../slice/LoginSlice';

const Header = ({ setRegisterModal, setLoginModal }) => {
  const dispatch = useDispatch();
  const loginSlice = useSelector((state) => state.loginSlice);

  const logoutHandler = () => {
    // 로그아웃 액션 실행
    dispatch(logout());
  };

  return (
    <div id='header'>
      <div id='headBox'>
        <Link to="/">RefCode</Link>
        <div id='headBtn'>
          <Link to="/schedule">Schedule</Link>
          {!loginSlice.uid ? (
            <>
            <button onClick={() => setLoginModal(true)}>Login</button>
            <button onClick={() => setRegisterModal(true)}>Register</button>
            </>
          ) : (
            <>
            <button onClick={logoutHandler}>Logout</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header