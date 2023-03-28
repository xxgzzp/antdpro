import {
  apiMaterialSupplierRateCreate,
  apiMaterialSupplierRateList,
  apiMaterialSupplierRateUpdate,
} from '@/services/ant-design-pro/api'; // 引入自定义的.less文件
import { useRequest } from 'ahooks';
import { Alert, Button, Form, Input, Rate, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styles from './index.less';
interface Props {
  order_id: string;
  supplier_id: string | undefined;
}
const SupplierRateForm: React.FC<Props> = ({ order_id, supplier_id }) => {
  const [form] = Form.useForm(); // 使用Form组件进行表单操作
  const { data, loading, run } = useRequest<{ results: API.SupplierRate[] }, any>(
    () => apiMaterialSupplierRateList({ order: order_id, supplier: supplier_id }),
    { manual: true },
  );

  useEffect(() => {
    if (order_id && supplier_id) {
      run();
    }
  }, [order_id, supplier_id]);

  useEffect(() => {
    if (data?.results?.length) {
      const supplierRate = data?.results?.[0];
      form.setFieldsValue({
        // @ts-ignore
        delivery_speed: supplierRate.delivery_speed / 2,
        // @ts-ignore
        support_service: supplierRate.support_service / 2,
        // @ts-ignore
        quality: supplierRate.quality / 2,
        // @ts-ignore
        rate: supplierRate.rate / 2,
        comments: supplierRate.comments,
      });
    }
  }, [data]);

  // 自定义验证器，用于验证评分是否已经选择
  const validateRate = (_: unknown, value: number | undefined) => {
    if (value === undefined) {
      return Promise.reject(new Error('请给供应商进行评分'));
    }
    return Promise.resolve();
  };

  const [submitLoading, setSubmitLoading] = useState(false);
  // 提交表单数据
  const submitForm = (values: API.SupplierRate) => {
    if (!supplier_id) {
      toast.error('您还未添加供应商，请先添加再评价');
    } else {
      form.validateFields().then(async (values) => {
        setSubmitLoading(true);
        const { delivery_speed, support_service, quality, rate, ...rest } = values;
        if (data?.results?.length) {
          //   如果有评价了就修改
          await apiMaterialSupplierRateUpdate(
            // @ts-ignore
            { id: data?.results?.[0].id },
            {
              ...rest,
              delivery_speed: delivery_speed * 2,
              support_service: support_service * 2,
              quality: quality * 2,
              // @ts-ignore
              rate: rate * 2,
              order: order_id,
              supplier: supplier_id,
            },
          )
            .then(() => {
              toast.success('提交成功');
            })
            .catch(() => {
              toast.success('提交失败');
            });
        } else {
          //   如果没有评价了就提交
          await apiMaterialSupplierRateCreate({
            ...rest,
            delivery_speed: delivery_speed * 2,
            support_service: support_service * 2,
            quality: quality * 2,
            // @ts-ignore
            rate: rate * 2,
            order: order_id,
            supplier: supplier_id,
          })
            .then(() => {
              toast.success('提交成功');
            })
            .catch(() => {
              toast.success('提交失败');
            });
        }
        setSubmitLoading(false);
      });
    }
  };
  return (
    <Spin spinning={loading}>
      <div className={styles.container}>
        <Alert closable showIcon message="请提交真实评价" style={{ marginBottom: 24 }} />
        <Form form={form} onFinish={submitForm} layout="vertical">
          <Form.Item label="综合评分" name="rate" rules={[{ validator: validateRate }]}>
            <Rate allowHalf />
          </Form.Item>
          <Form.Item label="送货速度" name="delivery_speed" rules={[{ validator: validateRate }]}>
            <Rate allowHalf />
          </Form.Item>
          <Form.Item label="配套服务" name="support_service" rules={[{ validator: validateRate }]}>
            <Rate allowHalf />
          </Form.Item>
          <Form.Item label="质量" name="quality" rules={[{ validator: validateRate }]}>
            <Rate allowHalf />
          </Form.Item>
          <Form.Item label="评价意见" name="comments">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={submitLoading}>
              提交评价
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};
export default SupplierRateForm;
