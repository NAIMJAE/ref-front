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
      <div id='headerBox'>
        <div id='logoBox'>
          <Link to="/">
            <img src="../../images/main/refcode_logo.png" alt="" />
          </Link>
        </div>

        <div id='navBox'>
          <div id='nav'>
            {!loginSlice.uid ? (
              <>
              <button onClick={() => setLoginModal(true)}>Login</button>
              <button onClick={() => setRegisterModal(true)}>SignUp</button>
              </>
            ) : (
              <>
              <p>{loginSlice.name}님</p>
              <button onClick={logoutHandler}>Logout</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header