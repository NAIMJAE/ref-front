import React, { useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import '../../styles/encryption.scss'
import { AESDecryptionApi, AESEncryptionApi, BCryptEncryptionApi, cerateRSAKeysApi, RSADecryptionApi, RSAEncryptionApi, SHAEncryptionApi } from '../../api/EncryptionApi';

const EncryptionPage = () => {

    /** SHA-256 */
    const [SHAResult, setSHAResult] = useState({
        Plaintext: "",
        Ciphertext: "",
    });

    const [SHARecode, setSHARecode] = useState({
        Plaintext: [],
        Ciphertext: [],
    })

    /** SHA-256 암호화 전송 */
    const SHAEncryption = async () => {
        try {
            const response = await SHAEncryptionApi(SHAResult.Plaintext);
            // 기록 업데이트
            setSHARecode((prev) => ({
                Plaintext: [...prev.Plaintext, SHAResult.Plaintext],
                Ciphertext: [...prev.Ciphertext, response]
            }));
        } catch (error) {
            console.log(error);
        }
    };

    /** BCrypt */
    const [BCryptResult, setBCryptResult] = useState({
        Plaintext: "",
        Work: 10,
    });

    const [BCryptRecode, setBCryptRecode] = useState({
        Plaintext: [],
        Work: [],
        Ciphertext: [],
    })

    /** BCrypt 암호화 전송 */
    const BCryptEncryption = async () => {
        try {
            const response = await BCryptEncryptionApi(BCryptResult);
            // 기록 업데이트
            setBCryptRecode((prev) => ({
                Plaintext: [...prev.Plaintext, BCryptResult.Plaintext],
                Work: [...prev.Work, BCryptResult.Work],
                Ciphertext: [...prev.Ciphertext, response]
            }));
        } catch (error) {
            console.log(error);
        }
    };

    /** AES */
    const [AESResult, setAESResult] = useState({
        Plaintext: "",
        Bit: 128,
    });

    const [AESRecode, setAESRecode] = useState({
        Plaintext: "",
        Bit: "",
        SecretKey: "",
        ivParameterSpec: "",
        Ciphertext: "",
    })

    const [AESDecrypt, setAESDecrypt] = useState({
        Plaintext: "",
        SecretKey: "",
        ivParameterSpec: "",
        Ciphertext: "",
    });

    /** AES 암호화 전송 */
    const AESEncryption = async () => {
        try {
            const response = await AESEncryptionApi(AESResult);
            // 기록 업데이트
            setAESRecode({
                Plaintext: AESResult.Plaintext,
                Bit: AESResult.Bit,
                SecretKey: response.SecretKey,
                ivParameterSpec: response.ivParameterSpec,
                Ciphertext: response.CipherText
            });
            setAESDecrypt({
                SecretKey: response.SecretKey,
                ivParameterSpec: response.ivParameterSpec,
                Ciphertext: response.CipherText
            });
        } catch (error) {
            console.log(error);
        }
    };

    /** AES 복호화 전송 */
    const AESDecryption = async () => {
        try {
            const response = await AESDecryptionApi(AESDecrypt);
            // 기록 업데이트
            setAESDecrypt((prev) => ({...prev, Plaintext:response,}));
        } catch (error) {
            console.log(error);
        }
    };

    /** RSA */
    const [userA, setUserA] = useState({
        publicKey : "",
        privateKey : "",
    })

    const [userB, setUserB] = useState({
        publicKey : "",
        privateKey : "",
    })

    const [RSAprocess, setRSAprocess] = useState({
        plainText : "",
        cipherText : "",
        reception : "",
        result : "",
    })

    /** RSA KEY 생성 */
    const cerateRSAKeys = async (user) => {
        try {
            const response = await cerateRSAKeysApi();
            console.log("key",response);
            if (user === "userA") {
                setUserA({
                    publicKey : response.publicKey,
                    privateKey : response.privateKey,
                })
            }else {
                setUserB({
                    publicKey : response.publicKey,
                    privateKey : response.privateKey,
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    /** RSA 암호화 */
    const RSAEncryption = async (type) => {
        if (userA.publicKey === "" || userB.publicKey === "") {
            alert("KEY를 생성해주세요.");
            return;
        }else if (RSAprocess.plainText === "") {
            alert("암호화할 문자를 입력해주세요.");
            return;
        }
        const data = {
            plainText : RSAprocess.plainText,
            key : "",
            keyType : type,
        }

        if (type === "public") {
            data.key = userB.publicKey;
        }else {
            data.key = userA.privateKey;
        }

        try {
            const response = await RSAEncryptionApi(data);
            setRSAprocess((prev) => ({...prev, cipherText:response}));
        } catch (error) {
            console.log(error);
        }
    }

    /** RSA 복호화 */
    const RSADecryption = async (type) => {
        if (userA.publicKey === "" || userB.publicKey === "") {
            alert("KEY를 생성해주세요.");
            return;
        }else if (RSAprocess.reception === "") {
            alert("복호화할 문자를 수신해주세요.");
            return;
        }

        const data = {
            cipherText : RSAprocess.reception,
            key : "",
            keyType : type,
        }

        if (type === "public") {
            data.key = userA.publicKey;
        }else {
            data.key = userB.privateKey;
        }

        try {
            const response = await RSADecryptionApi(data);
            setRSAprocess((prev) => ({...prev, result:response}));
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <MainLayout>
        <div id='Encryption'>
            <div className='ts_box'>
                <h1 className='bg_red'>단방향 암호화</h1>
                <h2 className='bg_blue bold'>SHA-256</h2>
                <h3>※ 입력 데이터를 256비트(32바이트) 크기의 고정된 출력 값으로 변환</h3>
                <h3>※ 동일한 입력에 대해 항상 동일한 출력을 생성</h3>
                <h3>※ SHA-256은 일방향 해시 함수로, 해시 값을 통해 원래 입력 데이터를 복원할 수 없음</h3>
            </div>
            
            <div className='encodeBox frame'>
                <div className='encoding'>
                    <h4>암호화</h4>
                    <div>
                        <div>
                            <h5>전송 메세지 : </h5>
                            <input type="text" value={SHAResult.Plaintext}
                                onChange={(e) => setSHAResult((prev) => ({ ...prev, Plaintext: e.target.value }))}/>
                        </div>
                    </div>
                    <button onClick={SHAEncryption}>전송</button>   
                </div>

                <table className='oneWayTable'>
                    <tr>
                        <td></td>
                        <td>평문</td>
                        <td>암호문</td>
                    </tr>
                    <tr>
                        <td>기록</td>
                        <td>
                            {SHARecode.Plaintext.length > 0 && (
                                <ul>
                                    {SHARecode.Plaintext.map((text, index) => (
                                        <li key={index}>
                                            {text}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </td>
                        <td>
                            {SHARecode.Ciphertext.length > 0 && (
                                <ul>
                                    {SHARecode.Ciphertext.map((cipher, index) => (
                                        <li key={index}>
                                            {cipher}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </td>
                    </tr>
                </table>
            </div>

            <div className='ts_box'>
                <h2 className='bg_blue bold'>BCrypt</h2>
                <h3>※ BCrypt는 Blowfish 암호 알고리즘의 확장판을 기반으로 한 해시 함수</h3>
                <h3>※ 비밀번호 해시화에 사용되는 강력한 암호화 알고리즘</h3>
                <h3>※ Salt와 반복 횟수를 사용하여 보안을 강화 / salt는 암호화 과정에서 자동 생성 / 반복 횟수는 기본 10회</h3>
                <h3>※ Salt는 비밀번호 해싱 과정에 추가되어, 같은 비밀번호라도 다른 Salt 값으로 다른 해시 결과 생성</h3>
                <h3>※ 반복횟수는 최소 4 ~ 최대 31 까지 가능 (10 : 기본값, 12 : 높은 보안 요구시, 14 : 매우 높은 보안 요구시)</h3>
                <h3>※ Blowfish 알고리즘을 2^N 번 반복이 진행되어 N(반복 횟수)가 높으면 보안이 강력해지지만 연산 시간이 기하급수적으로 상승</h3>
                <h3>※ 최소 반복 횟수: 4 (2^4 = 16번의 반복 작업) / <span className='red bold'>최대 반복 횟수: 31 (2^31 = 약 21억 번의 반복 작업)</span></h3>
            </div>

            <div className='encodeBox frame'>
                <div className='encoding'>
                    <h4>암호화</h4>
                    <div>
                        <div>
                            <h5>전송 메세지 : </h5>
                            <input type="text" value={BCryptResult.Plaintext}
                                onChange={(e) => setBCryptResult((prev) => ({ ...prev, Plaintext: e.target.value }))}/>
                        </div>
                        <div>
                            <h5>반복 횟수 : </h5>
                            <input type="number" min={4} max={16} value={BCryptResult.Work}
                                onChange={(e) => setBCryptResult((prev) => ({ ...prev, Work: e.target.value }))}/>
                        </div>
                    </div>
                    <button onClick={BCryptEncryption}>전송</button>
                </div>

                <table className='oneWayTable'>
                    <tr>
                        <td></td>
                        <td>평문</td>
                        <td>반복횟수</td>
                        <td>암호문</td>
                    </tr>
                    <tr>
                        <td>기록</td>
                        <td>
                            {BCryptRecode.Plaintext.length > 0 && (
                                <ul>
                                    {BCryptRecode.Plaintext.map((text, index) => (
                                        <li key={index}>
                                            {text}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </td>
                        <td>
                            {BCryptRecode.Work.length > 0 && (
                                <ul>
                                    {BCryptRecode.Work.map((N, index) => (
                                        <li key={index}>
                                            {N}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </td>
                        <td>
                            {BCryptRecode.Ciphertext.length > 0 && (
                                <ul>
                                    {BCryptRecode.Ciphertext.map((cipher, index) => (
                                        <li key={index}>
                                            {cipher}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </td>
                    </tr>
                </table>
            </div>

            <div className='ts_box'>
                <br/><div className='line'></div>
                <h1 className='bg_red'>양방향 암호화</h1>
                <h2 className='bg_blue bold'>AES</h2>
                <h3>※ 현재 가장 널리 사용되는 대칭 키 암호화 알고리즘</h3>
                <h3>※ AES는 데이터를 블록 단위로 암호화하며, 보통 128bit, 192bit, 256bit의 키 길이를 사용</h3>
                <h3>※ bit에 따라서 AES-128, AES-192, AES-256 으로 나누어짐</h3>
            </div>

            <div className='encodeBox frame'>
                <div className='encoding'>
                    <h4>암호화</h4>
                    <div>
                        <div>
                            <h5>전송 메세지 : </h5>
                            <input type="text" value={AESResult.Plaintext}
                                onChange={(e) => setAESResult((prev) => ({ ...prev, Plaintext: e.target.value }))}/>
                        </div>
                        <div>
                            <h5>암호화 키 bit : </h5>
                            <select value={AESResult.Bit} onChange={(e) => setAESResult((prev) => ({ ...prev, Bit: e.target.value }))}>
                                <option value="128">128bit</option>
                                <option value="192">192bit</option>
                                <option value="256">256bit</option>
                            </select>
                        </div>
                    </div>
                    <button onClick={AESEncryption}>전송</button>
                </div>

                <table className='oneWayTable'>
                    <tr>
                        <td></td>
                        <td>평문</td>
                        <td>bit수</td>
                        <td>SecretKey</td>
                        <td>암호문</td>
                    </tr>
                    <tr>
                        <td>결과</td>
                        <td>{AESRecode.Plaintext}</td>
                        <td>{AESRecode.Bit}</td>
                        <td>{AESRecode.SecretKey}</td>
                        <td>{AESRecode.Ciphertext}</td>
                    </tr>
                </table>

                <div className='encoding'>
                    <h4>복호화</h4>
                    <div>
                        <div>
                            <h5>암호문 : </h5>
                            <input type="text" value={AESDecrypt.Ciphertext}
                                onChange={(e) => setAESDecrypt((prev) => ({ ...prev, Ciphertext: e.target.value }))}/>
                        </div>
                        <div>
                            <h5>SecretKey : </h5>
                            <input type="text" value={AESDecrypt.SecretKey}
                                onChange={(e) => setAESDecrypt((prev) => ({ ...prev, SecretKey: e.target.value }))}/>
                        </div>
                    </div>
                    <button onClick={AESDecryption}>전송</button>
                    <p>복호화된 평문 : {AESDecrypt.Plaintext}</p>
                </div>
            </div>

            <div className='ts_box'>
                <h2 className='bg_blue bold'>RSA</h2>
                <h3>※ RSA는 전 세계에서 가장 많이 사용되는 공개키 암호 알고리즘</h3>
                <h3>※ 공개 키와 비밀 키 쌍을 사용하여 데이터를 암호화하고 복호화</h3>
                <h3>※ RSA 알고리즘의 보안성은 소인수분해 문제가 매우 복잡하고 시간이 많이 걸린다는 점에 근거</h3>
                <h3>※ B의 공개 키로 암호화 - B의 비밀번호 키로 복호화 (기밀성 보장을 위한 암호화)</h3>
                <h3>※ A의 비밀 키로 암호화 - A의 공개 키로 복호화 (무결성 및 인증 보장)</h3>
            </div>

            <div className='encodeBox frame'>
                <table className='RSATable'>
                    <tr>
                        <td>USER A <button onClick={() => cerateRSAKeys("userA")}>key 생성</button></td>
                        <td>USER B <button onClick={() => cerateRSAKeys("userB")}>key 생성</button></td>
                    </tr>
                    <tr>
                        <td>공개 키 : <input type="text" value={userA.publicKey} /></td>
                        <td>공개 키 : <input type="text" value={userB.publicKey} /></td>
                    </tr>
                    <tr>
                        <td>비밀 키 : <input type="text" value={userA.privateKey} /></td>
                        <td>비밀 키 : <input type="text" value={userB.privateKey} /></td>
                    </tr>
                </table>

                <table className='RSATable2'>
                    <tr>
                        <td colSpan={2}>USER A</td>
                        <td></td>
                        <td colSpan={2}>USER B</td>
                    </tr>
                    <tr>
                        <td>메세지</td>
                        <td>
                            <input type="text" value={RSAprocess.plainText}
                                onChange={(e) => setRSAprocess((prev) => ({...prev, plainText: e.target.value}))}/>
                        </td>
                        <td></td>
                        <td>수신</td>
                        <td>
                            <input type="text" value={RSAprocess.reception}
                                onChange={(e) => setRSAprocess((prev) => ({...prev, reception: e.target.value}))}/>
                        </td>
                    </tr>
                    <tr>
                        <td>암호화</td>
                        <td>
                            <button className='userBBtn' onClick={() => RSAEncryption("public")}>[USER B] 공개 키로 암호화</button>
                            <button className='userABtn' onClick={() => RSAEncryption("private")}>[USER A] 비밀 키로 암호화</button>
                        </td>
                        <td></td>
                        <td>복호화</td>
                        <td>
                            <button className='userABtn' onClick={() => RSADecryption("public")}>[USER A] 공개 키로 복호화</button>
                            <button className='userBBtn' onClick={() => RSADecryption("private")}>[USER B] 비밀 키로 복호화</button>
                        </td>
                    </tr>
                    <tr>
                        <td>암호문</td>
                        <td>
                            <input type="text" value={RSAprocess.cipherText} readOnly/>
                            <button onClick={(e) => setRSAprocess((prev) => ({...prev, reception: RSAprocess.cipherText}))}>전송</button>
                        </td>
                        <td></td>
                        <td>결과</td>
                        <td><span>{RSAprocess.result}</span></td>
                    </tr>
                </table>
            </div>

        </div>
    </MainLayout>
  )
}

export default EncryptionPage