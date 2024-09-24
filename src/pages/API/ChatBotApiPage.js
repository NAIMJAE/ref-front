import React, { useEffect, useRef, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import '../../styles/chatBot.scss'
import { ChatBottApi, createAssistantApi, getChatApi } from '../../api/ChatBotApi';
import { useSelector } from 'react-redux';

const ChatBotApiPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [threadId, setThreadId] = useState('');
  const [assistantId, setAssistantId] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const loginSlice = useSelector((state) => state.loginSlice);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    // 페이지가 로드될 때 Assistant 및 Thread 생성, 실행 요청
    const createAssistantAndThread = async () => {
      try {
        // 백엔드 서버에 요청하여 Assistant 및 Thread 생성
        const response = await createAssistantApi(loginSlice.uid != null ? loginSlice.uid : 'abcd123456');
        console.log('Assistant 및 Thread 생성됨:', response.data);

        setThreadId(response.data.threadId);
        setAssistantId(response.data.assistantId);

        // 지난 채팅내역 조회 
        const resp = await getChatApi(response.data.threadId);
        setMessages(resp.data);

      } catch (error) {
        console.error('Error creating Assistant or Thread:', error);
      }
    };

    createAssistantAndThread();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    // 사용자 메시지를 추가하고, API 호출
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages); // 메시지 목록을 업데이트
    setInput('');

    setIsTyping(true);
    try {
      // 백엔드 서버로 사용자 메시지를 전송
      const response = await ChatBottApi({
        message: input,
        assistantId,
        threadId,
        role: 'user',
        content: input,
      });
      console.log("response : ", response);

      // 백엔드에서 받은 전체 메시지와 응답을 업데이트
      const updatedMessages = response.data;


      console.log("updatedMessages : ", updatedMessages);
      setMessages(updatedMessages);
      setIsTyping(false);
    } catch (error) {
      console.error('Error communicating with server:', error);
    }
  };

  /** 엔터 키 감지 핸들러 */
  const keyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // 기본 Enter 키 동작(줄바꿈) 방지
      sendMessage(e.target.value);
    }
  };

  return (
    <MainLayout>
      <div className='colDiv'>
        <div className='ts_box'>
        <h1>ChatBot</h1>
          <h2 className='bg_blue bold'>챗봇 설명</h2>
          <h3>챗봇은 인공지능 어시스턴트로, 특정 역할이나 목적에 맞게 설정된 AI 모델을 통해 사용자와 상호작용할 수 있는 기능을 제공합니다.</h3>
          <h3>사용자는 질문을 하거나 대화를 요청하면 챗봇이 그에 맞는 응답을 생성합니다.</h3>
          <h3>챗봇은 OpenAI의 GPT 모델을 활용하며, 다양한 용도로 맞춤형 대화를 설계할 수 있습니다.</h3>
          <div className='line'></div>
          <h2 className='bg_blue bold'>기본 용어 정리</h2>
          <ul>
            <li>어시스턴트 (Assistant): 도구를 사용할 수 있는 거대 언어 모델(GPT 모델).</li>
            <li>스레드 (Thread): 대화의 흐름을 관리하고, 메시지들을 저장하는 공간.</li>
            <li>메시지 (Message): 사용자와 AI 간에 주고받는 대화의 단위.</li>
            <li>런 (Run): 어시스턴트가 스레드에 저장된 메시지들을 읽고, 응답 메시지를 추가하는 과정.</li>
            <li>런 스텝 (Run Step): 런이 실행될 때 외부 도구를 사용하거나 여러 단계를 거쳐 응답을 생성하는 과정.</li>
          </ul>
        </div>
        <div className='ChatBotApiPage'>
          <div className='chatBotbox'>
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                <p>{msg.content}</p>
              </div>
            ))}
            {isTyping && (
              <div className='message typing'>
                <div className='dot'></div>
                <div className='dot'></div>
                <div className='dot'></div>
              </div>
            )}
          </div>
          <div className='ctnInput'>
            <input
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={keyDown}
              placeholder='Type your message...'
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChatBotApiPage;
