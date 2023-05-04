import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Avatar,
  Collapse,
  Divider,
  Input,
  List,
  Result,
  Space,
  Spin,
  Switch,
  Tag,
} from 'antd';
import { LoadingOutlined, SendOutlined } from '@ant-design/icons';
import { useWebSocket } from 'ahooks';
import DynamicTable from '@/pages/Chat/DynamicTable';
import './index.less';
import { useModel } from '@@/exports';
import { QuerySpaceTable } from '@/pages/Chat/QuerySpaceTable';
import { DataTable } from './DataTable';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { settings } from '@/settings';
const { Panel } = Collapse;
interface botResponse {
  id: string;
  type: string;
  results: any;
  session_id: string;
  user_id: string;
}
const ChatWindow = () => {
  const [inputValue, setInputValue] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [selectedSession, setSelectedSession] = useState<string>();
  const [chatList, setChatList] = useState<botResponse[]>([]);
  const chatWindowRef = useRef(null);
  const [isSpaceTable, setIsSpaceTable] = useState(false);
  const [isChatGPT, setIsChatGPT] = useState(true);
  const [isSearchTable, setIsSearchTable] = useState(true);
  const [isChatGPTSQL, setIsChatGPTSQL] = useState(false);
  const [isViewChatGPTSQL, setIsViewChatGPTSQL] = useState(false);
  const [isMarkdown, setIsMarkdown] = useState(false);
  const { readyState, sendMessage, latestMessage, connect } = useWebSocket(
    `wss://${settings.host}/ws/chat/`,
  );
  const { user } = useModel('user');

  // 权限先简单在前端过滤糊弄下
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  useEffect(() => {
    if (user) {
      if (user?.user_permissions?.includes(161)) {
        setHasPermission(true);
      }
    }
  }, [user]);

  // webSocket发送消息
  const handleSearch = async (text: string) => {
    if (sendMessage) {
      console.log(isSpaceTable, isChatGPT, isSearchTable, isChatGPTSQL, isViewChatGPTSQL);
      sendMessage(
        JSON.stringify({
          text: text,
          user_id: user?.id,
          isSpaceTable: isSpaceTable,
          isChatGPT: isChatGPT,
          isSearchTable: isSearchTable,
          isChatGPTSQL: isChatGPTSQL,
          isViewChatGPTSQL: isViewChatGPTSQL,
          session_id: selectedSession,
        }),
      );
      if (isChatGPT) {
        setChatLoading(true);
      }
      if (isChatGPTSQL) {
        setChatLoading(true);
      }
      if (isViewChatGPTSQL) {
        setChatLoading(true);
      }
      // }
    } else if (connect) {
      connect();
    }
  };

  useEffect(() => {
    if (latestMessage !== null && latestMessage !== undefined) {
      const data = JSON.parse(latestMessage.data);
      if (data?.type === 'bot') {
        setChatLoading(false);
      }
      if (data?.type === 'sql_results') {
        setChatLoading(false);
      }

      const existingChat = chatList.find((chat) => chat?.id === data.id);
      if (data) {
        if (data?.id && existingChat) {
          setChatList((prevChatList) =>
            prevChatList.map((chat) => (chat.id === data.id ? { ...chat, ...data } : chat)),
          );
        } else {
          const newChat = { ...data };
          setChatList((prevChatList) => [...prevChatList, newChat]);
        }
      }
    }
    console.log(chatList);
  }, [latestMessage]);

  // useEffect(() => {
  //   // @ts-ignore
  //   if(chatList){
  //     chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  //   }
  // }, [chatList]);

  // useEffect(() => {
  //   window.scrollTo(0, document.body.scrollHeight - 300);
  // }, [chatList]);

  const handleInputEnter = () => {
    const newChat = { results: inputValue, type: 'user' };
    handleSearch(inputValue);
    // @ts-ignore
    setChatList([...chatList, newChat]);
    setInputValue('');
  };

  const handleSpaceT = (checked: boolean) => {
    setIsSpaceTable(checked);
  };
  const handleChatGPT = (checked: boolean) => {
    setIsChatGPT(checked);
  };
  const handleIsSearchTable = (checked: boolean) => {
    setIsSearchTable(checked);
  };
  const handleIsChatGPTSQL = (checked: boolean) => {
    setIsChatGPTSQL(checked);
  };
  const handleIsViewChatGPTSQL = (checked: boolean) => {
    setIsViewChatGPTSQL(checked);
  };
  const handleIsMarkDown = (checked: boolean) => {
    setIsMarkdown(checked);
  };

  // if (!hasPermission) {
  //   return <Result status="warning" title="无权访问" />;
  // }
  return (
    <div>
      <div className="chat-container">
        <div className="chat-window" ref={chatWindowRef}>
          <List
            dataSource={chatList}
            renderItem={(item) => (
              <div>
                <Divider style={{ paddingTop: '5px' }} />
                {item?.type === 'user' ? (
                  <div style={{ fontSize: '16px' }}>
                    <Space>
                      <Avatar src={user?.avatar} />
                      <div style={{ paddingLeft: '10px' }}>{item?.results}</div>
                    </Space>
                  </div>
                ) : item?.type === 'table' ? (
                  <div>
                    {/*<p style={{ fontSize: '16px' }}>Bot: 根据您的提问，我找到了如下数据:</p>*/}
                    <DataTable key={'dataTable'} dataSource={item?.results}></DataTable>
                    {/*<DynamicTable size="small" style={{ width: 1000 }} data={item?.results} />*/}
                  </div>
                ) : item?.type === 'text2entities' ? (
                  <div key="text-span-2">
                    <Space>
                      {/*<p style={{ fontSize: '16px' }}>Bot: 根据您的提问，我找到了如下实体:</p>*/}
                      {item?.results?.map((r: any) => {
                        return <Tag key="entity-tag" color="cyan">{`${r?.span}(${r?.type})`}</Tag>;
                      })}
                    </Space>
                  </div>
                ) : item?.type === 'spaceTable' ? (
                  <Collapse defaultActiveKey={['1']} ghost>
                    <Panel header={`${item?.results?.sql_string}`} key="1">
                      <QuerySpaceTable queryResult={item?.results?.query_result}></QuerySpaceTable>
                    </Panel>
                  </Collapse>
                ) : item?.type === 'sql' ? (
                  <pre style={{ whiteSpace: 'pre-wrap' }}>{item?.results}</pre>
                ) : item?.type === 'sql_results' ? (
                  <div>
                    <DynamicTable size="small" data={item?.results}></DynamicTable>
                  </div>
                ) : (
                  <div>
                    <Alert
                      key={item?.session_id}
                      onClick={() => {
                        if (selectedSession === item?.session_id) {
                          setSelectedSession(null);
                        } else {
                          setSelectedSession(item?.session_id);
                        }
                      }}
                      description={
                        <div style={{position: 'relative'}}>
                          {'ChatGPT:'}
                          <Switch
                            onChange={handleIsMarkDown}
                            checkedChildren="Markdown"
                            unCheckedChildren="Markdown"
                            defaultChecked={false}
                            style={{ position: 'absolute', top: 0, right: 0 }}
                          />
                          {isMarkdown ? (
                            <MarkdownPreview
                              style={{ background: '#FFFBE6' }}
                              source={item?.results}
                            />
                          ) : (
                            <pre style={{ whiteSpace: 'pre-wrap' }}>{item?.results}</pre>
                          )}
                          {/*<pre style={{ whiteSpace: 'pre-wrap' }}>{item?.results}</pre>*/}
                          {/*<pre>{item?.results}</pre>*/}
                        </div>
                      }
                      type={selectedSession === item?.session_id ? 'success' : 'warning'}
                    />
                  </div>
                )}
              </div>
            )}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '20px',
              alignItems: 'center',
            }}
          >
            {chatLoading ? (
              <Spin indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />} />
            ) : null}
          </div>
          <div style={{ height: '300px' }}></div>
        </div>
      </div>
      <div className="chat-input">
        <div>{selectedSession ? `您选择了会话${selectedSession}` : null}</div>
        <Space>
          <Switch
            onChange={handleIsSearchTable}
            checkedChildren="查询数据"
            unCheckedChildren="查询数据"
            defaultChecked={true}
            style={{ paddingLeft: '10px' }}
          />
          <Switch
            onChange={handleChatGPT}
            checkedChildren="ChatGPT"
            unCheckedChildren="ChatGPT"
            defaultChecked={true}
            style={{ paddingLeft: '10px' }}
          />
          <Switch
            onChange={handleSpaceT}
            checkedChildren="SPACE-T"
            unCheckedChildren="SPACE-T"
            defaultChecked={false}
            style={{ paddingLeft: '10px' }}
          />
          <Switch
            onChange={handleIsChatGPTSQL}
            checkedChildren="ChatGPT-SQL"
            unCheckedChildren="ChatGPT-SQL"
            defaultChecked={false}
            style={{ paddingLeft: '10px' }}
          />
          <Switch
            onChange={handleIsViewChatGPTSQL}
            checkedChildren="视图-ChatGPT-SQL"
            unCheckedChildren="视图-ChatGPT-SQL"
            defaultChecked={false}
            style={{ paddingLeft: '10px' }}
          />
        </Space>
        <Input
          disabled={readyState !== 1}
          placeholder={readyState !== 1 ? 'websocket正在连接......' : '请输入内容'}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleInputEnter}
          style={{ marginTop: 10, borderRadius: 20, paddingRight: 40 }}
          suffix={
            <div>
              {chatLoading ? (
                <Spin indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />} />
              ) : (
                <SendOutlined
                  style={{ fontSize: 20, color: '#1890ff', cursor: 'pointer' }}
                  onClick={handleInputEnter}
                />
              )}
            </div>
          }
        ></Input>
      </div>
    </div>
  );
};
export default ChatWindow;
