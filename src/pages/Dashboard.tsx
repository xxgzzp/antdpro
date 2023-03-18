import '@/pages/Dashboard.less';

import {
  FileOutlined,
  ProjectOutlined,
  ShoppingOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { history } from '@umijs/max';
import { Badge, Card, Col, Collapse, List, Row } from 'antd';

import { apiDashboardList } from '@/services/ant-design-pro/api';
import { useRequest } from 'ahooks';
import { Panel } from 'rc-collapse';
import React from 'react';
import { Link } from 'umi';

const Dashboard: React.FC = () => {
  const { data: dashboardData, loading } = useRequest(() =>
    apiDashboardList().then((res) => res.results),
  );
  const dashboardMap: any = {
    user_count: {
      title: '用户',
      icon: <UserOutlined style={{ fontSize: 40 }} />,
      value: dashboardData?.user_count,
      url: 'user',
    },
    project_count: {
      title: '项目',
      icon: <ProjectOutlined style={{ fontSize: 40 }} className={'criclebox'} />,
      value: dashboardData?.project_count,
      url: 'project',
    },
    supplier_count: {
      title: '供应商',
      icon: <SolutionOutlined style={{ fontSize: 40 }} />,
      value: dashboardData?.supplier_count,
      url: 'supplier',
    },
    order_count: {
      title: '材料单',
      icon: <ShoppingOutlined style={{ fontSize: 40 }} />,
      value: dashboardData?.order_count,
      url: 'order',
    },
    contract_count: {
      title: '合同',
      icon: <FileOutlined style={{ fontSize: 40 }} />,
      value: dashboardData?.contract_count,
      url: 'contract',
    },
    material_count: {
      title: '材料',
      icon: <FileOutlined style={{ fontSize: 40 }} />,
      value: dashboardData?.material_count,
      url: 'material_all',
    },
  };

  return (
    <div className="site-card-wrapper">
      <Row gutter={[16, 16]} justify="center">
        {Object.keys(dashboardMap).map((key) => (
          <Col span={4} key={key}>
            <Card
              hoverable
              loading={loading}
              size={'small'}
              className={'criclebox'}
              onClick={() => {
                history.push(dashboardMap[key].url);
              }}
            >
              <Row align="top">
                <Col flex="auto">
                  <h3>{dashboardMap[key].title}</h3>
                  <h2 style={{ color: '#1890FF' }}>{dashboardMap[key].value}</h2>
                </Col>
                <Col flex="none">{dashboardMap[key].icon}</Col>
              </Row>
              {/*{dashboardMap[key].title === '材料单' && (*/}
              {/*  <div style={{ position: 'absolute', bottom: '0', right: '0' }}>*/}
              {/*    <Button icon={<ToTopOutlined />}>新增材料单</Button>*/}
              {/*  </div>*/}
              {/*)}*/}
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} justify="center">
        {/*进行中的材料单*/}
        <Col span={12}>
          <Collapse defaultActiveKey={['1']} ghost>
            <Panel header="代办材料单" key="1">
              <List
                loading={loading}
                itemLayout="horizontal"
                dataSource={dashboardData?.progress_order}
                renderItem={(item: any) => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      // avatar={<Avatar src={`https://joesch.moe/api/v1/random?key=${index}`} />}
                      title={<Link to={`/order/${item.id}/orderitems`}>{item.name}</Link>}
                      description={<Badge status="processing" text={item.progress} />}
                    />
                  </List.Item>
                )}
              />
            </Panel>
          </Collapse>
        </Col>

        <Col span={12}>
          <Collapse defaultActiveKey={['1']} ghost>
            <Panel header="未审核材料单" key="1">
              <List
                loading={loading}
                itemLayout="horizontal"
                dataSource={dashboardData?.checked_order}
                renderItem={(item: any) => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      // avatar={<Avatar src={`https://joesch.moe/api/v1/random?key=${index}`} />}
                      title={<Link to={`/order/${item.id}/orderitems`}>{item.name}</Link>}
                      description={item.created_by__name}
                    />
                  </List.Item>
                )}
              />
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
