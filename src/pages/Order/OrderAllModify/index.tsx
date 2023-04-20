import React, { useEffect, useState } from 'react';
import { useWebSocket } from 'ahooks';
import { Upload, Select, Button } from 'antd';
import {InboxOutlined, UploadOutlined } from '@ant-design/icons';
import {request, useModel } from '@umijs/max';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const OrderAllModify = () => {

   const { readyState, sendMessage, latestMessage, connect } = useWebSocket(
    'wss://zengzeping.com/ws/order_all_modify/',
    // 'wss://127.0.0.1/ws/order_all_modify/',
  );
  const [project, setProject] = useState();
  const [projectList, setProjectList] = useState<{ value: string | undefined; label: string }[]>(
    [],
  );

  const { projectEnum } = useModel('selector');
  useEffect(() => {
    setProjectList(projectEnum);
  }, [projectEnum]);

  // 添加内部状态以控制上传组件
  const [fileList, setFileList] = useState([]);

  // webSocket发送消息

  // webSocket接收消息
  useEffect(() => {
    if (latestMessage !== null && latestMessage?.data) {
      const data = JSON.parse(latestMessage.data);
      if (data.progress) {
        // setProgress(data.progress);
      }
    }
  }, [latestMessage]);

  const uploadProps = {
    name: 'file',
    // 添加 beforeUpload 方法阻止默认自动上传行为
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    // action: '/api/material/order_upload/',
    // headers: {
    //   'X-CSRFToken': Cookies.get('csrftoken') as string,
    //   'Authorization': `Token ${localStorage.getItem('Token')}`,
    // },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
    fileList,
  };


  // 点击上传按钮触发上传操作
  const handleUpload = async () => {
    if(!project){
      toast.error('请选择项目');
      return;
    }
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('file', file);
    });
    // 添加 project 参数
    if (project) {
      formData.append('project', project);
    }
    try {
      // 使用 request 方法发送 POST 请求上传文件
      await request('/api/material/order_upload/', {
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('Error uploading the file:', error);
    }
  };

  return (
    <div>
      <Select
        style={{ minWidth: '100%' }}
        value={project}
        onChange={(value) => {
          setProject(value);
        }}
        options={projectList}
        placeholder="请选择要上传的项目"
      />
      <div>
        <Upload.Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">上传</p>
        </Upload.Dragger>
        {/*<Upload {...uploadProps}>*/}
        {/*  <Button icon={<UploadOutlined />}>点击选择文件</Button>*/}
        {/*</Upload>*/}
      </div>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        style={{ marginTop: 16 ,width:'100%'}}
      >
        开始导入
      </Button>
    </div>
  );
};
export default OrderAllModify;
