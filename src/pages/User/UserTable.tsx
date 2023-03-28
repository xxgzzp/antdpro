import UserForm from '@/pages/User/UserForm';
import { apiOaUserDelete, apiOaUserList } from '@/services/ant-design-pro/api';
import { SearchOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Input, Modal } from 'antd';
import { useRef, useState } from 'react';

const UserTable: React.FC<{
  searchParams: any;
  setSearchParams: any;
}> = ({ searchParams, setSearchParams }) => {
  const proTableRef = useRef<ActionType>();
  // 关闭和打开"用户"模态框
  const [userModalOpen, setUserModalOpen] = useState<boolean>(false);
  const [updateUser, setUpdateUser] = useState<API.User>();
  const [typeAddOrUpdate, setTypeAddOrUpdate] = useState<boolean>(true);
  // 删除用户中 控制删除model
  const [deleteModalVisit, setDeleteModalVisit] = useState<boolean>(false);
  const [deleteModalLoading, setDeleteModalLoading] = useState<boolean>(false);
  const [deleteUser, setDeleteUser] = useState<{ id: string | undefined; name: string }>();
  // 在 onSearch 方法中更新搜索条件
  // const [searchParams, setSearchParams] = useState({});

  const { projectEnumKeyBy } = useModel('selector');

  const handleSearch = (value: string) => {
    setSearchParams({ search: value });
  };

  const handleDelete = (row: API.User) => {
    setTypeAddOrUpdate(true);
    setDeleteUser({
      id: row.id,
      name: row.name,
    });
    setDeleteModalVisit(true);
  };
  const handleUpdate = (row: API.User) => {
    setTypeAddOrUpdate(false); // 将表单方式切回更新
    setUserModalOpen(true);
    setUpdateUser(row);
  };
  const handleAdd = () => {
    setTypeAddOrUpdate(true);
    setUserModalOpen(true);
  };

  // ProTable 的 columns定义
  const columns: ProColumns<API.User>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      dataIndex: 'id',
      search: false,
      hideInTable: true,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <Input
            key="userInput"
            style={{ width: 188, marginBlockEnd: 8, display: 'block' }}
          ></Input>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined key="searchOutlined" style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      search: false,
    },
    {
      title: '真实姓名',
      dataIndex: 'name',
      tip: '真实姓名',
      search: false,
    },
    {
      title: '手机号',
      dataIndex: 'mobile_phone',
      search: false,
    },
    {
      title: '职位',
      dataIndex: 'identity_name',
      onFilter: true,
      filters: true,
      search: false,
    },
    {
      title: '项目',
      dataIndex: 'project_name',
      onFilter: true,
      filters: true,
      valueType: 'select',
      search: {
        // @ts-ignore
        key: 'now_project',
      },
      valueEnum: projectEnumKeyBy,
    },
    {
      title: '部门',
      dataIndex: 'department_name',
      onFilter: true,
      search: {
        // @ts-ignore
        key: 'department__name',
      },
      valueEnum: {
        土建: { text: '土建', status: 'Success' },
        技术: { text: '技术', status: 'Success' },
        机电: { text: '机电', status: 'Error' },
        材料: { text: '材料', status: 'Success' }, //disabled: true,可以让它不能选择
        安全: { text: '安全', status: 'Processing' },
        预算: { text: '预算', status: 'Processing' },
        监理: { text: '监理', status: 'Processing' },
        甲方: { text: '甲方', status: 'Processing' },
      },
    },
    {
      title: '操作',
      width: 120,
      key: 'options',
      valueType: 'option',
      render: (_, row) => [
        // eslint-disable-next-line react/jsx-key
        <Button size="small" key="update" type="link" onClick={() => handleUpdate(row)}>
          修改
        </Button>,
        <Button size="small" key="delete" type="link" onClick={() => handleDelete(row)} danger>
          删除
        </Button>,
      ],
    },
  ];

  return (
    <>
      <ProTable<API.User>
        search={{ filterType: 'light' }}
        headerTitle="用户管理"
        columns={columns}
        actionRef={proTableRef}
        request={apiOaUserList}
        params={searchParams}
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
        }}
        rowKey="id"
        // 右上角三个调整按钮
        options={{
          fullScreen: true,
          search: true,
        }}
        // 左上角搜索栏
        toolbar={{
          multipleLine: true,
          search: {
            onSearch: handleSearch,
            placeholder: '搜索',
          },
        }}
        // 右上角按钮
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={handleAdd}>
            新增用户
          </Button>,
        ]}
      ></ProTable>

      <Modal
        title="删除用户"
        open={deleteModalVisit}
        onCancel={() => {
          setDeleteModalVisit(false);
        }}
        confirmLoading={deleteModalLoading}
        key="userModal"
        onOk={() => {
          setDeleteModalLoading(true);
          // 删除用户
          apiOaUserDelete({ id: deleteUser?.id } as API.apiOaUserDeleteParams).then(() => {
            setDeleteModalVisit(false);
            proTableRef.current?.reload();
            setDeleteModalLoading(false);
          });
        }}
      >
        <p>请问你是否要删除用户{deleteUser?.name}</p>
      </Modal>

      <UserForm
        typeAddOrUpdate={typeAddOrUpdate}
        updateUserInit={updateUser}
        modalOpen={userModalOpen}
        setModalOpen={setUserModalOpen}
        reload={proTableRef.current?.reload}
      />
    </>
  );
};
export default UserTable;
