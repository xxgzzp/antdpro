import { ProList } from '@ant-design/pro-components';

import useOrderLocalStorage from '@/pages/Order/OrderItem/useOrderLocalStorage';
import { history, request } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Steps, Tag } from 'antd';
import { Step } from 'rc-steps';
import { useEffect, useState } from 'react';
export default () => {
  const { getOrderLocal } = useOrderLocalStorage();
  const [isOrderLocal, setIsOrderLocal] = useState(false);
  const [cardActionProps, setCardActionProps] = useState<'actions' | 'extra'>('actions');
  const { data, loading } = useRequest(() =>
    request('api/material/order/user_order')
      .then((data) => {
        return data.results;
      })
      .catch((error) => console.error(error)),
  );

  useEffect(() => {
    if (data?.results) {
      const orderLocal = getOrderLocal(data.results?.id);
      if (orderLocal?.length) {
        setIsOrderLocal(true);
      }
    }
  }, [data]);

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
          // subTitle: {
          //   dataIndex: 'created_time',
          //   // @ts-ignore
          //   render: (value) => <Tag color="#5BD8A6">{value ? formatDate(value) : null}</Tag>,
          // },
          subTitle: {
            render: (value) => (isOrderLocal ? <Tag color="#5BD8A6">存在本地数据</Tag> : null),
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
            render: (_, record) => [<a key="run">完单</a>, <a key="delete">删除</a>],
          },
        }}
        headerTitle="我的材料单"
        dataSource={data}
      />
    </div>
  );
};
