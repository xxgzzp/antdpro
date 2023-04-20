import React, { useEffect, useState } from 'react';
import { useWebSocket } from 'ahooks';
import { Upload, Select, Button, Card, Row, Col, Tag, Space } from 'antd';
import {ArrowRightOutlined, InboxOutlined } from '@ant-design/icons';
import { request, useModel } from '@umijs/max';
import { toast } from 'react-toastify';
interface categoryResponse{
  "name":string,
  'category':string,
  'score':number,
}

const OrderAllModify = () => {
  const { readyState, sendMessage, latestMessage, connect } = useWebSocket(
    'wss://zengzeping.com/ws/order_all_modify/',
    // 'wss://127.0.0.1/ws/order_all_modify/',
  );
  const [categoryList, setCategoryList] = useState<categoryResponse[]>([]);
  const [categoryLoading, setCategoryLoading] = useState(false);

  const [dateList, setDateList] = useState<{ value: string | undefined; label: string }[]>([]);
  const [dateLoading, setDateLoading] = useState(false);

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
      if (data?.type) {
        if (data.type === 'category') {
          setCategoryList([...categoryList,data?.results])
        }
        if(data?.type === 'signal'){
          if(data?.signal === 'done_category'){
            setCategoryLoading(false)
            toast.success('全部分类成功')
          }
          if (data?.signal === 'done_date') {
            setDateLoading(false)
            toast.success('全部材料单日期修改成功')
          }
        }
      }
    }
  }, [latestMessage]);

  const uploadProps = {
    name: 'file',
    // 添加 beforeUpload 方法阻止默认自动上传行为
    beforeUpload: (file: any) => {
      // @ts-ignore
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
      format: (percent: number) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
    fileList,
  };

  // 点击上传按钮触发上传操作
  const handleUpload = async () => {
    if (!project) {
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

  const handleModifyOrderCategory =  () => {
    if (readyState === 1) {
      if (sendMessage) {
        setCategoryLoading(true)
        sendMessage(
          JSON.stringify({
            modify: 'category',
            project_id: project,
          }),
        );
      }
    }
  }

  const handleModifyOrderDate =  () => {
    if (readyState === 1) {
      if (sendMessage) {
        setDateLoading(true)
        sendMessage(
          JSON.stringify({
            modify: 'date',
            project_id: project,
          }),
        );
      }
    }
  }

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
        style={{ marginTop: 16, width: '100%' }}
      >
        上传并导入
      </Button>
      <Button
        type="primary"
        disabled={project === undefined}
        style={{ marginTop: 16, width: '100%' }}
      >
        批量修改材料单名称
      </Button>
      <Button
        type="primary"
        loading={categoryLoading}
        // disabled={project === undefined || readyState === 1}
        disabled={project === undefined}
        onClick={handleModifyOrderCategory}
        style={{ marginTop: 16, width: '100%' }}
      >
        批量修改材料单分类
      </Button>
      <Button
        type="primary"
        loading={dateLoading}
        disabled={project === undefined}
        onClick={handleModifyOrderDate}
        style={{ marginTop: 16, width: '100%' }}
      >
        提取修改材料单日期
      </Button>
      {
        categoryList?.length !==0 && (
          <Card title="分类结果">
            <Row gutter={[16, 16]}>
              {categoryList.map((item) => (
                <Col xs={24} sm={12} md={8} lg={24} key={item.name}>
                    <Space>
                    <Tag color="blue" style={{ fontSize: 16 }}>{item.name}</Tag>
                      <ArrowRightOutlined />
                    <Tag color="blue" style={{ fontSize: 16 }}>{item.category}</Tag>
                    <div>分数：<Tag color="blue" style={{ fontSize: 16 }}>{item.score}</Tag></div>
                      </Space>
                </Col>
              ))}
            </Row>
          </Card>
        )
      }
    </div>
  );
};
export default OrderAllModify;
