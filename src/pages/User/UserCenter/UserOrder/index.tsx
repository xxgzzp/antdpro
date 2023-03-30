import useOrderLocalStorage from '@/pages/Order/OrderItem/useOrderLocalStorage';
import { apiMaterialOrderUpdateStep } from '@/services/ant-design-pro/api';
import { ProList } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Steps, Tag } from 'antd';
import { Step } from 'rc-steps';
import React, { useEffect, useState } from 'react';

const UserOrder: React.FC<{
  date: any;
  loading: boolean;
  // @ts-ignore
}> = ({ data, loading }) => {
  const { getOrderLocal } = useOrderLocalStorage();
  const [cardActionProps, setCardActionProps] = useState<'actions' | 'extra'>('actions');
  const [dataSource, setDataSource] = useState();

  useEffect(() => {
    if (data) {
      setDataSource(data);
    }
  }, [data]);

  const isOrderLocal = (order_id: string) => {
    const orderLocal = getOrderLocal(order_id);
    if (orderLocal?.length) {
      return true;
    }
    return false;
  };

  const [finishLoading, setFinishLoading] = useState(false);
  const handleFinish = (record: any) => {
    setFinishLoading(true);
    apiMaterialOrderUpdateStep({ id: record.id })
      .then(() => {
        setDataSource((dataSource) => dataSource.filter((item) => item.id !== record.id));
        setFinishLoading(false);
      })
      .catch(() => {
        setFinishLoading(false);
      });
  };

  return (
    <div
      style={{
        margin: -24,
        padding: 24,
      }}
    >
      <ProList
        pagination={{
          defaultPageSize: 8,
          showSizeChanger: false,
        }}
        loading={loading}
        showActions="hover"
        rowSelection={{}}
        grid={{ gutter: 16, column: 2 }}
        onItem={(record: any) => {
          return {
            onMouseEnter: () => {
              console.log(record);
            },
            onClick: () => {
              // console.log(record);
              history.push(`/order/${record.id}/orderitems`);
            },
          };
        }}
        metas={{
          title: {
            dataIndex: 'name',
          },
          subTitle: {
            render: (_, record) =>
              record.id ? (
                isOrderLocal(record.id) ? (
                  <Tag color="#5BD8A6">存在本地数据</Tag>
                ) : null
              ) : null,
          },
          type: {
            dataIndex: 'step_name',
          },
          avatar: {},
          content: {
            render: (_, record) => (
              <div
                style={{
                  width: 200,
                }}
              >
                {/*<Progress style={{ display: 'inline-block' }} percent={(record.step / 5) * 100} />*/}
                {/*<div>{record.step_name}</div>*/}
                <Steps
                  direction={'vertical'}
                  current={record.step + 1}
                  size={'small'}
                  percent={60}
                  labelPlacement="vertical"
                >
                  <Step title="创建" />
                  <Step title="提交材料单" />
                  <Step title="创建审核单" />
                  <Step title="审核" />
                  <Step title="供货商评价" />
                  <Step title="完成" />
                </Steps>
              </div>
            ),
          },
          actions: {
            cardActionProps,
            render: (_, record) => [
              <a type="link" onClick={() => handleFinish(record)}>
                完单
              </a>,
              <a href="/order/${record.id}/orderitems" key="delete">
                打开
              </a>,
            ],
          },
        }}
        // headerTitle="我的材料单"
        dataSource={dataSource}
      />
    </div>
  );
};

export default UserOrder;
