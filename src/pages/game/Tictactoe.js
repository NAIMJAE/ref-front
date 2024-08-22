import React, { useEffect, useRef, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import '../../styles/game.scss'
import { Host } from "../../api/RootUrl";

const Tictactoe = () => {
    /**  내 차례인지 확인하는 변수 */
    const [myTurn, setMyTurn] = useState(true);

    /** 현재 플레이어의 기호 (X 또는 O) */
    const [playerSymbol, setPlayerSymbol] = useState("O");

    /** 게임 보드 2차원 배열  */
    const [board, setBoard] = useState([
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]);

    const webSocket = useRef();

    useEffect(() => {
        /** 소켓 연결 */
        webSocket.current = new WebSocket(`ws://${Host}:8080/tictactoe`);

        webSocket.current.onopen = () => {
            console.log('WebSocket 연결!');
        };
        webSocket.current.onclose = (error) => {
            console.log(error);
        }
        webSocket.current.onerror = (error) => {
            console.log(error);
        }

    }, [])

    /** 버튼 클릭 */
    const clickHandler = (rowIndex, colIndex) => {
        // 이미 클릭된 버튼은 무시
        if (board[rowIndex][colIndex] !== null) return;

        // 업데이트를 위한 새 배열 
        const newBoard = board.map((row, rIndex) =>
            row.map((cell, cIndex) =>
                // 해당 버튼의 인덱스 값만 변경 
                rIndex === rowIndex && cIndex === colIndex ? playerSymbol : cell
            )
        );

        // 새로운 보드 상태로 업데이트
        setBoard(newBoard);

        setMyTurn(!myTurn);

        // 게임 종료 조건 확인 
    }
    return (
        <MainLayout>
            <div id='Tictactoe'>
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className='ctnRow'>
                        {row.map((cell, colIndex) => (
                            <button key={colIndex} className={`btnTictactoe ${board[rowIndex][colIndex] === 'O' ? 'circle' : board[rowIndex][colIndex] === 'X' ? 'cross' : ''}`} onClick={() => clickHandler(rowIndex, colIndex)}></button>
                        ))}
                    </div>
                ))}
            </div>
        </MainLayout>
    )
}

export default Tictactoe