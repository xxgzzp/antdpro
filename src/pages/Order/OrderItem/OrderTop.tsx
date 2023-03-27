import { formatDate } from '@/components/Utils/formatDate';
import UploadMy from '@/components/Utils/UploadMy';
import ProjectSelectAdd from '@/pages/Project/ProjectSelectAdd';
import SupplierSelectAdd from '@/pages/Supplier/SupplierSelectAdd';
import UserSelectAdd from '@/pages/User/UserSelectAdd';
import {
  apiMaterialOrderCheckedList,
  apiMaterialOrderRead,
  apiMaterialOrderUpdate,
  apiMaterialOrderUploadToWecomList,
} from '@/services/ant-design-pro/api';

import { KeepAliveContext, useLocation } from '@@/exports';
import { CloudDownloadOutlined, ShakeOutlined, UploadOutlined } from '@ant-design/icons';
import { request, useModel } from '@umijs/max';
import { useRequest } from 'ahooks';
import {
  Badge,
  Button,
  Card,
  Descriptions,
  Form,
  Input,
  Popconfirm,
  Skeleton,
  Tag,
  Tooltip,
} from 'antd';
import { FormInstance } from 'antd/es/form';
import { CustomTagProps } from 'rc-select/es/BaseSelect';
import React, { useEffect, useState } from 'react';
interface OrderCheckedResponse {
  results: API.OrderChecked[]; // 将结果数组中的每个对象都指定为 OrderCheckedResult 类型
}
const OrderTop: React.FC<{
  orderForm: FormInstance<any> | undefined;
  order_id: string | undefined;
}> = ({ orderForm, order_id }) => {
  // 加载远程数据
  const {
    data: orderDetail,
    loading: orderDetailLoading,
    run: getOrderDetail,
  } = useRequest<API.Order, any>(apiMaterialOrderRead, {
    manual: true,
  });
  const { data: orderChecked } = useRequest<OrderCheckedResponse, any>(() =>
    apiMaterialOrderCheckedList({ order: order_id }),
  );
  // 判断是否是企业微信用户用的
  const { userEnum } = useModel('selector');

  const [exportWecomLoading, setExportWecomLoading] = useState(false);
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
    // TODO:更改标签页标题
    updateTab(location.pathname, {
      name: orderDetail?.name,
      closable: true,
    });
  }, [orderDetail]);

  // TODO:订单关于审核的badgeColor
  const badgeColor: { [key: number]: string } = {
    //   (0, "审核单未创建"),
    //   (1, "审批中"),
    //   (2, "已通过"),
    //   (3, "已驳回"),
    //   (4, "已撤销"),
    //   (6, "通过后撤销"),
    //   (7, "已删除"),
    //   (10, "已支付"),
    0: '#424949',
    1: '#1B4F72',
    2: '#239B56',
    3: 'orange',
    4: 'purple',
    6: '#52BE80',
    7: 'red',
    10: 'green',
  };

  // TODO:审核人颜色-Tooltip
  const tagRender = (props: CustomTagProps) => {
    const { label, value, closable, onClose } = props;
    const orderCheckItem = orderChecked?.results.find((item) => item.checked_by === value);
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const tagColor: { [key: string]: string } = {
      '1': '#262626', // 审批中
      '2': '#52C41A', // 已同意
      '3': '#F5222D', // 已驳回
      '4': 'blue', // 已转审
    };
    const _user = userEnum?.find((user: any) => user.value === value);

    return (
      <Tooltip
        defaultOpen={true}
        destroyTooltipOnHide={true}
        placement="topLeft"
        color={orderCheckItem?.sp_status ? tagColor[orderCheckItem.sp_status] : 'break'}
        title={
          _user?.userid
            ? orderCheckItem?.speech
              ? orderCheckItem?.speech
              : orderCheckItem?.sp_status_name
            : '该用户未加入企业微信,无法发送'
        }
      >
        <Tag
          color={orderCheckItem?.sp_status ? tagColor[orderCheckItem.sp_status] : 'cyan'}
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
  const handelExport = () => {
    window.open(`/api/material/order/${order_id}/export_to_excel/`);
    // request(`/api/material/order/${order_id}/export_to_excel/`, { responseType: 'blob' })
    //   .then((response) => {
    //     const url = window.URL.createObjectURL(new Blob([response.data]));
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.setAttribute('download', '123.xlsx'); // 可以将文件名设置为你想要的名字
    //     document.body.appendChild(link);
    //     link.click();
    //     setExportLoading(false);
    //   })
    //   .catch(() => {
    //     setExportLoading(false);
    //     toast.error('导出失败');
    //   });
  };

  // TODO:生成腾讯文档
  const handelUploadToWecom = () => {
    setExportWecomLoading(true);
    apiMaterialOrderUploadToWecomList({ order_id: order_id! }).then((r) => {
      window.open(r.share_url);
    });
    setExportWecomLoading(false);
  };

  // TODO:创建审核单
  const handelApplyevent = () => {
    // 先提交订单信息 再审核
    apiMaterialOrderUpdate({ id: order_id! }, { ...orderForm?.getFieldsValue() });
    request(`/api/material/order/${order_id}/applyevent/`);
  };

  return (
    <Skeleton loading={orderDetailLoading} active={true}>
      <Form form={orderForm}>
        <Badge.Ribbon
          text={orderDetail?.sp_status_name}
          color={orderDetail?.sp_status ? badgeColor[orderDetail?.sp_status] : 'cyan'}
        >
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
                  onConfirm={handelApplyevent}
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
                    icon={<UploadOutlined rotate={180} />}
                    type="text"
                    onClick={handelExport}
                  >
                    导出材料单
                  </Button>
                  <Button
                    style={{ display: 'inline-block' }}
                    loading={exportWecomLoading}
                    icon={<CloudDownloadOutlined />}
                    type="text"
                    onClick={handelUploadToWecom}
                  >
                    创建"腾讯文档"
                  </Button>
                  {orderDetail?.share_url && (
                    <a
                      style={{ display: 'inline-block' }}
                      type="text"
                      onClick={() => {
                        window.open(`${orderDetail?.share_url}`);
                      }}
                    >
                      腾讯文档
                    </a>
                  )}
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
