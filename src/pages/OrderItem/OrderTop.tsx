import { formatDate } from '@/components/Utils/formatDate';
import UploadMy from '@/components/Utils/UploadMy';
import ProjectSelectAdd from '@/pages/Project/ProjectSelectAdd';
import SupplierSelectAdd from '@/pages/Supplier/SupplierSelectAdd';
import UserSelectAdd from '@/pages/User/UserSelectAdd';
import { apiMaterialOrderRead } from '@/services/ant-design-pro/api';

import { KeepAliveContext, useLocation } from '@@/exports';
import { CloudDownloadOutlined, ShakeOutlined } from '@ant-design/icons';
import { request } from '@umijs/max';
import { useRequest } from 'ahooks';
import {
  Badge,
  Button,
  Card,
  Descriptions,
  Form,
  Input,
  message,
  Popconfirm,
  Skeleton,
  Tag,
  Tooltip,
} from 'antd';
import { FormInstance } from 'antd/es/form';
import { CustomTagProps } from 'rc-select/es/BaseSelect';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const OrderTop: React.FC<{
  orderForm: FormInstance<any> | undefined;
  order_id: string | undefined;
}> = ({ orderForm, order_id }) => {
  // 加载远程数据
  const {
    data: orderDetail,
    loading: orderDetailLoading,
    run: getOrderDetail,
  } = useRequest(apiMaterialOrderRead, {
    manual: true,
  });
  const [badgeColor, setBadgeColor] = useState<string>('green');

  const [exportLoading, setExportLoading] = useState(false);
  // 更改标签页标题
  const location = useLocation();
  const { updateTab } = React.useContext(KeepAliveContext);

  useEffect(() => {
    getOrderDetail({ id: order_id! });
  }, []);

  useEffect(() => {
    orderForm?.setFieldsValue({
      name: orderDetail?.name,
      created_by: orderDetail?.created_by,
      checkers: orderDetail?.checked_by?.map((r) => r.checked_by),
      supplier: orderDetail?.supplier,
      project: orderDetail?.project,
      category: orderDetail?.category,
    });

    // TODO:判断审核结果
    if (orderDetail?.checked_by) {
      for (const checkedBy of orderDetail?.checked_by) {
        if (checkedBy.is_checked === null) {
          setBadgeColor('cyan');
          break;
        } else if (checkedBy.is_checked === false) {
          setBadgeColor('red');
          break;
        }
      }
    }
    // TODO:更改标签页标题
    updateTab(location.pathname, {
      // icon: <UserOutlined />,
      name: orderDetail?.name,
      closable: true,
    });
  }, [orderDetail]);

  // TODO:导出excel

  // TODO:右上角徽章
  const color_text = {
    red: '未通过',
    green: '通过',
    cyan: '审核中',
  };

  // TODO:审核人颜色
  const tagRender = (props: CustomTagProps) => {
    const { label, value, closable, onClose } = props;
    const checkedBy = orderDetail?.checked_by || [];
    const checkedByIndex = checkedBy.findIndex((item) => item.checked_by === value);
    const isItemChecked = checkedBy[checkedByIndex]?.is_checked;
    const isItemSend = checkedBy[checkedByIndex]?.is_send;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tooltip placement="topLeft" title={isItemSend ? '已发送' : '未发生'}>
        <Tag
          color={isItemChecked === true ? '#87d068' : isItemChecked === false ? '#F5222D' : 'gray'}
          onMouseDown={onPreventMouseDown}
          closable={closable}
          onClose={onClose}
          style={{ marginRight: 3 }}
        >
          {label}
        </Tag>
      </Tooltip>
    );
  };
  // TODO:导出excel
  function handelExport() {
    return () => {
      setExportLoading(true);
      request(`/api/material/export_to_excel/${order_id}`, { responseType: 'blob' })
        .then((response) => {
          // 创建一个URL对象，表示文件流
          // const filename = response.headers['Content-Disposition'].split('filename=')[1];
          const fileUrl = URL.createObjectURL(response);
          // 创建一个链接，下载文件
          const link = document.createElement('a');
          link.href = fileUrl;
          link.download = `${orderDetail?.name}.xlsx`;
          document.body.appendChild(link);
          link.click();
          // 释放URL对象
          URL.revokeObjectURL(fileUrl);
          setExportLoading(false);
        })
        .catch(() => {
          setExportLoading(false);
          toast.error('导出失败');
        });
    };
  }

  return (
    <Skeleton loading={orderDetailLoading} active={true}>
      <Form form={orderForm}>
        <Badge.Ribbon text={color_text[badgeColor as keyof typeof color_text]} color={badgeColor}>
          <Card>
            <Descriptions bordered size="small">
              <Descriptions.Item label="标题">
                <Form.Item name="name">
                  <Input placeholder="请输入" bordered={false} />
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="创建者">
                <Form.Item name="created_by">
                  <UserSelectAdd
                    bordered={false}
                    initialValues={orderDetail?.created_by}
                  ></UserSelectAdd>
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="审核人">
                <Form.Item name="checkers">
                  <UserSelectAdd
                    bordered={false}
                    mode="multiple"
                    tagRender={tagRender}
                    initialValues={orderDetail?.checked_by?.map((r) => r.checked_by)}
                  ></UserSelectAdd>
                </Form.Item>
                <Popconfirm
                  title="是否要发送审核信息"
                  onConfirm={() => {
                    message.success(' 模块开发中。。。。');
                  }}
                  okText="Yes"
                  cancelText="No"
                  style={{ paddingRight: 0 }}
                >
                  <ShakeOutlined />
                  <a>发送审核信息</a>
                </Popconfirm>
              </Descriptions.Item>
              <Descriptions.Item label="供应商">
                <Form.Item name="supplier">
                  <SupplierSelectAdd
                    bordered={false}
                    initialValue={orderDetail?.supplier}
                  ></SupplierSelectAdd>
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="项目">
                <Form.Item name="project">
                  <ProjectSelectAdd
                    bordered={false}
                    initialValue={orderDetail?.project}
                  ></ProjectSelectAdd>
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="类别">
                <Form.Item name="category">
                  <Input placeholder="请输入" bordered={false} />
                </Form.Item>
              </Descriptions.Item>
              {orderDetail?.created_time && (
                <Descriptions.Item label="创建时间">
                  {orderDetail?.created_time ? formatDate(orderDetail?.created_time) : null}
                </Descriptions.Item>
              )}
              <Descriptions.Item label="导入/导出" span={2}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <UploadMy order_id={orderDetail?.id}></UploadMy>
                  <Button
                    style={{ display: 'inline-block' }}
                    loading={exportLoading}
                    icon={<CloudDownloadOutlined />}
                    type="text"
                    onClick={handelExport()}
                  >
                    导出材料单
                  </Button>
                </div>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Badge.Ribbon>
      </Form>
    </Skeleton>
  );
};
export default OrderTop;
