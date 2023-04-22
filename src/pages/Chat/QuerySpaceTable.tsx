import {Collapse, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Typography } from 'antd';
const { Title } = Typography;
const { Panel } = Collapse;
interface QueryResult {
  header_name: string[];
  rows: Array<Array<any>>;
}

interface Props {
  queryResult: QueryResult;
}

export const QuerySpaceTable = ({ queryResult }: Props) => {
  const columns: ColumnsType<Array<any>> = queryResult.header_name.map((headerName) => ({
    title: headerName,
    dataIndex: headerName,
    key: headerName,
  }));

  const dataSource = queryResult.rows.map((row) => {
    const rowData = {};
    row.forEach((value, index) => {
      rowData[queryResult.header_name[index]] = value;
    });
    return rowData;
  });

  return (
    <>
      <Table columns={columns} dataSource={dataSource} />

    </>
  );
};
