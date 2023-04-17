import React, { useEffect, useRef, useState } from 'react';
import { Divider, Input, List } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import WriteLikeChatGPT from 'write-like-chat-gpt';

const ChatWindow = () => {
  const [inputValue, setInputValue] = useState('');
  const [chatList, setChatList] = useState([]);
  const chatWindowRef = useRef(null);

  useEffect(() => {
    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }, [chatList]);
  const handleInputEnter = () => {
    const newChat = { message: inputValue, type: 'user' };
    setChatList([...chatList, newChat]);
    setInputValue('');
  };
  return (
    <div>
      <div
        ref={chatWindowRef}
        className="chat-window"
        style={{ height: 450, overflow: 'auto', scrollBehavior: 'smooth' }}
      >
        <List
          dataSource={chatList}
          renderItem={(item) => (
            <div>
              <Divider />
              {item.type === 'user' ? (
                <div >{item.message}</div>
              ) : (
                <WriteLikeChatGPT text={`${item.type}:   ${item.message}`} delay={100} />
              )}
            </div>
          )}
        />
        <div style={{ height: 200 }} />
      </div>
      <Input
        placeholder="请输入内容"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onPressEnter={handleInputEnter}
        style={{ marginTop: 10, borderRadius: 20, paddingRight: 40 }}
        suffix={
          <SendOutlined
            style={{ fontSize: 20, color: '#1890ff', cursor: 'pointer' }}
            onClick={handleInputEnter}
          />
        }
      />
    </div>
  );
};
export default ChatWindow;
