import React, { useEffect, useRef, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import '../../styles/game.scss'
import TictactoeComponent from '../../component/TictactoeComponent';
import { Host } from "../../api/RootUrl";
import { useSelector } from 'react-redux';

const Tictactoe = () => {
    const loginSlice = useSelector((state) => state.loginSlice);
    const [selectedRoomId, setSelectedRoomId] = useState(0);
    const [roomPlayers, setRoomPlayers] = useState({ 1: 0, 2: 0, 3: 0 });
    /**  내 차례인지 확인하는 변수 */
    const [myTurn, setMyTurn] = useState(true);

    /** 현재 플레이어의 기호 (X 또는 O) */
    const [playerSymbol, setPlayerSymbol] = useState("");

    /** playerSymbol의 최신 값을 추적하기 위한 useRef 생성  */
    const playerSymbolRef = useRef(playerSymbol);

    /** 게임 보드 2차원 배열  */
    const [board, setBoard] = useState([
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]);
    const webSocket = useRef();
    useEffect(() => {
        /** 소켓 연결 */
        webSocket.current = new WebSocket(`wss://${Host}/ref/tictactoe`);

        webSocket.current.onopen = () => {
            console.log('WebSocket 연결!');
        };

        webSocket.current.onmessage = (event) => {
            const message = JSON.parse(event.data);

            switch (message.type) {
                // 방 인원 정보 
                case 'roomlist':
                    console.log("Room 플레이어  : ", message.rooms);
                    setRoomPlayers(message.rooms);
                    break;
                // 방 정원 초과  
                case 'full':
                    alert(message.message);
                    webSocket.current.close();
                    break;
                // 상대방 나감 
                case 'opponentLeft':
                    alert("상대방이 게임을 떠났습니다.");
                    setPlayerSymbol('X');
                    // 보드 초기화
                    setBoard([
                        [null, null, null],
                        [null, null, null],
                        [null, null, null],
                    ]);
                    setMyTurn(true);
                    break;
                // 방 이동 
                case 'moveRoom':
                    setBoard([
                        [null, null, null],
                        [null, null, null],
                        [null, null, null],
                    ]);
                    setSelectedRoomId(message.roomId);
                    setPlayerSymbol(message.player === 1 ? 'X' : 'O');
                    setMyTurn(message.player === 1); // 첫 번째 플레이어가 X이고, 먼저 시작함
                    break;
                // 게임 진행 
                case 'makeMove':
                    setBoard(message.board);
                    setMyTurn((prevTurn) => !prevTurn);
                    break;
                // 게임 종료 
                case 'gameOver':
                    gameOver(message);
                    break;

                default:
                    console.log('Unknown message type:', message.type);
                    break;
            }
        };

        webSocket.current.onclose = (error) => {
            console.log('WebSocket 연결이 종료되었습니다.', error);
        };

        webSocket.current.onerror = (error) => {
            console.log('WebSocket 에러:', error);
        };

        return () => {
            webSocket.current.close();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginSlice]);

    useEffect(() => {
        playerSymbolRef.current = playerSymbol;
    }, [playerSymbol])

    /** 게임 종료 함수 */
    const gameOver = (message) => {

        if (message.winner === playerSymbolRef.current) {
            alert('You Win!');
        } else if (message.winner === null) {
            alert('Draw!');
        } else {
            alert('You Lose!');
        }

        // 서버에 방 나가기 요청을 보냅니다.
        webSocket.current.send(JSON.stringify({
            type: 'leaveRoom',
            roomId: selectedRoomId,
        }));
        // 클라이언트 측 상태 초기화
        setBoard([
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ]);
        setSelectedRoomId(0); // 대기실로 이동
        setPlayerSymbol('');
        setMyTurn(false);
    };


    /** 방 이동 요청 */
    const changeRoomHandler = (roomId) => {

        if (loginSlice.uid == null) {
            alert("로그인한 회원만 이용할 수 있습니다.");
            return;
        }
        webSocket.current.send(JSON.stringify({
            type: 'moveRoom',
            roomId: roomId,
            userId: loginSlice.uid,
        }));

    }

    /** 게임 플레이 */
    const clickHandler = (rowIndex, colIndex) => {
        // 방 인원이 2명이 아니면 무시
        if(roomPlayers[selectedRoomId] !== 2) {
            alert('상대방 입장을 기다리는 중 ... ');
            return;
        }
        // 이미 클릭된 버튼이거나 내 차례가 아닐 때 무시
        if (board[rowIndex][colIndex] !== null || !myTurn) return;

        // 업데이트를 위한 새 배열 
        const newBoard = board.map((row, rIndex) =>
            row.map((cell, cIndex) =>
                // 해당 버튼의 인덱스 값만 변경 
                rIndex === rowIndex && cIndex === colIndex ? playerSymbol : cell
            )
        );

        // 게임 종료 조건 확인 
        const winner = checkWinner(newBoard);

        // 2차원 배열을 1차원 배열로 변환하고 모든 셀이 채워졌는지 확인
        const isBoardFull = newBoard.flat().every(cell => cell !== null);

        if (winner) {
            // 승리했으면 승리자의 기호를 직접 전송
            webSocket.current.send(JSON.stringify({
                type: 'gameOver',
                roomId: selectedRoomId,
                winner: playerSymbol,
            }));
        } else if (isBoardFull) {
            // 무승부일 때
            webSocket.current.send(JSON.stringify({
                type: 'gameOver',
                roomId: selectedRoomId,
                winner: null,
            }));
        } else {
            // 종료 조건에 맞지 않으면  
            setBoard(newBoard);

            // 서버에 업데이트된 보드 상태 전송
            webSocket.current.send(JSON.stringify({
                type: 'makeMove',
                board: newBoard,
                roomId: selectedRoomId,
                nextTurn: playerSymbol === 'X' ? 'O' : 'X'
            }));
        }
    }

    /** 게임 종료 조건 확인 */
    const checkWinner = (board) => {
        const winningCombinations = [
            // 행
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            // 열
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            // 대각선
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]],
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (
                board[a[0]][a[1]] &&
                board[a[0]][a[1]] === board[b[0]][b[1]] &&
                board[a[0]][a[1]] === board[c[0]][c[1]]
            ) {
                return board[a[0]][a[1]];
            }
        }
        return null;

    }

    return (
        <MainLayout>
            <div className='colDiv'>
                <div className='ts_box'>
                    <h1>Tic-Tac-Toe</h1>
                    <h2 className='bg_blue bold'>WebSocket</h2>
                    <h3>WebSocket은 HTML5 표준으로 정의된 <b className='green'>통신 프로토콜</b>입니다.</h3>
                    <h3>클라이언트와 서버 간의 양방향 통신을 가능하게 합니다.</h3>
                    <h3>연결이 설정된 후에는 HTTP의 추가 오버헤드 없이 실시간 데이터를 주고받을 수 있습니다.</h3>
                    <h3>웹소켓 연결은 지속적으로 열려 있어, 데이터가 필요한 즉시 전송할 수 있습니다.</h3>
                    <h3>서버는 클라이언트에 데이터를 푸시할 수 있습니다.</h3>
                    <ul>
                        <li>클라이언트-서버 간 양방향 통신 지원</li>
                        <li>연결이 유지되며, 실시간 데이터 전송 가능</li>
                        <li>채팅, 게임, 실시간 알림 등에 사용됨</li>
                    </ul>
                    <div className='line'></div>
                    <h2 className='bg_blue bold'>Socket.IO</h2>
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
                        <div key={roomId} className={`room ${selectedRoomId === roomId ? 'usedRoom' : ''} color${roomId}`}
                            onClick={() => changeRoomHandler(roomId)}>
                            <h1>{roomId}번 방</h1>
                            <h1>{roomPlayers[roomId] || 0}명 / 2명</h1>
                        </div>
                    ))}
                </div>
                {playerSymbol !== "" && <h2 className='symbol'>내 심볼 : {playerSymbol}</h2>}
                {roomPlayers[selectedRoomId] !== 2 && <h2 className='symbol'>상대방 입장을 기다리는 중...</h2>}
                {selectedRoomId !== 0 && <TictactoeComponent clickHandler={clickHandler} myTurn={myTurn} board={board} />}
            </div>
        </MainLayout>
    )
}

export default Tictactoe