import { apiMaterialOrderItemList } from '@/services/ant-design-pro/api';
import { useRequest } from 'ahooks';
import { Table } from 'antd';
import React from 'react';

const ContractOrderItem: React.FC<{
  material: number | undefined;
  contract: string;
}> = ({ material, contract }) => {
  const { data, loading } = useRequest(() =>
    // @ts-ignore
    apiMaterialOrderItemList({ material: material, contract: contract }),
  );

  const columns = [
    {
      title: '订单',
      dataIndex: 'order_name',
      render: (_: any, row: API.OrderItem) => [
        <a
          key="rowName"
          onClick={() => {
            window.open(`/order/${row.order}/orderitems`);
          }}
        >
          {row?.order_name}
        </a>,
      ],
    },
    {
      title: '使用部位',
      dataIndex: 'used_site',
      key: 'used_site',
    },
    {
      title: '名称',
      dataIndex: 'material_name',
      key: 'material_name',
    },
    {
      title: '购买数量',
      dataIndex: 'buy_num',
      key: 'buy_num',
    },
    {
      title: '单位',
      dataIndex: 'material_unit',
      key: 'material_unit',
    },

    // {
    //   title: '规格',
    //   dataIndex: 'material_sku',
    //   key: 'material_sku',
    // },
    // {
    //   title: 'Need Time',
    //   dataIndex: 'need_time',
    //   key: 'need_time',
    // },
    // {
    //   title: 'Is Arrival',
    //   dataIndex: 'is_arrival',
    //   key: 'is_arrival',
    // },
    // {
    //   title: 'Timestamp',
    //   dataIndex: 'timestamp',
    //   key: 'timestamp',
    // },
  ];
  return <Table columns={columns} loading={loading} dataSource={data?.results} />;
};
export default ContractOrderItem;
