import React, { useState } from 'react'
import { checkUidApi, signUpApi } from '../../api/SignUpApi';

const Register = ({ setRegisterModal }) => {

    const [userData, setUserData] = useState(
        {
            uid : "",
            password : "",
            name : "",
        }
    );

    const [uidValid, setUidValid] = useState(false);
    const [passValid, setPassValid] = useState(false);
    const [nameValid, setNameValid] = useState(false);

    const uidRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/;
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,12}$/;
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

    const checkUid = async (e) => {
        try {
            const response = await checkUidApi(userData.uid);
            console.log(response);

            if (response > 0) {
                e.target.style.border = "1px solid #387F39"
            }else {
                e.target.style.border = "1px solid #FF0000"
            }

        } catch (error) {
            console.log(error);
        }
    }

    const signUp = async () => {
        if (uidValid && passValid && nameValid) {
            try {
                const response = await signUpApi(userData);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }else {
            alert("입력한 정보가 유효하지 않습니다.");
        }
    }

    /** 버블링 막는 함수 */
    function bubblingBlock(event) {
        event.stopPropagation();
    }

  return (
    <div className='modalBox'  onClick={() => setRegisterModal(false)}>
        <div className='modal register' onClick={bubblingBlock}>
            <h1>Sign Up</h1>
            <div>
                <h2>Id</h2>
                <input 
                    type="text" 
                    name='uid' 
                    value={userData.uid} 
                    onChange={inputData} 
                    onBlur={checkUid}
                    style={{ border: uidValid ? '1px solid #387F39' : '1px solid #FF0000' }}
                />
            </div>
            <div>
                <h2>Password</h2>
                <input 
                    type="password" 
                    name='password' 
                    value={userData.password} 
                    onChange={inputData}
                    style={{ border: passValid ? '1px solid #387F39' : '1px solid #FF0000' }}
                />
            </div>
            <div>
                <h2>Name</h2>
                <input 
                    type="text" 
                    name='name' 
                    value={userData.name} 
                    onChange={inputData}
                    style={{ border: nameValid ? '1px solid #387F39' : '1px solid #FF0000' }}
                />
            </div>
            <button onClick={signUp}>Sign up</button>
        </div>
    </div>
  )
}

export default Register