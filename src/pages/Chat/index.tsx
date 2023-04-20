import React, { useEffect, useRef, useState } from 'react';
import {Alert, Avatar, Divider, Input, List, Tag } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import WriteLikeChatGPT from 'write-like-chat-gpt';
import { useWebSocket } from 'ahooks';
import DynamicTable from '@/pages/Chat/DynamicTable';
import './index.less'
import {useModel} from "@@/exports";
interface botResponse{
  "id":string
  "type":string
  "results":any
}
const ChatWindow = () => {
  const [inputValue, setInputValue] = useState('');
  const [chatList, setChatList] = useState<botResponse[]>([]);
  const chatWindowRef = useRef(null);
  const { readyState, sendMessage, latestMessage, connect } = useWebSocket(
    'wss://zengzeping.com/ws/chat/',
  );
  const {user} = useModel('user')
  // webSocket发送消息
  const handleSearch = async (text: string) => {
    // if (readyState === 1) {
      if (sendMessage) {
        sendMessage(
          JSON.stringify({
            text: text,
          }),
        );
      // }
    } else if (connect) {
      connect();
    }
  };
  // useEffect(()=>{
  //   if (readyState === 1 && inputValue) {
  //     if (sendMessage) {
  //       sendMessage(
  //         JSON.stringify({
  //           text: inputValue,
  //         }),
  //       );
  //     }
  //   } else if (connect) {
  //     connect();
  //   }
  // },[readyState])
  // webSocket接收消息
  useEffect(() => {
    if (latestMessage !== null && latestMessage !== undefined) {
      const data = JSON.parse(latestMessage.data);
      const existingChat = chatList.find((chat) => chat?.id === data.id);
      if (data) {
        if(data?.id && existingChat){
          setChatList((prevChatList) =>
            prevChatList.map((chat) =>
              chat.id === data.id ? { ...chat, ...data } : chat
            )
          );
        }else {
          const newChat = { ...data};
          setChatList((prevChatList) => [...prevChatList, newChat]);
        }
      }
    }
    console.log(chatList);
  }, [latestMessage]);

  useEffect(() => {
    // @ts-ignore
    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }, [chatList]);

  const handleInputEnter = () => {
    const newChat = { results: inputValue, type: 'user' };
    handleSearch(inputValue);
    // @ts-ignore
    setChatList([...chatList, newChat]);
    setInputValue('');
  };

  return (
    <div>
      <div
        ref={chatWindowRef}
        className="chat-window"
      >
        <List
          dataSource={chatList}
          renderItem={(item) => (
            <div>
              <Divider />
              {item?.type === 'user' ? (
                <div style={{ fontSize: '16px' }}><Avatar src={user?.avatar} />你: {item?.results}</div>
              ) : item?.type === 'table' ? (
                <div>
                  <p style={{ fontSize: '16px' }}>Bot: 根据您的提问，我找到了如下数据:</p>
                  <DynamicTable
                    size="small"
                    style={{ width: 1000 }}
                    data={item?.results}
                  />
                </div>
              ) : item?.type === 'text2entities' ? (
                <div key="text-span-2">
                  <p style={{ fontSize: '16px' }}>Bot: 根据您的提问，我找到了如下实体:</p>
                  {item?.results?.map((r:any) => {
                    return (
                      <Tag key='entity-tag' color="cyan">{`${r?.span}(${r?.type})`}</Tag>
                    );
                  })}
                </div>
              ) : (
                <Alert
                  description={`Bot: ${item?.results}`}
                  type="success"
                />
                // <p style={{ fontSize: '16px' }}>{`Bot: ${item?.results}`}</p>
                // <WriteLikeChatGPT text={} delay={1000} />
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
