import React, { useEffect, useRef, useState } from 'react';
import { Host } from "../api/RootUrl";

const TictactoeComponent = ({ roomId }) => {
    /**  내 차례인지 확인하는 변수 */
    const [myTurn, setMyTurn] = useState(true);

    /** 현재 플레이어의 기호 (X 또는 O) */
    const [playerSymbol, setPlayerSymbol] = useState(null);

    /** 게임 보드 2차원 배열  */
    const [board, setBoard] = useState([
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]);
    const webSocket = useRef();
    useEffect(() => {
        console.log('Updated playerSymbol:', playerSymbol);
    }, [playerSymbol]);
    
    useEffect(() => {
        /** 소켓 연결 */
        webSocket.current = new WebSocket(`ws://${Host}:8080/ref/tictactoe/${roomId}`);

        webSocket.current.onopen = () => {
            console.log('WebSocket 연결!');
        };

        webSocket.current.onmessage = (event) => {
            const message = JSON.parse(event.data);


            switch (message.type) {
                case 'full':
                    alert(message.message);
                    webSocket.current.close();
                    break;
        
                case 'assignRole':
                    // 역할 분배  
                    setPlayerSymbol(message.player === 0 ? 'X' : 'O');
                    setMyTurn(message.player === 0); // 첫 번째 플레이어가 X이고, 먼저 시작함
                    break;
        
                case 'makeMove':
                    // 게임 진행 
                    setBoard(message.board);
                    setMyTurn((prevTurn) => !prevTurn);
                    break;
        
                case 'gameOver':
                    // 게임 종료  
                    if (message.winner === playerSymbol) {
                        alert('You Win!');
                    } else if (message.winner === null) {
                        alert('Draw!');
                    } else {
                        alert('You Lose!');
                    }
                    setBoard([
                        [null, null, null],
                        [null, null, null],
                        [null, null, null],
                    ]);
                    setMyTurn(message.winner === playerSymbol);
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

        // 컴포넌트 언마운트 시 WebSocket 닫기
        return () => {
            if (webSocket.current) {
                webSocket.current.close();
            }
        };
    }, [roomId]);

    /** 버튼 클릭 */
    const clickHandler = (rowIndex, colIndex) => {
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
                winner: playerSymbol,
            }));
        } else if (isBoardFull) {
            // 무승부일 때
            webSocket.current.send(JSON.stringify({
                type: 'gameOver',
                winner: null,
            }));
        } else {
            // 종료 조건에 맞지 않으면  
            setBoard(newBoard);

            // 서버에 업데이트된 보드 상태 전송
            webSocket.current.send(JSON.stringify({
                type: 'makeMove',
                board: newBoard,
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
        <div id='Tictactoe'>
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className='ctnRow'>
                    {row.map((cell, colIndex) => (
                        <button
                            key={colIndex}
                            className={`btnTictactoe ${cell === 'O' ? 'circle' : cell === 'X' ? 'cross' : ''}`}
                            onClick={() => clickHandler(rowIndex, colIndex)}
                            disabled={!myTurn || cell !== null}
                        ></button>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default TictactoeComponent;
