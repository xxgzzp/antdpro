import UserForm from '@/pages/User/UserForm';
import { apiOaProjectList, apiOaUserDelete, apiOaUserList } from '@/services/ant-design-pro/api';
import { SearchOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Input, Modal } from 'antd';
import { keyBy } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

export default function Page() {
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
  const [searchParams, setSearchParams] = useState({});
  // 上面的菜单中的project下拉选择
  const [ProjectEnum, setProjectEnum] = useState({});
  useEffect(() => {
    apiOaProjectList().then((r) => {
      const res = r.results.map((r) => ({
        id: r.id,
        text: r.name,
      }));
      const resProjectEnum = keyBy(res, 'id');
      setProjectEnum(resProjectEnum);
    });
  }, []);

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
      valueEnum: ProjectEnum,
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
        土建部: { text: '土建部' },
        机电: { text: '机电', status: 'Error' },
        技术资料部: { text: '技术资料部', status: 'Success' }, //disabled: true,可以让它不能选择
        消防部: { text: '消防部', status: 'Processing' },
        预算部: { text: '预算部', status: 'Processing' },
        安防部: { text: '安防部', status: 'Processing' },
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
}
