import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import '../../styles/dataStorage.scss'
import { loginCheckApi, sessionLoginApi } from '../../api/DataStorageApi'

const DataStorage = () => {

    const [loginState, setLoginState] = useState("");

    const [loginData, setLoginData] = useState({
        uid : "",
        password : "",
        autoLogin : false,
    })

    const [userInfo, setUserInfo] = useState("");

    const [saveId, setSaveId] = useState(false);

    // useEffect
    useEffect(() => {
        const loginCheck = async () => {
            try {
                const response = await loginCheckApi(); 

                setLoginState(getCookie("REF_LOGIN"));
                readInfo();
            } catch (error) {
                console.log(error);
            }
        }
        loginCheck();
        saveIdCheck();
    },[])

    // 쿠키 가져오기
    const getCookie = (name) => {
        const cookieArr = document.cookie.split(";");  // ';'를 기준으로 모든 쿠키 분리
        for (let i = 0; i < cookieArr.length; i++) {
            let cookiePair = cookieArr[i].split("=");  // 쿠키 이름과 값을 '='로 분리
            // 쿠키 이름의 공백을 제거하고 일치하는 이름 찾기
            if (name === cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);  // 쿠키 값 반환
            }
        }
        return "";  // 쿠키가 없으면
    };

    // 자동 로그인 버튼
    const autoLoginCheck = (e) => {
        if (e.target.checked) {
            setLoginData((prev)=>({...prev, autoLogin:true}));
        }else {
            setLoginData((prev)=>({...prev, autoLogin:false}));
        }
    }

    // 로그인
    const loginBtn = async () => {
        if (loginData.uid === "" || loginData.password === "") {
            alert("아이디와 비밀번호를 입력해주세요.");
            return;
        }
        try {
            const response = await sessionLoginApi(loginData);
            setLoginState(getCookie("REF_LOGIN"));
            readInfo();
            rememberId();
        } catch (error) {
            console.log(error);
        }
    }

    // REF_INFO 내용 읽기
    const readInfo = () => {
        const info = getCookie("REF_INFO");

        if (info) {
            // URL 디코딩 및 JSON 파싱
            const decodedInfo = decodeURIComponent(info);
            const userInfo = JSON.parse(decodedInfo);
            console.log(userInfo);
            setUserInfo(userInfo);

        } else {
            console.log("REF_INFO 쿠키가 없습니다.");
        }
    }

    // REF_SAVE 내용 일기
    const saveIdCheck = () => {
        const save = getCookie("REF_SAVE");

        if (save !== "") {
            setLoginData((prev) => ({...prev, uid : save}));
            setSaveId(true);
        }
    }

    // 로그아웃
    const logoutBtn = () => {
        document.cookie = 'REF_LOGIN=; Max-Age=0; path=/;';
        document.cookie = 'REF_INFO=; Max-Age=0; path=/;';
        document.cookie = 'REF_AUTO=; Max-Age=0; path=/;';

        window.location.reload();
    }

    // 아이디 저장
    const rememberId = () => {
        if (saveId) {
            document.cookie = `REF_SAVE=${loginData.uid}; Max-Age=604800; path=/;`;
        }else {
            document.cookie = `REF_SAVE=; Max-Age=0; path=/;`;
        }
    }



  return (
    <MainLayout>
        <div id='DataStorage'>

            <div className='storageBox'>
                {loginState && loginState != null ? (
                    <div id='loginBox'>
                        <h2>{userInfo.userName} 님</h2>
                        <button onClick={logoutBtn}>로그아웃</button>
                    </div>
                ) : (
                    <div id='loginBox'>
                        <h2>로그인</h2>
                        <input type="text" value={loginData.uid}
                            onChange={(e) => setLoginData((prev)=>({...prev, uid:e.target.value}))}/>
                        <input type="password" value={loginData.password}
                            onChange={(e) => setLoginData((prev)=>({...prev, password:e.target.value}))}/>
                        
                        <div>
                            <label htmlFor="">
                                <input type="checkbox" checked={saveId} onChange={() => setSaveId(!saveId)}/>
                                <p>아이디 저장</p>
                            </label>
                            <label htmlFor="">
                                <input type="checkbox" onChange={(e) => autoLoginCheck(e)}/>
                                <p>자동 로그인</p>
                            </label>
                        </div>
                        
                        <button onClick={loginBtn}>login</button>
                    </div>
                )}

                <div id='sessionBox'>

                </div>
            </div>
            

        </div>
    </MainLayout>
  )
}

export default DataStorage