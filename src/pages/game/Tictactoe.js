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
            <div className='roomList'>
                    {[1, 2, 3].map(roomId => (
                        <div key={roomId} className='room' onClick={() => enterRoom(roomId)}>
                            <h1>{roomId}번 방</h1>
                            <h2>현재 인원 / 2</h2>
                        </div>
                    ))}
                </div>
                {selectedRoomId && <TictactoeComponent roomId={selectedRoomId} />}
            </div>
        </MainLayout>
    )
}

export default Tictactoe