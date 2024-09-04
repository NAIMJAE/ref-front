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
    </MainLayout>
  );
};

export default ChatBotApiPage;
