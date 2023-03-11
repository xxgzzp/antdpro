import { formatDate } from '@/components/Utils/formatDate';
import ProjectSelectAdd from '@/pages/Project/ProjectSelectAdd';
import SupplierSelectAdd from '@/pages/Supplier/SupplierSelectAdd';
import UserSelectAdd from '@/pages/User/UserSelectAdd';
import { apiMaterialOrderRead } from '@/services/ant-design-pro/api';
import { useRequest } from 'ahooks';
import { Descriptions, Form, Input, Skeleton } from 'antd';
import { FormInstance } from 'antd/es/form';
import React, { useEffect } from 'react';

const OrderTop: React.FC<{
  orderForm: FormInstance<any> | undefined;
  order_id: string | undefined;
  is_new: string | null;
}> = ({ orderForm, order_id, is_new }) => {
  // 加载远程数据
  const {
    data: orderDetail,
    loading: orderDetailLoading,
    run: getOrderDetail,
  } = useRequest(apiMaterialOrderRead, {
    manual: true,
  });
  useEffect(() => {
    if (is_new !== 'true') {
      // 否则加载远程的
      getOrderDetail({ id: order_id! });
    }
  }, []);
  useEffect(() => {
    orderForm?.setFieldsValue({
      name: orderDetail?.name,
      created_by: orderDetail?.created_by,
      checkers: orderDetail?.checked_by?.map((r) => r.checked_by),
      supplier_id: orderDetail?.supplier,
      project_id: orderDetail?.project,
      category: orderDetail?.category,
    });
  }, [orderDetail]);
  return (
    <Skeleton loading={orderDetailLoading} active={true}>
      <Form form={orderForm}>
        <Descriptions bordered size="small">
          <Descriptions.Item label="标题">
            <Form.Item name="name">
              <Input placeholder="请输入" bordered={false} />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="创建者">
            <Form.Item name="created_by">
              <UserSelectAdd
                defaultValue={[
                  {
                    label: orderDetail?.created_by_name,
                    value: orderDetail?.created_by,
                  },
                ]}
              ></UserSelectAdd>
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="审核人">
            {/*这里有个坑，初始数据要用initialValue，defaultValue是给页面显示的*/}
            <Form.Item name="checkers">
              <UserSelectAdd
                mode="multiple"
                defaultValue={orderDetail?.checked_by?.map((r) => ({
                  label: r.checked_by_name,
                  value: r.checked_by,
                }))}
              ></UserSelectAdd>
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="供应商">
            <Form.Item name="supplier_id">
              <SupplierSelectAdd
                defaultValue={[
                  {
                    label: orderDetail?.supplier_name,
                    value: orderDetail?.supplier,
                  },
                ]}
              ></SupplierSelectAdd>
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="项目">
            <Form.Item name="project_id">
              <ProjectSelectAdd
                defaultValue={[
                  {
                    label: orderDetail?.project_name,
                    value: orderDetail?.project,
                  },
                ]}
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
        </Descriptions>
      </Form>
    </Skeleton>
  );
};
export default OrderTop;
