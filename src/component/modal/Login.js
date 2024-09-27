import React, { useState } from 'react'
import { loginApi } from '../../api/SignUpApi';
import { useDispatch } from 'react-redux';
import { login } from '../../slice/LoginSlice';

const Login = ({ setLoginModal }) => {

    const dispatch = useDispatch();

    const [userData, setUserData] = useState(
        {
            uid : "",
            password : "",
        }
    );

    const inputData = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const loginHandle = async () => {
        if (userData.uid !== "" && userData.password !== "") {
            try {
                const response = await loginApi(userData);
                dispatch(login(response));
                setLoginModal(false);
            } catch (error) {
                alert("로그인 실패");
                setUserData({
                    uid: "",
                    password: "",
                });
            }
        }
    }

    /** 버블링 막는 함수 */
    function bubblingBlock(event) {
        event.stopPropagation();
    }

  return (
    <div className='modalBox'>
        <div className='modal login' onClick={bubblingBlock}>
            <div className='head'>
                <h1>Login</h1>
                <p onClick={() => setLoginModal(false)}>X</p>
            </div>
            <div className='input'>
                <h2>Id</h2>
                <input type="text" name='uid' value={userData.uid} onChange={inputData}/>
            </div>
            <div className='input'>
                <h2>Password</h2>
                <input type="password" name='password' value={userData.password} onChange={inputData}/>
            </div>
            <button onClick={loginHandle}>Login</button>
        </div>
    </div>
  )
}

export default Login