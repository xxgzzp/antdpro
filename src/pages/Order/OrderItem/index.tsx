import { EditableCell, EditableRow } from '@/components/Utils/Editable';
import { formatDate } from '@/components/Utils/formatDate';
import '@/pages/Order/OrderItem/index.less';
import OrderTop from '@/pages/Order/OrderItem/OrderTop';
import useOrderLocalStorage, { OrderLocal } from '@/pages/Order/OrderItem/useOrderLocalStorage';
import SupplierRate from '@/pages/Order/SupplierRate';
import {
  apiMaterialOrderItemList,
  apiMaterialOrderRead,
  apiMaterialOrderUpdate,
} from '@/services/ant-design-pro/api';
import { DingdingOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-table';
import { request, useModel } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Button, Card, Form, Popconfirm, Steps, Table } from 'antd';
import { isEqual } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
const { Step } = Steps;

const Index: React.FC = () => {
  // 请求订单项
  const {
    data: remoteDate,
    loading: orderRemoteLoading,
    run: getOrderItemRemote,
  } = useRequest(apiMaterialOrderItemList, { manual: true });

  const {
    data: orderDetail,
    loading: orderDetailLoading,
    run: getOrderDetail,
  } = useRequest<API.Order, any>(apiMaterialOrderRead, {
    manual: true,
  });

  // URL中的order_id
  const { order_id } = useParams<{ order_id?: string }>();

  // 上方订单信息表单
  const [orderForm] = Form.useForm();

  // 操作LocalStorage
  const { getOrderLocal, updateOrderLocal, deleteOrderLocal } = useOrderLocalStorage();
  const orderLocal = getOrderLocal(order_id!); // 获取本地order

  // 操作的数据源 并且新建初始数据，如果是新建order就要用到
  const [dataSource, setDataSource] = useState<API.OrderItem[]>([]);

  const { reloadKey, setReloadKey } = useModel('tableReload');

  // TODO:加载数据
  useEffect(() => {
    getOrderItemRemote({ order: order_id });
    // 如果有本地数据就读取
    if (typeof orderLocal !== undefined && orderLocal?.length) {
      setDataSource(orderLocal[0].items);
    }
  }, [reloadKey, order_id]);

  // TODO:远程数据加载完毕:
  useEffect(() => {
    if (remoteDate && orderLocal?.length) {
      // 去除时间戳后比较
      const _localDate = orderLocal[0].items.map((item) => ({ ...item, timestamp: undefined }));
      const _remoteDate = remoteDate.results.map((item: any) => ({
        ...item,
        timestamp: undefined,
      }));
      if (isEqual(_localDate, _remoteDate)) {
        // TODO:若远程数据和本地数据相等就删除本地数据
        deleteOrderLocal(order_id!);
      }
    }

    // TODO:有本地数据就加载本地的
    if (remoteDate && !orderLocal?.length) {
      setDataSource(remoteDate.results);
    }
  }, [remoteDate]);

  // TODO:删除行
  const handleDelete = (id: React.Key) => {
    if (dataSource) {
      const newData = dataSource.filter((item) => item.id !== id);
      setDataSource(newData);
      const updateOrder: OrderLocal = { id: order_id!, items: newData! };
      updateOrderLocal(updateOrder);
    }
  };

  // TODO:新增行
  const handleAdd = () => {
    if (dataSource) {
      const newData: API.OrderItem = {
        id: uuidv4(),
        material_name: undefined,
        material_sku: undefined,
        material_unit: undefined,
        need_time: undefined,
        buy_num: undefined,
        used_site: undefined,
        sort: dataSource.length + 1,
        is_arrival: false,
        timestamp: undefined,
        order: '',
        material: 0,
        contract: undefined,
        receipt: undefined,
      };
      newData.id = uuidv4();
      newData.sort = dataSource.length + 1;
      setDataSource([...dataSource, newData]);
    }
  };

  // TODO:保存行
  const handleSave = (row: API.OrderItem) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];

    // 修改当前时间缀
    // const newTimestamp = new Date().toLocaleString({ timeZone: 'Asia/Shanghai' });
    const dateTime = new Date(+new Date() + 8 * 3600 * 1000);
    const newTimestamp = new Date(dateTime).toISOString();
    const newRow = { ...row, timestamp: newTimestamp };
    newData.splice(index, 1, {
      ...item,
      ...newRow,
      // https://ant.design/components/table-cn#components-table-demo-expand
      // children: [{ ...item }] 这样子可以设置展开可是效果不好
    });
    setDataSource(newData);
    // 保存本地数据
    const updateOrder: OrderLocal = {
      id: order_id!,
      items: newData!,
    };
    updateOrderLocal(updateOrder);
  };

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
        getOrderDetail();
      })
      .catch(() => {
        setCommitLoading(false);
      });
    setCommitLoading(false);
    // 提交了就在本地删除
    deleteOrderLocal(order_id!);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  type EditableTableProps = Parameters<typeof Table>[0];
  type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: '序号',
      dataIndex: 'sort',
      width: '7%',
      editable: true,
      sorter: {
        // @ts-ignore
        compare: (a, b) => a.sort - b.sort,
        multiple: 3,
      },
    },
    // @ts-ignore
    Table.EXPAND_COLUMN,
    {
      title: '材料与设备名称',
      dataIndex: 'material_name',
      width: '20%',
      editable: true,
      sorter: {
        // @ts-ignore
        compare: (a, b) => a.material_name?.length - b.material_name?.length,
        multiple: 3,
      },
    },
    {
      title: '规格',
      width: '30%',
      dataIndex: 'material_sku',
      editable: true,
      sorter: {
        // @ts-ignore
        compare: (a, b) => a.material_sku?.length - b.material_sku?.length,
        multiple: 3,
      },
    },
    {
      title: '使用部位',
      dataIndex: 'used_site',
      editable: true,
    },
    {
      title: '申购数量',
      width: '10%',
      dataIndex: 'buy_num',
      editable: true,
      sorter: {
        // @ts-ignore
        compare: (a, b) => a.buy_num - b.buy_num,
        multiple: 3,
      },
    },
    {
      title: '单位',
      width: '10%',
      dataIndex: 'material_unit',
      editable: true,
      sorter: {
        // @ts-ignore
        compare: (a, b) => a.material_unit?.length - b.material_unit?.length,
        multiple: 3,
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '7%',
      // @ts-ignore
      render: (_, record: { id: React.Key }) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="确认删除吗?" onConfirm={() => handleDelete(record.id)}>
            <a>删除</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: API.OrderItem) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  // 是否展开远程数据的行
  const handleRowExpandable = (record: API.OrderItem) => {
    if (orderLocal?.length && remoteDate) {
      // 按时间戳判断，如果是修改了就展开
      const remoteItem = remoteDate.results.filter((item: any) => item.id === record.id);
      const timestamp = remoteItem.map((item: any) => item.timestamp)[0];
      const _localItem = { ...record, timestamp: undefined };
      const _remoteItem = { ...remoteItem[0], timestamp: undefined };
      const _isEqual = isEqual(_localItem, _remoteItem);

      // 修改了，并且修改后的内容不相等
      return record.timestamp! > timestamp! && !_isEqual;
    }
    return false;
  };

  // 展开渲染
  const handleExpendedRowRender = (record: API.OrderItem) => {
    if (remoteDate) {
      const newData = [...remoteDate.results];
      const index = newData.findIndex((item) => record.id === item.id);
      const item = newData[index];
      return (
        <tr className="editable-row">
          <td>系统数据:</td>
          <td style={{ padding: '5px 100px' }}>{item.sort}</td>
          <td style={{ padding: '5px 100px' }}>{item.material_name}</td>
          <td style={{ paddingRight: '50px' }}>{item.material_sku}</td>
          <td style={{ paddingRight: '50px' }}>{item.used_site}</td>
          <td style={{ paddingRight: '50px' }}>{item.buy_num}</td>
          <td style={{ paddingRight: '50px' }}>{item.material_unit}</td>
        </tr>
      );
    }
    return <p>远程获取数据失败</p>;
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

  const [tabStatus, seTabStatus] = useState({
    operationKey: 'tab1',
    tabActiveKey: 'detail',
  });
  const onTabChange = (tabActiveKey: string) => {
    seTabStatus({ ...tabStatus, tabActiveKey });
  };

  return (
    <div>
      <PageContainer
        title={orderDetail?.name}
        waterMarkProps={{ fontSize: 0 }}
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
                <Step title="创建审核单" />
                <Step title="审核" />
                <Step title="供货商评价" />
                <Step title="完成" />
              </Steps>
            </Card>

            <ProTable
              style={{ paddingTop: '20px' }}
              rowKey="id"
              locale={{ emptyText: 'empty' }}
              // 有本地数据就不显示加载
              loading={orderLocal?.length ? false : orderRemoteLoading}
              components={components}
              rowClassName={() => 'editable-row'}
              bordered
              dataSource={dataSource}
              // @ts-ignore
              columns={columns as ColumnTypes}
              pagination={false}
              // 吸顶
              sticky
              // scroll={{ x: 'max-content', y: 'calc(100vh - 300px)' }}
              size="small" // 紧凑
              search={false}
              options={{
                // 全屏
                fullScreen: true,
              }}
              // 右上角按钮
              toolBarRender={() => [
                <div key="proTableOption">
                  <span style={{ paddingRight: '10px' }}>
                    <Button
                      onClick={handleCommit}
                      type="primary"
                      style={{ marginBottom: 16 }}
                      loading={commitLoading}
                    >
                      提交
                    </Button>
                    <Button
                      onClick={handleAdd}
                      type="primary"
                      style={{ marginBottom: 16, marginLeft: 10 }}
                    >
                      增加一行
                    </Button>
                  </span>
                </div>,
              ]}
              expandable={{
                expandedRowRender: handleExpendedRowRender,
                rowExpandable: handleRowExpandable,
              }}
            />
            <Button type="dashed" onClick={handleAdd} style={{ width: '100%', marginBottom: 8 }}>
              <PlusOutlined />
              添加一行
            </Button>

            <div style={{ height: '600px' }}></div>
          </div>
        )}

        {tabStatus.tabActiveKey === 'supplier_rate' && (
          <SupplierRate order_id={order_id!} supplier_id={orderDetail?.supplier} />
        )}
      </PageContainer>
    </div>
  );
};

export default Index;
