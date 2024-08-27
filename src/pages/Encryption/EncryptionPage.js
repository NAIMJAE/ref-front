import React, { useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import '../../styles/encryption.scss'
import { BCryptEncryptionApi, SHAEncryptionApi } from '../../api/EncryptionApi';

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

  return (
    <MainLayout>
        <div id='Encryption'>
            <h1>단방향 암호화</h1>
            <div className='encodeBox'>
                <h2>SHA-256</h2>
                <h3>입력 데이터를 256비트(32바이트) 크기의 고정된 출력 값으로 변환</h3>
                <h3>동일한 입력에 대해 항상 동일한 출력을 생성</h3>
                <h3>SHA-256은 일방향 해시 함수로, 해시 값을 통해 원래 입력 데이터를 복원할 수 없음</h3>

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

            <div className='encodeBox'>
                <h2>BCrypt</h2>
                <h3>BCrypt는 Blowfish 암호 알고리즘의 확장판을 기반으로 한 해시 함수</h3>
                <h3>비밀번호 해시화에 사용되는 강력한 암호화 알고리즘</h3>
                <h3>Salt와 반복 횟수를 사용하여 보안을 강화 / salt는 암호화 과정에서 자동 생성 / 반복 횟수는 기본 10회</h3>
                <h3>Salt는 비밀번호 해싱 과정에 추가되어, 같은 비밀번호라도 다른 Salt 값으로 다른 해시 결과 생성</h3>
                <h3>반복횟수는 최소 4 ~ 최대 31 까지 가능 (10 : 기본값, 12 : 높은 보안 요구시, 14 : 매우 높은 보안 요구시)</h3>
                <h3>Blowfish 알고리즘을 2^N 번 반복이 진행되어 N(반복 횟수)가 높으면 보안이 강력해지지만 연산 시간이 기하급수적으로 상승</h3>
                <h3>최소 반복 횟수: 4 (2^4 = 16번의 반복 작업) / <span>최대 반복 횟수: 31 (2^31 = 약 21억 번의 반복 작업)</span></h3>

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
                            <input type="number" min={4} max={31} value={BCryptResult.Work}
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
        </div>
    </MainLayout>
  )
}

export default EncryptionPage