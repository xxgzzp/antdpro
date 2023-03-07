import { EditableCell, EditableRow } from '@/pages/OrderItem/Editable';
import '@/pages/OrderItem/OrderItemList.less';
import useOrderLocalStorage, { OrderLocal } from '@/pages/OrderItem/useOrderLocalStorage';
import { apiMaterialOrderItemList } from '@/services/ant-design-pro/api';
import { request } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Button, Popconfirm, Table } from 'antd';
import { isEqual } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

const App: React.FC = () => {
  const { order_id } = useParams<{ order_id?: string }>();
  const [dataSource, setDataSource] = useState<API.OrderItem[]>([]);
  const { data: remoteDate, loading } = useRequest(() =>
    apiMaterialOrderItemList({ order: order_id }),
  );
  const { getOrderLocal, updateOrderLocal, deleteOrderLocal } = useOrderLocalStorage();
  const order = getOrderLocal(order_id!);
  useEffect(() => {
    // 如果有本地数据，先加载本地的
    // 这个放在外面会报Too many re-renders. React limits the number of renders to prevent an infinite loop.原因未知

    if (order?.length) {
      setDataSource(order[0].items);
    }
    // 如果没有本地数据就set远程数据
    if (!order?.length && remoteDate) {
      setDataSource(remoteDate.results);
    }
    // 若远程数据和本地数据相等就删除本地数据
    if (remoteDate && order?.length) {
      // 去除时间戳后比较
      const _localDate = order[0].items.map((item) => ({ ...item, timestamp: undefined }));
      const _remoteDate = remoteDate.results.map((item) => ({ ...item, timestamp: undefined }));
      if (isEqual(_localDate, _remoteDate)) {
        deleteOrderLocal(order_id!);
      }
    }
  }, [remoteDate]);
  // 删除行
  const handleDelete = (id: React.Key) => {
    if (dataSource) {
      const newData = dataSource.filter((item) => item.id !== id);
      setDataSource(newData);
      const updateOrder: OrderLocal = { id: order_id!, items: newData! };
      updateOrderLocal(updateOrder);
    }
  };
  // 添加行
  const handleAdd = () => {
    if (dataSource) {
      const newData = Object.fromEntries(Object.keys(dataSource[0]).map((key) => [key, undefined]));
      newData.id = uuidv4();
      setDataSource([newData, ...dataSource]);
    }
  };
  // 保存行
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
    console.log(newRow);
    setDataSource(newData);
    const updateOrder: OrderLocal = { id: order_id!, items: newData! };
    // 不用在此判断updateOrder存不存在Local，updateOrderLocal已经判断了
    updateOrderLocal(updateOrder);
  };
  // 提交数据
  const handleCommit = () => {
    request('/api/material/order_commit/', {
      method: 'POST',
      data: { order_items: dataSource, order_id: order_id },
    });
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
    },
    // @ts-ignore
    Table.EXPAND_COLUMN,
    {
      title: 'name',
      dataIndex: 'material_name',
      width: '20%',
      editable: true,
    },
    {
      title: 'sku',
      width: '30%',
      dataIndex: 'material_sku',
      editable: true,
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
    },
    {
      title: '单位',
      width: '10%',
      dataIndex: 'material_unit',
      editable: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '7%',
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
  const handleRowExpandable = (record) => {
    if (order?.length && remoteDate) {
      // 按时间戳判断，如果是修改了就展开
      const remoteItem = remoteDate.results.filter((item) => item.id === record.id);
      const timestamp = remoteItem.map((item) => item.timestamp)[0];
      const _localItem = { ...record, timestamp: undefined };
      const _remoteItem = { ...remoteItem[0], timestamp: undefined };
      const _isEqual = isEqual(_localItem, _remoteItem);
      // 修改了，并且修改后的内容不相等
      return record.timestamp > timestamp && !_isEqual;
    }
    return false;
  };
  // 展开渲染
  const handleExpendedRowRender = (record) => {
    if (remoteDate) {
      const newData = [...remoteDate.results];
      const index = newData.findIndex((item) => record.id === item.id);
      const item = newData[index];
      return (
        <tr className="editable-row">
          <td>系统数据:</td>
          <td style={{ padding: '5px 100px' }}>{item.material_name}</td>
          <td style={{ paddingRight: '50px' }}>{item.material_sku}</td>
          <td style={{ paddingRight: '50px' }}>{item.buy_num}</td>
          <td style={{ paddingRight: '50px' }}>{item.material_unit}</td>
        </tr>
      );
    }
    return <p>远程获取数据失败</p>;
  };
  return (
    <div>
      <Button onClick={handleCommit} type="primary" style={{ marginBottom: 16 }}>
        提交
      </Button>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        增加一行
      </Button>
      <Table
        rowKey={(record) => record.id}
        locale={{ emptyText: 'empty' }}
        loading={loading}
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
        scroll={{ y: 500 }}
        pagination={false}
        size="small" // 紧凑
        expandable={{
          expandedRowRender: handleExpendedRowRender,
          rowExpandable: handleRowExpandable,
        }}
      />
    </div>
  );
};

export default App;
