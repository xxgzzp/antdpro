import UserCard from '@/pages/User/UserCenter/UserCard/UserCard';
import UserOrder from '@/pages/User/UserCenter/UserOrder';
import UserOrderChecked from '@/pages/User/UserCenter/UserOrderChecked';
import { request } from '@@/exports';
import { GridContent } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import { Card, Col, Row } from 'antd';
import React, { useState } from 'react';

export type tabKeyType = 'user_order' | 'order_checked' | 'projects';

const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
}> = ({ title, href, index, desc }) => {
  const [tabKey, setTabKey] = useState<tabKeyType>('user_order');

  const { data: user_order, loading: user_order_loading } = useRequest(() =>
    request('api/material/order/user_order').catch((error) => console.error(error)),
  );

  const { data: user_order_checked, loading: user_order_checked_loading } = useRequest(() =>
    request('api/material/order_checked/user_order_checked/').catch((error) =>
      console.error(error),
    ),
  );

  const operationTabList = [
    {
      key: 'user_order',
      tab: (
        <span>
          我的材料单(代办) <span style={{ fontSize: 14 }}>{user_order?.count}</span>
        </span>
      ),
    },
    {
      key: 'order_checked',
      tab: (
        <span>
          我的审核单(代办) <span style={{ fontSize: 14 }}>{user_order_checked?.count}</span>
        </span>
      ),
    },
  ];

  return (
    <GridContent>
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <UserCard></UserCard>
        </Col>
        <Col lg={17} md={24}>
          <div style={{ paddingLeft: '10' }}>
            <Card
              bordered={false}
              tabList={operationTabList}
              activeTabKey={tabKey}
              onTabChange={(_tabKey: string) => {
                console.log(_tabKey);
                setTabKey(_tabKey as tabKeyType);
              }}
            ></Card>
            {tabKey === 'user_order' && (
              <UserOrder data={user_order?.results} loading={user_order_loading}></UserOrder>
            )}
            {tabKey === 'order_checked' && (
              <UserOrderChecked
                data={user_order_checked?.results}
                loading={user_order_checked_loading}
              />
            )}
          </div>
        </Col>
      </Row>
    </GridContent>
  );
};
export default InfoCard;
