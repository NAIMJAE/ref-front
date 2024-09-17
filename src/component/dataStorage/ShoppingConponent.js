import React from 'react'
import { managmentCartApi } from '../../api/DataStorageApi';

const ShoppingConponent = ({ product, userCart, loginState, getCookie, setUserCart, prodInCartCheck }) => {

    
    // 장바구니 추가
    const addCart = async (prodId) => {
        // 비 로그인
        if (loginState === null) {
            const cart = getCookie("REF_CART");
            console.log("cart", cart,"null?");

            if (cart != null) {
                const cartArr = cart.split(".");
                console.log("cartArr : ", cartArr);

                // 상품이 이미 장바구니에 있는지 확인
                const isProdInCart = cartArr.some((prod) => prod === prodId.toString());
                if (isProdInCart) {
                    window.confirm("이미 장바구니에 등록된 상품입니다.");
                    return;
                }
                
                // 상품이 없으면 추가
                const newCart = [...cartArr, prodId].join(".");
                document.cookie = `REF_CART=${newCart}; path=/;`;

            } else {
                document.cookie = `REF_CART=${prodId}; path=/;`;
            }
            product.forEach((prod) => {
                if (prod.prodId === prodId) {
                    setUserCart((prev) => [...prev, prod]);
                }
            })
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
            prodInCartCheck();
        }
    }

    // 장바구니 삭제
    const deleteCart = async (prodId) => {
        // 비 로그인
        if (loginState === null) {
            const cart = getCookie("REF_CART");
            console.log("cart : ", cart)
            const cartArr = cart.split(".");

            // 상품이 장바구니에 있는지 확인
            const isProdInCart = cartArr.some((prod) => prod === prodId.toString());
            if (!isProdInCart) {
                return;
            }
            
            // 상품이 있으면 삭제
            const newCartArr = cartArr.filter((prod) => prod !== prodId);

            const newCart = newCartArr.join(".");
            document.cookie = `REF_CART=${newCart};`;

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
                const response = await managmentCartApi(data);
            } catch (error) {
                console.log(error);
            }
            // userCart 를 response 받은 값으로 업데이트
            prodInCartCheck();
        }
    }

  return (
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
  )
}

export default ShoppingConponent