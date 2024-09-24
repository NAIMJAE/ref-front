import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import '../../styles/dataStorage.scss'
import { loginCheckApi, sessionLoginApi, sessionLogoutApi } from '../../api/DataStorageApi'
import ShoppingConponent from '../../component/dataStorage/ShoppingConponent'
import PopupComponent from '../../component/dataStorage/PopupComponent'

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

    // Popup State
    const [popup, setPopup] = useState(false);

    // Shopping Product Sample Data
    const [product] = useState([
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
            thumb : "ref_dataStorage_example3.PNG",
            title : "당도보장 프리미엄 꿀수박 6kg",
            explain : "꼼꼼하게 선별한 11brix이상의 꿀수박",
            price : 32000,
        },
        {
            prodId : "as89g73ga1",
            thumb : "ref_dataStorage_example4.PNG",
            title : "베트남산 고산지 스텔라나 바나나 2kg",
            explain : "해발 600m 이상 고산지에서 자란 바나나",
            price : 7000,
        },
    ]);


    // Check User Auto Login When The Page Loads
    useEffect(() => {
        const loginCheck = async () => {
            const loginCookie = getCookie("REF_LOGIN");
            const cartCookie = getCookie("REF_CART");

            if (loginCookie !== null || cartCookie === null) {
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
        checkCookie();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // Check Shopping Cart When The Page Loads
    useEffect(() => {
        prodInCartCheck();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[loginState]);

    // Check Popup State Cookie When The Page Loads
    useEffect(() => {
        const checkPopCookie = () => {
            const popupCookie = getCookie("REF_POPUP");
            if (popupCookie) {
                setPopup(false);
            }else {
                setPopup(true);
            }
        }
        checkPopCookie();
    },[])

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

        const productsId = cart.split(".");

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
    const logoutBtn = async () => {
        try {
            const response = await sessionLogoutApi();
            if (response === "SUCCESS LOGOUT") {
                document.cookie = 'REF_LOGIN=; Max-Age=0; path=/;';
                document.cookie = 'REF_INFO=; Max-Age=0; path=/;';
                document.cookie = 'REF_AUTO=; Max-Age=0; path=/;';
                document.cookie = 'REF_USER_CART=; Max-Age=0; path=/;';
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Remember User Id
    const rememberId = () => {
        if (saveId) {
            document.cookie = `REF_SAVE=${loginData.uid}; Max-Age=604800; path=/;`;
        }else {
            document.cookie = `REF_SAVE=; Max-Age=0; path=/;`;
        }
    }

    const [cookies, setCookies] = useState({
        REF_LOGIN: "null",
        REF_AUTO: "null",
        REF_SAVE: "null",
        REF_INFO: "null",
        REF_POPUP: "null",
        REF_CART: "null",
        REF_USER_CART: "null",
    });

    const checkCookie = () => {
        const cookieArr = document.cookie.split(";");

        // 새로운 쿠키 객체 생성 (현재 쿠키 상태 복사)
        let newCookies = { ...cookies };

        for (let i = 0; i < cookieArr.length; i++) {
            // 쿠키 이름과 값을 '='로 분리
            let cookiePair = cookieArr[i].split("=");

            // 쿠키 이름의 공백을 제거하고 일치하는 이름 찾기
            let name = cookiePair[0].trim(); // 쿠키 이름
            let value = decodeURIComponent(cookiePair[1]); // 쿠키 값

            // 쿠키 이름이 useState 내 상태 이름과 일치할 경우 값 업데이트
            if (newCookies.hasOwnProperty(name)) {
                newCookies[name] = value;
            }
        }

        // 상태 업데이트
        setCookies(newCookies);
    }

  return (
    <MainLayout>
        <div id='DataStorage'>

            {popup && <PopupComponent setPopup={setPopup}/>}

            <div className='ts_box'>
                <h1>웹 브라우저의 데이터 저장소</h1>
                <h2 className='bg_blue bold'>캐시 (Cache)</h2>
                <h3 >캐시는 자주 사용되거나 다시 사용할 가능성이 높은 데이터를 임시로 저장하는 역할</h3>
                <h3 >캐시는 네트워크 요청을 줄이고, 서버 부하를 줄이며, 응답 속도를 개선할 수 있음</h3>

                <h2 className='bg_blue bold'>쿠키 (Cookie)</h2>
                <h3 >쿠키는 클라이언트에 소량의 데이터를 저장하는 방법</h3>
                <h3 >사용자의 로그인 상태나 선호 설정 등을 저장하여, 클라이언트가 다시 접속했을 때 상태를 유지</h3>

                <h2 className='bg_blue bold'>세션 (Session)</h2>
                <h3 >세션은 클라이언트와 서버 간의 상태를 유지하기 위해 서버 측에서 관리되는 데이터</h3>
                <h3>클라이언트와 상호작용하는 동안 사용자의 상태를 유지하는 역할을 함</h3>

                <br/><div className='line'></div>

                <h1>쿠키와 세션을 이용한 예제</h1>
                <h2 className='bg_green bold'>로그인 (Login)</h2>
                <h3 >사용자 인증 성공시 사용자의 세션에 회원 정보를 저장한 뒤, 로그인 유무와 사용자 정보를 쿠키로 반환</h3>
                <h3 >로그인 유무와 사용자 정보를 저장하는 쿠키는 세션 쿠키로 생성되어, 해당 세션이 만료되면 사라짐</h3>
                <h3 >아이디 저장, 자동 로그인과 같은 기능은 영구 쿠키를 이용해 일정 기간동안 사용자 선택 사항을 저장</h3>

            </div>


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
                        <h3>샘플 계정 abcd1234 / abcd1234!</h3>
                    </div>
                )}
                <div id='cookieBox'>
                    {cookies && 
                        <table>
                            <tr>
                                <td>REF_LOGIN</td>
                                <td>로그인 유무</td>
                                <td>{cookies.REF_LOGIN}</td>
                            </tr>
                            <tr>
                                <td>REF_POPUP</td>
                                <td>팝업 관리</td>
                                <td>{cookies.REF_POPUP}</td>
                            </tr>
                            <tr>
                                <td>REF_AUTO</td>
                                <td>자동 로그인</td>
                                <td>{cookies.REF_AUTO}</td>
                            </tr>
                            <tr>
                                <td>REF_CART</td>
                                <td>비회원 CART</td>
                                <td>{cookies.REF_CART}</td>
                            </tr>
                            <tr>
                                <td>REF_SAVE</td>
                                <td>아이디 저장</td>
                                <td>{cookies.REF_SAVE}</td>
                            </tr>
                            <tr>
                                <td>REF_USER_CART</td>
                                <td>회원 CART</td>
                                <td>{cookies.REF_USER_CART}</td>
                            </tr>
                            <tr>
                                <td>REF_INFO</td>
                                <td>사용자 정보</td>
                                <td>{cookies.REF_INFO}</td>
                            </tr>
                        </table>
                    }
                </div>
            </div>

            <div className='ts_box'>
                <h2 className='bg_green bold'>장바구니 (Cart)</h2>
                <h3 >비로그인 상태에서 장바구니에 추가하는 상품들은 브라우저의 쿠키에 저장</h3>
                <h3 >사용자가 로그인 시 쿠키에 저장되어 있는 상품들을 사용자의 장바구니 데이터베이스에 업데이트</h3>
            </div>
            
            <ShoppingConponent product={product} userCart={userCart} loginState={loginState}
                getCookie={getCookie} setUserCart={setUserCart} prodInCartCheck={prodInCartCheck}/>

        </div>
    </MainLayout>
  )
}

export default DataStorage