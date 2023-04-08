import DepartmentForm from '@/pages/Project/DepartmentForm';
import ProjectForm from '@/pages/Project/ProjectForm';
import UserSelectAdd from '@/pages/User/UserSelectAdd';
import {
  apiOaDepartmentDelete,
  apiOaDepartmentPartialUpdate,
  apiOaProjectDelete,
  apiOaProjectList,
} from '@/services/ant-design-pro/api';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Modal, Popconfirm } from 'antd';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
export default function ProjectList() {
  const proTableRef = useRef<ActionType>();
  // 关闭和打开ProjectForm模态框
  const [ModalOpen, setModalOpen] = useState<boolean>(false);
  const [updateProject, setUpdateProject] = useState<API.Project>();
  const [typeAddOrUpdate, setTypeAddOrUpdate] = useState<boolean>(true);
  // 删除中 控制删除model
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deleteModalLoading, setDeleteModalLoading] = useState<boolean>(false);
  const [deleteProject, setDeleteProject] = useState<{ id: string | undefined; name: string }>();
  // 在 onSearch 方法中更新搜索条件
  const [searchParams, setSearchParams] = useState({});

  const handleSearch = (value: string) => {
    setSearchParams({ search: value });
  };
  const handleUpdate = (row: API.Project) => {
    setModalOpen(true);
    setTypeAddOrUpdate(false); // 将表单方式切回更新
    setUpdateProject(row);
  };
  const handleAdd = () => {
    setModalOpen(true);
    setTypeAddOrUpdate(true);
  };
  // 点击删除时
  const handleDelete = (row: API.Supplier) => {
    setTypeAddOrUpdate(true); // 将表单方式切回删除
    setDeleteProject({
      id: row.id,
      name: row.name,
    });
    setDeleteModalOpen(true);
  };
  // 在模态框里点击确认删除时
  const handleDeleteOk = () => {
    setDeleteModalLoading(true);
    // 删除用户
    apiOaProjectDelete({ id: deleteProject?.id } as API.apiOaProjectDeleteParams).then(() => {
      setDeleteModalOpen(false);
      proTableRef.current?.reload();
      setDeleteModalLoading(false);
    });
  };

  // 保存部门主管信息
  const [sLoading, setSLoading] = useState(false);
  const saveDepartmentManage = (id: number, user_id: string) => {
    setSLoading(true);
    // @ts-ignore
    apiOaDepartmentPartialUpdate({ id: id }, { manager: user_id })
      .then(() => {
        setSLoading(false);
        toast.success('保存成功');
      })
      .catch(() => {
        setSLoading(false);
        toast.error('保存失败');
      });
  };

  const departmentRef = useRef();
  const [departmentTypeAddOrUpdate, setDepartmentTypeAddOrUpdate] = useState(true);
  const [dpUpdateInit, setDpUpdateInit] = useState<API.Department>();
  const [dpModelOpen, setDpModelOpen] = useState(false);
  const expandedRowRender = (record: any) => {
    const handleDepartmentDelete = (id: number) => {
      apiOaDepartmentDelete({
        id: id,
      })
        .then(() => {
          proTableRef.current?.reload();
          toast.success('删除成功');
        })
        .catch(() => {
          toast.error('删除失败');
        });
    };
    const departmentColumns = [
      {
        title: '部门名称',
        dataIndex: 'name',
        sorter: true,
      },
      {
        title: '主管',
        dataIndex: 'manager_name',
        render: (_: any, row: API.Department) => [
          <UserSelectAdd
            key="userSelect"
            loading={sLoading}
            style={{ width: '200px', display: 'inline-block' }}
            initialValues={row.manager}
            bordered={false}
            onSelect={(e: string) => {
              if (window.confirm('是否保存修改？')) {
                saveDepartmentManage(row.id!, e);
                console.log(e);
              }
            }}
          ></UserSelectAdd>,
        ],
      },
      {
        title: '操作',
        width: 120,
        key: 'options',
        valueType: 'option',
        render: (_: any, row: API.Department) => [
          <Button
            type={'link'}
            key="add_department"
            onClick={() => {
              setDpModelOpen(true);
              setDepartmentTypeAddOrUpdate(false);
              setDpUpdateInit(row);
            }}
          >
            修改
          </Button>,
          <Popconfirm
            key="delete"
            title="确认删除吗?"
            onConfirm={() => handleDepartmentDelete(row.id!)}
          >
            <a style={{ color: 'red' }} key="delete_department">
              删除
            </a>
          </Popconfirm>,
        ],
      },
    ];
    return (
      <ProTable
        columns={departmentColumns}
        rowKey="id"
        size="small"
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setDpModelOpen(true);
              setDepartmentTypeAddOrUpdate(true);
            }}
          >
            新增部门
          </Button>,
        ]}
        dataSource={record?.departments}
      />
    );
  };

  // ProTable 的 columns定义
  const columns: ProColumns[] = [
    {
      title: '项目名称',
      dataIndex: 'name',
      search: {
        // @ts-ignore
        key: 'search',
      },
    },
    {
      title: '项目地址',
      dataIndex: 'address',
      search: false,
    },
    {
      title: '项目经理',
      dataIndex: 'manager_name',
      search: false,
    },
    {
      title: '操作',
      key: 'option',
      width: 120,
      valueType: 'option',
      render: (_, row) => [
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
      <ProTable<API.Project>
        rowKey="id"
        headerTitle="项目管理"
        expandable={{ expandedRowRender }}
        columns={columns}
        actionRef={proTableRef}
        request={apiOaProjectList}
        params={searchParams}
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
        }}
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
            新增项目
          </Button>,
        ]}
      ></ProTable>
      <Modal
        title="项目-删除"
        open={deleteModalOpen}
        onCancel={() => {
          setDeleteModalOpen(false);
        }}
        confirmLoading={deleteModalLoading}
        onOk={handleDeleteOk}
      >
        <p>请问你是否要删除{deleteProject?.name}</p>
      </Modal>
      <ProjectForm
        typeAddOrUpdate={typeAddOrUpdate}
        updateInit={updateProject}
        modalOpen={ModalOpen}
        setModalOpen={setModalOpen}
        reload={proTableRef.current?.reload}
      />
      <DepartmentForm
        typeAddOrUpdate={departmentTypeAddOrUpdate}
        updateInit={dpUpdateInit}
        modalOpen={dpModelOpen}
        setModalOpen={setDpModelOpen}
        proTableRef={departmentRef}
      ></DepartmentForm>
    </>
  );
}
