import React, { useState } from 'react';
import { checkUidApi, signUpApi } from '../../api/SignUpApi';

const Register = ({ setRegisterModal }) => {
  const [userData, setUserData] = useState({
    uid: '',
    password: '',
    name: '',
  });

  const [uidValid, setUidValid] = useState(null);
  const [passValid, setPassValid] = useState(null);
  const [nameValid, setNameValid] = useState(null);

  const uidRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/;
  const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,14}$/;
  const nameRegex = /^[가-힣]{2,6}$/;

    const inputData = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });

        // 유효성 검사
        if (name === 'uid') {
            setUidValid(uidRegex.test(value));
        } else if (name === 'password') {
            setPassValid(passRegex.test(value));
        } else if (name === 'name') {
            setNameValid(nameRegex.test(value));
        }
    };

    const checkUid = async () => {
        if (uidValid) {
            try {
                const response = await checkUidApi(userData.uid);
                setUidValid(response > 0);
            } catch (error) {
                console.log(error);
                setUidValid(false);
            }
        }
    };

    const signUp = async () => {
        if (uidValid && passValid && nameValid) {
            try {
                const response = await signUpApi(userData);
                if (response > 0) {
                    alert("회원 가입 되셨습니다.");
                    setRegisterModal(false);
                }else {
                    alert('입력한 정보가 유효하지 않습니다.');
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            alert('입력한 정보가 유효하지 않습니다.');
        }
    };

    /** 버블링 막는 함수 */
    function bubblingBlock(event) {
        event.stopPropagation();
    }

  return (
    <div className="modalBox">
        <div className="modal register" onClick={bubblingBlock}>
            <div className="head">
                <h1>SignUp</h1>
                <p onClick={() => setRegisterModal(false)}>X</p>
            </div>
            <div className="input">
                <h2>Id</h2>
                <input
                    type="text"
                    name="uid"
                    value={userData.uid}
                    onChange={inputData}
                    onBlur={checkUid} // 유효성 검사를 onBlur에서 실행
                    style={{
                        border: uidValid === null
                        ? '1px solid #c3c3c3'
                        : uidValid
                        ? '1px solid #387F39'
                        : '1px solid #FF0000',
                    }}
                />
                <h3>영문 + 숫자 (6 ~ 12자리)</h3>
            </div>
            <div className="input">
                <h2>Password</h2>
                <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={inputData}
                    style={{
                        border: passValid === null
                        ? '1px solid #c3c3c3'
                        : passValid
                        ? '1px solid #387F39'
                        : '1px solid #FF0000',
                    }}
                />
                <h3>영문 + 숫자 + 특수문자 (6 ~ 14자리)</h3>
            </div>
            <div className="input">
                <h2>Name</h2>
                <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={inputData}
                    style={{
                        border: nameValid === null
                        ? '1px solid #c3c3c3'
                        : nameValid
                        ? '1px solid #387F39'
                        : '1px solid #FF0000',
                    }}
                />
            </div>
            <button onClick={signUp}>Sign Up</button>
        </div>
    </div>
  );
};

export default Register;
