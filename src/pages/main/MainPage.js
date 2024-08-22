import React from 'react'
import MainLayout from '../../layout/MainLayout'
import { useNavigate } from 'react-router-dom';

const MainPage = () => {

  const navigate = useNavigate();

  return (
    <MainLayout>
      <div id='mainPage'>
        <div className='refBox' onClick={() => navigate('/api')}>
          <h1>공공 API 불러오기</h1>
          <h2>Open API를 활용한 예제</h2>
        </div>

        <div className='refBox' onClick={() => navigate('/openApi')}>
          <h1>Open API 제작</h1>
          <h2>Open API를 활용한 예제</h2>
        </div>

        <div className='refBox' onClick={() => navigate('/tictactoe')}>
          <h1>Tic-tac-toe</h1>
          <h2>Socket을 활용한 게임 예제</h2>
        </div>
      </div>
    </MainLayout>
  )
}

export default MainPage