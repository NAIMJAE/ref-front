import React, { useEffect, useRef, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import '../../styles/game.scss'
import { Host } from "../../api/RootUrl";
import TictactoeComponent from '../../component/TictactoeComponent';

const Tictactoe = () => {
    const [selectedRoomId, setSelectedRoomId] = useState(null);

    /** 게임방 입장 */
    const enterRoom = (roomId) => {
        setSelectedRoomId(roomId);
    };

    return (
        <MainLayout>
            <div className='colDiv'>
                <div className='description'>
                    <h2>WebSocket</h2>
                    <h3>WebSocket은 HTML5 표준으로 정의된 통신 프로토콜입니다.</h3>
                    <h3>클라이언트와 서버 간의 양방향 통신을 가능하게 합니다.</h3>
                    <h3>연결이 설정된 후에는 HTTP의 추가 오버헤드 없이 실시간 데이터를 주고받을 수 있습니다.</h3>
                    <h3>웹소켓 연결은 지속적으로 열려 있어, 데이터가 필요한 즉시 전송할 수 있습니다.</h3>
                    <h3>서버는 클라이언트에 데이터를 푸시할 수 있습니다.</h3>
                    <ul>
                        <li>클라이언트-서버 간 양방향 통신 지원</li>
                        <li>연결이 유지되며, 실시간 데이터 전송 가능</li>
                        <li>채팅, 게임, 실시간 알림 등에 사용됨</li>
                    </ul>

                    <h2>Socket.IO</h2>
                    <h3>Socket.IO는 WebSocket 프로토콜을 활용하여 실시간 통신을 더 쉽게 구현할 수 있도록 도와주는 JavaScript 라이브러리입니다.</h3>
                    <h3>WebSocket을 포함한 여러 기술을 내부적으로 사용하여 연결을 유지합니다.</h3>
                    <h3>네트워크 환경에 따라 적합한 전송 프로토콜을 자동으로 선택합니다.</h3>
                    <h3>Socket.IO는 연결이 끊겼을 때 자동으로 재연결합니다.</h3>
                    <h3>여러 브라우저에서 동일하게 작동할 수 있도록 합니다.</h3>
                    <ul>
                        <li>WebSocket 기반의 실시간 통신 라이브러리</li>
                        <li>자동 재연결 및 브라우저 호환성 제공</li>
                        <li>실시간 채팅, 알림, 멀티플레이어 게임 등에 사용됨</li>
                    </ul>

                    <div className='gameRule'>
                    <h2>틱택토 게임 방식</h2>
                    <h3>틱택토는 3x3 격자에서 두 명의 플레이어가 'X'와 'O' 기호를 번갈아 가며 배치하는 게임입니다.</h3>
                    <h3>가로, 세로, 대각선 방향 중 하나로 같은 기호를 3개 연속으로 놓으면 승리합니다.</h3>
                    <h3>게임이 무승부로 끝나거나, 한 플레이어가 승리할 때까지 차례를 계속합니다.</h3>
                    <ul>
                        <li>두 명의 플레이어: X와 O</li>
                        <li>가로, 세로, 대각선으로 기호 3개를 먼저 맞추는 사람이 승리</li>
                        <li>모든 칸이 채워질 때까지 승자가 없으면 무승부</li>
                    </ul>
                    </div>
                </div>

                <div className='roomList'>
                    {[1, 2, 3].map(roomId => (
                        <div key={roomId} className='room' onClick={() => enterRoom(roomId)}>
                            <h1>{roomId}번 방</h1>
                        </div>
                    ))}
                </div>
                {selectedRoomId && <TictactoeComponent roomId={selectedRoomId} />}
            </div>
        </MainLayout>
    )
}

export default Tictactoe