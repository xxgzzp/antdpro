import { formatDate } from '@/components/Utils/formatDate';
import ProjectSelectAdd from '@/pages/Project/ProjectSelectAdd';
import SupplierSelectAdd from '@/pages/Supplier/SupplierSelectAdd';
import UserSelectAdd from '@/pages/User/UserSelectAdd';
import { apiMaterialOrderRead } from '@/services/ant-design-pro/api';
import { useModel } from '@@/exports';
import { useRequest } from 'ahooks';
import { Descriptions, Form, Input, Skeleton } from 'antd';
import { FormInstance } from 'antd/es/form';
import React from 'react';

const OrderTop: React.FC<{
  orderForm: FormInstance<any> | undefined;
  order_id: string | undefined;
}> = ({ orderForm, order_id }) => {
  // 请求订单详细数据
  const { data: orderDetail, loading: orderDetailLoading } = useRequest(() =>
    apiMaterialOrderRead({ id: order_id! }),
  );
  // get 初始数据中用户的信息
  const { currentUser } = useModel('@@initialState');

  return (
    <Skeleton loading={orderDetailLoading} active={true}>
      <Form
        form={orderForm}
        initialValues={{
          created_by_name: orderDetail?.created_by_name
            ? orderDetail?.created_by_name
            : currentUser?.name,
          created_by: orderDetail?.created_by ? orderDetail?.created_by : currentUser?.id,
          supplier_name: orderDetail?.supplier_name,
        }}
      >
        <Descriptions bordered size="small">
          <Descriptions.Item label="标题">
            <Form.Item name="name" initialValue={orderDetail?.name}>
              <Input placeholder="请输入" bordered={false} />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="创建者">
            <Form.Item name="created_by">
              <UserSelectAdd defaultValue={orderDetail?.created_by}></UserSelectAdd>
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="审核人">
            {/*这里有个坑，初始数据要用initialValue，defaultValue是给页面显示的*/}
            <Form.Item
              name="checkers"
              initialValue={orderDetail?.checked_by?.map((r) => r.checked_by)}
            >
              <UserSelectAdd
                mode="multiple"
                defaultValue={orderDetail?.checked_by?.map((r) => r.checked_by)}
              ></UserSelectAdd>
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="供应商">
            <Form.Item name="supplier_id" initialValue={orderDetail?.supplier}>
              <SupplierSelectAdd defaultValue={orderDetail?.supplier}></SupplierSelectAdd>
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="项目">
            <Form.Item name="project_id" initialValue={orderDetail?.project}>
              <ProjectSelectAdd defaultValue={orderDetail?.project} />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="类别">
            <Form.Item name="category" initialValue={orderDetail?.category}>
              <Input placeholder="请输入" bordered={false} />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="创建时间" span={1}>
            {formatDate(orderDetail?.created_time)}
          </Descriptions.Item>
        </Descriptions>
      </Form>
    </Skeleton>
  );
};
export default OrderTop;
