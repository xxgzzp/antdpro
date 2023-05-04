import React, { useEffect, useRef, useState } from 'react';
import { useWebSocket } from 'ahooks';
import { Upload, Select, Button, Card, Row, Col, Tag, Space } from 'antd';
import { ArrowRightOutlined, InboxOutlined } from '@ant-design/icons';
import { request, useModel } from '@umijs/max';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { history } from '@umijs/max';
import { settings } from '@/settings';
interface categoryResponse {
  name: string;
  category: string;
  score: number;
  id: string;
}

interface importOrderResponse {
  name: string;
  order_id: string;
  msg: string;
  success: boolean;
}

interface dateResponse {
  per_name: string;
  last_name: string;
  date: string;
  order_id: string;
}

interface modifyNameResponse {
  per_name: string;
  last_name: string;
  order_id: string;
}

const OrderAllModify = () => {
  const { readyState, sendMessage, latestMessage, connect } = useWebSocket(
    `wss://${settings.host}/ws/order_all_modify/`,
    // 'wss://127.0.0.1/ws/order_all_modify/',
  );
  const [categoryList, setCategoryList] = useState<categoryResponse[]>([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const targeCategorytRef = useRef(null);

  const [dateList, setDateList] = useState<dateResponse[]>([]);
  const [dateLoading, setDateLoading] = useState(false);
  const targeDateRef = useRef(null);

  const [orderNameList, setOrderNameList] = useState<modifyNameResponse[]>([]);
  const [orderNameLoading, setOrderNameLoading] = useState(false);
  const targeOrderNameRef = useRef(null);

  const [orderList, setOrderList] = useState<importOrderResponse[]>([]);
  const [orderLoading, setOrderLoading] = useState(false);
  const targeOrderRef = useRef(null);

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

  // webSocket接收消息
  useEffect(() => {
    if (latestMessage !== null && latestMessage?.data) {
      const data = JSON.parse(latestMessage.data);
      console.log(data);
      if (data?.type) {
        if (data.type === 'category') {
          setCategoryList([data?.results, ...categoryList]);
        }

        if (data.type === 'date') {
          setDateList([data?.results, ...dateList]);
        }

        if (data.type === 'modify_name') {
          setOrderNameList([data?.results, ...orderNameList]);
        }

        if (data.type === 'import_order') {
          setOrderList([data?.results, ...orderList]);
        }

        if (data?.type === 'signal') {
          if (data?.signal === 'done_category') {
            setCategoryLoading(false);
            toast.success('全部分类成功');
          }
          if (data?.signal === 'done_date') {
            setDateLoading(false);
            toast.success('全部材料单日期提取并修改成功');
          }
          if (data?.signal === 'done_import_order') {
            setOrderLoading(false);
            toast.success('全都材料单已经处理完成');
          }
          if (data?.signal === 'done_modify_name') {
            setOrderNameLoading(false);
            toast.success('全部材料单名字修改成功');
          }
        }
      }
    }
  }, [latestMessage]);

  useEffect(() => {
    if (categoryList?.length === 1) {
      targeCategorytRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (dateList?.length === 1) {
      targeDateRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (orderNameList?.length === 1) {
      targeOrderNameRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (orderList?.length === 1) {
      targeOrderRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [categoryList, dateList, orderNameList, orderList]);

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
  const { user } = useModel('user');
  const handleImportOrder = (temp_dir: any) => {
    if (readyState === 1) {
      if (sendMessage) {
        setOrderLoading(true);
        sendMessage(
          JSON.stringify({
            temp_dir: temp_dir,
            modify: 'import_order',
            project_id: project,
            user_id: user?.id,
          }),
        );
      }
    }
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
    const uuid = uuidv4();
    formData.append('id', uuid);
    try {
      setOrderLoading(true);
      // 使用 request 方法发送 POST 请求上传文件
      await request('/api/material/order_upload/', {
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((res) => {
        toast.success('文件上传成功，正在处理');
        handleImportOrder(res?.temp_dir);
      });
    } catch (error) {
      console.error('Error uploading the file:', error);
    }
  };

  const handleModifyOrderCategory = () => {
    if (readyState === 1) {
      if (sendMessage) {
        setCategoryLoading(true);
        sendMessage(
          JSON.stringify({
            modify: 'category',
            project_id: project,
          }),
        );
      }
    }
  };

  const handleModifyOrderDate = () => {
    if (readyState === 1) {
      if (sendMessage) {
        setDateLoading(true);
        sendMessage(
          JSON.stringify({
            modify: 'date',
            project_id: project,
          }),
        );
      }
    }
  };

  const handleModifyOrderName = () => {
    if (readyState === 1) {
      if (sendMessage) {
        setOrderNameLoading(true);
        sendMessage(
          JSON.stringify({
            modify: 'modify_name',
            project_id: project,
          }),
        );
      }
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
        <Upload.Dragger {...uploadProps} style={{ marginTop: 10 }}>
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
        loading={orderLoading}
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0 || readyState !== 1}
        style={{ marginTop: 16, width: '100%' }}
      >
        {readyState !== 1 ? 'websocket未连接!!!!请刷新页面' : '上传并导入'}
      </Button>
      <Button
        type="primary"
        loading={orderNameLoading}
        onClick={handleModifyOrderName}
        disabled={project === undefined || readyState !== 1}
        style={{ marginTop: 16, width: '100%' }}
      >
        {readyState !== 1 ? 'websocket未连接!!!!请刷新页面' : '批量修改材料单名称'}
      </Button>
      <Button
        type="primary"
        loading={categoryLoading}
        // disabled={project === undefined || readyState === 1}
        disabled={project === undefined || readyState !== 1}
        onClick={handleModifyOrderCategory}
        style={{ marginTop: 16, width: '100%' }}
      >
        {readyState !== 1 ? 'websocket未连接!!!!请刷新页面' : '批量修改材料单分类'}
      </Button>
      <Button
        type="primary"
        loading={dateLoading}
        disabled={project === undefined || readyState !== 1}
        onClick={handleModifyOrderDate}
        style={{ marginTop: 16, width: '100%' }}
      >
        {readyState !== 1 ? 'websocket未连接!!!!请刷新页面' : '提取修改材料单日期'}
      </Button>
      {categoryList?.length !== 0 && (
        <Card title="分类结果">
          <div
            style={{ maxHeight: '400px', overflow: 'auto', margin: 20, width: '90%' }}
            ref={targeCategorytRef}
          >
            <div>
              <Row gutter={[10, 10]}>
                {categoryList.map((item) => (
                  <Col span={24} key={item.name}>
                    <Space>
                      <Tag
                        color="blue"
                        style={{ fontSize: 16 }}
                        onClick={() => history.push(`/order/${item?.id}/orderitems`)}
                      >
                        {item.name}
                      </Tag>
                      <ArrowRightOutlined />
                      <Tag color="blue" style={{ fontSize: 16 }}>
                        {item.category}
                      </Tag>
                      分数：
                      <Tag color="blue" style={{ fontSize: 16 }}>
                        {item.score}
                      </Tag>
                    </Space>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </Card>
      )}
      {dateList?.length !== 0 && (
        <Card title="日期提取结果">
          <div
            style={{ maxHeight: '400px', overflow: 'auto', margin: 20, width: '90%' }}
            ref={targeDateRef}
          >
            <div>
              <Row gutter={[16, 16]}>
                {dateList.map((item) => (
                  <Col span={24} key={'date-list'}>
                    <Space>
                      <Tag
                        color="blue"
                        style={{ fontSize: 16 }}
                        onClick={() => history.push(`/order/${item?.order_id}/orderitems`)}
                      >
                        {item?.per_name}
                      </Tag>
                      <ArrowRightOutlined />
                      <Tag
                        color="blue"
                        style={{ fontSize: 16 }}
                        onClick={() => history.push(`/order/${item?.order_id}/orderitems`)}
                      >
                        {item?.last_name}
                      </Tag>
                      <ArrowRightOutlined />
                      <Tag color="blue" style={{ fontSize: 16 }}>
                        {item.date}
                      </Tag>
                    </Space>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </Card>
      )}
      {orderNameList?.length !== 0 && (
        <Card title="材料单名称修改">
          <div
            style={{ maxHeight: '400px', overflow: 'auto', margin: 20, width: '90%' }}
            ref={targeOrderNameRef}
          >
            <Row gutter={[16, 16]}>
              {orderNameList.map((item) => (
                <Col xs={24} sm={12} md={8} lg={24} key="order-list">
                  <Space>
                    <Tag style={{ fontSize: 16 }}>
                      原先名称：
                      {item?.per_name}
                    </Tag>
                    <ArrowRightOutlined />
                    <Tag style={{ fontSize: 16 }}>
                      后来名称：
                      {item?.last_name}
                    </Tag>
                  </Space>
                </Col>
              ))}
            </Row>
          </div>
        </Card>
      )}
      {orderList?.length !== 0 && (
        <Card title="订单导入">
          <div
            style={{ maxHeight: '400px', overflow: 'auto', margin: 20, width: '90%' }}
            ref={targeOrderRef}
          >
            <div>
              <Row gutter={[16, 16]}>
                {orderList.map((item) => (
                  <Col span={24} key="order-list">
                    <Space>
                      <Tag style={{ fontSize: 16 }}>{item?.name}</Tag>
                      <Tag color={item?.success ? 'green' : 'red'} style={{ fontSize: 16 }}>
                        {item?.success ? '导入成功' : '导入失败'}
                      </Tag>
                      <Tag>msg:{item?.msg}</Tag>
                    </Space>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
export default OrderAllModify;
