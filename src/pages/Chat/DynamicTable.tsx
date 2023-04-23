import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

interface Props<T> {
  data: T[];
}

const DynamicTable = <T extends Record<string, unknown>>({
                                                           data,
                                                           ...rest
                                                         }: Props<T>) => {
  const columns: ColumnsType<T> = data.length > 0 ? Object.keys(data[0]).map(key => ({
    title: key.toUpperCase(),
    dataIndex: key,
    key,
  })) : [];
  const processedData = data.map((item) => ({ ...item }));

  // const processedData = data.map((item) => [item.spec, item.total_buy_num]);

  return <Table columns={columns} dataSource={processedData} {...rest} />;
};

export default DynamicTable;
