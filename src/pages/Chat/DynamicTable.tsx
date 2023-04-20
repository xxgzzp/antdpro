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

  return <Table columns={columns} dataSource={data} {...rest} />;
};

export default DynamicTable;
