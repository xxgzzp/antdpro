import { Table } from 'antd';
import {useEffect, useState } from 'react';

export const DataTable: React.FC<{
  dataSource: any;
}> = ({ dataSource }) => {

  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState(dataSource);

  useEffect(() => {
    const filteredDataSource = dataSource.filter((record) => {
      return Object.keys(filters).every((key) => {
        const filterValue = filters[key];
        if (!filterValue || filterValue.length === 0) {
          return true;
        }
        return filterValue.some((value) => record[key] === value);
      });
    });
    setFilteredData(filteredDataSource);
    console.log(filteredDataSource)
  }, [dataSource, filters]);

  const columns = [
    {
      dataIndex: 'material__name',
      title: '材料名称',
      sorter: {
        compare: (a, b) => a.material__name.length - b.material__name.length,
        multiple: 4,
      },
      filters: [
        ...new Set(dataSource.map((item) => item.material__name)).map((material) => ({
          text: material,
          value: material,
        })),
      ],
      filteredValue: filters.material__name || null,
      onFilter: (value, record) => record.material__name === value,
    },
    {
      dataIndex: 'material__sku',
      title: '规格',
      sorter: {
        compare: (a, b) => a.material__sku.length - b.material__sku.length,
        multiple: 3,
      },
      filters: [
        ...new Set(dataSource.map((item) => item.material__sku)).map((sku) => ({
          text: sku,
          value: sku,
        })),
      ],
      filteredValue: filters.material__sku || null,
      onFilter: (value, record) => record.material__sku === value,
    },
    {
      dataIndex: 'buy_num',
      title: '数量',
      sorter: {
        compare: (a, b) => a.buy_num - b.buy_num,
        multiple: 2,
      },
    },
    {
      dataIndex: 'material__unit',
      title: '单位',
    },
    {
      dataIndex: 'order__name',
      title: '材料单',
      sorter: {
        compare: (a, b) => a.order__name.length - b.order__name.length,
        multiple: 1,
      },
      filters: [
        ...new Set(dataSource.map((item) => item.order__name)).map((order) => ({
          text: order,
          value: order,
        })),
      ],
      filteredValue: filters.order__name || null,
      onFilter: (value, record) => record.order__name === value,
    },
    {
      dataIndex: 'order__created_by__name',
      title: '采购者',
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    setFilters(filters);
  };


  return (

    <Table
      size="small"
      columns={columns}
      dataSource={dataSource}
      onChange={handleTableChange}
    />
  );
};
