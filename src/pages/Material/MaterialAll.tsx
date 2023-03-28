import { apiMaterialMaterialAllList } from '@/services/ant-design-pro/api';
import { history } from '@@/core/history';
import { ProTable } from '@ant-design/pro-table';
import { useModel } from '@umijs/max';
import type { TableColumnsType } from 'antd';
import { Badge, Table } from 'antd';
import React from 'react';
interface Material {
  material_sku: any;
  material_name: string;
  created_time: any;
  key: React.Key;
  id: string;
  need_time: string | null;
  buy_num: number;
  material: number;
  contract: string | null;
  used_site: string | null;
  sort: number;
  is_arrival: boolean;
  receipt: string | null;
  timestamp: string;
  order_id: string;
  order_name: string;
  contract_name: string;
}
interface MaterialGroup {
  key: React.Key;
  material_id: number;
  material_name: string;
  material_sku: string;
  material_unit: string;
  total_buy_num: number;
  detail: Material[];
}
const MaterialAll: React.FC<{
  searchParams: any;
  setSearchParams: any;
}> = ({ searchParams, setSearchParams }) => {
  // 在 onSearch 方法中更新搜索条件

  const { projectEnumKeyBy } = useModel('selector');

  // TODO:展开菜单
  const expandedRowRender = (record: MaterialGroup) => {
    const columns: TableColumnsType<Material> = [
      {
        title: '材料单',
        dataIndex: 'order_name',
        key: 'expanded_order_name',
        align: 'right',
        sorter: {
          compare: (a, b) => a.order_name.length - b.order_name.length,
          multiple: 2,
        },
        render: (_, row) => [
          <a
            key="expanded_order_name"
            onClick={() => {
              history.push(`order/${row.order_id}/orderitems`);
            }}
          >
            {row.order_name}
          </a>,
        ],
      },
      {
        title: '合同',
        dataIndex: 'contract_name',
        key: 'expanded_contract_name',
        sorter: {
          compare: (a, b) => a?.contract_name?.length - b?.contract_name?.length,
          multiple: 2,
        },
        render: (_, row) => [
          <a
            key="expanded_order_name"
            onClick={() => {
              history.push(`contract/${row.contract}/contractitems`);
            }}
          >
            {row.contract_name}
          </a>,
        ],
      },
      {
        title: '日期',
        dataIndex: 'created_time',
        key: 'expanded_created_time',
        sorter: {
          compare: (a, b) => a?.created_time - b?.created_time,
          multiple: 2,
        },
      },
      {
        title: '材料',
        dataIndex: 'material_name',
        key: 'expanded_material_name',
        sorter: {
          compare: (a, b) => a.material_name.length - b.material_name.length,
          multiple: 2,
        },
      },
      {
        title: '规格',
        dataIndex: 'material_sku',
        key: 'expanded_material_sku',
        sorter: {
          compare: (a, b) => a.material_sku.length - b.material_sku.length,
          multiple: 2,
        },
      },
      {
        title: '数量',
        dataIndex: 'buy_num',
        key: 'expanded_buy_num',
        sorter: {
          compare: (a, b) => a.buy_num - b.buy_num,
          multiple: 2,
        },
      },
      { title: '单位', dataIndex: 'material_unit', key: 'expanded_material_unit' },
      { title: '使用部位', dataIndex: 'used_site', key: 'expanded_used_site' },
      {
        title: '是否到货',
        dataIndex: 'is_arrival',
        key: 'expanded_is_arrival',
        render: (is_arrival: boolean) => (
          <Badge status={is_arrival ? 'success' : 'error'} text={is_arrival ? '到货' : '未到货'} />
        ),
      },
    ];
    return (
      <Table
        rowKey="id"
        size="small"
        columns={columns}
        dataSource={record.detail}
        pagination={false}
      />
    );
  };

  const columns = [
    { title: '材料编号', dataIndex: 'material_id', key: 'material_id', search: false },
    { title: '材料与设备名称', dataIndex: 'material_name', key: 'material_name' },
    { title: '规格', dataIndex: 'material_sku', key: 'material_sku' },
    { title: '数量', dataIndex: 'total_buy_num', key: 'total_buy_num', search: false },
    { title: '单位', dataIndex: 'material_unit', key: 'material_unit', search: false },
    {
      title: '项目',
      hideInTable: true,
      dataIndex: 'material_unit',
      valueType: 'select',
      key: 'project',
      search: {
        key: 'project',
      },
      valueEnum: projectEnumKeyBy,
    },
  ];

  return (
    <ProTable
      pagination={{
        showQuickJumper: true,
      }}
      search={{ filterType: 'light' }}
      request={apiMaterialMaterialAllList}
      rowKey="material_id"
      expandable={{ expandedRowRender }}
      // @ts-ignore
      columns={columns}
      params={searchParams}
      options={{
        fullScreen: true,
        search: true,
      }}
      toolbar={{
        multipleLine: true,
        search: {
          onSearch: (value) => {
            setSearchParams({ search: value });
          },
          placeholder: '搜索',
        },
      }}
    />
  );
};
export default MaterialAll;
