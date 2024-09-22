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
      <div id='logoBox'>
        <img src="../../images/main/refcode_icon_500.png" alt="" />
        <Link to="/">RefCode</Link>
      </div>

      <div id='navBox'>
        <div id='nav'>
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

        <div id='select'>
          <select name="" id="">
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Header