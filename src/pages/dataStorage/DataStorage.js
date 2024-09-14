import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import '../../styles/dataStorage.scss'
import { addCartApi, loginCheckApi, managmentCartApi, sessionLoginApi } from '../../api/DataStorageApi'

const DataStorage = () => {

    // 쿠키에서 login 유무 저장
    const [loginState, setLoginState] = useState("");

    // login 입력 정보
    const [loginData, setLoginData] = useState({
        uid : "",
        password : "",
        autoLogin : false,
    })

    // 쿠키에서 사용자 정보 저장
    const [userInfo, setUserInfo] = useState("");

    // 아이디 저장 체크
    const [saveId, setSaveId] = useState(false);

    // 사용자 장바구니
    const [userCart, setUserCart] = useState([]);

    // 쇼핑 예제 데이터
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

    // 페이지에 들어올때 자동 로그인 유무 확인하는 useEffect
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
        // 아이디 저장 체크
        saveIdCheck();
        // 장바구니 체크
        prodInCartCheck();

    },[])

    // 장바구니 체크
    const prodInCartCheck = () => {
        if (loginState === "") {
            const cart = getCookie("REF_CART");
            if (cart === "") {return;}

            const productsId = cart.split(",");

            productsId.forEach((prodId) => {
                product.forEach((prod) => {
                    if (prodId === prod.prodId) {
                        setUserCart((prev) => [...prev, prod]);
                    }
                });
            });
            
        }
    }

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

    // REF_SAVE 내용 읽기
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

    // 장바구니 추가
    const addCart = async (prodId) => {
        // 비 로그인
        if (loginState === "") {
            const cart = getCookie("REF_CART");
            console.log("하이", cart);

            if (cart !== "") {
                const cartArr = cart.split(",");

                // 상품이 이미 장바구니에 있는지 확인
                const isProdInCart = cartArr.some((prod) => prod === prodId.toString());
                if (isProdInCart) {
                    window.confirm("이미 장바구니에 등록된 상품입니다.");
                    return;
                }
                
                // 상품이 없으면 추가
                const newCart = [...cartArr, prodId].join(",");
                document.cookie = `REF_CART=${newCart}; path=/;`;

                product.forEach((prod) => {
                    if (prod.prodId === prodId) {
                        setUserCart((prev) => [...prev, prod]);
                    }
                })

            } else {
                document.cookie = `REF_CART=${prodId}; path=/;`;
            }
        }else {
            // 로그인 시
            const data = {
                type : "insert",
                prodId : prodId,
            }
            try {
                const response = await managmentCartApi(data);
            } catch (error) {
                console.log(error);
            }
            // userCart 를 response 받은 값으로 업데이트
        }
    }

    // 장바구니 삭제
    const deleteCart = async (prodId) => {
        // 비 로그인
        if (loginState === "") {
            const cart = getCookie("REF_CART");
            const cartArr = cart.split(",");

            // 상품이 장바구니에 있는지 확인
            const isProdInCart = cartArr.some((prod) => prod === prodId.toString());
            if (!isProdInCart) {
                return;
            }
            
            // 상품이 있으면 삭제
            const newCartArr = cartArr.filter((prod) => prod !== prodId);

            const newCart = newCartArr.join(",");
            document.cookie = `REF_CART=${newCart}; path=/;`;

            setUserCart((prevCart) =>
                prevCart.filter((prod) => prod.prodId !== prodId)
            );

        }else {
            // 로그인 시
            const data = {
                type : "delete",
                prodId : prodId,
            }
            try {
                const response = await managmentCartApi(prodId);
            } catch (error) {
                console.log(error);
            }
            // userCart 를 response 받은 값으로 업데이트
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
            </div>
            
            <div className='storageBox'>
                <div className='shoppingBox'>
                    <h2>쇼핑</h2>
                    {product && product.map((prod, index) => (
                        <div key={index}>
                            <img src={`../../images/dataStorage/${prod.thumb}`} alt="" />
                            <div>
                                <h1>{prod.title}</h1>
                                <h2>{prod.explain}</h2>
                                <div>
                                    <h3>{prod.price}원</h3>
                                    <button onClick={() => addCart(prod.prodId)}>장바구니</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='shoppingBox'>
                    <h2>장바구니</h2>
                    {userCart && userCart.map((prod, index) => (
                        <div key={index}>
                            <img src={`../../images/dataStorage/${prod.thumb}`} alt="" />
                            <div>
                                <h1>{prod.title}</h1>
                                <h2>{prod.explain}</h2>
                                <div>
                                    <h3>{prod.price}원</h3>
                                    <button onClick={() => deleteCart(prod.prodId)}>삭제</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    </MainLayout>
  )
}

export default DataStorage