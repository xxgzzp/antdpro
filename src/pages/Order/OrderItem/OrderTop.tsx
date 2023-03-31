import { formatDate } from '@/components/Utils/formatDate';
import ProjectSelectAdd from '@/pages/Project/ProjectSelectAdd';
import SupplierSelectAdd from '@/pages/Supplier/SupplierSelectAdd';
import UserSelectAdd from '@/pages/User/UserSelectAdd';
import {
  apiMaterialOrderCheckedList,
  apiMaterialOrderUpdate,
  apiMaterialOrderUploadToWecomList,
} from '@/services/ant-design-pro/api';

import UploadMy from '@/components/Utils/UploadMy';
import { KeepAliveContext, useLocation } from '@@/exports';
import { CloudDownloadOutlined, FormOutlined, UploadOutlined } from '@ant-design/icons';
import { request, useModel } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Badge, Button, Descriptions, Form, Input, Skeleton, Tag, Tooltip } from 'antd';
import { FormInstance } from 'antd/es/form';
import { CustomTagProps } from 'rc-select/es/BaseSelect';
import React, { useEffect, useState } from 'react';
interface OrderCheckedResponse {
  results: API.OrderChecked[]; // 将结果数组中的每个对象都指定为 OrderCheckedResult 类型
}

// TODO:审核人颜色-Tooltip
const tagRender = (props: CustomTagProps, userEnum: any[], orderChecked?: OrderCheckedResponse) => {
  const { label, value, closable, onClose } = props;
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Wait 2 seconds before showing Tooltip
    const timer = setTimeout(() => setShowTooltip(false), 3000);
    // Clean up timer on unmount
    return () => clearTimeout(timer);
  }, [showTooltip]);

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

  useEffect(() => {
    if (!_user?.userid || orderCheckItem?.speech || orderCheckItem?.sp_status_name) {
      setShowTooltip(true);
    }
  }, [_user]);

  return (
    <Tooltip
      destroyTooltipOnHide={true}
      color={orderCheckItem?.sp_status ? tagColor[orderCheckItem.sp_status] : 'break'}
      open={showTooltip} // only show Tooltip when showTooltip state is true
      title={
        _user?.userid
          ? orderCheckItem?.speech
            ? orderCheckItem?.speech
            : orderCheckItem?.sp_status_name
          : '该用户未加入企业微信,无法发送'
      }
    >
      <Tag
        onMouseOver={() => {
          setShowTooltip(true);
        }}
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

const OrderTop: React.FC<{
  orderForm: FormInstance<any> | undefined;
  order_id: string | undefined;
  orderDetail: API.Order | undefined;
  orderDetailLoading: boolean | undefined;
  applyEventRef: React.MutableRefObject<null>;
  getOrderDetail: any;
}> = ({ orderForm, order_id, orderDetail, orderDetailLoading, applyEventRef, getOrderDetail }) => {
  // 加载远程数据

  const { data: orderChecked } = useRequest<OrderCheckedResponse, any>(() =>
    // @ts-ignore
    apiMaterialOrderCheckedList({ order: order_id }),
  );
  // 判断是否是企业微信用户用的
  const { userEnum } = useModel('selector');

  const [exportWecomLoading, setExportWecomLoading] = useState(false);
  // 更改标签页标题
  const location = useLocation();
  // @ts-ignore
  const { updateTab } = React.useContext(KeepAliveContext);
  const [applyeventLoading, setApplyeventLoading] = useState(false);

  // 评分
  const [rateValue, setRateValue] = useState<number>();

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

  // TODO:导出excel
  const handelExport = () => {
    window.open(`/api/material/order/${order_id}/export_to_excel/`);
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
  const handelApplyevent = async () => {
    setApplyeventLoading(true);
    // 先提交订单信息 再审核
    await apiMaterialOrderUpdate({ id: order_id! }, { ...orderForm?.getFieldsValue() });
    await request(`/api/material/order/${order_id}/applyevent/`);
    setApplyeventLoading(false);
  };

  // TODO:对供应商评价
  // const handleSupplierRate = (value: number) => {
  //   const intValue = Math.round(value * 2);
  //   if (intValue !== rateValue && intValue >= 0 && intValue <= 10) {
  //     setRateValue(intValue);
  //     apiMaterialOrderPartialUpdate({ id: order_id! }, { supplier_rate: intValue })
  //       .then(() => {
  //         toast.success('打分成功');
  //       })
  //       .catch(() => {
  //         toast.error('打分失败');
  //       });
  //   }
  // };

  return (
    <Skeleton loading={orderDetailLoading} active={true}>
      <Form form={orderForm}>
        <Badge.Ribbon
          text={orderDetail?.sp_status_name}
          color={orderDetail?.sp_status ? badgeColor[orderDetail?.sp_status] : 'cyan'}
        >
          <Descriptions size="small" bordered>
            <Descriptions.Item label="标题">
              <Form.Item name="name">
                <Input placeholder="请输入" bordered={false} />
              </Form.Item>
            </Descriptions.Item>

            <Descriptions.Item label="创建者">
              <Form.Item name="created_by">
                <UserSelectAdd
                  style={{ width: '200px' }}
                  bordered={false}
                  initialValues={orderDetail?.created_by}
                ></UserSelectAdd>
              </Form.Item>
            </Descriptions.Item>

            <Descriptions.Item label="审核人">
              <Form.Item name="checkers">
                <UserSelectAdd
                  style={{ width: '200px' }}
                  bordered={false}
                  mode="multiple"
                  tagRender={(props: CustomTagProps) => tagRender(props, userEnum, orderChecked)}
                  initialValues={orderDetail?.checked_by?.map((r) => r.checked_by)}
                ></UserSelectAdd>
              </Form.Item>
              <Button
                ref={applyEventRef}
                onClick={handelApplyevent}
                icon={<FormOutlined />}
                loading={applyeventLoading}
                type="link"
              >
                生成审批单
              </Button>
            </Descriptions.Item>

            <Descriptions.Item label="供应商">
              <Form.Item name="supplier">
                <SupplierSelectAdd
                  style={{ width: '200px' }}
                  bordered={false}
                  initialValue={orderDetail?.supplier}
                ></SupplierSelectAdd>
              </Form.Item>
              {/*{orderDetail?.supplier && (*/}
              {/*  <Rate*/}
              {/*    allowHalf*/}
              {/*    style={{ padding: '0px' }}*/}
              {/*    value={rateValue}*/}
              {/*    defaultValue={orderDetail?.supplier_rate}*/}
              {/*    onChange={handleSupplierRate}*/}
              {/*  />*/}
              {/*)}*/}
            </Descriptions.Item>

            <Descriptions.Item label="项目">
              <Form.Item name="project">
                <ProjectSelectAdd
                  style={{ width: '200px' }}
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
                <Button icon={<UploadOutlined rotate={180} />} type="text" onClick={handelExport}>
                  导出材料单
                </Button>
                <Button
                  loading={exportWecomLoading}
                  icon={<CloudDownloadOutlined />}
                  type="text"
                  onClick={handelUploadToWecom}
                >
                  创建"腾讯文档"
                </Button>
                {orderDetail?.share_url && (
                  <a
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
        </Badge.Ribbon>
      </Form>
    </Skeleton>
  );
};
export default OrderTop;
