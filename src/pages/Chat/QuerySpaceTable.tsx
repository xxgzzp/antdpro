import {  Table } from 'antd';
import { ColumnsType } from 'antd/es/table';


interface QueryResult {
  header_name: string[];
  header_id: string[];
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

  let tableContent = <Table pagination={false} columns={columns} dataSource={dataSource} />;

  // if (queryResult?.header_id?.length === 1 && queryResult.header_id[0] === 'time') {
  //   tableContent = (
  //   <div></div>
  //   );
  // }

  return tableContent;
};
