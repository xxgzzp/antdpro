import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, } from '@ant-design/pro-components';
import { useRef } from 'react';
import {apiOaUserList} from "@/services/ant-design-pro/api";



const columns: ProColumns<API.User>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '真实姓名',
    dataIndex: 'name',
    tip: '真实姓名',
  },
  {
    title: '手机号',
    dataIndex: 'mobile_phone',
  },
  {
    title: '职位',
    dataIndex: 'identity_name',
    onFilter: true,
  },
  {
    title: '所在项目',
    dataIndex: 'project_name',
    onFilter: true,
  },
  {
    title: '所在部门',
    dataIndex: 'department_name',
    onFilter: true,
  },
];
export default function Page() {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.User>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={apiOaUserList}
      rowKey="id"

    />
  );
}
