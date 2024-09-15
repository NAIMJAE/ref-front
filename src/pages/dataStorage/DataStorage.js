import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import '../../styles/dataStorage.scss'
import { loginCheckApi, sessionLoginApi } from '../../api/DataStorageApi'
import ShoppingConponent from '../../component/dataStorage/ShoppingConponent'

const DataStorage = () => {

    // 쿠키에서 login 유무 저장
    const [loginState, setLoginState] = useState(null);

    // login 입력 정보
    const [loginData, setLoginData] = useState({
        uid : "",
        password : "",
        autoLogin : false,
    })

    // User Info From Cookie
    const [userInfo, setUserInfo] = useState("");

    // User Id Save Check
    const [saveId, setSaveId] = useState(false);

    // User Cart
    const [userCart, setUserCart] = useState([]);

    // Shopping Product Sample Data
    const [product, setProduct] = useState([
        {
            prodId : "a11g3g12a7",
            thumb : "ref_dataStorage_example1.png",
            title : "고당도 산지직송 국내산 토마토 5kg",
            explain : "토마토 특유의 신맛이 적어 먹기 편한 토마토",
            price : 39000,
        },
        {
            prodId : "8gj3820fja",
            thumb : "ref_dataStorage_example2.png",
            title : "국내산 싱싱한 쪽파 300g",
            explain : "식용증진, 우울증 불면증 개선",
            price : 8000,
        },
        {
            prodId : "a82gja72nz",
            thumb : "ref_dataStorage_example3.png",
            title : "당도보장 프리미엄 꿀수박 6kg",
            explain : "꼼꼼하게 선별한 11brix이상의 꿀수박",
            price : 32000,
        },
        {
            prodId : "as89g73ga1",
            thumb : "ref_dataStorage_example4.png",
            title : "베트남산 고산지 스텔라나 바나나 2kg",
            explain : "해발 600m 이상 고산지에서 자란 바나나",
            price : 7000,
        },
    ]);


    // Check User Auto Login When The Page Loads
    useEffect(() => {
        console.log("loginState : ",loginState)
        const loginCheck = async () => {
            const loginCookie = getCookie("REF_LOGIN");
            const cartCookie = getCookie("REF_CART");
            console.log("loginCookie : ", loginCookie);
            console.log("cartCookie : ", cartCookie);

            if (loginCookie !== null || cartCookie === null) {
                console.log("ㅎ2")
                try {
                    const response = await loginCheckApi(); 
                    console.log("Login Check Response : ",response);
    
                    setLoginState(getCookie("REF_LOGIN"));
                    readInfo(); // REF_INFO Cookie Check
                } catch (error) {
                    console.log(error);
                }
            }
        }
        loginCheck();
        saveIdCheck(); // REF_SAVE Cookie Check
    },[])

    // Check Shopping Cart When The Page Loads
    useEffect(() => { prodInCartCheck(); },[loginState]);

    // 장바구니 체크
    const prodInCartCheck = () => {
        setUserCart(""); // 장바구니 state 초기화

        let cart = "";
        if (loginState === null) {
            cart = getCookie("REF_CART");
        }else {
            cart = getCookie("REF_USER_CART");
        }

        if (cart === null) {return;}; // Cart가 비었으면 중단

        const productsId = cart.split(",");

        // 장바구니 state에 상품 삽입
        productsId.forEach((prodId) => {
            product.forEach((prod) => {
                if (prodId === prod.prodId) {
                    setUserCart((prev) => [...prev, prod]);
                }
            });
        });
    }

    // Read Cookie Value
    const getCookie = (name) => {
        const cookieArr = document.cookie.split(";");
        for (let i = 0; i < cookieArr.length; i++) {

            // 쿠키 이름과 값을 '='로 분리
            let cookiePair = cookieArr[i].split("=");
            // 쿠키 이름의 공백을 제거하고 일치하는 이름 찾기
            if (name === cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);
            }
        }
        return null;  // 일치하는 쿠키가 없을 때
    };

    // Auto Login Check
    const autoLoginCheck = (e) => {
        if (e.target.checked) {
            setLoginData((prev)=>({...prev, autoLogin:true}));
        }else {
            setLoginData((prev)=>({...prev, autoLogin:false}));
        }
    }

    // Login
    const loginBtn = async () => {
        if (loginData.uid === "" || loginData.password === "") {
            alert("아이디와 비밀번호를 입력해주세요.");
            return;
        }

        try {
            const response = await sessionLoginApi(loginData);

            if (response === "SUCCESS LOGIN") {
                setLoginState(getCookie("REF_LOGIN"));
                readInfo(); // REF_INFO Cookie Check
                rememberId(); // REF_SAVE Cookie Check
            }else {
                alert(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Read REF_INFO Cookie
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

    // Read REF_SAVE Cookie
    const saveIdCheck = () => {
        const save = getCookie("REF_SAVE");

        if (save !== null) {
            setLoginData((prev) => ({...prev, uid : save}));
            setSaveId(true);
        }
    }

    // Logout
    const logoutBtn = () => {
        document.cookie = 'REF_LOGIN=; Max-Age=0; path=/;';
        document.cookie = 'REF_INFO=; Max-Age=0; path=/;';
        document.cookie = 'REF_AUTO=; Max-Age=0; path=/;';
        document.cookie = 'REF_USER_CART=; Max-Age=0; path=/;';
        window.location.reload();
    }

    // Remember User Id
    const rememberId = () => {
        if (saveId) {
            document.cookie = `REF_SAVE=${loginData.uid}; Max-Age=604800; path=/;`;
        }else {
            document.cookie = `REF_SAVE=; Max-Age=0; path=/;`;
        }
    }

    // 팝업창 만들기, 노션 정리, 프론트에서 만든 쿠키는 서버로 넘어가지 않는 것 같음 (해결방법 찾기)

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
            </div>
            
            <ShoppingConponent product={product} userCart={userCart} loginState={loginState}
                getCookie={getCookie} setUserCart={setUserCart} prodInCartCheck={prodInCartCheck}/>

        </div>
    </MainLayout>
  )
}

export default DataStorage