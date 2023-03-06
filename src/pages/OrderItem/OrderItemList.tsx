import { EditableCell, EditableRow } from '@/pages/OrderItem/Editable';
import '@/pages/OrderItem/test.less';
import useOrderLocalStorage, { OrderLocal } from '@/pages/OrderItem/useOrderLocalStorage';
import { apiMaterialOrderItemList } from '@/services/ant-design-pro/api';
import { request } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Button, Popconfirm, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

const App: React.FC = () => {
  const { order_id } = useParams<{ order_id?: string }>();
  const [dataSource, setDataSource] = useState<API.OrderItem[]>([]);
  const { data, loading } = useRequest(() => apiMaterialOrderItemList({ order: order_id }));
  const { getOrderLocal, updateOrderLocal, deleteOrderLocal } = useOrderLocalStorage();

  useEffect(() => {
    const order = getOrderLocal(order_id!);
    // 如果filter后的数据不是的长度不是空的就说明本地保存有用户的order
    if (order?.length) {
      console.log('引用了用户保存在本地的数据');
      setDataSource(order[0].items);
    } else if (data) {
      setDataSource(data.results);
    }
  }, [data]);
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
    });
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
      title: '单位',
      width: '10%',
      dataIndex: 'material_unit',
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
      />
    </div>
  );
};

export default App;
