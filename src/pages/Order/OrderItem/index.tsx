import { formatDate } from '@/components/Utils/formatDate';
import OrderItem from '@/pages/Order/OrderItem/OrderItem';
import OrderTop from '@/pages/Order/OrderItem/OrderTop';
import SupplierRate from '@/pages/Order/SupplierRate';
import {
  apiMaterialOrderRead,
  apiMaterialOrderUpdate,
  apiMaterialOrderUploadToWecomList,
} from '@/services/ant-design-pro/api';
import { DingdingOutlined, EllipsisOutlined, FormOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';

import UploadMy from '@/components/Utils/UploadMy';
import useOrderLocalStorage from '@/pages/Order/OrderItem/useOrderLocalStorage';
import OrderPermission from '@/pages/Order/OrderPermission';
import { request, useModel } from '@@/exports';
import { Button, Card, Dropdown, Form, MenuProps, Steps, Tour, TourProps } from 'antd';
import { Step } from 'rc-steps';
import React, { Fragment, useRef, useState } from 'react';
import { ButtonGroup } from 'react-rainbow-components';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

const OrderItems: React.FC = () => {
  // URL中的order_id
  const { order_id } = useParams<{ order_id?: string }>();

  const {
    data: orderDetail,
    loading: orderDetailLoading,
    run: getOrderDetail,
  } = useRequest<API.Order, any>(apiMaterialOrderRead, {
    manual: true,
  });
  // 上方订单信息表单
  const [orderForm] = Form.useForm();

  const [tabStatus, seTabStatus] = useState({
    operationKey: 'tab1',
    tabActiveKey: 'detail',
  });
  const onTabChange = (tabActiveKey: string) => {
    seTabStatus({ ...tabStatus, tabActiveKey });
  };

  const { deleteOrderLocal, getOrderLocal } = useOrderLocalStorage();
  const { reloadKey, setReloadKey } = useModel('tableReload');
  // 操作的数据源 并且新建初始数据，如果是新建order就要用到
  const [dataSource, setDataSource] = useState<API.OrderItem[]>([]);
  const orderLocal = getOrderLocal(order_id!); // 获取本地order

  // TODO:提交数据
  const [commitLoading, setCommitLoading] = useState<boolean>(false);
  const handleCommit = async () => {
    setCommitLoading(true);
    await apiMaterialOrderUpdate({ id: order_id! }, { ...orderForm.getFieldsValue() });
    await request('/api/material/order_commit/', {
      method: 'POST',
      data: {
        order_items: dataSource,
        order_id: order_id,
      },
    })
      .then(() => {
        setReloadKey(reloadKey + 1);
        // getOrderDetail();
      })
      .catch(() => {
        setCommitLoading(false);
        toast.error('提交失败');
      });
    setCommitLoading(false);
    // 提交了就在本地删除
    deleteOrderLocal(order_id!);
  };

  const [_commitLoading, set_commitLoading] = useState(false);
  const handleOrderDetailCommit = async () => {
    set_commitLoading(true);
    await apiMaterialOrderUpdate({ id: order_id! }, { ...orderForm.getFieldsValue() })
      .then(() => {
        toast.success('修改成功');
      })
      .catch(() => {
        toast.error('修改失败');
      });
    set_commitLoading(false);
  };

  const desc1 = (
    <div>
      <Fragment>
        {orderDetail?.created_by_name}
        <DingdingOutlined style={{ marginLeft: 8 }} />
      </Fragment>
      <div>{orderDetail?.created_time ? formatDate(orderDetail?.created_time) : null}</div>
    </div>
  );
  const desc2 = (
    <div>
      <Button type="link" onClick={handleCommit}>
        提交
      </Button>
    </div>
  );
  const desc3 = (
    <div>
      <Button
        type="link"
        onClick={() => {
          setTourOpen(true);
        }}
      >
        创建审核单
      </Button>
    </div>
  );

  // TODO:导出excel
  const handelExport = () => {
    window.open(`/api/material/order/${order_id}/export_to_excel/`);
  };

  // TODO:生成腾讯文档
  const [exportLoading, setExportLoading] = useState(false);
  const handelUploadToWecom = async () => {
    setExportLoading(true);
    await apiMaterialOrderUploadToWecomList({ order_id: order_id! }).then((r) => {
      window.open(r.share_url);
    });
    setExportLoading(false);
  };

  // TODO:创建审核单
  const [applyeventLoading, setApplyeventLoading] = useState(false);
  const handelApplyevent = async () => {
    setApplyeventLoading(true);
    // 先提交订单信息 再审核
    await apiMaterialOrderUpdate({ id: order_id! }, { ...orderForm?.getFieldsValue() });
    await request(`/api/material/order/${order_id}/applyevent/`);
    setApplyeventLoading(false);
  };

  // 漫游式引导
  const applyEventRef = useRef(null);
  const [tourOpen, setTourOpen] = useState<boolean>(false);
  const tourSteps: TourProps['steps'] = [
    {
      title: '创建审核单',
      description: '在这里添加审核人，并生成审核单即可',
      target: () => applyEventRef.current,
    },
  ];

  const items: MenuProps['items'] = [
    {
      label: '导出材料单',
      key: '1',
    },
    {
      label: '生成腾讯文档',
      key: '2',
    },
  ];
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '1') {
      handelExport();
    }
    if (e.key === '2') {
      handelUploadToWecom();
    }
  };

  return (
    <div>
      <PageContainer
        title={orderDetail?.name}
        waterMarkProps={{ fontSize: 0 }}
        extra={
          <div>
            <ButtonGroup>
              <Button loading={commitLoading} onClick={handleCommit}>
                提交材料单
              </Button>
              <Button loading={_commitLoading} onClick={handleOrderDetailCommit}>
                提交面板信息
              </Button>
              {orderLocal?.length !== 0 && (
                <Button
                  onClick={() => {
                    deleteOrderLocal(order_id!);
                    setReloadKey(reloadKey + 1);
                    toast.success('删除成功');
                  }}
                >
                  删除本地数据
                </Button>
              )}
              <UploadMy order_id={order_id!}></UploadMy>
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
              <Button
                ref={applyEventRef}
                onClick={handelApplyevent}
                icon={<FormOutlined />}
                loading={applyeventLoading}
              >
                生成审批单
              </Button>
              <Dropdown menu={{ items, onClick: handleMenuClick }} placement="bottomRight">
                <Button loading={exportLoading}>
                  导出
                  <EllipsisOutlined />
                </Button>
              </Dropdown>
            </ButtonGroup>
          </div>
        }
        content={
          <OrderTop
            orderForm={orderForm}
            order_id={order_id}
            orderDetail={orderDetail}
            orderDetailLoading={orderDetailLoading}
            getOrderDetail={getOrderDetail}
          ></OrderTop>
        }
        tabActiveKey={tabStatus.tabActiveKey}
        onTabChange={onTabChange}
        tabList={[
          {
            key: 'detail',
            tab: '材料单',
          },
          {
            key: 'supplier_rate',
            tab: '供应商评价',
          },
          {
            key: 'permission',
            tab: '权限管理',
          },
        ]}
      >
        {tabStatus.tabActiveKey === 'detail' && (
          <div>
            <Card title="流程进度">
              <Steps
                direction={'horizontal'}
                current={orderDetail?.step ? orderDetail?.step + 1 : 0}
                percent={60}
                labelPlacement="vertical"
              >
                <Step title="创建" description={desc1} />
                <Step title="提交材料单" description={desc2} />
                <Step title="创建审核单" description={desc3} />
                <Step title="审核" />
                <Step title="供货商评价" />
                <Step title="完成" />
              </Steps>
            </Card>
            <OrderItem
              order_id={order_id!}
              dataSourceCommit={dataSource}
              setDataSourceCommit={setDataSource}
            ></OrderItem>
            <div style={{ height: '600px' }}></div>
          </div>
        )}

        {tabStatus.tabActiveKey === 'supplier_rate' && (
          <SupplierRate order_id={order_id!} supplier_id={orderDetail?.supplier} />
        )}
        {tabStatus.tabActiveKey === 'permission' && (
          <OrderPermission order_id={order_id!}></OrderPermission>
        )}
      </PageContainer>
      {/*漫游式引导*/}
      <Tour open={tourOpen} onClose={() => setTourOpen(false)} steps={tourSteps} />
    </div>
  );
};
export default OrderItems;
