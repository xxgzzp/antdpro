import { apiOaDepartmentDelete, apiOaDepartmentList } from '@/services/ant-design-pro/api';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Popconfirm } from 'antd';
import { useRef } from 'react';
const DepartmentTable = () => {
  const proTableRef = useRef<ActionType>();

  // TODO:删
  const handleDelete = (id: string) => {
    apiOaDepartmentDelete({
      id: id,
    }).then(() => {
      proTableRef.current?.reload();
    });
  };

  const columns: ProColumns<API.Department>[] = [
    {
      title: '部门名称',
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: '项目',
      dataIndex: 'project_name',
      sorter: true,
    },
    {
      title: '主管',
      dataIndex: 'manager_name',
      sorter: true,
    },
    {
      title: '操作',
      width: 120,
      key: 'options',
      valueType: 'option',
      render: (_: any, row: API.Department) => [
        // eslint-disable-next-line react/jsx-key
        // <Button size="small" key="update" type="link" onClick={() => handleUpdate(row)}>
        //   修改
        // </Button>,
        <Popconfirm key="delete" title="确认删除吗?" onConfirm={() => handleDelete(row.id!)}>
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];
  return (
    <ProTable
      actionRef={proTableRef}
      columns={columns}
      request={apiOaDepartmentList}
      rowKey="id"
      search={false}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default DepartmentTable;
